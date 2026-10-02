"use client";

import React, { useState } from "react";
import { Building, Phone, Calculator, ClipboardList, CheckCircle2, Edit3, X, Save, ChevronLeft, StickyNote, Trash2, FileText, Receipt, Copy, MessageSquare, ShoppingCart } from "lucide-react";
import { CustomerWithMessages } from "./InboxClient";
import { updateCustomerQualification, updateInboxNotes } from "../../../actions/inbox";

interface CustomerInfoProps {
  customer: CustomerWithMessages;
  onOpenCalculator: () => void;
  onActionSelect: (action: "copy_text" | "send_text" | "sph" | "invoice", data?: any) => void;
}

export function CustomerInfo({ customer, onOpenCalculator, onActionSelect }: CustomerInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State (Only basic customer info now)
  const [formData, setFormData] = useState({
    name: customer.name || "",
    company: customer.company || "",
    domicile: customer.domicile || "",
  });

  const items = Array.isArray(customer.qualification?.items) ? customer.qualification!.items : [];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const customerUpdate = {
        name: formData.name,
        company: formData.company,
        domicile: formData.domicile,
      };
      
      // qualification update just passes the existing items
      const qualificationUpdate = {
        items: items
      };

      await updateCustomerQualification(customer.id, customerUpdate, qualificationUpdate);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan kualifikasi");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: customer.name || "",
      company: customer.company || "",
      domicile: customer.domicile || "",
    });
    setIsEditing(false);
  };

  const handleRemoveItem = async (index: number) => {
    if (!confirm("Hapus item ini dari Lead Qualifications?")) return;
    
    const newItems = [...items];
    newItems.splice(index, 1);
    
    try {
      await updateCustomerQualification(customer.id, {}, { items: newItems });
    } catch (e) {
      console.error(e);
      alert("Gagal menghapus item");
    }
  };

  const totalCartValue = items.reduce((sum: number, item: any) => sum + (item.totalPrice || 0), 0);

  const checklist = [
    { key: "name", label: "Nama", value: customer.name },
    { key: "company", label: "Perusahaan/Instansi", value: customer.company },
    { key: "domicile", label: "Domisili/Asal", value: customer.domicile },
  ];

  const checklistCount = checklist.length;
  let filledCount = 0;
  for (const item of checklist) {
    if (item.value && String(item.value).trim() !== "") {
      filledCount++;
    }
  }
  const progress = Math.round((filledCount / checklistCount) * 100);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      {/* Header Profile */}
      <div className="p-6 bg-white border-b border-slate-200 flex flex-col items-center justify-center relative">
        <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-2xl font-bold uppercase mb-3">
          {customer.name.charAt(0)}
        </div>
        <h2 className="text-lg font-bold text-slate-900 text-center">{customer.name}</h2>
        <div className="flex items-center text-sm text-slate-500 mt-1 gap-1">
          <Phone className="h-3 w-3" />
          {customer.phone}
        </div>
        {customer.company && (
          <div className="flex items-center text-sm text-slate-500 mt-1 gap-1 text-center">
            <Building className="h-3 w-3 shrink-0" />
            {customer.company}
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        
        {/* Tombol Kalkulator HPP */}
        <button 
          onClick={onOpenCalculator}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <ChevronLeft className="w-5 h-5" /> <Calculator className="w-5 h-5" /> Buka Calculator
        </button>

        {/* Lead Qualification Data */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-brand-gold" />
              Client Info
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">{progress}%</span>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-brand-primary hover:text-brand-primary/80 transition-colors p-1 cursor-pointer"
                  title="Isi/Edit Manual"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            {isEditing ? (
              <div className="space-y-3 pb-2">
                {checklist.map((item, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</label>
                    <input 
                      type="text" 
                      value={(formData as any)[item.key]}
                      onChange={(e) => setFormData({...formData, [item.key]: e.target.value})}
                      className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20"
                      placeholder={`Ketik ${item.label.toLowerCase()}...`}
                    />
                  </div>
                ))}
                <div className="flex gap-2 pt-2 bg-white p-2">
                  <button 
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex-1 px-3 py-1.5 border border-slate-200 text-slate-600 rounded font-bold text-xs hover:bg-slate-50 cursor-pointer flex justify-center items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Cancel</button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 px-3 py-1.5 bg-brand-primary text-white rounded font-bold text-xs hover:bg-brand-primary/90 cursor-pointer flex justify-center items-center gap-1"
                  >
                    {isSaving ? "Menyimpan..." : <><Save className="w-4 h-4 mr-2" /> Save</>}
                  </button>
                </div>
              </div>
            ) : (
              checklist.map((item, i) => {
                const isFilled = item.value && String(item.value).trim() !== "";
                return (
                  <div key={i} className="flex flex-col gap-0.5 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        {isFilled ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                        {item.label}
                      </span>
                    </div>
                    <span className={`text-xs font-medium pl-4 ${isFilled ? 'text-slate-700' : 'text-slate-300 italic'}`}>
                      {isFilled ? String(item.value) : 'Belum diisi'}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Lead Qualifications (Cart) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h3 className="font-semibold text-sm text-slate-800 flex items-center justify-between mb-3">
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-brand-gold" />
              Lead Qualifications
            </span>
            <span className="bg-brand-primary/10 text-brand-primary text-[10px] px-2 py-0.5 rounded-full">
              {items.length} Item
            </span>
          </h3>

          {items.length === 0 ? (
            <div className="text-center text-xs text-slate-400 py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              Belum ada item.<br/>Gunakan Calculator untuk menambah.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item: any, i: number) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-200 relative group">
                  <button 
                    onClick={() => handleRemoveItem(i)}
                    className="absolute top-2 right-2 p-1.5 bg-white border border-slate-200 rounded-md text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-xs font-bold text-slate-800 pr-8">{item.name}</p>
                  {item.tierLabel && <div className="text-[10px] text-slate-400 mt-0.5 uppercase">{item.tierLabel}</div>}
                  <div className="mt-1 flex flex-wrap justify-between items-center gap-x-1">
                    <div className="text-[10px] text-slate-500 whitespace-nowrap">
                      {item.qty} pcs @ Rp {item.pricePerPcs?.toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs font-bold text-brand-primary text-right flex-1">
                      Rp {item.totalPrice?.toLocaleString('id-ID')}
                    </div>
                  </div>
                  {item.specs && item.specs.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-200/50">
                      <ul className="text-[10px] text-slate-500 list-disc pl-3">
                        {item.specs.map((spec: string, idx: number) => (
                          <li key={idx}>{spec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.attachments && item.attachments.length > 0 && (
                    <div className="mt-2 flex gap-1 overflow-x-auto custom-scrollbar pb-1">
                      {item.attachments.map((att: any, idx: number) => (
                        <div key={idx} className="w-8 h-8 shrink-0 bg-white border border-slate-200 rounded overflow-hidden">
                          <img src={att.url} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-600">Total Keseluruhan:</span>
                <span className="text-sm font-black text-brand-primary">Rp {totalCartValue.toLocaleString('id-ID')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Document Generation Options */}
        {items.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50">
              Opsi Dokumen
            </div>
            <div className="p-2 flex flex-col gap-1">
              <button
                onClick={() => onActionSelect("copy_text")}
                className="text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4 text-slate-400" /> Copy Text Quotation
              </button>
              <button
                onClick={() => onActionSelect("send_text")}
                className="text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-slate-400" /> Kirim Text Quotation
              </button>
              <button
                onClick={() => onActionSelect("sph")}
                className="text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-400" /> Bikin SPH (PDF)
              </button>
              <button
                onClick={() => onActionSelect("invoice")}
                className="text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Receipt className="w-4 h-4 text-slate-400" /> Bikin Invoice (PDF)
              </button>
            </div>
          </div>
        )}

        {/* Internal Notes */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-2 mb-3">
            <StickyNote className="h-4 w-4 text-brand-gold" />
            Internal Notes
          </h3>
          <textarea 
            className="w-full text-xs text-slate-600 bg-yellow-50/50 border border-yellow-200 p-3 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-brand-gold"
            rows={4}
            placeholder="Tambahkan catatan khusus untuk tim produksi / CS lain di sini..."
            defaultValue={customer.inboxNotes || ""}
            onBlur={(e) => updateInboxNotes(customer.id, e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}
