import { Calendar, CheckCircle, Clock } from "lucide-react";
import { getAttendances } from "@/src/actions/hrd";
import Link from "next/link";

export default async function AttendancePage({ searchParams }: { searchParams: { date?: string } }) {
  const dateParam = searchParams.date ? new Date(searchParams.date) : new Date();
  const attendances = await getAttendances(dateParam);

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Calendar className="h-7 w-7 text-brand-gold" />
            Attendance & Leave
          </h1>
          <p className="text-slate-500 text-sm">
            Rekap kehadiran harian dan riwayat cuti pegawai untuk keperluan payroll.
          </p>
        </div>
        <Link href="/app/hrd/attendance/new" className="w-full md:w-auto justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> Input Attendance / Leave
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full space-y-6">
          
          {/* Tanggal Filter (Simulasi Statis untuk saat ini) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
             <span className="text-sm font-bold text-slate-700">Tanggal:</span>
             <input type="date" defaultValue={dateParam.toISOString().split('T')[0]} className="p-2 border border-slate-200 rounded-lg text-sm" readOnly />
             <span className="text-xs text-slate-400 italic">*Filter tanggal sedang dalam pengembangan UI</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">ID Pegawai</th>
                  <th className="px-6 py-4">Nama Pegawai</th>
                  <th className="px-6 py-4">Check-In</th>
                  <th className="px-6 py-4">Check-Out</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendances.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Belum ada data absensi untuk tanggal ini.
                    </td>
                  </tr>
                ) : (
                  attendances.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-slate-700">{att.employee.employeeId}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{att.employee.name}</td>
                      <td className="px-6 py-4">
                        {att.checkIn ? new Date(att.checkIn).toLocaleTimeString("id-ID") : "-"}
                      </td>
                      <td className="px-6 py-4">
                        {att.checkOut ? new Date(att.checkOut).toLocaleTimeString("id-ID") : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          att.status === "PRESENT" ? "bg-brand-primary/10 text-brand-primary" :
                          att.status === "LATE" ? "bg-brand-gold/10 text-brand-gold" :
                          att.status === "LEAVE" ? "bg-slate-200 text-slate-800" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {att.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-slate-500">
                        {att.notes || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
