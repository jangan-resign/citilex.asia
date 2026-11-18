import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageSquare, Mail, Clock, ArrowUpRight, Check } from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CtaSection from "../../components/sections/home/CtaSection";
import WhatsAppButton from "../../components/ui/WhatsAppButton";
import TrackedExternalLink from "../../components/ui/TrackedExternalLink";
import { companyConfig } from "../../config/company";
import { getContactPageJsonLd } from "../../lib/json-ld";

export const metadata: Metadata = {
  title: "Kontak & Lokasi Kantor Resmi | CITILEX ASIA",
  description:
    "Hubungi tim produksi CITILEX ASIA untuk konsultasi kaos & polo custom perusahaan minimal 50 pcs. Jakarta Rep. Office (Bintaro, Jakarta Selatan) & Production Center Yogyakarta (Kasihan, Bantul).",
  keywords: [
    "kontak citilex asia",
    "alamat vendor kaos bintaro jakarta selatan",
    "pabrik kaos production center yogyakarta bantul",
    "whatsapp konsultan kaos custom citilex",
  ],
  alternates: {
    canonical: "https://citilex.asia/kontak",
  },
  openGraph: {
    title: "Kontak & Lokasi Kantor Resmi | CITILEX ASIA",
    description:
      "Konsultasi pengadaan kaos & polo custom B2B via WhatsApp (+62 813-2927-1515), kunjungi Jakarta Rep. Office di Bintaro atau Production Center kami di Yogyakarta.",
    url: "https://citilex.asia/kontak",
    siteName: "Citilex Asia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kontak & Lokasi CITILEX ASIA",
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

const channelCardClass = [
  "bg-white p-8 border border-brand-platinum rounded-2xl",
  "flex flex-col justify-between space-y-6",
  "hover:border-brand-primary/40 hover:shadow-md transition-all duration-300",
].join(" ");

const locationDarkCardClass = [
  "relative overflow-hidden bg-[#000000] text-white rounded-2xl",
  "border border-[#D4AF37]/30 p-8 md:p-10",
  "flex flex-col justify-between space-y-8",
  "shadow-[0_25px_70px_rgba(0,0,0,0.2)]",
].join(" ");

const locationLightCardClass = [
  "relative overflow-hidden bg-white text-brand-primary rounded-2xl",
  "border border-brand-platinum p-8 md:p-10",
  "flex flex-col justify-between space-y-8",
  "shadow-sm hover:border-brand-primary/40 hover:shadow-md transition-all duration-300",
].join(" ");

const mapBtnGoldClass = [
  "inline-flex items-center justify-center w-full sm:w-auto rounded-xl",
  "px-7 py-4",
  "bg-gradient-to-r from-[#F8E7B9] via-[#D4AF37] to-[#B8860B]",
  "text-black text-xs font-bold tracking-[0.18em] uppercase",
  "hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(212,175,55,0.3)]",
  "transition-all duration-300",
].join(" ");

const mapBtnDarkClass = [
  "inline-flex items-center justify-center w-full sm:w-auto rounded-xl",
  "px-7 py-4",
  "bg-brand-primary text-brand-white",
  "text-xs font-bold tracking-[0.18em] uppercase",
  "border border-[#D4AF37]/30",
  "hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
].join(" ");

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getContactPageJsonLd()) }}
      />

      <Header />

      <main className="pt-8">
        {/* SECTION 1: HERO KONTAK & SALURAN KOMUNIKASI */}
        <section className="relative overflow-hidden px-6 md:px-12 pt-14 pb-20 md:pt-20 md:pb-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand-primary/[0.04] blur-3xl" />
          </div>

          <div className="relative max-w-[1280px] mx-auto space-y-14">
            <div className="max-w-3xl space-y-6">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-onyx/75">
                <Link href="/" className="hover:text-brand-primary underline underline-offset-4 py-1">
                  Beranda
                </Link>
                <span>/</span>
                <span className="font-semibold text-brand-primary">Kontak</span>
              </nav>

              <p className="text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                OFFICIAL CONTACT &amp; LOCATIONS
              </p>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-brand-primary uppercase leading-[0.95]">
                Hubungi Tim Produksi
                <br />
                <span className="bg-gradient-to-r from-black/95 via-[#F3D98B] to-black/95 bg-clip-text text-transparent">
                  CITILEX ASIA
                </span>
              </h1>

              <p className="text-base md:text-lg text-brand-onyx max-w-2xl leading-relaxed">
                Konsultasikan kebutuhan kaos custom dan polo shirt perusahaan Anda bersama tim kami.
                Dapatkan rekomendasi material kain, pembuatan mockup digital gratis, hingga Surat Penawaran Harga (SPH) resmi PT Nusa Garment Indonesia.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <WhatsAppButton message={companyConfig.defaultWaMessage} className={heroCtaClass}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#F8E7B9]/10 to-[#D4AF37]/10 opacity-80" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                  <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="relative z-10 w-4 h-4 mr-3" />
                  <span className="relative z-10">Hubungi Kami</span>
                </WhatsAppButton>
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-brand-platinum" />
                  <p className="text-xs font-bold text-brand-onyx/75 tracking-[0.18em] uppercase">
                    Minimal Order 50 Pcs
                  </p>
                </div>
              </div>
            </div>

            {/* 3 KARTU SALURAN KOMUNIKASI CEPAT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={channelCardClass}>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-brand-primary text-brand-white rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                    WhatsApp Fast Response
                  </h3>
                  <p className="text-xs text-brand-onyx leading-relaxed">
                    Saluran utama untuk konsultasi desain, tanya estimasi harga, dan cek slot produksi tercepat.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-platinum">
                  <WhatsAppButton
                    message={companyConfig.defaultWaMessage}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-primary hover:underline underline-offset-4 py-1"
                  >
                    <span>+62 813-2927-1515</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </WhatsAppButton>
                </div>
              </div>

              <div className={channelCardClass}>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-brand-primary text-brand-white rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                    Email Korporat &amp; Procurement
                  </h3>
                  <p className="text-xs text-brand-onyx leading-relaxed">
                    Untuk pengiriman file desain beresolusi tinggi, permintaan penawaran resmi (RFQ), dan korespondensi administrasi.
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-platinum">
                  <TrackedExternalLink
                    href="mailto:behagroup@gmail.com"
                    eventName="email_click"
                    eventLabel="kontak_email"
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-primary hover:underline underline-offset-4 py-1"
                  >
                    <span>behagroup@gmail.com</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </TrackedExternalLink>
                </div>
              </div>

              <div className={channelCardClass}>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-brand-primary text-brand-white rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                    Jam Operasional Layanan
                  </h3>
                  <p className="text-xs text-brand-onyx leading-relaxed">
                    Konsultasi tim marketing dan kunjungan kantor perwakilan beroperasi sesuai jadwal resmi berikut:
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-platinum text-xs space-y-1">
                  <p className="font-extrabold text-brand-primary uppercase tracking-wider">
                    Senin – Sabtu : 09:00 – 17:00 WIB
                  </p>
                  <p className="text-brand-onyx/75">Minggu &amp; Libur Nasional : Tutup</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 2 LOKASI RESMI (JAKARTA REP. OFFICE & PRODUCTION CENTER YOGYAKARTA) */}
        <section className="py-20 md:py-24 bg-brand-snow border-t border-b border-brand-platinum px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="inline-block text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                LOKASI KANTOR &amp; PABRIK PRODUKSI
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-none">
                Lokasi Kantor &amp; Pusat Produksi Resmi
              </h2>
              <p className="text-sm md:text-base text-brand-onyx leading-relaxed">
                Didukung kantor perwakilan di Jakarta Selatan untuk koordinasi klien B2B Jabodetabek serta pusat produksi terintegrasi di Yogyakarta.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* KARTU 1: JAKARTA REPRESENTATIVE OFFICE */}
              <div className={locationDarkCardClass}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                <div className="space-y-6 relative">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/30">
                    <span className="text-[10px] font-black tracking-[0.22em] uppercase text-[#F3D98B]">
                      REPRESENTATIVE OFFICE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white">
                      Jakarta Representative Office
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                      PT Nusa Garment Indonesia
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-white/85 leading-relaxed">
                    <MapPin className="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5" />
                    <p>
                      Rep. Office PT Nusa Garment Indonesia, Jl. Bintaro Tengah Blok J4 No.12,
                      Bintaro, Kec. Pesanggrahan, Kota Jakarta Selatan, DKI Jakarta 12330
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-white/80">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 shrink-0 text-[#D4AF37] mt-0.5" />
                      <span>Konsultasi tatap muka &amp; pengecekan sampel kain (by appointment)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 shrink-0 text-[#D4AF37] mt-0.5" />
                      <span>Koordinasi pengadaan korporat area Jakarta, Tangerang, Bekasi, Depok &amp; Bogor</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 relative">
                  <TrackedExternalLink
                    href="https://maps.app.goo.gl/TCbUWmqaG9rHAdoL7"
                    eventName="maps_click"
                    eventLabel="kontak_gmaps_jakarta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mapBtnGoldClass}
                  >
                    <span>Buka Maps Jakarta</span>
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </TrackedExternalLink>
                </div>
              </div>

              {/* KARTU 2: PRODUCTION CENTER YOGYAKARTA */}
              <div className={locationLightCardClass}>
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-snow border border-brand-platinum">
                    <span className="text-[10px] font-black tracking-[0.22em] uppercase text-brand-gold">
                      MANUFACTURING HUB
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight text-brand-primary">
                      Production Center Yogyakarta
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-onyx/75">
                      Workshop Cutting, Sablon, Bordir &amp; QC
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-brand-onyx leading-relaxed">
                    <MapPin className="w-5 h-5 shrink-0 text-brand-primary mt-0.5" />
                    <p>
                      Jl. Menayu Lor Plurugan No.112, Tirtonirmolo, Kec. Kasihan,
                      Kabupaten Bantul, Daerah Istimewa Yogyakarta
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-brand-platinum text-xs text-brand-onyx/85">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 shrink-0 text-brand-gold mt-0.5" />
                      <span>Lini produksi kaos custom &amp; polo shirt kapasitas skala besar (50.000+ pcs diproduksi)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 shrink-0 text-brand-gold mt-0.5" />
                      <span>Dilengkapi mesin sablon DTF, Plastisol, Bordir Komputer &amp; Quality Control akhir</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <TrackedExternalLink
                    href="https://maps.app.goo.gl/jLiq3Eev19tLpshH6"
                    eventName="maps_click"
                    eventLabel="kontak_gmaps_yogyakarta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mapBtnDarkClass}
                  >
                    <span>Buka Maps Production</span>
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </TrackedExternalLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CTA */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
