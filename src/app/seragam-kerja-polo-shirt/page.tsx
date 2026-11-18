import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("seragam-kerja-polo-shirt");

export default function SeragamKerjaPoloShirtPage() {
  const page = getSeoPageBySlug("seragam-kerja-polo-shirt")!;
  return <MoneyPageTemplate page={page} />;
}
