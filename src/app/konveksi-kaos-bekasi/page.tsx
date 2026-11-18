import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("konveksi-kaos-bekasi");

export default function KonveksiKaosBekasiPage() {
  const page = getSeoPageBySlug("konveksi-kaos-bekasi")!;
  return <MoneyPageTemplate page={page} />;
}
