import Image from "next/image";
import Link from "next/link";
import { companyConfig } from "../../config/company";

export default function Footer() {
  return (
    <footer id="address" className="bg-white border-t border-slate-200 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Kolom Kiri: Brand & Info */}
        <div className="space-y-3 max-w-sm">
          <Image
            src="/tekslogo.png"
            alt={companyConfig.name}
            width={180}
            height={40}
            className="h-auto w-auto object-contain"
          />
          <p className="text-xs text-slate-500 tracking-widest uppercase">
            PREMIUM CUSTOM APPAREL MANUFACTURER
          </p>
        </div>

        {/* Kolom Kanan: Alamat */}
        <div className="flex flex-col md:items-end max-w-sm">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-widest uppercase">
              Jakarta Office
            </h4>
            <div className="text-sm text-slate-600">
              <p className="leading-relaxed text-left">
                Bintaro Pesanggrahan<br />
                Jakarta Selatan, Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Footer (Legalitas & Copyright) */}
      <div className="max-w-[1280px] mx-auto border-t border-slate-200 mt-16 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
        <span>© {new Date().getFullYear()} {companyConfig.name}. All Rights Reserved.</span>
        <div className="flex items-center gap-6">
          <Link href="/terms-of-service" className="hover:text-brand-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="hover:text-brand-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
