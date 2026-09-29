"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, MessageCircle, FileText, Receipt, User, History, Trash2, X } from "lucide-react";
import { deleteCustomer } from "../../../actions/inbox";

interface ClientsActionMenuProps {
  client: {
    id: string;
    name: string;
    company: string | null;
    phone: string;
  };
  onOpenProfile?: () => void;
}

export function ClientsActionMenu({ client, onOpenProfile }: ClientsActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleDelete = async () => {
    if (confirm("AWAS! Yakin ingin menghapus data klien ini secara permanen? Semua riwayat project dan invoice akan ikut terhapus!")) {
      await deleteCustomer(client.id);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={menuRef}>
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
              onClick={() => {
                if (onOpenProfile) onOpenProfile();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium text-left transition-colors"
            >
              <User className="w-4 h-4 text-brand-gold" />
              Profil & Riwayat
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

    </>
  );
}
