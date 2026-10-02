"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addEmployee } from "@/src/actions/hrd";
import { Save, UserPlus, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewEmployeePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    position: "",
    department: "",
    joinedAt: new Date().toISOString().split("T")[0],
    baseSalary: "",
    status: "PKWTT",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addEmployee({
        employeeId: formData.employeeId,
        name: formData.name,
        position: formData.position,
        department: formData.department,
        joinedAt: new Date(formData.joinedAt),
        baseSalary: Number(formData.baseSalary) || 0,
        status: formData.status,
      });
      router.push("/app/hrd/employees");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan pegawai. Pastikan ID Pegawai unik (belum dipakai).");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-3xl mx-auto">
          <Link href="/app/hrd/employees" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Employee Directory
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <UserPlus className="h-7 w-7 text-brand-gold" />
            Add New Employee
          </h1>
          <p className="text-slate-500 text-sm">
            Masukkan detail informasi pegawai untuk dimasukkan ke dalam database HRD.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto h-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">ID Pegawai (6 Digit)</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: 000001"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Thofhan Zaka Anshori"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Posisi / Jabatan</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Marketing & Sales Manager"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Departemen</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Sales & Marketing"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Masuk</label>
                <input 
                  type="date" 
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.joinedAt}
                  onChange={(e) => setFormData({...formData, joinedAt: e.target.value})}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Status Pegawai</label>
                <select 
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-white"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Magang">Magang</option>
                  <option value="THL">THL (Tenaga Harian Lepas)</option>
                  <option value="PKWT">PKWT (Kontrak)</option>
                  <option value="PKWTT">PKWTT (Tetap)</option>
                  <option value="Outsourced">Outsourced</option>
                </select>
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Gaji Pokok (Rp)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  step="1000"
                  placeholder="Contoh: 15000000"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all font-mono"
                  value={formData.baseSalary}
                  onChange={(e) => setFormData({...formData, baseSalary: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <Link href="/app/hrd/employees" className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</> : <><Save className="w-4 h-4 mr-2" /><><Save className="w-4 h-4 mr-2" /> Save</></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
