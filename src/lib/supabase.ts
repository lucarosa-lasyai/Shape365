import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

// Cliente público (anon key) — seguro para uso no cliente
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      _supabase = createClient(url, key);
    }
    const value = (_supabase as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === 'function' ? value.bind(_supabase) : value;
  },
});

// Cliente admin (service role) — APENAS no servidor, nunca expor no cliente
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabaseAdmin) {
      const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      _supabaseAdmin = createClient(url, key);
    }
    const value = (_supabaseAdmin as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === 'function' ? value.bind(_supabaseAdmin) : value;
  },
});
