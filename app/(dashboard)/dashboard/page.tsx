import { getCurrentProfile, getCases, getPesi, getDecisions } from "@/lib/queries";
import { DashboardClient } from "./client";

export default async function DashboardPage() {
  const [profile, cases, pesi, decisions] = await Promise.all([
    getCurrentProfile(),
    getCases(),
    getPesi(),
    getDecisions(),
  ]);
  return <DashboardClient profile={profile!} cases={cases} pesi={pesi} decisions={decisions} />;
}
