import { getCases, getMasterData } from "@/lib/queries";
import { CasesClient } from "./client";

export default async function CasesPage() {
  const [cases, caseTypes] = await Promise.all([
    getCases(),
    getMasterData("case_type"),
  ]);
  return <CasesClient cases={cases} caseTypes={caseTypes.map((m) => m.value)} />;
}
