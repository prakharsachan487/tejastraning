import { createClient } from '@supabase/supabase-js';

const rawUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://unhogvlmmmfunsasscek.supabase.co';

// Clean URL: strip any trailing /rest/v1 or slashes
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuaG9ndmxtbW1mdW5zYXNzY2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNDMzOTgsImV4cCI6MjEwMzgxOTM5OH0.TTuaSSI4g48FsgJwradEqNgOwybmxRVefjA7KIQnfvs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
