import { Save } from "lucide-react";
import { useState } from "react";
import { useFactoryData } from "../../../providers/FactoryDataProvider";

export function BahanJadiTab({ isReadOnly = false }: { isReadOnly?: boolean }) {
  const { data, setData } = useFactoryData();
  const [isEditing, setIsEditing] = useState(false);
  
  // Provide default in case db is not ready
  const defaultBajuJadi = {
    "NSA Softstyle 3600": 40000,
    "NSA Premium Cotton 7200": 45000,
    "NSA Heavyweight 5400": 70000,
    "NSA Premium Cotton LS 7280": 60000,
    "NSA Premium Cotton Polo 8100": 85000
  };

  const [localData, setLocalData] = useState({
    HARGA_BAJU_JADI: data.HARGA_BAJU_JADI || defaultBajuJadi
  });

  const handleSave = () => {
    if (isEditing) {
      setData({ ...data, ...localData });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setLocalData({
      HARGA_BAJU_JADI: data.HARGA_BAJU_JADI || defaultBajuJadi
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-semibold text-slate-800">Master Data Bahan Jadi - Polo & Kaos Polosan</h2>
          <p className="text-xs text-slate-500 mt-1">Harga Dasar Bahan Jadi - Polo & Kaos Polosan</p>
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
                {isEditing ? <><Save className="w-4 h-4 mr-2" /> Save</> : "Edit Data Baju Jadi"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-8">
        {/* Section: Harga Baju Jadi */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.keys(localData.HARGA_BAJU_JADI).map(productName => (
              <div key={productName} className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 p-3 font-semibold text-sm border-b border-slate-200">
                  {productName}
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-slate-600 font-medium">Harga per Pcs</span>
                  {isEditing ? (
                    <input 
                      type="number" 
                      className="border p-2 rounded text-right w-32" 
                      value={localData.HARGA_BAJU_JADI[productName]}
                      onChange={(e) => {
                        setLocalData({
                          ...localData,
                          HARGA_BAJU_JADI: {
                            ...localData.HARGA_BAJU_JADI,
                            [productName]: Number(e.target.value)
                          }
                        });
                      }}
                    />
                  ) : (
                    <span className="font-bold text-slate-800">
                      Rp {localData.HARGA_BAJU_JADI[productName]?.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
}
