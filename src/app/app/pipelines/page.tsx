"use client";

import React, { useState, useEffect } from "react";
import { KanbanBoard, KanbanColumn, KanbanItem } from "../../../components/app/pipelines/KanbanBoard";
import { Customer } from "@prisma/client";
import { Save, Plus, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MonthYearFilter } from "../../../components/app/MonthYearFilter";

type TabId = "deal" | "pre-production" | "production" | "payment" | "delivery";
type DateFilter = "today" | "this_week" | "this_month" | "this_year" | "all_time";

export default function PipelinesPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabId>("deal");

  const [dbItems, setDbItems] = useState<KanbanItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    document.title = "Pipelines Kanban | CITILEX ASIA Workspace";
    import("../../../actions/pipeline").then(({ getPipelineItems }) => {
      getPipelineItems().then((items) => {
        const formatted = items.map((item) => ({
          id: item.id,
          clientName: item.clientName,
          customerCompany: item.customerCompany,
          customerDomicile: item.customerDomicile,
          projectName: item.projectName,
          amount: item.amount || 0,
          status: item.status || "new-lead",
          date: item.date,
          pipeline: item.pipeline,
          items: item.items
        }));
        setDbItems(formatted as any);
      });
    });
    import("../../../actions/pipeline").then(({ getAllCustomersForDropdown }) => {
      getAllCustomersForDropdown().then(data => setCustomers(data)).catch(console.error);
    });
  }, []);

  // --- COLUMNS DEF ---
  const dealColumns: KanbanColumn[] = [
    { id: "new-lead", title: "New Lead", color: "bg-blue-400" },
    { id: "qualifying", title: "Qualifying", color: "bg-amber-400" },
    { id: "quotation-sent", title: "Quotation Sent", color: "bg-purple-400" },
    { id: "invoice-dp-issued", title: "Invoice DP Issued", color: "bg-green-400" },
  ];

  const preProdColumns: KanbanColumn[] = [
    { id: "drafting", title: "Drafting Desain", color: "bg-blue-300" },
    { id: "waiting-client", title: "Waiting Client ACC", color: "bg-yellow-400" },
    { id: "waiting-pm", title: "Waiting PM ACC", color: "bg-orange-400" },
    { id: "acc-spk", title: "SPK Terbit", color: "bg-green-500" },
  ];

  const prodColumns: KanbanColumn[] = [
    { id: "antrean-spk", title: "Antrean SPK", color: "bg-slate-400" },
    { id: "cmt-cut", title: "CMT Cut (Potong)", color: "bg-red-400" },
    { id: "aplikasi", title: "Aplikasi (Sablon/Bordir)", color: "bg-pink-500" },
    { id: "cmt-make", title: "Make (Buat/Jahit)", color: "bg-cyan-500" },
    { id: "cmt-trim", title: "Trim (Rapikan & QC)", color: "bg-purple-500" },
  ];

  const deliveryColumns: KanbanColumn[] = [
    { id: "ready-ship", title: "Ready to Ship", color: "bg-indigo-400" },
    { id: "in-transit", title: "In Transit", color: "bg-amber-400" },
    { id: "delivered", title: "Delivered", color: "bg-emerald-500" },
  ];

  const paymentColumns: KanbanColumn[] = [
    { id: "waiting-dp", title: "Waiting DP", color: "bg-orange-400" },
    { id: "dp-lunas", title: "DP Lunas", color: "bg-emerald-400" },
    { id: "waiting-final", title: "Waiting Final Payment", color: "bg-amber-500" },
    { id: "closed-won", title: "Closed Won", color: "bg-brand-gold" },
  ];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalColumnId, setAddModalColumnId] = useState<string | null>(null);
  const [modalItems, setModalItems] = useState<{name: string, qty: number, pricePerPcs: number, totalPrice: number, tierLabel?: string}[]>([]);
  const [modalValue, setModalValue] = useState<number | ''>('');
  
  // Manual Client State
  const [modalClientType, setModalClientType] = useState<string>('');
  const [modalCustomerName, setModalCustomerName] = useState('');
  const [modalCustomerPhone, setModalCustomerPhone] = useState('');
  const [modalCustomerCompany, setModalCustomerCompany] = useState('');
  const [modalCustomerDomicile, setModalCustomerDomicile] = useState('');

  const handleAddCard = (columnId: string) => {
    setAddModalColumnId(columnId);
    setModalItems([]);
    setModalValue('');
    setIsAddModalOpen(true);
  };

  const handleDeleteCard = async (id: string) => {
    if (confirm("Yakin ingin menghapus kartu Kanban ini?")) {
      const { deleteProject, getPipelineItems } = await import("../../../actions/pipeline");
      await deleteProject(id);
      const updated = await getPipelineItems();
      const formatted = updated.map((item) => ({
        id: item.id,
        clientName: item.clientName,
        projectName: item.projectName,
        amount: item.amount,
        status: item.status,
        pipeline: item.pipeline,
        date: item.date,
        items: item.items
      }));
      setDbItems(formatted as any);
    }
  };

  const handleClearColumn = async (columnId: string) => {
    if (confirm("PENGHAPUSAN MASAL! Anda yakin ingin menghapus SEMUA kartu di kolom ini secara permanen?")) {
      const pipelineStage = activeTab === "deal" ? "DEAL" : 
                            activeTab === "pre-production" ? "PRE_PROD" : 
                            activeTab === "production" ? "PROD" : 
                            activeTab === "payment" ? "PAYMENT" : "DELIVERY";
      
      const { clearColumn, getPipelineItems } = await import("../../../actions/pipeline");
      await clearColumn(pipelineStage as any, columnId);
      
      const updated = await getPipelineItems();
      const formatted = updated.map((item) => ({
        id: item.id,
        clientName: item.clientName,
        projectName: item.projectName,
        amount: item.amount,
        status: item.status,
        pipeline: item.pipeline,
        date: item.date,
        items: item.items
      }));
      setDbItems(formatted as any);
    }
  };

  const TABS = [
    { id: "deal", label: "Deal Pipeline (Sales)", pipeline: "DEAL", firstCol: "new-lead" },
    { id: "pre-production", label: "Pre-Production", pipeline: "PRE_PROD", firstCol: "drafting" },
    { id: "production", label: "Production (CMT)", pipeline: "PROD", firstCol: "antrean-spk" },
    { id: "payment", label: "Account & Payment", pipeline: "PAYMENT", firstCol: "waiting-dp" },
    { id: "delivery", label: "Delivery", pipeline: "DELIVERY", firstCol: "ready-ship" },
  ];

  const handleDropToTab = async (e: React.DragEvent, targetPipeline: string, targetStatus: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData("itemId");
    if (!itemId) return;

    const prevItems = [...dbItems];
    setDbItems(dbItems.map((i: any) => i.id === itemId ? { ...i, pipeline: targetPipeline, status: targetStatus } : i));

    try {
      const { updateProject } = await import("../../../actions/pipeline");
      await updateProject({
        projectId: itemId,
        newPipeline: targetPipeline as any,
        newStatus: targetStatus
      });
      const tabId = TABS.find(t => t.pipeline === targetPipeline)?.id;
      if (tabId) setActiveTab(tabId as TabId);
    } catch (error) {
      console.error(error);
      setDbItems(prevItems);
      alert("Gagal memindahkan kartu antar tab");
    }
  };

  const isDateInRange = (dateStr: string) => {
    if (!dateStr) return false;
    
    const paramMonth = searchParams.get('month');
    const paramYear = searchParams.get('year');
    
    const month = paramMonth === "all" ? "all" : (paramMonth ? parseInt(paramMonth) : new Date().getMonth() + 1);
    const year = paramYear === "all" ? "all" : (paramYear ? parseInt(paramYear) : new Date().getFullYear());

    if (year === "all") return true;

    const itemDate = new Date(dateStr);
    if (month !== "all") {
      return itemDate.getFullYear() === year && (itemDate.getMonth() + 1) === month;
    } else {
      return itemDate.getFullYear() === year;
    }
  };

  // Render proper kanban based on active tab
  const renderKanban = () => {
    const items = dbItems.filter((i: any) => {
      let isMatchTab = false;
      if (activeTab === "deal") isMatchTab = i.pipeline === "DEAL";
      if (activeTab === "pre-production") isMatchTab = i.pipeline === "PRE_PROD";
      if (activeTab === "production") isMatchTab = i.pipeline === "PROD";
      if (activeTab === "payment") isMatchTab = i.pipeline === "PAYMENT";
      if (activeTab === "delivery") isMatchTab = i.pipeline === "DELIVERY";
      
      if (!isMatchTab) return false;
      
      return isDateInRange(i.date);
    });

    switch (activeTab) {
      case "deal": return <KanbanBoard columns={dealColumns} initialItems={items} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onClearColumn={handleClearColumn} key={`deal-${items.length}`} />;
      case "pre-production": return <KanbanBoard columns={preProdColumns} initialItems={items} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onClearColumn={handleClearColumn} key={`pre-${items.length}`} />;
      case "production": return <KanbanBoard columns={prodColumns} initialItems={items} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onClearColumn={handleClearColumn} key={`prod-${items.length}`} />;
      case "payment": return <KanbanBoard columns={paymentColumns} initialItems={items} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onClearColumn={handleClearColumn} key={`pay-${items.length}`} />;
      case "delivery": return <KanbanBoard columns={deliveryColumns} initialItems={items} onAddCard={handleAddCard} onDeleteCard={handleDeleteCard} onClearColumn={handleClearColumn} key={`del-${items.length}`} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-6 bg-slate-50">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Pipelines</h1>
          <p className="text-sm text-slate-500 mt-1">Pantau seluruh proses pesanan dari ujung ke ujung.</p>
        </div>
        
        {/* Date Filter */}
        <div className="relative w-full md:w-auto">
          <MonthYearFilter />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            onDrop={(e) => {
              e.currentTarget.classList.remove("bg-brand-gold/10");
              handleDropToTab(e, tab.pipeline, tab.firstCol);
            }}
            onDragEnter={(e) => {
              if (activeTab !== tab.id) e.currentTarget.classList.add("bg-brand-gold/10");
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove("bg-brand-gold/10");
            }}
            className={`pb-3 px-4 text-sm font-bold whitespace-nowrap transition-colors border-b-2 rounded-t-lg ${
              activeTab === tab.id ? "border-brand-gold text-brand-gold" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        {renderKanban()}
      </div>

      {/* Add Card Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="font-bold text-slate-800">Tambah Card (Project) Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pilih Client</label>
                <select 
                  id="modal-client" 
                  value={modalClientType}
                  onChange={(e) => setModalClientType(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                >
                  <option value="">-- Pilih Client --</option>
                  <option value="manual">-- Input Manual (Client Baru) --</option>
                  {customers.map(c => {
                    const extra = [c.company, c.domicile].filter(Boolean).join(" - ");
                    return <option key={c.id} value={c.id}>{c.name} {extra ? `(${extra})` : ''}</option>;
                  })}
                </select>
              </div>

              {modalClientType === 'manual' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Klien</label>
                    <input type="text" value={modalCustomerName} onChange={(e) => setModalCustomerName(e.target.value)} placeholder="Cth: Bapak Budi" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nomor WA</label>
                    <input type="text" value={modalCustomerPhone} onChange={(e) => setModalCustomerPhone(e.target.value)} placeholder="Cth: 081234567890" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Perusahaan / Instansi</label>
                    <input type="text" value={modalCustomerCompany} onChange={(e) => setModalCustomerCompany(e.target.value)} placeholder="Cth: PT Makmur" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Domisili / Asal</label>
                    <input type="text" value={modalCustomerDomicile} onChange={(e) => setModalCustomerDomicile(e.target.value)} placeholder="Cth: Bandung" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Project</label>
                <input id="modal-project" type="text" placeholder="Cth: Pembuatan Kemeja PDL" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              
              {/* Dynamic Items Section */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700">Rincian Barang (Opsional)</label>
                  <button 
                    onClick={() => setModalItems([...modalItems, {name: '', qty: 1, pricePerPcs: 0, totalPrice: 0}])}
                    className="text-xs font-bold text-brand-primary hover:text-brand-primary/80 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Tambah Item
                  </button>
                </div>
                
                {modalItems.length > 0 ? (
                  <div className="p-4 space-y-3 bg-white">
                    {modalItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <div className="flex-1">
                          <input 
                            type="text" 
                            placeholder="Nama Item (Cth: Kaos Polos)" 
                            value={item.name}
                            onChange={(e) => {
                              const newItems = [...modalItems];
                              newItems[idx].name = e.target.value;
                              setModalItems(newItems);
                            }}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm mb-2" 
                          />
                          <input 
                            type="text" 
                            placeholder="Keterangan / Tier Label (Opsional)" 
                            value={item.tierLabel || ''}
                            onChange={(e) => {
                              const newItems = [...modalItems];
                              newItems[idx].tierLabel = e.target.value;
                              setModalItems(newItems);
                            }}
                            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs mb-2" 
                          />
                          <div className="flex gap-2">
                            <input 
                              type="number" 
                              placeholder="Qty" 
                              value={item.qty}
                              onChange={(e) => {
                                const newItems = [...modalItems];
                                newItems[idx].qty = parseInt(e.target.value) || 0;
                                newItems[idx].totalPrice = newItems[idx].qty * newItems[idx].pricePerPcs;
                                setModalItems(newItems);
                              }}
                              className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm" 
                            />
                            <input 
                              type="number" 
                              placeholder="Harga Satuan" 
                              value={item.pricePerPcs}
                              onChange={(e) => {
                                const newItems = [...modalItems];
                                newItems[idx].pricePerPcs = parseInt(e.target.value) || 0;
                                newItems[idx].totalPrice = newItems[idx].qty * newItems[idx].pricePerPcs;
                                setModalItems(newItems);
                              }}
                              className="w-32 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm" 
                            />
                            <div className="flex-1 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded text-sm text-slate-600 flex items-center justify-end font-medium">
                              Rp {item.totalPrice.toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setModalItems(modalItems.filter((_, i) => i !== idx))}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded mt-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-slate-400 italic bg-white">
                    Tidak ada rincian barang. Klik Tambah Item untuk memasukkan data.
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nilai Project (Estimasi)</label>
                <input 
                  id="modal-value" 
                  type="number" 
                  placeholder="Cth: 5000000" 
                  value={modalItems.length > 0 ? modalItems.reduce((acc, curr) => acc + curr.totalPrice, 0) : modalValue}
                  onChange={(e) => setModalValue(parseInt(e.target.value) || '')}
                  readOnly={modalItems.length > 0}
                  className={`w-full px-4 py-2 border border-slate-200 rounded-lg text-sm ${modalItems.length > 0 ? 'bg-slate-100 text-slate-600 font-bold' : 'bg-slate-50'}`} 
                />
                {modalItems.length > 0 && <p className="text-xs text-slate-500 mt-1">Otomatis dihitung dari rincian barang.</p>}
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 shrink-0 flex justify-end gap-2">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-200 rounded-lg transition-colors text-sm">Cancel</button>
              <button 
                className="px-4 py-2 bg-brand-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-sm shadow-sm"
                onClick={async () => {
                  const clientId = (document.getElementById('modal-client') as HTMLSelectElement).value;
                  const title = (document.getElementById('modal-project') as HTMLInputElement).value;
                  const value = modalItems.length > 0 
                    ? modalItems.reduce((acc, curr) => acc + curr.totalPrice, 0)
                    : (parseInt((document.getElementById('modal-value') as HTMLInputElement).value) || 0);
                  
                  if (!clientId || !title) return alert('Lengkapi data client dan judul project');
                  if (clientId === 'manual' && !modalCustomerName) return alert('Nama Klien Manual wajib diisi');

                  const { createProject } = await import('../../../actions/pipeline');
                  await createProject({
                    title,
                    value,
                    customerId: clientId,
                    customerName: modalCustomerName,
                    customerPhone: modalCustomerPhone,
                    customerCompany: modalCustomerCompany,
                    customerDomicile: modalCustomerDomicile,
                    pipeline: activeTab === 'deal' ? 'DEAL' : activeTab === 'pre-production' ? 'PRE_PROD' : activeTab === 'production' ? 'PROD' : activeTab === 'payment' ? 'PAYMENT' : 'DELIVERY',
                    status: addModalColumnId || 'new-lead',
                    items: modalItems
                  });
                  
                  setIsAddModalOpen(false);
                  window.location.reload();
                }}
              ><><Save className="w-4 h-4 mr-2" /> Save</></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
