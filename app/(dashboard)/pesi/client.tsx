"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { BS_CALENDAR } from "@/lib/constants";
import type { Pesi } from "@/lib/types";

const views = [
  { key: "dainik", label: "Dainik Pesi Suchi", nepali: "दैनिक पेसी सूची" },
  { key: "saptahik", label: "Saptahik Pesi Suchi", nepali: "साप्ताहिक पेसी सूची" },
  { key: "purak", label: "Purak Pesi Suchi", nepali: "पुरक पेसी सूची" },
];

export function PesiClient({ pesi }: { pesi: Pesi[] }) {
  const [view, setView] = useState("dainik");

  const filtered = view === "purak"
    ? pesi.filter((p) => p.pesi_type.includes("Purak"))
    : view === "saptahik"
      ? pesi.filter((p) => p.pesi_type.includes("Saptahik"))
      : pesi.filter((p) => p.pesi_type.includes("Dainik"));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Virtual Pesi Dairy</h2>
          <p className="text-sm text-slate-500">व्हर्चुअल पेसी डायरी — {BS_CALENDAR.currentYear} {BS_CALENDAR.currentMonth}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200">
            <Icon name="print" size={16} /> Print Suchi
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}>
            <Icon name="plus" size={16} /> Add Pesi
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {views.map((v) => (
          <button key={v.key} onClick={() => setView(v.key)} className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${view === v.key ? "text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`} style={view === v.key ? { background: "#1A2B4A" } : {}}>
            <div>{v.label}</div>
            <div className="text-xs opacity-70">{v.nepali}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 text-center border-b border-slate-100" style={{ background: "linear-gradient(180deg, #F8F5EE, #FFFFFF)" }}>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">NyayaDesk Legal Services</p>
          <h3 className="text-lg font-bold text-slate-800 mt-1">{views.find((v) => v.key === view)?.label}</h3>
          <p className="text-slate-500 text-sm mt-0.5">मिति: {BS_CALENDAR.currentYear} {BS_CALENDAR.currentMonth} ७ गते</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#1A2B4A", color: "white" }}>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Case No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Parties</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Court / Judge</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Tarek Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-500 font-mono">{idx + 1}</td>
                  <td className="px-4 py-3 font-mono text-xs text-blue-600 font-semibold">{p.case?.case_number || "-"}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-700 text-xs leading-tight max-w-[160px]">{p.case?.title || "-"}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-xs text-slate-600">{p.court}</p>
                    <p className="text-xs text-slate-400">{p.judge}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-xs text-white px-2 py-1 rounded-lg" style={{ background: "#C9A84C" }}>{p.time}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">{p.tarek_type}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 max-w-[140px] truncate">{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12"><p className="text-slate-400">No entries for this Pesi type</p></div>}
      </div>
    </div>
  );
}
