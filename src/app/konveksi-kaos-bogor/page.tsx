import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("konveksi-kaos-bogor");

export default function KonveksiKaosBogorPage() {
  const page = getSeoPageBySlug("konveksi-kaos-bogor")!;
  return <MoneyPageTemplate page={page} />;
}
