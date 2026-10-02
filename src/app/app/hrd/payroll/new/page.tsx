"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generatePayroll, getEmployees } from "@/src/actions/hrd";
import { Banknote, ArrowLeft, Loader2, Calculator } from "lucide-react";
import Link from "next/link";

export default function NewPayrollPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    employeeId: "",
    period: new Date().toISOString().slice(0, 7), // "2026-09"
    baseSalary: 0,
    allowance: 0,
    dynamicBonus: 0,
    deduction: 0,
  });

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  const handleEmployeeChange = (empId: string) => {
    const emp = employees.find(e => e.id === empId);
    if (emp) {
      setFormData({
        ...formData,
        employeeId: empId,
        baseSalary: emp.baseSalary || 0,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await generatePayroll({
        ...formData,
      });
      router.push("/app/hrd/payroll");
    } catch (error) {
      console.error(error);
      alert("Gagal memproses slip gaji.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = formData.baseSalary + formData.allowance + formData.dynamicBonus - formData.deduction;

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-3xl mx-auto">
          <button 
            type="button"
            onClick={() => { setIsCanceling(true); router.push('/app/hrd/payroll'); }}
            disabled={isCanceling}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isCanceling ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowLeft className="w-4 h-4" />} Back to Payroll
          </button>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Calculator className="h-7 w-7 text-brand-gold" />
            Generate Payroll
          </h1>
          <p className="text-slate-500 text-sm">
            Generate slip gaji untuk pegawai dengan kalkulasi komponen borongan, tunjangan, dan potongan.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto h-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Periode Penggajian</label>
                <input 
                  type="month" 
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value})}
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Pegawai</label>
                <select 
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-white"
                  value={formData.employeeId}
                  onChange={(e) => handleEmployeeChange(e.target.value)}
                >
                  <option value="" disabled>-- Pilih Pegawai --</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.employeeId} - {emp.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Komponen Gaji</h3>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Gaji Pokok (Otomatis dari Data Pegawai)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">Rp</span>
                  <input 
                    type="number" 
                    required
                    readOnly
                    className="w-full p-3 pl-10 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 font-mono"
                    value={formData.baseSalary}
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Tunjangan Tetap</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">Rp</span>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full p-3 pl-10 border border-brand-primary/30 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-mono"
                    value={formData.allowance || ""}
                    onChange={(e) => setFormData({...formData, allowance: Number(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Komponen Borongan Dinamis</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">Rp</span>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full p-3 pl-10 border border-brand-primary/30 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-mono"
                    value={formData.dynamicBonus || ""}
                    onChange={(e) => setFormData({...formData, dynamicBonus: Number(e.target.value) || 0})}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Uang lembur, insentif jahit, dsb.</p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Potongan (Absen/Kasbon)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400">Rp</span>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full p-3 pl-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all font-mono text-slate-600"
                    value={formData.deduction || ""}
                    onChange={(e) => setFormData({...formData, deduction: Number(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="col-span-2 p-6 bg-slate-800 rounded-xl mt-4 flex justify-between items-center text-white">
                <div>
                  <h4 className="font-bold text-slate-300 uppercase tracking-wider text-xs mb-1">Total Take-Home Pay</h4>
                  <p className="text-sm text-slate-400">Gaji Pokok + Tunjangan + Borongan - Potongan</p>
                </div>
                <div className="text-3xl font-black font-mono">
                  Rp {totalAmount.toLocaleString("id-ID")}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => { setIsCanceling(true); router.push('/app/hrd/payroll'); }} 
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
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</> : "Generate Slip Gaji"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
