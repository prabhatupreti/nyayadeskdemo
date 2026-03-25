"use server";

import { cookies } from "next/headers";
import { getDemoUser, DEMO_USERS, STATIC_CASES, STATIC_PESI, STATIC_DECISIONS, STATIC_MEETINGS, STATIC_MASTER_DATA } from "./static-data";
import type { Case, Pesi, Decision, Meeting, MasterData, Profile } from "./types";

export async function getCurrentProfile(): Promise<Profile | null> {
  const cookieStore = cookies();
  const userId = cookieStore.get("demo_user_id")?.value;
  if (!userId) return null;
  return getDemoUser(userId) ?? null;
}

export async function getProfiles(): Promise<Profile[]> {
  return DEMO_USERS;
}

export async function getCases(): Promise<Case[]> {
  return STATIC_CASES;
}

export async function getCaseById(id: number): Promise<Case | null> {
  return STATIC_CASES.find((c) => c.id === id) ?? null;
}

export async function getPesi(caseId?: number): Promise<Pesi[]> {
  if (caseId) return STATIC_PESI.filter((p) => p.case_id === caseId);
  return STATIC_PESI;
}

export async function getDecisions(caseId?: number): Promise<Decision[]> {
  if (caseId) return STATIC_DECISIONS.filter((d) => d.case_id === caseId);
  return STATIC_DECISIONS;
}

export async function getMeetings(): Promise<Meeting[]> {
  return STATIC_MEETINGS;
}

export async function getMasterData(category?: string): Promise<MasterData[]> {
  if (category) return STATIC_MASTER_DATA.filter((m) => m.category === category);
  return STATIC_MASTER_DATA;
}

export async function addMasterDataItem(_category: string, _value: string): Promise<MasterData | null> {
  return null;
}

export async function deleteMasterDataItem(_id: number): Promise<void> {}
