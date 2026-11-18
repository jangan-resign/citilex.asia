import { OrganizationSchema } from "./Organization";
import { LocalBusinessSchema } from "./LocalBusiness";
import { FaqPageSchema } from "./Faq";
import { GalleryItemListSchema, PortfolioItemListSchema } from "./ItemList";
import { KaosProductSchema, PoloProductSchema } from "./Product";
import type { SeoMoneyPage } from "../seo-pages";

export const getHomePageJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://citilex.asia/#website",
        "url": "https://citilex.asia",
        "name": "CITILEX ASIA — Produsen Kaos & Polo Custom Korporat",
        "inLanguage": "id-ID",
        "publisher": {
          "@id": OrganizationSchema["@id"]
        }
      },
      OrganizationSchema,
      LocalBusinessSchema,
      KaosProductSchema,
      PoloProductSchema,
      FaqPageSchema,
      GalleryItemListSchema,
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://citilex.asia"
          }
        ]
      }
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

export const getContactPageJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationSchema,
      LocalBusinessSchema,
      {
        "@type": "ContactPage",
        "@id": "https://citilex.asia/kontak#webpage",
        "url": "https://citilex.asia/kontak",
        "name": "Kontak & Lokasi Kantor Resmi CITILEX ASIA",
        "description": "Hubungi tim produksi CITILEX ASIA via WhatsApp (+6281329271515), email (behagroup@gmail.com), atau kunjungi Jakarta Rep. Office (Bintaro) dan Production Center Yogyakarta.",
        "mainEntity": {
          "@id": LocalBusinessSchema["@id"]
        }
      },
      {
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
            "name": "Kontak",
            "item": "https://citilex.asia/kontak"
          }
        ]
      }
    ]
  };
};

export const getPortfolioPageJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationSchema,
      LocalBusinessSchema,
      PortfolioItemListSchema,
      {
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
            "name": "Portofolio",
            "item": "https://citilex.asia/portofolio"
          }
        ]
      }
    ]
  };
};

export const getAboutPageJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationSchema,
      LocalBusinessSchema,
      {
        "@type": "AboutPage",
        "@id": "https://citilex.asia/tentang-kami#webpage",
        "url": "https://citilex.asia/tentang-kami",
        "name": "Tentang CITILEX ASIA - Partner Produksi Apparel Skala Besar",
        "description": "CITILEX ASIA adalah apparel manufacturing partner di bawah PT Nusa Garment Indonesia untuk corporate, instansi, event organizer, dan brand dengan Representative Office di Jakarta dan Production Center di Yogyakarta.",
        "mainEntity": {
          "@id": OrganizationSchema["@id"]
        }
      },
      {
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
            "name": "Tentang Kami",
            "item": "https://citilex.asia/tentang-kami"
          }
        ]
      }
    ]
  };
};

export interface BlogJsonLdInput {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  authorName: string;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
  faqItems?: { question: string; answer: string }[];
}

function resolveAbsoluteUrl(url?: string | null): string {
  if (!url) return "https://citilex.asia/og-image.png";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://citilex.asia${url.startsWith("/") ? url : `/${url}`}`;
}

export const getBlogIndexJsonLd = (posts: BlogJsonLdInput[]) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationSchema,
      LocalBusinessSchema,
      {
        "@type": "CollectionPage",
        "@id": "https://citilex.asia/blog#webpage",
        "url": "https://citilex.asia/blog",
        "name": "Blog & Panduan Apparel B2B | CITILEX ASIA",
        "description":
          "Kumpulan panduan teknis bahan kain, sablon DTF vs Plastisol, bordir komputer polo shirt, dan perencanaan anggaran kaos custom perusahaan.",
      },
      {
        "@type": "ItemList",
        "name": "Artikel Panduan Apparel CITILEX ASIA",
        "numberOfItems": posts.length,
        "itemListElement": posts.map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://citilex.asia/blog/${post.slug}`,
          "name": post.title,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beranda",
            "item": "https://citilex.asia",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://citilex.asia/blog",
          },
        ],
      },
    ],
  };
};

export const getBlogPostJsonLd = (post: BlogJsonLdInput) => {
  const pageUrl = `https://citilex.asia/blog/${post.slug}`;
  const publishedIso = post.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : new Date().toISOString();
  const modifiedIso = post.updatedAt ? new Date(post.updatedAt).toISOString() : publishedIso;

  const validFaqs = (post.faqItems || []).filter(
    (item) => item.question.trim().length > 0 && item.answer.trim().length > 0
  );

  const graph: Record<string, unknown>[] = [
    OrganizationSchema,
    LocalBusinessSchema,
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      "headline": post.metaTitle || post.title,
      "description": post.metaDescription || post.excerpt,
      "image": resolveAbsoluteUrl(post.coverImage),
      "datePublished": publishedIso,
      "dateModified": modifiedIso,
      "articleSection": post.category,
      "inLanguage": "id-ID",
      "author": {
        "@type": "Person",
        "name": post.authorName || "Tim Editorial Citilex Asia",
      },
      "publisher": {
        "@id": OrganizationSchema["@id"],
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Beranda",
          "item": "https://citilex.asia",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://citilex.asia/blog",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": pageUrl,
        },
      ],
    },
  ];

  if (validFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "mainEntity": validFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};
