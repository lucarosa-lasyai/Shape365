import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(_request: NextRequest) {
  try {
    // Testar conexão com Supabase
    const { error, count } = await supabaseAdmin
      .from('quiz_responses')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Conexão com Supabase OK',
      totalRecords: count,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({
      success: false,
      error: err.message || 'Erro desconhecido',
    }, { status: 500 });
  }
}
