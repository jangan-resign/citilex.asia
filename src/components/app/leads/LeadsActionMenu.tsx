"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, MessageCircle, FileText, Receipt, User, XCircle, Trash2, X } from "lucide-react";
import { updateCustomerStatus, deleteCustomer } from "../../../actions/inbox";

interface LeadsActionMenuProps {
  lead: {
    id: string;
    name: string;
    company: string | null;
    phone: string;
    items: any[];
  };
}

export function LeadsActionMenu({ lead }: LeadsActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    if (!isOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDocumentAction = (action: "sph" | "invoice") => {
    if (!lead.items || lead.items.length === 0) {
      alert("Spesifikasi/item belum dihitung di kalkulator!");
      return;
    }

    const payload = {
      customerId: lead.id,
      customerName: lead.name,
      items: lead.items.map((item: any, index: number) => ({
        name: `Item ${index + 1}`,
        qty: item.qty,
        price: item.pricePerPcs || item.price,
        specs: item.specs || [],
        hasAttachment: false
      })),
    };

    const encoded = encodeURIComponent(JSON.stringify(payload));
    window.open(`/app/${action === "sph" ? "quotations" : "invoices"}?import=${encoded}`, '_blank');
    setIsOpen(false);
  };

  const handleStatusUpdate = async (status: string) => {
    if (confirm(`Yakin ingin mengubah status lead ini menjadi ${status}?`)) {
      await updateCustomerStatus(lead.id, status);
      setIsOpen(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("AWAS! Yakin ingin menghapus data lead ini secara permanen?")) {
      await deleteCustomer(lead.id);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button 
          onClick={toggleMenu}
          className="p-2 text-slate-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-colors cursor-pointer"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>

        {isOpen && (
          <div 
            style={{ top: position.top, right: position.right }} 
            className="fixed w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-[9999] py-1 text-left overflow-hidden"
          >
            <button 
              onClick={() => {
                window.location.href = `/app/inbox`;
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-brand-gold" />
              Follow Up (Inbox)
            </button>
            <button 
              onClick={() => handleDocumentAction('sph')}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left transition-colors"
            >
              <FileText className="w-4 h-4 text-brand-gold" />
              Bikin SPH
            </button>
            <button 
              onClick={() => handleDocumentAction('invoice')}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left transition-colors"
            >
              <Receipt className="w-4 h-4 text-brand-gold" />
              Bikin Invoice
            </button>
            <div className="h-px bg-slate-100 my-1" />
            <button 
              onClick={() => {
                setShowProfile(true);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left transition-colors"
            >
              <User className="w-4 h-4 text-brand-gold" />
              Lihat Profil
            </button>
            <button 
              onClick={() => handleStatusUpdate('lost')}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left transition-colors"
            >
              <XCircle className="w-4 h-4 text-orange-600" />
              Tandai Lost
            </button>
            <button 
              onClick={handleDelete}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium text-left transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
              Hapus Data
            </button>
          </div>
        )}
      </div>

      {/* Profil Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Profil Lead</h3>
              <button onClick={() => setShowProfile(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500">Nama</label>
                <div className="font-medium text-slate-800">{lead.name}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Perusahaan/Instansi</label>
                <div className="font-medium text-slate-800">{lead.company || '-'}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Kontak WA</label>
                <div className="font-medium text-slate-800">{lead.phone}</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
              <button onClick={() => setShowProfile(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-300">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
