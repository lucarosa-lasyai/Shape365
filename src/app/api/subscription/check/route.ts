import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
    }

    // Buscar assinatura ativa do usuário
    const { data: subscription, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_email', email)
      .eq('status', 'active')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao buscar assinatura:', error);
      return NextResponse.json({ error: 'Erro ao verificar assinatura' }, { status: 500 });
    }

    // Verificar se a assinatura está expirada
    if (subscription) {
      const expiresAt = new Date(subscription.expires_at);
      const now = new Date();

      if (expiresAt < now) {
        // Assinatura expirada - atualizar status
        await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'expired', updated_at: new Date().toISOString() })
          .eq('id', subscription.id);

        return NextResponse.json({
          hasSubscription: false,
          subscription: null,
        });
      }

      return NextResponse.json({
        hasSubscription: true,
        subscription: {
          plan_type: subscription.plan_type,
          expires_at: subscription.expires_at,
          status: subscription.status,
        },
      });
    }

    return NextResponse.json({
      hasSubscription: false,
      subscription: null,
    });

  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
