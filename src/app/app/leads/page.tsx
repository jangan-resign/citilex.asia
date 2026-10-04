import { Search, Filter, MoreHorizontal, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { prisma } from "../../../lib/prisma";
import { LeadsSearch } from "../../../components/app/LeadsSearch";
import { AddCustomerButton } from "../../../components/app/leads/AddCustomerButton";
import { MonthYearFilter } from "../../../components/app/MonthYearFilter";
import { LeadsTableClient } from "../../../components/app/leads/LeadsTableClient";

export const metadata = {
  title: "Leads Database | CITILEX ASIA Workspace",
};

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ q?: string; month?: string; year?: string }> }) {
  const params = await searchParams;
  const query = params.q || "";
  
  const month = params.month === "all" ? "all" : (params.month ? parseInt(params.month) : new Date().getMonth() + 1);
  const year = params.year === "all" ? "all" : (params.year ? parseInt(params.year) : new Date().getFullYear());

  const dateFilter: any = {};
  if (year !== "all") {
    if (month !== "all") {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      dateFilter.createdAt = { gte: startDate, lt: endDate };
    } else {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year + 1, 0, 1);
      dateFilter.createdAt = { gte: startDate, lt: endDate };
    }
  }

  // Ambil data customer yang belum jadi client resmi (belum punya project aktif post-DP)
  const dbCustomers = await prisma.customer.findMany({
    where: {
      status: {
        in: ["active", "qualified"]
      },
      invoices: {
        none: {
          status: "PAID"
        }
      },
      ...dateFilter,
      OR: query ? [
        { name: { contains: query, mode: "insensitive" } },
        { company: { contains: query, mode: "insensitive" } },
        { phone: { contains: query, mode: "insensitive" } }
      ] : undefined
    },
    include: {
      projects: true,
      qualification: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const leads = dbCustomers.map((c) => {
    return {
      id: c.id,
      displayId: c.id.slice(-6).toUpperCase(),
      name: c.name,
      company: c.company || "-",
      phone: c.phone,
      status: "Qualifying",
      date: c.createdAt.toISOString().split('T')[0],
      value: "Menunggu Kalkulasi",
      items: (c.qualification?.items as any) || [],
      domicile: c.domicile
    };
  });

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Leads Database</h1>
          <p className="text-sm text-slate-500 mt-1">Database lengkap prospek (pre-DP) untuk keperluan retargeting tim Sales.</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 w-full md:w-auto">
          <MonthYearFilter />
          <div className="flex-1 min-w-[140px]">
            <AddCustomerButton type="lead" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-4">
          <LeadsSearch />
        </div>

        {/* Table */}
        <LeadsTableClient leads={leads} />
      </div>
    </div>
  );
}
