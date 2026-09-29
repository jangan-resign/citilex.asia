"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";

export interface KanbanItem {
  id: string;
  clientName: string;
  customerCompany?: string | null;
  customerDomicile?: string | null;
  projectName?: string;
  amount?: number;
  status: string;
  date?: string;
  items?: any[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  initialItems: KanbanItem[];
  onItemMove?: (itemId: string, newStatus: string) => void;
  onItemClick?: (item: KanbanItem) => void;
  onAddCard?: (columnId: string) => void;
  onDeleteCard?: (id: string) => void;
  onClearColumn?: (columnId: string) => void;
}

export function KanbanBoard({ columns, initialItems, onItemMove, onItemClick, onAddCard, onDeleteCard, onClearColumn }: KanbanBoardProps) {
  const [items, setItems] = useState<KanbanItem[]>(initialItems);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  
  // States for new features
  const [columnSort, setColumnSort] = useState<Record<string, string>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.setData("itemId", id);
    e.dataTransfer.effectAllowed = "move";
    // Slightly transparent while dragging
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.opacity = "0.5";
      }
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedItemId(null);
    setDragOverColumnId(null);
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = "1";
    }
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumnId !== colId) {
      setDragOverColumnId(colId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverColumnId(null);
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    setDragOverColumnId(null);
    
    if (draggedItemId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === draggedItemId ? { ...item, status: colId } : item
        )
      );
      if (onItemMove) {
        onItemMove(draggedItemId, colId);
      }
    }
  };

  return (
    <div className="flex h-full w-full gap-4 overflow-x-auto pb-4 items-start">
      {columns.map((col) => (
        <div
          key={col.id}
          className={`flex-shrink-0 w-[300px] max-h-full flex flex-col bg-slate-100/50 rounded-xl border-2 transition-colors ${
            dragOverColumnId === col.id ? "border-brand-gold bg-brand-gold/5" : "border-slate-200"
          }`}
          onDragOver={(e) => handleDragOver(e, col.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          {/* Column Header */}
          <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-slate-100 rounded-t-xl relative z-20">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${col.color || 'bg-slate-400'}`} />
              <h3 className="font-bold text-slate-700 text-sm">{col.title}</h3>
              <span className="bg-white text-slate-500 text-xs px-2 py-0.5 rounded-full border border-slate-200 font-medium">
                {items.filter((i) => i.status === col.id).length}
              </span>
            </div>
            <div ref={openDropdown === col.id ? dropdownRef : null}>
              <button 
                onClick={() => setOpenDropdown(openDropdown === col.id ? null : col.id)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-200 transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {openDropdown === col.id && (
                <div className="absolute right-2 top-10 w-48 bg-white border border-slate-200 shadow-lg rounded-lg py-1 z-10">
                  <button onClick={() => { setColumnSort({ ...columnSort, [col.id]: 'value-desc' }); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Urutkan: Value Terbesar</button>
                  <button onClick={() => { setColumnSort({ ...columnSort, [col.id]: 'date-desc' }); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Urutkan: Terbaru</button>
                  <button onClick={() => { setColumnSort({ ...columnSort, [col.id]: 'date-asc' }); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Urutkan: Terlama</button>
                  <div className="my-1 border-t border-slate-100"></div>
                  <button onClick={() => { onClearColumn?.(col.id); setOpenDropdown(null); }} className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50">Kosongkan Kolom</button>
                </div>
              )}
            </div>
          </div>

          {/* Cards Container */}
          <div className="p-3 flex-1 overflow-y-auto flex flex-col gap-3 min-h-[150px]">
            {items
              .filter((i) => i.status === col.id)
              .sort((a, b) => {
                const sortType = columnSort[col.id];
                if (sortType === 'value-desc') return (b.amount || 0) - (a.amount || 0);
                if (sortType === 'date-desc') return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
                if (sortType === 'date-asc') return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
                return 0; // default order
              })
              .map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onItemClick && onItemClick(item)}
                  className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-gold/50 cursor-grab active:cursor-grabbing transition-all group relative"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing" title="Drag Card">
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-brand-gold transition-colors">
                          {item.clientName}
                        </h4>
                        {(item.customerCompany || item.customerDomicile) && (
                          <div className="text-[10px] text-slate-500 mb-1 font-medium">
                            {item.customerCompany} {item.customerCompany && item.customerDomicile ? '•' : ''} {item.customerDomicile}
                          </div>
                        )}
                        {item.projectName && (
                          <p className="text-xs text-slate-500">{item.projectName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 relative z-10">
                      {item.date && (
                        <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                      )}
                      {onDeleteCard && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDeleteCard(item.id); }}
                          className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                          title="Hapus Kartu"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {item.items && item.items.length > 0 && (
                    <div className="mb-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleExpand(item.id); }}
                        className="text-xs font-semibold text-brand-gold flex items-center gap-1 hover:underline"
                      >
                        {expandedCards[item.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        {expandedCards[item.id] ? "Sembunyikan Detail" : "Lihat Detail"}
                      </button>
                      
                      {expandedCards[item.id] && (
                        <div className="mt-2 p-2 bg-slate-50 border border-slate-100 rounded-md">
                          <table className="w-full text-left text-[10px]">
                            <thead>
                              <tr className="text-slate-400 border-b border-slate-200">
                                <th className="pb-1 font-semibold">Item</th>
                                <th className="pb-1 font-semibold">Qty</th>
                                <th className="pb-1 text-right font-semibold">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody className="text-slate-600">
                              {item.items.map((cartItem: any, idx: number) => (
                                <tr key={idx} className="border-b border-slate-100 last:border-0">
                                  <td className="py-1">
                                    <div className="font-medium text-slate-800">
                                      {cartItem.name || (cartItem.specs?.find((s: string) => s.startsWith("Jenis Produk"))?.split(": ")[1] || "Produk")}
                                    </div>
                                    <div className="text-[9px] text-slate-400 mt-0.5">{cartItem.tierLabel}</div>
                                  </td>
                                  <td className="py-1 align-top pt-2">{cartItem.qty || cartItem.quantity || 0}</td>
                                  <td className="py-1 text-right font-medium">Rp {(cartItem.totalPrice || cartItem.subtotal || 0).toLocaleString("id-ID")}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {item.amount !== undefined && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                      <span className="text-xs font-bold text-slate-700">
                        Rp {item.amount.toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              
            {/* Add Card Button */}
            <button 
              onClick={() => onAddCard && onAddCard(col.id)}
              className="w-full py-2 flex items-center justify-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors border border-transparent hover:border-slate-300 border-dashed"
            >
              <Plus className="w-4 h-4" /> Add Card
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
