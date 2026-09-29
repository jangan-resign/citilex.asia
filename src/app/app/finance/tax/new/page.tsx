"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { recordTax } from "@/src/actions/finance";
import { Calculator, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewTaxPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    period: new Date().toISOString().slice(0, 7), // "2026-09"
    type: "PPN",
    amount: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await recordTax({
        period: formData.period,
        type: formData.type,
        amount: Number(formData.amount) || 0,
        description: formData.description,
      });
      router.push("/app/finance/tax");
    } catch (error) {
      console.error(error);
      alert("Gagal mencatat pajak.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-3xl mx-auto">
          <Link href="/app/finance/tax" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Tax Records
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Calculator className="h-7 w-7 text-brand-gold" />
            Record Tax
          </h1>
          <p className="text-slate-500 text-sm">
            Input kewajiban pajak bulanan/tahunan. Jika status pajak di-set "Lunas (PAID)", akan otomatis mengurangi saldo di Buku Kas.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto h-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Periode Pajak</label>
                <input 
                  type="month" 
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Jenis Pajak</label>
                <select 
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-white"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="PPN">PPN (Pajak Pertambahan Nilai)</option>
                  <option value="PPh 21">PPh 21 (Pajak Karyawan)</option>
                  <option value="PPh Badan">PPh Badan</option>
                  <option value="Pajak Daerah">Pajak Daerah / Reklame</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Nominal Pajak (Rp)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">Rp</span>
                  <input 
                    type="number" 
                    required
                    min="1"
                    placeholder="Contoh: 1500000"
                    className="w-full p-3 pl-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all font-mono text-lg font-bold"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Keterangan / NTPN</label>
                <textarea 
                  required
                  placeholder="Contoh: PPN Masa Agustus 2026 atau No NTPN..."
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={2}
                />
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <Link href="/app/finance/tax" className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                Batal
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</> : "Catat Pajak (Unpaid)"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
