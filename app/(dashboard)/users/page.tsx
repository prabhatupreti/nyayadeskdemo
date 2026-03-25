import { getProfiles } from "@/lib/queries";
import { UsersClient } from "./client";

export default async function UsersPage() {
  const profiles = await getProfiles();
  return <UsersClient profiles={profiles} />;
}
