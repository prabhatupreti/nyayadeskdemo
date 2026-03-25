import { getMeetings, getProfiles } from "@/lib/queries";
import { MeetingsClient } from "./client";

export default async function MeetingsPage() {
  const [meetings, profiles] = await Promise.all([getMeetings(), getProfiles()]);
  return <MeetingsClient meetings={meetings} profiles={profiles} />;
}
