"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { Icon } from "@/components/ui/icon";
import { Avatar, RoleBadge } from "@/components/ui/shared";
import type { Profile } from "@/lib/types";

export function Sidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const visibleNav = NAV_ITEMS.filter(
    (n) => !n.adminOnly || profile.role === "ADMIN"
  );

  function handleLogout() {
    document.cookie = "demo_user_id=; path=/; max-age=0";
    router.push("/auth");
    router.refresh();
  }

  const activeKey = NAV_ITEMS.find((n) => pathname.startsWith(n.href))?.key;

  return (
    <>
      <button onClick={() => setOpen(true)} className="lg:hidden fixed top-3 left-3 z-40 p-2 rounded-lg bg-white shadow-md hover:bg-slate-100 transition-colors">
        <Icon name="menu" size={20} />
      </button>

      {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 flex-shrink-0 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`} style={{ background: "#1A2B4A" }}>
        <div className="p-5 border-b border-white border-opacity-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#C9A84C" }}>
              <Icon name="scale" size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white font-display" style={{ fontSize: "16px" }}>NyayaDesk</p>
              <p className="text-xs" style={{ color: "#C9A84C" }}>न्याय Desk — Legal ERP</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {visibleNav.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { router.push(item.href); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white hover:bg-opacity-5"}`}
                style={isActive ? { background: "rgba(201,168,76,0.2)", color: "#C9A84C" } : {}}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white border-opacity-10">
          <div className="flex items-center gap-3 p-2">
            <Avatar initials={profile.avatar} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{profile.name}</p>
              <RoleBadge role={profile.role} />
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors" title="Sign out">
              <Icon name="logout" size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
