import { getPesi } from "@/lib/queries";
import { PesiClient } from "./client";

export default async function PesiPage() {
  const pesi = await getPesi();
  return <PesiClient pesi={pesi} />;
}
