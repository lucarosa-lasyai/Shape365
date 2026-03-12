import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

interface MercadoPagoNotification {
  id: string;
  live_mode: boolean;
  type: string;
  date_created: string;
  application_id: string;
  user_id: string;
  version: number;
  api_version: string;
  action: string;
  data: {
    id: string;
  };
}

interface MercadoPagoPayment {
  id: number;
  status: string;
  status_detail: string;
  external_reference?: string;
  payer: {
    email: string;
    identification?: {
      type: string;
      number: string;
    };
  };
  metadata?: {
    user_email?: string;
    plan_type?: string;
  };
  transaction_amount: number;
  date_approved?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: MercadoPagoNotification = await request.json();

    console.log('📩 Webhook recebido do Mercado Pago:', JSON.stringify(body));

    // Ignorar notificações que não são de pagamento
    if (body.type !== 'payment') {
      return NextResponse.json({ message: 'Tipo de notificação ignorado' }, { status: 200 });
    }

    const paymentId = body.data.id;
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.error('❌ MERCADOPAGO_ACCESS_TOKEN não configurado');
      return NextResponse.json({ error: 'Configuração inválida' }, { status: 500 });
    }

    // Buscar detalhes do pagamento na API do Mercado Pago
    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!paymentResponse.ok) {
      console.error('❌ Erro ao buscar pagamento:', await paymentResponse.text());
      return NextResponse.json({ error: 'Erro ao buscar pagamento' }, { status: 500 });
    }

    const payment: MercadoPagoPayment = await paymentResponse.json();

    console.log('💳 Detalhes do pagamento:', {
      id: payment.id,
      status: payment.status,
      email: payment.payer.email,
      amount: payment.transaction_amount,
      external_reference: payment.external_reference,
      metadata: payment.metadata,
    });

    // Determinar email do usuário (prioridade: metadata > external_reference > payer.email)
    const userEmail =
      payment.metadata?.user_email ||
      payment.external_reference ||
      payment.payer.email;

    const planType = payment.metadata?.plan_type || 'monthly';

    // Registrar pagamento no histórico (independente do status)
    const { error: paymentRecordError } = await supabaseAdmin
      .from('subscription_payments')
      .upsert({
        user_email: userEmail,
        mercadopago_payment_id: payment.id.toString(),
        plan_type: planType,
        amount: payment.transaction_amount,
        status: payment.status,
        payment_date: payment.date_approved || new Date().toISOString(),
        created_at: new Date().toISOString(),
      }, {
        onConflict: 'mercadopago_payment_id',
      });

    if (paymentRecordError) {
      console.error('❌ Erro ao registrar pagamento no histórico:', paymentRecordError);
    } else {
      console.log('✅ Pagamento registrado no histórico');
    }

    // Processar pagamentos aprovados
    if (payment.status === 'approved') {
      // Garantir que o perfil existe na tabela profiles
      const { data: existingProfile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (!existingProfile) {
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .insert({
            email: userEmail,
            full_name: userEmail.split('@')[0],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          console.error('❌ Erro ao criar perfil:', profileError);
        } else {
          console.log('✅ Perfil criado para:', userEmail);
        }
      }

      // Calcular data de expiração baseada no plano
      const expirationDate = new Date();
      switch (planType) {
        case 'monthly':
          expirationDate.setMonth(expirationDate.getMonth() + 1);
          break;
        case 'semester':
          expirationDate.setMonth(expirationDate.getMonth() + 6);
          break;
        case 'annual':
          expirationDate.setFullYear(expirationDate.getFullYear() + 1);
          break;
        default:
          expirationDate.setMonth(expirationDate.getMonth() + 1);
      }

      // Verificar se já existe assinatura para esse email
      const { data: existingSub } = await supabaseAdmin
        .from('subscriptions')
        .select('id')
        .eq('user_email', userEmail)
        .single();

      let subscription = null;
      let subError = null;

      const subscriptionData = {
        user_email: userEmail,
        plan_type: planType,
        status: 'active',
        payment_id: payment.id.toString(),
        amount: payment.transaction_amount,
        expires_at: expirationDate.toISOString(),
        mercadopago_payment_id: payment.id.toString(),
        updated_at: new Date().toISOString(),
      };

      if (existingSub) {
        const { data, error } = await supabaseAdmin
          .from('subscriptions')
          .update(subscriptionData)
          .eq('user_email', userEmail)
          .select()
          .single();
        subscription = data;
        subError = error;
      } else {
        const { data, error } = await supabaseAdmin
          .from('subscriptions')
          .insert(subscriptionData)
          .select()
          .single();
        subscription = data;
        subError = error;
      }

      if (subError) {
        console.error('❌ Erro ao criar/atualizar assinatura:', subError);
        return NextResponse.json({ error: 'Erro ao processar assinatura' }, { status: 500 });
      }

      console.log('✅ Assinatura ativada com sucesso:', subscription);

      return NextResponse.json({
        success: true,
        message: 'Pagamento processado e assinatura ativada',
        subscription,
      });
    }

    // Processar pagamentos cancelados ou rejeitados
    if (payment.status === 'cancelled' || payment.status === 'rejected') {
      await supabaseAdmin
        .from('subscriptions')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('user_email', userEmail);

      console.log('❌ Pagamento cancelado/rejeitado para:', userEmail);
    }

    return NextResponse.json({ message: 'Webhook processado' }, { status: 200 });

  } catch (error) {
    console.error('❌ Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar webhook' },
      { status: 500 }
    );
  }
}

// Verificar se o endpoint está funcionando
export async function GET() {
  return NextResponse.json({
    message: 'Webhook do Mercado Pago está funcionando',
    timestamp: new Date().toISOString(),
  });
}
