import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("konveksi-kaos-depok");

export default function KonveksiKaosDepokPage() {
  const page = getSeoPageBySlug("konveksi-kaos-depok")!;
  return <MoneyPageTemplate page={page} />;
}
