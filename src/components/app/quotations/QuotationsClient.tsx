"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Plus, Trash2, FileText, Search, ArrowLeft, MoreHorizontal, CheckCircle, XCircle, Send, FileEdit, ChevronDown, Loader2 } from 'lucide-react';
import { getCustomers } from '@/src/actions/inbox';
import { getQuotations, saveQuotationToDb } from '@/src/actions/documents';
import { MonthYearFilter } from '../MonthYearFilter';
import { Customer } from '@prisma/client';
import { CustomSelect } from '@/src/components/ui/CustomSelect';

interface Item {
  name: string;
  qty: number;
  price: number;
  specs?: string[];
  hasAttachment: boolean;
}

interface Attachment {
  url: string;
  description: string;
}

type DbQuotation = {
  id: string;
  docNumber: string;
  customerName: string;
  amount: number;
  status: string;
  createdAt: Date;
  customer?: { name: string; company: string | null; domicile: string | null } | null;
  project?: { customer?: { name: string; company: string | null; domicile: string | null } | null } | null;
};

export function QuotationsClient({ initialMonth = "all" as any, initialYear = "all" as any }: { initialMonth?: number | "all", initialYear?: number | "all" }) {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // --- SPH Generator State ---
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('manual');
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerDomicile, setCustomerDomicile] = useState('');
  
  const [manualRandomId, setManualRandomId] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [sessionSuffix] = useState(() => Math.random().toString(36).substring(2, 5).toUpperCase());
  const [docNumberOverride, setDocNumberOverride] = useState<string | null>(null);
  const [generateCount, setGenerateCount] = useState(0);
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<Item[]>([{ name: 'Item 1', qty: 1, price: 0, hasAttachment: false }]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dbQuotations, setDbQuotations] = useState<DbQuotation[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [isReturning, setIsReturning] = useState(false);

  const refreshList = () => {
    setLoadingList(true);
    getQuotations(initialMonth, initialYear).then((data: any[]) => {
      setDbQuotations(data);
    }).catch(console.error).finally(() => setLoadingList(false));
  };

  useEffect(() => {
    setIsLoadingCustomers(true);
    getCustomers().then(data => setCustomers(data)).catch(console.error).finally(() => setIsLoadingCustomers(false));
    refreshList();

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const initialCustomerId = params.get('customerId');
      const action = params.get('action');

      if (action === 'create') setView('create');
      
      if (initialCustomerId) {
        setSelectedCustomerId(initialCustomerId);
        const draft = localStorage.getItem(`doc_draft_${initialCustomerId}`);
        if (draft) {
          try {
            const parsed = JSON.parse(draft);
            if (parsed.items && parsed.items.length > 0) setItems(parsed.items);
            if (parsed.customerName) setCustomerName(parsed.customerName);
            if (parsed.customerCompany) setCustomerCompany(parsed.customerCompany);
            if (parsed.customerPhone) setCustomerPhone(parsed.customerPhone);
            if (parsed.customerDomicile) setCustomerDomicile(parsed.customerDomicile);
          } catch(e) {
            console.error(e);
          }
        }
      }
    }
  }, [initialMonth, initialYear]);

  const docNumber = React.useMemo(() => {
    if (docNumberOverride) return docNumberOverride;
    const month = date.split('-')[1];
    const year = date.split('-')[0];
    const idStr = selectedCustomerId === 'manual' ? manualRandomId : selectedCustomerId.slice(-6).toUpperCase();
    const revStr = generateCount > 0 ? `-REV${generateCount}` : '';
    return `SPH-${idStr}-${month}-${year}-${sessionSuffix}${revStr}`;
  }, [selectedCustomerId, date, manualRandomId, generateCount, sessionSuffix, docNumberOverride]);

  useEffect(() => {
    if (selectedCustomerId !== 'manual') {
      const c = customers.find(c => c.id === selectedCustomerId);
      if (c) {
        setCustomerName(c.name);
        setCustomerCompany(c.company || '');
        setCustomerPhone(c.phone || '');
        setCustomerDomicile(c.domicile || '');
      }
    } else {
      setCustomerName('');
      setCustomerCompany('');
      setCustomerPhone('');
      setCustomerDomicile('');
    }
  }, [selectedCustomerId, customers]);

  // formatClientName is no longer used for table rendering, but kept for search
  const formatClientName = (customer: any, fallbackName?: string) => {
    if (!customer) return fallbackName || '-';
    let name = customer.name || fallbackName || '-';
    if (customer.company) name += ` ${customer.company}`;
    if (customer.domicile) name += ` ${customer.domicile}`;
    return name;
  };

  const handleEditQuotation = (q: DbQuotation) => {
    // 1. Populate items
    if (Array.isArray((q as any).items) && (q as any).items.length > 0) {
      setItems((q as any).items.map((it: any) => ({
        ...it,
        price: it.price || it.pricePerPcs || 0,
      })));
    } else {
      setItems([{ name: 'Item 1', qty: 1, price: 0, hasAttachment: false }]);
    }

    // 2. Populate customer data
    const cId = (q as any).customerId || (q.project?.customer as any)?.id;
    if (cId) {
      setSelectedCustomerId(cId);
    } else {
      setSelectedCustomerId('manual');
      setCustomerName(q.customerName || '');
      setCustomerCompany((q as any).customerCompany || '');
    }

    // 3. Set exact docNumberOverride to overwrite the same document!
    setDocNumberOverride(q.docNumber);
    
    // 4. Set date
    if (q.createdAt) {
      try {
        setDate(new Date(q.createdAt).toISOString().split('T')[0]);
      } catch (e) {
        // ignore date parse error
      }
    }

    setView('create');
  };

  const filteredQuotations = dbQuotations.filter(q => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    const cName = formatClientName(q.project?.customer || (q as any).customer, q.customerName).toLowerCase();
    return q.docNumber.toLowerCase().includes(lowerQuery) || cName.includes(lowerQuery);
  });

  const addItem = () => setItems([...items, { name: `Item ${items.length + 1}`, qty: 1, price: 0, hasAttachment: false }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
  const updateItem = (index: number, field: keyof Item, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addAttachment = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_DIM = 1200;
        
        if (width > height && width > MAX_DIM) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const resizedDataUrl = canvas.toDataURL(mimeType, 0.85);
          setAttachments(prev => [...prev, { url: resizedDataUrl, description: '' }]);
        } else {
          setAttachments(prev => [...prev, { url: reader.result as string, description: '' }]);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };
  
  const updateAttachment = (index: number, desc: string) => {
    const newAtt = [...attachments];
    newAtt[index].description = desc;
    setAttachments(newAtt);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const calculateTotal = () => items.reduce((acc, item) => acc + (item.qty * item.price), 0);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const payload = {
        customerName: customerName || 'Kustomer',
        customerCompany,
        customerPhone,
        customerDomicile,
        docNumber,
        date,
        items: items.map(item => ({
          ...item,
          subtotal: item.qty * item.price
        })),
        total: calculateTotal(),
        attachments,
      };

      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'sph', payload })
      });

      if (!res.ok) throw new Error('Failed to generate PDF');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

      // Simpan ke DB
      await saveQuotationToDb({
        docNumber: docNumber,
        amount: calculateTotal(),
        status: 'Draft',
        customerName: customerName,
        customerCompany: customerCompany,
        customerDomicile: customerDomicile,
        customerPhone: customerPhone,
        customerId: selectedCustomerId !== 'manual' ? selectedCustomerId : undefined,
        items: payload.items
      });

      // Clear override so next generation creates a new one
      setDocNumberOverride(null);
      setManualRandomId(Math.random().toString(36).substring(2, 8).toUpperCase());
      
      setGenerateCount(prev => prev + 1);

      refreshList();
      setView('list');
    } catch (error) {
      console.error(error);
      alert('Gagal membuat PDF');
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDERING ---
  
  if (view === 'list') {
    return (
      <div className="flex h-full w-full flex-col bg-slate-50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="h-6 w-6 text-brand-gold" />
            Quotations (SPH)
          </h2>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <MonthYearFilter />
            <button 
              onClick={() => setView('create')}
              className="flex-1 md:flex-none justify-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors flex items-center gap-2 font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" /> Create SPH
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari SPH..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nomor Dokumen</th>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Total Nilai</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
            <tbody className="divide-y divide-slate-100">
              {loadingList ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Memuat data...
                  </td>
                </tr>
              ) : filteredQuotations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-slate-500 font-medium text-base">
                        {searchQuery ? 'SPH yang dicari nge-ghosting nih.' : 'Belum ada Surat Penawaran Harga (SPH).'}
                      </div>
                      <div className="text-sm text-slate-400 mt-1">
                        {searchQuery ? 'Coba cari dengan keyword lain!' : 'Ayo buat SPH, tebar jaring sebanyak-banyaknya!'}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredQuotations.map((q) => (
                  <React.Fragment key={q.id}>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        {Array.isArray((q as any).items) && (q as any).items.length > 0 && (
                          <button 
                            onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-400"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === q.id ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                        {q.docNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{(q.project?.customer || (q as any).customer)?.name || q.customerName || '-'}</div>
                      {((q.project?.customer || (q as any).customer)?.company || (q.project?.customer || (q as any).customer)?.domicile) && (
                        <div className="text-xs text-slate-500 mt-0.5">
                          {(q.project?.customer || (q as any).customer)?.company} 
                          {(q.project?.customer || (q as any).customer)?.company && (q.project?.customer || (q as any).customer)?.domicile ? ' • ' : ''} 
                          {(q.project?.customer || (q as any).customer)?.domicile}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{new Date(q.createdAt).toLocaleDateString('id-ID')}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">Rp {q.amount.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        q.status === 'Sent' ? 'bg-slate-100 text-slate-700 border border-slate-300' :
                        q.status === 'Approved' ? 'bg-brand-gold/10 text-brand-primary border border-brand-gold/50' :
                        q.status === 'Rejected' ? 'bg-slate-100 text-slate-400 border border-slate-200 line-through' :
                        'bg-white text-slate-500 border border-slate-200 border-dashed'
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <div className="flex items-center justify-end gap-1">

                        <button
                          onClick={() => setOpenDropdownId(openDropdownId === q.id ? null : q.id)}
                          className="p-2 text-slate-400 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      {openDropdownId === q.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setOpenDropdownId(null)} 
                          />
                          <div className="absolute right-6 top-10 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                            {q.status === 'Draft' && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdownId(null);
                                  handleEditQuotation(q);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left border-b border-slate-100"
                              >
                                <FileEdit className="w-4 h-4 text-brand-gold" /> Edit SPH
                              </button>
                            )}
                            <button
                              onClick={async () => {
                                setOpenDropdownId(null);
                                const { updateQuotationStatus } = await import('@/src/actions/documents');
                                await updateQuotationStatus(q.id, 'Sent');
                                refreshList();
                                alert('Status SPH berhasil diubah');
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left"
                            >
                              <Send className="w-4 h-4 text-brand-gold" /> Mark as Sent
                            </button>
                            <button
                              onClick={async () => {
                                setOpenDropdownId(null);
                                const { updateQuotationStatus } = await import('@/src/actions/documents');
                                await updateQuotationStatus(q.id, 'Approved');
                                refreshList();
                                alert('Status SPH berhasil diubah');
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left"
                            >
                              <CheckCircle className="w-4 h-4 text-brand-gold" /> Mark as Approved
                            </button>
                            <button
                              onClick={async () => {
                                setOpenDropdownId(null);
                                const { updateQuotationStatus } = await import('@/src/actions/documents');
                                await updateQuotationStatus(q.id, 'Rejected');
                                refreshList();
                                alert('Status SPH berhasil diubah');
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left"
                            >
                              <XCircle className="w-4 h-4 text-brand-gold" /> Mark as Rejected
                            </button>
                            <button
                              onClick={async () => {
                                setOpenDropdownId(null);
                                const { updateQuotationStatus } = await import('@/src/actions/documents');
                                await updateQuotationStatus(q.id, 'Draft');
                                refreshList();
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left border-b border-slate-100"
                            >
                              <FileEdit className="w-4 h-4 text-brand-gold" /> Revert to Draft
                            </button>
                            <button
                              onClick={async () => {
                                setOpenDropdownId(null);
                                if (confirm('Yakin ingin menghapus SPH ini secara permanen?')) {
                                  const { deleteQuotation } = await import('@/src/actions/documents');
                                  await deleteQuotation(q.id);
                                  refreshList();
                                }
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-slate-50 font-medium text-left mt-1 border-t border-slate-100 pt-2"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                  
                  {expandedId === q.id && Array.isArray((q as any).items) && (q as any).items.length > 0 && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={6} className="px-6 py-4 border-b border-slate-100">
                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                          <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase">
                              <tr>
                                <th className="px-4 py-2 text-left">Item</th>
                                <th className="px-4 py-2 text-center">Qty</th>
                                <th className="px-4 py-2 text-right">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {(q as any).items.map((item: any, idx: number) => (
                                <tr key={idx} className="hover:bg-slate-50">
                                  <td className="px-4 py-3">
                                    <div className="font-medium text-slate-800">{item.name}</div>
                                    {item.tierLabel && <div className="text-[10px] text-slate-400 mt-0.5 uppercase">{item.tierLabel}</div>}
                                  </td>
                                  <td className="px-4 py-3 text-center text-slate-600">{item.qty}</td>
                                  <td className="px-4 py-3 text-right font-medium text-slate-700">
                                    Rp {(item.totalPrice || ((item.pricePerPcs || item.price || 0) * (item.qty || 1))).toLocaleString('id-ID')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto pb-32">
      <button 
        onClick={() => {
          setIsReturning(true);
          setTimeout(() => {
            setView('list');
            setDocNumberOverride(null);
            setIsReturning(false);
          }, 400); // 400ms delay to ensure loading state is visible
        }}
        disabled={isReturning}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isReturning ? <><Loader2 className="w-4 h-4 animate-spin" /> Membatalkan...</> : <><ArrowLeft className="w-4 h-4" /> Kembali ke Riwayat</>}
      </button>

      <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-brand-gold" /> Buat SPH Baru
      </h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Pilih Client</label>
              <CustomSelect
                value={selectedCustomerId}
                onChange={setSelectedCustomerId}
                options={isLoadingCustomers ? [
                  { value: 'manual', label: '-- Memuat data client... --' }
                ] : [
                  { value: 'manual', label: '-- Input Manual (Client Baru) --' },
                  ...customers.map(c => ({ value: c.id, label: formatClientName(c) }))
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Client</label>
              <input 
                type="text" 
                value={customerName} 
                onChange={e => setCustomerName(e.target.value)} 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                placeholder="Cth: PT Makmur Jaya"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Perusahaan / Instansi</label>
              <input 
                type="text" 
                value={customerCompany} 
                onChange={e => setCustomerCompany(e.target.value)} 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                placeholder="Cth: Event Organizer Jabar"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nomor WA</label>
              <input 
                type="text" 
                value={customerPhone} 
                onChange={e => setCustomerPhone(e.target.value)} 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                placeholder="Cth: 081234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Domisili / Asal</label>
              <input 
                type="text" 
                value={customerDomicile} 
                onChange={e => setCustomerDomicile(e.target.value)} 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                placeholder="Cth: Bandung"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nomor SPH (Auto)</label>
              <input 
                type="text" 
                value={docNumber} 
                readOnly
                className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-mono text-sm cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal</label>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Daftar Item</label>
          
          <div className="flex gap-2 px-3 pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="flex-1">
              <div className="flex gap-2">
                <div className="flex-1">Spesifikasi</div>
                <div className="w-24 text-center">Quantity</div>
                <div className="w-32 text-right pr-3">Unit Price</div>
                <div className="min-w-[120px] text-right pr-4">Subtotal</div>
              </div>
            </div>
            {items.length > 1 && <div className="w-9"></div>}
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={e => updateItem(index, 'name', e.target.value)} 
                      placeholder="Deskripsi Barang"
                      className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                    />
                    <input 
                      type="number" 
                      value={item.qty || ''} 
                      onChange={e => updateItem(index, 'qty', parseInt(e.target.value) || 0)} 
                      placeholder="Qty"
                      className="w-24 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-center"
                    />
                    <input 
                      type="text" 
                      value={item.price ? item.price.toLocaleString('id-ID') : ''} 
                      onChange={e => {
                        const numericStr = e.target.value.replace(/\D/g, '');
                        updateItem(index, 'price', parseInt(numericStr) || 0);
                      }} 
                      placeholder="Harga/Pcs"
                      className="w-32 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-right"
                    />
                    <div className="flex items-center px-4 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-sm font-bold whitespace-nowrap min-w-[120px] justify-end">
                      Rp {(item.qty * item.price).toLocaleString('id-ID')}
                    </div>
                  </div>
                  <textarea
                    value={(item.specs || []).join('\n')}
                    onChange={e => updateItem(index, 'specs', e.target.value.split('\n'))}
                    placeholder="Spesifikasi (Satu per baris)"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-xs min-h-[100px]"
                  />
                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={item.hasAttachment}
                      onChange={e => updateItem(index, 'hasAttachment', e.target.checked)}
                      className="rounded border-slate-300 accent-brand-gold w-4 h-4 cursor-pointer shrink-0"
                    />
                    Tambahkan teks "(desain terlampir)" otomatis pada SPH
                  </label>
                </div>
                {items.length > 1 && (
                  <button onClick={() => removeItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg mt-1">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3">
            <button onClick={addItem} className="flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-amber-700">
              <Plus className="w-4 h-4" /> Tambah Item
            </button>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-semibold mb-1">Total Keseluruhan</p>
              <p className="text-xl font-black text-brand-primary">Rp {calculateTotal().toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>

        {/* Upload Design */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Lampiran Desain & Keterangan</label>
          <div className="space-y-3 mb-3">
            {attachments.map((att, idx) => (
              <div key={idx} className="flex gap-3 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                <div className="w-20 h-20 shrink-0 bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <img src={att.url} alt="Attachment" className="w-full h-full object-contain" />
                </div>
                <input 
                  type="text"
                  value={att.description}
                  onChange={e => updateAttachment(idx, e.target.value)}
                  placeholder="Contoh: Desain Kaos Depan - Item 1"
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
                />
                <button onClick={() => removeAttachment(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 flex flex-col items-center justify-center gap-2">
            <label className="cursor-pointer bg-slate-200 text-slate-600 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-300 transition-colors shadow-sm">
              Tambah Gambar Lampiran
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    addAttachment(file);
                    e.target.value = ''; // Reset
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>

      </div>

      {/* Action */}
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleGenerate}
          disabled={isLoading || (!customerName && selectedCustomerId === 'manual') || items.length === 0}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Generate SPH"}
        </button>
      </div>
    </div>
  );
}
