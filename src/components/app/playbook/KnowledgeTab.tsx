import { useState, useEffect } from "react";
import { Save, Plus, Edit3, Trash2, Search, Filter, Loader2 } from "lucide-react";
import { getKnowledge, createKnowledge, updateKnowledge, deleteKnowledge } from "../../../actions/playbook";

export function KnowledgeTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [knowledges, setKnowledges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", category: "Produk" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchKnowledges();
  }, []);

  const fetchKnowledges = async () => {
    try {
      const data = await getKnowledge();
      setKnowledges(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredKnowledge = knowledges.filter((kn) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return kn.title.toLowerCase().includes(q) || kn.content.toLowerCase().includes(q) || kn.category.toLowerCase().includes(q);
  });

  const handleOpenModal = (kn?: any) => {
    if (kn) {
      setEditId(kn.id);
      setFormData({ title: kn.title, content: kn.content, category: kn.category });
    } else {
      setEditId(null);
      setFormData({ title: "", content: "", category: "Produk" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editId) {
        await updateKnowledge(editId, formData);
      } else {
        await createKnowledge(formData);
      }
      await fetchKnowledges();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan Knowledge");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus Pengetahuan ini?")) {
      await deleteKnowledge(id);
      await fetchKnowledges();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col relative">
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
        <button onClick={() => handleOpenModal()} className="flex w-full md:w-auto justify-center items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
          Tambah Knowledge
        </button>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-brand-gold" />
            <p className="mt-2">Memuat Pengetahuan...</p>
          </div>
        ) : filteredKnowledge.length === 0 ? (
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
                    <button onClick={() => handleOpenModal(kn)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg cursor-pointer transition-colors" title="Edit">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(kn.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg cursor-pointer transition-colors" title="Hapus">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Title & Content */}
                <h3 className="font-bold text-slate-800 mb-2">{kn.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed flex-1">
                  {kn.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800">{editId ? "Edit Knowledge" : "Tambah Knowledge Baru"}</h2>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form id="knowledgeForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                  <select required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50">
                    <option value="Produk">Produk</option>
                    <option value="Operasional">Operasional</option>
                    <option value="FAQ">FAQ</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Judul Topik</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Isi Pengetahuan</label>
                  <textarea required value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={8} className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 text-sm"></textarea>
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} type="button" className="px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-medium">Cancel</button>
              <button type="submit" form="knowledgeForm" disabled={isSubmitting} className="px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
