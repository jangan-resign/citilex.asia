import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { getPersona, savePersona } from "../../../actions/playbook";

export function PersonaTab() {
  const [formData, setFormData] = useState({ tone: "ramah", coreInstructions: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPersona();
  }, []);

  const fetchPersona = async () => {
    try {
      const data = await getPersona();
      setFormData({ tone: data.tone, coreInstructions: data.coreInstructions });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await savePersona(formData);
      alert("Persona berhasil disimpan!");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan Persona");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex items-center justify-center">
        <div className="text-center text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-brand-gold mb-2" />
          <p>Memuat Persona...</p>
        </div>
      </div>
    );
  }

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
            <label className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${formData.tone === "ramah" ? "border-brand-gold bg-brand-gold-light/20" : "border-slate-200 hover:border-slate-300"}`}>
              <input type="radio" name="tone" value="ramah" className="sr-only" checked={formData.tone === "ramah"} onChange={(e) => setFormData({...formData, tone: e.target.value})} />
              <span className="font-bold text-slate-900 mb-1">Ramah & Santai</span>
              <span className="text-xs text-slate-500 text-center">Emoji seperlunya, panggilan "Kak", hangat.</span>
            </label>
            <label className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${formData.tone === "profesional" ? "border-brand-gold bg-brand-gold-light/20" : "border-slate-200 hover:border-slate-300"}`}>
              <input type="radio" name="tone" value="profesional" className="sr-only" checked={formData.tone === "profesional"} onChange={(e) => setFormData({...formData, tone: e.target.value})} />
              <span className="font-bold text-slate-900 mb-1">Profesional</span>
              <span className="text-xs text-slate-500 text-center">Formal, lugas, menggunakan bahasa baku.</span>
            </label>
            <label className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${formData.tone === "konsultan" ? "border-brand-gold bg-brand-gold-light/20" : "border-slate-200 hover:border-slate-300"}`}>
              <input type="radio" name="tone" value="konsultan" className="sr-only" checked={formData.tone === "konsultan"} onChange={(e) => setFormData({...formData, tone: e.target.value})} />
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
            value={formData.coreInstructions}
            onChange={(e) => setFormData({...formData, coreInstructions: e.target.value})}
            className="w-full h-48 p-4 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
          />
        </section>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
        <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-colors cursor-pointer shadow-sm disabled:opacity-50">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </button>
      </div>
    </div>
  );
}
