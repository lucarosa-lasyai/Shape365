import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
    }

    const { data: existing } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    return NextResponse.json({ exists: !!existing });

  } catch (error) {
    console.error('[CHECK-EMAIL] Erro:', error);
    return NextResponse.json({ error: 'Erro ao verificar email' }, { status: 500 });
  }
}
