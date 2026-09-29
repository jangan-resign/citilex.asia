import { useState } from "react";
import { dummyKnowledge } from "../../../lib/dummyData";
import { Plus, Edit3, Trash2, Search, Filter } from "lucide-react";

export function KnowledgeTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredKnowledge = dummyKnowledge.filter((kn) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return kn.title.toLowerCase().includes(q) || kn.content.toLowerCase().includes(q) || kn.category.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center bg-slate-50 gap-4">
        <div className="flex gap-2 md:gap-3">
          <div className="relative flex-1 md:w-64 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Pengetahuan (Judul/Kategori)..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
            <Filter className="h-4 w-4" />
            Kategori
          </button>
        </div>
        <button className="flex w-full md:w-auto justify-center items-center gap-2 px-4 py-2 bg-brand-gold text-white rounded-lg text-sm font-medium hover:bg-[#8a6f44] transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
          Tambah Knowledge
        </button>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
        {filteredKnowledge.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            Tidak ada Pengetahuan yang cocok dengan pencarian "{searchQuery}"
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredKnowledge.map((kn) => (
              <div key={kn.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all group relative flex flex-col h-full">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    kn.category === "Operasional" ? "bg-purple-100 text-purple-700" :
                    kn.category === "Produk" ? "bg-orange-100 text-orange-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {kn.category}
                  </span>
                  
                  {/* Actions (visible on hover) */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg cursor-pointer transition-colors" title="Edit">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer transition-colors" title="Hapus">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Title & Content */}
                <h3 className="font-bold text-slate-800 mb-2">{kn.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed flex-1">
                  {kn.content}
                </p>

                {/* Footer */}
                <div className="text-xs text-slate-400 mt-auto pt-4 border-t border-slate-100 shrink-0">
                  Diperbarui: {kn.lastUpdated}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
