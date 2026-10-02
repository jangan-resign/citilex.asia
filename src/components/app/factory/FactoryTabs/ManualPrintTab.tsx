import { Save } from "lucide-react";
import { useState } from "react";
import { useFactoryData } from "../../../providers/FactoryDataProvider";

export function ManualPrintTab({ isReadOnly = false }: { isReadOnly?: boolean }) {
  const { data, setData } = useFactoryData();
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState({
    MANUAL_SCREEN_PRINT_PRICES: data.MANUAL_SCREEN_PRINT_PRICES,
    MANUAL_SCREEN_PRINT_CONFIG: data.MANUAL_SCREEN_PRINT_CONFIG
  });

  const handleSave = () => {
    if (isEditing) {
      setData({ ...data, ...localData });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setLocalData({
      MANUAL_SCREEN_PRINT_PRICES: data.MANUAL_SCREEN_PRINT_PRICES,
      MANUAL_SCREEN_PRINT_CONFIG: data.MANUAL_SCREEN_PRINT_CONFIG
    });
    setIsEditing(false);
  };

  const updatePrice = (idx: number, field: string, value: number) => {
    const newPrices = [...localData.MANUAL_SCREEN_PRINT_PRICES];
    newPrices[idx] = { ...newPrices[idx], [field]: value };
    setLocalData({ ...localData, MANUAL_SCREEN_PRINT_PRICES: newPrices });
  };

  const updateConfig = (jenis: 'rubber' | 'plastisol', field: string, value: number) => {
    setLocalData({
      ...localData,
      MANUAL_SCREEN_PRINT_CONFIG: {
        ...localData.MANUAL_SCREEN_PRINT_CONFIG,
        [jenis]: {
          ...localData.MANUAL_SCREEN_PRINT_CONFIG[jenis],
          [field]: value
        }
      }
    });
  };

  const rubberList = localData.MANUAL_SCREEN_PRINT_PRICES.filter(p => p.jenis === "RUBBER");
  const plastisolList = localData.MANUAL_SCREEN_PRINT_PRICES.filter(p => p.jenis === "PLASTISOL");

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-semibold text-slate-800">Matriks Sablon Manual (Rubber & Plastisol)</h2>
          <p className="text-sm text-slate-500 mt-1">
            Harga dihitung berdasarkan Luas Kertas (A4/A3/A2), Jumlah Warna, dan Quantity Pesanan.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1 md:mt-0 w-full md:w-auto">
          {!isReadOnly && (
            <>
              {isEditing && (
                <button 
                  onClick={handleCancel}
                  className="flex-1 md:flex-none text-xs font-semibold whitespace-nowrap cursor-pointer px-3 py-2 md:py-1.5 rounded-md transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                >Cancel</button>
              )}
              <button 
                onClick={handleSave}
                className={`flex-1 md:flex-none justify-center text-xs font-semibold whitespace-nowrap cursor-pointer px-3 py-2 md:py-1.5 rounded-md transition-colors flex items-center ${
                  isEditing 
                    ? "bg-slate-800 text-white hover:bg-slate-900 border border-slate-900" 
                    : "bg-slate-800 text-white hover:bg-slate-900 border border-slate-900"
                }`}
              >
                {isEditing ? <><Save className="w-4 h-4 mr-2" /><><Save className="w-4 h-4 mr-2" /> Save</></> : "Edit Sablon Manual"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-8">
        {/* Rubber */}
        <section>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-l-4 border-slate-800 pl-3">
            Kategori: Rubber
          </h3>
          <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
                <th className="p-3 pl-4 font-bold">Ukuran Kertas</th>
                <th className="p-3 font-bold">Warna</th>
                <th className="p-3 font-bold">Rentang Qty (Pcs)</th>
                <th className="p-3 font-bold text-right pr-4">Harga Dasar</th>
              </tr>
            </thead>
            <tbody>
              {rubberList.map((item, localIdx) => {
                // Find global index to update
                const globalIdx = localData.MANUAL_SCREEN_PRINT_PRICES.findIndex(p => p === item);
                return (
                <tr key={localIdx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 pl-4 font-medium text-slate-700">{item.ukuran}</td>
                  <td className="p-3 text-slate-700">{item.warna === 5 ? "2-5 Warna" : "1 Warna"}</td>
                  <td className="p-3 text-slate-700">{item.min} - {item.max > 9000 ? "∞" : item.max} pcs</td>
                  <td className="p-3 text-right pr-4 text-slate-800 font-bold">
                    {isEditing ? (
                      <input 
                        type="number" 
                        className="w-full border p-1 rounded text-right" 
                        value={item.hargaDasar}
                        onChange={(e) => updatePrice(globalIdx, 'hargaDasar', Number(e.target.value))}
                      />
                    ) : `Rp ${item.hargaDasar.toLocaleString("id-ID")}`}
                  </td>
                </tr>
              )})}
              <tr className="border-b border-slate-100 bg-slate-50">
                <td colSpan={3} className="p-3 pl-4 font-medium text-slate-800 border-r border-slate-200">
                  Ekstra Titik Cetak (Lebih dari {localData.MANUAL_SCREEN_PRINT_CONFIG.rubber.maxTitik} Titik)
                </td>
                <td className="p-3 text-right pr-4 text-slate-800 font-bold">
                  {isEditing ? (
                    <div className="flex items-center gap-2 justify-end">
                      <span>+ Rp</span>
                      <input 
                        type="number" 
                        className="w-24 border p-1 rounded text-right" 
                        value={localData.MANUAL_SCREEN_PRINT_CONFIG.rubber.dendaTitik}
                        onChange={(e) => updateConfig('rubber', 'dendaTitik', Number(e.target.value))}
                      />
                      <span className="text-xs font-normal">/ titik</span>
                    </div>
                  ) : `+ Rp ${localData.MANUAL_SCREEN_PRINT_CONFIG.rubber.dendaTitik.toLocaleString("id-ID")} / titik`}
                </td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50">
                <td colSpan={3} className="p-3 pl-4 font-medium text-slate-800 border-r border-slate-200">
                  Ekstra Warna (Lebih dari {localData.MANUAL_SCREEN_PRINT_CONFIG.rubber.maxWarna} Warna)
                </td>
                <td className="p-3 text-right pr-4 text-slate-800 font-bold">
                  {isEditing ? (
                    <div className="flex items-center gap-2 justify-end">
                      <span>+ Rp</span>
                      <input 
                        type="number" 
                        className="w-24 border p-1 rounded text-right" 
                        value={localData.MANUAL_SCREEN_PRINT_CONFIG.rubber.dendaWarna}
                        onChange={(e) => updateConfig('rubber', 'dendaWarna', Number(e.target.value))}
                      />
                      <span className="text-xs font-normal">/ warna</span>
                    </div>
                  ) : `+ Rp ${localData.MANUAL_SCREEN_PRINT_CONFIG.rubber.dendaWarna.toLocaleString("id-ID")} / warna`}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Plastisol */}
        <section>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-l-4 border-slate-800 pl-3">
            Kategori: Plastisol
          </h3>
          <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
                <th className="p-3 pl-4 font-bold">Ukuran Kertas</th>
                <th className="p-3 font-bold">Warna Base</th>
                <th className="p-3 font-bold">Min. Order</th>
                <th className="p-3 font-bold text-right pr-4">Harga Dasar</th>
              </tr>
            </thead>
            <tbody>
              {plastisolList.map((item, localIdx) => {
                const globalIdx = localData.MANUAL_SCREEN_PRINT_PRICES.findIndex(p => p === item);
                return (
                <tr key={localIdx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 pl-4 font-medium text-slate-700">{item.ukuran}</td>
                  <td className="p-3 text-slate-700">1 - {localData.MANUAL_SCREEN_PRINT_CONFIG.plastisol.maxWarna} Warna</td>
                  <td className="p-3 text-slate-700">{item.min} pcs</td>
                  <td className="p-3 text-right pr-4 text-slate-800 font-bold">
                    {isEditing ? (
                      <input 
                        type="number" 
                        className="w-full border p-1 rounded text-right" 
                        value={item.hargaDasar}
                        onChange={(e) => updatePrice(globalIdx, 'hargaDasar', Number(e.target.value))}
                      />
                    ) : `Rp ${item.hargaDasar.toLocaleString("id-ID")}`}
                  </td>
                </tr>
              )})}
              <tr className="border-b border-slate-100 bg-slate-50">
                <td colSpan={3} className="p-3 pl-4 font-medium text-slate-800 border-r border-slate-200">
                  Ekstra Warna (Lebih dari {localData.MANUAL_SCREEN_PRINT_CONFIG.plastisol.maxWarna} Warna)
                </td>
                <td className="p-3 text-right pr-4 text-slate-800 font-bold">
                  {isEditing ? (
                    <div className="flex items-center gap-2 justify-end">
                      <span>+ Rp</span>
                      <input 
                        type="number" 
                        className="w-24 border p-1 rounded text-right" 
                        value={localData.MANUAL_SCREEN_PRINT_CONFIG.plastisol.dendaWarna}
                        onChange={(e) => updateConfig('plastisol', 'dendaWarna', Number(e.target.value))}
                      />
                      <span className="text-xs font-normal">/ warna</span>
                    </div>
                  ) : `+ Rp ${localData.MANUAL_SCREEN_PRINT_CONFIG.plastisol.dendaWarna.toLocaleString("id-ID")} / warna`}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
