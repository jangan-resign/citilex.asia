import { dummyVolumeTiers } from "../../../lib/dummyData";
import { Plus, Edit3, Trash2 } from "lucide-react";

export function VolumeTiersTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-200 bg-slate-50">
        <h2 className="font-semibold text-slate-800">Skema Diskon Grosir (Volume Tiers)</h2>
        <p className="text-sm text-slate-500 mt-1">
          Atur potongan harga otomatis berdasarkan jumlah pesanan pelanggan. Ini akan memotong Harga Total / pcs di Calculator.
        </p>
      </div>

      <div className="p-6">
        <div className="max-w-3xl">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-600 bg-slate-100">
                <th className="font-bold p-4">Rentang Kuantitas (Pcs)</th>
                <th className="font-bold p-4">Potongan Harga / Pcs</th>
                <th className="font-bold p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyVolumeTiers.map((tier, index) => (
                <tr key={tier.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-semibold text-slate-800">
                    {tier.maxQty 
                      ? `${tier.minQty} - ${tier.maxQty} pcs` 
                      : `> ${tier.minQty} pcs (Unlimited)`}
                    <span className="ml-2 text-xs text-slate-400 font-normal">Tier {index + 1}</span>
                  </td>
                  <td className="p-4">
                    {tier.discountPerPcs === 0 ? (
                      <span className="text-slate-500">Harga Normal (Diskon 0%)</span>
                    ) : (
                      <span className="text-green-600 font-bold">
                        - Rp {tier.discountPerPcs.toLocaleString("id-ID")}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors" title="Edit">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors" title="Hapus">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-white border border-dashed border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:border-brand-gold hover:text-brand-gold transition-colors cursor-pointer w-full justify-center">
            <Plus className="h-4 w-4" />
            Tambah Rentang Kuantitas (Tier)
          </button>
        </div>
      </div>
    </div>
  );
}
