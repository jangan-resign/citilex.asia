import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("kaos-gathering-kantor");

export default function KaosGatheringKantorPage() {
  const page = getSeoPageBySlug("kaos-gathering-kantor")!;
  return <MoneyPageTemplate page={page} />;
}
