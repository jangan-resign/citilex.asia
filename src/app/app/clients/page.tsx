import { Search, Filter, MoreHorizontal, History } from "lucide-react";
import { prisma } from "../../../lib/prisma";

import { LeadsSearch } from "../../../components/app/LeadsSearch";
import { AddCustomerButton } from "../../../components/app/leads/AddCustomerButton";
import { MonthYearFilter } from "../../../components/app/MonthYearFilter";
import { ClientsTableClient } from "../../../components/app/clients/ClientsTableClient";

export const metadata = {
  title: "Clients Database | CITILEX ASIA Workspace",
};

export default async function ClientsPage({ searchParams }: { searchParams: Promise<{ q?: string; month?: string; year?: string }> }) {
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

  // Ambil data customer yang punya project (post-DP)
  const dbCustomers = await prisma.customer.findMany({
    where: {
      invoices: {
        some: {
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
      projects: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const clients = dbCustomers.map((c) => {
    // Hitung LTV dari semua project
    const totalValue = c.projects.reduce((acc, p) => acc + p.value, 0);
    const ltv = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalValue);
    
    // Cari status: Active Order jika ada project yg belum komplit
    const hasActiveOrder = c.projects.some(p => p.status !== "completed" && p.status !== "cancelled");
    
    // Last Order
    const sortedProjects = [...c.projects].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const lastOrderDate = sortedProjects.length > 0 ? sortedProjects[0].createdAt.toISOString().split('T')[0] : "-";

    return {
      id: c.id.slice(-6).toUpperCase(),
      name: c.name,
      company: c.company || "-",
      phone: c.phone,
      status: hasActiveOrder ? "Active Order" : "Completed",
      totalOrders: c.projects.length,
      lastOrder: lastOrderDate,
      ltv: ltv,
      domicile: c.domicile,
      rawProjects: c.projects
    };
  });

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Clients Database</h1>
          <p className="text-sm text-slate-500 mt-1">Database klien resmi (post-DP) untuk memantau nilai pelanggan dan peluang Repeat Order.</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 w-full md:w-auto">
          <MonthYearFilter />
          <div className="flex-1 min-w-[140px]">
            <AddCustomerButton type="client" />
          </div>
        </div>
      </div>

      <ClientsTableClient clients={clients} />
    </div>
  );
}
