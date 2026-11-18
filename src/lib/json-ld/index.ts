import { OrganizationSchema } from "./Organization";
import { LocalBusinessSchema } from "./LocalBusiness";
import { FaqPageSchema } from "./Faq";
import { GalleryItemListSchema } from "./ItemList";
import { KaosProductSchema, PoloProductSchema } from "./Product";
import type { SeoMoneyPage } from "../seo-pages";

export const getHomePageJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationSchema,
      LocalBusinessSchema,
      KaosProductSchema,
      PoloProductSchema,
      FaqPageSchema,
      GalleryItemListSchema
    ]
  };
};

export const getMoneyPageJsonLd = (page: SeoMoneyPage) => {
  const pageUrl = `https://citilex.asia/${page.slug}`;

  const productSchemas = [
    ...(page.pricingMode === "kaos" || page.pricingMode === "both" ? [KaosProductSchema] : []),
    ...(page.pricingMode === "polo" || page.pricingMode === "both" ? [PoloProductSchema] : []),
  ];

  const serviceSchema = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    "name": page.metaTitle.replace(" | CITILEX ASIA", ""),
    "description": page.metaDescription,
    "url": pageUrl,
    "serviceType": page.breadcrumbLabel,
    "provider": {
      "@id": OrganizationSchema["@id"]
    },
    "areaServed": LocalBusinessSchema.areaServed
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "https://citilex.asia"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.breadcrumbLabel,
        "item": pageUrl
      }
    ]
  };

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": page.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationSchema,
      LocalBusinessSchema,
      serviceSchema,
      ...productSchemas,
      breadcrumbSchema,
      faqSchema
    ]
  };
};
