import { useState } from "react";
import { useFactoryData } from "../../../providers/FactoryDataProvider";

export function DtfTab({ isReadOnly = false }: { isReadOnly?: boolean }) {
  const { data, setData } = useFactoryData();
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState({
    DTF_CONFIG: data.DTF_CONFIG,
    DTF_TIERS: data.DTF_TIERS
  });

  const handleSave = () => {
    if (isEditing) {
      setData({ ...data, ...localData });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setLocalData({
      DTF_CONFIG: data.DTF_CONFIG,
      DTF_TIERS: data.DTF_TIERS
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-semibold text-slate-800">Kalibrasi Tarif DTF (Meteran)</h2>
          <p className="text-sm text-slate-500 mt-1">
            Harga Sablon DTF dihitung berdasarkan panjang sentimeter (cm) yang dibutuhkan pada film berukuran lebar 57cm (Algoritma Bin Packing).
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
                {isEditing ? "Save" : "Edit Harga DTF"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="max-w-xl">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 text-slate-500 text-xs">
              <tr>
                <th className="p-3 border-b border-slate-200">Panjang Cetak (cm)</th>
                <th className="p-3 border-b border-slate-200">Harga per cm</th>
              </tr>
            </thead>
            <tbody>
              {localData.DTF_TIERS.map((tier: any, i: number) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-medium text-slate-700">
                    {tier.max === 999999 ? "> 5000 cm" : `≤ ${tier.max} cm`}
                  </td>
                  <td className="p-3 font-semibold text-brand-primary">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <span>Rp</span>
                        <input 
                          type="number" 
                          className="w-full border p-1 rounded" 
                          value={tier.harga}
                          onChange={(e) => {
                            const newTiers = [...localData.DTF_TIERS];
                            newTiers[i] = { ...newTiers[i], harga: Number(e.target.value) };
                            setLocalData({ ...localData, DTF_TIERS: newTiers });
                          }}
                        />
                      </div>
                    ) : `Rp ${tier.harga.toLocaleString("id-ID")}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="max-w-xl mt-8">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-l-4 border-slate-800 pl-3">
              Konfigurasi Layouting (Nesting)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Area Cetak (AC)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={isEditing ? localData.DTF_CONFIG.AC : data.DTF_CONFIG.AC}
                    onChange={(e) => setLocalData({ ...localData, DTF_CONFIG: { ...localData.DTF_CONFIG, AC: Number(e.target.value) } })}
                    disabled={!isEditing}
                    className="w-full p-2 border border-slate-300 rounded text-sm disabled:bg-slate-100 disabled:text-slate-500" 
                  />
                  <span className="text-sm font-semibold text-slate-600">cm</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Jarak Horizontal (JH)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={isEditing ? localData.DTF_CONFIG.JH : data.DTF_CONFIG.JH} 
                    onChange={(e) => setLocalData({ ...localData, DTF_CONFIG: { ...localData.DTF_CONFIG, JH: Number(e.target.value) } })}
                    disabled={!isEditing}
                    className="w-full p-2 border border-slate-300 rounded text-sm disabled:bg-slate-100 disabled:text-slate-500" 
                  />
                  <span className="text-sm font-semibold text-slate-600">cm</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Jarak Vertikal (JV)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={isEditing ? localData.DTF_CONFIG.JV : data.DTF_CONFIG.JV}
                    onChange={(e) => setLocalData({ ...localData, DTF_CONFIG: { ...localData.DTF_CONFIG, JV: Number(e.target.value) } })}
                    disabled={!isEditing}
                    className="w-full p-2 border border-slate-300 rounded text-sm disabled:bg-slate-100 disabled:text-slate-500" 
                  />
                  <span className="text-sm font-semibold text-slate-600">cm</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Jarak Antar-potong (JA)</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={isEditing ? localData.DTF_CONFIG.JA : data.DTF_CONFIG.JA} 
                    onChange={(e) => setLocalData({ ...localData, DTF_CONFIG: { ...localData.DTF_CONFIG, JA: Number(e.target.value) } })}
                    disabled={!isEditing}
                    className="w-full p-2 border border-slate-300 rounded text-sm disabled:bg-slate-100 disabled:text-slate-500" 
                  />
                  <span className="text-sm font-semibold text-slate-600">cm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
