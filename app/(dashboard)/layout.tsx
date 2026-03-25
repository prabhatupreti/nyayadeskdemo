import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/queries";
import { Sidebar } from "@/components/sidebar";
import { DashboardShell } from "./shell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/auth");

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#F5F7FA" }}>
      <Sidebar profile={profile} />
      <DashboardShell profile={profile}>{children}</DashboardShell>
    </div>
  );
}
