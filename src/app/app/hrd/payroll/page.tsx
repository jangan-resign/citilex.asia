import { Banknote, CheckCircle, FileText } from "lucide-react";
import { getPayrolls } from "@/src/actions/hrd";
import Link from "next/link";

export default async function PayrollPage({ searchParams }: { searchParams: { period?: string } }) {
  const currentPeriod = searchParams.period || new Date().toISOString().slice(0, 7); // e.g. "2026-09"
  const payrolls = await getPayrolls(currentPeriod);

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Banknote className="h-7 w-7 text-brand-gold" />
            Payroll
          </h1>
          <p className="text-slate-500 text-sm">
            Rekap gaji bulanan dan perhitungan komponen borongan/dinamis.
          </p>
        </div>
        <Link href="/app/hrd/payroll/new" className="w-full md:w-auto justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          Generate Payroll
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full space-y-6">
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
             <span className="text-sm font-bold text-slate-700">Periode:</span>
             <input type="month" defaultValue={currentPeriod} className="p-2 border border-slate-200 rounded-lg text-sm" readOnly />
             <span className="text-xs text-slate-400 italic">*Filter periode sedang dalam pengembangan UI</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">ID Pegawai</th>
                  <th className="px-6 py-4">Gaji Pokok</th>
                  <th className="px-6 py-4">Tunjangan & Borongan</th>
                  <th className="px-6 py-4">Potongan</th>
                  <th className="px-6 py-4 font-bold text-slate-800">Total Bersih</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payrolls.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      Belum ada data slip gaji untuk periode ini.
                    </td>
                  </tr>
                ) : (
                  payrolls.map((pr) => (
                    <tr key={pr.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{pr.employee.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{pr.employee.employeeId}</div>
                      </td>
                      <td className="px-6 py-4">Rp {pr.baseSalary.toLocaleString("id-ID")}</td>
                      <td className="px-6 py-4 text-brand-primary">
                        + Rp {(pr.allowance + pr.dynamicBonus).toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        - Rp {pr.deduction.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Rp {pr.totalAmount.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          pr.status === "PAID" ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-100 text-slate-700"
                        }`}>
                          {pr.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors inline-flex"><FileText className="w-4 h-4" /></button>
                        {pr.status !== "PAID" && (
                          <button className="p-2 text-brand-primary hover:text-brand-primary transition-colors inline-flex ml-2"><CheckCircle className="w-4 h-4" /></button>
                        )}
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
