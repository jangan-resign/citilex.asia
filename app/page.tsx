"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Check, 
  ArrowRight, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Plus, 
  Minus, 
  HelpCircle,
  Clock,
  Shirt,
  MapPin,
  Truck
} from "lucide-react";

// Structured JSON-LD Data for SEO
const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://citilex.asia/#organization",
      "name": "CITILEX ASIA",
      "url": "https://citilex.asia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://citilex.asia/logo.png",
        "caption": "CITILEX ASIA Logo"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://citilex.asia/#localbusiness",
      "name": "CITILEX ASIA",
      "url": "https://citilex.asia",
      "priceRange": "Rp60.000-Rp95000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jakarta",
        "addressCountry": "ID"
      },
      "image": "https://citilex.asia/hero.png",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Layanan Kaos Custom",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Kaos Custom Event",
              "description": "Produksi kaos custom premium untuk event, gathering, seminar, dan acara perusahaan."
            }
          }
        ]
      }
    }
  ]
};

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const WHATSAPP_NUMBER = "6281319888488"; // Template WhatsApp Number
  
  const generateWaLink = (message: string) => {
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
  };

  const defaultHeroMessage = "Halo CITILEX ASIA, saya ingin konsultasi mengenai produksi kaos custom untuk event kami.";
  
  const packages = [
    {
      name: "Kaos Polyester",
      price: "60.000",
      description: "Sangat direkomendasikan untuk event massal, jalan sehat, gathering besar, atau merchandise sekali pakai yang fungsional dan ekonomis.",
      features: [
        "Minimal order 100 Pcs",
        "Bahan Polyester Double Knit / PE",
        "Sablon DTF / Rubber",
        "Ukuran Standard Asia (XS - XL)",
        "Proses pengerjaan cepat"
      ],
      whatsappText: "Halo CITILEX ASIA, saya ingin konsultasi pemesanan Kaos Polyester Custom (Rp 60.000/pcs) untuk event kami."
    },
    {
      name: "Kaos Cotton Combed",
      price: "85.000",
      description: "Pilihan terbaik & terpopuler untuk gathering perusahaan, seragam seminar, serta panitia acara dengan ketebalan kain sempurna.",
      features: [
        "Minimal order 100 Pcs",
        "Bahan 100% Cotton Combed 30s/24s",
        "Sablon DTF / Rubber",
        "Ukuran Standard Asia (XS - XL)",
        "Jahitan rantai standard distro rapi"
      ],
      whatsappText: "Halo CITILEX ASIA, saya tertarik dengan paket terpopuler Kaos Cotton Combed (Rp 85.000/pcs) untuk event kami.",
      popular: true
    },
    {
      name: "Kaos Cotton Bamboo",
      price: "95.000",
      description: "Kualitas premium tertinggi yang super lembut, sejuk, antibakteri alami, sangat ramah lingkungan, ideal untuk acara eksklusif.",
      features: [
        "Minimal order 100 Pcs",
        "Bahan Premium Cotton Bamboo 30s",
        "Sablon DTF / Rubber",
        "Ukuran Standard Asia (XS - XL)",
        "Finishing premium, anti kusut & bakteri"
      ],
      whatsappText: "Halo CITILEX ASIA, saya ingin memesan Kaos Cotton Bamboo Premium (Rp 95.000/pcs) untuk acara eksklusif kami."
    }
  ];

  const faqs = [
    {
      question: "Apakah bisa custom desain gambar sendiri?",
      answer: "Tentu saja. Kami menerima file desain siap cetak dalam format AI, PSD, PDF, CDR, atau PNG resolusi tinggi tanpa latar belakang. Jika Anda hanya memiliki sketsa kasar, tim desainer ahli kami siap membantu menyempurnakannya untuk produksi."
    },
    {
      question: "Berapa minimal jumlah pemesanan kaos event?",
      answer: "Minimal pemesanan standar kami adalah 100 pcs per desain. Ini merupakan batas minimum efisiensi mesin sablon dan pemotongan bahan untuk dapat memberikan Anda harga penawaran terbaik dan kualitas yang konsisten."
    },
    {
      question: "Berapa lama proses pembuatan kaos hingga selesai?",
      answer: "Rata-rata proses produksi berkisar antara 10 hingga 21 hari kerja setelah pembayaran DP diterima dan desain disetujui secara tertulis. Lama waktu pengerjaan bergantung pada kuantitas pemesanan dan kerumitan desain sablon atau bordir."
    },
    {
      question: "Apakah Citilex Asia bisa mengirim ke seluruh wilayah Indonesia?",
      answer: "Ya, kami melayani pengiriman ke seluruh kota dan kabupaten di Indonesia. Kami bekerja sama dengan berbagai layanan kargo darat, laut, dan udara tepercaya untuk memastikan paket Anda tiba dengan aman sebelum event dimulai."
    },
    {
      question: "Bahan apa yang paling direkomendasikan untuk event outdoor?",
      answer: "Untuk acara outdoor yang aktif dan kasual, kami sangat merekomendasikan Cotton Combed 30s karena seratnya 100% katun alami yang menyerap keringat dengan baik, adem, dan fleksibel digunakan sepanjang hari."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      {/* JSON-LD Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-20 bg-white/95 backdrop-blur-md border-b border-brand-platinum">
        <Link href="/" className="text-xl font-bold tracking-[0.25em] text-brand-primary uppercase">
          CITILEX ASIA
        </Link>
        <a 
          href={generateWaLink(defaultHeroMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-brand-primary text-brand-white text-xs font-semibold tracking-wider uppercase border border-white hover:-translate-y-1 transition-transform duration-300"
        >
          <Image
            src="/wa.svg"
            alt="WhatsApp"
            width={16}
            height={16}
            className="w-4 h-4 mr-2"
          />
          Tanya via WhatsApp
        </a>
      </header>

      {/* Main Container */}
      <main className="pt-8">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden px-6 md:px-12">
          {/* background accents */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand-primary/[0.04] blur-3xl" />
            <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-brand-primary/[0.05] blur-3xl" />
          </div>
        
          <div className="relative max-w-[1280px] mx-auto pt-14 pb-20 md:pt-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-7 md:space-y-8">
              <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.28em] text-brand-primary/55 uppercase">
                <span className="w-8 h-[1px] bg-brand-primary/20"></span>
                #1 PREMIUM CUSTOM APPAREL FOR EVENTS
              </span>
        
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tighter text-brand-primary uppercase leading-[0.95]">
                Kaos Custom
                <br />
                <span className="bg-gradient-to-r from-primary/35 via-[#F3D98B] to-primary/35 bg-clip-text text-transparent">
                  untuk Event &amp; Acara
                </span>
              </h1>
        
              <p className="text-base md:text-lg text-brand-onyx max-w-2xl leading-relaxed">
                CITILEX ASIA menyediakan jasa pembuatan kaos custom premium untuk
                event, gathering, seminar, reuni, dan promosi korporasi.
                Kualitas terjamin dengan pengerjaan profesional dan pengiriman tepat waktu.
              </p>
        
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center pt-2">
                <a
                  href={generateWaLink(defaultHeroMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group relative overflow-hidden
                    inline-flex items-center justify-center
                    px-10 py-5
                    bg-[#000000] text-white
                    text-xs font-bold tracking-[0.22em] uppercase
                    border border-[#D4AF37]/30
                    shadow-[0_16px_40px_rgba(0,0,0,0.28),0_0_24px_rgba(212,175,55,0.12)]
                    hover:-translate-y-1
                    hover:scale-[1.015]
                    hover:border-[#D4AF37]/50
                    hover:shadow-[0_22px_60px_rgba(0,0,0,0.36),0_0_34px_rgba(212,175,55,0.18)]
                    transition-all duration-500
                  "
                >
                  {/* gold glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#F8E7B9]/10 to-[#D4AF37]/10 opacity-80" />
                
                  {/* top gold line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                
                  {/* bottom gold line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                
                  {/* corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/80" />
                
                  <Image
                    src="/wa.svg"
                    alt="WhatsApp"
                    width={16}
                    height={16}
                    className="relative z-10 w-4 h-4 mr-3"
                  />
                
                  <span className="relative z-10">KONSULTASI KAOS EVENT</span>
                </a>
        
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-brand-platinum"></span>
                  <p className="text-xs font-semibold text-brand-onyx/65 tracking-[0.18em] uppercase">
                    Dari Konsep Hingga Siap Pakai
                  </p>
                </div>
              </div>
        
              {/* Trust stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-platinum">
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-primary">
                    500+
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brand-onyx/60 mt-1">
                    Klien Korporasi
                  </p>
                </div>
        
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-primary">
                    50K+
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brand-onyx/60 mt-1">
                    Kaos Diproduksi
                  </p>
                </div>
        
                <div>
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-primary">
                    100%
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brand-onyx/60 mt-1">
                    QC Checked
                  </p>
                </div>
              </div>
            </div>
        
            {/* RIGHT */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* glow */}
                <div className="absolute inset-0 scale-95 rounded-full bg-brand-primary/10 blur-3xl"></div>
        
                {/* floating card top */}
                <div className="absolute -top-4 -left-4 md:-left-8 z-20">
                  {/* gold corner accent */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
                
                  <div
                    className="
                      relative
                      px-5 py-4
                      bg-black/65
                      backdrop-blur-xl
                      border border-[#D4AF37]/30
                      shadow-[0_18px_45px_rgba(0,0,0,0.35),0_0_24px_rgba(212,175,55,0.14)]
                    "
                  >
                    {/* subtle gold shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F8E7B9]/10 via-transparent to-[#D4AF37]/10 pointer-events-none" />
                
                    {/* top gold line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                
                    <p className="relative text-[10px] font-bold tracking-[0.18em] uppercase text-[#D4AF37]/80">
                      PREMIUM MATERIAL
                    </p>
                
                    <p className="relative text-sm font-bold text-white mt-1">
                      Cotton Combed 30s
                    </p>
                  </div>
                </div>
        
                {/* image */}
                <div className="relative aspect-[4/5] bg-white border border-brand-platinum p-3 shadow-2xl">
                  <Image
                    src="/citilexasiahero.png"
                    alt="Kaos Custom Event CITILEX ASIA"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
        
                {/* floating card bottom */}
                <div className="absolute -bottom-4 right-0 md:-right-6 z-20">
                  <div
                    className="
                      relative
                      px-5 py-4
                      bg-black/70
                      backdrop-blur-xl
                      border border-[#D4AF37]/30
                      shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_24px_rgba(212,175,55,0.14)]
                    "
                  >
                    {/* gold shine */}
                    <div className="absolute inset-0 bg-gradient-to-tl from-[#D4AF37]/10 via-transparent to-[#F8E7B9]/10 pointer-events-none" />
                
                    {/* bottom gold line biar beda sama top card */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                
                    <p className="relative text-[10px] font-bold tracking-[0.18em] uppercase text-[#D4AF37]/80">
                      FAST PRODUCTION
                    </p>
                
                    <p className="relative text-sm font-bold text-white mt-1">
                      Deadline Friendly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST MARKERS SECTION */}
        <section className="py-16 bg-brand-snow border-t border-b border-brand-platinum px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto text-center space-y-12">
            <h2 className="text-2xl font-bold tracking-[0.1em] text-brand-primary uppercase">
              Mengapa Memilih Produksi Citilex Asia?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto pt-4">
              <div className="bg-white p-8 border border-brand-platinum space-y-4">
                <div className="w-10 h-10 bg-brand-primary text-brand-white flex items-center justify-center">
                  <Shirt className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                  Custom Konsep Fleksibel
                </h3>
                <p className="text-xs text-brand-onyx leading-relaxed">
                  Bebas kustomisasi material bahan, paduan warna benang jahitan, ketebalan kain, hingga teknik penempatan cetakan sablon maupun bordir komputer.
                </p>
              </div>
              <div className="bg-white p-8 border border-brand-platinum space-y-4">
                <div className="w-10 h-10 bg-brand-primary text-brand-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                  Quality Control Ketat
                </h3>
                <p className="text-xs text-brand-onyx leading-relaxed">
                  Setiap lembar pakaian menjalani proses inspeksi detail sejak pemotongan bahan pola, pencetakan warna sablon, penjahitan rantai, hingga proses pengemasan akhir.
                </p>
              </div>
              <div className="bg-white p-8 border border-brand-platinum space-y-4">
                <div className="w-10 h-10 bg-brand-primary text-brand-white flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                  Ketepatan Waktu Mutlak
                </h3>
                <p className="text-xs text-brand-onyx leading-relaxed">
                  Kami memahami krusialnya timeline acara Anda. Penjadwalan produksi kami transparan dan terukur untuk menjamin kaos tiba tepat sebelum tanggal event dimulai.
                </p>
              </div>
            </div>
          </div>
        </section>

       {/* PRICING & TIER SECTION */}
        <section
          id="pricing"
          className="pt-14 pb-20 md:pt-18 md:pb-24 px-6 md:px-12 max-w-[1280px] mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-brand-primary/55 uppercase">
              PRICE &amp; FABRIC OPTIONS
            </span>
        
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-none">
              Daftar Paket Harga Kaos Event
            </h2>
        
            <p className="text-sm md:text-base text-brand-onyx max-w-2xl mx-auto leading-relaxed">
              Pilih spesifikasi material yang paling ideal untuk anggaran dan
              kenyamanan peserta event Anda.
            </p>
          </div>
        
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 lg:items-center">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col justify-between transition-all duration-500 ease-out ${
                  pkg.popular
                    ? `
                      z-20
                      bg-gradient-to-br from-[#111111] via-[#080808] to-[#151515]
                      text-white
                      border border-[#D4AF37]/25
                      shadow-[0_35px_90px_rgba(0,0,0,0.35),0_0_40px_rgba(212,175,55,0.08)]
                      lg:scale-[1.06]
                      lg:-translate-y-3
                      hover:-translate-y-4
                      hover:shadow-[0_45px_120px_rgba(0,0,0,0.45),0_0_60px_rgba(212,175,55,0.12)]
                      px-8 py-8
                      min-h-[720px]
                    `
                    : `
                      bg-gradient-to-br from-[#1B1B1B] to-[#101010]
                      text-white
                      border border-white/10
                      hover:-translate-y-2
                      hover:shadow-[0_25px_60px_rgba(0,0,0,0.24)]
                      px-8 py-8
                      min-h-[660px]
                    `
                }`}
              >
                {/* subtle gold glow */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#F8E7B9]/[0.03] via-transparent to-[#D4AF37]/[0.04]" />
        
                {/* CONTENT */}
                <div className="relative space-y-8">
                  {pkg.popular && (
                    <div className="flex justify-center mb-8">
                      <div
                        className="
                          relative
                          px-6 py-2.5
                          rounded-full
                          bg-white/[0.05]
                          backdrop-blur-xl
                          border border-[#D4AF37]/35
                          shadow-[0_10px_25px_rgba(212,175,55,0.12)]
                        "
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F8E7B9]/10 via-transparent to-[#D4AF37]/10" />
        
                        <span className="relative text-[10px] font-black tracking-[0.28em] uppercase text-[#F8E7B9]">
                          TERPOPULER
                        </span>
                      </div>
                    </div>
                  )}
        
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-black tracking-[0.15em] uppercase">
                      {pkg.name}
                    </h3>
        
                    <p className="text-xs leading-relaxed max-w-xs mx-auto text-white/70">
                      {pkg.description}
                    </p>
                  </div>
        
                  <div
                    className={`py-7 border-y ${
                      pkg.popular ? "border-[#D4AF37]/20" : "border-white/10"
                    }`}
                  >
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase block text-center text-white/55">
                      Mulai Dari
                    </span>
        
                    <div className="flex items-end justify-center gap-1 mt-3">
                      <span className="text-xl font-bold text-[#D4AF37]">Rp</span>
        
                      <span className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none bg-gradient-to-b from-[#F8E7B9] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                        {pkg.price}
                      </span>
        
                      <span className="text-sm mb-1 text-white/55">/pcs</span>
                    </div>
                  </div>
        
                  <ul className="space-y-4">
                    {pkg.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start text-sm leading-relaxed"
                      >
                        <Check className="w-4 h-4 mr-3 mt-1 shrink-0 text-[#D4AF37]" />
                        <span className="text-white/85">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
        
                {/* CTA */}
                <div className="pt-8 relative">
                  <a
                    href={generateWaLink(pkg.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      relative block w-full text-center py-4
                      text-xs font-bold tracking-[0.18em] uppercase
                      bg-gradient-to-r from-[#F8E7B9] via-[#D4AF37] to-[#B8860B]
                      text-black
                      shadow-[0_16px_40px_rgba(212,175,55,0.18)]
                      hover:-translate-y-1
                      hover:shadow-[0_24px_60px_rgba(212,175,55,0.28)]
                      transition-all duration-300
                    "
                  >
                    KONSULTASI PAKET INI
                  </a>
                </div>
              </div>
            ))}
          </div>
        
          <p className="text-center text-xs text-brand-onyx/60 max-w-2xl mx-auto leading-relaxed pt-3">
            * Harga final dapat bervariasi mengikuti jumlah pemesanan, jumlah posisi
            cetakan sablon/bordir, tenggat waktu pengerjaan, dan rentang ukuran di atas
            ukuran standard (XL).
          </p>
        </section>

       {/* WORKFLOW PROCESS SECTION */}
        <section className="py-20 md:py-24 bg-brand-snow border-t border-b border-brand-platinum px-6 md:px-12 overflow-hidden">
          <div className="max-w-[1280px] mx-auto space-y-14">
            <div className="text-center space-y-4">
              <span className="inline-block text-xs font-bold tracking-[0.28em] text-brand-primary/60 uppercase">
                PRODUCTION TIMELINE
              </span>
        
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase">
                Proses Pemesanan &amp; Alur Kerja
              </h2>
        
              <p className="text-sm md:text-base text-brand-onyx max-w-2xl mx-auto leading-relaxed">
                Langkah-langkah terstruktur untuk merealisasikan kebutuhan kaos event
                Anda dengan minim risiko kesalahan.
              </p>
            </div>
        
            <div className="relative">
              {/* desktop connector line */}
              <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent z-0" />
        
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-7 relative z-10">
        
                {[
                  {
                    no: "01",
                    label: "KONSEP",
                    title: "Konsultasi Desain",
                    desc: "Diskusikan ide desain, pilihan material kain, jumlah order, dan timeline acara Anda dengan representasi kami secara praktis via WhatsApp.",
                  },
                  {
                    no: "02",
                    label: "APPROVAL",
                    title: "Approval Mockup",
                    desc: "Kami menyiapkan desain mockup visual digital secara detail untuk Anda teliti dan setujui demi menjamin kesesuaian posisi cetakan sablon.",
                  },
                  {
                    no: "03",
                    label: "PRODUKSI",
                    title: "Mulai Produksi",
                    desc: "Setelah DP 50% diterima, proses pembuatan massal (cutting, printing, sewing, QC) langsung dieksekusi oleh tim produksi profesional kami.",
                  },
                  {
                    no: "04",
                    label: "KIRIM",
                    title: "QC & Pengiriman",
                    desc: "Setiap kaos melewati final QC sebelum dikemas rapi, dilunasi sisa pembayarannya, dan langsung dikirim aman ke alamat lokasi event Anda.",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="group relative">
                    <div className="absolute hidden md:block top-7 left-1/2 -translate-x-1/2 w-6 h-6 bg-brand-snow rounded-full z-20" />
        
                    <div
                      className="
                        relative
                        bg-gradient-to-br from-[#111111] via-[#181818] to-[#232323]
                        border border-[#D4AF37]/20
                        p-7 md:p-8 pt-16
                        shadow-[0_18px_45px_rgba(0,0,0,0.22)]
                        hover:-translate-y-1
                        hover:border-[#D4AF37]/35
                        hover:shadow-[0_24px_60px_rgba(0,0,0,0.3),0_0_26px_rgba(212,175,55,0.12)]
                        transition-all duration-500
                        h-full
                        overflow-hidden
                      "
                    >
                      {/* gold shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F8E7B9]/[0.04] via-transparent to-[#D4AF37]/[0.04] pointer-events-none" />
        
                      {/* top gold line */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
        
                      {/* number bubble */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.32)]">
                        <div className="absolute inset-[-4px] rounded-full -z-10 bg-gradient-to-br from-[#F8E7B9] via-[#D4AF37] to-[#B8860B] shadow-[0_0_28px_rgba(212,175,55,0.35)]" />
        
                        <div className="absolute inset-[2px] rounded-full border border-[#D4AF37]/20 bg-white/[0.02]" />
        
                        <span className="relative text-lg font-black tracking-wider text-[#F6D98B]">
                          {step.no}
                        </span>
                      </div>
        
                      <div className="space-y-4">
                        <span className="text-[11px] font-bold text-[#D4AF37]/75 tracking-[0.2em] uppercase block">
                          {step.label}
                        </span>
        
                        <h3 className="text-sm font-bold tracking-[0.16em] uppercase text-white">
                          {step.title}
                        </h3>
        
                        <p className="text-xs text-white/72 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
        
              </div>
            </div>
          </div>
        </section>
        {/* PORTFOLIO / GALLERY */}
        <section className="py-20 md:py-24 px-6 md:px-12 max-w-[1280px] mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="inline-block text-xs font-bold tracking-[0.28em] text-brand-primary/60 uppercase">
              GALLERY SHOWCASE
            </span>
        
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-none">
              Galeri Hasil Produksi Kaos
            </h2>
        
            <p className="text-sm md:text-base text-brand-onyx max-w-2xl mx-auto leading-relaxed">
              Dokumentasi nyata hasil pengerjaan kaos sablon premium dari portofolio
              klien CITILEX ASIA.
            </p>
          </div>
        
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-7">
            {/* HERO CARD */}
            <div className="lg:col-span-7 group relative overflow-hidden bg-white border border-brand-platinum min-h-[620px] shadow-xl">
              <div className="relative w-full h-full min-h-[620px] overflow-hidden">
                <Image
                  src="/galeri1.png"
                  alt="CITILEX ASIA Custom Event Kaos Panitia dan Peserta Acara"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
        
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        
                {/* number */}
                <div className="absolute top-6 left-6">
                  <div
                    className="
                      relative
                      px-4 py-2
                      bg-black/60
                      backdrop-blur-xl
                      border border-[#D4AF37]/30
                      rounded-sm
                      shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(212,175,55,0.16)]
                    "
                  >
                    <div className="absolute inset-[1px] border border-white/5 rounded-sm" />
                
                    <span className="relative text-[11px] font-black tracking-[0.28em] text-[#F3D27A]">
                      01
                    </span>
                  </div>
                </div>
        
                {/* caption */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <div className="space-y-3">
                    <h4 className="text-lg md:text-xl font-bold tracking-[0.18em] uppercase text-white">
                      Corporate Gathering Shirt
                    </h4>
        
                    <p className="text-xs md:text-sm text-white/75 uppercase tracking-[0.18em]">
                      Bahan: Cotton Combed 30s • Sablon: DTF
                    </p>
                  </div>
                </div>
              </div>
            </div>
        
            {/* RIGHT STACK */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6 md:gap-7">
              {/* CARD 2 */}
              <div className="group relative overflow-hidden bg-white border border-brand-platinum min-h-[296px] hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                <div className="relative w-full h-full min-h-[296px] overflow-hidden">
                  <Image
                    src="/galeri2.png"
                    alt="CITILEX ASIA Solstice Collective Hanging Black Custom Shirt"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
        
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        
                  <div className="absolute top-6 left-6">
                  <div
                    className="
                      relative
                      px-4 py-2
                      bg-black/60
                      backdrop-blur-xl
                      border border-[#D4AF37]/30
                      rounded-sm
                      shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(212,175,55,0.16)]
                    "
                  >
                    <div className="absolute inset-[1px] border border-white/5 rounded-sm" />
                
                    <span className="relative text-[11px] font-black tracking-[0.28em] text-[#F3D27A]">
                      02
                    </span>
                  </div>
                </div>
        
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-sm font-bold tracking-[0.16em] uppercase text-white">
                      Solstice Collective Edition
                    </h4>
        
                    <p className="text-[11px] text-white/70 mt-2 uppercase tracking-[0.14em]">
                      Bahan: Premium Cotton Bamboo • Sablon: DTF
                    </p>
                  </div>
                </div>
              </div>
        
              {/* CARD 3 */}
              <div className="group relative overflow-hidden bg-white border border-brand-platinum min-h-[296px] hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                <div className="relative w-full h-full min-h-[296px] overflow-hidden">
                  <Image
                    src="/galeri3.png"
                    alt="CITILEX ASIA Close Up Fabric Quality Check"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
        
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        
                  <div className="absolute top-6 left-6">
                  <div
                    className="
                      relative
                      px-4 py-2
                      bg-black/60
                      backdrop-blur-xl
                      border border-[#D4AF37]/30
                      rounded-sm
                      shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(212,175,55,0.16)]
                    "
                  >
                    <div className="absolute inset-[1px] border border-white/5 rounded-sm" />
                
                    <span className="relative text-[11px] font-black tracking-[0.28em] text-[#F3D27A]">
                      03
                    </span>
                  </div>
                </div>
        
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-sm font-bold tracking-[0.16em] uppercase text-white">
                      Full Color DTF Printing
                    </h4>
        
                    <p className="text-[11px] text-white/70 mt-2 uppercase tracking-[0.14em]">
                      Bahan: Cotton Combed 30s • Sablon: DTF
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 md:py-24 bg-brand-snow border-t border-b border-brand-platinum px-6 md:px-12 overflow-hidden">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
            {/* LEFT PANEL */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 h-fit">
              <div className="space-y-4">
                <span className="inline-block text-xs font-bold tracking-[0.28em] text-brand-primary/60 uppercase">
                  FREQUENTLY ASKED QUESTIONS
                </span>
        
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase leading-tight">
                  Pertanyaan Yang Sering Diajukan
                </h2>
        
                <p className="text-sm text-brand-onyx leading-relaxed max-w-sm">
                  Temukan jawaban cepat seputar minimum order, timeline produksi,
                  material kain, hingga proses pengiriman.
                </p>
              </div>
        
              <div className="relative overflow-hidden border border-white/10 bg-[#000000] p-7 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
                {/* gold glow */}
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-amber-300/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-yellow-200/10 blur-3xl pointer-events-none" />
        
                {/* badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-amber-300/20 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <span className="text-[10px] font-black tracking-[0.24em] uppercase bg-gradient-to-r from-[#F7E7A1] via-[#D4AF37] to-[#FFF2B2] bg-clip-text text-transparent">
                    CUSTOMER SUPPORT
                  </span>
                </div>
        
                <div className="relative mt-6 space-y-5">
                  <p className="text-lg font-bold text-white leading-snug">
                    Tim kami siap membantu Anda dari tahap konsultasi hingga kaos selesai diproduksi.
                  </p>
        
                  <p className="text-sm text-white/65 leading-relaxed">
                    Setiap project event memiliki kebutuhan unik. Karena itu kami
                    memastikan komunikasi cepat, transparan, dan minim risiko revisi.
                  </p>
        
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                      <span className="text-amber-300">✦</span>
                      Respon Cepat
                    </div>
        
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                      <span className="text-amber-300">✦</span>
                      Mockup Gratis
                    </div>
        
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                      <span className="text-amber-300">✦</span>
                      Pengiriman Nasional
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
            {/* RIGHT PANEL */}
            <div className="lg:col-span-8 space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
        
                return (
                  <div
                    key={idx}
                    className={`group bg-white border transition-all duration-500 ${
                      isOpen
                        ? "border-brand-primary shadow-xl ring-1 ring-amber-300/30"
                        : "border-brand-platinum hover:border-brand-primary/20 hover:shadow-md"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center text-left px-6 py-6 md:px-8 md:py-7"
                    >
                      <div className="flex items-start gap-5 pr-4">
                        <div
                          className={`w-11 h-11 shrink-0 flex items-center justify-center border transition-all ${
                            isOpen
                              ? "bg-brand-primary border-brand-primary text-white shadow-[0_0_25px_rgba(212,175,55,0.15)]"
                              : "border-brand-platinum text-brand-primary"
                          }`}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </div>
        
                        <span className="font-bold text-xs md:text-sm tracking-[0.14em] uppercase text-brand-primary leading-relaxed">
                          {faq.question}
                        </span>
                      </div>
        
                      <div
                        className={`w-10 h-10 shrink-0 flex items-center justify-center border transition-all ${
                          isOpen
                            ? "bg-brand-primary border-brand-primary text-white"
                            : "border-brand-platinum text-brand-primary"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </button>
        
                    <div
                      className={`grid transition-all duration-500 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 md:px-8 md:pb-8 text-sm text-brand-onyx leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION (CTA) */}
        <section className="relative overflow-hidden bg-brand-primary text-brand-white py-20 md:py-24 px-6 md:px-12">
          {/* Background accents */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[320px] h-[320px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
            <div className="absolute top-[40%] left-[10%] w-[260px] h-[260px] rounded-full bg-[#D4AF37]/8 blur-3xl" />
          </div>
        
          <div className="relative max-w-5xl mx-auto">
            <div
              className="
                border border-[#D4AF37]/20
                bg-white/[0.03]
                backdrop-blur-sm
                px-6 py-10 md:px-12 md:py-14
                shadow-[0_25px_70px_rgba(0,0,0,0.35)]
                text-center
              "
            >
              <div className="space-y-5 md:space-y-6">
                {/* Gold badge */}
                <div className="flex justify-center">
                  <div
                    className="
                      px-5 py-2
                      rounded-full
                      bg-white/5
                      border border-[#D4AF37]/25
                      backdrop-blur-md
                      shadow-[0_8px_24px_rgba(212,175,55,0.12)]
                    "
                  >
                    <span className="text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
                      SIAPKAN SEKARANG UNTUK ACARA ANDA
                    </span>
                  </div>
                </div>
        
                <h2 className="text-3xl md:text-5xl xl:text-6xl font-extrabold tracking-tighter uppercase leading-[1.05]">
                  Wujudkan Kaos Event
                  <br />
                  <span className="bg-gradient-to-r from-white via-[#F3D98B] to-white bg-clip-text text-transparent">
                    Impian Bersama CITILEX ASIA
                  </span>
                </h2>
        
                <p className="text-sm md:text-base text-brand-white/75 max-w-2xl mx-auto leading-relaxed">
                  Hubungi tim marketing kami sekarang untuk konsultasi bahan gratis,
                  pengajuan penawaran harga, dan pembuatan mockup visual digital awal
                  gratis.
                </p>
              </div>
        
              {/* Trust bullets */}
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                <span>✓ Respon Cepat</span>
                <span>✓ Mockup Gratis</span>
                <span>✓ Tanpa Komitmen Awal</span>
              </div>
        
              {/* CTA */}
              <div className="mt-10">
                <a
                  href={generateWaLink(defaultHeroMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group inline-flex items-center justify-center
                    px-10 md:px-14 py-5
                    bg-white text-brand-primary
                    text-xs md:text-sm font-black tracking-[0.22em] uppercase
                    shadow-[0_16px_40px_rgba(212,175,55,0.18)]
                    hover:-translate-y-1.5
                    hover:scale-[1.02]
                    hover:shadow-[0_24px_70px_rgba(212,175,55,0.28)]
                    transition-all duration-500
                  "
                >
                  <Image
                    src="/wablack.svg"
                    alt="WhatsApp"
                    width={18}
                    height={18}
                    className="w-[18px] h-[18px] mr-3"
                  />
                  KONSULTASI GRATIS SEKARANG
                </a>
        
                <p className="mt-4 text-[11px] md:text-xs tracking-[0.12em] uppercase text-white/45">
                  Biasanya dibalas dalam hitungan menit pada jam kerja
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-brand-platinum py-16 px-6 md:px-12">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="text-lg font-black tracking-[0.25em] text-brand-primary">
              CITILEX ASIA
            </div>
            <p className="text-[10px] text-brand-onyx/60 tracking-widest uppercase">
              PREMIUM CUSTOM APPAREL MANUFACTURER
            </p>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            <Link href="/terms-of-service" className="text-xs font-bold tracking-widest uppercase text-brand-onyx hover:text-brand-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-xs font-bold tracking-widest uppercase text-brand-onyx hover:text-brand-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto border-t border-brand-platinum/40 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-brand-onyx/50 tracking-widest uppercase">
          <span>© 2026 CITILEX ASIA. All Rights Reserved.</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Jakarta, Indonesia
          </span>
        </div>
      </footer>
    </div>
  );
}
