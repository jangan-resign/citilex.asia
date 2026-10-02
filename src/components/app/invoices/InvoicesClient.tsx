"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Plus, Trash2, Receipt, Search, ArrowLeft, MoreHorizontal, CheckCircle, XCircle, ChevronDown, FileEdit, Loader2 } from 'lucide-react';
import { getCustomers } from '@/src/actions/inbox';
import { getInvoices, saveInvoiceToDb } from '@/src/actions/documents';
import { MonthYearFilter } from '../MonthYearFilter';
import { Customer } from '@prisma/client';

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

type DbInvoice = {
  id: string;
  docNumber: string | null;
  customerName: string | null;
  type: string;
  amount: number;
  status: string;
  createdAt: Date;
  customer?: { name: string; company: string | null; domicile: string | null } | null;
  project: { customer: { name: string; company: string | null; domicile: string | null } | null; title: string } | null;
};

export function InvoicesClient({ initialMonth = "all" as any, initialYear = "all" as any }: { initialMonth?: number | "all", initialYear?: number | "all" }) {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // --- Invoice Generator State ---
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('manual');
  const [customerName, setCustomerName] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerDomicile, setCustomerDomicile] = useState('');
  
  const [manualRandomId, setManualRandomId] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [sessionSuffix] = useState(() => Math.random().toString(36).substring(2, 5).toUpperCase());
  const [docNumberOverride, setDocNumberOverride] = useState<string | null>(null);
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<Item[]>([{ name: 'Item 1', qty: 1, price: 0, hasAttachment: false }]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<'FULL' | 'DP_70' | 'LUNAS_30'>('FULL');
  const [shippingCost, setShippingCost] = useState(0);
  const [taxDiscount, setTaxDiscount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [dbInvoices, setDbInvoices] = useState<DbInvoice[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isReturning, setIsReturning] = useState(false);

  const refreshList = () => {
    setLoadingList(true);
    getInvoices(initialMonth, initialYear).then((data: any[]) => {
      setDbInvoices(data);
    }).catch(console.error).finally(() => setLoadingList(false));
  };

  useEffect(() => {
    getCustomers().then(data => setCustomers(data)).catch(console.error);
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
    return `INV-${idStr}-${month}-${year}-${sessionSuffix}`;
  }, [selectedCustomerId, date, manualRandomId, sessionSuffix, docNumberOverride]);

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

  const handleEditInvoice = (inv: DbInvoice) => {
    // 1. Populate items
    if (Array.isArray((inv as any).items) && (inv as any).items.length > 0) {
      setItems((inv as any).items.map((it: any) => ({
        ...it,
        price: it.price || it.pricePerPcs || 0,
      })));
    } else {
      setItems([{ name: 'Item 1', qty: 1, price: 0, hasAttachment: false }]);
    }

    // 2. Populate customer data
    const cId = (inv as any).customerId || (inv.project?.customer as any)?.id;
    if (cId) {
      setSelectedCustomerId(cId);
    } else {
      setSelectedCustomerId('manual');
      setCustomerName(inv.customerName || '');
      setCustomerCompany((inv as any).customerCompany || '');
    }

    // 3. Set docNumberOverride to keep the same document!
    setDocNumberOverride(inv.docNumber);
    
    // 4. Set date
    if (inv.createdAt) {
      try {
        setDate(new Date(inv.createdAt).toISOString().split('T')[0]);
      } catch (e) {}
    }

    // 5. Payment type
    if (inv.type) {
      if (inv.type === 'DP') setPaymentType('DP_70');
      else if (inv.type === 'LUNAS') setPaymentType('LUNAS_30');
      else setPaymentType('FULL');
    }

    setView('create');
  };

  const addItem = () => setItems([...items, { name: `Item ${items.length + 1}`, qty: 1, price: 0, hasAttachment: false }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
  const updateItem = (index: number, field: keyof Item, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File terlalu besar. Maksimal 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1200;
        let { width, height } = img;
        
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
        shippingCost,
        taxDiscount,
        taxAmount,
        paymentType,
        attachments,
      };

      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'invoice', payload })
      });

      if (!res.ok) throw new Error('Failed to generate PDF');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

      // Simpan ke DB - standalone invoice (tanpa project)
      // Invoice yang linked ke project hanya bisa dari modul Pipeline
      const invoiceType = paymentType === 'DP_70' ? 'DP' : paymentType === 'LUNAS_30' ? 'LUNAS' : 'FULL';
      await saveInvoiceToDb({
        docNumber: docNumber,
        amount: calculateTotal(),
        type: invoiceType,
        status: 'UNPAID',
        customerName: customerName,
        customerCompany: customerCompany,
        customerDomicile: customerDomicile,
        customerPhone: customerPhone,
        customerId: selectedCustomerId !== 'manual' ? selectedCustomerId : undefined,
        items: payload.items
      });

      // Auto-regenerate docNumber so next generate creates a new one instead of updating
      setDocNumberOverride(null);
      setManualRandomId(Math.random().toString(36).substring(2, 8).toUpperCase());

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
  const filteredInvoices = dbInvoices.filter(inv => {
    const searchLower = searchQuery.toLowerCase();
    const docNumber = (inv.docNumber || '').toLowerCase();
    const cName = (inv.project?.customer?.name || inv.customer?.name || inv.customerName || '').toLowerCase();
    const pTitle = (inv.project?.title || '').toLowerCase();
    return docNumber.includes(searchLower) || cName.includes(searchLower) || pTitle.includes(searchLower);
  });
  
  if (view === 'list') {
    return (
      <div className="flex h-full w-full flex-col bg-slate-50 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Receipt className="h-6 w-6 text-brand-gold" />
            Invoices (Tagihan)
          </h2>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <MonthYearFilter />
            <button 
              onClick={() => setView('create')}
              className="flex-1 md:flex-none justify-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors flex items-center gap-2 font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" /> Create Invoice
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50 rounded-t-xl">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari Invoice..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm text-left">
              <thead className="text-xs text-slate-500 bg-slate-50 border-b border-slate-200 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nomor Dokumen</th>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Proyek</th>
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Tipe</th>
                  <th className="px-6 py-4 font-semibold">Total Tagihan</th>
                  <th className="px-6 py-4 font-semibold text-center">Status Pembayaran</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
            <tbody className="divide-y divide-slate-100">
              {loadingList ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">Memuat data...</td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-slate-500 font-medium text-base">
                        {searchQuery ? 'Invoice yang kamu cari minggat entah kemana.' : 'Tabel Invoice masih suci dan bersih!'}
                      </div>
                      <div className="text-sm text-slate-400 mt-1">
                        {searchQuery ? 'Coba cek lagi salah ketik nggak?' : 'Ayo tagih klien, bos butuh cuan buat ngopi!'}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const customer = inv.project?.customer || inv.customer;
                  return (
                    <React.Fragment key={inv.id}>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          <div className="flex items-center gap-2">
                            {Array.isArray((inv as any).items) && (inv as any).items.length > 0 && (
                              <button 
                                onClick={() => setExpandedId(expandedId === inv.id ? null : inv.id)}
                                className="p-1 hover:bg-slate-200 rounded text-slate-400"
                              >
                                <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === inv.id ? 'rotate-180' : ''}`} />
                              </button>
                            )}
                            {inv.docNumber || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{customer?.name || inv.customerName || '-'}</div>
                          {(customer?.company || customer?.domicile) && (
                            <div className="text-xs text-slate-500 mt-0.5">
                              {customer.company} {customer.company && customer.domicile ? '•' : ''} {customer.domicile}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{inv.project?.title || '-'}</td>
                        <td className="px-6 py-4 text-slate-500">{new Date(inv.createdAt).toLocaleDateString('id-ID')}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                            {inv.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-700">Rp {inv.amount.toLocaleString('id-ID')}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            inv.status === 'PAID' ? 'bg-brand-gold/10 text-brand-primary border border-brand-gold/50' : 'bg-white text-slate-500 border border-slate-300'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right relative">
                          {inv.status === 'UNPAID' && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditInvoice(inv);
                              }}
                              className="p-1 text-slate-400 hover:text-brand-primary rounded transition-colors"
                              title="Edit"
                            >
                              <FileEdit className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => setOpenDropdownId(openDropdownId === inv.id ? null : inv.id)}
                            className="p-2 text-slate-400 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>

                          {openDropdownId === inv.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setOpenDropdownId(null)} 
                              />
                              <div className="absolute right-6 top-10 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                <button
                                  onClick={async () => {
                                    setOpenDropdownId(null);
                                    if (confirm('Tandai tagihan ini sebagai LUNAS?')) {
                                      const { markInvoicePaid } = await import('@/src/actions/documents');
                                      await markInvoicePaid(inv.id);
                                      refreshList();
                                    }
                                  }}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left"
                                >
                                  <CheckCircle className="w-4 h-4 text-brand-gold" /> Mark as Paid
                                </button>
                                <button
                                  onClick={async () => {
                                    setOpenDropdownId(null);
                                    if (confirm('Batalkan pelunasan tagihan ini (Ubah ke Belum Lunas)?\n\nCatatan: Ini akan otomatis menghapus catatan pemasukan di Cash Flow terkait invoice ini.')) {
                                      const { markInvoiceUnpaid } = await import('@/src/actions/documents');
                                      await markInvoiceUnpaid(inv.id);
                                      refreshList();
                                    }
                                  }}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left border-b border-slate-100"
                                >
                                  <XCircle className="w-4 h-4 text-brand-gold" /> Mark as Unpaid
                                </button>
                                <button
                                  onClick={async () => {
                                    setOpenDropdownId(null);
                                    if (confirm('Yakin ingin menghapus tagihan ini secara permanen?')) {
                                      const { deleteInvoice } = await import('@/src/actions/documents');
                                      await deleteInvoice(inv.id);
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

                      {expandedId === inv.id && Array.isArray((inv as any).items) && (inv as any).items.length > 0 && (
                        <tr className="bg-slate-50/50">
                          <td colSpan={8} className="px-6 py-4 border-b border-slate-100">
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
                                  {(inv as any).items.map((item: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-slate-50">
                                      <td className="px-4 py-3">
                                        <div className="font-medium text-slate-800">{item.name}</div>
                                        {item.tierLabel && <div className="text-[10px] text-slate-400 mt-0.5 uppercase">{item.tierLabel}</div>}
                                      </td>
                                      <td className="px-4 py-3 text-center text-slate-600">{item.qty}</td>
                                      <td className="px-4 py-3 text-right font-medium text-slate-700">
                                        Rp {(item.totalPrice || item.pricePerPcs * item.qty).toLocaleString('id-ID')}
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
                  );
                })
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
        <Receipt className="w-6 h-6 text-brand-gold" /> Buat Invoice Baru
      </h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
        
        {/* Payment Type Selection */}
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => setPaymentType('FULL')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-colors ${paymentType === 'FULL' ? 'bg-slate-800 border-slate-800 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            <span className="text-sm">Pembayaran Penuh</span>
            <span className="text-[10px] opacity-80">100% Total</span>
          </button>
          <button 
            onClick={() => setPaymentType('DP_70')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-colors ${paymentType === 'DP_70' ? 'bg-slate-800 border-slate-800 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            <span className="text-sm">Down Payment</span>
            <span className="text-[10px] opacity-80">70% Total</span>
          </button>
          <button 
            onClick={() => setPaymentType('LUNAS_30')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-colors ${paymentType === 'LUNAS_30' ? 'bg-slate-800 border-slate-800 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            <span className="text-sm">Pelunasan</span>
            <span className="text-[10px] opacity-80">30% Sisa Total</span>
          </button>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Pilih Client</label>
              <select
                value={selectedCustomerId}
                onChange={e => setSelectedCustomerId(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
              >
                <option value="manual">-- Input Manual (Client Baru) --</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ''}</option>
                ))}
              </select>
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
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nomor Tagihan (Auto)</label>
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
          <label className="block text-sm font-semibold text-slate-700 mb-3">Daftar Item Keseluruhan</label>
          
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
                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer mt-2">
                    <input 
                      type="checkbox" 
                      checked={item.hasAttachment}
                      onChange={e => updateItem(index, 'hasAttachment', e.target.checked)}
                      className="rounded border-slate-300 accent-brand-gold w-4 h-4 cursor-pointer shrink-0"
                    />
                    Tambahkan teks "(desain terlampir)" otomatis pada Invoice
                  </label>
                </div>
                {items.length > 1 && (
                  <button onClick={() => removeItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg mt-1">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <div className="pt-2">
              <button onClick={addItem} className="flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-amber-700">
                <Plus className="w-4 h-4" /> Tambah Item
              </button>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <div className="text-right">
              <div className="flex justify-end gap-4 mb-4 items-end">
                <div className="text-left">
                  <label className="block text-xs font-semibold text-slate-700 mb-1 text-right">Ongkos Kirim</label>
                  <input 
                    type="text" 
                    value={shippingCost ? shippingCost.toLocaleString('id-ID') : ''}
                    onChange={e => {
                      const numericStr = e.target.value.replace(/\D/g, '');
                      setShippingCost(parseInt(numericStr) || 0);
                    }}
                    placeholder="0"
                    className="w-32 px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-right"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-xs font-semibold text-slate-700 mb-1 text-right">Diskon / Potongan (-)</label>
                  <input 
                    type="text" 
                    value={taxDiscount ? taxDiscount.toLocaleString('id-ID') : ''}
                    onChange={e => {
                      const numericStr = e.target.value.replace(/\D/g, '');
                      setTaxDiscount(parseInt(numericStr) || 0);
                    }}
                    placeholder="0"
                    className="w-32 px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-right text-red-500"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-xs font-semibold text-slate-700 mb-1 text-right">Pajak (-)</label>
                  <input 
                    type="text" 
                    value={taxAmount ? taxAmount.toLocaleString('id-ID') : ''}
                    onChange={e => {
                      const numericStr = e.target.value.replace(/\D/g, '');
                      setTaxAmount(parseInt(numericStr) || 0);
                    }}
                    placeholder="0"
                    className="w-32 px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-right text-red-500"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold mb-1 uppercase">Subtotal Keseluruhan (100%)</p>
              <p className="text-sm font-black text-slate-400 mb-2">Rp {(calculateTotal() + shippingCost - taxDiscount - taxAmount).toLocaleString('id-ID')}</p>
              
              <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-lg inline-block">
                <p className="text-xs text-brand-primary font-bold mb-1 uppercase">Total Ditagihkan ({paymentType === 'DP_70' ? 'DP 70%' : paymentType === 'LUNAS_30' ? 'PELUNASAN 30%' : '100%'})</p>
                <p className="text-xl font-black text-brand-primary">
                  Rp {(
                    paymentType === 'DP_70' ? (calculateTotal() + shippingCost - taxDiscount - taxAmount) * 0.7 : 
                    paymentType === 'LUNAS_30' ? (calculateTotal() + shippingCost - taxDiscount - taxAmount) * 0.3 : 
                    (calculateTotal() + shippingCost - taxDiscount - taxAmount)
                  ).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Upload Design */}
      <div className="mt-8">
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
              onChange={handleUpload}
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
          {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Generate Invoice"}
        </button>
      </div>
    </div>
  );
}
