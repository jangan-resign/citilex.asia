import { OrganizationSchema } from "./Organization";

export const LocalBusinessSchema = {
  "@type": "LocalBusiness",
  "@id": "https://citilex.asia/#localbusiness",
  "name": OrganizationSchema.name,
  "legalName": OrganizationSchema.parentOrganization.name,
  "url": OrganizationSchema.url,
  "image": "https://citilex.asia/hero.png",
  "logo": OrganizationSchema.logo,
  "founder": {
    "@type": "Person",
    "name": "Thofhan Zaka Anshori",
  },
  "description": "Vendor kaos custom untuk perusahaan, event, komunitas, dan instansi dengan kapasitas produksi skala besar.",
  "telephone": OrganizationSchema.telephone,
  "email": OrganizationSchema.email,
  "priceRange": "Rp55.000-Rp89000",
  "currenciesAccepted": "IDR",
  "paymentAccepted": [
    "Bank Transfer",
    "Cash"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rep. Office PT Nusa Garment Indonesia, Jl. Bintaro Tengah Blok J4 No.12",
    "addressLocality": "Jakarta Selatan",
    "addressRegion": "DKI Jakarta",
    "postalCode": "12330",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.271811231366158,
    "longitude": 106.75307544856076
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "foundingLocation": {
    "@type": "Place",
    "name": "Yogyakarta"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": OrganizationSchema.telephone,
    "contactType": "customer service",
    "areaServed": "ID",
    "availableLanguage": "id"
  },
  "hasMap": "https://maps.app.goo.gl/TCbUWmqaG9rHAdoL7",
  "sameAs": [
    "https://www.instagram.com/citilexasia",
    "https://www.youtube.com/@citilexasia",
    "https://www.facebook.com/citilex.asia"
  ],
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "DKI Jakarta" },
    { "@type": "AdministrativeArea", "name": "Bandung Raya" },
    { "@type": "AdministrativeArea", "name": "Semarang" },
    { "@type": "AdministrativeArea", "name": "Daerah Istimewa Yogyakarta" },
    { "@type": "AdministrativeArea", "name": "Surabaya" },
    { "@type": "AdministrativeArea", "name": "Malang" }
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "Indonesia"
  },
  "knowsAbout": [
    "Vendor Kaos Custom",
    "Vendor Polo Shirt",
    "Kaos Event",
    "Kaos Perusahaan",
    "Seragam Kerja",
    "Polo Shirt Bordir"
  ]
};
