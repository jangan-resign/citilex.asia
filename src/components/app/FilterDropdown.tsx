"use client";

import { Filter } from "lucide-react";

export function FilterDropdown() {
  return (
    <button 
      onClick={() => alert("Fitur filter lanjutan sedang dalam penyesuaian parameter. Akan segera rilis di update berikutnya!")}
      className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-colors"
    >
      <Filter className="w-4 h-4" /> Filter
    </button>
  );
}
