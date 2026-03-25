// Supabase disabled in full-static demo mode
// All data comes from lib/static-data.ts via lib/queries.ts

export function createClient() {
  throw new Error("Supabase is disabled in demo mode. All data is static.");
}
