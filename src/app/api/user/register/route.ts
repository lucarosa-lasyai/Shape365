import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
    }

    // Verificar se perfil já existe
    const { data: existing } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      // Perfil já existe, apenas retornar sucesso
      return NextResponse.json({ success: true, created: false });
    }

    // Criar novo perfil
    const { error } = await supabaseAdmin
      .from('profiles')
      .insert({
        email,
        full_name: name || email.split('@')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('[REGISTER] Erro ao criar perfil:', error);
      return NextResponse.json({ error: 'Erro ao criar perfil', details: error }, { status: 500 });
    }

    console.log('[REGISTER] Perfil criado com sucesso para:', email);
    return NextResponse.json({ success: true, created: true });

  } catch (error) {
    console.error('[REGISTER] Erro inesperado:', error);
    return NextResponse.json({ error: 'Erro ao registrar usuário' }, { status: 500 });
  }
}
