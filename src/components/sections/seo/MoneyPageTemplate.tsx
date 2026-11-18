import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, Layers, Truck, ArrowUpRight } from "lucide-react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import WhatsAppButton from "../../ui/WhatsAppButton";
import PricingSection from "../home/PricingSection";
import PricingPoloSection from "../home/PricingPoloSection";
import WorkflowSection from "../home/WorkflowSection";
import CtaSection from "../home/CtaSection";
import MoneyPageFaqSection from "./MoneyPageFaqSection";
import { seoServicePages, seoLocationPages, type SeoMoneyPage } from "../../../lib/seo-pages";
import { getMoneyPageJsonLd } from "../../../lib/json-ld";

const heroCtaClass = [
  "group relative overflow-hidden rounded-xl",
  "inline-flex items-center justify-center",
  "px-10 py-5",
  "bg-[#000000] text-white",
  "text-xs font-bold tracking-[0.22em] uppercase",
  "border border-[#D4AF37]/30",
  "shadow-[0_16px_40px_rgba(0,0,0,0.28),0_0_24px_rgba(212,175,55,0.12)]",
  "hover:-translate-y-1 hover:scale-[1.015]",
  "hover:border-[#D4AF37]/50",
  "hover:shadow-[0_22px_60px_rgba(0,0,0,0.36),0_0_34px_rgba(212,175,55,0.18)]",
  "transition-all duration-500",
].join(" ");

const sideCtaClass = [
  "group relative overflow-hidden rounded-xl",
  "flex items-center justify-center w-full",
  "px-6 py-4",
  "bg-gradient-to-r from-[#F8E7B9] via-[#D4AF37] to-[#B8860B]",
  "text-black text-xs font-bold tracking-[0.18em] uppercase",
  "shadow-[0_0_40px_rgba(212,175,55,0.2)]",
  "hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(212,175,55,0.35)]",
  "transition-all duration-300",
].join(" ");

const editorialCardClass = [
  "bg-white p-7 md:p-8 border border-brand-platinum rounded-2xl",
  "hover:border-brand-primary/40 hover:shadow-md",
  "transition-all duration-300 space-y-3",
].join(" ");

const relatedCardClass = [
  "group flex items-start justify-between gap-4",
  "bg-white p-6 border border-brand-platinum rounded-2xl",
  "hover:border-brand-primary hover:shadow-md",
  "transition-all duration-300",
].join(" ");

const highlightIcons = [Layers, ShieldCheck, Truck];

interface MoneyPageTemplateProps {
  page: SeoMoneyPage;
}

