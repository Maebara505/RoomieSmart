// src/core/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { config } from './config.js'; 

// export const
export const supabaseClient = config.supabaseUrl && config.supabaseKey 
    ? createClient(config.supabaseUrl, config.supabaseKey)
    : null;