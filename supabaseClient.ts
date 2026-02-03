
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vohfyvhpdwvgcnwkdqor.supabase.co';
const supabaseKey = 'sb_publishable_jh_YVMJaIZsSrdhBn-G88Q_vsZkbhzh';

export const supabase = createClient(supabaseUrl, supabaseKey);
