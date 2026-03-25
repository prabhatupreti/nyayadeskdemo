import type { UserRole, CaseStatus } from "./types";

export const ROLE_COLORS: Record<UserRole, { bg: string; text: string; dot: string }> = {
  ADMIN: { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" },
  LAWYER: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  EXTERNAL_LAWYER: { bg: "bg-cyan-100", text: "text-cyan-700", dot: "bg-cyan-500" },
  STAFF: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  CLIENT: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  WARIS: { bg: "bg-rose-100", text: "text-rose-700", dot: "bg-rose-500" },
};

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Admin",
  LAWYER: "Lawyer",
  EXTERNAL_LAWYER: "Ext. Lawyer",
  STAFF: "Staff",
  CLIENT: "Client",
  WARIS: "Waris",
};

export const STATUS_COLORS: Record<CaseStatus, { bg: string; text: string }> = {
  ACTIVE: { bg: "bg-emerald-100", text: "text-emerald-700" },
  PENDING: { bg: "bg-amber-100", text: "text-amber-700" },
  CLOSED: { bg: "bg-slate-100", text: "text-slate-600" },
  APPEALED: { bg: "bg-blue-100", text: "text-blue-700" },
};

export const BS_CALENDAR = {
  months: ["बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कार्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत"],
  days: ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"],
  currentMonth: "असोज",
  currentYear: "२०८१",
};

export const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { key: "cases", label: "Cases", icon: "briefcase", href: "/cases" },
  { key: "pesi", label: "Pesi Dairy", icon: "scale", href: "/pesi" },
  { key: "calendar", label: "BS Calendar", icon: "calendar", href: "/calendar" },
  { key: "meetings", label: "Meetings", icon: "meeting", href: "/meetings" },
  { key: "users", label: "Users & Roles", icon: "users", href: "/users", adminOnly: true },
  { key: "templates", label: "Templates", icon: "document", href: "/templates" },
  { key: "masterdata", label: "Master Data", icon: "settings", href: "/masterdata", adminOnly: true },
] as const;

export function toDevanagari(n: number): string {
  const digits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return n
    .toString()
    .split("")
    .map((d) => digits[parseInt(d)] || d)
    .join("");
}
