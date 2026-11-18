import { OrganizationSchema } from "./Organization";

export const KaosProductSchema = {
  "@type": "Product",
  "@id": "https://citilex.asia/#product-kaos-custom",
  "name": "Kaos Custom Perusahaan & Event (Polyester, Cotton Combed 30s/24s, Cotton Bamboo)",
  "description": "Layanan produksi kaos custom skala besar minimal order 50 pcs dengan pilihan bahan Polyester, Cotton Combed 30s/24s, dan Cotton Bamboo Premium serta sablon DTF, Rubber, Plastisol, atau Bordir Komputer.",
  "image": [
    "https://citilex.asia/galeri5.png",
    "https://citilex.asia/galeri6.png",
    "https://citilex.asia/galeri3.png"
  ],
  "brand": {
    "@type": "Brand",
    "name": OrganizationSchema.name
  },
  "manufacturer": {
    "@id": OrganizationSchema["@id"]
  },
  "offers": {
    "@type": "AggregateOffer",
    "url": "https://citilex.asia/#pricing",
    "priceCurrency": "IDR",
    "lowPrice": "55000",
    "highPrice": "89000",
    "offerCount": "3",
    "availability": "https://schema.org/InStock"
  }
};

export const PoloProductSchema = {
  "@type": "Product",
  "@id": "https://citilex.asia/#product-polo-custom",
  "name": "Polo Shirt Custom Bordir Komputer (Lacoste Soft, Lacoste Pique, Lacoste Diamond)",
  "description": "Layanan produksi polo shirt seragam kantor dan event perusahaan minimal order 50 pcs menggunakan bahan Lacoste Soft, Lacoste Pique, dan Lacoste Diamond Premium dengan bordir komputer presisi.",
  "image": [
    "https://citilex.asia/lia-karina.png",
    "https://citilex.asia/og-image.png"
  ],
  "brand": {
    "@type": "Brand",
    "name": OrganizationSchema.name
  },
  "manufacturer": {
    "@id": OrganizationSchema["@id"]
  },
  "offers": {
    "@type": "AggregateOffer",
    "url": "https://citilex.asia/#pricing-polo",
    "priceCurrency": "IDR",
    "lowPrice": "79000",
    "highPrice": "119000",
    "offerCount": "3",
    "availability": "https://schema.org/InStock"
  }
};
