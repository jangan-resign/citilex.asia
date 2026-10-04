"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CustomSelect } from "../ui/CustomSelect";

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
      <CustomSelect 
        value={month.toString()} 
        onChange={(val) => {
          const newMonth = val === "all" ? "all" : parseInt(val);
          handleFilterChange(newMonth, year);
        }}
        options={[
          { value: "all", label: "Semua Bulan" },
          ...months.map(m => ({ value: m.id.toString(), label: m.name }))
        ]}
        className="flex-1 md:w-40 md:flex-none"
      />
      <CustomSelect 
        value={year.toString()} 
        onChange={(val) => {
          const newYear = val === "all" ? "all" : parseInt(val);
          handleFilterChange(month, newYear);
        }}
        options={[
          { value: "all", label: "Semua Tahun" },
          ...years.map(y => ({ value: y.toString(), label: y.toString() }))
        ]}
        className="flex-1 md:w-32 md:flex-none"
      />
    </div>
  );
}
