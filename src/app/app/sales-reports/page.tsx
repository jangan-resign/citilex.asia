import { PieChart } from "lucide-react";
import { SalesReportsClient } from "../../../components/app/sales-reports/SalesReportsClient";
import { getSalesDashboardData } from "../../../actions/sales-reports";
import { MonthYearFilter } from "../../../components/app/MonthYearFilter";

export const metadata = {
  title: "Sales Reports | CITILEX ASIA Workspace",
};

export default async function SalesReportsPage({ searchParams }: { searchParams: Promise<{ month?: string; year?: string }> }) {
  const params = await searchParams;
  const month = params.month === "all" ? "all" : (params.month ? parseInt(params.month) : new Date().getMonth() + 1);
  const year = params.year === "all" ? "all" : (params.year ? parseInt(params.year) : new Date().getFullYear());

  const data = await getSalesDashboardData(month, year);

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <PieChart className="w-7 h-7 text-brand-gold" />
            Sales Reports
          </h1>
          <p className="text-sm text-slate-500 mt-1">Laporan jumlah prospek dan rincian transaksi closing (Project) per periode.</p>
        </div>
        <div className="w-full md:w-auto">
          <MonthYearFilter />
        </div>
      </div>
      
      <SalesReportsClient 
        dashboardData={data} 
        currentMonth={month}
        currentYear={year}
      />
    </div>
  );
}
