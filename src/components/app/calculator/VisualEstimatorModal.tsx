"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { X, Ruler, Download, Plus, Trash2, Maximize2, Image as ImageIcon, Palette, FileText } from "lucide-react";
import { motion } from "motion/react";
import * as htmlToImage from "html-to-image";
import { removeBackground } from "@imgly/background-removal";

type PrintMethod = "DTF" | "RUBBER" | "PLASTISOL" | "BORDIR";

interface LogoItem {
  id: string;
  url: string;
  method: PrintMethod;
  widthPx: number; // current pixel width in canvas
  naturalRatio: number;
  perspective: string; // The perspective it was added on
  blendMode?: 'normal' | 'multiply' | 'screen';
  originalUrl?: string;
}

interface VisualEstimatorModalProps {
  isOpen: boolean;
  garmentType: "kaos" | "polo";
  onClose: () => void;
  onApply: (spotsData: any[]) => void;
}

export function VisualEstimatorModal({ isOpen, garmentType, onClose, onApply }: VisualEstimatorModalProps) {
  // Config
  const TSHIRT_REF_HEIGHT_CM = 72;
  const VISUAL_OCCUPANCY = 0.9; // The t-shirt body occupies ~90% of the canvas height

  // States
  const [perspective, setPerspective] = useState<"depan" | "belakang" | "lengan-kiri" | "lengan-kanan">("depan");
  const [garmentColor, setGarmentColor] = useState<string>("#ffffff");
  const [logos, setLogos] = useState<LogoItem[]>([]);
  const [activeLogoId, setActiveLogoId] = useState<string | null>(null);

  // Upload Prompt State
  const [pendingUploadUrl, setPendingUploadUrl] = useState<string | null>(null);
  const [pendingUploadRatio, setPendingUploadRatio] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download Prompt State
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  const [isCapturingWithOverlay, setIsCapturingWithOverlay] = useState(false);
  const [isRemovingBgId, setIsRemovingBgId] = useState<string | null>(null);

  // Canvas Refs
  const canvasRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(500);

  // Math
  const cmPerPixel = TSHIRT_REF_HEIGHT_CM / (containerHeight * VISUAL_OCCUPANCY);

  useEffect(() => {
    if (isOpen) {
      setLogos([]);
      setActiveLogoId(null);
      setPendingUploadUrl(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (canvasRef.current) {
      setContainerHeight(canvasRef.current.clientHeight);
    }
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerHeight(entries[0].contentRect.height);
      }
    });
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  // --- MOCKUP IMAGE RESOLUTION ---
  const getMockupUrl = () => {
    return `/mockup/${garmentType}-${perspective}.png`;
  };

  // --- UPLOAD LOGIC ---
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      setPendingUploadRatio(ratio);
      setPendingUploadUrl(url); // triggers prompt
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    img.src = url;
  };

  const confirmUpload = (method: PrintMethod) => {
    if (!pendingUploadUrl) return;
    const initialWidthPx = containerHeight * 0.2; // 20% of canvas height as initial size

    setLogos(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      url: pendingUploadUrl,
      method,
      naturalRatio: pendingUploadRatio,
      widthPx: initialWidthPx,
      perspective,
      blendMode: 'normal',
      originalUrl: pendingUploadUrl
    }]);
    setPendingUploadUrl(null);
  };

  const removeBgAI = async (id: string, url: string) => {
    try {
      setIsRemovingBgId(id);
      const blob = await removeBackground(url);
      const transparentUrl = URL.createObjectURL(blob);
      setLogos(prev => prev.map(l => l.id === id ? { ...l, url: transparentUrl, blendMode: 'normal' } : l));
    } catch (error) {
      console.error("Gagal menghapus background:", error);
      alert("Gagal menghapus background. Coba lagi.");
    } finally {
      setIsRemovingBgId(null);
    }
  };

  const updateBlendMode = (id: string, blendMode: 'normal' | 'multiply' | 'screen') => {
    setLogos(prev => prev.map(l => l.id === id ? { ...l, blendMode } : l));
  };

  // --- ACTIONS ---
  const handleDeleteLogo = (id: string) => {
    setLogos(prev => prev.filter(l => l.id !== id));
    if (activeLogoId === id) setActiveLogoId(null);
  };

  const handleApply = () => {
    const spots = logos.map(logo => {
      // 2% Shrinkage / Margin Tolerance implementation (secretly calculated)
      const rawCmWidth = logo.widthPx * cmPerPixel;
      const rawCmHeight = (logo.widthPx / logo.naturalRatio) * cmPerPixel;

      const finalCmWidth = Math.round((rawCmWidth * 0.98) * 10) / 10;
      const finalCmHeight = Math.round((rawCmHeight * 0.98) * 10) / 10;

      const perspekInfo = logo.perspective.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

      return {
        type: logo.method,
        designW: finalCmWidth,
        designH: finalCmHeight,
        aspectRatio: logo.naturalRatio,
        designColor: logo.method === "DTF" ? 99 : 1, // assumption
        designDensity: 210,
        designKepadatan: 100,
        info: `Posisi: ${perspekInfo} (Mockup)`,
        isLocked: true
      };
    });

    onApply(spots);
  };

  const handleApplyClick = () => {
    if (window.confirm("Yakin mau terapkan langsung ukurannya? Nggak tambah gambar lain dulu?")) {
      handleApply();
    }
  };

  const handleCloseClick = () => {
    if (window.confirm("Yakin mau tutup Visual Estimator? Semua pengaturan dan gambar yang belum diterapkan akan hilang lho.")) {
      onClose();
    }
  };

  const downloadMockup = async (withOverlay: boolean) => {
    setShowDownloadPrompt(false);
    if (!canvasRef.current) return;
    setActiveLogoId(null); // deselect to hide handles

    if (withOverlay) {
      setIsCapturingWithOverlay(true);
    }

    // Give react time to re-render without handles (and with overlay if requested)
    setTimeout(async () => {
      try {
        const dataUrl = await htmlToImage.toPng(canvasRef.current!, {
          quality: 1,
          pixelRatio: 2 // High res
        });
        const link = document.createElement("a");
        link.download = `Mockup-${garmentType}-${perspective}${withOverlay ? '-Spec' : ''}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Gagal export", err);
        alert("Gagal mengunduh mockup.");
      } finally {
        setIsCapturingWithOverlay(false);
      }
    }, 150); // Increased slightly to ensure full DOM paint
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-[100] inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 md:p-8">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
        <button onClick={handleCloseClick} className="absolute top-3 right-3 z-50 p-1.5 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        {/* LEFT: KANVAS */}
        <div className="flex-1 bg-slate-50 relative flex flex-col overflow-hidden">
          {/* Top Toolbar (Perspektif) */}
          <div className="z-20 flex bg-white/90 backdrop-blur shadow-sm p-3 border-b border-slate-200 gap-2 overflow-x-auto">
            {["depan", "belakang", "lengan-kanan", "lengan-kiri"].map(p => (
              <button
                key={p}
                onClick={() => setPerspective(p as any)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full capitalize whitespace-nowrap transition-colors cursor-pointer ${perspective === p ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {p.replace("-", " ")}
              </button>
            ))}
            <div className="flex-1"></div>
            <button onClick={() => setShowDownloadPrompt(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-full shadow-sm hover:bg-slate-900 cursor-pointer transition-colors">
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>

          {/* Canvas Area */}
          <div
            ref={canvasRef}
            className="w-full h-full relative flex justify-center items-center overflow-hidden bg-slate-100"
            onClick={(e) => {
              if (e.target === canvasRef.current) setActiveLogoId(null);
            }}
          >
            {/* --- SPEC OVERLAY (Only visible during screenshot) --- */}
            {isCapturingWithOverlay && (
              <>
                <div className="absolute top-6 left-6 z-[60]">
                  <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm mb-1 [text-shadow:0_0_4px_#fff,0_0_6px_#fff]">BAGIAN {perspective.replace('-', ' ')}</h3>
                </div>

                <div className="absolute bottom-6 left-6 z-[60] w-36">
                  <h4 className="font-black text-slate-800 text-[11px] uppercase mb-2 [text-shadow:0_0_4px_#fff,0_0_6px_#fff]">Spesifikasi Cetak</h4>
                  <div className="flex flex-col gap-3 mb-3">
                    {logos.filter(l => l.perspective === perspective).length === 0 ? (
                      <p className="text-[10px] text-slate-700 font-bold italic [text-shadow:0_0_4px_#fff,0_0_6px_#fff]">Tidak ada titik cetak.</p>
                    ) : (
                      logos.filter(l => l.perspective === perspective).map((l) => {
                        const globalIndex = logos.findIndex(lg => lg.id === l.id) + 1;
                        return (
                          <div key={l.id} className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-800 text-[10px] [text-shadow:0_0_4px_#fff,0_0_6px_#fff]">Titik {globalIndex} ({l.method})</span>
                            <span className="font-mono text-slate-800 font-bold text-[10px] [text-shadow:0_0_4px_#fff,0_0_6px_#fff]">
                              {(l.widthPx * cmPerPixel).toFixed(1)} x {((l.widthPx / l.naturalRatio) * cmPerPixel).toFixed(1)} cm
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <p className="text-[8px] text-slate-700 font-bold leading-tight [text-shadow:0_0_4px_#fff,0_0_6px_#fff]">
                    *Estimasi pra-desain. Toleransi ukuran berlaku.
                  </p>
                </div>
              </>
            )}

            {/* The Garment Base Color & Image */}
            <div className="relative w-full h-full flex justify-center items-center pointer-events-none">
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundColor: garmentColor,
                  WebkitMaskImage: `url(${getMockupUrl()})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskImage: `url(${getMockupUrl()})`,
                  maskSize: 'contain',
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat'
                }}
              />
              <img
                src={getMockupUrl()}
                className="absolute inset-0 w-full h-full object-contain mix-blend-multiply z-0 pointer-events-none opacity-90"
                alt="Mockup Base"
              />
            </div>

            {/* Logos rendering */}
            {logos.map(logo => {
              const isActive = activeLogoId === logo.id;
              const isVisible = logo.perspective === perspective;
              const pxH = logo.widthPx / logo.naturalRatio;

              return (
                <motion.div
                  key={logo.id}
                  drag={isVisible}
                  dragConstraints={canvasRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onPointerDown={() => isVisible && setActiveLogoId(logo.id)}
                  className={`absolute z-10 group ${isVisible ? 'cursor-move' : ''}`}
                  style={{
                    width: logo.widthPx,
                    height: pxH,
                    border: isActive ? '1.5px dashed #0056b3' : '1.5px dashed transparent',
                    visibility: isVisible ? 'visible' : 'hidden',
                    pointerEvents: isVisible ? 'auto' : 'none'
                  }}
                >
                  <img src={logo.url} className="w-full h-full object-contain pointer-events-none drop-shadow-sm" style={{ mixBlendMode: logo.blendMode || 'normal' }} />

                  {isActive && (
                    <>
                      {/* Resize Handle */}
                      <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white border border-slate-300 shadow-md rounded-full flex justify-center items-center cursor-se-resize z-20"
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          const startX = e.clientX;
                          const startWidth = logo.widthPx;

                          const handlePointerMove = (ev: PointerEvent) => {
                            const dx = ev.clientX - startX;
                            const newW = Math.max(30, startWidth + dx);
                            setLogos(prev => prev.map(l => l.id === logo.id ? { ...l, widthPx: newW } : l));
                          };
                          const handlePointerUp = () => {
                            window.removeEventListener('pointermove', handlePointerMove);
                            window.removeEventListener('pointerup', handlePointerUp);
                          };
                          window.addEventListener('pointermove', handlePointerMove);
                          window.addEventListener('pointerup', handlePointerUp);
                        }}
                      >
                        <Maximize2 className="w-3 h-3 text-brand-primary rotate-90" />
                      </div>

                      {/* Delete Handle */}
                      <button
                        onPointerDown={(e) => { e.stopPropagation(); handleDeleteLogo(logo.id); }}
                        className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white shadow-md rounded-full flex justify-center items-center z-20 hover:bg-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      {/* Size Badge */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap opacity-80 pointer-events-none">
                        {(logo.widthPx * cmPerPixel).toFixed(1)} x {((logo.widthPx / logo.naturalRatio) * cmPerPixel).toFixed(1)} cm
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: PANEL CONTROLS */}
        <div className="w-full md:w-80 bg-white border-l border-slate-100 flex flex-col h-full z-30 shadow-[-10px_0_30px_rgba(0,0,0,0.03)]">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-black text-xl text-slate-800 flex items-center gap-2 mb-1">
              <Ruler className="text-brand-gold w-5 h-5" /> Visual Estimator
            </h2>
            <p className="text-xs text-slate-500">Berbasis Mockup dan Scale Ruler "Real Time"</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Warna Dasar</label>

              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Palette className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={garmentColor.replace('#', '')}
                  onChange={e => {
                    const val = e.target.value;
                    setGarmentColor(val.startsWith('#') ? val : `#${val}`);
                  }}
                  className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm font-mono text-slate-700 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 uppercase"
                  placeholder="Ketik HEX (cth: FFFFFF)"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                {/* Rainbow Custom Color Button ala Canva */}
                <div className="relative w-9 h-9 rounded-full flex-shrink-0 cursor-pointer shadow-sm hover:scale-110 transition-transform flex justify-center items-center overflow-hidden"
                  style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)', borderRadius: '9999px' }}>
                  <div className="w-5 h-5 bg-white rounded-full flex justify-center items-center shadow-sm pointer-events-none" style={{ borderRadius: '9999px' }}>
                    <Plus className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <input
                    type="color"
                    value={garmentColor}
                    onChange={e => setGarmentColor(e.target.value)}
                    className="absolute inset-0 w-[200%] h-[200%] opacity-0 cursor-pointer z-10 -translate-x-1/4 -translate-y-1/4"
                    title="Pilih warna custom"
                  />
                </div>

                {['#ffffff', '#1a1a1a', '#dc2626', '#1d4ed8', '#15803d', '#facc15', '#6b21a8', '#f97316'].map(c => {
                  const isActive = garmentColor.toLowerCase() === c.toLowerCase();
                  return (
                    <div key={c} className="w-9 h-9 flex justify-center items-center">
                      <button
                        onClick={() => setGarmentColor(c)}
                        className={`rounded-full transition-all cursor-pointer hover:scale-110 ${isActive ? 'w-8 h-8 ring-2 ring-offset-2 ring-brand-gold shadow-sm' : 'w-9 h-9 border border-slate-200'}`}
                        style={{ backgroundColor: c, borderRadius: '9999px' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Logos List */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Daftar Titik</label>
                <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{logos.length} Item</span>
              </div>

              <div className="space-y-2 mb-4">
                {logos.length === 0 && (
                  <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                    <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Belum ada titik di kanvas.</p>
                  </div>
                )}
                {logos.map((logo, i) => (
                  <div
                    key={logo.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${activeLogoId === logo.id ? 'border-brand-primary bg-brand-primary/5 shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
                    onClick={() => setActiveLogoId(logo.id)}
                  >
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={logo.url} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">Titik {i + 1}</p>
                      <p className="text-[10px] font-mono text-slate-500 mb-2">
                        {(logo.widthPx * cmPerPixel).toFixed(1)} x {((logo.widthPx / logo.naturalRatio) * cmPerPixel).toFixed(1)} cm
                      </p>
                      <div className="flex">
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeBgAI(logo.id, logo.originalUrl || logo.url); }} 
                          disabled={isRemovingBgId === logo.id}
                          className="text-[10px] px-2 py-1 rounded font-bold transition-colors bg-brand-gold/10 text-yellow-700 hover:bg-brand-gold hover:text-white disabled:opacity-50 flex items-center gap-1"
                        >
                          {isRemovingBgId === logo.id ? "⏳ Memproses..." : "✨ AI Remove BG"}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-brand-primary text-white rounded uppercase">{logo.method}</span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded uppercase">{logo.perspective.replace('-', ' ')}</span>
                    </div>
                  </div>
                ))}
              </div>

              <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/svg+xml, image/webp" onChange={handleFileChange} />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 border-2 border-dashed border-brand-primary/50 text-brand-primary font-bold text-sm rounded-xl hover:bg-brand-primary/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Tambah Gambar
              </button>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <button
              onClick={handleApplyClick}
              disabled={logos.length === 0}
              className="w-full bg-slate-800 text-white font-bold py-4 rounded-xl shadow-sm hover:bg-slate-900 disabled:opacity-50 disabled:shadow-none transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Ruler className="w-4 h-4" /> Terapkan ({logos.length} Titik Cetak)
            </button>
          </div>
        </div>

        {/* METHOD PROMPT MODAL */}
        {pendingUploadUrl && (
          <div className="absolute inset-0 z-[60] bg-white/90 backdrop-blur flex justify-center items-center p-4">
            <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 max-w-sm w-full text-center">
              <h3 className="text-lg font-black text-slate-800 mb-2">Teknik Cetak Gambar</h3>
              <p className="text-sm text-slate-500 mb-6">Pilih jenis teknik sablon/bordir untuk gambar ini agar harganya sesuai.</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {(["DTF", "RUBBER", "PLASTISOL", "BORDIR"] as PrintMethod[]).map(m => (
                  <button
                    key={m}
                    onClick={() => confirmUpload(m)}
                    className="py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary transition-all cursor-pointer"
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPendingUploadUrl(null)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold underline cursor-pointer"
              >Cancel</button>
            </div>
          </div>
        )}

        {/* DOWNLOAD PROMPT MODAL */}
        {showDownloadPrompt && (
          <div className="absolute inset-0 z-[70] bg-white/90 backdrop-blur flex justify-center items-center p-4">
            <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 max-w-sm w-full text-center">
              <h3 className="text-lg font-black text-slate-800 mb-2">Pilih Template</h3>
              <p className="text-sm text-slate-500 mb-6">Pilih jenis template gambar download.</p>

              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={() => downloadMockup(true)}
                  className="py-3 px-4 border-2 border-brand-gold bg-brand-gold/10 rounded-xl font-bold text-sm text-yellow-700 hover:bg-brand-gold hover:text-white transition-all cursor-pointer flex flex-col items-center justify-center gap-1 group"
                >
                  <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-brand-gold group-hover:text-white transition-colors" /> Dengan Keterangan Spesifikasi</span>
                </button>
                <button
                  onClick={() => downloadMockup(false)}
                  className="py-3 px-4 border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:border-brand-gold hover:text-yellow-700 hover:bg-brand-gold/5 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <ImageIcon className="w-4 h-4 text-slate-400 group-hover:text-brand-gold transition-colors" /> Hanya Gambar Mockup
                </button>
              </div>

              <button
                onClick={() => setShowDownloadPrompt(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold underline cursor-pointer"
              >Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
