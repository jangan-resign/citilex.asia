"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function MonthYearFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentMonthParam = searchParams.get("month");
  const currentYearParam = searchParams.get("year");

  const month = currentMonthParam === "all" ? "all" : (currentMonthParam ? parseInt(currentMonthParam) : new Date().getMonth() + 1);
  const year = currentYearParam === "all" ? "all" : (currentYearParam ? parseInt(currentYearParam) : new Date().getFullYear());

  const months = [
    { id: 1, name: "Januari" }, { id: 2, name: "Februari" }, { id: 3, name: "Maret" },
    { id: 4, name: "April" }, { id: 5, name: "Mei" }, { id: 6, name: "Juni" },
    { id: 7, name: "Juli" }, { id: 8, name: "Agustus" }, { id: 9, name: "September" },
    { id: 10, name: "Oktober" }, { id: 11, name: "November" }, { id: 12, name: "Desember" }
  ];
  const years = [2024, 2025, 2026, 2027];

  const handleFilterChange = (newMonth: number | "all", newYear: number | "all") => {
    const params = new URLSearchParams(searchParams);
    
    if (newMonth !== "all") params.set("month", newMonth.toString());
    else params.set("month", "all");
    
    if (newYear !== "all") params.set("year", newYear.toString());
    else params.set("year", "all");
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 items-center w-full md:w-auto">
      <select 
        value={month} 
        onChange={(e) => {
          const newMonth = e.target.value === "all" ? "all" : parseInt(e.target.value);
          handleFilterChange(newMonth, year);
        }}
        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm flex-1 md:w-40 md:flex-none font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
      >
        <option value="all">Semua Bulan</option>
        {months.map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
      <select 
        value={year} 
        onChange={(e) => {
          const newYear = e.target.value === "all" ? "all" : parseInt(e.target.value);
          handleFilterChange(month, newYear);
        }}
        className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm flex-1 md:w-32 md:flex-none font-medium focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
      >
        <option value="all">Semua Tahun</option>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
