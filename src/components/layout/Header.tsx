"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import WhatsAppButton from "../ui/WhatsAppButton";
import { companyConfig } from "../../config/company";

const serviceMenuItems = [
  {
    label: "Kaos Custom Sablon",
    desc: "Combed 30s/24s, Bamboo & PE",
    href: "/kaos-custom",
  },
  {
    label: "Polo Shirt Bordir",
    desc: "Lacoste Soft, Pique & Diamond",
    href: "/polo-shirt-custom",
  },
  {
    label: "Kaos Gathering Kantor",
    desc: "Outing, Family Day & Raker",
    href: "/kaos-gathering-kantor",
  },
  {
    label: "Seragam Kerja Korporat",
    desc: "Seragam Kantor & Instansi",
    href: "/seragam-kerja-polo-shirt",
  },
  {
    label: "Kaos Event & Promosi",
    desc: "Seminar, Reuni & Merchandise",
    href: "/kaos-event-promosi",
  },
];

const navLinkClass = [
  "relative py-2 text-xs font-bold tracking-[0.16em] uppercase",
  "text-brand-onyx hover:text-brand-primary",
  "transition-colors whitespace-nowrap",
].join(" ");

const dropdownPanelClass = [
  "bg-white border border-brand-platinum",
  "shadow-[0_20px_50px_rgba(0,0,0,0.12)]",
  "relative overflow-hidden",
].join(" ");

const dropdownItemClass = [
  "group flex items-start justify-between gap-3 px-5 py-3.5",
  "border-b border-brand-platinum last:border-b-0",
  "hover:bg-brand-snow transition-colors",
].join(" ");

const headerWaClass = [
  "hidden md:inline-flex items-center justify-center shrink-0",
  "px-6 py-2.5 bg-brand-primary text-brand-white",
  "text-xs font-semibold tracking-wider uppercase",
  "border border-white hover:-translate-y-1 transition-transform duration-300",
].join(" ");

const mobileWaClass = [
  "flex items-center justify-center w-full",
  "px-6 py-4 bg-brand-primary text-brand-white",
  "text-xs font-bold tracking-[0.2em] uppercase",
  "border border-[#D4AF37]/40 shadow-lg",
].join(" ");

