"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { recordAttendance, getEmployees } from "@/src/actions/hrd";
import { Save, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewAttendancePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    employeeId: "",
    date: new Date().toISOString().split("T")[0],
    checkInTime: "08:00",
    checkOutTime: "17:00",
    status: "PRESENT",
    notes: "",
  });

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const dateObj = new Date(formData.date);
      let checkIn: Date | undefined;
      let checkOut: Date | undefined;

      if (formData.status === "PRESENT" || formData.status === "LATE") {
        const [inH, inM] = formData.checkInTime.split(":");
        checkIn = new Date(dateObj);
        checkIn.setHours(parseInt(inH), parseInt(inM));
        
        const [outH, outM] = formData.checkOutTime.split(":");
        checkOut = new Date(dateObj);
        checkOut.setHours(parseInt(outH), parseInt(outM));
      }

      await recordAttendance({
        employeeId: formData.employeeId,
        date: dateObj,
        checkIn,
        checkOut,
        status: formData.status,
        notes: formData.notes,
      });
      router.push("/app/hrd/attendance");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data absensi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-3xl mx-auto">
          <Link href="/app/hrd/attendance" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Attendance & Leave
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Calendar className="h-7 w-7 text-brand-gold" />
            Input Attendance / Leave
          </h1>
          <p className="text-slate-500 text-sm">
            Form ini digunakan oleh HRD untuk mencatat kehadiran atau jadwal cuti/izin pegawai.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto h-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Pegawai</label>
                <select 
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-white"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                >
                  <option value="" disabled>-- Pilih Pegawai --</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.employeeId} - {emp.name}</option>
                  ))}
                </select>
              </div>

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
                <label className="block text-sm font-bold text-slate-700 mb-2">Status Kehadiran</label>
                <select 
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all bg-white"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="PRESENT">Hadir</option>
                  <option value="LATE">Terlambat</option>
                  <option value="SICK">Sakit</option>
                  <option value="LEAVE">Izin / Cuti</option>
                  <option value="ABSENT">Alpa (Tanpa Keterangan)</option>
                </select>
              </div>

              {(formData.status === "PRESENT" || formData.status === "LATE") && (
                <>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Jam Masuk</label>
                    <input 
                      type="time" 
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                      value={formData.checkInTime}
                      onChange={(e) => setFormData({...formData, checkInTime: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Jam Keluar</label>
                    <input 
                      type="time" 
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                      value={formData.checkOutTime}
                      onChange={(e) => setFormData({...formData, checkOutTime: e.target.value})}
                    />
                  </div>
                </>
              )}

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Keterangan (Opsional)</label>
                <textarea 
                  placeholder="Contoh: Surat sakit terlampir, cuti tahunan, dll"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <Link href="/app/hrd/attendance" className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</Link>
              <button 
                type="submit" 
                disabled={isSubmitting || !formData.employeeId}
                className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
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
