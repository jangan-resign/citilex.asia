import { Shirt, ShieldCheck, Clock } from "lucide-react";

export default function TrustMarkersSection() {
  return (
    <section className="py-16 bg-brand-snow border-t border-b border-brand-platinum px-6 md:px-12">
      <div className="max-w-[1280px] mx-auto text-center space-y-12">
        <h2 className="text-2xl font-bold tracking-[0.1em] text-brand-primary uppercase">
          Mengapa Memilih Produksi Citilex Asia?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto pt-4">
          <div className="bg-white p-8 border border-brand-platinum space-y-4">
            <div className="w-10 h-10 bg-brand-primary text-brand-white flex items-center justify-center">
              <Shirt className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">Custom Konsep Fleksibel</h3>
            <p className="text-xs text-brand-onyx leading-relaxed">
              Bebas kustomisasi material bahan, paduan warna benang jahitan, ketebalan kain, hingga teknik penempatan cetakan sablon maupun bordir komputer.
            </p>
          </div>
          <div className="bg-white p-8 border border-brand-platinum space-y-4">
            <div className="w-10 h-10 bg-brand-primary text-brand-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">Quality Control Ketat</h3>
            <p className="text-xs text-brand-onyx leading-relaxed">
              Setiap lembar pakaian menjalani proses inspeksi detail sejak pemotongan bahan pola, pencetakan warna sablon, bordir komputer, penjahitan rantai, hingga proses pengemasan akhir.
            </p>
          </div>
          <div className="bg-white p-8 border border-brand-platinum space-y-4">
            <div className="w-10 h-10 bg-brand-primary text-brand-white flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-brand-primary">Ketepatan Waktu Mutlak</h3>
            <p className="text-xs text-brand-onyx leading-relaxed">
              Kami memahami krusialnya timeline acara Anda. Penjadwalan produksi kami transparan dan terukur untuk menjamin kaos & polo tiba tepat waktu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
