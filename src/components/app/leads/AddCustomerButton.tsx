"use client";

import { useState } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import { createCustomer } from "../../../actions/inbox";
import { useRouter } from "next/navigation";

interface AddCustomerButtonProps {
  type: "lead" | "client";
}

export function AddCustomerButton({ type }: AddCustomerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Nama dan No. WA wajib diisi!");
      return;
    }

    setIsLoading(true);
    try {
      await createCustomer({ name, company, phone });
      setIsOpen(false);
      setName("");
      setCompany("");
      setPhone("");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan data! Nomor WA mungkin sudah terdaftar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-slate-800 text-white w-full md:w-auto justify-center px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-900 transition-all flex items-center gap-2"
      >
        <UserPlus className="w-4 h-4" />
        {type === 'lead' ? 'Tambah Lead' : 'Tambah Client'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="font-black text-slate-800 text-lg">
                {type === 'lead' ? 'Tambah Lead Baru' : 'Tambah Client Baru'}
              </h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-slate-600 bg-white p-1 rounded-md shadow-sm border border-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 flex">
                    Nama Lengkap <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 flex">
                    Instansi / Perusahaan
                  </label>
                  <input 
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Contoh: PT Maju Bersama (Opsional)"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 flex">
                    Nomor WA <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input 
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    required
                  />
                </div>
              </div>
              <div className="bg-slate-50 p-5 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)} 
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50"
                >Cancel</button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold hover:bg-slate-900 flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
