"use client";

import { ROLE_COLORS, ROLE_LABELS, STATUS_COLORS } from "@/lib/constants";
import type { UserRole, CaseStatus } from "@/lib/types";
import { Icon } from "./icon";

export function RoleBadge({ role }: { role: UserRole }) {
  const c = ROLE_COLORS[role] || ROLE_COLORS.STAFF;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {ROLE_LABELS[role]}
    </span>
  );
}

export function StatusBadge({ status }: { status: CaseStatus }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.PENDING;
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>{status}</span>;
}

export function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };
  return (
    <div className={`${sizes[size]} rounded-full flex items-center justify-center font-bold flex-shrink-0`} style={{ background: "linear-gradient(135deg, #1A2B4A, #2d4a7a)", color: "#C9A84C" }}>
      {initials}
    </div>
  );
}

export function StatCard({ label, value, sub, icon, color = "navy", trend }: {
  label: string; value: string | number; sub?: string; icon: string; color?: "navy" | "gold" | "green" | "red"; trend?: number;
}) {
  const bgMap = { gold: "#FEF3C7", navy: "#EEF2FF", green: "#DCFCE7", red: "#FEE2E2" };
  const fgMap = { gold: "#C9A84C", navy: "#1A2B4A", green: "#16A34A", red: "#DC2626" };
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bgMap[color] }}>
          <span style={{ color: fgMap[color] }}><Icon name={icon} size={20} /></span>
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-800">{value}</div>
        <div className="text-sm font-medium text-slate-500 mt-0.5">{label}</div>
        {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
      </div>
    </div>
  );
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <Icon name="x" size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
