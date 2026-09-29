import { companyConfig } from "../../config/company";

export const OrganizationSchema = {
  "@type": "Organization",
  "@id": "https://citilex.asia/#organization",
  "name": companyConfig.name,
  "url": "https://citilex.asia",
  "logo": {
    "@type": "ImageObject",
    "url": "https://citilex.asia/logo.png",
    "caption": `${companyConfig.name} Logo`,
  },
  "email": "behagroup@gmail.com",
  "telephone": "+6281319888488",
  "parentOrganization": {
    "@type": "Organization",
    "name": "PT Nusa Garment Indonesia",
  },
  "slogan": "Produksi Kaos Skala Besar"
};
