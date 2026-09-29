"use client";

import React, { useState } from "react";
import { LeadsSearch } from "../LeadsSearch";
import { ClientsActionMenu } from "./ClientsActionMenu";
import { ClientProfileDrawer } from "./ClientProfileDrawer";

export function ClientsTableClient({ clients }: { clients: any[] }) {
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 flex items-center gap-4">
        <LeadsSearch placeholder="Cari nama klien, perusahaan, atau no. WA..." />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
            <tr>
              <th className="px-6 py-4">Client ID</th>
              <th className="px-6 py-4">Informasi Client</th>
              <th className="px-6 py-4">Kontak (WA)</th>
              <th className="px-6 py-4">Total Order</th>
              <th className="px-6 py-4">Total Value (LTV)</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
          {clients.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-slate-500 font-medium text-base">Piala masih kosong!</div>
                  <div className="text-sm text-slate-400 mt-1">Belum ada klien yang deal. Ayo berjuang, CS andalan Citilex!</div>
                </div>
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{client.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-700">{client.name}</div>
                  <div className="text-xs text-slate-500">
                    {client.company} {client.company && client.domicile ? '•' : ''} {client.domicile}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-600">{client.phone}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-brand-primary">{client.totalOrders}x Order</div>
                  <div className="text-xs text-slate-400">Terakhir: {client.lastOrder}</div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-700">{client.ltv}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    client.status === 'Active Order' 
                      ? 'bg-brand-gold-light text-brand-gold border border-brand-gold/30' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ClientsActionMenu 
                    client={client} 
                    onOpenProfile={() => setSelectedClient(client)}
                  />
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>

      {selectedClient && (
        <ClientProfileDrawer 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
        />
      )}
    </div>
  );
}
