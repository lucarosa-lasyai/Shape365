import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Tipos do Mercado Pago
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

    console.log('📩 Webhook recebido do Mercado Pago:', body);

    // Verificar se é uma notificação de pagamento
    if (body.type !== 'payment') {
      return NextResponse.json({ message: 'Tipo de notificação ignorado' }, { status: 200 });
    }

    // Buscar detalhes do pagamento na API do Mercado Pago
    const paymentId = body.data.id;
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.error('❌ MERCADOPAGO_ACCESS_TOKEN não configurado');
      return NextResponse.json({ error: 'Configuração inválida' }, { status: 500 });
    }

    // Buscar informações do pagamento
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
    });

    // Processar apenas pagamentos aprovados
    if (payment.status === 'approved') {
      const userEmail = payment.metadata?.user_email || payment.payer.email;
      const planType = payment.metadata?.plan_type || 'monthly';

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
      }

      // Criar ou atualizar assinatura no Supabase
      const { data: subscription, error: subError } = await supabaseAdmin
        .from('subscriptions')
        .upsert({
          user_email: userEmail,
          plan_type: planType,
          status: 'active',
          payment_id: payment.id.toString(),
          amount: payment.transaction_amount,
          expires_at: expirationDate.toISOString(),
          mercadopago_payment_id: payment.id.toString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_email',
        })
        .select()
        .single();

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
      const userEmail = payment.metadata?.user_email || payment.payer.email;

      // Atualizar status da assinatura
      const { error: updateError } = await supabaseAdmin
        .from('subscriptions')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('user_email', userEmail);

      if (updateError) {
        console.error('❌ Erro ao cancelar assinatura:', updateError);
      }

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

// Permitir GET para verificar se o endpoint está funcionando
export async function GET() {
  return NextResponse.json({
    message: 'Webhook do Mercado Pago está funcionando',
    timestamp: new Date().toISOString(),
  });
}
