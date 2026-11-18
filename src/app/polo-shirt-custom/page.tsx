import MoneyPageTemplate from "../../components/sections/seo/MoneyPageTemplate";
import { getSeoPageBySlug, getSeoPageMetadata } from "../../lib/seo-pages";

export const metadata = getSeoPageMetadata("polo-shirt-custom");

export default function PoloShirtCustomPage() {
  const page = getSeoPageBySlug("polo-shirt-custom")!;
  return <MoneyPageTemplate page={page} />;
}
