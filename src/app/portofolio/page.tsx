import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import WhatsAppButton from "../../components/ui/WhatsAppButton";
import PortfolioGridClient from "../../components/sections/portfolio/PortfolioGridClient";
import { portfolioItems } from "../../lib/data";
import { companyConfig } from "../../config/company";
import { getPortfolioPageJsonLd } from "../../lib/json-ld";

export const metadata: Metadata = {
  title: "Portofolio Produksi Kaos & Polo Shirt | CITILEX ASIA",
  description:
    "Dokumentasi hasil produksi kaos custom dan polo shirt CITILEX ASIA untuk berbagai brand, BUMN, instansi, UMKM, sekolah, dan event berskala nasional.",
  keywords: [
    "portofolio citilex asia",
    "hasil produksi kaos custom perusahaan",
    "dokumentasi konveksi kaos bumn event",
    "portofolio polo shirt bordir",
  ],
  alternates: {
    canonical: "https://citilex.asia/portofolio",
  },
  openGraph: {
    title: "Portofolio Produksi Kaos & Polo Shirt | CITILEX ASIA",
    description:
      "Dokumentasi project produksi kaos custom dan polo shirt untuk perusahaan, komunitas, instansi, UMKM, hingga event berskala nasional.",
    url: "https://citilex.asia/portofolio",
    siteName: "Citilex Asia",
    images: [
      {
        url: "/portofolio/kaosshopee.jpg",
        width: 1200,
        height: 630,
        alt: "Portofolio Produksi CITILEX ASIA",
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

const heroWaClass = [
  "group relative overflow-hidden rounded-xl",
  "inline-flex items-center justify-center",
  "px-9 py-4.5",
  "bg-[#000000] text-white",
  "text-xs font-bold tracking-[0.2em] uppercase",
  "border border-[#D4AF37]/40",
  "shadow-[0_16px_40px_rgba(0,0,0,0.28),0_0_24px_rgba(212,175,55,0.12)]",
  "hover:-translate-y-1 hover:border-[#D4AF37]/70",
  "transition-all duration-300",
].join(" ");

const secondaryDarkOutlineClass = [
  "inline-flex items-center justify-center rounded-xl",
  "px-7 py-4.5",
  "bg-white/5 text-white",
  "text-xs font-bold tracking-[0.18em] uppercase",
  "border border-white/25 hover:border-[#D4AF37]/60 hover:bg-white/10",
  "transition-all duration-300",
].join(" ");

export default function PortofolioPage() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPortfolioPageJsonLd()) }}
      />

      <Header />

      <main className="pt-8">
        {/* SECTION 1: HEADER PORTOFOLIO */}
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
              <span className="font-semibold text-brand-primary">Portofolio</span>
            </nav>

            <p className="text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
              PORTOFOLIO PRODUKSI RESMI
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-brand-primary uppercase leading-[0.98] max-w-4xl">
              Hasil Produksi untuk Berbagai{" "}
              <span className="bg-gradient-to-r from-black/95 via-[#F3D98B] to-black/95 bg-clip-text text-transparent">
                Brand &amp; Instansi
              </span>
            </h1>

            <p className="text-base md:text-lg text-brand-onyx max-w-2xl leading-relaxed">
              Dokumentasi project produksi kaos custom dan polo shirt untuk perusahaan, komunitas, instansi, UMKM, hingga event berskala nasional.
            </p>
          </div>
        </section>

        {/* SECTION 2: FILTER & GRID DOKUMENTASI */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-snow border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-8">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-primary uppercase">
              Dokumentasi Project Pilihan
            </h2>
            <PortfolioGridClient items={portfolioItems} />
          </div>
        </section>

        {/* SECTION 3: CUSTOM CTA PORTOFOLIO */}
        <section
          id="contact"
          className="relative overflow-hidden bg-brand-primary text-brand-white py-20 md:py-24 px-6 md:px-12"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[320px] h-[320px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="border border-[#D4AF37]/20 rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-sm px-6 py-10 md:px-12 md:py-14 shadow-[0_25px_70px_rgba(0,0,0,0.35)] text-center space-y-8">
              <div className="space-y-5">
                <div className="flex justify-center">
                  <div className="px-5 py-2 rounded-full bg-white/5 border border-[#D4AF37]/25">
                    <span className="text-xs font-bold tracking-[0.28em] text-[#D4AF37] uppercase">
                      KONSULTASI PRODUKSI
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase leading-[1.06]">
                  Wujudkan Kaos &amp; Polo Shirt Berkualitas untuk{" "}
                  <span className="bg-gradient-to-r from-white via-[#F3D98B] to-white bg-clip-text text-transparent">
                    Brand, Event, dan Perusahaan Anda
                  </span>
                </h2>

                <p className="text-sm md:text-base text-brand-white/80 max-w-2xl mx-auto leading-relaxed">
                  Konsultasikan kebutuhan produksi Anda bersama tim CITILEX ASIA. Mulai dari pemilihan bahan, teknik sablon atau bordir, hingga estimasi biaya dan waktu produksi.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-2">
                <WhatsAppButton message={companyConfig.defaultWaMessage} className={heroWaClass}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#F8E7B9]/10 to-[#D4AF37]/10 opacity-80" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                  <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="relative z-10 w-4 h-4 mr-3" />
                  <span className="relative z-10">Hubungi Kami</span>
                </WhatsAppButton>

                <Link href="/#pricing" className={secondaryDarkOutlineClass}>
                  Harga Kaos
                </Link>

                <Link href="/#pricing-polo" className={secondaryDarkOutlineClass}>
                  Harga Polo
                </Link>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                <span>✔ Produksi Skala Besar</span>
                <span>✔ Kualitas Terjamin</span>
                <span>✔ Tepat Waktu</span>
                <span>✔ Legalitas Lengkap</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
