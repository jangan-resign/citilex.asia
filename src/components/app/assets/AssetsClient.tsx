"use client";

import { useState, useEffect } from "react";
import { FileText, Image as ImageIcon, Trash2, FolderOpen, Loader2 } from "lucide-react";
import { UploadDropzone } from "../../../utils/uploadthing";
import { getAssets, deleteAsset } from "../../../actions/assets";

export function AssetsClient() {
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDelete = async (id: string) => {
    if (confirm("Hapus asset ini? (File di storage mungkin masih ada, tapi hilang dari sistem)")) {
      await deleteAsset(id);
      fetchAssets();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-8 shrink-0">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <FolderOpen className="h-7 w-7 text-brand-gold" />
            Asset Management
          </h1>
          <p className="text-slate-500 text-sm">
            Gudang file, foto produk, size chart, dan template untuk dikirim ke pelanggan.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            {/* Upload Area */}
            <div className="p-6 border-b border-slate-200 bg-slate-50/50">
              <UploadDropzone
                endpoint="assetUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    fetchAssets();
                    alert("Upload berhasil!");
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
                appearance={{
                  container: "cursor-pointer border-brand-gold/20 hover:border-brand-gold/50 transition-colors",
                  button: "bg-slate-800 text-white hover:bg-slate-900 cursor-pointer",
                  label: "text-brand-gold font-bold hover:text-brand-gold-dark",
                  allowedContent: "text-slate-500",
                  uploadIcon: "text-slate-800"
                }}
              />
            </div>

            {/* Grid Assets */}
            <div className="flex-1 overflow-auto p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Aset Tersimpan</h3>
              
              {isLoading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                </div>
              ) : assets.length === 0 ? (
                <div className="text-center p-8 text-slate-500">
                  Belum ada asset tersimpan.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {assets.map((asset) => (
                    <div key={asset.id} className="group border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
                      
                      {/* Thumbnail Placeholder */}
                      <div className="aspect-square bg-slate-100 flex items-center justify-center relative">
                        {asset.type === "image" ? (
                          <img src={asset.url} alt={asset.name} className="object-cover w-full h-full" />
                        ) : (
                          <FileText className="h-12 w-12 text-red-300" />
                        )}
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <a href={asset.url} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-white text-slate-800 text-xs font-bold rounded-lg hover:bg-brand-gold hover:text-white transition-colors cursor-pointer">
                            Lihat
                          </a>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3 bg-white flex justify-between items-start">
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-bold text-slate-800 truncate" title={asset.name}>
                            {asset.name}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{asset.size}</p>
                        </div>
                        <button onClick={() => handleDelete(asset.id)} className="text-slate-400 hover:text-red-500 cursor-pointer shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
