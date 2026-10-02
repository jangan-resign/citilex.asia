import React from "react";
import { ChevronRight, PackageOpen, ShoppingCart } from "lucide-react";

interface ClientProfileDrawerProps {
  client: any;
  onClose: () => void;
}

export function ClientProfileDrawer({ client, onClose }: ClientProfileDrawerProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/20 flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl relative animate-in slide-in-from-right duration-300 border-l border-slate-200 flex flex-col">
        {/* Drawer Handle / Close Button */}
        <button
          onClick={onClose}
          className="absolute -left-6 top-8 z-10 w-12 h-12 bg-slate-800 rounded-lg shadow-lg flex items-center justify-center text-white hover:bg-slate-900 cursor-pointer transition-all"
          title="Tutup Profil"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-6 pl-14 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-800">{client.name}</h2>
              <div className="text-sm font-medium text-slate-500 mt-1">
                {client.company} • {client.phone}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Value (LTV)</div>
              <div className="text-xl font-black text-brand-primary">{client.ltv}</div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Pesanan</div>
              <div className="text-lg font-black text-slate-700 mt-1">{client.totalOrders}x</div>
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Status</div>
              <div className={`text-sm font-black mt-2 ${client.status === 'Active Order' ? 'text-brand-gold' : 'text-emerald-500'}`}>
                {client.status}
              </div>
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded-lg p-3 text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Pesanan Terakhir</div>
              <div className="text-sm font-black text-slate-700 mt-2">{client.lastOrder}</div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
            <HistoryIcon /> Riwayat Pesanan
          </h3>

          {(!client.rawProjects || client.rawProjects.length === 0) ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
              <PackageOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <div className="text-sm font-bold text-slate-500">Belum ada riwayat pesanan.</div>
            </div>
          ) : (
            <div className="space-y-4">
              {client.rawProjects.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((project: any) => (
                <div key={project.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">{project.title}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(project.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-brand-primary">Rp {project.value.toLocaleString('id-ID')}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                        Status: {project.status}
                      </div>
                    </div>
                  </div>
                  
                  {/* Items List */}
                  {project.items && Array.isArray(project.items) && project.items.length > 0 && (
                    <div className="bg-slate-50 p-4">
                      <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-3">
                        <ShoppingCart className="w-3.5 h-3.5" /> Rincian Barang
                      </div>
                      <div className="space-y-2">
                        {project.items.map((item: any, idx: number) => (
                          <div key={idx} className="bg-white rounded border border-slate-200 p-3 flex justify-between items-center">
                            <div>
                              <div className="font-bold text-slate-700 text-sm">{item.name}</div>
                              {item.tierLabel && (
                                <div className="text-[10px] font-bold text-slate-400 mt-1">{item.tierLabel}</div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-slate-500">
                                {item.qty} pcs @ Rp {(item.pricePerPcs || item.price || 0).toLocaleString('id-ID')}
                              </div>
                              <div className="text-sm font-bold text-slate-700 mt-0.5">
                                Rp {(item.totalPrice || ((item.pricePerPcs || item.price || 0) * (item.qty || 1))).toLocaleString('id-ID')}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HistoryIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M12 7v5l4 2"/>
    </svg>
  );
}
