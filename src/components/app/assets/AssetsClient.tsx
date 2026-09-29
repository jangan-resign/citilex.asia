"use client";

import { UploadCloud, FileText, Image as ImageIcon, MoreVertical, FolderOpen } from "lucide-react";

export function AssetsClient() {
  const dummyAssets = [
    { id: 1, type: "image", name: "Katalog Warna Sablon 2026.png", size: "2.4 MB" },
    { id: 2, type: "pdf", name: "Size Chart Kaos Dewasa.pdf", size: "850 KB" },
    { id: 3, type: "image", name: "Contoh Bordir Polo.jpg", size: "1.2 MB" },
    { id: 4, type: "pdf", name: "Pricelist Grosir.pdf", size: "1.5 MB" },
  ];

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
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-brand-gold transition-colors cursor-pointer group">
                <div className="h-12 w-12 rounded-full bg-brand-gold-light/30 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Upload Asset Baru</h3>
                <p className="text-sm text-slate-500 mb-4 max-w-md">
                  Drag and drop file di sini, atau klik untuk memilih file dari komputermu. Mendukung gambar (JPG, PNG) dan dokumen (PDF).
                </p>
                <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors pointer-events-none">
                  Pilih File
                </button>
              </div>
            </div>

            {/* Grid Assets */}
            <div className="flex-1 overflow-auto p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Aset Tersimpan</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {dummyAssets.map((asset) => (
                  <div key={asset.id} className="group border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
                    
                    {/* Thumbnail Placeholder */}
                    <div className="aspect-square bg-slate-100 flex items-center justify-center relative">
                      {asset.type === "image" ? (
                        <ImageIcon className="h-12 w-12 text-slate-300" />
                      ) : (
                        <FileText className="h-12 w-12 text-red-300" />
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="px-3 py-1.5 bg-white text-slate-800 text-xs font-bold rounded-lg hover:bg-brand-gold hover:text-white transition-colors cursor-pointer">
                          Lihat
                        </button>
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
                      <button className="text-slate-400 hover:text-slate-700 cursor-pointer shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
