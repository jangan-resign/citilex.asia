"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCashFlow } from "@/src/actions/finance";
import { Wallet, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewCashFlowPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "IN",
    amount: "",
    category: "OPERATIONAL",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addCashFlow({
        date: new Date(formData.date),
        type: formData.type,
        amount: Number(formData.amount) || 0,
        category: formData.category,
        description: formData.description,
      });
      router.push("/app/finance/cash-flow");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan mutasi kas.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-3xl mx-auto">
          <Link href="/app/finance/cash-flow" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Cash Flow
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Wallet className="h-7 w-7 text-brand-gold" />
            Add Manual Cash Flow
          </h1>
          <p className="text-slate-500 text-sm">
            Catat arus uang masuk atau keluar di luar invoice dan sistem otomatis.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto h-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Mutasi</label>
                <input 
                  type="date" 
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Tipe Transaksi</label>
                <select 
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-white font-bold"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="IN" className="text-brand-primary">Uang Masuk (IN)</option>
                  <option value="OUT" className="text-slate-600">Uang Keluar (OUT)</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Nominal (Rp)</label>
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

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                <select 
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-white"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="OPERATIONAL">Operasional</option>
                  <option value="SALES">Penjualan (Sales)</option>
                  <option value="CAPITAL">Modal (Capital)</option>
                  <option value="TAX">Pajak (Tax)</option>
                  <option value="OTHER">Lainnya</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Keterangan / Deskripsi</label>
                <textarea 
                  required
                  placeholder="Contoh: Pembelian token listrik pabrik"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <Link href="/app/finance/cash-flow" className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
