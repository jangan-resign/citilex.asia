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
        <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28 px-6 md:px-12 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <span className="inline-block text-xs font-bold tracking-[0.28em] text-brand-primary/55 uppercase">
              #1 PREMIUM CUSTOM APPAREL FOR EVENTS
            </span>
        
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tighter text-brand-primary uppercase leading-[0.98]">
              Kaos Custom
              <br />
              <span className="text-brand-primary/35">
                untuk Event &amp; Acara
              </span>
            </h1>
        
            <p className="text-base md:text-lg text-brand-onyx max-w-2xl leading-relaxed">
              CITILEX ASIA menyediakan jasa pembuatan kaos custom premium untuk
              event, gathering, seminar, reuni, dan promosi korporasi.
              Kualitas terjamin dengan pengerjaan profesional dan pengiriman tepat waktu.
            </p>
        
            <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center">
              <a
                href={generateWaLink(defaultHeroMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  px-9 py-4
                  bg-brand-primary text-brand-white
                  text-xs font-bold tracking-[0.2em] uppercase
                  shadow-xl
                  hover:-translate-y-1
                  hover:shadow-2xl
                  transition-all duration-500
                "
              >
                <Image
                  src="/wa.svg"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  className="w-4 h-4 mr-3"
                />
                KONSULTASI KAOS EVENT
              </a>
        
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-brand-platinum"></span>
                <p className="text-xs font-semibold text-brand-onyx/65 tracking-[0.18em] uppercase">
                  Dari Konsep Hingga Siap Pakai
                </p>
              </div>
            </div>
        
            {/* Trust Row */}
            <div className="pt-4 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-onyx/60">
              <span>✓ MOQ Fleksibel</span>
              <span>✓ Mockup Gratis</span>
              <span>✓ Pengiriman Nasional</span>
            </div>
          </div>
        
          <div className="lg:col-span-5 w-full">
            <div className="relative">
              {/* glow */}
              <div className="absolute inset-0 scale-95 bg-brand-primary/10 blur-3xl rounded-full"></div>
        
              <div className="relative aspect-[4/5] w-full bg-white border border-brand-platinum p-3 shadow-2xl">
                <Image
                  src="/citilexasiahero.png"
                  alt="Kaos Custom Event CITILEX ASIA"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
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
          className="pt-12 pb-20 md:pt-16 md:pb-24 px-6 md:px-12 max-w-[1280px] mx-auto space-y-10 md:space-y-12"
        >
          <div className="text-center space-y-3 md:space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] text-brand-primary/60 uppercase">
              PRICE &amp; FABRIC OPTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase">
              Daftar Paket Harga Kaos Event
            </h2>
            <p className="text-sm text-brand-onyx max-w-xl mx-auto leading-relaxed">
              Pilih spesifikasi material yang paling ideal untuk anggaran dan
              kenyamanan peserta event Anda.
            </p>
          </div>
        
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-7">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative border p-7 md:p-8 flex flex-col justify-between transition-all duration-500 ease-out ${
                  pkg.popular
                    ? "border-white/10 bg-gradient-to-br from-brand-primary via-[#0F1115] to-black text-brand-white lg:-translate-y-2 shadow-2xl ring-1 ring-white/10"
                    : "border-brand-platinum bg-white text-brand-primary hover:-translate-y-1 hover:shadow-xl hover:border-brand-primary/20"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div
                      className="
                        px-6 py-2.5
                        bg-gradient-to-r
                        from-[#111111]
                        via-[#2A2A2A]
                        to-[#111111]
                        border border-white/15
                        shadow-2xl
                        backdrop-blur-md
                      "
                    >
                      <span className="text-[10px] font-black tracking-[0.28em] uppercase text-white">
                        TERPOPULER
                      </span>
                    </div>
                  </div>
                )}
        
                <div className="space-y-5">
                  <div>
                    <h3
                      className={`text-lg font-bold tracking-widest uppercase ${
                        pkg.popular ? "text-brand-white" : "text-brand-primary"
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className={`text-xs mt-2 leading-relaxed ${
                        pkg.popular
                          ? "text-brand-white/80"
                          : "text-brand-onyx/80"
                      }`}
                    >
                      {pkg.description}
                    </p>
                  </div>
        
                  <div className="border-t border-b py-5 border-brand-platinum/30">
                    <span className="text-xs font-semibold tracking-wider uppercase block opacity-65">
                      Mulai Dari
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-bold">Rp</span>
                      <span className="text-4xl font-extrabold tracking-tighter">
                        {pkg.price}
                      </span>
                      <span
                        className={`text-xs ${
                          pkg.popular
                            ? "text-brand-white/70"
                            : "text-brand-onyx/70"
                        }`}
                      >
                        /pcs
                      </span>
                    </div>
                  </div>
        
                  <ul className="space-y-3">
                    {pkg.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start text-xs tracking-wide leading-relaxed"
                      >
                        <Check
                          className={`w-4 h-4 mr-3 mt-0.5 shrink-0 ${
                            pkg.popular
                              ? "text-brand-white"
                              : "text-brand-primary"
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
        
                <div className="pt-7">
                  <a
                    href={generateWaLink(pkg.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center py-3.5 text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-1 ${
                      pkg.popular
                        ? "bg-white text-brand-primary border border-white"
                        : "bg-brand-primary text-brand-white border border-brand-primary"
                    }`}
                  >
                    KONSULTASI PAKET INI
                  </a>
                </div>
              </div>
            ))}
          </div>
        
          <p className="text-center text-xs text-brand-onyx/60 max-w-xl mx-auto leading-relaxed pt-2">
            * Harga final dapat bervariasi mengikuti jumlah pemesanan, jumlah posisi
            cetakan sablon/bordir, tenggat waktu pengerjaan, dan rentang ukuran di atas
            ukuran standard (XL).
          </p>
        </section>

        {/* WORKFLOW PROCESS SECTION */}
        <section className="py-20 bg-brand-snow border-t border-b border-brand-platinum px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="text-center space-y-3 md:space-y-4">
              <span className="text-xs font-bold tracking-[0.25em] text-brand-primary/60 uppercase">
                PRODUCTION TIMELINE
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase">
                Proses Pemesanan &amp; Alur Kerja
              </h2>
              <p className="text-sm text-brand-onyx max-w-xl mx-auto leading-relaxed">
                Langkah-langkah terstruktur untuk merealisasikan kebutuhan kaos event Anda dengan minim risiko kesalahan.
              </p>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-7">
              <div className="bg-white p-7 md:p-8 border border-brand-platinum flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-brand-primary/40 tracking-widest block">
                    01 / KONSEP
                  </span>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                    Konsultasi Desain
                  </h3>
                  <p className="text-xs text-brand-onyx leading-relaxed">
                    Diskusikan ide desain, pilihan material kain, jumlah order, dan timeline acara Anda dengan representasi kami secara praktis via WhatsApp.
                  </p>
                </div>
              </div>
        
              <div className="bg-white p-7 md:p-8 border border-brand-platinum flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-brand-primary/40 tracking-widest block">
                    02 / APPROVAL
                  </span>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                    Approval Mockup
                  </h3>
                  <p className="text-xs text-brand-onyx leading-relaxed">
                    Kami menyiapkan desain mockup visual digital secara detail untuk Anda teliti dan setujui demi menjamin kesesuaian posisi cetakan sablon.
                  </p>
                </div>
              </div>
        
              <div className="bg-white p-7 md:p-8 border border-brand-platinum flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-brand-primary/40 tracking-widest block">
                    03 / PRODUKSI
                  </span>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                    Mulai Produksi
                  </h3>
                  <p className="text-xs text-brand-onyx leading-relaxed">
                    Setelah DP 50% diterima, proses pembuatan massal (cutting, printing, sewing, QC) langsung dieksekusi oleh tim produksi profesional kami.
                  </p>
                </div>
              </div>
        
              <div className="bg-white p-7 md:p-8 border border-brand-platinum flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-brand-primary/40 tracking-widest block">
                    04 / KIRIM
                  </span>
                  <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">
                    QC &amp; Pengiriman
                  </h3>
                  <p className="text-xs text-brand-onyx leading-relaxed">
                    Setiap kaos melewati final QC sebelum dikemas rapi, dilunasi sisa pembayarannya, dan langsung dikirim aman ke alamat lokasi event Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO / GALLERY */}
        <section className="py-20 px-6 md:px-12 max-w-[1280px] mx-auto space-y-12">
          <div className="text-center space-y-3 md:space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] text-brand-primary/60 uppercase">
              GALLERY SHOWCASE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase">
              Galeri Hasil Produksi Kaos
            </h2>
            <p className="text-sm text-brand-onyx max-w-xl mx-auto leading-relaxed">
              Dokumentasi nyata hasil pengerjaan kaos sablon premium dari portofolio
              klien CITILEX ASIA.
            </p>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {/* CARD 1 */}
            <div className="group border border-brand-platinum bg-white p-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src="/porto1.png"
                  alt="CITILEX ASIA Custom Event Kaos Panitia dan Peserta Acara"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
        
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1">
                  <span className="text-[10px] font-black tracking-[0.22em] text-brand-primary">
                    01
                  </span>
                </div>
              </div>
        
              <div className="px-4 py-4 space-y-2">
                <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-brand-primary">
                  Corporate Gathering Shirt
                </h4>
                <p className="text-[11px] text-brand-onyx/70 uppercase tracking-wider leading-relaxed">
                  Bahan: Cotton Combed 30s • Sablon: DTF
                </p>
              </div>
            </div>
        
            {/* CARD 2 */}
            <div className="group border border-brand-platinum bg-white p-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src="/porto2.png"
                  alt="CITILEX ASIA Solstice Collective Hanging Black Custom Shirt"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
        
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1">
                  <span className="text-[10px] font-black tracking-[0.22em] text-brand-primary">
                    02
                  </span>
                </div>
              </div>
        
              <div className="px-4 py-4 space-y-2">
                <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-brand-primary">
                  Solstice Collective Edition
                </h4>
                <p className="text-[11px] text-brand-onyx/70 uppercase tracking-wider leading-relaxed">
                  Bahan: Premium Cotton Bamboo • Sablon: DTF
                </p>
              </div>
            </div>
        
            {/* CARD 3 */}
            <div className="group border border-brand-platinum bg-white p-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src="/porto3.png"
                  alt="CITILEX ASIA Close Up Fabric Quality Check"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
        
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1">
                  <span className="text-[10px] font-black tracking-[0.22em] text-brand-primary">
                    03
                  </span>
                </div>
              </div>
        
              <div className="px-4 py-4 space-y-2">
                <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-brand-primary">
                  Full Color DTF Printing
                </h4>
                <p className="text-[11px] text-brand-onyx/70 uppercase tracking-wider leading-relaxed">
                  Bahan: Cotton Combed 30s • Sablon: DTF
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-brand-snow border-t border-b border-brand-platinum px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-3 md:space-y-4">
              <span className="text-xs font-bold tracking-[0.25em] text-brand-primary/60 uppercase">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-brand-primary uppercase">
                Pertanyaan Yang Sering Diajukan
              </h2>
            </div>
        
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
        
                return (
                  <div
                    key={idx}
                    className={`border transition-all duration-300 ${
                      isOpen
                        ? "border-brand-primary/20 bg-white shadow-md"
                        : "border-brand-platinum bg-white hover:border-brand-primary/20"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center text-left px-6 py-5 md:px-7 md:py-6"
                    >
                      <span className="flex items-center gap-4 pr-4">
                        <div
                          className={`w-9 h-9 flex items-center justify-center border shrink-0 ${
                            isOpen
                              ? "border-brand-primary bg-brand-primary text-white"
                              : "border-brand-platinum text-brand-primary"
                          }`}
                        >
                          <HelpCircle className="w-4 h-4" />
                        </div>
        
                        <span className="font-bold text-xs md:text-sm tracking-[0.12em] uppercase text-brand-primary leading-relaxed">
                          {faq.question}
                        </span>
                      </span>
        
                      <div
                        className={`w-8 h-8 flex items-center justify-center border shrink-0 transition-all ${
                          isOpen
                            ? "border-brand-primary bg-brand-primary text-white"
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
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 md:px-7 md:pb-7 text-sm text-brand-onyx leading-relaxed">
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
        <section className="relative overflow-hidden bg-brand-primary text-brand-white pt-20 pb-24 px-6 md:px-12 text-center">
          {/* Background Accent */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white blur-3xl opacity-10" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-white blur-3xl opacity-10" />
          </div>
        
          <div className="relative max-w-3xl mx-auto space-y-6 md:space-y-8">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-brand-white/55 uppercase">
              SIAPKAN SEKARANG UNTUK ACARA ANDA
            </span>
        
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase leading-[1.08]">
              Wujudkan Kaos Event
              <br />
              Impian Bersama CITILEX ASIA
            </h2>
        
            <p className="text-sm text-brand-white/75 max-w-xl mx-auto leading-relaxed">
              Hubungi tim marketing kami sekarang untuk konsultasi bahan gratis,
              pengajuan penawaran harga, dan pembuatan mockup visual digital awal
              gratis.
            </p>
        
            <div className="pt-2">
              <a
                href={generateWaLink(defaultHeroMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  px-12 py-4
                  bg-white text-brand-primary
                  text-xs font-bold tracking-[0.22em] uppercase
                  border border-white
                  shadow-2xl
                  hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,255,255,0.18)]
                  transition-all duration-500
                "
              >
                <Image
                  src="/wa.svg"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  className="w-4 h-4 mr-3"
                />
                KONSULTASI GRATIS
              </a>
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
