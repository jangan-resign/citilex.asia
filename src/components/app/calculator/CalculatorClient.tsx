"use client";

import { useState, useEffect, useRef } from "react";
import { useFactoryData } from "../../providers/FactoryDataProvider";
import { calculateCombinedArea, evalOrientationDTF, getQtyColIndex } from "../../../lib/calculatorLogic";
import { Calculator as CalcIcon, FileText, Send, Scissors, PlusCircle, Trash2, ChevronDown, Search, Lock, Unlock, X, Ruler, Copy, MessageSquare, Handshake, Receipt, Minimize2, ChevronRight } from "lucide-react";
import { VisualEstimatorModal } from "./VisualEstimatorModal";
import { CustomSelect } from "@/src/components/ui/CustomSelect";

type SpotType = "DTF" | "RUBBER" | "PLASTISOL" | "BORDIR";

type CustomSpot = {
  id: string;
  type: SpotType;
  designW: number;
  designH: number;
  designColor: number;
  designDensity: number;
  designKepadatan: number;
  aspectRatio?: number;
  isLocked?: boolean;
  info?: string;
};

function useLocalStorageState<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setState(JSON.parse(item));
      }
    } catch (error) {
      console.warn("Error reading localStorage", error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn("Error setting localStorage", error);
    }
  };

  return [state, setValue];
}

