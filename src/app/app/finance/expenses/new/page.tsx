"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { recordExpense } from "@/src/actions/finance";
import { Receipt, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewExpensePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "OPERASIONAL PABRIK",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await recordExpense({
        date: new Date(formData.date),
        amount: Number(formData.amount) || 0,
        category: formData.category,
        description: formData.description,
      });
      router.push("/app/finance/expenses");
    } catch (error) {
      console.error(error);
      alert("Gagal mencatat pengeluaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-3xl mx-auto">
          <Link href="/app/finance/expenses" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Expenses
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Receipt className="h-7 w-7 text-brand-gold" />
            Record Expense
          </h1>
          <p className="text-slate-500 text-sm">
            Input biaya operasional, tagihan listrik, bahan baku, dsb. Pengeluaran yang sudah dibayar (PAID) otomatis mengurangi saldo di Buku Kas.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto h-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label>
                <input 
                  type="date" 
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Kategori Pengeluaran</label>
                <select 
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-white"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="OPERASIONAL PABRIK">Operasional Pabrik</option>
                  <option value="BAHAN BAKU">Pembelian Bahan Baku</option>
                  <option value="LISTRIK & AIR">Tagihan Listrik & Air</option>
                  <option value="MAINTENANCE">Maintenance Mesin</option>
                  <option value="LAINNYA">Lain-lain</option>
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
                    placeholder="Contoh: 500000"
                    className="w-full p-3 pl-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all font-mono text-lg font-bold text-slate-600"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Keterangan / Deskripsi</label>
                <textarea 
                  required
                  placeholder="Contoh: Beli jarum jahit dan benang"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <Link href="/app/finance/expenses" className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</> : "Catat Pengeluaran (Pending)"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