export default function Header() {
  const pathname = usePathname();
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isServiceActive = serviceMenuItems.some((item) => pathname === item.href);

  useEffect(() => {
    setIsLayananOpen(false);
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLayananOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLayananOpen(false);
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 h-20 bg-white/95 backdrop-blur-md border-b border-brand-platinum flex items-center">
        <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center gap-6">
          {/* KIRI: LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="CITILEX ASIA"
              width={140}
              height={40}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>

          {/* TENGAH: DESKTOP NAVIGATION */}
          <nav aria-label="Navigasi Utama" className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={[
                navLinkClass,
                pathname === "/" ? "text-brand-primary border-b-2 border-[#D4AF37]" : "",
              ].join(" ")}
            >
              Beranda
            </Link>

            {/* Dropdown Layanan */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsLayananOpen(true)}
              onMouseLeave={() => setIsLayananOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsLayananOpen((prev) => !prev)}
                aria-expanded={isLayananOpen}
                aria-haspopup="true"
                className={[
                  navLinkClass,
                  "inline-flex items-center gap-1.5",
                  isServiceActive ? "text-brand-primary border-b-2 border-[#D4AF37]" : "",
                ].join(" ")}
              >
                <span>Layanan</span>
                <ChevronDown
                  className={[
                    "w-3.5 h-3.5 transition-transform duration-200",
                    isLayananOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {isLayananOpen && (
                <div className="absolute left-0 top-full pt-3 w-80 z-50">
                  <div className={dropdownPanelClass}>
                    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                    <div>
                      {serviceMenuItems.map((item) => {
                        const isItemActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsLayananOpen(false)}
                            className={[
                              dropdownItemClass,
                              isItemActive ? "bg-brand-snow" : "",
                            ].join(" ")}
                          >
                            <div className="space-y-0.5">
                              <span className="block text-xs font-extrabold tracking-wider uppercase text-brand-primary">
                                {item.label}
                              </span>
                              <span className="block text-[11px] text-brand-onyx/75">
                                {item.desc}
                              </span>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-brand-onyx/70 group-hover:text-brand-primary mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/#pricing" className={navLinkClass}>
              Daftar Harga
            </Link>

            <Link href="/#workflow" className={navLinkClass}>
              Alur Pesan
            </Link>

            <Link href="/#address" className={navLinkClass}>
              Kontak
            </Link>
          </nav>

          {/* KANAN: WHATSAPP CTA + MOBILE HAMBURGER */}
          <div className="flex items-center gap-3 shrink-0">
            <WhatsAppButton message={companyConfig.defaultWaMessage} className={headerWaClass}>
              <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="w-4 h-4 mr-2" />
              Tanya via WhatsApp
            </WhatsAppButton>

            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-expanded={isMobileOpen}
              aria-label={isMobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              className="lg:hidden w-11 h-11 border border-brand-platinum flex items-center justify-center text-brand-primary hover:bg-brand-snow transition-colors"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE BACKDROP */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 top-20 z-30 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* MOBILE MENU PANEL */}
      {isMobileOpen && (
        <nav
          aria-label="Navigasi Mobile"
          className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-white border-b border-brand-platinum px-6 py-6 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto"
        >
          <div className="space-y-6">
            {/* Link Utama */}
            <div className="grid grid-cols-2 gap-3 pb-4 border-b border-brand-platinum">
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                className={[
                  "px-4 py-3 border text-xs font-bold tracking-[0.16em] uppercase text-center transition-colors",
                  pathname === "/"
                    ? "border-brand-primary bg-brand-primary text-white"
                    : "border-brand-platinum text-brand-primary hover:bg-brand-snow",
                ].join(" ")}
              >
                Beranda
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setIsMobileOpen(false)}
                className="px-4 py-3 border border-brand-platinum text-xs font-bold tracking-[0.16em] uppercase text-center text-brand-primary hover:bg-brand-snow transition-colors"
              >
                Daftar Harga
              </Link>
              <Link
                href="/#workflow"
                onClick={() => setIsMobileOpen(false)}
                className="px-4 py-3 border border-brand-platinum text-xs font-bold tracking-[0.16em] uppercase text-center text-brand-primary hover:bg-brand-snow transition-colors"
              >
                Alur Pesan
              </Link>
              <Link
                href="/#address"
                onClick={() => setIsMobileOpen(false)}
                className="px-4 py-3 border border-brand-platinum text-xs font-bold tracking-[0.16em] uppercase text-center text-brand-primary hover:bg-brand-snow transition-colors"
              >
                Kontak
              </Link>
            </div>

            {/* Daftar 5 Halaman Layanan */}
            <div className="space-y-2.5">
              <span className="block text-[10px] font-bold tracking-[0.24em] uppercase text-brand-onyx/75">
                Layanan Produksi B2B
              </span>
              <div className="border border-brand-platinum divide-y divide-brand-platinum">
                {serviceMenuItems.map((item) => {
                  const isItemActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={[
                        "flex items-center justify-between px-4 py-3.5 transition-colors",
                        isItemActive ? "bg-brand-snow" : "bg-white hover:bg-brand-snow",
                      ].join(" ")}
                    >
                      <div>
                        <span className="block text-xs font-extrabold tracking-wider uppercase text-brand-primary">
                          {item.label}
                        </span>
                        <span className="block text-[11px] text-brand-onyx/75 mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-brand-primary shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp CTA Mobile */}
            <WhatsAppButton message={companyConfig.defaultWaMessage} className={mobileWaClass}>
              <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="w-4 h-4 mr-2.5" />
              <span>TANYA VIA WHATSAPP</span>
            </WhatsAppButton>
          </div>
        </nav>
      )}
    </>
  );
}
