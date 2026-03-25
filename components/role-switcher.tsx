"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_USERS } from "@/lib/static-data";
import { ROLE_COLORS, ROLE_LABELS } from "@/lib/constants";
import { Icon } from "@/components/ui/icon";

export function RoleSwitcher({ currentUserId }: { currentUserId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const current = DEMO_USERS.find((u) => u.id === currentUserId);

  function switchUser(userId: string) {
    document.cookie = `demo_user_id=${userId}; path=/; max-age=86400`;
    router.refresh();
    setOpen(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-14 right-0 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100" style={{ background: "linear-gradient(135deg, #1A2B4A, #2d4a7a)" }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#C9A84C" }}>
                  <Icon name="scale" size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Switch Demo Role</p>
                  <p className="text-xs" style={{ color: "#C9A84C" }}>Explore different user views</p>
                </div>
              </div>
            </div>

            {/* User List */}
            <div className="py-1.5 max-h-80 overflow-y-auto">
              {DEMO_USERS.slice(0, 8).map((u) => {
                const rc = ROLE_COLORS[u.role];
                const isActive = u.id === currentUserId;
                return (
                  <button
                    key={u.id}
                    onClick={() => switchUser(u.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left ${isActive ? "bg-blue-50" : ""}`}
                  >
                    {/* Avatar */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: isActive ? "#C9A84C" : "#1A2B4A" }}
                    >
                      {u.avatar}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{u.name}</p>
                      <p className="text-xs text-slate-400 truncate">{u.email}</p>
                    </div>
                    {/* Role Badge */}
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${rc.bg} ${rc.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1 ${rc.dot}`} />
                      {ROLE_LABELS[u.role]}
                    </span>
                    {isActive && (
                      <span className="ml-1 text-blue-500">
                        <Icon name="check" size={14} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50">
              <p className="text-xs text-slate-400 text-center">Switching role reloads the current page</p>
            </div>
          </div>
        </>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
        style={{ background: open ? "#C9A84C" : "#1A2B4A" }}
        title="Switch demo user role"
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white bg-opacity-20 text-xs font-bold">
          {current?.avatar || "?"}
        </div>
        <span className="hidden sm:inline">{open ? "Close" : `${current?.name.split(" ")[0]} (${ROLE_LABELS[current?.role ?? "ADMIN"]})`}</span>
        <Icon name={open ? "x" : "users"} size={16} />
      </button>
    </div>
  );
}
