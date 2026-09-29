import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "../ui/WhatsAppButton";
import { companyConfig } from "../../config/company";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-20 bg-white/95 backdrop-blur-md border-b border-brand-platinum">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="CITILEX ASIA"
          width={140}
          height={40}
          className="h-8 w-auto md:h-10"
          priority
        />
      </Link>
      
      <WhatsAppButton
        message={companyConfig.defaultWaMessage}
        className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-brand-primary text-brand-white text-xs font-semibold tracking-wider uppercase border border-white hover:-translate-y-1 transition-transform duration-300"
      >
        <Image src="/wa.svg" alt="WhatsApp" width={16} height={16} className="w-4 h-4 mr-2" />
        Tanya via WhatsApp
      </WhatsAppButton>
    </header>
  );
}
