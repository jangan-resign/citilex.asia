import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("konveksi-kaos-jakarta");

export default function KonveksiKaosJakartaPage() {
  const page = getSeoPageBySlug("konveksi-kaos-jakarta")!;
  return <MoneyPageTemplate page={page} />;
}
