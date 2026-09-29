import { Receipt, CheckCircle, XCircle, FileEdit, Trash2 } from "lucide-react";
import { getExpenses } from "@/src/actions/finance";
import Link from "next/link";

export default async function ExpensesPage({ searchParams }: { searchParams: { month?: string, year?: string } }) {
  const currentMonth = searchParams.month ? parseInt(searchParams.month) : new Date().getMonth() + 1;
  const currentYear = searchParams.year ? parseInt(searchParams.year) : new Date().getFullYear();
  
  const expenses = await getExpenses(currentMonth, currentYear);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Receipt className="h-7 w-7 text-brand-gold" />
            Expenses
          </h1>
          <p className="text-slate-500 text-sm">
            Catatan pengeluaran harian, bahan baku, listrik, dan operasional pabrik. Total: Rp {totalExpense.toLocaleString("id-ID")}
          </p>
        </div>
        <Link href="/app/finance/expenses/new" className="w-full md:w-auto justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          + Record Expense
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Keterangan</th>
                  <th className="px-6 py-4">Nominal (Rp)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Belum ada catatan pengeluaran di periode ini.
                    </td>
                  </tr>
                ) : (
                  expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">{new Date(exp.date).toLocaleDateString("id-ID")}</td>
                      <td className="px-6 py-4 font-bold text-slate-700">{exp.category}</td>
                      <td className="px-6 py-4">{exp.description}</td>
                      <td className="px-6 py-4 font-bold text-slate-600">Rp {exp.amount.toLocaleString("id-ID")}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          exp.status === "PAID" ? "bg-brand-primary/10 text-brand-primary" : 
                          exp.status === "PENDING" ? "bg-brand-gold/10 text-brand-gold" : "bg-slate-100 text-slate-700"
                        }`}>
                          {exp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {exp.status === "PENDING" && (
                          <>
                            <button className="p-2 text-brand-primary hover:text-brand-primary transition-colors inline-flex"><CheckCircle className="w-4 h-4" /></button>
                            <button className="p-2 text-slate-500 hover:text-slate-700 transition-colors inline-flex"><XCircle className="w-4 h-4" /></button>
                          </>
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
