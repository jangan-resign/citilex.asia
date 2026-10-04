"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEmployees, recordTermination } from "@/src/actions/hrd";
import { UserMinus, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { CustomSelect } from "@/src/components/ui/CustomSelect";

export default function NewTerminationPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: new Date().toISOString().split("T")[0],
    type: "RESIGN",
    reason: "",
    severancePay: "",
  });

  useEffect(() => {
    // Load active employees only
    getEmployees().then((data) => {
      setEmployees(data.filter(e => e.status !== "TERMINATED" && e.status !== "INACTIVE"));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await recordTermination({
        employeeId: formData.employeeId,
        date: new Date(formData.date),
        type: formData.type,
        reason: formData.reason,
        severancePay: Number(formData.severancePay) || 0,
      });
      router.push("/app/hrd/termination");
    } catch (error) {
      console.error(error);
      alert("Gagal memProses Termination.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-3xl mx-auto">
          <button 
            type="button"
            onClick={() => { setIsCanceling(true); router.push('/app/hrd/termination'); }}
            disabled={isCanceling}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isCanceling ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowLeft className="w-4 h-4" />} Kembali ke Data Termination
          </button>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <UserMinus className="h-7 w-7 text-brand-gold" />
            Proses Termination Pegawai
          </h1>
          <p className="text-slate-500 text-sm">
            Pegawai yang diproses termination-nya akan otomatis berubah statusnya menjadi INACTIVE / TERMINATED.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto h-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Pegawai</label>
                <CustomSelect 
                  value={formData.employeeId}
                  onChange={(val) => setFormData({...formData, employeeId: val})}
                  options={[
                    { value: "", label: "-- Pilih Pegawai Aktif --" },
                    ...employees.map(emp => ({ value: emp.id, label: `${emp.employeeId} - ${emp.name} (${emp.position})` }))
                  ]}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Efektif Keluar</label>
                <input 
                  type="date" 
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Termination Type</label>
                <CustomSelect 
                  value={formData.type}
                  onChange={(val) => setFormData({...formData, type: val})}
                  options={[
                    { value: "RESIGN", label: "Pengunduran Diri (Resign)" },
                    { value: "CONTRACT_END", label: "Habis Kontrak (PKWT)" },
                    { value: "FIRED", label: "Pemutusan Hubungan Kerja (PHK)" },
                    { value: "RETIRED", label: "Pensiun (Retired)" }
                  ]}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Uang Pesangon / Sisa Gaji (Rp)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">Rp</span>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="Contoh: 5000000 (Kosongkan jika tidak ada)"
                    className="w-full p-3 pl-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all font-mono text-lg font-bold"
                    value={formData.severancePay}
                    onChange={(e) => setFormData({...formData, severancePay: e.target.value})}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">*Hanya diisi jika ada kewajiban pembayaran dari perusahaan.</p>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Alasan Detail / Catatan HRD</label>
                <textarea 
                  placeholder="Contoh: Melanjutkan pendidikan S2 / Indisipliner berulang kali..."
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  rows={3}
                />
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => { setIsCanceling(true); router.push('/app/hrd/termination'); }} 
                disabled={isSubmitting || isCanceling} 
                className="px-4 py-2 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCanceling ? <><Loader2 className="w-4 h-4 animate-spin" /> Membatalkan...</> : "Cancel"}
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting || !formData.employeeId}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</> : "Proses Termination"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
