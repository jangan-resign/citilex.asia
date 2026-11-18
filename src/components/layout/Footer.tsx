import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "../ui/WhatsAppButton";
import { companyConfig } from "../../config/company";

const serviceLinks = [
  { label: "Kaos Custom Sablon", href: "/#pricing" },
  { label: "Polo Shirt Bordir", href: "/#pricing-polo" },
  { label: "Kaos Gathering Kantor", href: "/#pricing" },
  { label: "Seragam Kerja Korporat", href: "/#pricing-polo" },
  { label: "Kaos Event & Promosi", href: "/#pricing" },
];

const areaLinks = [
  { label: "Jakarta Selatan (Bintaro)", href: "/#contact" },
  { label: "DKI Jakarta", href: "/#contact" },
  { label: "Tangerang & BSD", href: "/#contact" },
  { label: "Bekasi & Cikarang", href: "/#contact" },
  { label: "Depok & Margonda", href: "/#contact" },
  { label: "Bogor & Sentul", href: "/#contact" },
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
        {/* Kolom 1: Brand & Legalitas */}
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
        </div>

        {/* Kolom 2: Layanan Produksi */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-bold text-brand-primary tracking-[0.18em] uppercase">
            Layanan Produksi
          </h3>
          <ul className="space-y-1.5">
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
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-xs font-bold text-brand-primary tracking-[0.18em] uppercase">
            Area Jabodetabek
          </h3>
          <ul className="space-y-1.5">
            {areaLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={footerLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 4: Jakarta Rep. Office & Kontak Resmi (NAP Sinkron JSON-LD) */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-xs font-bold text-brand-primary tracking-[0.18em] uppercase">
            Jakarta Rep. Office
          </h3>
          <div className="text-xs text-brand-onyx leading-relaxed space-y-2.5">
            <p>
              <span className="font-semibold text-brand-primary block">
                Rep. Office PT Nusa Garment Indonesia
              </span>
              Jl. Bintaro Tengah Blok J4 No.12, Bintaro, Pesanggrahan, Jakarta Selatan 12330
            </p>
            <div className="space-y-2 pt-1">
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
              <p className="text-brand-onyx/80 pt-0.5">
                Jam Kerja: Senin – Sabtu, 09:00 – 17:00 WIB
              </p>
            </div>
            <p className="pt-1">
              <a
                href="https://maps.app.goo.gl/TCbUWmqaG9rHAdoL7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1.5 text-[11px] font-bold tracking-[0.16em] uppercase text-brand-primary border-b border-brand-primary hover:opacity-75 transition-opacity"
              >
                Lihat Lokasi Google Maps ↗
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Sub Footer (Legalitas & Copyright) */}
      <div className="max-w-[1280px] mx-auto border-t border-brand-platinum mt-14 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs text-brand-onyx/80">
        <span>
          © {new Date().getFullYear()} {companyConfig.name} — PT Nusa Garment Indonesia. All Rights Reserved.
        </span>
        <div className="flex items-center gap-6">
          <Link href="/terms-of-service" className="py-1 hover:text-brand-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="py-1 hover:text-brand-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
