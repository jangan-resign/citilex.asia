import Link from "next/link";

export default function TermsOfService() {
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
        <h1 className="text-3xl font-semibold tracking-tighter uppercase mb-2">Terms of Service</h1>
        <p className="text-xs text-brand-onyx/60 tracking-widest uppercase mb-12">Last Updated: June 26, 2026</p>

        <div className="space-y-8 text-brand-onyx text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary border-b border-brand-platinum pb-1">
              1. Service Description
            </h2>
            <p>
              Citilex Asia menyediakan layanan jasa produksi pakaian / kaos custom premium untuk kebutuhan event, gathering, seminar, promosi korporasi, serta berbagai acara berskala kecil hingga besar. Kami menyediakan berbagai pilihan jenis bahan (seperti Polyester, Cotton Combed, dan Cotton Bamboo) dengan berbagai pilihan teknik cetak (sablon manual, DTF, bordir komputer, dll.) sesuai spesifikasi pesanan konsumen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary border-b border-brand-platinum pb-1">
              2. Order Process
            </h2>
            <p>
              Proses pemesanan di Citilex Asia dilakukan melalui langkah-langkah berikut:
            </p>
            <ol className="list-decimal list-inside space-y-1 pl-2">
              <li>Konsumen menghubungi kami melalui saluran WhatsApp untuk menyampaikan konsep desain, jumlah order, dan spesifikasi bahan.</li>
              <li>Citilex Asia memberikan penawaran harga resmi (Quotation).</li>
              <li>Penyetujuan desain &amp; spesifikasi final oleh konsumen.</li>
              <li>Pembayaran uang muka (Down Payment / DP) minimal 50% untuk memulai proses produksi massal.</li>
              <li>Proses produksi massal kaos event sesuai jadwal yang disepakati.</li>
              <li>Pelunasan sisa pembayaran sebelum barang dikirim atau diambil.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary border-b border-brand-platinum pb-1">
              3. Pricing Disclaimer
            </h2>
            <p>
              Semua harga yang ditampilkan di situs atau dalam penawaran awal bersifat estimasi dan dapat berubah sewaktu-waktu tergantung pada fluktuasi harga bahan baku di pasar, tingkat kesulitan desain sablon/bordir, ukuran pakaian di atas standar, serta tenggat waktu pengerjaan yang mendesak (Express Order). Harga final yang mengikat adalah harga yang tercantum dalam lembar Quotation resmi yang telah disetujui bersama.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-brand-primary border-b border-brand-platinum pb-1">
              4. Customer Responsibility
            </h2>
            <p>
              Konsumen sepenuhnya bertanggung jawab atas keaslian, hak cipta, dan kepemilikan desain, logo, atau teks yang diberikan kepada kami untuk dicetak. Citilex Asia dibebaskan dari segala tuntutan hukum atau kerugian material jika terjadi klaim pelanggaran hak cipta oleh pihak ketiga atas desain yang diberikan konsumen. Konsumen juga bertanggung jawab untuk memeriksa dan menyetujui Mockup Desain (proof) secara detail sebelum produksi massal dimulai. Segala kesalahan cetak akibat kelalaian dalam pengecekan mockup bukan tanggung jawab Citilex Asia.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 md:px-12 border-t border-brand-platinum bg-brand-snow flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs tracking-widest uppercase">© 2026 CITILEX ASIA. All Rights Reserved.</div>
        <div className="flex gap-6 text-xs tracking-wider uppercase">
          <Link href="/terms-of-service" className="hover:underline font-bold">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
