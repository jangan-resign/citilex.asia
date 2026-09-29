import { dummyPrintUpgrades } from "../../../lib/dummyData";
import { Plus, Edit3, Trash2 } from "lucide-react";

export function PrintUpgradesTab() {
  const sablonList = dummyPrintUpgrades.filter(p => p.category === "Sablon");
  const bordirList = dummyPrintUpgrades.filter(p => p.category === "Bordir");

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="font-semibold text-slate-800">Biaya Tambahan Sablon & Bordir (Upgrades)</h2>
          <p className="text-xs text-slate-500 mt-0.5">Biaya ini akan ditambahkan ke Harga Paket jika sablon/bordir melebihi standar.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-gold text-white rounded-lg text-sm font-medium hover:bg-[#8a6f44] transition-colors cursor-pointer shrink-0">
          <Plus className="h-4 w-4" />
          Tambah Upgrade
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-8">
        {/* Kategori Sablon */}
        <section>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-l-4 border-orange-400 pl-3">
            Kategori: Sablon
          </h3>
          <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-100 text-sm text-slate-600 border-b border-slate-200">
                <th className="p-3 pl-4 font-bold">Nama Upgrade Sablon</th>
                <th className="p-3 font-bold">Biaya Tambahan (Add-on)</th>
                <th className="p-3 text-right pr-4 font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sablonList.map(item => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                  <td className="p-3 pl-4 font-medium text-slate-700">{item.name}</td>
                  <td className="p-3 text-orange-600 font-bold">+ Rp {item.additionalPrice.toLocaleString("id-ID")}</td>
                  <td className="p-3 text-right pr-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer" title="Edit"><Edit3 className="h-4 w-4" /></button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer" title="Hapus"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Kategori Bordir */}
        <section>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-l-4 border-blue-400 pl-3">
            Kategori: Bordir
          </h3>
          <table className="w-full text-left border-collapse border border-slate-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-100 text-sm text-slate-600 border-b border-slate-200">
                <th className="p-3 pl-4 font-bold">Nama Upgrade Bordir</th>
                <th className="p-3 font-bold">Biaya Tambahan (Add-on)</th>
                <th className="p-3 text-right pr-4 font-bold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bordirList.map(item => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 group">
                  <td className="p-3 pl-4 font-medium text-slate-700">{item.name}</td>
                  <td className="p-3 text-blue-600 font-bold">+ Rp {item.additionalPrice.toLocaleString("id-ID")}</td>
                  <td className="p-3 text-right pr-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded cursor-pointer" title="Edit"><Edit3 className="h-4 w-4" /></button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded cursor-pointer" title="Hapus"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
