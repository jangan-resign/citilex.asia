import { Megaphone, Webhook, Link as LinkIcon } from "lucide-react";
import { getAdsLeads } from "@/src/actions/marketing";

export default async function MetaAdsPage() {
  const leads = await getAdsLeads("META");

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="max-w-6xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Megaphone className="h-7 w-7 text-brand-gold" />
            Meta Ads (FB/IG) Integration
          </h1>
          <p className="text-slate-500 text-sm">
            Riwayat data tangkapan (leads) dari webhook Meta/Facebook Lead Ads.
          </p>
        </div>
        
        <div className="flex flex-col gap-1 items-start md:items-end w-full md:w-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm bg-slate-100 px-4 py-2 rounded-lg text-slate-600 font-mono w-full md:w-fit">
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="shrink-0">Webhook URL:</span>
            </div>
            <span className="font-bold text-slate-800 break-all">https://citilex.asia/api/webhooks/meta-ads</span>
          </div>
          <div className="text-xs text-slate-400 ml-2 md:mr-2 md:ml-0 mt-1">
            Verify Token: <span className="font-mono font-bold">citilex-meta-token</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full space-y-6">
          {/* Visualisasi Perbandingan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-slate-500 text-sm font-bold mb-1">Leads dari Meta Ads</h3>
              <div className="text-4xl font-bold text-brand-primary">{leads.length}</div>
              <p className="text-xs text-slate-400 mt-2">Total leads yang ditangkap otomatis via Webhook FB/IG.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-slate-500 text-sm font-bold mb-1">Status Integrasi</h3>
              {leads.length > 0 ? (
                <>
                  <div className="text-2xl font-bold text-emerald-600 flex items-center gap-2 mt-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    LIVE & CONNECTED
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Sistem berhasil tersambung dan menerima push data.</p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-slate-400 flex items-center gap-2 mt-2">
                    <span className="relative flex h-3 w-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-300"></span>
                    </span>
                    WAITING FOR CONNECTION
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Belum ada data masuk. Pasang Webhook URL di Meta Business Manager.</p>
                </>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-slate-400" /> Sync History
              </h2>
              <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-md">
                Active
              </span>
            </div>
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Tanggal Masuk</th>
                  <th className="px-6 py-4">Nama Pelanggan</th>
                  <th className="px-6 py-4">Nomor HP</th>
                  <th className="px-6 py-4">Campaign Asal</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      Belum ada data dari Facebook/Instagram webhook.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-800">{new Date(lead.createdAt).toLocaleString("id-ID")}</td>
                      <td className="px-6 py-4 font-bold text-brand-primary">{lead.customerName}</td>
                      <td className="px-6 py-4">{lead.customerPhone}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-mono">{lead.campaignName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-emerald-600">RECEIVED</span>
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
  );
}
