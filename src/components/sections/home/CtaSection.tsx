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

export default function CtaSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-brand-primary text-brand-white py-20 md:py-24 px-6 md:px-12"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[320px] h-[320px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute top-[40%] left-[10%] w-[260px] h-[260px] rounded-full bg-[#D4AF37]/8 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="border border-[#D4AF37]/20 bg-white/[0.03] backdrop-blur-sm px-6 py-10 md:px-12 md:py-14 shadow-[0_25px_70px_rgba(0,0,0,0.35)] text-center">
          <div className="space-y-5 md:space-y-6">
            <div className="flex justify-center">
              <div className="px-5 py-2 rounded-full bg-white/5 border border-[#D4AF37]/25 backdrop-blur-md shadow-[0_8px_24px_rgba(212,175,55,0.12)]">
                <span className="text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
                  SIAPKAN SEKARANG UNTUK KAOS & POLO ANDA
                </span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl xl:text-6xl font-extrabold tracking-tighter uppercase leading-[1.05]">
              Wujudkan Kaos & Polo
              <br />
              <span className="bg-gradient-to-r from-white via-[#F3D98B] to-white bg-clip-text text-transparent">
                Impian Bersama CITILEX ASIA
              </span>
            </h2>

            <p className="text-sm md:text-base text-brand-white/75 max-w-2xl mx-auto leading-relaxed">
              Hubungi tim marketing kami sekarang untuk konsultasi bahan gratis, pengajuan penawaran harga, dan pembuatan mockup visual digital awal gratis.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            <span>✓ Respon Cepat</span>
            <span>✓ Mockup Gratis</span>
            <span>✓ Legalitas Lengkap</span>
          </div>

          <div className="mt-10">
            <WhatsAppButton message={companyConfig.defaultWaMessage} className={heroCtaClass}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-[#F8E7B9]/10 to-[#D4AF37]/10 opacity-80" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/80" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/80" />
              <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="relative z-10 w-4 h-4 mr-3" />
              <span className="relative z-10">HUBUNGI KAMI</span>
            </WhatsAppButton>
            <p className="mt-4 text-[11px] md:text-xs tracking-[0.12em] uppercase text-white/45">
              Biasanya dibalas dalam hitungan menit pada jam kerja
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
