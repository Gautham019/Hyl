// src/lib/supabase.ts
// The single Supabase client for the app.
//
// The key below is a PUBLISHABLE key: it is designed to be shipped in the
// browser bundle, and Row Level Security in the database is what protects the
// data. If you later set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (Bolt env
// vars, .env, or your host's settings) those win and you can delete the
// fallbacks below.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
  'https://vpdtaytgvtzpdtunrxna.supabase.co';

const SUPABASE_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
  'sb_publishable_Cdk1KhWSHFWH__NvoNKEZA_YlYX_bl4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/** Base URL for the Edge Functions (/process-image, /delete-account, …). */
export const functionsUrl = `${SUPABASE_URL}/functions/v1`;
