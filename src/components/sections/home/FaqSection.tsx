"use client";

import { useState } from "react";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { faqs } from "../../../lib/data";

export default function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
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
              Temukan jawaban cepat seputar minimum order, timeline produksi, material kain, hingga proses pengiriman.
            </p>
          </div>

          <div className="relative overflow-hidden border border-white/10 bg-[#000000] p-7 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-amber-300/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-yellow-200/10 blur-3xl pointer-events-none" />

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-amber-300/20 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="text-[10px] font-black tracking-[0.24em] uppercase bg-gradient-to-r from-[#F7E7A1] via-[#D4AF37] to-[#FFF2B2] bg-clip-text text-transparent">
                CUSTOMER SUPPORT
              </span>
            </div>

            <div className="relative mt-6 space-y-5">
              <p className="text-lg font-bold text-white leading-snug">
                Tim kami siap membantu Anda dari tahap konsultasi hingga kaos & polo selesai diproduksi.
              </p>
              <p className="text-sm text-white/65 leading-relaxed">
                Setiap project event memiliki kebutuhan unik. Karena itu kami memastikan komunikasi cepat, transparan, dan minim risiko revisi.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                  <span className="text-amber-300">✦</span> Respon Cepat
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                  <span className="text-amber-300">✦</span> Mockup Gratis
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                  <span className="text-amber-300">✦</span> Pengiriman Nasional
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
                className={[
                  "group bg-white border transition-all duration-500",
                  isOpen
                    ? "border-brand-primary shadow-xl ring-1 ring-amber-300/30"
                    : "border-brand-platinum hover:border-brand-primary/20 hover:shadow-md",
                ].join(" ")}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left px-6 py-6 md:px-8 md:py-7"
                >
                  <div className="flex items-start gap-5 pr-4">
                    <div className={["w-11 h-11 shrink-0 flex items-center justify-center border transition-all", isOpen ? "bg-brand-primary border-brand-primary text-white shadow-[0_0_25px_rgba(212,175,55,0.15)]" : "border-brand-platinum text-brand-primary"].join(" ")}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs md:text-sm tracking-[0.14em] uppercase text-brand-primary leading-relaxed">
                      {faq.question}
                    </span>
                  </div>
                  <div className={["w-10 h-10 shrink-0 flex items-center justify-center border transition-all", isOpen ? "bg-brand-primary border-brand-primary text-white" : "border-brand-platinum text-brand-primary"].join(" ")}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <div className={["grid transition-all duration-500", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"].join(" ")}>
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
  );
}
