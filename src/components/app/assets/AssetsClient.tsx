"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  FileText, 
  Trash2, 
  FolderOpen, 
  Loader2, 
  Plus, 
  Search, 
  X, 
  ExternalLink, 
  UploadCloud,
  FileCheck
} from "lucide-react";
import { UploadDropzone } from "../../../utils/uploadthing";
import { getAssets, deleteAsset } from "../../../actions/assets";

export function AssetsClient() {
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const data = await getAssets();
      setAssets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Hapus asset "${name}"?`)) {
      setDeletingId(id);
      try {
        await deleteAsset(id);
        await fetchAssets();
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus aset.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredAssets = useMemo(() => {
    if (!searchQuery.trim()) return assets;
    const q = searchQuery.toLowerCase();
    return assets.filter((asset) => asset.name.toLowerCase().includes(q));
  }, [assets, searchQuery]);

  return (
    <div className="min-h-full w-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-8 py-5 shrink-0 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-50 rounded-lg border border-amber-200/60 text-brand-gold">
                <FolderOpen className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
                    Asset Management
                  </h1>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                    {assets.length} file
                  </span>
                </div>
                <p className="text-slate-500 text-xs lg:text-sm mt-0.5">
                  Gudang file, foto produk, size chart, dan template katalog untuk tim CS.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari file..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <Plus className="h-4 w-4 text-brand-gold" />
              <span>Upload Aset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <Loader2 className="h-9 w-9 animate-spin text-brand-gold mb-3" />
              <p className="text-sm">Memuat aset...</p>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm my-8">
              <div className="w-14 h-14 bg-amber-50 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200/50">
                <UploadCloud className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">
                {searchQuery ? "Tidak ada file yang cocok" : "Belum ada aset tersimpan"}
              </h3>
              <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
                {searchQuery 
                  ? `Tidak ditemukan aset dengan kata kunci "${searchQuery}". Coba kata kunci lain.`
                  : "Upload size chart, template katalog, atau foto produk untuk memudahkan respon ke customer."}
              </p>
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Reset Pencarian
                </button>
              ) : (
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <Plus className="h-3.5 w-3.5 text-brand-gold" />
                  Upload Aset Sekarang
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>
                  Menampilkan <strong className="text-slate-700">{filteredAssets.length}</strong> aset
                  {searchQuery && ` untuk "${searchQuery}"`}
                </span>
              </div>

              {/* Responsive Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredAssets.map((asset) => {
                  const isPdf = asset.type === "pdf" || asset.name.toLowerCase().endsWith(".pdf");
                  const isDeleting = deletingId === asset.id;

                  return (
                    <div 
                      key={asset.id} 
                      className="group bg-white border border-slate-200 hover:border-brand-gold/60 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col relative"
                    >
                      {/* Thumbnail Area */}
                      <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                        {!isPdf && asset.url ? (
                          <img 
                            src={asset.url} 
                            alt={asset.name} 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4 text-center">
                            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-500 mb-1 group-hover:scale-110 transition-transform">
                              <FileText className="h-6 w-6" />
                            </div>
                            <span className="text-[10px] font-bold text-red-600 bg-red-100/70 px-1.5 py-0.5 rounded uppercase tracking-wider">
                              PDF
                            </span>
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          <a 
                            href={asset.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="px-3 py-1.5 bg-white text-slate-800 text-xs font-bold rounded-lg hover:bg-brand-gold hover:text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Buka</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>

                      {/* Info & Action Footer */}
                      <div className="p-3 bg-white flex-1 flex flex-col justify-between border-t border-slate-100">
                        <div className="mb-2">
                          <p 
                            className="text-xs font-bold text-slate-800 line-clamp-2 hover:text-brand-gold transition-colors" 
                            title={asset.name}
                          >
                            {asset.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-medium text-slate-400">
                              {asset.size || "-"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-semibold text-brand-gold hover:underline flex items-center gap-1"
                          >
                            Preview
                          </a>
                          <button 
                            onClick={() => handleDelete(asset.id, asset.name)} 
                            disabled={isDeleting}
                            className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                            title="Hapus aset"
                          >
                            {isDeleting ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal Dialog */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-brand-gold" />
                <h3 className="font-bold text-slate-900 text-base">
                  Upload Aset Baru
                </h3>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body / Dropzone */}
            <div className="p-6">
              <p className="text-xs text-slate-500 mb-4 text-center">
                Pilih atau seret file gambar (JPG, PNG maks 32MB) atau dokumen (PDF maks 64MB).
              </p>
              
              <div className="border-2 border-dashed border-slate-200 hover:border-brand-gold/60 rounded-xl p-2 transition-colors bg-slate-50/40">
                <UploadDropzone
                  endpoint="assetUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      fetchAssets();
                      setIsUploadOpen(false);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Gagal upload: ${error.message}`);
                  }}
                  appearance={{
                    container: "cursor-pointer border-none py-6",
                    button: "bg-slate-800 text-white hover:bg-slate-900 text-xs px-4 py-2 font-semibold transition-all rounded-lg cursor-pointer",
                    label: "text-brand-gold font-bold hover:text-brand-gold-dark text-sm",
                    allowedContent: "text-slate-500 text-xs mt-1",
                    uploadIcon: "text-slate-800 h-10 w-10"
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
