import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("konveksi-kaos-jakarta-selatan");

export default function KonveksiKaosJakartaSelatanPage() {
  const page = getSeoPageBySlug("konveksi-kaos-jakarta-selatan")!;
  return <MoneyPageTemplate page={page} />;
}
