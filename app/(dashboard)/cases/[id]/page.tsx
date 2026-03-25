import { getCaseById, getPesi, getDecisions, getProfiles } from "@/lib/queries";
import { notFound } from "next/navigation";
import { CaseDetailClient } from "./client";

export default async function CaseDetailPage({ params }: { params: { id: string } }) {
  const caseId = parseInt(params.id);
  const [caseData, pesi, decisions, profiles] = await Promise.all([
    getCaseById(caseId),
    getPesi(caseId),
    getDecisions(caseId),
    getProfiles(),
  ]);
  if (!caseData) notFound();
  return <CaseDetailClient caseData={caseData} pesi={pesi} decisions={decisions} profiles={profiles} />;
}
