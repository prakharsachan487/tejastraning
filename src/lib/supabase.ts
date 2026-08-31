import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_SUPABASE_URL || import.meta.env?.SUPABASE_URL)) ||
  'https://kqyibgttpeyvcvomwzoo.supabase.co';

const supabaseKey =
  (typeof import.meta !== 'undefined' &&
    (import.meta.env?.VITE_SUPABASE_ANON_KEY ||
      import.meta.env?.VITE_SUPABASE_SERVICE_KEY ||
      import.meta.env?.SUPABASE_SERVICE_KEY ||
      import.meta.env?.SUPABASE_KEY)) ||
  '';

export const supabase = createClient(supabaseUrl, supabaseKey);
