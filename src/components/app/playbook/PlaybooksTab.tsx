import { useState, useEffect } from "react";
import { Save, Plus, Edit3, Trash2, Search, Loader2 } from "lucide-react";
import { getSops, createSop, updateSop, deleteSop } from "../../../actions/playbook";

export function PlaybooksTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sops, setSops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", content: "", isActive: true });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSops();
  }, []);

  const fetchSops = async () => {
    try {
      const data = await getSops();
      setSops(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPlaybooks = sops.filter((pb) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return pb.title.toLowerCase().includes(q) || (pb.description && pb.description.toLowerCase().includes(q));
  });

  const handleOpenModal = (sop?: any) => {
    if (sop) {
      setEditId(sop.id);
      setFormData({ title: sop.title, description: sop.description || "", content: sop.content, isActive: sop.isActive });
    } else {
      setEditId(null);
      setFormData({ title: "", description: "", content: "", isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editId) {
        await updateSop(editId, formData);
      } else {
        await createSop(formData);
      }
      await fetchSops();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan SOP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus SOP ini?")) {
      await deleteSop(id);
      await fetchSops();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col relative">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center bg-slate-50 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari SOP..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
          />
        </div>
        <button onClick={() => handleOpenModal()} className="flex w-full md:w-auto justify-center items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
          Tambah SOP
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500 bg-white">
              <th className="font-medium p-4 pl-6 w-1/3">Judul SOP</th>
              <th className="font-medium p-4 w-1/3">Deskripsi Singkat</th>
              <th className="font-medium p-4">Status</th>
              <th className="font-medium p-4 pr-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-brand-gold" />
                  <p className="mt-2">Memuat SOP...</p>
                </td>
              </tr>
            ) : filteredPlaybooks.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                  Tidak ada SOP yang cocok dengan pencarian "{searchQuery}"
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      pb.isActive ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                    }`}>
                      {pb.isActive ? "Aktif" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(pb)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors" title="Edit">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(pb.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors" title="Hapus">
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

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">{editId ? "Edit SOP" : "Tambah SOP Baru"}</h2>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form id="sopForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Judul SOP</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
                  <input type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Isi SOP (Markdown didukung)</label>
                  <textarea required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={10} className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 font-mono text-sm"></textarea>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 rounded cursor-pointer accent-brand-gold shrink-0" />
                  <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Aktif (Gunakan di Karina AI)</label>
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} type="button" className="px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium">Cancel</button>
              <button type="submit" form="sopForm" disabled={isSubmitting} className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
