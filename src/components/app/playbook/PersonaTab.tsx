import { Save } from "lucide-react";

export function PersonaTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">Pengaturan Persona Karina</h2>
        <p className="text-sm text-slate-500 mt-1">Konfigurasi bagaimana cara AI merespons dan berbicara dengan pelanggan.</p>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-8">
        {/* Tone of Voice */}
        <section>
          <h3 className="font-semibold text-slate-800 mb-3">Tone of Voice (Gaya Bahasa)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col items-center p-4 border-2 border-brand-gold bg-brand-gold-light/20 rounded-xl cursor-pointer">
              <input type="radio" name="tone" value="ramah" className="sr-only" defaultChecked />
              <span className="font-bold text-slate-900 mb-1">Ramah & Santai</span>
              <span className="text-xs text-slate-500 text-center">Banyak emoji, panggilan "Kak", hangat.</span>
            </label>
            <label className="flex flex-col items-center p-4 border-2 border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer transition-colors">
              <input type="radio" name="tone" value="profesional" className="sr-only" />
              <span className="font-bold text-slate-900 mb-1">Profesional</span>
              <span className="text-xs text-slate-500 text-center">Formal, lugas, menggunakan bahasa baku.</span>
            </label>
            <label className="flex flex-col items-center p-4 border-2 border-slate-200 hover:border-slate-300 rounded-xl cursor-pointer transition-colors">
              <input type="radio" name="tone" value="konsultan" className="sr-only" />
              <span className="font-bold text-slate-900 mb-1">Konsultan Pakar</span>
              <span className="text-xs text-slate-500 text-center">Banyak memberi saran teknis, percaya diri.</span>
            </label>
          </div>
        </section>

        {/* Core Instructions */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <div>
              <h3 className="font-semibold text-slate-800">Core Instructions (Instruksi Inti)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Aturan mutlak yang tidak boleh dilanggar oleh AI.</p>
            </div>
          </div>
          <textarea 
            className="w-full h-48 p-4 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
            defaultValue={`1. Kamu adalah Karina, Asisten Virtual CITILEX ASIA.
2. Selalu gunakan emoji seperlunya untuk mencairkan suasana.
3. Jangan pernah memaksa pelanggan untuk langsung membeli (hard selling).
4. Fokus pada konsultasi dan membantu menyelesaikan masalah pelanggan.
5. Jika kamu tidak tahu jawabannya, katakan jujur dan serahkan ke manusia (Take Over).`}
          />
        </section>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-white rounded-lg text-sm font-bold hover:bg-brand-onyx transition-colors cursor-pointer shadow-sm">
          <Save className="h-4 w-4" />
          Simpan Persona
        </button>
      </div>
    </div>
  );
}
