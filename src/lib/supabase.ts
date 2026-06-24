import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://uyiycqlukxrejjbenuxq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5aXljcWx1a3hyZWpqYmVudXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTY5MzIsImV4cCI6MjA5Nzg5MjkzMn0.e7vUL6fK50oRtIa_vJf1m1eXnu-RDemLPu3IUFGYmEo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Membro {
  id: string;
  nome: string;
  email: string;
  foto_url: string | null;
  created_at: string;
}
