import { UserMinus, Plus } from "lucide-react";
import { getTerminations } from "@/src/actions/hrd";
import Link from "next/link";

export default async function TerminationPage() {
  const terminations = await getTerminations();

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <UserMinus className="h-7 w-7 text-brand-gold" />
            Termination (PHK / Resign)
          </h1>
          <p className="text-slate-500 text-sm">
            Data pegawai yang telah keluar, baik karena resign, habis kontrak, atau pemutusan hubungan kerja.
          </p>
        </div>
        <Link href="/app/hrd/termination/new" className="w-full md:w-auto justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Proses Termination
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Tanggal Keluar</th>
                  <th className="px-6 py-4">Nama Pegawai</th>
                  <th className="px-6 py-4">Jenis</th>
                  <th className="px-6 py-4">Pesangon</th>
                  <th className="px-6 py-4">Alasan</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {terminations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Belum ada data termination.
                    </td>
                  </tr>
                ) : (
                  terminations.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{new Date(t.date).toLocaleDateString("id-ID")}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-brand-primary">{t.employee.name}</div>
                        <div className="text-xs text-slate-400">{t.employee.employeeId} - {t.employee.position}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          t.type === "RESIGN" ? "bg-slate-200 text-slate-700" :
                          t.type === "FIRED" ? "bg-slate-100 text-slate-800" :
                          "bg-brand-gold/10 text-brand-gold"
                        }`}>
                          {t.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">Rp {t.severancePay.toLocaleString("id-ID")}</td>
                      <td className="px-6 py-4 max-w-xs truncate" title={t.reason || "-"}>{t.reason || "-"}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-md text-xs font-bold">
                          {t.status}
                        </span>
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
