import { dummyPackages } from "../../../lib/dummyData";
import { Plus, Edit3, Trash2 } from "lucide-react";

export function PackagesTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="font-semibold text-slate-800">Paket Utama (Base Price)</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-medium hover:bg-brand-onyx transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
          Tambah Paket
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500 bg-white">
              <th className="font-medium p-4 pl-6">Nama Paket</th>
              <th className="font-medium p-4">Harga Dasar</th>
              <th className="font-medium p-4">Min. Order</th>
              <th className="font-medium p-4">Deskripsi/Spesifikasi</th>
              <th className="font-medium p-4">Status</th>
              <th className="font-medium p-4 pr-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyPackages.map((pkg) => (
              <tr key={pkg.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="p-4 pl-6 font-semibold text-slate-800 text-sm">{pkg.name}</td>
                <td className="p-4 text-brand-primary font-bold">
                  Rp {pkg.basePrice.toLocaleString("id-ID")}
                </td>
                <td className="p-4 text-sm text-slate-600">{pkg.minOrder} pcs</td>
                <td className="p-4 text-sm text-slate-500 max-w-[250px] truncate" title={pkg.description}>
                  {pkg.description}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    pkg.isActive ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                  }`}>
                    {pkg.isActive ? "Aktif" : "Draft"}
                  </span>
                </td>
                <td className="p-4 pr-6 text-right">
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
      </div>
    </div>
  );
}
