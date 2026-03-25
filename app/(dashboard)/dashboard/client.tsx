"use client";

import Link from "next/link";
import { StatCard, StatusBadge, Avatar } from "@/components/ui/shared";
import { Icon } from "@/components/ui/icon";
import { BS_CALENDAR } from "@/lib/constants";
import type { Profile, Case, Pesi, Decision } from "@/lib/types";

export function DashboardClient({
  profile, cases, pesi, decisions,
}: {
  profile: Profile; cases: Case[]; pesi: Pesi[]; decisions: Decision[];
}) {
  const activeCases   = cases.filter((c) => c.status === "ACTIVE").length;
  const pendingCases  = cases.filter((c) => c.status === "PENDING").length;
  const closedCases   = cases.filter((c) => c.status === "CLOSED").length;
  const appealedCases = cases.filter((c) => c.status === "APPEALED").length;

  // Today's pesi (Dainik only)
  const todayPesi = pesi.filter((p) => p.pesi_type === "Dainik Pesi Suchi").slice(0, 5);

  const recentDecisions = decisions.slice(0, 4);
  const recentCases     = cases.slice(0, 5);

  // Case type distribution
  const typeCount: Record<string, number> = {};
  cases.forEach((c) => { typeCount[c.case_type] = (typeCount[c.case_type] || 0) + 1; });
  const topTypes = Object.entries(typeCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Unique lawyers
  const lawyerMap: Record<string, { name: string; count: number }> = {};
  cases.forEach((c) => {
    if (c.lawyer) {
      lawyerMap[c.lawyer.id] = { name: c.lawyer.name, count: (lawyerMap[c.lawyer.id]?.count || 0) + 1 };
    }
  });
  const topLawyers = Object.values(lawyerMap).sort((a, b) => b.count - a.count).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A2B4A 0%, #2d4a7a 100%)" }}>
        <div className="absolute right-0 top-0 w-64 h-full opacity-10" style={{ background: "radial-gradient(circle at 80% 50%, #C9A84C, transparent)" }} />
        <div className="relative">
          <p className="text-sm" style={{ color: "#C9A84C" }}>न्याय Desk — Lawfirm Management System</p>
          <h2 className="text-2xl font-bold mt-1">Namaste, {profile.name.split(" ")[0]} 🙏</h2>
          <p className="text-slate-300 text-sm mt-1">
            आज मिति: {BS_CALENDAR.currentYear} {BS_CALENDAR.currentMonth} ७ गते &nbsp;|&nbsp; {profile.role.replace("_", " ")}
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <div className="bg-white bg-opacity-10 rounded-xl px-4 py-2 text-sm">
              <span style={{ color: "#C9A84C" }}>●</span> {todayPesi.length} Pesi Today
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl px-4 py-2 text-sm">
              <span className="text-green-400">●</span> {activeCases} Active Cases
            </div>
            <div className="bg-white bg-opacity-10 rounded-xl px-4 py-2 text-sm">
              <span className="text-amber-400">●</span> {decisions.filter((d) => d.type === "Antarim Aadesh").length} Interim Orders
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Cases"   value={activeCases}   sub={`of ${cases.length} total`} icon="briefcase" color="navy"  trend={8} />
        <StatCard label="Today's Pesi"   value={todayPesi.length}   sub={`${BS_CALENDAR.currentMonth} ७, ${BS_CALENDAR.currentYear}`} icon="scale" color="gold" />
        <StatCard label="Court Decisions" value={decisions.length} sub={`${decisions.filter(d=>d.type==="Faisala").length} final judgments`} icon="gavel" color="red" />
        <StatCard label="Pending Cases"  value={pendingCases}  sub={`${appealedCases} on appeal`} icon="alert" color="green" />
      </div>

      {/* Two-column row: Today's Pesi + Decisions */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Today's Pesi */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FEF3C7" }}>
                <Icon name="scale" size={16} className="text-amber-600" />
              </div>
              <span className="font-semibold text-slate-800">Today&apos;s Pesi</span>
            </div>
            <Link href="/pesi" className="text-xs text-blue-600 hover:underline">View All →</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {todayPesi.length > 0 ? todayPesi.map((p) => (
              <div key={p.id} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                <div className="text-center min-w-[52px]">
                  <div className="text-xs font-bold text-white rounded-lg py-1.5 px-2" style={{ background: "#1A2B4A" }}>{p.time}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{p.case?.title?.split("—")[0].trim() || `Case #${p.case_id}`}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{p.court}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{p.judge}</p>
                  <div className="flex gap-2 mt-1.5">
                    <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">{p.tarek_type}</span>
                  </div>
                </div>
              </div>
            )) : <p className="text-sm text-slate-400 text-center py-8">No pesi entries today</p>}
          </div>
        </div>

        {/* Recent Decisions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#EEF2FF" }}>
                <Icon name="gavel" size={16} className="text-blue-700" />
              </div>
              <span className="font-semibold text-slate-800">Recent Court Decisions</span>
            </div>
            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{decisions.length} total</span>
          </div>
          <div className="divide-y divide-slate-50">
            {recentDecisions.map((d) => (
              <div key={d.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${d.type === "Faisala" ? "bg-green-100 text-green-700" : d.type === "Antarim Aadesh" ? "bg-amber-100 text-amber-700" : d.type === "Khardaj" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                      {d.type}
                    </span>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">{d.summary}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{d.date_bs}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                  <Avatar initials={d.uploader?.avatar || "?"} size="sm" />
                  <span className="ml-0.5">{d.uploader?.name || "Unknown"}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Case Table + Sidebar stats */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent Cases Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-50">
            <span className="font-semibold text-slate-800">Recent Cases</span>
            <Link href="/cases" className="text-xs text-blue-600 hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Case No.</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Lawyer</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{c.case_number}</td>
                    <td className="px-4 py-3">
                      <Link href={`/cases/${c.id}`} className="font-medium text-slate-800 hover:text-blue-600 truncate max-w-[180px] block">
                        {c.title.split("—")[0].trim()}
                      </Link>
                      <p className="text-xs text-slate-400">{c.date_bs}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c.case_type}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-slate-600 text-xs">{c.lawyer?.name || "—"}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar: Case breakdown + top lawyers */}
        <div className="space-y-4">
          {/* Status breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <p className="font-semibold text-slate-800 text-sm mb-3">Cases by Status</p>
            {[
              { label: "Active",   count: activeCases,   color: "#10B981", bg: "#DCFCE7" },
              { label: "Pending",  count: pendingCases,  color: "#F59E0B", bg: "#FEF3C7" },
              { label: "Closed",   count: closedCases,   color: "#64748B", bg: "#F1F5F9" },
              { label: "Appealed", count: appealedCases, color: "#3B82F6", bg: "#EEF2FF" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-sm text-slate-600">{s.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-slate-100">
                    <div className="h-1.5 rounded-full" style={{ background: s.color, width: `${(s.count / cases.length) * 100}%` }} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 w-4 text-right">{s.count}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Top Case Types */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <p className="font-semibold text-slate-800 text-sm mb-3">Top Case Types</p>
            <div className="space-y-2">
              {topTypes.map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 truncate flex-1">{type}</span>
                  <div className="flex items-center gap-1.5 ml-2">
                    <div className="w-12 h-1.5 rounded-full bg-slate-100">
                      <div className="h-1.5 rounded-full" style={{ background: "#1A2B4A", width: `${(count / cases.length) * 100}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-600 w-3">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Lawyers */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <p className="font-semibold text-slate-800 text-sm mb-3">Lawyer Caseload</p>
            {topLawyers.map((l) => (
              <div key={l.name} className="flex items-center gap-2 mb-2.5">
                <Avatar initials={l.name.split(" ").map((w) => w[0]).join("").slice(0,2)} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{l.name}</p>
                  <p className="text-xs text-slate-400">{l.count} cases</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
