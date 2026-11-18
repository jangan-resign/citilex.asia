import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("kaos-custom");

export default function KaosCustomPage() {
  const page = getSeoPageBySlug("kaos-custom")!;
  return <MoneyPageTemplate page={page} />;
}
