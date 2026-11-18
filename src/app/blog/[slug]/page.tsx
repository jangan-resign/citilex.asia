import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, ArrowUpRight } from "lucide-react";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import CtaSection from "../../../components/sections/home/CtaSection";
import MoneyPageFaqSection from "../../../components/sections/seo/MoneyPageFaqSection";
import WhatsAppButton from "../../../components/ui/WhatsAppButton";
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
} from "../../../actions/cms";
import { getBlogPostJsonLd } from "../../../lib/json-ld";
import { MarkdownArticleContent } from "../../../lib/markdown-renderer";
import { seoServicePages } from "../../../lib/seo-pages";
import type { BlogFaqItem } from "../../../lib/cms-utils";

export const revalidate = 60;

const articleWaBtnClass = [
  "group relative overflow-hidden",
  "inline-flex items-center justify-center",
  "px-8 py-4",
  "bg-gradient-to-r from-[#F8E7B9] via-[#D4AF37] to-[#B8860B]",
  "text-black text-xs font-bold tracking-[0.18em] uppercase",
  "shadow-[0_0_40px_rgba(212,175,55,0.2)]",
  "hover:-translate-y-1 transition-all duration-300",
].join(" ");

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug).catch(() => null);
  if (!post) return {};

  const canonicalUrl = `https://citilex.asia/blog/${post.slug}`;
  const title = post.metaTitle || `${post.title} | CITILEX ASIA`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    keywords: [post.targetKeyword || "", ...post.tags].filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Citilex Asia",
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: [
        {
          url: post.coverImage || "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.coverAlt || post.title,
        },
      ],
      locale: "id_ID",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug).catch(() => null);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedBlogPosts().catch(() => []);
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const faqItems: BlogFaqItem[] = Array.isArray(post.faqItems)
    ? (post.faqItems as unknown as BlogFaqItem[])
    : [];

  const jsonLd = getBlogPostJsonLd({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: post.category,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    authorName: post.authorName,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    faqItems,
  });

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(post.publishedAt)
    : "";

  const waMessage = `Halo CITILEX ASIA, saya baru membaca artikel "${post.title}" dan ingin konsultasi kebutuhan produksi kaos/polo custom (minimal 50 pcs).`;

  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="pt-8">
        {/* HERO HEADER ARTIKEL */}
        <section className="px-6 md:px-12 pt-14 pb-12 border-b border-brand-platinum bg-white">
          <div className="max-w-[1280px] mx-auto space-y-6">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-brand-onyx/75">
              <Link href="/" className="hover:text-brand-primary underline underline-offset-4 py-1">
                Beranda
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand-primary underline underline-offset-4 py-1">
                Blog
              </Link>
              <span>/</span>
              <span className="font-semibold text-brand-primary">{post.category}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-snow border border-brand-platinum text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold">
                {post.category}
              </span>
              {formattedDate && (
                <span className="text-xs font-semibold text-brand-onyx/75">{formattedDate}</span>
              )}
              <span className="text-xs font-semibold text-brand-onyx/75 inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTimeMin} Menit Baca
              </span>
              <span className="text-xs font-semibold text-brand-onyx/75 inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.authorName}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-[1.06] max-w-4xl">
              {post.title}
            </h1>

            <p className="text-base md:text-lg text-brand-onyx max-w-3xl leading-relaxed">
              {post.excerpt}
            </p>

            {post.coverImage && (
              <div className="relative aspect-[16/9] max-h-[520px] w-full bg-brand-snow border border-brand-platinum p-2 shadow-xl overflow-hidden mt-8">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt || post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1280px"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ISI ARTIKEL + STICKY SIDEBAR */}
        <section className="py-14 md:py-20 px-6 md:px-12 bg-white">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Kolom Kiri: Konten Markdown */}
            <article className="lg:col-span-8">
              <MarkdownArticleContent content={post.content} />

              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-brand-platinum flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-onyx/75 mr-2">
                    Topik:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-brand-snow border border-brand-platinum text-xs font-semibold text-brand-onyx"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom-Article CTA Card */}
              <div className="mt-12 relative overflow-hidden bg-[#000000] text-white border border-[#D4AF37]/30 p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.2)] space-y-6">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/80" />

                <div className="space-y-3">
                  <span className="inline-block text-[10px] font-bold tracking-[0.24em] uppercase text-[#F3D98B]">
                    KONSULTASI PENGADAAN B2B
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-tight">
                    Butuh Estimasi Produksi 50+ Pcs untuk Acara Anda?
                  </h2>
                  <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                    Diskusikan kebutuhan bahan kain, teknik sablon atau bordir, serta jadwal pengerjaan bersama tim
                    CITILEX ASIA — gratis mockup desain awal dan penawaran harga resmi PT Nusa Garment Indonesia.
                  </p>
                </div>

                <div>
                  <WhatsAppButton message={waMessage} className={articleWaBtnClass}>
                    <Image src="/wablack.svg" alt="WhatsApp" width={16} height={16} className="w-4 h-4 mr-2.5" />
                    <span>Konsultasi Gratis via WhatsApp</span>
                  </WhatsAppButton>
                </div>
              </div>
            </article>

            {/* Kolom Kanan: Sidebar Sticky */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="bg-brand-snow border border-brand-platinum p-6 space-y-4">
                <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                  SOLUSI PRODUKSI CITILEX ASIA
                </span>
                <h3 className="text-base font-extrabold uppercase tracking-tight text-brand-primary">
                  Layanan Utama Kami
                </h3>
                <div className="divide-y divide-brand-platinum border-t border-brand-platinum">
                  {seoServicePages.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/${service.slug}`}
                      className="group flex items-center justify-between py-3 text-xs font-bold uppercase tracking-wider text-brand-onyx hover:text-brand-primary"
                    >
                      <span>{service.breadcrumbLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brand-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ))}
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="bg-white border border-brand-platinum p-6 space-y-4">
                  <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-onyx/75">
                    BACA JUGA
                  </span>
                  <h3 className="text-base font-extrabold uppercase tracking-tight text-brand-primary">
                    Panduan Terkait Lainnya
                  </h3>
                  <div className="divide-y divide-brand-platinum border-t border-brand-platinum">
                    {relatedPosts.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/blog/${rel.slug}`}
                        className="block py-3.5 group space-y-1"
                      >
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                          {rel.category}
                        </span>
                        <span className="block text-xs font-extrabold uppercase text-brand-primary leading-snug group-hover:underline underline-offset-4">
                          {rel.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>

        {/* FAQ SCHEMA SECTION */}
        {faqItems.length > 0 && (
          <MoneyPageFaqSection faqs={faqItems} heading="Tanya Jawab Seputar Topik Ini" />
        )}

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
