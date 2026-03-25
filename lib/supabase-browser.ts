// Supabase disabled in full-static demo mode
export function createBrowserClient() {
  throw new Error("Supabase is disabled in demo mode.");
}
