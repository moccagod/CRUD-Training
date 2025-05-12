import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xhfnjnchospfqebakccl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZm5qbmNob3NwZnFlYmFrY2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNTgyODEsImV4cCI6MjA2MjYzNDI4MX0.ymlYRAwzxzCDKN_yYgf4dwVMVwDVroc-CJQd_sEJI34";

export const supabase = createClient(supabaseUrl, supabaseKey);
