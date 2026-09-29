import { Calculator, CheckCircle, FileEdit, Trash2 } from "lucide-react";
import { getTaxRecords } from "@/src/actions/finance";
import Link from "next/link";

export default async function TaxPage({ searchParams }: { searchParams: { year?: string } }) {
  const currentYear = searchParams.year || new Date().getFullYear().toString();
  const taxes = await getTaxRecords(currentYear);
  
  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Calculator className="h-7 w-7 text-brand-gold" />
            Tax Records
          </h1>
          <p className="text-slate-500 text-sm">
            Catatan PPN, PPh 21, dan pajak perusahaan lainnya.
          </p>
        </div>
        <Link href="/app/finance/tax/new" className="w-full md:w-auto justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          + Record Tax
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Periode</th>
                  <th className="px-6 py-4">Jenis Pajak</th>
                  <th className="px-6 py-4">Keterangan</th>
                  <th className="px-6 py-4">Nominal (Rp)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {taxes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Belum ada catatan pajak di tahun ini.
                    </td>
                  </tr>
                ) : (
                  taxes.map((tax) => (
                    <tr key={tax.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{tax.period}</td>
                      <td className="px-6 py-4 font-bold">{tax.type}</td>
                      <td className="px-6 py-4">{tax.description}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">Rp {tax.amount.toLocaleString("id-ID")}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          tax.status === "PAID" ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-100 text-slate-700"
                        }`}>
                          {tax.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {tax.status === "UNPAID" && (
                            <button className="p-1.5 bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary/20 transition-colors" title="Mark as Paid">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors" title="Edit">
                            <FileEdit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Hapus">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
