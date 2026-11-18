import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  Layers,
  Clock,
  RefreshCw,
  Handshake,
  ShieldCheck,
  Building2,
  Landmark,
  CalendarCheck,
  Users,
  Briefcase,
  MapPin,
  ArrowUpRight,
  Check,
} from "lucide-react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import WhatsAppButton from "../../components/ui/WhatsAppButton";
import TrackedExternalLink from "../../components/ui/TrackedExternalLink";
import { companyConfig } from "../../config/company";
import { getAboutPageJsonLd } from "../../lib/json-ld";

export const metadata: Metadata = {
  title: "Tentang Kami — Partner Produksi Apparel Skala Besar | CITILEX ASIA",
  description:
    "CITILEX ASIA adalah perusahaan jasa produksi kaos custom & polo shirt skala besar di bawah naungan PT Nusa Garment Indonesia, dengan Representative Office Jakarta dan Production Center Yogyakarta.",
  keywords: [
    "tentang citilex asia",
    "pt nusa garment indonesia",
    "partner produksi apparel corporate",
    "pabrik kaos custom skala besar",
    "vendor baju korporat jakarta yogyakarta",
  ],
  alternates: {
    canonical: "https://citilex.asia/tentang-kami",
  },
  openGraph: {
    title: "Tentang Kami — Partner Produksi Apparel Skala Besar | CITILEX ASIA",
    description:
      "Partner produksi apparel custom untuk corporate, instansi, event organizer, dan brand dengan kapasitas ratusan hingga ribuan pcs.",
    url: "https://citilex.asia/tentang-kami",
    siteName: "Citilex Asia",
    images: [
      {
        url: "/tentang-kami/kantor1.jpg",
        width: 1200,
        height: 630,
        alt: "Tentang CITILEX ASIA - PT Nusa Garment Indonesia",
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

const heroFacilities = [
  {
    src: "/tentang-kami/kantor1.jpg",
    label: "Kantor CITILEX ASIA",
    alt: "Ruang konsultasi dan sampel Kantor CITILEX ASIA",
  },
  {
    src: "/tentang-kami/jahit.jpg",
    label: "Produksi Jahit",
    alt: "Proses penjahitan produksi apparel CITILEX ASIA",
  },
  {
    src: "/tentang-kami/sablon.jpg",
    label: "Produksi Sablon",
    alt: "Proses cetak sablon presisi CITILEX ASIA",
  },
  {
    src: "/tentang-kami/kantor2.jpg",
    label: "Fasilitas CITILEX ASIA",
    alt: "Fasilitas operasional dan galeri CITILEX ASIA",
  },
];

const misiList = [
  "Menyediakan solusi produksi apparel skala besar yang profesional, transparan, dan terpercaya.",
  "Menjadi partner utama bagi perusahaan corporate, instansi, maupun event organizer berskala nasional.",
  "Membangun jaringan distribusi dan layanan konsultasi pemasaran di seluruh kota besar Pulau Jawa.",
  "Menjaga standar kualitas jahitan, sablon, dan bordir agar tetap konsisten pada volume produksi besar.",
];

const keunggulanList = [
  {
    icon: Factory,
    title: "Kapasitas Produksi Besar",
    desc: "Mampu menangani kebutuhan produksi ratusan hingga ribuan pcs untuk corporate, event, instansi, dan brand secara konsisten.",
  },
  {
    icon: Layers,
    title: "Sistem Produksi Terpusat",
    desc: "Seluruh proses pemotongan pola, sablon, bordir, hingga penjahitan dikelola dalam satu sistem terukur agar kualitas selalu stabil.",
  },
  {
    icon: Clock,
    title: "Timeline Jelas & Terukur",
    desc: "Setiap project mengikuti jadwal kerja yang transparan sejak approval mockup sehingga pengiriman tiba tepat sebelum hari-H.",
  },
  {
    icon: RefreshCw,
    title: "Cocok untuk Repeat Order",
    desc: "Spesifikasi kain, pola ukuran, dan file cetak perusahaan tersimpan rapi untuk pemesanan ulang jangka panjang dengan hasil identik.",
  },
  {
    icon: Handshake,
    title: "Partner B2B Jangka Panjang",
    desc: "Bukan sekadar tukang jahit lepas, kami berperan sebagai mitra strategis operasional seragam dan merchandise perusahaan Anda.",
  },
  {
    icon: ShieldCheck,
    title: "Standar Kualitas Konsisten",
    desc: "Setiap lembar produk melewati tahapan quality control ketat guna memastikan kerapian akhir meskipun diproduksi dalam kuota ribuan potong.",
  },
];

const roadmapStages = [
  {
    step: "SAAT INI",
    title: "Fondasi Jakarta & Yogyakarta",
    desc: "Sinergi Office Representative di Jakarta Selatan dan Production Center terpusat di Yogyakarta sebagai tulang punggung layanan B2B.",
  },
  {
    step: "TARGET 2 TAHUN",
    title: "Dominasi Pasar Corporate Jakarta",
    desc: "Memperkuat penetrasi klien perusahaan dan instansi di Jabodetabek sebagai vendor apparel corporate tepercaya dan responsif.",
  },
  {
    step: "TARGET 5 TAHUN",
    title: "Ekspansi Kota Besar Pulau Jawa",
    desc: "Membuka kantor pemasaran regional di Bandung, Semarang, Yogyakarta, dan Surabaya dengan lini produksi tetap terpusat demi menjaga efisiensi dan konsistensi mutu.",
  },
];

const targetMarkets = [
  { icon: Building2, title: "Perusahaan & Corporate" },
  { icon: Landmark, title: "Instansi Pemerintah & Swasta" },
  { icon: CalendarCheck, title: "Event Organizer" },
  { icon: Users, title: "Yayasan & Komunitas" },
  { icon: Briefcase, title: "Agency & Vendor Pihak Ketiga" },
];

const heroCtaClass = [
  "group relative overflow-hidden",
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

const secondaryDarkOutlineClass = [
  "inline-flex items-center justify-center",
  "px-8 py-5",
  "bg-white/5 text-white",
  "text-xs font-bold tracking-[0.2em] uppercase",
  "border border-white/25 hover:border-[#D4AF37]/60 hover:bg-white/10",
  "transition-all duration-300",
].join(" ");

const whiteCardClass = [
  "bg-white p-8 border border-brand-platinum",
  "space-y-4 hover:border-brand-primary/40 hover:shadow-md transition-all duration-300",
].join(" ");

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getAboutPageJsonLd()) }}
      />

      <Header />

      <main className="pt-8">
        {/* SECTION 1: HERO TENTANG KAMI */}
        <section className="relative overflow-hidden px-6 md:px-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand-primary/[0.04] blur-3xl" />
            <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-brand-primary/[0.05] blur-3xl" />
          </div>

          <div className="relative max-w-[1280px] mx-auto pt-14 pb-20 md:pt-20 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-7">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-onyx/75">
                <Link href="/" className="hover:text-brand-primary underline underline-offset-4 py-1">
                  Beranda
                </Link>
                <span>/</span>
                <span className="font-semibold text-brand-primary">Tentang Kami</span>
              </nav>

              <p className="text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                TENTANG CITILEX ASIA
              </p>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-brand-primary uppercase leading-[0.98]">
                Partner Produksi Apparel{" "}
                <span className="bg-gradient-to-r from-black/95 via-[#F3D98B] to-black/95 bg-clip-text text-transparent">
                  Skala Besar untuk Corporate, Event, dan Brand
                </span>
              </h1>

              <p className="text-base md:text-lg text-brand-onyx max-w-2xl leading-relaxed">
                CITILEX ASIA adalah perusahaan jasa produksi apparel custom yang berfokus pada kebutuhan corporate,
                instansi, event organizer, dan brand dengan sistem produksi yang terukur, kapasitas besar, serta
                standar kualitas yang konsisten.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-primary">
                <span>✔ Produksi Skala Besar</span>
                <span>✔ Quality Control Ketat</span>
                <span>✔ Vendor Corporate</span>
              </div>

              <div className="pt-2">
                <WhatsAppButton message={companyConfig.defaultWaMessage} className={heroCtaClass}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#F8E7B9]/10 to-[#D4AF37]/10 opacity-80" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/80" />
                  <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="relative z-10 w-4 h-4 mr-3" />
                  <span className="relative z-10">Konsultasi Gratis</span>
                </WhatsAppButton>
              </div>
            </div>

            {/* RIGHT: 2x2 FASILITAS GRID */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {heroFacilities.map((fac) => (
                <div
                  key={fac.label}
                  className="group relative aspect-square bg-white border border-brand-platinum p-2 shadow-md overflow-hidden"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={fac.src}
                      alt={fac.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3">
                      <span className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#F3D98B]">
                        {fac.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: PROFIL PERUSAHAAN & 2 LOKASI */}
        <section className="py-20 md:py-24 bg-brand-snow border-t border-b border-brand-platinum px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                TENTANG KAMI
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase leading-tight">
                Produksi Apparel Skala Besar dengan Sistem yang Terukur
              </h2>
              <div className="space-y-4 text-sm md:text-base text-brand-onyx leading-relaxed">
                <p>
                  <strong className="text-brand-primary">CITILEX ASIA</strong> adalah apparel manufacturing partner
                  di bawah naungan <strong className="text-brand-primary">PT Nusa Garment Indonesia</strong> yang
                  menghadirkan solusi produksi apparel custom untuk corporate, instansi, event, dan brand. Dengan
                  kapasitas produksi besar serta sistem kerja yang profesional, kami membantu klien mewujudkan produk
                  yang berkualitas, konsisten, dan tepat waktu.
                </p>
                <p>
                  Dengan memadukan pusat produksi di Yogyakarta dan kantor perwakilan di Jakarta, kami menggabungkan
                  kecepatan pengerjaan, kontrol kualitas yang ketat, serta sistem operasional yang terukur untuk
                  melayani pesanan ratusan hingga ribuan pcs secara berkesinambungan.
                </p>
                <p>
                  Kami tidak hanya memproduksi kaos custom, tetapi juga menyediakan polo shirt corporate berstandar
                  tinggi guna mendukung kebutuhan branding jangka panjang perusahaan, organisasi, maupun institusi.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 border border-brand-platinum space-y-3">
                <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                  OFFICE • REPRESENTATIVE OFFICE
                </span>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-brand-primary">
                  PT Nusa Garment Indonesia
                </h3>
                <p className="text-xs md:text-sm text-brand-onyx leading-relaxed flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0 text-brand-primary mt-0.5" />
                  <span>Jl. Bintaro Tengah Blok J4 No.12, Bintaro, Pesanggrahan, Jakarta Selatan 12330</span>
                </p>
                <TrackedExternalLink
                  href="https://maps.app.goo.gl/TCbUWmqaG9rHAdoL7"
                  eventName="maps_click"
                  eventLabel="tentang_gmaps_jakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-brand-primary border-b border-brand-primary hover:opacity-75 transition-opacity"
                >
                  Google Maps Jakarta ↗
                </TrackedExternalLink>
              </div>

              <div className="relative overflow-hidden bg-[#000000] text-white p-8 border border-[#D4AF37]/30 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-[#F3D98B]">
                  PRODUKSI • PRODUCTION CENTER
                </span>
                <h3 className="text-lg font-extrabold uppercase tracking-tight text-white">
                  Workshop Pusat Yogyakarta
                </h3>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0 text-[#D4AF37] mt-0.5" />
                  <span>Jl. Menayu Lor Plurugan No.112, Tirtonirmolo, Kasihan, Bantul, Daerah Istimewa Yogyakarta</span>
                </p>
                <TrackedExternalLink
                  href="https://maps.app.goo.gl/jLiq3Eev19tLpshH6"
                  eventName="maps_click"
                  eventLabel="tentang_gmaps_yogyakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-[11px] font-bold tracking-[0.16em] uppercase text-[#F3D98B] border-b border-[#D4AF37] hover:opacity-80 transition-opacity"
                >
                  Google Maps Yogyakarta ↗
                </TrackedExternalLink>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: VISI & MISI */}
        <section className="py-20 md:py-24 px-6 md:px-12 border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="inline-block text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                VISI &amp; MISI
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-none">
                Arah dan Komitmen CITILEX ASIA
              </h2>
              <p className="text-sm md:text-base text-brand-onyx leading-relaxed">
                Kami membangun CITILEX ASIA bukan sekadar sebagai vendor apparel sesaat, melainkan sebagai partner
                produksi jangka panjang untuk perusahaan, instansi, event, dan brand di Indonesia.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 relative overflow-hidden bg-[#000000] text-white border border-[#D4AF37]/30 p-8 md:p-10 space-y-5 shadow-[0_25px_70px_rgba(0,0,0,0.2)]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/80" />

                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/30">
                  <span className="text-[10px] font-black tracking-[0.22em] uppercase text-[#F3D98B]">
                    VISI PERUSAHAAN
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white">
                  Market Leader Apparel Custom Indonesia
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                  Menjadi market leader jasa produksi apparel custom terkemuka di Indonesia, dimulai dari dominasi pasar
                  corporate Jakarta hingga ekspansi jaringan layanan ke seluruh Pulau Jawa.
                </p>
              </div>

              <div className="lg:col-span-7 bg-white border border-brand-platinum p-8 md:p-10 space-y-6">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-snow border border-brand-platinum">
                  <span className="text-[10px] font-black tracking-[0.22em] uppercase text-brand-gold">
                    MISI KAMI
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight text-brand-primary">
                  Empat Pilar Eksekusi Produksi
                </h3>
                <ul className="space-y-4">
                  {misiList.map((misi) => (
                    <li key={misi} className="flex items-start gap-3 text-sm text-brand-onyx leading-relaxed">
                      <Check className="w-4 h-4 shrink-0 text-brand-gold mt-1" />
                      <span>{misi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: 6 KEUNGGULAN CITILEX ASIA */}
        <section className="py-20 md:py-24 bg-brand-snow border-b border-brand-platinum px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="inline-block text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                KEUNGGULAN CITILEX ASIA
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-none">
                Dibangun untuk Kebutuhan Produksi Skala Besar
              </h2>
              <p className="text-sm md:text-base text-brand-onyx leading-relaxed">
                Dirancang agar perusahaan, instansi, event organizer, dan brand memperoleh mitra manufaktur yang
                profesional, terukur, dan siap bertumbuh bersama.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {keunggulanList.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.title} className={whiteCardClass}>
                    <div className="w-10 h-10 bg-brand-primary text-brand-white flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-extrabold tracking-tight uppercase text-brand-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-onyx leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: MODEL BISNIS & ROADMAP */}
        <section className="py-20 md:py-24 px-6 md:px-12 border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-16">
            <div className="space-y-10">
              <div className="max-w-3xl space-y-4">
                <span className="inline-block text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                  MODEL BISNIS
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-none">
                  Dibangun untuk Bertumbuh
                </h2>
                <p className="text-sm md:text-base text-brand-onyx leading-relaxed">
                  CITILEX ASIA memadukan kekuatan lini produksi terpusat dengan strategi pengembangan pasar yang terukur
                  untuk memenuhi kebutuhan apparel corporate di Indonesia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={whiteCardClass}>
                  <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                    CLIENT &amp; COMMERCIAL HUB
                  </span>
                  <h3 className="text-xl font-extrabold uppercase tracking-tight text-brand-primary">
                    Office Representative — Jakarta
                  </h3>
                  <p className="text-sm text-brand-onyx leading-relaxed">
                    Berperan sebagai pusat pemasaran, konsultasi klien B2B, pengecekan sampel, serta pengembangan pasar
                    corporate untuk memperkuat penetrasi layanan tingkat nasional.
                  </p>
                </div>

                <div className={whiteCardClass}>
                  <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                    MANUFACTURING HUB
                  </span>
                  <h3 className="text-xl font-extrabold uppercase tracking-tight text-brand-primary">
                    Production Center — Yogyakarta
                  </h3>
                  <p className="text-sm text-brand-onyx leading-relaxed">
                    Seluruh proses manufaktur dikelola secara terpusat untuk menjaga efisiensi biaya operasional,
                    kecepatan kapasitas mesin, dan kestabilan mutu dalam volume besar.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-6 border-t border-brand-platinum">
              <div className="max-w-2xl space-y-3">
                <span className="inline-block text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                  ROADMAP PERTUMBUHAN
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase">
                  Langkah Strategis Jaringan Nasional
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {roadmapStages.map((stage) => (
                  <div key={stage.step} className="bg-brand-snow p-8 border border-brand-platinum space-y-3">
                    <span className="block text-[11px] font-black tracking-[0.24em] uppercase text-brand-gold">
                      {stage.step}
                    </span>
                    <h3 className="text-lg font-extrabold uppercase tracking-tight text-brand-primary">
                      {stage.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brand-onyx leading-relaxed">{stage.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: TARGET MARKET, FOKUS PRODUK & POSITIONING */}
        <section className="py-20 md:py-24 bg-brand-snow px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto space-y-16">
            {/* Target Market */}
            <div className="space-y-8">
              <div className="max-w-3xl space-y-3">
                <span className="inline-block text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                  TARGET MARKET
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase">
                  Siapa yang Kami Layani
                </h2>
                <p className="text-sm md:text-base text-brand-onyx leading-relaxed">
                  Melayani organisasi dan lembaga yang mengutamakan konsistensi mutu, kapasitas besar, dan tata kelola
                  produksi profesional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {targetMarkets.map((mkt) => {
                  const IconComponent = mkt.icon;
                  return (
                    <div key={mkt.title} className="bg-white p-6 border border-brand-platinum space-y-3">
                      <div className="w-9 h-9 bg-brand-primary text-brand-white flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs font-extrabold tracking-wider uppercase text-brand-primary leading-snug">
                        {mkt.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fokus Produk */}
            <div className="space-y-8 pt-6 border-t border-brand-platinum">
              <div className="space-y-3">
                <span className="inline-block text-xs font-bold tracking-[0.26em] text-brand-onyx/75 uppercase">
                  LAYANAN UTAMA
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase">
                  Fokus Produk CITILEX ASIA
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link
                  href="/kaos-custom"
                  className="group bg-white p-8 border border-brand-platinum hover:border-brand-primary hover:shadow-md transition-all flex items-start justify-between gap-4"
                >
                  <div className="space-y-3">
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                      CORE VOLUME PRODUCT
                    </span>
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight text-brand-primary group-hover:underline underline-offset-4">
                      Kaos Custom
                    </h3>
                    <p className="text-sm text-brand-onyx leading-relaxed">
                      Solusi produksi kaos untuk event, kampanye brand, gathering, komunitas, dan kebutuhan volume
                      besar dengan bahan Combed 30s/24s, Bamboo, dan Polyester.
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-brand-primary mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/polo-shirt-custom"
                  className="group bg-white p-8 border border-brand-platinum hover:border-brand-primary hover:shadow-md transition-all flex items-start justify-between gap-4"
                >
                  <div className="space-y-3">
                    <span className="block text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold">
                      CORE BRANDING PRODUCT
                    </span>
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight text-brand-primary group-hover:underline underline-offset-4">
                      Polo Shirt
                    </h3>
                    <p className="text-sm text-brand-onyx leading-relaxed">
                      Apparel corporate berkerah dengan bordir komputer presisi pada bahan Lacoste Soft, Pique, maupun
                      Diamond untuk seragam kerja dan identitas resmi perusahaan.
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-brand-primary mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Positioning Box */}
            <div className="relative overflow-hidden bg-[#000000] text-white border border-[#D4AF37]/30 p-8 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/80" />

              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/30">
                  <span className="text-[10px] font-black tracking-[0.24em] uppercase text-[#F3D98B]">
                    BUKAN KONVEKSI KECIL • POSITIONING
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight leading-tight">
                  Vendor Apparel Custom Skala Besar yang Profesional
                </h2>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                  CITILEX ASIA diposisikan secara khusus sebagai partner manufaktur apparel bagi corporate, instansi,
                  event, dan brand yang mengutamakan kapasitas terukur, kualitas konsisten, dan tata kelola operasional
                  tepercaya.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CUSTOM CTA TENTANG KAMI */}
        <section
          id="contact"
          className="relative overflow-hidden bg-brand-primary text-brand-white py-20 md:py-24 px-6 md:px-12"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[320px] h-[320px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="border border-[#D4AF37]/20 bg-white/[0.03] backdrop-blur-sm px-6 py-10 md:px-12 md:py-14 shadow-[0_25px_70px_rgba(0,0,0,0.35)] text-center space-y-8">
              <div className="space-y-5">
                <div className="flex justify-center">
                  <div className="px-5 py-2 rounded-full bg-white/5 border border-[#D4AF37]/25">
                    <span className="text-xs font-bold tracking-[0.28em] text-[#D4AF37] uppercase">
                      SIAP BEKERJA SAMA?
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase leading-[1.06]">
                  Partner Produksi Apparel untuk{" "}
                  <span className="bg-gradient-to-r from-white via-[#F3D98B] to-white bg-clip-text text-transparent">
                    Kebutuhan Skala Besar
                  </span>
                </h2>

                <p className="text-sm md:text-base text-brand-white/80 max-w-2xl mx-auto leading-relaxed">
                  Dari kebutuhan event, corporate, instansi, hingga program branding jangka panjang, CITILEX ASIA siap
                  mendukung proses produksi apparel Anda dengan kapasitas besar, kualitas terjaga, dan timeline yang
                  terukur.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <WhatsAppButton message={companyConfig.defaultWaMessage} className={heroCtaClass}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#F8E7B9]/10 to-[#D4AF37]/10 opacity-80" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/80" />
                  <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="relative z-10 w-4 h-4 mr-3" />
                  <span className="relative z-10">Konsultasi Gratis</span>
                </WhatsAppButton>

                <Link href="/portofolio" className={secondaryDarkOutlineClass}>
                  Lihat Portofolio
                </Link>
              </div>

              <p className="pt-2 text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-white/70">
                Office Representative Jakarta • Production Center Yogyakarta
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
