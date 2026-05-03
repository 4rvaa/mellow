import MellowDirectory from "../MellowDirectory";
import { getVenues } from "../../lib/getVenues";

export const revalidate = 300;

type SearchParams = Promise<{
  search?: string;
  area?: string;
  openLate?: string;
  wifi?: string;
  power?: string;
  quiet?: string;
  verified?: string;
}>;

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const venues = await getVenues();

  return (
    <MellowDirectory
      venues={venues}
      initialFilters={{
        search: params.search ?? "",
        area: params.area ?? "All",
        openLateOnly: params.openLate === "true",
        wifiOnly: params.wifi === "true",
        powerOnly: params.power === "true",
        quietOnly: params.quiet === "true",
        verifiedOnly: params.verified === "true",
      }}
    />
  );
}