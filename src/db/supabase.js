import { createClient } from "@supabase/supabase-js";

// Supabase URL from environment variables
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// Supabase Anonymous Key from environment variables
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
