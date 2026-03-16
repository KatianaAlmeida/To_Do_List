// supabaseClient.js
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;   // e.g., "https://xxxx.supabase.co"
const supabaseKey = process.env.SUPABASE_KEY;   // service role key for full privileges
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;