import { useState } from "react";
import { useFactoryData } from "../../../providers/FactoryDataProvider";
import { Edit3 } from "lucide-react";

const COLOR_CATEGORY_LABELS: Record<string, string> = {
  "P": "Putih",
  "M": "Muda",
  "S": "Sedang",
  "T": "Tua",
  "TS": "Tua Special",
  "TS2": "Tua Special 2",
  "TUASPC": "Tua Special",
  "TUASPC2": "Tua Special 2",
  "JETBLACK": "Jet Black",
  "MS": "Misty Sedang",
  "A": "Tier A (Abu Muda/Broken White)",
  "B": "Tier B (Kuning, Orange, Putih)",
  "C": "Tier C (Merah, Hijau, Biru, Hitam)",
  "D": "Tier D (Misty Abu Tua)",
  "SM": "Sedang-Muda",
  "HS": "Hijau Special",
  "ST": "Sedang-Tua"
};

export const poloFabrics = [
  "Lacoste Pique 24s",
  "Lacoste Diamond 30s",
  "PE Pique Soft 30S",
  "PE Pique Soft 20S"
];

export function FabricTab({ isReadOnly = false }: { isReadOnly?: boolean }) {
  const { data, setData } = useFactoryData();
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState({
    FABRIC_PRICES: data.FABRIC_PRICES,
    FABRIC_YIELD: data.FABRIC_YIELD,
    SEWING_COST: data.SEWING_COST,
    HARGA_RIB: data.HARGA_RIB,
    HARGA_AKSESORIS_POLO: data.HARGA_AKSESORIS_POLO || {
      kerah: { standar: 4000, custom: 6000 },
      manset: { tanpa: 0, standar: 3500, custom: 5000 },
      saku: { tanpa: 0, tempel: 4000, dalam: 5300 },
      melet: { tanpa: 0, melet: 3500 }
    }
  });

  const materials = Object.keys(data.FABRIC_PRICES);
  const models = Array.from(new Set([
    ...Object.keys(data.SEWING_COST?.KAOS || {}),
    ...Object.keys(data.SEWING_COST?.POLO || {})
  ]));

  const handleSave = () => {
    if (isEditing) {
      setData({ ...data, ...localData });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setLocalData({
      FABRIC_PRICES: data.FABRIC_PRICES,
      FABRIC_YIELD: data.FABRIC_YIELD,
      SEWING_COST: data.SEWING_COST,
      HARGA_RIB: data.HARGA_RIB,
      HARGA_AKSESORIS_POLO: data.HARGA_AKSESORIS_POLO
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-semibold text-slate-800">Database Harga Kain & Model CMT</h2>
          <p className="text-xs text-slate-500 mt-1">Mengatur HPP Bahan Baku berdasarkan Roll (25kg) / Ecer, Yield per kg, dan Biaya Jahit.</p>
        </div>
        <div className="flex items-center gap-2 mt-1 md:mt-0 w-full md:w-auto">
          {!isReadOnly && (
            <>
              {isEditing && (
                <button 
                  onClick={handleCancel}
                  className="flex-1 md:flex-none text-xs font-semibold whitespace-nowrap cursor-pointer px-3 py-2 md:py-1.5 rounded-md transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                >
                  Batal
                </button>
              )}
              <button 
                onClick={handleSave}
                className={`flex-1 md:flex-none justify-center text-xs font-semibold whitespace-nowrap cursor-pointer px-3 py-2 md:py-1.5 rounded-md transition-colors flex items-center ${
                  isEditing 
                    ? "bg-slate-800 text-white hover:bg-slate-900 border border-slate-900" 
                    : "bg-slate-800 text-white hover:bg-slate-900 border border-slate-900"
                }`}
              >
                {isEditing ? "Simpan Perubahan" : "Edit Harga Kain & CMT"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-8">
        
        {/* Section: Harga Kain */}
        <section>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-l-4 border-slate-800 pl-3">
            1. Harga Kain (per Kg)
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {materials.map(mat => (
              <div key={mat} className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 p-3 font-semibold text-sm border-b border-slate-200 flex justify-between">
                  {mat}
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs">
                    <tr>
                      <th className="p-2 pl-3">Kategori Warna</th>
                      <th className="p-2">Roll (≥25kg)</th>
                      <th className="p-2">Ecer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(localData.FABRIC_PRICES[mat]).map(([cat, prices]: [string, any]) => (
                      <tr key={cat} className="border-t border-slate-100">
                        <td className="p-2 pl-3 font-medium text-slate-700">
                          {cat} <span className="text-slate-400 font-normal text-[11px] ml-1">({COLOR_CATEGORY_LABELS[cat] || 'Kategori ' + cat})</span>
                        </td>
                        <td className="p-2">
                          {isEditing ? (
                            <input 
                              type="number" 
                              className="w-full border p-1 rounded" 
                              value={prices.roll}
                              onChange={(e) => {
                                const newVal = Number(e.target.value);
                                setLocalData({
                                  ...localData,
                                  FABRIC_PRICES: {
                                    ...localData.FABRIC_PRICES,
                                    [mat]: {
                                      ...localData.FABRIC_PRICES[mat],
                                      [cat]: { ...prices, roll: newVal }
                                    }
                                  }
                                });
                              }}
                            />
                          ) : `Rp ${prices.roll.toLocaleString("id-ID")}`}
                        </td>
                        <td className="p-2">
                          {isEditing ? (
                            <input 
                              type="number" 
                              className="w-full border p-1 rounded" 
                              value={prices.ecer}
                              onChange={(e) => {
                                const newVal = Number(e.target.value);
                                setLocalData({
                                  ...localData,
                                  FABRIC_PRICES: {
                                    ...localData.FABRIC_PRICES,
                                    [mat]: {
                                      ...localData.FABRIC_PRICES[mat],
                                      [cat]: { ...prices, ecer: newVal }
                                    }
                                  }
                                });
                              }}
                            />
                          ) : `Rp ${prices.ecer.toLocaleString("id-ID")}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-slate-200"></div>

        {/* Section: Yield & Jahit */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-l-4 border-slate-800 pl-3">
              2. Yield (Pcs/Kg) & Biaya Jahit (CMT)
            </h3>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-max text-left border-collapse text-sm">
              <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3 pl-4 font-bold">Model Garmen</th>
                  <th className="p-3 font-bold">Jahit Kaos</th>
                  <th className="p-3 font-bold">Jahit Polo</th>
                  {Object.keys(data.FABRIC_YIELD).map(mat => (
                    <th key={mat} className="p-3 font-bold text-center">Yield {mat}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {models.map((model: string) => {
                  const formatName = (m: string) => {
                    if (m === 'pendek') return 'Regular (Lengan Pendek)';
                    if (m === 'panjang') return 'Regular (Lengan Panjang)';
                    if (m === 'tigaperempat') return 'Regular (Lengan 3/4)';
                    if (m === 'tujuhperlapan') return 'Regular (Lengan 7/8)';
                    if (m === 'croptop') return 'Crop Top (Base)';
                    if (m === 'tunik_aline') return 'Tunik A-Line (Base)';
                    return m.charAt(0).toUpperCase() + m.slice(1) + ' (Base)';
                  };
                  return (
                  <tr key={model} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 pl-4 font-medium text-slate-700">{formatName(model)}</td>
                    <td className="p-3 text-brand-primary font-bold">
                      {isEditing ? (
                        <input 
                          type="number" 
                          className="w-full border p-1 rounded" 
                          value={(localData.SEWING_COST as any)?.KAOS?.[model] || ""}
                          onChange={(e) => {
                            setLocalData({
                              ...localData,
                              SEWING_COST: {
                                ...localData.SEWING_COST,
                                KAOS: {
                                  ...(localData.SEWING_COST as any)?.KAOS,
                                  [model]: Number(e.target.value)
                                }
                              }
                            });
                          }}
                        />
                      ) : (localData.SEWING_COST as any)?.KAOS?.[model] ? `Rp ${((localData.SEWING_COST as any).KAOS[model]).toLocaleString("id-ID")}` : "-"}
                    </td>
                    <td className="p-3 text-brand-primary font-bold">
                      {isEditing ? (
                        <input 
                          type="number" 
                          className="w-full border p-1 rounded" 
                          value={(localData.SEWING_COST as any)?.POLO?.[model] || ""}
                          onChange={(e) => {
                            setLocalData({
                              ...localData,
                              SEWING_COST: {
                                ...localData.SEWING_COST,
                                POLO: {
                                  ...(localData.SEWING_COST as any)?.POLO,
                                  [model]: Number(e.target.value)
                                }
                              }
                            });
                          }}
                        />
                      ) : (localData.SEWING_COST as any)?.POLO?.[model] ? `Rp ${((localData.SEWING_COST as any).POLO[model]).toLocaleString("id-ID")}` : "-"}
                    </td>
                    {Object.keys(localData.FABRIC_YIELD).map(mat => (
                      <td key={mat} className="p-3 text-center">
                        {isEditing ? (
                          <input 
                            type="number" 
                            className="w-full border p-1 rounded text-center" 
                            value={localData.FABRIC_YIELD[mat as keyof typeof localData.FABRIC_YIELD]?.[model as keyof typeof localData.SEWING_COST] || 0}
                            onChange={(e) => {
                              setLocalData({
                                ...localData,
                                FABRIC_YIELD: {
                                  ...localData.FABRIC_YIELD,
                                  [mat]: {
                                    ...localData.FABRIC_YIELD[mat as keyof typeof localData.FABRIC_YIELD],
                                    [model]: Number(e.target.value)
                                  }
                                }
                              });
                            }}
                          />
                        ) : `${localData.FABRIC_YIELD[mat as keyof typeof localData.FABRIC_YIELD]?.[model as keyof typeof localData.SEWING_COST] || "-"} pcs`}
                      </td>
                    ))}
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </section>

        <div className="border-t border-slate-200"></div>

        {/* Section: Harga Aksesoris Kaos */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-l-4 border-slate-800 pl-3">
              3. Harga Aksesoris Kaos
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(localData.HARGA_RIB || {}).map(mat => {
              const ribData = (localData.HARGA_RIB as any)[mat];
              return (
                <div key={mat} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 p-3 font-semibold text-sm border-b border-slate-200">
                    {mat}
                  </div>
                  <div className="p-3 space-y-3 bg-white">
                    {Object.entries(ribData).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                        <span className="capitalize text-slate-600">
                          {key === 'leher' ? 'Rib Leher' : key === 'lengan' ? 'Rib Lengan' : key}
                        </span>
                        {isEditing ? (
                          <input 
                            type="number" 
                            className="border p-1.5 rounded w-24 text-right focus:ring-brand-gold focus:border-brand-gold" 
                            value={val as number} 
                            onChange={(e) => setLocalData({
                              ...localData, 
                              HARGA_RIB: { 
                                ...localData.HARGA_RIB, 
                                [mat]: { ...ribData, [key]: Number(e.target.value) } 
                              }
                            })}
                          />
                        ) : (
                          <span className="font-medium text-slate-800">
                            Rp {(val as number).toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="border-t border-slate-200"></div>

        {/* Section: Harga Aksesoris Polo */}
        <section>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-l-4 border-slate-800 pl-3">
            4. Harga Aksesoris Polo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            
            {/* Kerah */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 p-3 font-semibold text-sm border-b border-slate-200">Kerah</div>
              <div className="p-3 space-y-3 bg-white">
                {Object.entries(localData.HARGA_AKSESORIS_POLO.kerah).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <span className="capitalize text-slate-600">{key}</span>
                    {isEditing ? (
                      <input type="number" className="border p-1.5 rounded w-24 text-right focus:ring-brand-gold focus:border-brand-gold" value={val as number} 
                        onChange={(e) => setLocalData({
                          ...localData, 
                          HARGA_AKSESORIS_POLO: { ...localData.HARGA_AKSESORIS_POLO, kerah: { ...localData.HARGA_AKSESORIS_POLO.kerah, [key]: Number(e.target.value) }}
                        })}
                      />
                    ) : <span className="font-medium">Rp {(val as number).toLocaleString("id-ID")}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Manset */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 p-3 font-semibold text-sm border-b border-slate-200">Manset</div>
              <div className="p-3 space-y-3 bg-white">
                {Object.entries(localData.HARGA_AKSESORIS_POLO.manset).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <span className="capitalize text-slate-600">{key}</span>
                    {isEditing ? (
                      <input type="number" className="border p-1.5 rounded w-24 text-right focus:ring-brand-gold focus:border-brand-gold" value={val as number} 
                        onChange={(e) => setLocalData({
                          ...localData, 
                          HARGA_AKSESORIS_POLO: { ...localData.HARGA_AKSESORIS_POLO, manset: { ...localData.HARGA_AKSESORIS_POLO.manset, [key]: Number(e.target.value) }}
                        })}
                      />
                    ) : <span className="font-medium">Rp {(val as number).toLocaleString("id-ID")}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Saku */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 p-3 font-semibold text-sm border-b border-slate-200">Saku</div>
              <div className="p-3 space-y-3 bg-white">
                {Object.entries(localData.HARGA_AKSESORIS_POLO.saku).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <span className="capitalize text-slate-600">{key}</span>
                    {isEditing ? (
                      <input type="number" className="border p-1.5 rounded w-24 text-right focus:ring-brand-gold focus:border-brand-gold" value={val as number} 
                        onChange={(e) => setLocalData({
                          ...localData, 
                          HARGA_AKSESORIS_POLO: { ...localData.HARGA_AKSESORIS_POLO, saku: { ...localData.HARGA_AKSESORIS_POLO.saku, [key]: Number(e.target.value) }}
                        })}
                      />
                    ) : <span className="font-medium">Rp {(val as number).toLocaleString("id-ID")}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Melet */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 p-3 font-semibold text-sm border-b border-slate-200">Melet</div>
              <div className="p-3 space-y-3 bg-white">
                {Object.entries(localData.HARGA_AKSESORIS_POLO.melet).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <span className="capitalize text-slate-600">{key}</span>
                    {isEditing ? (
                      <input type="number" className="border p-1.5 rounded w-24 text-right focus:ring-brand-gold focus:border-brand-gold" value={val as number} 
                        onChange={(e) => setLocalData({
                          ...localData, 
                          HARGA_AKSESORIS_POLO: { ...localData.HARGA_AKSESORIS_POLO, melet: { ...localData.HARGA_AKSESORIS_POLO.melet, [key]: Number(e.target.value) }}
                        })}
                      />
                    ) : <span className="font-medium">Rp {(val as number).toLocaleString("id-ID")}</span>}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: DAFTAR WARNA DAN KATEGORI */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h3 className="font-bold text-slate-800">Referensi Warna & Kategori per Kain</h3>
            <p className="text-xs text-slate-500 mt-1">Panduan referensi warna untuk mempermudah pengecekan kategori warna kain.</p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(data.FABRIC_COLORS_MAP).map(([mat, colors]: [string, any]) => (
                <div key={mat} className="border border-slate-200 rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-slate-100 p-2 font-bold text-sm text-center border-b border-slate-200">
                    {mat}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 sticky top-0 shadow-sm">
                        <tr>
                          <th className="p-2 border-b border-slate-200 w-10 text-center text-slate-500">No</th>
                          <th className="p-2 border-b border-slate-200 text-slate-600">Nama Warna</th>
                          <th className="p-2 border-b border-slate-200 text-center w-16 text-slate-600">Kat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {colors.map((c: any, idx: number) => (
                          <tr key={c.n} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                            <td className="p-2 text-slate-400 text-center">{idx + 1}</td>
                            <td className="p-2 font-medium text-slate-700">{c.n}</td>
                            <td className="p-2 text-center text-brand-primary font-bold" title={COLOR_CATEGORY_LABELS[c.k] || c.k}>
                              {c.k}
                              <div className="text-[10px] text-slate-500 font-normal mt-0.5">{COLOR_CATEGORY_LABELS[c.k] || ''}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
