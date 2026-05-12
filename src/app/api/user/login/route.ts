import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    // Autenticar com Supabase Auth — valida email + senha
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Credenciais inválidas ou usuário não encontrado
      if (
        error.message?.includes('Invalid login credentials') ||
        error.message?.includes('invalid_credentials')
      ) {
        return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 });
      }
      console.error('[LOGIN] Erro no Supabase Auth:', error);
      return NextResponse.json({ error: 'Erro ao fazer login' }, { status: 500 });
    }

    const userId = data.user.id;

    // Buscar perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, name')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      console.error('[LOGIN] Perfil não encontrado para userId:', userId);
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 });
    }

    console.log('[LOGIN] Login realizado com sucesso:', email);
    return NextResponse.json({
      success: true,
      user: {
        id: profile.id,
        email: profile.email,
        name: profile.name,
      },
    });

  } catch (error) {
    console.error('[LOGIN] Erro inesperado:', error);
    return NextResponse.json({ error: 'Erro ao fazer login' }, { status: 500 });
  }
}