export default function MoneyPageTemplate({ page }: MoneyPageTemplateProps) {
  const relatedServices = seoServicePages.filter((item) => item.slug !== page.slug);
  const relatedLocations = seoLocationPages.filter((item) => item.slug !== page.slug);

  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getMoneyPageJsonLd(page)) }}
      />

      <Header />

      <main className="pt-8">
        {/* SECTION 1: HERO SECTION */}
        <section className="relative overflow-hidden px-6 md:px-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand-primary/[0.04] blur-3xl" />
            <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-brand-primary/[0.05] blur-3xl" />
          </div>

          <div className="relative max-w-[1280px] mx-auto pt-14 pb-20 md:pt-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-7 md:space-y-8">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-onyx/75">
                <Link href="/" className="hover:text-brand-primary underline underline-offset-4 py-1">
                  Beranda
                </Link>
                <span>/</span>
                <span className="font-semibold text-brand-primary">{page.breadcrumbLabel}</span>
              </nav>

              <p className="text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                {page.eyebrow}
              </p>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-brand-primary uppercase leading-[0.95]">
                {page.h1Primary}
                <br />
                <span className="bg-gradient-to-r from-black/95 via-[#F3D98B] to-black/95 bg-clip-text text-transparent">
                  {page.h1Highlight}
                </span>
              </h1>

              <p className="text-base md:text-lg text-brand-onyx max-w-2xl leading-relaxed">
                {page.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center pt-2">
                <WhatsAppButton message={page.waMessage} className={heroCtaClass}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#F8E7B9]/10 to-[#D4AF37]/10 opacity-80" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                  <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="relative z-10 w-4 h-4 mr-3" />
                  <span className="relative z-10">KONSULTASI GRATIS</span>
                </WhatsAppButton>

                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-brand-platinum" />
                  <p className="text-xs font-bold text-brand-onyx/75 tracking-[0.18em] uppercase">
                    Minimal Order 50 Pcs
                  </p>
                </div>
              </div>

              {/* Trust stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-platinum">
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-primary">500+</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brand-onyx/75 mt-1">Klien Korporasi</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-primary">50K+</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brand-onyx/75 mt-1">Kaos Diproduksi</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-primary">3 Hari</p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brand-onyx/75 mt-1">Pengerjaan Selesai</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute inset-0 scale-95 rounded-full bg-brand-primary/10 blur-3xl" />

                <div className="absolute -top-4 -left-4 md:-left-8 z-20">
                  <div className="relative px-5 py-4 bg-black/65 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.35),0_0_24px_rgba(212,175,55,0.14)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F8E7B9]/10 via-transparent to-[#D4AF37]/10 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                    <p className="relative text-[10px] font-bold tracking-[0.18em] uppercase text-[#D4AF37]/90">
                      {page.badgeTopTitle}
                    </p>
                    <p className="relative text-sm font-bold text-white mt-1">{page.badgeTopValue}</p>
                  </div>
                </div>

                <div className="relative aspect-[4/5] bg-white border border-brand-platinum p-3 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={page.heroImage}
                    alt={page.heroImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover rounded-xl transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>

                <div className="absolute -bottom-4 right-0 md:-right-6 z-20">
                  <div className="relative px-5 py-4 bg-black/70 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_24px_rgba(212,175,55,0.14)]">
                    <div className="absolute inset-0 bg-gradient-to-tl from-[#D4AF37]/10 via-transparent to-[#F8E7B9]/10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                    <p className="relative text-[10px] font-bold tracking-[0.18em] uppercase text-[#D4AF37]/90">
                      {page.badgeBottomTitle}
                    </p>
                    <p className="relative text-sm font-bold text-white mt-1">{page.badgeBottomValue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: KEUNGGULAN SPESIFIK */}
        <section className="py-16 bg-brand-snow border-t border-b border-brand-platinum px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto text-center space-y-12">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-[0.08em] text-brand-primary uppercase">
              {page.highlightsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto pt-2">
              {page.highlights.map((item, idx) => {
                const IconComponent = highlightIcons[idx % highlightIcons.length];
                return (
                  <div key={item.title} className="bg-white p-8 border border-brand-platinum rounded-2xl space-y-4">
                    <div className="w-10 h-10 bg-brand-primary text-brand-white rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-onyx leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: SPESIFIKASI & PANDUAN PENGADAAN B2B */}
        <section className="py-20 md:py-24 px-6 md:px-12 border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="inline-block text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                SPESIFIKASI &amp; STANDAR PRODUKSI
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-none">
                {page.editorialTitle}
              </h2>
              <p className="text-sm md:text-base text-brand-onyx leading-relaxed">
                {page.editorialSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {page.editorialPoints.map((point) => (
                  <div key={point.label} className={editorialCardClass}>
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                      {point.label}
                    </span>
                    <h3 className="text-base font-extrabold tracking-tight uppercase text-brand-primary">
                      {point.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-onyx leading-relaxed">{point.desc}</p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 relative overflow-hidden rounded-2xl bg-[#000000] text-white border border-[#D4AF37]/30 p-8 flex flex-col justify-between shadow-[0_25px_70px_rgba(0,0,0,0.2)]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                <div className="space-y-5 relative">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/30">
                    <span className="text-[10px] font-black tracking-[0.22em] uppercase text-[#F3D98B]">
                      {page.editorialSideBox.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold uppercase tracking-tight leading-snug">
                    {page.editorialSideBox.title}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {page.editorialSideBox.desc}
                  </p>
                  <ul className="space-y-3 pt-2">
                    {page.editorialSideBox.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-xs text-white/85">
                        <Check className="w-4 h-4 shrink-0 text-[#D4AF37] mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 relative">
                  <WhatsAppButton message={page.waMessage} className={sideCtaClass}>
                    <Image src="/wablack.svg" alt="WhatsApp" width={16} height={16} className="w-4 h-4 mr-2" />
                    <span>MINTA PENAWARAN WA</span>
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PAKET HARGA RESMI */}
        {(page.pricingMode === "kaos" || page.pricingMode === "both") && <PricingSection />}
        {(page.pricingMode === "polo" || page.pricingMode === "both") && (
          <div className={page.pricingMode === "polo" ? "pt-10 md:pt-12" : undefined}>
            <PricingPoloSection />
          </div>
        )}

        {/* SECTION 5: ALUR KERJA */}
        <WorkflowSection />

        {/* SECTION 6: FAQ SPESIFIK */}
        <MoneyPageFaqSection faqs={page.faqs} />

        {/* SECTION 7: INTERNAL LINKING KE LAYANAN & WILAYAH B2B TERKAIT */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold tracking-[0.24em] text-brand-onyx/75 uppercase">
                  SOLUSI PRODUKSI LAINNYA
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase">
                  Layanan Kaos &amp; Polo B2B Terkait
                </h2>
              </div>
              <Link
                href="/"
                className="inline-block py-1.5 text-xs font-bold tracking-[0.18em] uppercase text-brand-primary border-b border-brand-primary hover:opacity-75 transition-opacity w-fit"
              >
                Kembali ke Beranda ↗
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((rel) => (
                <Link key={rel.slug} href={`/${rel.slug}`} className={relatedCardClass}>
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gold">
                      {rel.breadcrumbLabel}
                    </span>
                    <h3 className="text-sm font-extrabold uppercase tracking-tight text-brand-primary group-hover:underline underline-offset-4">
                      {rel.h1Primary}
                    </h3>
                    <p className="text-xs text-brand-onyx/80 leading-relaxed">{rel.h1Highlight}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-brand-primary mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>

            <div className="space-y-6 pt-8 border-t border-brand-platinum">
              <h3 className="text-sm font-extrabold tracking-[0.18em] uppercase text-brand-primary">
                Area Layanan Wilayah Jabodetabek
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/${loc.slug}`}
                    className="group flex items-center justify-between gap-3 px-5 py-4 bg-brand-snow border border-brand-platinum rounded-xl hover:border-brand-primary hover:bg-white transition-all"
                  >
                    <div>
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-brand-primary group-hover:underline underline-offset-4">
                        {loc.breadcrumbLabel}
                      </span>
                      <span className="block text-[11px] text-brand-onyx/75 mt-0.5">
                        {loc.h1Highlight}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-brand-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: CTA */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
