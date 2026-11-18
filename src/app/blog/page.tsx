import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CtaSection from "../../components/sections/home/CtaSection";
import BlogListClient, { type PublicBlogCard } from "../../components/sections/blog/BlogListClient";
import { getPublishedBlogPosts } from "../../actions/cms";
import { getBlogIndexJsonLd } from "../../lib/json-ld";
import { seoServicePages } from "../../lib/seo-pages";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog & Panduan Apparel B2B | CITILEX ASIA",
  description:
    "Panduan pemilihan kain Cotton Combed vs Bamboo, teknik sablon DTF vs Plastisol, bordir komputer polo shirt, serta tips pengadaan kaos gathering & seragam perusahaan dari CITILEX ASIA.",
  alternates: {
    canonical: "https://citilex.asia/blog",
  },
  openGraph: {
    title: "Blog & Panduan Apparel B2B | CITILEX ASIA",
    description:
      "Referensi teknis pengadaan kaos custom, polo shirt bordir, bahan kain, dan estimasi produksi B2B bersama CITILEX ASIA.",
    url: "https://citilex.asia/blog",
    siteName: "Citilex Asia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog & Panduan Apparel B2B CITILEX ASIA",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const serviceLinkCardClass = [
  "group bg-white p-6 border border-brand-platinum",
  "hover:border-brand-primary hover:shadow-md",
  "transition-all duration-300 flex items-start justify-between gap-4",
].join(" ");

export default async function BlogIndexPage() {
  const rawPosts = await getPublishedBlogPosts().catch(() => []);

  const posts: PublicBlogCard[] = rawPosts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    coverAlt: p.coverAlt,
    category: p.category,
    readingTimeMin: p.readingTimeMin,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    authorName: p.authorName,
  }));

  const jsonLdPayload = getBlogIndexJsonLd(
    rawPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      coverImage: p.coverImage,
      category: p.category,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      authorName: p.authorName,
      publishedAt: p.publishedAt,
      updatedAt: p.updatedAt,
    }))
  );

  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPayload) }}
      />

      <Header />

      <main className="pt-8">
        {/* SECTION 1: HERO BLOG */}
        <section className="relative overflow-hidden px-6 md:px-12 pt-14 pb-16 md:pt-20 md:pb-20 border-b border-brand-platinum">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand-primary/[0.04] blur-3xl" />
          </div>

          <div className="relative max-w-[1280px] mx-auto space-y-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-onyx/75">
              <Link href="/" className="hover:text-brand-primary underline underline-offset-4 py-1">
                Beranda
              </Link>
              <span>/</span>
              <span className="font-semibold text-brand-primary">Blog</span>
            </nav>

            <p className="text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
              INSIGHT &amp; PANDUAN PENGADAAN B2B
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-brand-primary uppercase leading-[0.98] max-w-4xl">
              Blog &amp; Referensi{" "}
              <span className="bg-gradient-to-r from-black/95 via-[#F3D98B] to-black/95 bg-clip-text text-transparent">
                Produksi Apparel Korporat
              </span>
            </h1>

            <p className="text-base md:text-lg text-brand-onyx max-w-2xl leading-relaxed">
              Kumpulan panduan teknis pemilihan bahan kain, perbandingan sablon dan bordir komputer, serta referensi
              pengadaan kaos &amp; polo shirt untuk panitia acara, HRD, dan procurement perusahaan.
            </p>
          </div>
        </section>

        {/* SECTION 2: DAFTAR ARTIKEL */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-snow border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-10">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-primary uppercase">
              Artikel &amp; Panduan Terbaru
            </h2>
            <BlogListClient posts={posts} />
          </div>
        </section>

        {/* SECTION 3: PINTASAN MONEY PAGES */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
          <div className="max-w-[1280px] mx-auto space-y-8">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight uppercase text-brand-primary">
              Eksplorasi Layanan Produksi Citilex Asia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seoServicePages.map((service) => (
                <Link key={service.slug} href={`/${service.slug}`} className={serviceLinkCardClass}>
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                      {service.breadcrumbLabel}
                    </span>
                    <h3 className="text-sm font-extrabold uppercase tracking-tight text-brand-primary group-hover:underline underline-offset-4">
                      {service.h1Primary}
                    </h3>
                    <p className="text-xs text-brand-onyx/80 leading-relaxed">{service.h1Highlight}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-brand-primary mt-1" />
                </Link>
              ))}
              <Link href="/portofolio" className={serviceLinkCardClass}>
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                    Portofolio
                  </span>
                  <h3 className="text-sm font-extrabold uppercase tracking-tight text-brand-primary group-hover:underline underline-offset-4">
                    Hasil Produksi Klien
                  </h3>
                  <p className="text-xs text-brand-onyx/80 leading-relaxed">
                    Dokumentasi project Shopee, POS Indonesia, BANK BRI, Adhi Karya &amp; lainnya.
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-brand-primary mt-1" />
              </Link>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
