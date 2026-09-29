"use client";

import React, { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { LeadsActionMenu } from "./LeadsActionMenu";

interface LeadsTableClientProps {
  leads: any[];
}

export function LeadsTableClient({ leads }: LeadsTableClientProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
          <tr>
            <th className="px-6 py-4">Client ID</th>
            <th className="px-6 py-4">Tanggal</th>
            <th className="px-6 py-4">Informasi Client</th>
            <th className="px-6 py-4">Kontak (WA)</th>
            <th className="px-6 py-4">Estimasi Deal</th>
            <th className="px-6 py-4">Status Sales</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-slate-500 font-medium text-base">Sepi banget kayak kuburan!</div>
                  <div className="text-sm text-slate-400 mt-1">Belum ada leads yang masuk. Coba cek WA-nya nyala gak?</div>
                </div>
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <React.Fragment key={lead.id}>
                <tr className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {lead.items && lead.items.length > 0 && (
                        <button 
                          onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                          className="p-1 hover:bg-slate-200 rounded text-slate-400"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === lead.id ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                      <span className="font-bold text-slate-800">{lead.displayId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">{lead.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-700">{lead.name}</div>
                    <div className="text-xs text-slate-500">
                      {lead.company} {lead.company && lead.domicile ? '•' : ''} {lead.domicile}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 hover:underline">
                      <MessageCircle className="w-4 h-4" /> {lead.phone}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {lead.items && lead.items.length > 0 
                      ? `Rp ${lead.items.reduce((acc: number, it: any) => acc + (it.totalPrice || 0), 0).toLocaleString('id-ID')}`
                      : "Menunggu Kalkulasi"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <LeadsActionMenu lead={lead} />
                  </td>
                </tr>
                {expandedId === lead.id && lead.items && lead.items.length > 0 && (
                  <tr className="bg-slate-50/50">
                    <td colSpan={7} className="px-6 py-4 border-t border-slate-100">
                      <div className="ml-8 border-l-2 border-slate-200 pl-4 py-2">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Rincian Barang</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {lead.items.map((it: any, idx: number) => (
                            <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-slate-700 text-sm">Item {idx + 1}</span>
                                <span className="font-bold text-slate-800 text-sm">Rp {(it.totalPrice || 0).toLocaleString('id-ID')}</span>
                              </div>
                              <div className="text-xs text-slate-600 mb-2">
                                {it.qty} pcs x Rp {(it.pricePerPcs || it.price || 0).toLocaleString('id-ID')}
                              </div>
                              {it.specs && Array.isArray(it.specs) && (
                                <ul className="list-disc pl-4 text-[10px] text-slate-500 space-y-1">
                                  {it.specs.map((s: string, sIdx: number) => (
                                    <li key={sIdx}>{s}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
