import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("konveksi-kaos-tangerang");

export default function KonveksiKaosTangerangPage() {
  const page = getSeoPageBySlug("konveksi-kaos-tangerang")!;
  return <MoneyPageTemplate page={page} />;
}
