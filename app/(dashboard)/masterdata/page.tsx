import { getMasterData } from "@/lib/queries";
import { MasterDataClient } from "./client";

export default async function MasterDataPage() {
  const data = await getMasterData();
  return <MasterDataClient initialData={data} />;
}
