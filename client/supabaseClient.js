// supabaseClient.js
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;   // e.g., "https://xxxx.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY;   // service role key for full privileges
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;