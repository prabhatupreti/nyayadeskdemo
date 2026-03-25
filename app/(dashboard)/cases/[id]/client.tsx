"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBadge, Avatar } from "@/components/ui/shared";
import { Icon } from "@/components/ui/icon";
import type { Case, Pesi, Decision, Profile } from "@/lib/types";

export function CaseDetailClient({ caseData, pesi, decisions, profiles }: {
  caseData: Case; pesi: Pesi[]; decisions: Decision[]; profiles: Profile[];
}) {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "pesi", "tarek", "decisions", "documents", "events"];

  return (
    <div className="space-y-5">
      <Link href="/cases" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
        <Icon name="arrowLeft" size={16} /> Back to Cases
      </Link>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm text-slate-400 bg-slate-50 px-3 py-1 rounded-lg">{caseData.case_number}</span>
              <span className="text-sm bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{caseData.case_type}</span>
              <StatusBadge status={caseData.status} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 mt-2">{caseData.title}</h1>
            <p className="text-sm text-slate-500 mt-1">{caseData.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors">
              <Icon name="print" size={16} /> Export PDF
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}>
              <Icon name="edit" size={16} /> Edit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-50">
          {[
            { label: "Court", value: caseData.court, icon: "⚖" },
            { label: "Client", value: caseData.client?.name || "-", icon: "👤" },
            { label: "Lawyer", value: caseData.lawyer?.name || "-", icon: "🧑‍⚖️" },
            { label: "Filed Date", value: caseData.date_bs || "-", icon: "📅" },
          ].map((d) => (
            <div key={d.label}>
              <p className="text-xs text-slate-400">{d.label}</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">{d.icon} {d.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}>
            {t === "pesi" ? "Pesi" : t === "tarek" ? "Tarek" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-3">Case Assignees</h3>
            <div className="space-y-3">
              {[caseData.lawyer, caseData.client].filter(Boolean).map((user: any) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar initials={user.avatar} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-3">Case Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Pesi Entries</span><span className="font-semibold text-slate-700">{pesi.length}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Court Decisions</span><span className="font-semibold text-slate-700">{decisions.length}</span></div>
            </div>
          </div>
        </div>
      )}

      {tab === "pesi" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-700">Pesi Entries</h3>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}><Icon name="plus" size={16} /> Add Pesi</button>
          </div>
          {pesi.length > 0 ? pesi.map((p) => (
            <div key={p.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">{p.pesi_type}</span>
                  <p className="font-semibold text-slate-700 mt-2">{p.date_bs} — {p.time}</p>
                  <p className="text-sm text-slate-500">{p.court}</p>
                  <p className="text-xs text-slate-400 mt-1">{p.judge}</p>
                </div>
                <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">{p.tarek_type}</span>
              </div>
              {p.notes && <p className="text-sm text-slate-600 mt-2 bg-slate-50 rounded-lg px-3 py-2">{p.notes}</p>}
            </div>
          )) : <p className="text-sm text-slate-400 text-center py-8">No Pesi entries yet</p>}
        </div>
      )}

      {tab === "decisions" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-700">Court Decisions</h3>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}><Icon name="plus" size={16} /> Add Decision</button>
          </div>
          {decisions.length > 0 ? decisions.map((d) => (
            <div key={d.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${d.type === "Faisala" ? "bg-green-100 text-green-700" : d.type === "Antarim Aadesh" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{d.type}</span>
                  <p className="text-sm text-slate-600 mt-2">{d.summary}</p>
                  <p className="text-xs text-slate-400 mt-2">Added by {d.uploader?.name || "Unknown"} • {d.date_bs}</p>
                </div>
              </div>
            </div>
          )) : <p className="text-sm text-slate-400 text-center py-8">No decisions recorded yet</p>}
        </div>
      )}

      {(tab === "documents" || tab === "tarek" || tab === "events") && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-3" style={{ background: "#EEF2FF" }}>
            <Icon name={tab === "documents" ? "document" : tab === "tarek" ? "calendar" : "meeting"} size={24} />
          </div>
          <p className="font-semibold text-slate-600">{tab.charAt(0).toUpperCase() + tab.slice(1)} entries will appear here</p>
          <p className="text-sm text-slate-400 mt-1">Click the + button to add new {tab} entries</p>
          <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white mx-auto" style={{ background: "#1A2B4A" }}>
            <Icon name="plus" size={16} /> Add {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        </div>
      )}
    </div>
  );
}
