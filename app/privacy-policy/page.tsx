import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-brand-primary flex flex-col justify-between">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-white/90 backdrop-blur-md border-b border-brand-platinum">
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
        <Link href="/" className="text-xs font-semibold tracking-widest uppercase hover:underline">
          Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-semibold tracking-tighter uppercase mb-2">Privacy Policy</h1>
        <p className="text-xs text-brand-onyx/60 tracking-widest uppercase mb-12">Last Updated: June 26, 2026</p>

        <div className="space-y-8 text-brand-onyx text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary border-b border-brand-platinum pb-1">
              1. Information Collected
            </h2>
            <p>
              Kami di Citilex Asia berkomitmen untuk melindungi privasi pengunjung situs kami. Informasi yang kami kumpulkan adalah data sukarela yang Anda berikan saat menghubungi kami melalui link kontak, formulir, atau chat WhatsApp. Ini mungkin mencakup nama Anda, nama perusahaan, nomor telepon, alamat email, dan detail kebutuhan desain atau spesifikasi kaos event Anda.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary border-b border-brand-platinum pb-1">
              2. Contact &amp; WhatsApp Inquiry Handling
            </h2>
            <p>
              Ketika Anda memulai percakapan atau mengirim permintaan informasi melalui WhatsApp, data telepon Anda serta rincian pesan hanya digunakan untuk melayani dan merespons pertanyaan Anda mengenai produksi kaos custom. Kami tidak membagikan riwayat obrolan Anda kepada pihak ketiga mana pun tanpa persetujuan tertulis dari Anda.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary border-b border-brand-platinum pb-1">
              3. Data Usage
            </h2>
            <p>
              Informasi yang dikumpulkan digunakan secara eksklusif untuk:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Menyediakan penawaran harga dan konsultasi bahan/desain kaos.</li>
              <li>Memproses transaksi, produksi, dan pengiriman pesanan kaos event Anda.</li>
              <li>Menghubungi Anda kembali mengenai status pengerjaan atau klarifikasi spesifikasi produk.</li>
              <li>Mematuhi kewajiban hukum atau penyelesaian sengketa transaksi jika diperlukan.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary border-b border-brand-platinum pb-1">
              4. Data Protection
            </h2>
            <p>
              Kami menerapkan serangkaian langkah keamanan teknis dan organisasional untuk menjaga keamanan data pribadi Anda. Data Anda disimpan dalam sistem internal yang aman dan hanya dapat diakses oleh personel terbatas yang berkepentingan langsung dengan pemrosesan pesanan Anda. Kami berkomitmen untuk tidak pernah menjual atau menyewakan data pribadi Anda ke pihak lain.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 md:px-12 border-t border-brand-platinum bg-brand-snow flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs tracking-widest uppercase">© 2026 CITILEX ASIA. All Rights Reserved.</div>
        <div className="flex gap-6 text-xs tracking-wider uppercase">
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="hover:underline font-bold">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
