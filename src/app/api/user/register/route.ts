import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // confirma o email automaticamente (sem email de verificação)
    });

    if (authError) {
      // Usuário já existe no Auth
      if (authError.message?.includes('already been registered') || authError.code === 'email_exists') {
        return NextResponse.json({ error: 'Este e-mail já possui uma conta.' }, { status: 409 });
      }
      console.error('[REGISTER] Erro no Supabase Auth:', authError);
      return NextResponse.json({ error: 'Erro ao criar conta', details: authError.message }, { status: 500 });
    }

    const userId = authData.user.id;

    // Criar perfil vinculado ao usuário do Auth
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        email,
        name: name || email.split('@')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error('[REGISTER] Erro ao criar perfil:', profileError);
      // Desfaz o usuário criado no Auth para não deixar estado inconsistente
      await supabaseAdmin.auth.admin.deleteUser(userId);
      return NextResponse.json({ error: 'Erro ao criar perfil' }, { status: 500 });
    }

    console.log('[REGISTER] Usuário e perfil criados com sucesso:', email);
    return NextResponse.json({ success: true, userId });

  } catch (error) {
    console.error('[REGISTER] Erro inesperado:', error);
    return NextResponse.json({ error: 'Erro ao registrar usuário' }, { status: 500 });
  }
}
