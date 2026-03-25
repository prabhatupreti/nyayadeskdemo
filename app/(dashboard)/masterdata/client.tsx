"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { MasterData } from "@/lib/types";

const TABS = [
  { key: "case_type",   label: "Case Types",      icon: "briefcase" },
  { key: "court",       label: "Courts",           icon: "scale" },
  { key: "judge",       label: "Judges",           icon: "users" },
  { key: "tarek_type",  label: "Tarek Types",      icon: "calendar" },
];

export function MasterDataClient({ initialData }: { initialData: MasterData[] }) {
  const [activeTab, setActiveTab] = useState("case_type");
  const [newItem, setNewItem] = useState("");
  const [localData, setLocalData] = useState<MasterData[]>(initialData);
  const [toast, setToast] = useState<string | null>(null);

  const items = localData.filter((d) => d.category === activeTab);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleAdd() {
    if (!newItem.trim()) return;
    const next: MasterData = {
      id: Date.now(),
      category: activeTab,
      value: newItem.trim(),
      sort_order: items.length + 1,
    };
    setLocalData((d) => [...d, next]);
    setNewItem("");
    showToast(`"${next.value}" added to ${TABS.find((t) => t.key === activeTab)?.label}`);
  }

  function handleDelete(id: number, value: string) {
    setLocalData((d) => d.filter((item) => item.id !== id));
    showToast(`"${value}" removed`);
  }

  const activeTabInfo = TABS.find((t) => t.key === activeTab);

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm">
          <Icon name="check" size={16} className="text-green-400" />
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Master Data Management</h2>
          <p className="text-sm text-slate-500">Admin-only configuration for dropdown values and reference data</p>
        </div>
        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full font-semibold">
          🔒 Admin Only — Changes are session-local in demo
        </span>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TABS.map((t) => {
          const count = localData.filter((d) => d.category === t.key).length;
          return (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`rounded-xl p-4 text-left transition-all border ${activeTab === t.key ? "text-white shadow-md border-transparent" : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"}`}
              style={activeTab === t.key ? { background: "#1A2B4A" } : {}}>
              <p className={`text-2xl font-bold ${activeTab === t.key ? "text-white" : "text-slate-800"}`}>{count}</p>
              <p className={`text-xs mt-0.5 ${activeTab === t.key ? "text-blue-200" : "text-slate-500"}`}>{t.label}</p>
            </button>
          );
        })}
      </div>

      {/* Main panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-slate-100 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${activeTab === t.key ? "border-blue-600 text-blue-700 bg-blue-50" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
              <Icon name={t.icon} size={16} />
              {t.label}
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${activeTab === t.key ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}`}>
                {localData.filter((d) => d.category === t.key).length}
              </span>
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Add input */}
          <div className="flex gap-2 mb-5">
            <div className="flex-1 relative">
              <Icon name="plus" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder={`Add new ${activeTabInfo?.label.toLowerCase().slice(0, -1)}...`}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#1A2B4A" }}>
              <Icon name="plus" size={16} /> Add
            </button>
          </div>

          {/* Items list */}
          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <div key={item.id}
                className="flex items-center justify-between gap-3 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-300 w-5 text-right">{idx + 1}</span>
                  <span className="text-sm text-slate-700 font-medium">{item.value}</span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                    <Icon name="edit" size={14} />
                  </button>
                  <button onClick={() => handleDelete(item.id, item.value)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                    <Icon name="trash" size={14} />
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                No {activeTabInfo?.label.toLowerCase()} configured yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RBAC note */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
        <Icon name="alert" size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Demo Mode Notice</p>
          <p className="text-xs text-amber-600 mt-0.5">
            In this demo, master data changes are local to your browser session and will reset on page reload.
            In production, all changes persist to the database and are immediately available across all users.
          </p>
        </div>
      </div>
    </div>
  );
}
