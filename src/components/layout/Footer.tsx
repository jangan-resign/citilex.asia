import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "../ui/WhatsAppButton";
import { companyConfig } from "../../config/company";

const serviceLinks = [
  { label: "Kaos Custom Sablon", href: "/kaos-custom" },
  { label: "Polo Shirt Bordir", href: "/polo-shirt-custom" },
  { label: "Kaos Gathering Kantor", href: "/kaos-gathering-kantor" },
  { label: "Seragam Kerja Korporat", href: "/seragam-kerja-polo-shirt" },
  { label: "Kaos Event & Promosi", href: "/kaos-event-promosi" },
];

const areaLinks = [
  { label: "Jakarta Selatan (Bintaro)", href: "/kontak" },
  { label: "DKI Jakarta", href: "/kontak" },
  { label: "Tangerang & BSD", href: "/kontak" },
  { label: "Bekasi & Cikarang", href: "/kontak" },
  { label: "Depok & Margonda", href: "/kontak" },
  { label: "Bogor & Sentul", href: "/kontak" },
];

const footerLinkClass = [
  "inline-block py-1.5 text-xs text-brand-onyx/80",
  "hover:text-brand-primary hover:underline underline-offset-4",
  "transition-colors",
].join(" ");

export default function Footer() {
  return (
    <footer
      id="address"
      className="bg-white border-t border-brand-platinum pt-16 pb-10 px-6 md:px-12"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Kolom 1: Brand & Kontak Cepat */}
        <div className="lg:col-span-4 space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/tekslogo.png"
              alt={companyConfig.name}
              width={180}
              height={40}
              className="h-auto w-auto object-contain"
            />
          </Link>
          <p className="text-[11px] font-bold text-brand-onyx/75 tracking-[0.2em] uppercase">
            PREMIUM CUSTOM APPAREL MANUFACTURER
          </p>
          <p className="text-xs text-brand-onyx/80 leading-relaxed max-w-xs">
            Produsen kaos custom dan polo shirt skala besar untuk kebutuhan korporat,
            event, gathering, seminar, dan merchandise di bawah naungan{" "}
            <span className="font-semibold text-brand-primary">PT Nusa Garment Indonesia</span>.
          </p>
          <div className="text-xs text-brand-onyx leading-relaxed space-y-1.5 pt-1">
            <p>
              <span className="font-semibold text-brand-primary">WhatsApp: </span>
              <WhatsAppButton
                message={companyConfig.defaultWaMessage}
                className="inline-block py-1 hover:text-brand-primary underline underline-offset-4 transition-colors"
              >
                +62 813-2927-1515
              </WhatsAppButton>
            </p>
            <p>
              <span className="font-semibold text-brand-primary">Email: </span>
              <a
                href="mailto:behagroup@gmail.com"
                className="inline-block py-1 hover:text-brand-primary underline underline-offset-4 transition-colors"
              >
                behagroup@gmail.com
              </a>
            </p>
            <p className="text-brand-onyx/80">
              Jam Kerja: Senin – Sabtu, 09:00 – 17:00 WIB
            </p>
            <p className="pt-1">
              <Link
                href="/kontak"
                className="inline-block py-1.5 text-[11px] font-bold tracking-[0.16em] uppercase text-brand-primary border-b border-brand-primary hover:opacity-75 transition-opacity"
              >
                Halaman Kontak &amp; Lokasi ↗
              </Link>
            </p>
          </div>
        </div>

        {/* Kolom 2: Layanan Produksi */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold text-brand-primary tracking-[0.18em] uppercase">
            Layanan Produksi
          </h3>
          <ul className="space-y-1">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={footerLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Area Layanan B2B */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold text-brand-primary tracking-[0.18em] uppercase">
            Area Jabodetabek
          </h3>
          <ul className="space-y-1">
            {areaLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={footerLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 4: Lokasi Kantor & Production Center Resmi (NAP Sinkron JSON-LD) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-bold text-brand-primary tracking-[0.18em] uppercase">
            Kantor &amp; Pusat Produksi
          </h3>

          <div className="text-xs text-brand-onyx leading-relaxed space-y-4">
            <div className="space-y-1">
              <p className="font-semibold text-brand-primary">
                Jakarta Rep. Office — PT Nusa Garment Indonesia
              </p>
              <p className="text-brand-onyx/85">
                Jl. Bintaro Tengah Blok J4 No.12, Bintaro, Pesanggrahan, Jakarta Selatan 12330
              </p>
              <a
                href="https://maps.app.goo.gl/TCbUWmqaG9rHAdoL7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 text-[11px] font-bold tracking-[0.14em] uppercase text-brand-primary border-b border-brand-primary hover:opacity-75 transition-opacity"
              >
                Google Maps Jakarta ↗
              </a>
            </div>

            <div className="space-y-1 pt-2 border-t border-brand-platinum">
              <p className="font-semibold text-brand-primary">
                Production Center Yogyakarta
              </p>
              <p className="text-brand-onyx/85">
                Jl. Menayu Lor Plurugan No.112, Tirtonirmolo, Kasihan, Bantul, Daerah Istimewa Yogyakarta
              </p>
              <a
                href="https://maps.app.goo.gl/jLiq3Eev19tLpshH6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 text-[11px] font-bold tracking-[0.14em] uppercase text-brand-primary border-b border-brand-primary hover:opacity-75 transition-opacity"
              >
                Google Maps Production Center ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Footer (Legalitas & Copyright) */}
      <div className="max-w-[1280px] mx-auto border-t border-brand-platinum mt-14 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs text-brand-onyx/80">
        <span>
          © {new Date().getFullYear()} {companyConfig.name} — PT Nusa Garment Indonesia. All Rights Reserved.
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/portofolio" className="py-1.5 hover:text-brand-primary transition-colors">
            Portofolio
          </Link>
          <Link href="/tentang-kami" className="py-1.5 hover:text-brand-primary transition-colors">
            Tentang Kami
          </Link>
          <Link href="/blog" className="py-1.5 hover:text-brand-primary transition-colors">
            Blog
          </Link>
          <Link href="/kontak" className="py-1.5 hover:text-brand-primary transition-colors">
            Kontak
          </Link>
          <Link href="/terms-of-service" className="py-1.5 hover:text-brand-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="py-1.5 hover:text-brand-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
