"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Filter, ChevronDown, ChevronUp, Package, Tag, Building2, Phone, Save } from "lucide-react";
import { updateLeadNotes } from "../../../actions/sales-reports";

type Metrics = {
  rawLeadsCount: number;
  qualifiedLeadsCount: number;
  closingProjectsCount: number;
  closingRate: number;
};

type LeadData = {
  id: string;
  name: string;
  phone: string;
  company: string | null;
  status: string;
  notes: string;
  createdAt: string;
  isClosed: boolean;
};

type ClosingDetail = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerCompany: string | null;
  projectName: string;
  value: number;
  items: any;
  createdAt: string;
};

type DashboardData = {
  metrics: Metrics;
  allLeads: LeadData[];
  qualifiedLeads: LeadData[];
  closingDetails: ClosingDetail[];
};

export function SalesReportsClient({
  dashboardData,
  currentMonth,
  currentYear
}: {
  dashboardData: DashboardData;
  currentMonth: number | "all";
  currentYear: number | "all";
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"raw" | "qualified" | "closed" | "conversion">("conversion");
  const [notesState, setNotesState] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<Record<string, boolean>>({});

  const handleSaveNotes = async (id: string, notes: string) => {
    setSavingNotes(prev => ({ ...prev, [id]: true }));
    try {
      await updateLeadNotes(id, notes);
    } catch (e) {
      alert("Gagal menyimpan catatan.");
    } finally {
      setSavingNotes(prev => ({ ...prev, [id]: false }));
    }
  };



  const renderLeadsTable = (leads: LeadData[]) => (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-100 text-slate-500 text-xs uppercase tracking-wider">
            <th className="px-6 py-4 font-bold border-b border-slate-200">Nama Klien</th>
            <th className="px-6 py-4 font-bold border-b border-slate-200">Kontak</th>
            <th className="px-6 py-4 font-bold border-b border-slate-200">Tanggal Masuk</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-50 border-b border-slate-100">
              <td className="px-6 py-4 font-bold text-slate-800">{lead.name}</td>
              <td className="px-6 py-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5 mb-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> {lead.phone}</div>
                {lead.company && <div className="flex items-center gap-1.5 text-xs text-slate-500"><Building2 className="w-3.5 h-3.5 text-slate-400" /> {lead.company}</div>}
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {new Date(lead.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderConversionTable = (leads: LeadData[]) => (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-100 text-slate-500 text-xs uppercase tracking-wider">
            <th className="px-6 py-4 font-bold border-b border-slate-200 w-1/4">Nama & Kontak</th>
            <th className="px-6 py-4 font-bold border-b border-slate-200 w-1/6">Status Akhir</th>
            <th className="px-6 py-4 font-bold border-b border-slate-200 w-1/2">Internal Notes</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-50 border-b border-slate-100">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-800">{lead.name}</div>
                <div className="text-xs text-slate-500 mt-1">{lead.phone}</div>
                <div className="text-[10px] text-slate-400 mt-1">{new Date(lead.createdAt).toLocaleDateString('id-ID')}</div>
              </td>
              <td className="px-6 py-4">
                {lead.isClosed ? (
                  <span className="px-2.5 py-1 bg-brand-gold/20 text-brand-gold font-bold text-xs rounded-full">Closed (Project)</span>
                ) : lead.status === "qualified" ? (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-600 font-bold text-xs rounded-full">Qualified</span>
                ) : (
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-full">Not Closed (Raw)</span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="relative">
                  <textarea
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none min-h-[60px]"
                    placeholder="Contoh: Kemahalan, Kabur, Deal karena diskon..."
                    defaultValue={lead.notes}
                    onChange={(e) => setNotesState(prev => ({ ...prev, [lead.id]: e.target.value }))}
                    onBlur={(e) => {
                      if (notesState[lead.id] !== undefined && notesState[lead.id] !== lead.notes) {
                        handleSaveNotes(lead.id, notesState[lead.id]);
                      }
                    }}
                  />
                  {savingNotes[lead.id] && (
                    <div className="absolute right-2 top-2 text-[10px] text-white flex items-center gap-1.5 font-bold animate-pulse bg-brand-primary/90 px-2 py-1 rounded shadow-sm backdrop-blur-sm pointer-events-none">
                      <Save className="w-3 h-3" /> Saving...
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col space-y-6">
      {/* Interactive Metrics Cards (Tabs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveTab("raw")}
          className={`text-left p-6 rounded-xl shadow-sm border transition-all duration-200 ${activeTab === "raw" ? "bg-white border-brand-primary ring-2 ring-brand-primary/20" : "bg-white border-slate-200 hover:border-slate-300"
            }`}
        >
          <div className="text-sm font-bold text-slate-500 mb-2">Total Raw Leads</div>
          <div className="text-3xl font-black text-slate-800">{dashboardData.metrics.rawLeadsCount}</div>
          <div className="text-[10px] font-semibold text-slate-400 mt-1 uppercase">Semua Leads Masuk (All)</div>
        </button>

        <button
          onClick={() => setActiveTab("qualified")}
          className={`text-left p-6 rounded-xl shadow-sm border transition-all duration-200 ${activeTab === "qualified" ? "bg-white border-brand-primary ring-2 ring-brand-primary/20" : "bg-white border-slate-200 hover:border-slate-300"
            }`}
        >
          <div className="text-sm font-bold text-slate-500 mb-2">Qualified Leads</div>
          <div className="text-3xl font-black text-slate-800">{dashboardData.metrics.qualifiedLeadsCount}</div>
          <div className="text-[10px] font-semibold text-slate-400 mt-1 uppercase">Sudah Dihitung Calculator</div>
        </button>

        <button
          onClick={() => setActiveTab("closed")}
          className={`text-left p-6 rounded-xl shadow-sm border transition-all duration-200 ${activeTab === "closed" ? "bg-brand-gold/10 border-brand-gold ring-2 ring-brand-gold/20" : "bg-white border-slate-200 hover:border-slate-300"
            }`}
        >
          <div className="text-sm font-bold text-brand-gold mb-2">Closing Leads (Projects)</div>
          <div className="text-3xl font-black text-slate-800">{dashboardData.metrics.closingProjectsCount}</div>
          <div className="text-[10px] font-semibold text-brand-gold/70 mt-1 uppercase">Lanjut ke Produksi</div>
        </button>

        <button
          onClick={() => setActiveTab("conversion")}
          className={`text-left p-6 rounded-xl shadow-sm border transition-all duration-200 ${activeTab === "conversion" ? "bg-slate-800 border-slate-800 ring-2 ring-brand-gold/50" : "bg-slate-700 border-slate-600 hover:bg-slate-600"
            } text-white`}
        >
          <div className="text-sm font-bold text-brand-gold mb-2">Conversion Rate</div>
          <div className="text-3xl font-black">{dashboardData.metrics.closingRate.toFixed(1)}%</div>
          <div className="text-[10px] font-semibold text-slate-400 mt-1 uppercase">Klik utk Analisa Konversi</div>
        </button>
      </div>

      {/* Dynamic Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-primary" />
            {activeTab === "raw" && "Daftar Semua Leads"}
            {activeTab === "qualified" && "Daftar Qualified Leads"}
            {activeTab === "closed" && "Rincian Pembelian (Closing Details)"}
            {activeTab === "conversion" && "Internal Notes"}
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 bg-brand-gold/20 text-brand-gold rounded-full">
            {activeTab === "raw" && `${dashboardData.allLeads.length} Data`}
            {activeTab === "qualified" && `${dashboardData.qualifiedLeads.length} Data`}
            {activeTab === "closed" && `${dashboardData.closingDetails.length} Transaksi`}
            {activeTab === "conversion" && `${dashboardData.allLeads.length} Data`}
          </span>
        </div>

        {activeTab === "raw" && (dashboardData.allLeads.length === 0 ? <div className="p-12 text-center flex flex-col items-center justify-center"><div className="text-slate-500 font-medium">Wah, gurun pasir nih! Belum ada raw leads masuk.</div><div className="text-sm text-slate-400 mt-1">Ayo tim marketing, kencangkan lagi iklannya!</div></div> : renderLeadsTable(dashboardData.allLeads))}
        {activeTab === "qualified" && (dashboardData.qualifiedLeads.length === 0 ? <div className="p-12 text-center flex flex-col items-center justify-center"><div className="text-slate-500 font-medium">Kalkulatornya nganggur nih!</div><div className="text-sm text-slate-400 mt-1">Belum ada leads yang berani nanya harga. CS ayo sapa mereka!</div></div> : renderLeadsTable(dashboardData.qualifiedLeads))}
        {activeTab === "conversion" && (dashboardData.allLeads.length === 0 ? <div className="p-12 text-center flex flex-col items-center justify-center"><div className="text-slate-500 font-medium">Belum ada data untuk dianalisa.</div><div className="text-sm text-slate-400 mt-1">Hei CS Citilex Asia, ayo lebih semangat konversi leads jadi clients!</div></div> : renderConversionTable(dashboardData.allLeads))}

        {activeTab === "closed" && (
          dashboardData.closingDetails.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="text-slate-500 font-medium">Dompet masih tipis, bos!</div>
              <div className="text-sm text-slate-400 mt-1">Belum ada closing di periode ini. Pantang pulang sebelum closing!</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold border-b border-slate-200 w-1/4">Klien & Project</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200 w-1/4">Kontak</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200 text-right w-1/4">Nilai Transaksi</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-200 text-right">Rincian Item</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.closingDetails.map((detail) => {
                    const isExpanded = expandedId === detail.id;
                    const itemArray = Array.isArray(detail.items) ? detail.items : [];

                    return (
                      <React.Fragment key={detail.id}>
                        <tr
                          className={`hover:bg-slate-50 transition-colors border-b border-slate-100 ${isExpanded ? "bg-brand-primary/5" : ""}`}
                        >
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-800">{detail.customerName}</div>
                            <div className="text-xs font-semibold text-brand-primary mt-1 truncate max-w-[200px]">{detail.projectName}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{new Date(detail.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-sm text-slate-600 mb-1">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {detail.customerPhone || "-"}
                            </div>
                            {detail.customerCompany && (
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                {detail.customerCompany}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right font-black text-slate-700">
                            Rp {detail.value.toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : detail.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${isExpanded ? "bg-brand-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                            >
                              {itemArray.length} Item {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </td>
                        </tr>
                        {/* Expanded Accordion Row */}
                        {isExpanded && (
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <td colSpan={4} className="px-6 py-4">
                              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <Package className="w-4 h-4 text-brand-gold" /> Detail Item Dibeli
                                </h4>
                                {itemArray.length > 0 ? (
                                  <div className="space-y-2">
                                    {itemArray.map((item: any, idx: number) => (
                                      <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                                        <div className="flex-1">
                                          <div className="font-bold text-sm text-slate-800">{item.name || "Item Tanpa Nama"}</div>
                                          {item.tierLabel && (
                                            <div className="text-xs font-semibold text-brand-primary mt-0.5 flex items-center gap-1">
                                              <Tag className="w-3 h-3" /> {item.tierLabel}
                                            </div>
                                          )}
                                        </div>
                                        <div className="text-right flex items-center gap-6">
                                          <div className="text-sm text-slate-500">
                                            {item.qty} pcs <span className="mx-1 text-slate-300">x</span> Rp {item.pricePerPcs?.toLocaleString("id-ID")}
                                          </div>
                                          <div className="font-bold text-sm text-slate-800 w-24">
                                            Rp {((item.qty || 0) * (item.pricePerPcs || 0)).toLocaleString("id-ID")}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-sm text-slate-400 italic">Tidak ada rincian item.</div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
