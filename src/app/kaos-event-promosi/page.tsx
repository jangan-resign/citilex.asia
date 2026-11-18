import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("kaos-event-promosi");

export default function KaosEventPromosiPage() {
  const page = getSeoPageBySlug("kaos-event-promosi")!;
  return <MoneyPageTemplate page={page} />;
}
