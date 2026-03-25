"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/shared";
import { Icon } from "@/components/ui/icon";
import type { Case } from "@/lib/types";

export function CasesClient({ cases, caseTypes }: { cases: Case[]; caseTypes: string[] }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");

  const filtered = cases.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.case_number.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "ALL" || c.status === filterStatus;
    const matchType = filterType === "ALL" || c.case_type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Cases</h2>
          <p className="text-sm text-slate-500">{filtered.length} cases found</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}>
            <Icon name="plus" size={16} /> New Case
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-3 flex-wrap">
        <div className="flex-1 min-w-48 relative">
          <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cases, clients, case numbers..." className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
          <option value="ALL">All Status</option>
          {["ACTIVE", "PENDING", "CLOSED", "APPEALED"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
          <option value="ALL">All Types</option>
          {caseTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <Link key={c.id} href={`/cases/${c.id}`} className="block bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{c.case_number}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c.case_type}</span>
                  <StatusBadge status={c.status} />
                </div>
                <h3 className="font-semibold text-slate-800 mt-2">{c.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">{c.description}</p>
                <div className="flex gap-4 mt-2 text-xs text-slate-400 flex-wrap">
                  <span>⚖ {c.court}</span>
                  <span>👤 {c.client?.name || "-"}</span>
                  <span>🧑‍⚖️ {c.lawyer?.name || "-"}</span>
                  <span>📅 {c.date_bs}</span>
                </div>
              </div>
              <Icon name="chevronRight" size={18} className="text-slate-300 flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-sm text-slate-400 text-center py-12">No cases found</p>}
      </div>
    </div>
  );
}
