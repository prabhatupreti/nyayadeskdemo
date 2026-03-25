"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { DEMO_USERS } from "@/lib/static-data";
import { RoleBadge, Avatar } from "@/components/ui/shared";

export default function AuthPage() {
  const router = useRouter();

  function handleLogin(userId: string) {
    document.cookie = `demo_user_id=${userId}; path=/; max-age=86400`;
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #1A2B4A 0%, #2d4a7a 100%)" }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-5" style={{ background: "#C9A84C" }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-5" style={{ background: "#C9A84C" }} />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: "#C9A84C" }}>
            <Icon name="scale" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">NyayaDesk</h1>
          <p className="text-sm mt-1.5" style={{ color: "#C9A84C" }}>न्याय Desk — Legal ERP Demo</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Select Demo User</h2>
            <p className="text-sm text-slate-500 mt-0.5">Pick a role to explore the system</p>
          </div>

          <div className="divide-y divide-slate-50">
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                onClick={() => handleLogin(u.id)}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-all text-left group"
              >
                <Avatar initials={u.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{u.name}</p>
                  <p className="text-xs text-slate-400">{u.email}</p>
                </div>
                <RoleBadge role={u.role} />
                <Icon name="chevronRight" size={16} className="text-slate-200 group-hover:text-slate-400 transition-colors ml-1" />
              </button>
            ))}
          </div>

          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">
              🔒 Demo mode — no real data stored. All data is sample/illustrative.
            </p>
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: "rgba(201,168,76,0.6)" }}>
          NyayaDesk Legal ERP • Powered by न्याय Desk
        </p>
      </div>
    </div>
  );
}
