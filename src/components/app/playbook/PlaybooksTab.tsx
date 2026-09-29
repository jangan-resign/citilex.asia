import { useState } from "react";
import { dummyPlaybooks } from "../../../lib/dummyData";
import { Plus, Edit3, Trash2, Search } from "lucide-react";

export function PlaybooksTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaybooks = dummyPlaybooks.filter((pb) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return pb.title.toLowerCase().includes(q) || pb.description.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center bg-slate-50 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Playbook..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
          />
        </div>
        <button className="flex w-full md:w-auto justify-center items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
          Tambah Playbook
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500 bg-white">
              <th className="font-medium p-4 pl-6 w-1/3">Judul SOP</th>
              <th className="font-medium p-4 w-1/3">Deskripsi Singkat</th>
              <th className="font-medium p-4">Terakhir Diperbarui</th>
              <th className="font-medium p-4">Status</th>
              <th className="font-medium p-4 pr-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlaybooks.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                  Tidak ada Playbook yang cocok dengan pencarian "{searchQuery}"
                </td>
              </tr>
            ) : (
              filteredPlaybooks.map((pb) => (
                <tr key={pb.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="p-4 pl-6">
                    <p className="font-semibold text-slate-800 text-sm">{pb.title}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-slate-500 truncate max-w-[250px]" title={pb.description}>
                      {pb.description}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-slate-500">{pb.lastUpdated}</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pb.isActive ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                    }`}>
                      {pb.isActive ? "Aktif" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors" title="Edit">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors" title="Hapus">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
