import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WaitlistEntry {
  id?: string;
  email: string;
  neural_id?: string;
  created_at?: string;
  metadata?: Record<string, unknown>;
  status?: string;
}

export async function submitToWaitlist(email: string, metadata?: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([
      {
        email,
        metadata: metadata || {},
      },
    ]);

  if (error) {
    if (error.code === '23505') {
      throw new Error('DUPLICATE_EMAIL');
    }
    throw error;
  }

  return data;
}
