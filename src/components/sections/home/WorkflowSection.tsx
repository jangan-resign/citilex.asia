import { workflowSteps } from "../../../lib/data";

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-brand-snow border-y border-brand-platinum px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight uppercase text-brand-primary">
            Proses Pemesanan & Alur Kerja
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-brand-onyx text-sm md:text-base leading-8">
            Langkah-langkah terstruktur untuk merealisasikan kebutuhan kaos Anda dengan minim risiko kesalahan.
          </p>
        </div>

        <div className="relative">
          <div className="hidden xl:block absolute left-0 right-0 top-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 relative">
            {workflowSteps.map((step) => (
              <div key={step.no} className="relative group pt-10">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-14 rounded-b-lg bg-gradient-to-b from-[#F3DB8D] via-[#D7AF46] to-[#B88717] shadow-lg" />

                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-[70px] h-[54px] rounded-xl border-2 border-[#D4AF37] bg-[#252525] flex items-center justify-center shadow-[0_12px_28px_rgba(0,0,0,.35)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#F3DB8D]">
                    <span className="text-[#F6D98B] text-lg font-black tracking-[0.12em]">{step.no}</span>
                  </div>
                </div>

                <div className="relative h-full min-h-[315px] pt-14 px-8 pb-8 border border-[#D4AF37]/20 bg-gradient-to-br from-[#101010] via-[#181818] to-[#222222] shadow-[0_18px_40px_rgba(0,0,0,.18)] transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/45 hover:shadow-[0_24px_60px_rgba(0,0,0,.28)] overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F6D98B]/[0.03] via-transparent to-[#D4AF37]/[0.03] pointer-events-none" />

                  <div className="relative">
                    <span className="block text-[11px] font-bold tracking-[0.30em] uppercase text-[#D4AF37]/75">{step.label}</span>
                    <h3 className="mt-5 text-lg font-black uppercase tracking-wide text-white">{step.title}</h3>
                    <div className="mt-5 w-12 h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent" />
                    <p className="mt-6 text-sm leading-7 text-white/70">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
