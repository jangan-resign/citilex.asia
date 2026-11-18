"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  Plus,
  X,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { UploadDropzone } from "../../utils/uploadthing";
import { deleteBlogMedia } from "../../actions/cms";

export interface BlogMediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  altText: string | null;
  createdAt: Date | string;
}

export function MediaGalleryClient({ initialMedia }: { initialMedia: BlogMediaItem[] }) {
  const router = useRouter();
  const [mediaList, setMediaList] = useState<BlogMediaItem[]>(initialMedia);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(key);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      alert("Gagal menyalin.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus gambar "${name}" dari galeri CMS?`)) return;
    setDeletingId(id);
    try {
      await deleteBlogMedia(id);
      setMediaList((prev) => prev.filter((item) => item.id !== id));
      router.refresh();
    } catch {
      alert("Gagal menghapus media.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-full w-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-8 py-5 shrink-0 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <FolderOpen className="h-6 w-6 text-brand-gold" />
              Blog Media Gallery
            </h1>
            <p className="text-slate-500 text-xs lg:text-sm mt-1">
              Gudang gambar khusus artikel blog via UploadThing (terpisah dari aset WhatsApp Karina).
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 w-fit"
          >
            <Plus className="w-4 h-4 text-brand-gold" />
            <span>Upload Gambar Baru</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {mediaList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-brand-gold-light text-brand-gold flex items-center justify-center mx-auto">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">Belum ada gambar blog</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Unggah foto produksi, sampel bahan kain, atau infografik artikel agar bisa digunakan di AI Article Studio.
            </p>
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
            >
              Upload Gambar Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mediaList.map((item) => {
              const mdTag = `![${item.altText || item.name}](${item.url})`;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group"
                >
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.altText || item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs font-bold text-slate-800 truncate" title={item.name}>
                        {item.name}
                      </p>
                      <span className="text-[10px] text-slate-400">{item.size}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleCopy(item.url, `url-${item.id}`)}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                      >
                        {copiedId === `url-${item.id}` ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>URL</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(mdTag, `md-${item.id}`)}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold bg-brand-gold-light hover:bg-brand-gold/20 text-brand-gold rounded-lg transition-colors"
                      >
                        {copiedId === `md-${item.id}` ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>MD</span>
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                        title="Buka gambar"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={deletingId === item.id}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg disabled:opacity-50"
                        title="Hapus gambar"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-brand-gold" />
                <h3 className="font-bold text-slate-900 text-base">Upload Gambar Artikel Blog</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs text-slate-500 mb-4 text-center">
                Unggah gambar JPG, PNG, atau WebP (maksimal 8MB).
              </p>
              <div className="border-2 border-dashed border-slate-200 hover:border-brand-gold/60 rounded-xl p-2 bg-slate-50/40">
                <UploadDropzone
                  endpoint="blogImageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      const uploaded = res[0];
                      setMediaList((prev) => [
                        {
                          id: `new-${Date.now()}`,
                          name: uploaded.name,
                          url: uploaded.url,
                          size: `${(uploaded.size / 1024 / 1024).toFixed(2)} MB`,
                          altText: null,
                          createdAt: new Date().toISOString(),
                        },
                        ...prev.filter((p) => p.url !== uploaded.url),
                      ]);
                      setIsUploadOpen(false);
                      router.refresh();
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Gagal upload: ${error.message}`);
                  }}
                  appearance={{
                    container: "cursor-pointer border-none py-6",
                    button:
                      "bg-slate-800 text-white hover:bg-slate-900 text-xs px-4 py-2 font-semibold transition-all rounded-lg cursor-pointer",
                    label: "text-brand-gold font-bold text-sm",
                    allowedContent: "text-slate-500 text-xs mt-1",
                    uploadIcon: "text-slate-800 h-10 w-10",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
