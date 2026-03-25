"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";

const TEMPLATES = [
  {
    id: 1, name: "Vakalatnama", category: "Court Filing",
    description: "Power of attorney from client authorizing lawyer to represent in court proceedings.",
    lastUpdated: "असोज ५, २०८१", uses: 34, icon: "document",
  },
  {
    id: 2, name: "Court Application (Darkhasta)", category: "Court Filing",
    description: "Standard application format for filing requests before district and high courts.",
    lastUpdated: "भदौ २०, २०८१", uses: 21, icon: "briefcase",
  },
  {
    id: 3, name: "Legal Notice", category: "Notices",
    description: "Formal demand notice sent before initiating legal proceedings. Covers property, contracts and recovery matters.",
    lastUpdated: "साउन १०, २०८१", uses: 18, icon: "alert",
  },
  {
    id: 4, name: "Writ Petition (Mandamus)", category: "Constitutional",
    description: "Writ petition template for filing before High Court or Supreme Court under Article 133/144.",
    lastUpdated: "असोज १, २०८१", uses: 9, icon: "scale",
  },
  {
    id: 5, name: "Bail Application", category: "Criminal",
    description: "Application for bail before magistrate or sessions court under MULUKI APRADH SANHITA.",
    lastUpdated: "भदौ ५, २०८१", uses: 15, icon: "users",
  },
  {
    id: 6, name: "Appeal (Punarabedan)", category: "Appeals",
    description: "Appeal format for challenging lower court orders before High Court or Supreme Court.",
    lastUpdated: "साउन २५, २०८१", uses: 7, icon: "chevronRight",
  },
  {
    id: 7, name: "Interim Order Application", category: "Urgent Relief",
    description: "Application seeking temporary relief (Antarim Aadesh) pending final disposal of the case.",
    lastUpdated: "असोज ३, २०८१", uses: 12, icon: "alert",
  },
  {
    id: 8, name: "Evidence List (Praman)", category: "Evidence",
    description: "Formatted list of documentary and oral evidence to be submitted before court with index.",
    lastUpdated: "भदौ १५, २०८१", uses: 26, icon: "document",
  },
  {
    id: 9, name: "Partition Deed Draft", category: "Property",
    description: "Draft partition deed for ancestral property division between co-owners / family members.",
    lastUpdated: "जेठ २८, २०८१", uses: 5, icon: "briefcase",
  },
  {
    id: 10, name: "Demand Notice — Loan Recovery", category: "Banking",
    description: "Pre-litigation demand letter for loan recovery. Compliant with BAFIA 2073 requirements.",
    lastUpdated: "असार १२, २०८१", uses: 11, icon: "alert",
  },
  {
    id: 11, name: "Contract Termination Notice", category: "Contracts",
    description: "Notice of termination for breach of contract with statement of damages claimed.",
    lastUpdated: "साउन ५, २०८१", uses: 8, icon: "document",
  },
  {
    id: 12, name: "Labor Grievance Application", category: "Labor",
    description: "Application to Labor Office / Labor Court under Labor Act 2074 for wrongful termination or unpaid wages.",
    lastUpdated: "भदौ १०, २०८१", uses: 6, icon: "users",
  },
];

const CATEGORIES = ["All", "Court Filing", "Notices", "Criminal", "Constitutional", "Appeals", "Urgent Relief", "Evidence", "Property", "Banking", "Contracts", "Labor"];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = TEMPLATES.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "All" || t.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Document Templates</h2>
          <p className="text-sm text-slate-500">Reusable legal document formats for all case types</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}>
          <Icon name="plus" size={16} /> New Template
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-3 flex-wrap">
        <div className="flex-1 min-w-48 relative">
          <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Templates", value: TEMPLATES.length, color: "#EEF2FF", text: "#1A2B4A" },
          { label: "Total Uses", value: TEMPLATES.reduce((a, t) => a + t.uses, 0), color: "#FEF3C7", text: "#C9A84C" },
          { label: "Categories", value: CATEGORIES.length - 1, color: "#DCFCE7", text: "#16A34A" },
          { label: "Showing", value: filtered.length, color: "#F1F5F9", text: "#64748B" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: s.color }}>
            <p className="text-2xl font-bold" style={{ color: s.text }}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#EEF2FF" }}>
                <Icon name={t.icon} size={22} className="text-blue-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-slate-800">{t.name}</p>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{t.category}</span>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{t.uses} uses</span>
                </div>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{t.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-slate-400">Updated: {t.lastUpdated}</p>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">Preview</button>
                    <button className="text-xs px-3 py-1.5 rounded-lg text-white transition-colors" style={{ background: "#1A2B4A" }}>Use Template</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-slate-400">
            <Icon name="document" size={32} className="mx-auto mb-3" />
            <p>No templates match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
