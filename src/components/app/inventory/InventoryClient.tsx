"use client";

import React, { useState, useMemo } from "react";
import { Save, Scissors, Plus, TrendingDown, TrendingUp, History, Package } from "lucide-react";
import { FABRIC_YIELD, FABRIC_COLORS_MAP } from "@/src/lib/factoryData";
import { updateStock } from "@/src/actions/inventory";

// --- Custom Components ---
function SearchableSelect({ options, value, onChange, disabled, placeholder }: { options: string[], value: string, onChange: (v: string) => void, disabled?: boolean, placeholder?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className={`w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold/50 bg-white flex justify-between items-center cursor-pointer min-h-[38px] ${disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="truncate">{value || placeholder || "Pilih warna..."}</span>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 flex flex-col overflow-hidden">
          <div className="p-2 border-b border-slate-100 relative bg-slate-50">
            <svg className="w-4 h-4 text-slate-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              className="w-full pl-8 p-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-gold bg-white"
              placeholder="Cari warna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1 p-1">
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text-slate-500 text-center">Tidak ditemukan</div>
            ) : (
              filtered.map(opt => (
                <div
                  key={opt}
                  className={`px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-slate-100 transition-colors ${opt === value ? 'bg-brand-gold-light/30 text-brand-gold-dark font-semibold' : 'text-slate-700'}`}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {opt}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

type InventoryLog = {
  id: string;
  type: string;
  amountKg: number;
  notes: string | null;
  createdAt: Date;
};

type InventoryItem = {
  id: string;
  fabric: string;
  color: string;
  stockKg: number;
  logs: InventoryLog[];
};

export function InventoryClient({ initialInventory }: { initialInventory: InventoryItem[] }) {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<InventoryLog[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  
  // Form State
  const [fabric, setFabric] = useState("");
  const [color, setColor] = useState("");
  const [changeKg, setChangeKg] = useState<number | "">("");
  const [type, setType] = useState<'IN' | 'OUT'>('IN');
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productType, setProductType] = useState<"KAOS" | "POLO">("KAOS");

  const availableFabrics = Object.keys(FABRIC_YIELD).filter(m => {
    if (productType === "KAOS") {
      return !m.toLowerCase().includes("lacoste") && !m.toLowerCase().includes("pique");
    } else {
      return m.toLowerCase().includes("lacoste") || m.toLowerCase().includes("pique") || m.toLowerCase().includes("cotton combed");
    }
  });

  // Group inventory by fabric
  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.fabric]) acc[item.fabric] = [];
    acc[item.fabric].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fabric || !color || !changeKg) return;

    setIsSubmitting(true);
    try {
      await updateStock({
        fabric,
        color,
        changeKg: Number(changeKg),
        type,
        notes
      });
      
      // Update local state by forcing a reload or just re-fetching
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openHistory = (item: InventoryItem) => {
    setSelectedLogs(item.logs);
    setSelectedItemName(`${item.fabric} - ${item.color}`);
    setIsHistoryModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Scissors className="h-7 w-7 text-brand-gold" />
              Factory Inventory
            </h1>
            <p className="text-slate-500 text-sm">
              Real-time fabric stock and production estimation.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto justify-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Input Stok
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="bg-brand-gold-light border border-brand-gold/30 text-brand-gold-dark px-4 py-3 rounded-lg text-sm flex gap-2 items-start">
            <span className="font-bold text-brand-primary whitespace-nowrap mt-0.5">Catatan Yield:</span>
            <span className="text-brand-primary/80">
              Estimasi baju dihitung berdasarkan yield untuk <strong>Kaos Pola Regular Lengan Pendek (S-XL)</strong>. 
              Nilai aktual dapat berbeda tergantung model dan ukuran real.
            </span>
          </div>

          {inventory.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-16 text-center text-slate-500 flex flex-col items-center relative z-10">
                <div className="h-16 w-16 rounded-full bg-brand-gold-light/30 flex items-center justify-center text-brand-gold mb-6 shadow-inner ring-4 ring-white">
                  <Package className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Gudang Masih Kosong</h3>
                <p className="text-sm text-slate-500 max-w-sm mb-6">Silakan mulai dengan menambahkan stok awal bahan baku. Sistem akan otomatis melacak riwayat dan estimasi yield.</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all hover:shadow-lg hover:shadow-slate-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Mulai Input Stok
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(groupedInventory).map(([fabricName, items]) => {
                const yieldPerKg = FABRIC_YIELD[fabricName]?.['pendek'] || 4; // default 4 if not found
                return (
                  <div key={fabricName} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1">
                    <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-5 py-4 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                        <Scissors className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-800">{fabricName}</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {items.map(item => {
                        const estimatedPcs = Math.floor(item.stockKg * yieldPerKg);
                        const isLow = item.stockKg < 5;
                        return (
                          <div key={item.id} className="p-4 flex items-center justify-between group">
                            <div>
                              <p className="font-medium text-slate-700">{item.color}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`font-bold ${isLow ? 'text-rose-600' : 'text-slate-900'}`}>
                                  {item.stockKg} Kg
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                                  ± {estimatedPcs} pcs
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => openHistory(item)}
                              className="text-slate-400 hover:text-brand-primary p-2 rounded-lg hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-all"
                              title="Lihat Riwayat"
                            >
                              <History className="w-4 h-4" />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Input Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-brand-gold-light/50 flex items-center justify-center text-brand-gold-dark">
                  <Plus className="w-4 h-4" />
                </div>
                Input Stok Bahan
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors h-8 w-8 flex items-center justify-center rounded-lg hover:bg-rose-50">×</button>
            </div>
            
            <div className="px-6 pt-5 pb-0">
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <span className={`text-sm font-bold flex-1 text-right cursor-pointer select-none ${productType === "KAOS" ? "text-brand-primary" : "text-slate-400"}`} onClick={() => { setProductType("KAOS"); setFabric(""); setColor(""); }}>
                  KAOS
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setProductType(prev => prev === "KAOS" ? "POLO" : "KAOS");
                    setFabric("");
                    setColor("");
                  }}
                  className={`relative inline-flex h-7 w-14 flex-shrink-0 items-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${productType === "POLO" ? "bg-brand-primary" : "bg-slate-300"}`}
                  style={{ borderRadius: '9999px' }}
                >
                  <span
                    className={`inline-block h-5 w-5 transform bg-white shadow-md transition-transform duration-200 ease-in-out ${productType === "POLO" ? "translate-x-8" : "translate-x-1"}`}
                    style={{ borderRadius: '50%' }}
                  />
                </button>
                <span className={`text-sm font-bold flex-1 cursor-pointer select-none ${productType === "POLO" ? "text-brand-primary" : "text-slate-400"}`} onClick={() => { setProductType("POLO"); setFabric(""); setColor(""); }}>
                  POLO SHIRT
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Bahan</label>
                <select 
                  required
                  value={fabric}
                  onChange={e => setFabric(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                >
                  <option value="">-- Pilih Bahan --</option>
                  {availableFabrics.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Warna Kain</label>
                <SearchableSelect
                  options={fabric ? (FABRIC_COLORS_MAP[fabric] || FABRIC_COLORS_MAP["Cotton Combed 30S"]).map(c => c.n) : []}
                  value={color}
                  onChange={setColor}
                  disabled={!fabric}
                  placeholder={!fabric ? "Pilih Jenis Bahan dulu" : "Pilih Warna Kain..."}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jumlah (Kg)</label>
                  <input 
                    type="number"
                    required
                    min="0.1"
                    step="0.1"
                    value={changeKg}
                    onChange={e => setChangeKg(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Transaksi</label>
                  <select 
                    value={type}
                    onChange={e => setType(e.target.value as 'IN' | 'OUT')}
                    className={`w-full px-3 py-2 border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold/50 ${
                      type === 'IN' ? 'bg-brand-gold-light border-brand-gold/30 text-brand-gold-dark' : 'bg-rose-50 border-rose-200 text-rose-700'
                    }`}
                  >
                    <option value="IN">Masuk (+)</option>
                    <option value="OUT">Keluar (-)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Keterangan (Opsional)</label>
                <input 
                  type="text" 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={type === 'IN' ? "Beli dari supplier X..." : "Produksi Kaos Proyek Y..."}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                />
              </div>

              <div className="pt-6 pb-2 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl font-medium text-sm transition-colors"
                >Cancel</button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 flex items-center justify-center">{isSubmitting ? 'Menyimpan...' : <><Save className="w-4 h-4 mr-2" /> Save</>}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Riwayat Stok</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedItemName}</p>
              </div>
              <button onClick={() => setIsHistoryModalOpen(false)} className="text-slate-400 hover:text-slate-600">×</button>
            </div>
            
            <div className="p-0 overflow-y-auto flex-1">
              {selectedLogs.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">Belum ada riwayat.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {selectedLogs.map(log => (
                    <div key={log.id} className="p-4 flex gap-4 items-start hover:bg-slate-50/50">
                      <div className={`mt-1 rounded-full p-1.5 shrink-0 ${
                        log.type === 'IN' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                      }`}>
                        {log.type === 'IN' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-slate-800 text-sm">
                            {log.type === 'IN' ? 'Stok Masuk' : 'Stok Keluar'} 
                            <span className={`ml-2 ${log.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {log.type === 'IN' ? '+' : '-'}{log.amountKg} Kg
                            </span>
                          </p>
                          <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                            {new Date(log.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {log.notes && (
                          <p className="text-sm text-slate-600 mt-1">{log.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
              <p className="text-xs text-slate-400">Menampilkan 10 riwayat terakhir.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
