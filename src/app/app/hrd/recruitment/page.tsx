import { Users, UserPlus, CheckCircle, XCircle } from "lucide-react";
import { getApplicants } from "@/src/actions/hrd";
import Link from "next/link";

export default async function RecruitmentPage() {
  const applicants = await getApplicants();
  
  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Users className="h-7 w-7 text-brand-gold" />
            Recruitment
          </h1>
          <p className="text-slate-500 text-sm">
            Daftar pelamar kerja yang masuk ke perusahaan.
          </p>
        </div>
        <Link href="/app/hrd/recruitment/new" className="w-full md:w-auto justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Add New Applicant
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Tanggal Masuk</th>
                  <th className="px-6 py-4">Nama Pelamar</th>
                  <th className="px-6 py-4">Posisi Dilamar</th>
                  <th className="px-6 py-4">Kontak</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applicants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                      Belum ada data pelamar.
                    </td>
                  </tr>
                ) : (
                  applicants.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">{new Date(app.createdAt).toLocaleDateString("id-ID")}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{app.name}</td>
                      <td className="px-6 py-4 font-medium">{app.position}</td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700">{app.phone}</div>
                        <div className="text-xs text-slate-400">{app.email || "-"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          app.status === "HIRED" ? "bg-brand-primary/10 text-brand-primary" : 
                          app.status === "REJECTED" ? "bg-slate-100 text-slate-700" :
                          app.status === "INTERVIEW" ? "bg-brand-gold/10 text-brand-gold" :
                          "bg-slate-200 text-slate-800"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-brand-primary hover:text-brand-primary transition-colors inline-flex"><CheckCircle className="w-4 h-4" /></button>
                        <button className="p-2 text-slate-500 hover:text-slate-700 transition-colors inline-flex"><XCircle className="w-4 h-4" /></button>
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
