import { Save } from "lucide-react";
import { useState } from "react";
import { useFactoryData } from "../../../providers/FactoryDataProvider";

export function EmbroideryTab({ isReadOnly = false }: { isReadOnly?: boolean }) {
  const { data, setData } = useFactoryData();
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState({
    EMBROIDERY_PRICES: data.EMBROIDERY_PRICES,
    BORDIR_FAKTOR_CUSTOM: data.BORDIR_FAKTOR_CUSTOM
  });

  const headers = ["< 7pcs", "7-12pcs", "13-24pcs", "25-48pcs", "49-100pcs", "> 100pcs"];

  const handleSave = () => {
    if (isEditing) {
      setData({ ...data, ...localData });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setLocalData({
      EMBROIDERY_PRICES: data.EMBROIDERY_PRICES,
      BORDIR_FAKTOR_CUSTOM: data.BORDIR_FAKTOR_CUSTOM
    });
    setIsEditing(false);
  };

  const updatePrice = (rowIdx: number, colIdx: number, value: number) => {
    const newPrices = [...localData.EMBROIDERY_PRICES];
    const newRowPrices = [...newPrices[rowIdx].prices];
    newRowPrices[colIdx] = value;
    newPrices[rowIdx] = { ...newPrices[rowIdx], prices: newRowPrices };
    setLocalData({ ...localData, EMBROIDERY_PRICES: newPrices });
  };

  const updateFactor = (colIdx: number, value: number) => {
    const newFactors = [...localData.BORDIR_FAKTOR_CUSTOM];
    newFactors[colIdx] = value;
    setLocalData({ ...localData, BORDIR_FAKTOR_CUSTOM: newFactors });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-semibold text-slate-800">Matriks Harga Bordir Komputer</h2>
          <p className="text-sm text-slate-500 mt-1">
            Harga bordir per Pcs dihitung berdasarkan rentang jumlah Tusukan Jarum (Stitches) dan kuantitas pesanan.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1 md:mt-0 w-full md:w-auto">
          {!isReadOnly && (
            <>
              {isEditing && (
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors"
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
                {isEditing ? <><Save className="w-4 h-4 mr-2" /> Save</> : "Edit Harga Bordir"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <table className="w-full text-center border-collapse border border-slate-200 rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
              <th className="p-3 font-bold border-r border-slate-200 text-left pl-4">Rentang Stitches</th>
              {headers.map(h => (
                <th key={h} className="p-3 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {localData.EMBROIDERY_PRICES.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-3 text-left pl-4 font-medium text-slate-700 border-r border-slate-200">
                  {row.minS} - {row.maxS} Stitches
                </td>
                {row.prices.map((p, i) => (
                  <td key={i} className="p-3 text-slate-800 font-bold">
                    {isEditing ? (
                      <input 
                        type="number" 
                        className="w-full min-w-[60px] p-1 text-center border rounded bg-white text-xs" 
                        value={p}
                        onChange={(e) => updatePrice(idx, i, Number(e.target.value))}
                      />
                    ) : `Rp ${p.toLocaleString("id-ID")}`}
                  </td>
                ))}
              </tr>
            ))}
            {/* Custom Multiplier Row for > 10000 stitches */}
            <tr className="border-b border-slate-100 bg-brand-gold/5 hover:bg-brand-gold/10">
              <td className="p-3 text-left pl-4 font-bold text-brand-gold border-r border-slate-200">
                &gt; 10.000 Stitches (Pengali Dasar)
              </td>
              {localData.BORDIR_FAKTOR_CUSTOM.map((multiplier, i) => (
                <td key={i} className="p-3 text-brand-gold font-bold">
                  {isEditing ? (
                    <input 
                      type="number" 
                      step="0.01" 
                      value={multiplier}
                      onChange={(e) => updateFactor(i, Number(e.target.value))}
                      className="w-full min-w-[50px] p-1 text-center border border-brand-gold/30 rounded bg-white text-xs" 
                    />
                  ) : (
                    `x ${multiplier}`
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
