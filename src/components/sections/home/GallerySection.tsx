"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gallerySlides } from "../../../lib/data";

export default function GallerySection() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const touchStartX = useRef(0);

  const nextGallery = () => {
    setGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
  };

  const prevGallery = () => {
    setGalleryIndex((prev) =>
      prev === 0 ? gallerySlides.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="gallery"
      className="py-20 md:py-24 px-6 md:px-12 max-w-[1280px] mx-auto space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-brand-primary uppercase leading-none">
          Galeri Hasil Produksi Kaos & Polo
        </h2>
        <p className="text-sm md:text-base text-brand-onyx max-w-2xl mx-auto leading-relaxed">
          Dokumentasi nyata hasil pengerjaan kaos sablon & polo shirt bordir dari portofolio klien CITILEX ASIA.
        </p>
      </div>

      <div className="hidden lg:grid lg:grid-cols-12 gap-6 md:gap-7">
        {/* HERO CARD */}
        <div className="lg:col-span-7 group relative overflow-hidden bg-white border border-brand-platinum min-h-[620px] shadow-xl">
          <div className="relative w-full h-full min-h-[620px] overflow-hidden">
            <Image src="/galeri5.png" alt="CITILEX ASIA Custom Event Kaos Panitia dan Peserta Acara" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute top-6 left-6">
              <div className="relative px-4 py-2 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(212,175,55,0.16)]">
                <div className="absolute inset-[1px] border border-white/5 rounded-sm" />
                <span className="relative text-[11px] font-black tracking-[0.28em] text-[#F3D27A]">01</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 space-y-3">
              <h4 className="text-lg md:text-xl font-bold tracking-[0.18em] uppercase text-white">Corporate Gathering Shirt</h4>
              <p className="text-xs md:text-sm text-white/75 uppercase tracking-[0.18em]">Bahan: Cotton Combed 30s • Sablon: DTF</p>
            </div>
          </div>
        </div>

        {/* RIGHT STACK */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-6 md:gap-7">
          <div className="group relative overflow-hidden bg-white border border-brand-platinum min-h-[296px] hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
            <div className="relative w-full h-full min-h-[296px] overflow-hidden">
              <Image src="/galeri6.png" alt="CITILEX ASIA Computer Embroidered Polo Shirt" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-6 left-6">
                <div className="relative px-4 py-2 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(212,175,55,0.16)]">
                  <div className="absolute inset-[1px] border border-white/5 rounded-sm" />
                  <span className="relative text-[11px] font-black tracking-[0.28em] text-[#F3D27A]">02</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-sm font-bold tracking-[0.16em] uppercase text-white">Computer Embroidered Polo Shirt</h4>
                <p className="text-[11px] text-white/70 mt-2 uppercase tracking-[0.14em]">Bahan: Lacoste Pique • Bordir Komputer</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white border border-brand-platinum min-h-[296px] hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
            <div className="relative w-full h-full min-h-[296px] overflow-hidden">
              <Image src="/galeri3.png" alt="CITILEX ASIA Close Up Fabric Quality Check" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-6 left-6">
                <div className="relative px-4 py-2 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(212,175,55,0.16)]">
                  <div className="absolute inset-[1px] border border-white/5 rounded-sm" />
                  <span className="relative text-[11px] font-black tracking-[0.28em] text-[#F3D27A]">03</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-sm font-bold tracking-[0.16em] uppercase text-white">Full Color DTF Printing</h4>
                <p className="text-[11px] text-white/70 mt-2 uppercase tracking-[0.14em]">Bahan: Cotton Combed 30s • Sablon: DTF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE GALLERY */}
      <div className="lg:hidden overflow-hidden">
        <div
          className="flex select-none touch-pan-y transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
          style={{
            transform: `translateX(-${galleryIndex * 100}%)`,
          }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const end = e.changedTouches[0].clientX;
            if (touchStartX.current - end > 60) {
              nextGallery();
            }
            if (end - touchStartX.current > 60) {
              prevGallery();
            }
          }}
        >
          {gallerySlides.map((item) => (
            <div key={item.number} className="w-full shrink-0">
              <div className="relative overflow-hidden bg-white border border-brand-platinum shadow-xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="100vw"
                    draggable={false}
                    referrerPolicy="no-referrer"
                    className={`object-cover transition-transform duration-700 ${galleryIndex === Number(item.number) - 1 ? "scale-105" : "scale-100"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="relative px-3 py-1.5 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                      <div className="absolute inset-[1px] border border-white/5 rounded-sm" />
                      <span className="relative text-[10px] font-black tracking-[0.28em] text-[#F3D27A]">{item.number}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                    <h4 className="text-[15px] font-bold tracking-[0.12em] uppercase text-white leading-tight">{item.title}</h4>
                    <p className="text-[11px] text-white/80 uppercase tracking-[0.08em] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INDICATOR */}
        <div className="flex justify-center gap-3 mt-6">
          {gallerySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setGalleryIndex(i)}
              className={`transition-all duration-300 rounded-full ${galleryIndex === i ? "w-8 h-2 bg-brand-primary" : "w-2 h-2 bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
