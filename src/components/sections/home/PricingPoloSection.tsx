import { Check } from "lucide-react";
import WhatsAppButton from "../../ui/WhatsAppButton";
import { poloPackages } from "../../../lib/data";

export default function PricingPoloSection() {
  return (
    <section
      id="pricing-polo"
      className="pt-4 pb-20 md:pt-8 md:pb-24 px-6 md:px-12 max-w-[1280px] mx-auto space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-none">
          Daftar Paket Harga Polo Shirt
        </h2>

        <p className="text-sm md:text-base text-brand-onyx max-w-2xl mx-auto leading-relaxed">
          Pilih material dan spesifikasi polo shirt yang paling ideal untuk anggaran dan kenyamanan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-0 lg:items-stretch">
        {poloPackages.map((pkg, idx) => {
          const cardClass = [
            "relative flex flex-col justify-between transition-all duration-500 ease-out",
            pkg.popular
              ? "z-20 bg-gradient-to-br from-[#0e0c00] via-[#080808] to-[#111111] text-white border-x border-[#D4AF37]/40 shadow-[0_0_0_1px_rgba(212,175,55,0.15),0_40px_100px_rgba(0,0,0,0.6),0_0_80px_rgba(212,175,55,0.12),0_0_160px_rgba(212,175,55,0.05)] lg:-translate-y-6 hover:-translate-y-8 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.25),0_50px_120px_rgba(0,0,0,0.7),0_0_120px_rgba(212,175,55,0.18)] px-8 py-10 min-h-[740px]"
              : "bg-gradient-to-br from-[#1B1B1B] to-[#101010] text-white border border-white/10 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] px-8 py-8 min-h-[660px]",
          ].join(" ");

          const titleClass = [
            "font-black tracking-[0.15em] uppercase",
            pkg.popular ? "text-2xl" : "text-xl",
          ].join(" ");

          const priceBorderClass = [
            "py-6 border-y",
            pkg.popular ? "border-[#D4AF37]/25" : "border-white/10",
          ].join(" ");

          const priceRpClass = [
            "font-bold mb-1",
            pkg.popular ? "text-2xl text-[#D4AF37]" : "text-xl text-white/60",
          ].join(" ");

          const priceNumClass = [
            "font-extrabold tracking-tighter leading-none",
            pkg.popular
              ? "text-6xl md:text-6xl bg-gradient-to-b from-[#F8E7B9] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent"
              : "text-5xl md:text-6xl text-white",
          ].join(" ");

          const ctaClass = [
            "relative block w-full text-center font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:-translate-y-1",
            pkg.popular
              ? "py-5 text-xs bg-gradient-to-r from-[#F8E7B9] via-[#D4AF37] to-[#B8860B] text-black shadow-[0_0_40px_rgba(212,175,55,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_24px_60px_rgba(212,175,55,0.35)]"
              : "py-4 text-xs bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
          ].join(" ");

          return (
            <div key={idx} className={cardClass}>
              {/* GOLD TOP LINE */}
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              )}

              {/* GOLD GLOW */}
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.09)_0%,transparent_70%)] pointer-events-none" />
              )}

              {/* SUBTLE CARD OVERLAY */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#F8E7B9]/[0.02] via-transparent to-[#D4AF37]/[0.03]" />

              <div className="relative space-y-7">
                {/* POPULAR BADGE */}
                {pkg.popular && (
                  <div className="flex justify-center">
                    <div className="relative px-5 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.15)] overflow-hidden">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#F8E7B9]/20 to-transparent -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite]" />

                      <span className="relative text-[9px] font-black tracking-[0.3em] uppercase text-[#F8E7B9]">
                        ⭐ TERPOPULER
                      </span>
                    </div>
                  </div>
                )}

                {/* TITLE + DESCRIPTION */}
                <div className="text-center space-y-2.5">
                  <h3 className={titleClass}>{pkg.name}</h3>

                  <p className="text-xs leading-relaxed max-w-xs mx-auto text-white/65">
                    {pkg.description}
                  </p>
                </div>

                {/* PRICE */}
                <div className={priceBorderClass}>
                  <span className="text-[10px] font-semibold tracking-[0.18em] uppercase block text-center text-white/45 mb-2">
                    Mulai Dari
                  </span>

                  <div className="flex items-end justify-center gap-1">
                    <span className={priceRpClass}>Rp</span>

                    <span className={priceNumClass}>{pkg.price}</span>

                    <span className="text-sm mb-1.5 text-white/45">/pcs</span>
                  </div>
                </div>

                {/* FEATURES */}
                <ul className="space-y-3.5">
                  {pkg.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start text-sm leading-relaxed"
                    >
                      <Check className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-[#D4AF37]" />

                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-8 relative">
                <WhatsAppButton message={pkg.whatsappText} className={ctaClass}>
                  KONSULTASI PAKET INI
                </WhatsAppButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* DISCLAIMER */}
      <p className="text-center text-xs text-brand-onyx/60 max-w-2xl mx-auto leading-relaxed pt-3">
        * Harga final dapat bervariasi mengikuti jumlah pemesanan, jumlah posisi
        cetakan sablon/bordir, tenggat waktu pengerjaan, aksesoris dan rentang
        ukuran di atas ukuran standard (XL).
      </p>
    </section>
  );
}