function SearchableSelect({ options, value, onChange, disabled }: { options: string[], value: string, onChange: (v: string) => void, disabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className={`w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold flex justify-between items-center cursor-pointer min-h-[42px] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`block truncate ${value ? 'text-slate-900' : 'text-slate-500'}`}>{value || "Pilih warna..."}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand-gold' : 'text-slate-400'}`} />
      </div>
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 flex flex-col">
          <div className="p-2 border-b border-slate-100 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              className="w-full pl-8 p-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:border-brand-gold bg-slate-50"
              placeholder="Cari warna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1 p-1">
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text-slate-500 text-center">Tidak ditemukan</div>
            ) : (
              filtered.map(opt => (
                <div
                  key={opt}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-brand-gold/10 hover:text-brand-primary transition-colors block truncate cursor-pointer ${
                    value === opt ? 'bg-brand-gold/5 text-brand-primary font-medium' : 'text-slate-700'
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {opt}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}


export interface CalculatorClientProps {
  customerContext?: { id: string; name: string; qualification?: any };
  onClose?: () => void;
  onActionSelect?: (action: "add_to_lead", data: any) => void;
}

export function CalculatorClient({ customerContext, onClose, onActionSelect }: CalculatorClientProps = {}) {
  const { data } = useFactoryData();
  const {
    FABRIC_PRICES,
    FABRIC_YIELD,
    SEWING_COST,
    DTF_TIERS,
    MANUAL_SCREEN_PRINT_PRICES,
    EMBROIDERY_PRICES,
    FABRIC_COLORS_MAP,
    HARGA_RIB,
    DTF_CONFIG,
    BORDIR_FAKTOR_CUSTOM,
    MANUAL_SCREEN_PRINT_CONFIG,
    HARGA_BAJU_JADI = { "NSA Premium Cotton Polo 8100": 85000 },
    HARGA_AKSESORIS_POLO = {
      kerah: { standar: 4000, custom: 6000 },
      manset: { tanpa: 0, standar: 3500, custom: 5000 },
      saku: { tanpa: 0, tempel: 4000, dalam: 5300 },
      melet: { tanpa: 0, melet: 3500 }
    }
  } = data;

  // --- STATE: Product Type ---
  const [productType, setProductType] = useLocalStorageState<"KAOS" | "POLO">("calc_productType", "KAOS");

  // --- STATE: Basic Garment ---
  const [qty, setQty] = useLocalStorageState<number>("calc_qty", 100);
  const [material, setMaterial] = useLocalStorageState<string>("calc_material", "Cotton Combed 30S");
  const [model, setModel] = useLocalStorageState<string>("calc_model", "pendek");
  const [lengan, setLengan] = useLocalStorageState<string>("calc_lengan", "pendek");
  const [colorName, setColorName] = useLocalStorageState<string>("calc_colorName", "33 - Putih Netral");

  // --- STATE: Aksesoris Polo ---
  const [kerahPolo, setKerahPolo] = useLocalStorageState<"standar" | "custom">("calc_kerahPolo", "standar");
  const [mansetPolo, setMansetPolo] = useLocalStorageState<"tanpa" | "standar" | "custom">("calc_mansetPolo", "standar");
  const [sakuPolo, setSakuPolo] = useLocalStorageState<"tanpa" | "tempel" | "dalam">("calc_sakuPolo", "tanpa");
  const [meletPolo, setMeletPolo] = useLocalStorageState<"tanpa" | "melet">("calc_meletPolo", "tanpa");

  // --- STATE: Customizations (Multi-Spot) ---
  const [spots, setSpots] = useLocalStorageState<CustomSpot[]>("calc_spots", []);

  // --- STATE: Big Sizes (Jumbo) ---
  const [bigSizes, setBigSizes] = useLocalStorageState<{ size: string, qty: number, pricePerPcs: number }[]>("calc_bigSizes", []);

  // --- STATE: Aksesoris ---
  const [ribLeher, setRibLeher] = useLocalStorageState("calc_ribLeher", false);
  const [ribLengan, setRibLengan] = useLocalStorageState("calc_ribLengan", false);
  const [saku, setSaku] = useLocalStorageState("calc_saku", false);
  const [kerah, setKerah] = useLocalStorageState("calc_kerah", false);

  // --- STATE: AI ---
  const [isVisualModalOpen, setIsVisualModalOpen] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);

  // --- STATE: SPH Design ---


  // --- AUTO-FILL DARI KUALIFIKASI LEADS ---
  useEffect(() => {
    if (customerContext?.qualification) {
      const q = customerContext.qualification;

      // Auto-fill Product Type
      if (q.product) {
        const prod = q.product.toLowerCase();
        if (prod.includes("polo")) setProductType("POLO");
        else if (prod.includes("kaos")) setProductType("KAOS");
      }

      // Auto-fill Qty
      if (q.quantity) {
        const parsedQty = parseInt(q.quantity.replace(/\D/g, ''));
        if (!isNaN(parsedQty) && parsedQty > 0) {
          setQty(parsedQty);
        }
      }

      // Kita bisa expand mapping material dsb disini nanti
    }
  }, [customerContext?.id]); // Re-run jika ganti customer

  const handleVisualApply = (spotsData: any[]) => {
    const newSpots = spotsData.map(data => ({
      id: Math.random().toString(36).substring(7),
      ...data
    }));
    setSpots((prev: CustomSpot[]) => [...prev, ...newSpots]);
    setIsVisualModalOpen(false);
  };

  // --- CALCULATION LOGIC: KAIN & JAHIT ---
  const isRegular = model === "pendek";
  const isBajuJadi = material.startsWith("NSA");

  let hppKainPerPcs = 0;
  let hppJahitPerPcs = 0;
  let totalKg = 0;
  let jmlRoll = 0;
  let sisaKg = 0;
  let hargaRoll = 0;
  let hargaSisa = 0;

  let totalKainBiaya = 0;
  if (isBajuJadi) {
    hppKainPerPcs = HARGA_BAJU_JADI[material] || 0;
    // hppJahitPerPcs = 0
  } else {
    const baseYield = FABRIC_YIELD[material]?.[model] || 4;
    const yieldPendekBase = FABRIC_YIELD[material]?.["pendek"] || 5;
    const yieldLenganPilihan = FABRIC_YIELD[material]?.[lengan] || 5;
    const yieldPerKg = isRegular ? baseYield * (yieldLenganPilihan / yieldPendekBase) : baseYield;
    totalKg = qty / yieldPerKg;
    jmlRoll = Math.floor(totalKg / 25);
    sisaKg = totalKg % 25;

    const colorList = FABRIC_COLORS_MAP[material] || FABRIC_COLORS_MAP["Cotton Combed 30S"] || [];
    const colorCat = colorList.find(c => c.n === colorName)?.k || "P";
    const prices = FABRIC_PRICES[material]?.[colorCat] || { roll: 120500, grosir: 132500, ecer: 135500 };
    hargaRoll = prices.roll;
    hargaSisa = sisaKg > 5 ? prices.grosir : prices.ecer;

    totalKainBiaya = (jmlRoll * 25 * hargaRoll) + (sisaKg * hargaSisa);
    hppKainPerPcs = Math.round(totalKainBiaya / qty) || 0;

    const currentSewingCost = SEWING_COST[productType] || SEWING_COST["KAOS"];
    const jahitBase = currentSewingCost[model] || currentSewingCost["pendek"] || 4000;
    const jahitPendekBase = currentSewingCost["pendek"] || 4000;
    const jahitLenganPilihan = currentSewingCost[lengan] || currentSewingCost["pendek"] || 4000;
    const selisihLengan = isRegular ? jahitLenganPilihan - jahitPendekBase : 0;
    hppJahitPerPcs = jahitBase + selisihLengan;
  }

  // --- CALCULATION LOGIC: AKSESORIS ---
  let aksesorisBiaya = 0;
  let biayaRibLeher = 0, biayaRibLengan = 0, biayaSaku = 0, biayaKerah = 0;
  let kCost = 0, mCost = 0, sCost = 0, meletCost = 0;

  if (!isBajuJadi) {
    if (productType === "KAOS") {
      const hargaRib = HARGA_RIB[material] || { leher: 0, lengan: 0, saku: 0, kerah: 0 };
      biayaRibLeher = ribLeher ? (hargaRib.leher || 0) : 0;
      biayaRibLengan = ribLengan ? (hargaRib.lengan || 0) : 0;
      biayaSaku = saku ? (hargaRib.saku || 0) : 0;
      biayaKerah = kerah ? (hargaRib.kerah || 0) : 0;
      aksesorisBiaya = biayaRibLeher + biayaRibLengan + biayaSaku + biayaKerah;
    } else {
      kCost = HARGA_AKSESORIS_POLO.kerah[kerahPolo] || 0;
      mCost = HARGA_AKSESORIS_POLO.manset[mansetPolo] || 0;
      sCost = HARGA_AKSESORIS_POLO.saku[sakuPolo] || 0;
      meletCost = HARGA_AKSESORIS_POLO.melet[meletPolo] || 0;
      aksesorisBiaya = kCost + mCost + sCost + meletCost;
    }
  }

  const availableMaterials = productType === "KAOS"
    ? [
      ...Object.keys(FABRIC_PRICES).filter(m => !m.toLowerCase().includes("lacoste") && !m.toLowerCase().includes("pique")),
      ...Object.keys(HARGA_BAJU_JADI).filter(m => !m.toLowerCase().includes("polo"))
    ]
    : [
      ...Object.keys(FABRIC_PRICES).filter(m =>
        m.toLowerCase().includes("lacoste") ||
        m.toLowerCase().includes("cotton combed") ||
        m.toLowerCase().includes("pique")
      ),
      "NSA Premium Cotton Polo 8100"
    ];

  // --- PRE-CALCULATION FOR COMBINED SPOTS ---
  const rubberSpots = spots.filter(s => s.type === "RUBBER");
  const plastisolSpots = spots.filter(s => s.type === "PLASTISOL");
  const dtfSpots = spots.filter(s => s.type === "DTF");

  // Helper for manual screen print fits
  const checkFit = (w: number, h: number, maxW: number, maxH: number) => (w <= maxW && h <= maxH) || (w <= maxH && h <= maxW);

  // Rubber Combined
  const rubberArea = calculateCombinedArea(rubberSpots.map(s => ({ W: s.designW, H: s.designH })), 42);
  let rubberAreaCode = "A2";
  let isRubberExceeded = false;
  if (checkFit(rubberArea.width, rubberArea.height, 21, 29)) rubberAreaCode = "A4";
  else if (checkFit(rubberArea.width, rubberArea.height, 29, 42)) rubberAreaCode = "A3";
  else if (checkFit(rubberArea.width, rubberArea.height, 42, 59)) rubberAreaCode = "A2";
  else isRubberExceeded = true;

  const maxRubberColor = rubberSpots.length > 0 ? Math.max(...rubberSpots.map(s => s.designColor)) : 1;
  const rubberWarnaSearch = maxRubberColor > 1 ? 5 : 1;
  const rubberPriceList = MANUAL_SCREEN_PRINT_PRICES.filter(p => p.jenis === "RUBBER");
  const rubberFiltered = rubberPriceList.filter(p => p.ukuran === rubberAreaCode && p.warna === rubberWarnaSearch);
  const rubberMatch = rubberFiltered.find(p => qty >= p.min && qty <= p.max) || rubberFiltered[rubberFiltered.length - 1];
  let totalRubberPrice = isRubberExceeded ? 0 : (rubberMatch?.hargaDasar || 0);

  if (!isRubberExceeded && rubberSpots.length > MANUAL_SCREEN_PRINT_CONFIG.rubber.maxTitik) {
    totalRubberPrice += (rubberSpots.length - MANUAL_SCREEN_PRINT_CONFIG.rubber.maxTitik) * MANUAL_SCREEN_PRINT_CONFIG.rubber.dendaTitik;
  }
  if (!isRubberExceeded && maxRubberColor > MANUAL_SCREEN_PRINT_CONFIG.rubber.maxWarna) {
    totalRubberPrice += (maxRubberColor - MANUAL_SCREEN_PRINT_CONFIG.rubber.maxWarna) * MANUAL_SCREEN_PRINT_CONFIG.rubber.dendaWarna;
  }

  // Plastisol Combined
  const plastisolArea = calculateCombinedArea(plastisolSpots.map(s => ({ W: s.designW, H: s.designH })), 37);
  let plastisolAreaCode = "A2";
  let isPlastisolExceeded = false;

  if (checkFit(plastisolArea.width, plastisolArea.height, 31, 47)) plastisolAreaCode = "A3+";
  else if (checkFit(plastisolArea.width, plastisolArea.height, 37, 54)) plastisolAreaCode = "A2";
  else isPlastisolExceeded = true;

  const plastisolPriceList = MANUAL_SCREEN_PRINT_PRICES.filter(p => p.jenis === "PLASTISOL");
  const plastisolMatch = plastisolPriceList.find(p => p.ukuran === plastisolAreaCode && qty >= p.min && qty <= p.max) || plastisolPriceList[0];
  let totalPlastisolPrice = isPlastisolExceeded ? 0 : (plastisolMatch?.hargaDasar || 25000);
  const maxPlastisolColor = plastisolSpots.length > 0 ? Math.max(...plastisolSpots.map(s => s.designColor)) : 1;
  if (maxPlastisolColor > MANUAL_SCREEN_PRINT_CONFIG.plastisol.maxWarna) totalPlastisolPrice += (maxPlastisolColor - MANUAL_SCREEN_PRINT_CONFIG.plastisol.maxWarna) * MANUAL_SCREEN_PRINT_CONFIG.plastisol.dendaWarna;

  // DTF Combined
  const isDtfExceeded = dtfSpots.some(s => Math.min(s.designW, s.designH) > DTF_CONFIG.AC);
  const hasGlobalError = isRubberExceeded || isPlastisolExceeded || isDtfExceeded;

  let totalDtfPricePerPcs = 0;
  let totalDtfPanjang = 0;
  let dtfTierHarga = 0;
  if (dtfSpots.length > 0) {
    const cfg = DTF_CONFIG;
    let sumPj = 0;
    for (const spot of dtfSpots) {
      const normal = evalOrientationDTF(spot.designW, spot.designH, qty, cfg);
      const rotasi = evalOrientationDTF(spot.designH, spot.designW, qty, cfg);
      sumPj += Math.min(normal.pj, rotasi.pj);
    }
    totalDtfPanjang = sumPj;
    const tier = DTF_TIERS.find(t => sumPj <= t.max) || DTF_TIERS[DTF_TIERS.length - 1];
    dtfTierHarga = tier.harga;
    const totalDtfCostAll = sumPj * tier.harga;
    totalDtfPricePerPcs = Math.round(totalDtfCostAll / (qty || 1));
  }

  // Tracking flags to only show combined price on the first item
  let hasShownRubber = false;
  let hasShownPlastisol = false;
  let hasShownDtf = false;

  // --- CALCULATION LOGIC: SABLON / BORDIR (MULTI-SPOT) ---
  let totalHppCustomPerPcs = 0;
  const spotDetails = spots.map(spot => {
    let price = 0;
    let info = "";

    if (spot.type === "DTF") {
      if (!hasShownDtf) {
        price = totalDtfPricePerPcs;
        info = `DTF (Gabungan): ${Math.round(totalDtfPanjang)} cm @ Rp${dtfTierHarga}/cm`;
        hasShownDtf = true;
      } else {
        price = 0;
        info = `DTF: (Harga sudah digabung di titik DTF sebelumnya)`;
      }
    }
    else if (spot.type === "RUBBER") {
      if (!hasShownRubber) {
        price = totalRubberPrice;
        info = `Rubber Area ${rubberAreaCode} (Gabungan ${rubberSpots.length} Titik, ${maxRubberColor} Warna)`;
        hasShownRubber = true;
      } else {
        price = 0;
        info = `Rubber: (Harga sudah digabung di titik Rubber sebelumnya)`;
      }
    }
    else if (spot.type === "PLASTISOL") {
      if (!hasShownPlastisol) {
        price = totalPlastisolPrice;
        info = `Plastisol Area ${plastisolAreaCode} (Gabungan ${plastisolSpots.length} Titik, ${maxPlastisolColor} Warna)`;
        hasShownPlastisol = true;
      } else {
        price = 0;
        info = `Plastisol: (Harga sudah digabung di titik Plastisol sebelumnya)`;
      }
    }
    else if (spot.type === "BORDIR") {
      const kepadatanPercentage = spot.designKepadatan || 100;
      const stitches = Math.ceil(spot.designW * spot.designH * spot.designDensity * (kepadatanPercentage / 100));
      const colIdx = getQtyColIndex(qty);

      if (stitches > 10000) {
        const multiplier = BORDIR_FAKTOR_CUSTOM[colIdx];
        price = Math.round(stitches * multiplier);
      } else {
        const matchRow = EMBROIDERY_PRICES.find(r => stitches >= r.minS && stitches <= r.maxS) || EMBROIDERY_PRICES[0];
        price = matchRow.prices[colIdx];
      }
      info = `Bordir: ~${stitches.toLocaleString()} Stitches (${kepadatanPercentage}%)`;
    }

    totalHppCustomPerPcs += price;
    return { ...spot, price, info };
  });

  // --- CALCULATION LOGIC: BIG SIZES ---
  const totalBigSizeCost = bigSizes.reduce((sum, item) => sum + (item.qty * item.pricePerPcs), 0);

  // --- FINAL TOTALS ---
  const totalHppPerPcs = hppKainPerPcs + hppJahitPerPcs + aksesorisBiaya + totalHppCustomPerPcs;
  const grandTotal = (totalHppPerPcs * qty) + totalBigSizeCost;


  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-slate-50 md:overflow-hidden overflow-y-auto md:overflow-y-hidden relative">


      {/* LEFT COLUMN: INPUT FORM (ERP STYLE) */}
      <div className="w-full md:w-[55%] h-auto md:h-full overflow-y-visible md:overflow-y-auto p-4 md:p-8 border-b md:border-b-0 md:border-r border-slate-200 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="mb-8 relative flex items-start gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-3">
                <CalcIcon className="text-brand-gold h-6 w-6 md:h-8 md:w-8" />
                Calculator HPP & Harga Jual
              </h1>
              <p className="text-slate-500 mt-2 text-sm">HPP & Harga Jual Berdasarkan Garmen Dasar, Aksesoris, Sablon dan/atau Bordir.</p>
            </div>
          </div>

          <div className="mt-6 mb-8 flex items-center gap-4">
            <span className={`text-sm font-bold cursor-pointer ${productType === "KAOS" ? "text-brand-primary" : "text-slate-400"}`} onClick={() => { setProductType("KAOS"); setMaterial("Cotton Combed 30S"); }}>
              KAOS
            </span>

            <button
              type="button"
              onClick={() => {
                if (productType === "KAOS") {
                  setProductType("POLO");
                  setMaterial("Lacoste Pique 24s");
                } else {
                  setProductType("KAOS");
                  setMaterial("Cotton Combed 30S");
                }
              }}
              className={`relative inline-flex h-7 w-14 flex-shrink-0 items-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 ${productType === "POLO" ? "bg-slate-800" : "bg-slate-300"}`}
              style={{ borderRadius: '9999px' }}
            >
              <span
                className={`inline-block h-5 w-5 transform bg-white shadow-md transition-transform duration-200 ease-in-out ${productType === "POLO" ? "translate-x-8" : "translate-x-1"}`}
                style={{ borderRadius: '50%' }}
              />
            </button>

            <span className={`text-sm font-bold cursor-pointer ${productType === "POLO" ? "text-brand-primary" : "text-slate-400"}`} onClick={() => { setProductType("POLO"); setMaterial("Lacoste Pique 24s"); }}>
              POLO SHIRT
            </span>
          </div>

          <div className="space-y-6">

            {/* STEP 1: GARMENT DASAR */}
            <section className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">1. Spesifikasi Garmen Dasar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-1">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Qty Total (S-XL+Jumbo)</label>
                  <input type="number" min="1" value={qty === 0 ? "" : qty} onChange={(e) => setQty(e.target.value === "" ? 0 : Number(e.target.value))}
                    onBlur={() => { if (qty < 1) setQty(1); }}
                    className="w-full p-2 border border-slate-300 rounded focus:ring-brand-gold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Pola Badan</label>
                  <CustomSelect value={model} onChange={setModel}
                    options={Object.keys(SEWING_COST[productType] || SEWING_COST["KAOS"])
                      .filter(m => {
                        if (["panjang", "tigaperempat", "tujuhperlapan"].includes(m)) return false;
                        if (productType === "POLO" && ["croptop", "oversized", "boxy"].includes(m)) return false;
                        return true;
                      })
                      .map(m => ({ value: m, label: m === "pendek" ? "regular" : m }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Panjang Lengan</label>
                  {model === "pendek" ? (
                    <CustomSelect value={lengan} onChange={setLengan}
                      options={[
                        { value: "pendek", label: "Pendek" },
                        { value: "tigaperempat", label: "3/4" },
                        { value: "tujuhperlapan", label: "7/8" },
                        { value: "panjang", label: "Panjang" }
                      ]}
                    />
                  ) : (
                    <CustomSelect disabled value="bawaan" onChange={() => {}} options={[{value: "bawaan", label: "Bawaan Pola"}]} />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Bahan Baku (Kain)</label>
                  <CustomSelect value={material} onChange={(val) => {
                    setMaterial(val);
                    const list = FABRIC_COLORS_MAP[val] || FABRIC_COLORS_MAP["Cotton Combed 30S"];
                    if (!list.find(c => c.n === colorName)) {
                      setColorName(list[0].n);
                    }
                  }}
                    options={availableMaterials.map(m => ({ value: m, label: m }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Warna Kain</label>
                  <SearchableSelect
                    value={colorName}
                    onChange={setColorName}
                    disabled={isBajuJadi && !FABRIC_COLORS_MAP[material]}
                    options={((FABRIC_COLORS_MAP[material]) || (FABRIC_COLORS_MAP["Cotton Combed 30S"])).map(c => c.n)}
                  />
                </div>
              </div>

              {/* EXTRA SIZE JUMBO (Dipindah ke Garment Dasar) */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Addcost (Jumbo Size)</h4>
                  <button
                    onClick={() => setBigSizes([...bigSizes, { size: "2XL", qty: 0, pricePerPcs: 0 }])}
                    className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-600 bg-white border border-slate-300 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" /> Tambah
                  </button>
                </div>

                {bigSizes.length > 0 && (
                  <div className="space-y-3">
                    {bigSizes.map((bs, index) => (
                      <div key={index} className="flex items-end gap-2">
                        <div className="w-24">
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Size</label>
                          <CustomSelect
                            value={bs.size}
                            onChange={(val) => {
                              const newSizes = [...bigSizes];
                              newSizes[index].size = val;
                              setBigSizes(newSizes);
                            }}
                            options={["2XL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL", "9XL", "10XL"].map(s => ({ value: s, label: s }))}
                          />
                        </div>
                        <div className="w-20">
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Qty</label>
                          <input
                            type="text"
                            placeholder="Cth: 1"
                            value={bs.qty === 0 ? "" : bs.qty.toLocaleString('id-ID')}
                            onChange={(e) => {
                              const newSizes = [...bigSizes];
                              const val = e.target.value.replace(/\D/g, "");
                              newSizes[index].qty = val === "" ? 0 : Number(val);
                              setBigSizes(newSizes);
                            }}
                            className="w-full p-2 border border-slate-300 rounded text-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Rp</label>
                          <input
                            type="text"
                            placeholder="Cth: 15.000"
                            value={bs.pricePerPcs === 0 ? "" : bs.pricePerPcs.toLocaleString('id-ID')}
                            onChange={(e) => {
                              const newSizes = [...bigSizes];
                              const val = e.target.value.replace(/\D/g, "");
                              newSizes[index].pricePerPcs = val === "" ? 0 : Number(val);
                              setBigSizes(newSizes);
                            }}
                            className="w-full p-2 border border-slate-300 rounded text-sm"
                          />
                        </div>
                        <button
                          onClick={() => setBigSizes(bigSizes.filter((_, i) => i !== index))}
                          className="p-2 mb-0.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {bigSizes.length > 0 && (
                  <div className="mt-3 text-[10px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                    *Info: Dari total {qty} pcs pesanan, {bigSizes.reduce((a, b) => a + b.qty, 0)} pcs adalah ukuran Jumbo, sisa {qty - bigSizes.reduce((a, b) => a + b.qty, 0)} pcs ukuran standar S-XL.
                  </div>
                )}
              </div>
            </section>

            {/* STEP 1.5: AKSESORIS */}
            <section className={`p-5 border border-slate-200 rounded-xl bg-slate-50/50 ${isBajuJadi ? 'opacity-50 pointer-events-none' : ''}`}>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">2. Aksesoris Tambahan</h3>

              {productType === "KAOS" ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" checked={ribLeher} onChange={(e) => {
                      setRibLeher(e.target.checked);
                      if (e.target.checked) setKerah(false);
                    }} className="rounded accent-brand-gold w-4 h-4 cursor-pointer shrink-0" />
                    Rib Leher
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" checked={ribLengan} onChange={(e) => setRibLengan(e.target.checked)} className="rounded accent-brand-gold w-4 h-4 cursor-pointer shrink-0" />
                    Rib Lengan
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer whitespace-nowrap">
                    <input type="checkbox" checked={saku} onChange={(e) => setSaku(e.target.checked)} className="rounded accent-brand-gold w-4 h-4 cursor-pointer shrink-0" />
                    Saku
                  </label>
                  {/* <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={kerah} onChange={(e) => {
                      setKerah(e.target.checked);
                      if (e.target.checked) setRibLeher(false);
                    }} className="rounded text-brand-gold focus:ring-brand-gold w-4 h-4 cursor-pointer" />
                    Kerah
                  </label> */}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Kerah</label>
                    <CustomSelect value={kerahPolo} onChange={setKerahPolo as any}
                      options={[
                        { value: "standar", label: "Standar" },
                        { value: "custom", label: "Custom" }
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Manset</label>
                    <CustomSelect value={mansetPolo} onChange={setMansetPolo as any}
                      options={[
                        { value: "standar", label: "Standar" },
                        { value: "custom", label: "Custom" },
                        { value: "tanpa", label: "Tanpa Manset" }
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Saku</label>
                    <CustomSelect value={sakuPolo} onChange={setSakuPolo as any}
                      options={[
                        { value: "tanpa", label: "Tanpa Saku" },
                        { value: "tempel", label: "Saku Tempel" },
                        { value: "dalam", label: "Saku Dalam" }
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Melet</label>
                    <CustomSelect value={meletPolo} onChange={setMeletPolo as any}
                      options={[
                        { value: "melet", label: "Melet" },
                        { value: "tanpa", label: "Tanpa Melet" }
                      ]}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* STEP 2: CUSTOMISASI MULTI-SPOT */}
            <section className="p-5 border border-slate-200 rounded-xl bg-white relative">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider whitespace-nowrap">3. Sablon/Bordir</h3>
                <div className="flex flex-wrap justify-end gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setIsVisualModalOpen(true)}
                    className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r from-brand-gold to-yellow-600 px-2 sm:px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity shadow-sm shadow-brand-gold/30 cursor-pointer whitespace-nowrap">
                    <Ruler className="w-3 h-3 sm:w-4 sm:h-4" />
                    Visual Estimator
                  </button>
                  <button
                    onClick={() => {
                      setSpots([...spots, {
                        id: Math.random().toString(36).substring(7),
                        type: "DTF",
                        designW: 10,
                        designH: 10,
                        designColor: 1,
                        designDensity: 210,
                        designKepadatan: 100
                      }]);
                    }}
                    className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-white bg-slate-800 px-2 sm:px-3 py-1.5 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer whitespace-nowrap">
                    <PlusCircle className="w-3 h-3 sm:w-4 sm:h-4" /> Tambah Manual
                  </button>
                </div>
              </div>

              <VisualEstimatorModal
                isOpen={isVisualModalOpen}
                garmentType={productType === "POLO" ? "polo" : "kaos"}
                onClose={() => setIsVisualModalOpen(false)}
                onApply={handleVisualApply}
              />

              {spots.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm">
                  Kaos ini masih polosan. Klik "Visual Estimator" atau "Tambah Manual".
                </div>
              ) : (
                <div className="space-y-4">
                  {spots.map((spot, index) => (
                    <div key={spot.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative shadow-sm">
                      <button
                        onClick={() => setSpots(spots.filter(s => s.id !== spot.id))}
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="pr-8 mb-4">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                          <span>Teknik Titik {index + 1}</span>
                          {spot.info && <span className="px-2 py-0.5 bg-brand-gold/10 border border-brand-gold/30 text-yellow-700 rounded-full normal-case text-[10px]">{spot.info}</span>}
                        </label>
                        <CustomSelect
                          value={spot.type}
                          onChange={(val) => {
                            const newSpots = [...spots];
                            newSpots[index].type = val as SpotType;
                            setSpots(newSpots);
                          }}
                          options={[
                            { value: "DTF", label: "Sablon DTF" },
                            { value: "RUBBER", label: "Sablon Manual (Rubber)" },
                            { value: "PLASTISOL", label: "Sablon Manual (Plastisol)" },
                            { value: "BORDIR", label: "Bordir Komputer" }
                          ]}
                        />
                      </div>



                      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mb-4 items-end">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Lebar (cm)</label>
                          <input type="number" min="1" value={spot.designW === 0 ? "" : spot.designW}
                            onBlur={() => {
                              if (spot.designW < 1) {
                                const newSpots = [...spots];
                                newSpots[index].designW = 1;
                                if (spot.isLocked && spot.aspectRatio) newSpots[index].designH = Math.round((1 / spot.aspectRatio) * 10) / 10;
                                setSpots(newSpots);
                              }
                            }}
                            onChange={(e) => {
                              const newSpots = [...spots];
                              const newW = e.target.value === "" ? 0 : Number(e.target.value);
                              newSpots[index].designW = newW;
                              if (spot.isLocked && spot.aspectRatio) {
                                newSpots[index].designH = Math.round((newW / spot.aspectRatio) * 10) / 10;
                              }
                              setSpots(newSpots);
                            }}
                            className="w-full p-2 border border-slate-300 rounded text-sm" />
                        </div>

                        <div className="flex flex-col items-center justify-center pb-2">
                          <button
                            title={spot.isLocked ? "Rasio Terkunci" : "Rasio Bebas"}
                            onClick={() => {
                              const newSpots = [...spots];
                              if (!spot.isLocked && !spot.aspectRatio) {
                                newSpots[index].aspectRatio = spot.designH > 0 ? (spot.designW / spot.designH) : 1;
                              }
                              newSpots[index].isLocked = !spot.isLocked;
                              setSpots(newSpots);
                            }}
                            className={`p-1.5 rounded-full transition-colors cursor-pointer ${spot.isLocked ? 'bg-brand-gold/20 text-yellow-700' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                          >
                            {spot.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </button>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Tinggi (cm)</label>
                          <input type="number" min="1" value={spot.designH === 0 ? "" : spot.designH}
                            onBlur={() => {
                              if (spot.designH < 1) {
                                const newSpots = [...spots];
                                newSpots[index].designH = 1;
                                if (spot.isLocked && spot.aspectRatio) newSpots[index].designW = Math.round((1 * spot.aspectRatio) * 10) / 10;
                                setSpots(newSpots);
                              }
                            }}
                            onChange={(e) => {
                              const newSpots = [...spots];
                              const newH = e.target.value === "" ? 0 : Number(e.target.value);
                              newSpots[index].designH = newH;
                              if (spot.isLocked && spot.aspectRatio) {
                                newSpots[index].designW = Math.round((newH * spot.aspectRatio) * 10) / 10;
                              }
                              setSpots(newSpots);
                            }}
                            className="w-full p-2 border border-slate-300 rounded text-sm" />
                        </div>
                      </div>

                      {spot.type === "DTF" && Math.min(spot.designW, spot.designH) > DTF_CONFIG.AC && (
                        <div className="mb-4 text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                          ⚠️ Error: Desain terlalu besar! Lebar dan Tinggi desain tidak boleh sama-sama melebihi area cetak mesin ({DTF_CONFIG.AC} cm). Desain ini tidak akan muat diprint dan harus dipecah menjadi 2 titik terpisah.
                        </div>
                      )}

                      {spot.type === "RUBBER" && isRubberExceeded && (
                        <div className="mb-4 text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                          ⚠️ Error: Ukuran Terlalu Besar! Total gabungan desain Rubber Anda melebihi ukuran maksimal screen yang didukung (A2: 42x59cm).
                        </div>
                      )}

                      {spot.type === "PLASTISOL" && isPlastisolExceeded && (
                        <div className="mb-4 text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                          ⚠️ Error: Ukuran Terlalu Besar! Total gabungan desain Plastisol Anda melebihi ukuran maksimal screen yang didukung (A2: 37x54cm).
                        </div>
                      )}

                      {(spot.type === "RUBBER" || spot.type === "PLASTISOL") && (
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Jumlah Warna Solid</label>
                          <input type="number" min="1" value={spot.designColor === 0 ? "" : spot.designColor}
                            onBlur={() => {
                              if (spot.designColor < 1) {
                                const newSpots = [...spots];
                                newSpots[index].designColor = 1;
                                setSpots(newSpots);
                              }
                            }}
                            onChange={(e) => {
                              const newSpots = [...spots];
                              newSpots[index].designColor = e.target.value === "" ? 0 : Number(e.target.value);
                              setSpots(newSpots);
                            }}
                            className="w-full p-2 border border-slate-300 rounded text-sm" />
                        </div>
                      )}

                      {spot.type === "BORDIR" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Kerapatan Benang (Density)</label>
                            <select value={spot.designDensity}
                              onChange={(e) => {
                                const newSpots = [...spots];
                                newSpots[index].designDensity = Number(e.target.value) || 210;
                                setSpots(newSpots);
                              }}
                              className="w-full p-2 border border-slate-300 rounded text-sm cursor-pointer">
                              <option value="210">High (210)</option>
                              <option value="200">Medium (200)</option>
                              <option value="190">Low (190)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">% Kepadatan (1-100)</label>
                            <input type="number" min="1" max="100" value={spot.designKepadatan === 0 ? "" : (spot.designKepadatan || 100)}
                              onBlur={() => {
                                if (!spot.designKepadatan || spot.designKepadatan < 1) {
                                  const newSpots = [...spots];
                                  newSpots[index].designKepadatan = 100;
                                  setSpots(newSpots);
                                }
                              }}
                              onChange={(e) => {
                                const newSpots = [...spots];
                                newSpots[index].designKepadatan = e.target.value === "" ? 0 : Math.min(100, Number(e.target.value));
                                setSpots(newSpots);
                              }}
                              className="w-full p-2 border border-slate-300 rounded text-sm" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>



          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: HPP RECEIPT */}
      <div className="w-full md:w-[45%] h-auto md:h-full bg-slate-100 p-4 md:p-8 overflow-y-visible md:overflow-y-auto relative md:border-l border-slate-200">

        {hasGlobalError ? (
          <div className="bg-white border border-red-200 w-full max-w-md mx-auto rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center mt-4">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 text-3xl">
              ⚠️
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">Desain Terlalu Besar</h3>
            <p className="text-slate-500 text-sm">Ada ukuran desain yang melebihi batas maksimal mesin. Silakan perbaiki input ukuran (yang bertanda error merah di kolom kiri) untuk melihat hasil kalkulasi.</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 w-full max-w-md mx-auto rounded-2xl shadow-xl overflow-hidden flex flex-col z-10 text-slate-800 my-4">

            <div className="bg-slate-50 p-6 text-center border-b border-slate-200">
              <h2 className="text-xl font-bold tracking-widest uppercase text-brand-primary">RINGKASAN BIAYA</h2>
              <p className="text-slate-500 text-xs mt-1 font-mono">ESTIMASI HPP & REKOMENDASI HARGA JUAL</p>
            </div>

            <div className="p-6 flex-1 overflow-y-auto font-mono text-sm">

              {/* Kain & Jahit */}
              <div className="mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">1. Material & CMT</p>
                {isBajuJadi ? (
                  <div className="space-y-1 mb-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Base Baju Jadi</span>
                      <span>{material}</span>
                    </div>
                    <div className="flex justify-between text-brand-primary font-bold mt-2 pt-2 border-t border-slate-200">
                      <span>Harga Satuan / pcs</span>
                      <span>Rp {hppKainPerPcs.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1 mb-2">
                      <div className="flex justify-between text-slate-600">
                        <span>Kebutuhan Kain</span>
                        <span>{totalKg.toFixed(2)} Kg</span>
                      </div>
                      {jmlRoll > 0 && (
                        <div className="flex justify-between text-slate-500 text-xs pl-2">
                          <span>- {jmlRoll} Roll (x 25kg) <span className="text-[10px] text-slate-400">@ Rp {hargaRoll.toLocaleString('id-ID')}</span></span>
                          <span>Rp {(jmlRoll * 25 * hargaRoll).toLocaleString('id-ID')}</span>
                        </div>
                      )}
                      {sisaKg > 0 && (
                        <div className="flex justify-between text-slate-500 text-xs pl-2">
                          <span>- {sisaKg.toFixed(2)} Kg (Ecer) <span className="text-[10px] text-slate-400">@ Rp {hargaSisa.toLocaleString('id-ID')}</span></span>
                          <span>Rp {(sisaKg * hargaSisa).toLocaleString('id-ID')}</span>
                        </div>
                      )}
                      {(jmlRoll > 0 && sisaKg > 0) && (
                        <div className="flex justify-between text-slate-600 text-xs pl-2 pt-1 mt-1 border-t border-slate-100">
                          <span>Total Harga Kain</span>
                          <span className="font-medium">Rp {totalKainBiaya.toLocaleString('id-ID')}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between text-brand-primary font-bold mb-1">
                      <span>HPP Dasar S-XL / pcs</span>
                      <span>Rp {hppKainPerPcs.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-brand-primary font-bold">
                      <span>Biaya Jahit (CMT) / pcs</span>
                      <span>Rp {hppJahitPerPcs.toLocaleString('id-ID')}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Aksesoris */}
              {aksesorisBiaya > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">2. Aksesoris Tambahan</p>
                  <div className="space-y-1 mb-2">
                    {productType === "KAOS" ? (
                      <>
                        {ribLeher && (
                          <div className="flex justify-between text-slate-600 text-xs pl-2">
                            <span>- Rib Leher</span>
                            <span>Rp {biayaRibLeher.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                        {ribLengan && (
                          <div className="flex justify-between text-slate-600 text-xs pl-2">
                            <span>- Rib Lengan</span>
                            <span>Rp {biayaRibLengan.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                        {saku && (
                          <div className="flex justify-between text-slate-600 text-xs pl-2">
                            <span>- Saku</span>
                            <span>Rp {biayaSaku.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                        {kerah && (
                          <div className="flex justify-between text-slate-600 text-xs pl-2">
                            <span>- Kerah</span>
                            <span>Rp {biayaKerah.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {kCost > 0 && (
                          <div className="flex justify-between text-slate-600 text-xs pl-2">
                            <span>- Kerah {kerahPolo}</span>
                            <span>Rp {kCost.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                        {mCost > 0 && (
                          <div className="flex justify-between text-slate-600 text-xs pl-2">
                            <span>- Manset {mansetPolo}</span>
                            <span>Rp {mCost.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                        {sCost > 0 && (
                          <div className="flex justify-between text-slate-600 text-xs pl-2">
                            <span>- Saku {sakuPolo}</span>
                            <span>Rp {sCost.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                        {meletCost > 0 && (
                          <div className="flex justify-between text-slate-600 text-xs pl-2">
                            <span>- Melet</span>
                            <span>Rp {meletCost.toLocaleString('id-ID')}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex justify-between text-brand-primary font-bold">
                    <span>Total Aksesoris / pcs</span>
                    <span>Rp {aksesorisBiaya.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}

              {/* Customisasi Multi-Spot */}
              {spotDetails.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{aksesorisBiaya > 0 ? "3" : "2"}. Customisasi ({spotDetails.length} Titik)</p>
                  <div className="space-y-3 mb-2">
                    {spotDetails.map((spot, i) => (
                      <div key={spot.id} className="border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                        <div className="flex justify-between text-slate-600 text-xs mb-1">
                          <span className="font-bold">Titik {i + 1} ({spot.type})</span>
                          <span>Rp {spot.price.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="text-slate-400 text-[10px]">
                          {spot.info}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-brand-primary font-bold mt-2 pt-2 border-t border-slate-200">
                    <span>Total Custom / pcs</span>
                    <span>Rp {totalHppCustomPerPcs.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}

              {/* Size Jumbo */}
              {bigSizes.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{aksesorisBiaya > 0 ? "4" : "3"}. Extra Size Jumbo</p>
                  <div className="space-y-1 mb-2">
                    {bigSizes.map((bs, i) => (
                      <div key={i} className="flex justify-between text-slate-600 text-xs pl-2">
                        <span>- {bs.size} ({bs.qty} pcs)</span>
                        <span>Rp {(bs.qty * bs.pricePerPcs).toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-brand-primary font-bold mt-2 pt-2 border-t border-slate-200">
                    <span>Total Extra Size</span>
                    <span>Rp {totalBigSizeCost.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}

              <div className="border-t border-dashed border-slate-200 my-4"></div>

              {/* TOTAL HPP BREAKDOWN */}
              <div className="mb-6 p-4 bg-slate-200/50 rounded-xl">
                {bigSizes.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-medium text-slate-600">
                      <span>Total HPP S-XL ({(qty - bigSizes.reduce((a, b) => a + b.qty, 0))} pcs)</span>
                      <div className="flex flex-col items-end">
                        <span>Rp {((qty - bigSizes.reduce((a, b) => a + b.qty, 0)) * totalHppPerPcs).toLocaleString('id-ID')}</span>
                        <span className="text-[10px] text-slate-400">@ Rp {Math.ceil(totalHppPerPcs).toLocaleString('id-ID')} / pcs</span>
                      </div>
                    </div>
                    {bigSizes.map((bs, index) => (
                      <div key={`hpp-jumbo-${index}`} className="flex justify-between items-center text-xs font-medium text-slate-600 mt-2">
                        <span>Total HPP {bs.size} ({bs.qty} pcs)</span>
                        <div className="flex flex-col items-end">
                          <span>Rp {Math.ceil(bs.qty * (totalHppPerPcs + bs.pricePerPcs)).toLocaleString('id-ID')}</span>
                          <span className="text-[10px] text-slate-400">@ Rp {Math.ceil(totalHppPerPcs + bs.pricePerPcs).toLocaleString('id-ID')} / pcs</span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-slate-300 my-1"></div>
                    <div className="flex justify-between items-center text-sm font-black text-slate-800">
                      <span>TOTAL HPP KESELURUHAN ({qty} PCS)</span>
                      <span>Rp {Math.ceil((qty * totalHppPerPcs) + totalBigSizeCost).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1 w-full">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">TOTAL HPP ({qty} PCS)</span>
                    <span className="text-lg font-black text-slate-800 mb-1">Rp {Math.ceil(qty * totalHppPerPcs).toLocaleString('id-ID')}</span>

                    <div className="w-full border-t border-slate-300 border-dashed max-w-[200px] opacity-60"></div>

                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">HPP / PCS</span>
                    <span className="text-sm font-bold text-brand-primary">Rp {Math.ceil(totalHppPerPcs).toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>

              {/* REKOMENDASI TIER HARGA JUAL */}
              <div className="mb-2">
                <p className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3">Rekomendasi Harga Jual (Margin)</p>
                <div className="space-y-2 relative">
                  {/* Overlay transparan buat click-away listener */}
                  {activeDropdownIndex !== null && (
                    <div
                      className="fixed inset-0 z-[55] cursor-default"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownIndex(null);
                      }}
                    />
                  )}

                  {[
                    { label: "TERTINGGI (47%)", margin: 0.53 },
                    { label: "TIER 4 (45%)", margin: 0.55 },
                    { label: "TIER 3 (43%)", margin: 0.57 },
                    { label: "TIER 2 (40%)", margin: 0.60 },
                    { label: "TIER 1 (37%)", margin: 0.63 },
                    { label: "TERENDAH (35%)", margin: 0.65 },
                  ].map((tier, i) => {
                    const isHighest = tier.label === "TERTINGGI (47%)";
                    const isLowest = tier.label === "TERENDAH (35%)";
                    const pricePerPcs = Math.ceil(totalHppPerPcs / tier.margin);

                    const baseQty = qty - bigSizes.reduce((a, b) => a + b.qty, 0);
                    let totalPrice = pricePerPcs * baseQty;
                    bigSizes.forEach(bs => {
                      const extraCostWithMargin = Math.ceil(bs.pricePerPcs / tier.margin);
                      const fullPrice = pricePerPcs + extraCostWithMargin;
                      totalPrice += fullPrice * bs.qty;
                    });

                    const sablonSpots = spots.filter((s: CustomSpot) => ["DTF", "RUBBER", "PLASTISOL"].includes(s.type));
                    const bordirSpots = spots.filter((s: CustomSpot) => s.type === "BORDIR");
                    let aksesorisTeks = "";
                    if (productType === "KAOS") {
                      aksesorisTeks = [ribLeher && "Rib Leher", ribLengan && "Rib Lengan", saku && "Saku"].filter(Boolean).join(", ") || "-";
                    } else {
                      const poloAks = [];
                      if (kerahPolo) poloAks.push(`Kerah ${kerahPolo}`);
                      if (mansetPolo && mansetPolo !== "tanpa") poloAks.push(`Manset ${mansetPolo}`);
                      if (sakuPolo && sakuPolo !== "tanpa") poloAks.push(`Saku ${sakuPolo}`);
                      if (meletPolo && meletPolo !== "tanpa") poloAks.push(`Dengan Melet`);
                      aksesorisTeks = poloAks.join(", ") || "-";
                    }

                    return (
                      <div key={i} className="relative mb-2">
                        <div
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (customerContext) {
                              const isConfirmed = window.confirm("Tambahkan ke Leads Qualification?");
                              if (isConfirmed) {
                                const modelLabel = model === "regular" ? "Regular" : model === "tunik" ? "Tunik" : model === "tunik_aline" ? "Tunik A-Line" : model === "paud" ? "PAUD" : model === "sd" ? "SD" : model === "raglan" ? "Raglan" : model;
                                const sablonTypes = Array.from(new Set(sablonSpots.map((s: any) => s.type === 'RUBBER' ? 'Rubber' : s.type === 'PLASTISOL' ? 'Plastisol' : 'DTF'))).join(', ');
                                const customText = `${sablonSpots.length > 0 ? sablonSpots.length + " Titik Sablon (" + sablonTypes + ")" : "Tanpa Sablon"}${bordirSpots.length > 0 ? ", " + bordirSpots.length + " Titik Bordir" : ""}`;

                                const lenganLabel = model === "pendek" ?
                                  (lengan === "tigaperempat" ? "3/4" : lengan === "tujuhperlapan" ? "7/8" : lengan === "panjang" ? "Panjang" : "Pendek")
                                  : "Bawaan Pola";

                                const specLines = [
                                  `Jenis Produk: ${productType === "KAOS" ? "Kaos" : "Polo Shirt"}`,
                                  `Pola Badan: ${modelLabel}`,
                                  `Panjang Lengan: ${lenganLabel}`,
                                  `Bahan Baku: ${material}`,
                                  `Warna Kain: ${colorName.replace(/^\d+\s*-\s*/, '')}`,
                                  `Aksesoris: ${aksesorisTeks}`,
                                  `Custom: ${customText}`
                                ];

                                const baseQty = qty - bigSizes.reduce((a, b) => a + b.qty, 0);
                                const itemsToAdd: any[] = [];

                                if (baseQty > 0) {
                                  itemsToAdd.push({
                                    name: `${productType === "KAOS" ? "Kaos" : "Polo"} - ${modelLabel}`,
                                    tierLabel: `${tier.label} (S-XL)`,
                                    qty: baseQty,
                                    pricePerPcs,
                                    totalPrice: pricePerPcs * baseQty,
                                    specs: specLines
                                  });
                                }

                                bigSizes.forEach(bs => {
                                  const extraCostWithMargin = Math.ceil(bs.pricePerPcs / tier.margin);
                                  const fullPrice = pricePerPcs + extraCostWithMargin;
                                  itemsToAdd.push({
                                    name: `${productType === "KAOS" ? "Kaos" : "Polo"} - ${modelLabel}`,
                                    tierLabel: `${tier.label} (${bs.size})`,
                                    qty: bs.qty,
                                    pricePerPcs: fullPrice,
                                    totalPrice: fullPrice * bs.qty,
                                    specs: [
                                      `Jenis Produk: ${productType === "KAOS" ? "Kaos" : "Polo Shirt"}`,
                                      `Size Khusus: ${bs.size}`,
                                      `Pola Badan: ${modelLabel}`,
                                      `Panjang Lengan: ${lenganLabel}`,
                                      `Bahan Baku: ${material}`,
                                      `Warna Kain: ${colorName.replace(/^\d+\s*-\s*/, '')}`,
                                      `Aksesoris: ${aksesorisTeks}`,
                                      `Custom: ${customText}`
                                    ]
                                  });
                                });

                                onActionSelect?.("add_to_lead", itemsToAdd);
                                alert("Hitunganmu berhasil ditambahkan ke lead qualifications. silahkan tutup (>) calculator dan cek panel kanan inbox.");
                              }
                            } else {
                              const baseQty = qty - bigSizes.reduce((a, b) => a + b.qty, 0);
                              let textToCopy = `Estimasi Harga:\n\n`;
                              if (baseQty > 0) {
                                textToCopy += `*Size S-XL (${baseQty} pcs)*\n@ Rp ${pricePerPcs.toLocaleString('id-ID')} /pcs\nTotal: Rp ${(pricePerPcs * baseQty).toLocaleString('id-ID')}\n\n`;
                              }
                              bigSizes.forEach(bs => {
                                const extraCostWithMargin = Math.ceil(bs.pricePerPcs / tier.margin);
                                const fullPrice = pricePerPcs + extraCostWithMargin;
                                textToCopy += `*Size ${bs.size} (${bs.qty} pcs)*\n@ Rp ${fullPrice.toLocaleString('id-ID')} /pcs\nTotal: Rp ${(fullPrice * bs.qty).toLocaleString('id-ID')}\n\n`;
                              });
                              textToCopy += `*Total Keseluruhan (Termasuk Jumbo): Rp ${totalPrice.toLocaleString('id-ID')}*`;

                              try {
                                await navigator.clipboard.writeText(textToCopy);
                                alert("Teks berhasil dicopy!");
                              } catch (err) {
                                console.error(err);
                                alert("Gagal copy text");
                              }
                            }
                          }}
                          className={`flex flex-col border transition-all cursor-pointer hover:border-brand-gold hover:shadow-md ${isHighest ? "bg-emerald-50 border-emerald-300 rounded-xl px-4 py-3 shadow-sm ring-1 ring-emerald-100" :
                            isLowest ? "bg-rose-50 border-rose-200 rounded-lg px-3 py-2" :
                              "bg-slate-50 border-slate-200 rounded-lg px-3 py-2"
                            } hover:border-brand-gold hover:ring-1 hover:ring-brand-gold`}
                        >
                          <div className="flex justify-between items-center w-full mb-1">
                            <span className={`${isHighest ? "text-sm text-emerald-800" : "text-xs text-slate-600"} font-bold`}>{tier.label}</span>
                            <div className="flex flex-col items-end text-right">
                              <span className={`${isHighest ? "text-[10px] text-emerald-600" : "text-[10px] text-slate-500"} uppercase font-semibold`}>Total Jual ({qty} Pcs)</span>
                              <span className={`font-black ${isHighest ? "text-emerald-700 text-lg sm:text-xl" : "text-brand-primary text-sm"}`}>
                                Rp {totalPrice.toLocaleString('id-ID')}
                              </span>
                            </div>
                          </div>

                          {bigSizes.length === 0 ? (
                            <div className={`flex justify-between items-center mt-1 pt-1 border-t ${isHighest ? "border-emerald-200/50" : isLowest ? "border-rose-200/50" : "border-slate-200/50"}`}>
                              <span className={`${isHighest ? "text-emerald-900" : "text-slate-600"} text-xs font-medium`}>S-XL ({qty} pcs)</span>
                              <div className="text-right">
                                <div className={`${isHighest ? "text-[10px] text-emerald-700" : "text-[10px] text-slate-500"}`}>@ Rp {pricePerPcs.toLocaleString('id-ID')} /pcs</div>
                                <div className={`${isHighest ? "text-xs text-emerald-950" : "text-xs text-slate-800"} font-bold`}>Rp {(pricePerPcs * qty).toLocaleString('id-ID')}</div>
                              </div>
                            </div>
                          ) : (
                            <div className={`flex flex-col gap-2 mt-1 pt-2 border-t ${isHighest ? "border-emerald-200/50" : isLowest ? "border-rose-200/50" : "border-slate-200/50"}`}>
                              <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                  <span className={`${isHighest ? "text-emerald-900" : "text-slate-600"} text-xs font-medium`}>S-XL ({qty - bigSizes.reduce((a, b) => a + b.qty, 0)} pcs)</span>
                                  <span className={`${isHighest ? "text-emerald-700" : "text-slate-500"} text-[10px]`}>@ Rp {pricePerPcs.toLocaleString('id-ID')}</span>
                                </div>
                                <span className={`${isHighest ? "text-emerald-950" : "text-slate-800"} text-xs font-bold`}>Rp {(pricePerPcs * (qty - bigSizes.reduce((a, b) => a + b.qty, 0))).toLocaleString('id-ID')}</span>
                              </div>
                              {bigSizes.map((bs, index) => {
                                const extraCostWithMargin = Math.ceil(bs.pricePerPcs / tier.margin);
                                const fullPrice = pricePerPcs + extraCostWithMargin;
                                return (
                                  <div key={`${bs.size}-${index}`} className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                      <span className={`${isHighest ? "text-emerald-900" : "text-slate-600"} text-xs font-medium`}>{bs.size} ({bs.qty} pcs)</span>
                                      <span className={`${isHighest ? "text-emerald-700" : "text-slate-500"} text-[10px]`}>@ Rp {fullPrice.toLocaleString('id-ID')}</span>
                                    </div>
                                    <span className={`${isHighest ? "text-emerald-950" : "text-slate-800"} text-xs font-bold`}>Rp {(fullPrice * bs.qty).toLocaleString('id-ID')}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
