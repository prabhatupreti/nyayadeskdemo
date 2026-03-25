"use client";

import { usePathname } from "next/navigation";
import { TopBar } from "@/components/topbar";
import { RoleSwitcher } from "@/components/role-switcher";
import type { Profile } from "@/lib/types";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/cases": "Cases",
  "/pesi": "Pesi Dairy",
  "/calendar": "BS Calendar",
  "/meetings": "Meetings",
  "/users": "Users & Roles",
  "/templates": "Templates",
  "/masterdata": "Master Data",
};

export function DashboardShell({ profile, children }: { profile: Profile; children: React.ReactNode }) {
  const pathname = usePathname();
  const title = TITLES[pathname] || pathname.split("/").pop() || "Dashboard";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar profile={profile} title={title} />
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      <RoleSwitcher currentUserId={profile.id} />
    </div>
  );
}
