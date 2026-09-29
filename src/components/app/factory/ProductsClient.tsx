"use client";

import { useState } from "react";
import { Scissors, Printer, PenTool, Hash, Factory } from "lucide-react";
import { FabricTab } from "./FactoryTabs/FabricTab";
import { DtfTab } from "./FactoryTabs/DtfTab";
import { ManualPrintTab } from "./FactoryTabs/ManualPrintTab";
import { EmbroideryTab } from "./FactoryTabs/EmbroideryTab";
import { BahanJadiTab } from "./FactoryTabs/BahanJadiTab";

type Tab = "fabric" | "polo" | "dtf" | "manual" | "embroidery";

export function ProductsClient({ isReadOnly = false }: { isReadOnly?: boolean }) {
  const [activeTab, setActiveTab] = useState<Tab>("fabric");

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      {/* Header & Tabs */}
      <div className="bg-white border-b border-slate-200 px-8 pt-8 shrink-0">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Factory className="h-7 w-7 text-brand-gold" />
            Pabrik HPP Master Data
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Pusat kendali algoritma produksi. Atur harga kain per Kg, matriks biaya jahit, kalibrasi DTF, sablon manual, dan bordir.
          </p>

          <div className="flex gap-8 overflow-x-auto scrollbar-hide border-b border-slate-200">
            <TabButton 
              active={activeTab === "fabric"} 
              onClick={() => setActiveTab("fabric")}
              icon={<Scissors className="h-4 w-4" />}
              label="Kain & Model (CMT)"
            />
            <TabButton 
              active={activeTab === "polo"} 
              onClick={() => setActiveTab("polo")}
              icon={<Scissors className="h-4 w-4" />}
              label="Bahan Jadi (polosan)"
            />
            <TabButton 
              active={activeTab === "dtf"} 
              onClick={() => setActiveTab("dtf")}
              icon={<Printer className="h-4 w-4" />}
              label="Sablon DTF"
            />
            <TabButton 
              active={activeTab === "manual"} 
              onClick={() => setActiveTab("manual")}
              icon={<PenTool className="h-4 w-4" />}
              label="Sablon Manual"
            />
            <TabButton 
              active={activeTab === "embroidery"} 
              onClick={() => setActiveTab("embroidery")}
              icon={<Hash className="h-4 w-4" />}
              label="Bordir Komputer"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto h-full">
          {activeTab === "fabric" && <FabricTab isReadOnly={isReadOnly} />}
          {activeTab === "polo" && <BahanJadiTab isReadOnly={isReadOnly} />}
          {activeTab === "dtf" && <DtfTab isReadOnly={isReadOnly} />}
          {activeTab === "manual" && <ManualPrintTab isReadOnly={isReadOnly} />}
          {activeTab === "embroidery" && <EmbroideryTab isReadOnly={isReadOnly} />}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 pb-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
        active 
          ? "border-brand-gold text-brand-gold" 
          : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
