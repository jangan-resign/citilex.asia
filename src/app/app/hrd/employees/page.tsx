import { Briefcase, UserPlus, FileEdit, Trash2 } from "lucide-react";
import { getEmployees } from "@/src/actions/hrd";
import Link from "next/link";

export default async function EmployeeDirectoryPage() {
  const employees = await getEmployees();

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Briefcase className="h-7 w-7 text-brand-gold" />
            Employee Directory
          </h1>
          <p className="text-slate-500 text-sm">
            Database data pegawai, divisi, jabatan, dan status kerja.
          </p>
        </div>
        <Link href="/app/hrd/employees/new" className="w-full md:w-auto justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Add New Employee
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">ID Pegawai</th>
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Posisi & Dept</th>
                  <th className="px-6 py-4">Tgl Masuk</th>
                  <th className="px-6 py-4">Gaji Pokok</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      Belum ada data pegawai. Silakan tambah data baru.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-slate-700">{emp.employeeId}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{emp.name}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-700">{emp.position}</div>
                        <div className="text-xs text-slate-400">{emp.department}</div>
                      </td>
                      <td className="px-6 py-4">{new Date(emp.joinedAt).toLocaleDateString("id-ID")}</td>
                      <td className="px-6 py-4 font-medium">Rp {emp.baseSalary.toLocaleString("id-ID")}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-brand-gold/10 text-brand-gold-dark rounded-md text-xs font-bold">
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors inline-flex"><FileEdit className="w-4 h-4" /></button>
                        <button className="p-2 text-slate-400 hover:text-slate-500 transition-colors inline-flex"><Trash2 className="w-4 h-4" /></button>
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
