import Image from "next/image";
import WhatsAppButton from "../../ui/WhatsAppButton";
import { companyConfig } from "../../../config/company";

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

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden px-6 md:px-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand-primary/[0.04] blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-brand-primary/[0.05] blur-3xl" />
      </div>

      <div className="relative max-w-[1280px] mx-auto pt-14 pb-20 md:pt-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-7 md:space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-brand-primary uppercase leading-[0.95]">
            Produsen Kaos & Polo Custom
            <br />
            <span className="bg-gradient-to-r from-black/95 via-[#F3D98B] to-black/95 bg-clip-text text-transparent">
              untuk Korporat, Event & Merchandise
            </span>
          </h1>

          <p className="text-base md:text-lg text-brand-onyx max-w-2xl leading-relaxed">
            CITILEX ASIA - Solusi pengadaan kaos & polo custom premium
            untuk seragam korporat, event, gathering, seminar, reuni, merchandise dan promosi brand.
            Kualitas terjamin, sablon/bordir presisi dan pengiriman tepat waktu.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center pt-2">
            <WhatsAppButton message={companyConfig.defaultWaMessage} className={heroCtaClass}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#F8E7B9]/10 to-[#D4AF37]/10 opacity-80" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/80" />
              <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="relative z-10 w-4 h-4 mr-3" />
              <span className="relative z-10">KONSULTASI GRATIS</span>
            </WhatsAppButton>

            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-brand-platinum"></span>
              <p className="text-xs font-bold text-brand-onyx/65 tracking-[0.18em] uppercase">
                Minimal Order 100 Pcs
              </p>
            </div>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-platinum">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-brand-primary">500+</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-brand-onyx/60 mt-1">Klien Korporasi</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-brand-primary">50K+</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-brand-onyx/60 mt-1">Kaos Diproduksi</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-brand-primary">3 Hari</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-brand-onyx/60 mt-1">Pengerjaan Selesai</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="absolute inset-0 scale-95 rounded-full bg-brand-primary/10 blur-3xl"></div>
            {/* floating card top */}
            <div className="absolute -top-4 -left-4 md:-left-8 z-20">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
              <div className="relative px-5 py-4 bg-black/65 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_18px_45px_rgba(0,0,0,0.35),0_0_24px_rgba(212,175,55,0.14)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F8E7B9]/10 via-transparent to-[#D4AF37]/10 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                <p className="relative text-[10px] font-bold tracking-[0.18em] uppercase text-[#D4AF37]/80">PREMIUM MATERIAL</p>
                <p className="relative text-sm font-bold text-white mt-1">Combed, Bamboo, Lacoste</p>
              </div>
            </div>

            {/* image */}
            <div className="relative aspect-[4/5] bg-white border border-brand-platinum p-3 shadow-2xl">
              <Image
                src="/lia-karina.png"
                alt="Kaos Custom Event CITILEX ASIA"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>

            {/* floating card bottom */}
            <div className="absolute -bottom-4 right-0 md:-right-6 z-20">
              <div className="relative px-5 py-4 bg-black/70 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_24px_rgba(212,175,55,0.14)]">
                <div className="absolute inset-0 bg-gradient-to-tl from-[#D4AF37]/10 via-transparent to-[#F8E7B9]/10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
                <p className="relative text-[10px] font-bold tracking-[0.18em] uppercase text-[#D4AF37]/80">FAST PRODUCTION</p>
                <p className="relative text-sm font-bold text-white mt-1">Deadline Friendly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
