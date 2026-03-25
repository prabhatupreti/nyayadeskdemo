"use client";

import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/shared";
import { BS_CALENDAR } from "@/lib/constants";
import type { Profile } from "@/lib/types";

export function TopBar({ profile, title }: { profile: Profile; title: string }) {
  return (
    <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between gap-3 flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 lg:hidden" />
        <div className="hidden sm:block">
          <h1 className="text-sm font-bold text-slate-800 capitalize">{title}</h1>
          <p className="text-xs text-slate-400">{BS_CALENDAR.currentYear} {BS_CALENDAR.currentMonth} ७ • {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <Icon name="bell" size={20} className="text-slate-500" />
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-white flex items-center justify-center text-xs font-bold" style={{ background: "#EF4444", fontSize: "9px" }}>3</span>
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
          <Avatar initials={profile.avatar} size="sm" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-700">{profile.name.split(" ")[0]}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
