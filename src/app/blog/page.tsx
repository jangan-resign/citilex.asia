import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CtaSection from "../../components/sections/home/CtaSection";
import WhatsAppButton from "../../components/ui/WhatsAppButton";
import { companyConfig } from "../../config/company";
import { seoServicePages } from "../../lib/seo-pages";

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

const cardClass = [
  "group bg-white p-7 md:p-8 border border-brand-platinum",
  "hover:border-brand-primary hover:shadow-md",
  "transition-all duration-300 flex items-start justify-between gap-4",
].join(" ");

const heroWaClass = [
  "group relative overflow-hidden",
  "inline-flex items-center justify-center",
  "px-9 py-4.5",
  "bg-[#000000] text-white",
  "text-xs font-bold tracking-[0.2em] uppercase",
  "border border-[#D4AF37]/30",
  "shadow-[0_16px_40px_rgba(0,0,0,0.28),0_0_24px_rgba(212,175,55,0.12)]",
  "hover:-translate-y-1 hover:border-[#D4AF37]/50",
  "transition-all duration-300",
].join(" ");

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
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

        {/* SECTION 2: PANDUAN LAYANAN & STATUS EDITORIAL */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-snow">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="bg-white border border-brand-platinum p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-snow border border-brand-platinum">
                  <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-primary">
                    EDITORIAL STUDIO
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase text-brand-primary">
                  Artikel Panduan Sedang Disiapkan Tim Editorial
                </h2>
                <p className="text-sm text-brand-onyx leading-relaxed">
                  Kami sedang menyusun rangkaian artikel mendalam seputar spesifikasi bahan, simulasi waktu produksi,
                  serta studi kasus pengadaan seragam B2B. Sambil menunggu artikel diterbitkan, Anda dapat langsung
                  menjelajahi halaman spesifikasi layanan kami atau berkonsultasi gratis dengan konsultan produksi kami.
                </p>
              </div>

              <div className="shrink-0">
                <WhatsAppButton message={companyConfig.defaultWaMessage} className={heroWaClass}>
                  <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="relative z-10 w-4 h-4 mr-3" />
                  <span className="relative z-10">KONSULTASI GRATIS</span>
                </WhatsAppButton>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight uppercase text-brand-primary">
                Panduan Cepat Layanan Produksi Citilex Asia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seoServicePages.map((service) => (
                  <Link key={service.slug} href={`/${service.slug}`} className={cardClass}>
                    <div className="space-y-2">
                      <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                        {service.breadcrumbLabel}
                      </span>
                      <h3 className="text-base font-extrabold uppercase tracking-tight text-brand-primary group-hover:underline underline-offset-4">
                        {service.h1Primary}
                      </h3>
                      <p className="text-xs text-brand-onyx/80 leading-relaxed">{service.h1Highlight}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-brand-primary mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
                <Link href="/portofolio" className={cardClass}>
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                      Portofolio
                    </span>
                    <h3 className="text-base font-extrabold uppercase tracking-tight text-brand-primary group-hover:underline underline-offset-4">
                      Hasil Produksi Klien
                    </h3>
                    <p className="text-xs text-brand-onyx/80 leading-relaxed">
                      Dokumentasi project Shopee, POS Indonesia, BANK BRI, Adhi Karya &amp; berbagai brand.
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-brand-primary mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
