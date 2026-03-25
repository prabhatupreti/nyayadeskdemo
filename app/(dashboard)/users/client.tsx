"use client";

import { useState } from "react";
import { Avatar, RoleBadge, Modal } from "@/components/ui/shared";
import { Icon } from "@/components/ui/icon";
import type { Profile, UserRole } from "@/lib/types";

const RBAC_MATRIX: [string, ...Array<boolean | string>][] = [
  ["Case Create", true, false, false, true, false, false],
  ["Assign Lawyer", true, false, false, false, false, false],
  ["Add Pesi", true, true, true, false, false, false],
  ["Add Tarek", true, true, true, false, false, false],
  ["Add Decision", true, true, true, false, false, false],
  ["View Case", true, "assigned", "assigned", true, "own", "linked"],
  ["Master Data", true, false, false, false, false, false],
  ["Create Meeting", true, true, true, true, false, false],
];

export function UsersClient({ profiles }: { profiles: Profile[] }) {
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const roles: string[] = ["ALL", "ADMIN", "LAWYER", "EXTERNAL_LAWYER", "STAFF", "CLIENT", "WARIS"];

  const filtered = filter === "ALL" ? profiles : profiles.filter((u) => u.role === filter);

  return (
    <div className="space-y-5">
      {showAdd && (
        <Modal title="Create New User" onClose={() => setShowAdd(false)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                <input className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="Enter name..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Role</label>
                <select className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  {["ADMIN", "LAWYER", "EXTERNAL_LAWYER", "STAFF", "CLIENT", "WARIS"].map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
              <input type="email" className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="user@email.com" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase">Phone</label>
              <input type="tel" className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder="98XXXXXXXX" />
            </div>
            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}>Create & Send Invite</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100">Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Users & Roles</h2>
          <p className="text-sm text-slate-500">{profiles.length} team members & clients</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: "#1A2B4A" }}>
          <Icon name="plus" size={16} /> Add User
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {roles.map((r) => (
          <button key={r} onClick={() => setFilter(r)} className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === r ? "text-white" : "bg-white border border-slate-200 text-slate-600"}`} style={filter === r ? { background: "#1A2B4A" } : {}}>
            {r === "ALL" ? "All Users" : r.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <p className="font-semibold text-slate-700 text-sm">RBAC Permissions Matrix</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-3 py-2 text-left text-slate-500">Module</th>
                {["Admin", "Lawyer", "Ext.Lawyer", "Staff", "Client", "Waris"].map((r) => (
                  <th key={r} className="px-3 py-2 text-center text-slate-500">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {RBAC_MATRIX.map(([module, ...perms]) => (
                <tr key={module as string} className="hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium text-slate-700">{module as string}</td>
                  {(perms as Array<boolean | string>).map((p, i) => (
                    <td key={i} className="px-3 py-2 text-center">
                      {p === true ? <span className="text-green-500">✓</span>
                        : p === false ? <span className="text-slate-200">✗</span>
                          : <span className="text-amber-500 text-xs">{p as string}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((u) => (
          <div key={u.id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <Avatar initials={u.avatar} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-slate-800">{u.name}</p>
                <RoleBadge role={u.role} />
                <span className={`w-2 h-2 rounded-full ${u.is_active ? "bg-green-400" : "bg-slate-300"}`} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{u.email} • {u.phone}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"><Icon name="edit" size={16} /></button>
              <button className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"><Icon name="trash" size={16} /></button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No users found</p>}
      </div>
    </div>
  );
}
