import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet, Plus, FileEdit, Trash2 } from "lucide-react";
import { getCashFlows } from "@/src/actions/finance";
import Link from "next/link";

export default async function CashFlowPage({ searchParams }: { searchParams: { month?: string, year?: string } }) {
  const currentMonth = searchParams.month ? parseInt(searchParams.month) : new Date().getMonth() + 1;
  const currentYear = searchParams.year ? parseInt(searchParams.year) : new Date().getFullYear();
  
  const cashFlows = await getCashFlows(currentMonth, currentYear);
  
  const totalIn = cashFlows.filter(c => c.type === "IN").reduce((sum, c) => sum + c.amount, 0);
  const totalOut = cashFlows.filter(c => c.type === "OUT").reduce((sum, c) => sum + c.amount, 0);
  const net = totalIn - totalOut;

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Wallet className="h-7 w-7 text-brand-gold" />
            Cash Flow
          </h1>
          <p className="text-slate-500 text-sm">
            Catatan arus kas masuk dan keluar secara terpusat. (Otomatis sinkron dengan Invoice Lunas)
          </p>
        </div>
        <Link href="/app/finance/cash-flow/new" className="w-full md:w-auto justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Manual Cash Flow
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 text-brand-primary mb-2">
                <div className="p-2 bg-brand-primary/10 rounded-lg"><ArrowDownRight className="w-5 h-5" /></div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Uang Masuk</h3>
              </div>
              <p className="text-2xl font-black text-slate-800">Rp {totalIn.toLocaleString("id-ID")}</p>
            </div>
            
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <div className="p-2 bg-slate-50 rounded-lg"><ArrowUpRight className="w-5 h-5" /></div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Uang Keluar</h3>
              </div>
              <p className="text-2xl font-black text-slate-800">Rp {totalOut.toLocaleString("id-ID")}</p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-5 w-32 h-32 -mt-4 -mr-4"><DollarSign className="w-full h-full" /></div>
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <div className="p-2 bg-slate-100 rounded-lg"><Wallet className="w-5 h-5" /></div>
                <h3 className="font-bold text-sm uppercase tracking-wider">Net Cash Flow</h3>
              </div>
              <p className={`text-2xl font-black ${net >= 0 ? "text-brand-primary" : "text-slate-600"}`}>
                {net >= 0 ? "+" : ""}Rp {net.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Tipe</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Keterangan</th>
                  <th className="px-6 py-4 text-right">Nominal (Rp)</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cashFlows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Belum ada catatan mutasi kas di bulan ini.
                    </td>
                  </tr>
                ) : (
                  cashFlows.map((cf) => (
                    <tr key={cf.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">{new Date(cf.date).toLocaleDateString("id-ID")}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          cf.type === "IN" ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-100 text-slate-700"
                        }`}>
                          {cf.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{cf.category}</td>
                      <td className="px-6 py-4 text-slate-500">{cf.description}</td>
                      <td className={`px-6 py-4 text-right font-bold ${cf.type === "IN" ? "text-brand-primary" : "text-slate-600"}`}>
                        {cf.type === "IN" ? "+" : "-"} {cf.amount.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {cf.category !== "INVOICE" ? (
                            <>
                              <button className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors" title="Edit">
                                <FileEdit className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Hapus">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Auto-sync</span>
                          )}
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
