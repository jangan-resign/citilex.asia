import { allSeoMoneyPages } from "../../../lib/seo-pages";
import { MoneyPagesClient, type DirectoryPageEntry } from "../../../components/cms/MoneyPagesClient";

export default function CmsMoneyPagesDirectory() {
  const moneyEntries: DirectoryPageEntry[] = allSeoMoneyPages.map((page) => ({
    slug: page.slug,
    label: page.h1Primary,
    title: page.metaTitle.replace(" | CITILEX ASIA", ""),
    group: page.category === "service" ? "Layanan & Intent B2B" : "Area Jabodetabek",
    keywords: page.keywords,
  }));

  const brandEntries: DirectoryPageEntry[] = [
    {
      slug: "portofolio",
      label: "portofolio produksi kami",
      title: "Portofolio Produksi Kaos & Polo Shirt CITILEX ASIA",
      group: "Profil & Portofolio",
      keywords: ["portofolio citilex asia", "hasil produksi kaos custom"],
    },
    {
      slug: "tentang-kami",
      label: "profil perusahaan Citilex Asia",
      title: "Tentang Kami — Partner Produksi Apparel Skala Besar",
      group: "Profil & Portofolio",
      keywords: ["tentang citilex asia", "pt nusa garment indonesia"],
    },
    {
      slug: "kontak",
      label: "kontak & lokasi resmi Citilex Asia",
      title: "Kontak & Lokasi Kantor Resmi CITILEX ASIA",
      group: "Profil & Portofolio",
      keywords: ["kontak citilex asia", "alamat bintaro yogyakarta"],
    },
  ];

  return <MoneyPagesClient entries={[...moneyEntries, ...brandEntries]} />;
}
