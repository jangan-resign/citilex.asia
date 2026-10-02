"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addApplicant } from "@/src/actions/hrd";
import { Save, UserPlus, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewApplicantPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    resumeUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addApplicant(formData);
      router.push("/app/hrd/recruitment");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan pelamar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-3xl mx-auto">
          <Link href="/app/hrd/recruitment" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Recruitment
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <UserPlus className="h-7 w-7 text-brand-gold" />
            Add New Applicant
          </h1>
          <p className="text-slate-500 text-sm">
            Masukkan data kandidat pelamar yang masuk untuk keperluan rekrutmen.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto h-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Budi Santoso"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Posisi Dilamar</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Tukang Jahit / Graphic Designer"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Telepon (WhatsApp)</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: 08123456789"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Email (Opsional)</label>
                <input 
                  type="email" 
                  placeholder="Contoh: budi@gmail.com"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Link CV / Portfolio (Opsional)</label>
                <input 
                  type="url" 
                  placeholder="Contoh: https://drive.google.com/..."
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all text-slate-700"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({...formData, resumeUrl: e.target.value})}
                />
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <Link href="/app/hrd/recruitment" className="px-4 py-2 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">Cancel</Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</> : <><Save className="w-4 h-4 mr-2" /> Save</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
