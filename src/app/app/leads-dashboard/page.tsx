import { LayoutDashboard, Users, UserCheck, TrendingUp, FileText, Receipt, PieChart, Clock, Database } from "lucide-react";
import { prisma } from "../../../lib/prisma";
import { MonthYearFilter } from "../../../components/app/MonthYearFilter";

export const metadata = {
  title: "Leads Dashboard | CITILEX ASIA Workspace",
};

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ month?: string; year?: string }> }) {
  const params = await searchParams;
  const month = params.month === "all" ? "all" : (params.month ? parseInt(params.month) : new Date().getMonth() + 1);
  const year = params.year === "all" ? "all" : (params.year ? parseInt(params.year) : new Date().getFullYear());

  // Build date filter
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

  // --- Leads (All, filtered by date) ---
  const totalLeads = await prisma.customer.count({
    where: {
      ...dateFilter,
    },
  });

  // --- Clients (post-DP, filtered by date) ---
  const totalClients = await prisma.customer.count({
    where: {
      invoices: { some: {} },
      ...dateFilter,
    },
  });

  // --- Quotations (filtered by date) ---
  const totalQuotations = await prisma.quotation.count({ where: { ...dateFilter } });
  const quotationValue = await prisma.quotation.aggregate({ _sum: { amount: true }, where: { ...dateFilter } });

  // --- Invoices (filtered by date) ---
  const totalInvoices = await prisma.invoice.count({ where: { ...dateFilter } });
  const paidInvoices = await prisma.invoice.count({ where: { status: "PAID", ...dateFilter } });
  const unpaidInvoices = await prisma.invoice.count({ where: { status: "UNPAID", ...dateFilter } });
  const invoiceValue = await prisma.invoice.aggregate({ _sum: { amount: true }, where: { ...dateFilter } });
  const paidValue = await prisma.invoice.aggregate({ _sum: { amount: true }, where: { status: "PAID", ...dateFilter } });

  // --- Projects / Pipelines (filtered by date) ---
  const totalProjects = await prisma.project.count({ where: { ...dateFilter } });
  const projectValue = await prisma.project.aggregate({ _sum: { value: true }, where: { ...dateFilter } });

  // --- Computed metrics ---
  const conversionRate = totalLeads > 0 ? ((totalClients / totalLeads) * 100).toFixed(1) : "0.0";
  const sphToInvoiceRate = totalQuotations > 0 ? ((totalInvoices / totalQuotations) * 100).toFixed(1) : "0.0";
  const paymentRate = totalInvoices > 0 ? ((paidInvoices / totalInvoices) * 100).toFixed(1) : "0.0";

  const formatCurrency = (val: number | null) => {
    if (!val) return "Rp 0";
    return `Rp ${val.toLocaleString("id-ID")}`;
  };

  // --- Average Response Time ---
  const customersWithMessages = await prisma.customer.findMany({
    where: {
      messages: { some: {} },
      ...dateFilter,
    },
    include: {
      messages: {
        orderBy: [
          { createdAt: "asc" },
          { id: "asc" }
        ],
      },
      invoices: {
        where: { status: "PAID" },
        orderBy: { updatedAt: "asc" },
      }
    }
  });

  let totalResponseTimeCSMs = 0;
  let responseCountCS = 0;
  
  let totalResponseTimeCRMMs = 0;
  let responseCountCRM = 0;

  customersWithMessages.forEach(customer => {
    // 1. CS Response Time: waktu antara bubble terakhir Karina (atau klien) sebelum CS pertama kali membalas
    const firstCSMsg = customer.messages.find(m => m.sender === "cs");
    
    if (firstCSMsg) {
      const firstCSIndex = customer.messages.indexOf(firstCSMsg);
      let referenceMsg = null;
      // Cari bubble bot (Karina) atau customer persis sebelum CS membalas
      for (let i = firstCSIndex - 1; i >= 0; i--) {
        if (customer.messages[i].sender === "bot" || customer.messages[i].sender === "customer") {
          referenceMsg = customer.messages[i];
          break;
        }
      }
      
      const referenceTime = referenceMsg ? referenceMsg.createdAt : customer.messages[0]?.createdAt;

      if (referenceTime) {
        const diffMs = firstCSMsg.createdAt.getTime() - referenceTime.getTime();
        if (diffMs >= 0) {
          totalResponseTimeCSMs += diffMs;
          responseCountCS++;
        }
      }
    }

    // 2. CRM Response Time: waktu antara Invoice menjadi PAID dengan bubble pertama CRM setelahnya
    const firstPaidInvoice = customer.invoices?.[0];
    if (firstPaidInvoice) {
      const firstCRMMsg = customer.messages.find(m => m.sender === "crm" && m.createdAt.getTime() >= firstPaidInvoice.updatedAt.getTime());
      if (firstCRMMsg) {
        const diffMs = firstCRMMsg.createdAt.getTime() - firstPaidInvoice.updatedAt.getTime();
        if (diffMs >= 0) {
          totalResponseTimeCRMMs += diffMs;
          responseCountCRM++;
        }
      }
    }
  });

  const formatAvgTime = (totalMs: number, count: number) => {
    if (count === 0) return "-";
    const avgMs = totalMs / count;
    const avgMins = Math.round(avgMs / 60000);
    if (avgMins === 0) return "< 1m";
    if (avgMins < 60) return `${avgMins}m`;
    const hours = Math.floor(avgMins / 60);
    const mins = avgMins % 60;
    return `${hours}h ${mins}m`;
  };

  const avgResponseTimeCS = formatAvgTime(totalResponseTimeCSMs, responseCountCS);
  const avgResponseTimeCRM = formatAvgTime(totalResponseTimeCRMMs, responseCountCRM);

  return (
    <div className="flex h-full w-full flex-col bg-brand-snow p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-primary flex items-center gap-2">
            <LayoutDashboard className="h-7 w-7 text-brand-gold" />
            Leads Dashboard
          </h1>
          <p className="text-sm text-brand-onyx/60 mt-1">Ringkasan data dari seluruh modul Sales &amp; CRM.</p>
        </div>
        <div>
          <MonthYearFilter />
        </div>
      </div>

      {/* Response Times Section */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-4 px-1">
          <Clock className="w-3.5 h-3.5 text-brand-gold" />
          Average Response Time
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Response Time CS */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative">
              {/* Stopwatch Top Button */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-4 bg-brand-gold" style={{ borderRadius: '4px' }} />
              {/* Stopwatch Right Button */}
              <div className="absolute top-2 -right-1 w-6 h-3 bg-brand-gold rotate-45" style={{ borderRadius: '3px' }} />
              
              <div className="w-40 h-40 rounded-[50%] border-[6px] border-brand-gold flex flex-col items-center justify-center bg-transparent mb-4 shadow-[0_0_15px_rgba(158,128,81,0.15)] relative z-10 bg-brand-snow">
                <span className="text-3xl font-black text-brand-primary">{avgResponseTimeCS}</span>
              </div>
            </div>
            <p className="text-sm text-brand-onyx font-bold uppercase tracking-widest">Tim CS</p>
          </div>

          {/* Response Time CRM */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative">
              {/* Stopwatch Top Button */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-4 bg-brand-gold" style={{ borderRadius: '4px' }} />
              {/* Stopwatch Right Button */}
              <div className="absolute top-2 -right-1 w-6 h-3 bg-brand-gold rotate-45" style={{ borderRadius: '3px' }} />

              <div className="w-40 h-40 rounded-[50%] border-[6px] border-brand-gold flex flex-col items-center justify-center bg-transparent mb-4 shadow-[0_0_15px_rgba(158,128,81,0.15)] relative z-10 bg-brand-snow">
                <span className="text-3xl font-black text-brand-primary">{avgResponseTimeCRM}</span>
              </div>
            </div>
            <p className="text-sm text-brand-onyx font-bold uppercase tracking-widest">Tim CRM</p>
          </div>
        </div>
      </div>

      {/* Performance Rates */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-3 px-1">
          <PieChart className="w-3.5 h-3.5 text-brand-gold" />
          Performance Rates
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Conversion Rate */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden flex flex-col">
            <div className="h-1 bg-brand-gold" />
            <div className="px-6 py-5 flex-1">
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-3xl font-black text-brand-gold">{conversionRate}%</p>
                <TrendingUp className="w-5 h-5 text-slate-400" />
              </div>
              <div className="w-full bg-slate-700 h-1.5 mb-3 rounded-full overflow-hidden">
                <div className="bg-brand-gold h-1.5 transition-all" style={{ width: `${conversionRate}%` }} />
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wide">Conversion Rate</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">Leads → Clients</p>
            </div>
          </div>

          {/* SPH → Invoice Rate */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden flex flex-col">
            <div className="h-1 bg-brand-gold" />
            <div className="px-6 py-5 flex-1">
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-3xl font-black text-brand-gold">{sphToInvoiceRate}%</p>
                <TrendingUp className="w-5 h-5 text-slate-400" />
              </div>
              <div className="w-full bg-slate-700 h-1.5 mb-3 rounded-full overflow-hidden">
                <div className="bg-brand-gold h-1.5 transition-all" style={{ width: `${sphToInvoiceRate}%` }} />
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wide">SPH → Invoice Rate</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">Quotation → Invoice</p>
            </div>
          </div>

          {/* Payment Rate */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden flex flex-col">
            <div className="h-1 bg-brand-gold" />
            <div className="px-6 py-5 flex-1">
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-3xl font-black text-brand-gold">{paymentRate}%</p>
                <TrendingUp className="w-5 h-5 text-slate-400" />
              </div>
              <div className="w-full bg-slate-700 h-1.5 mb-3 rounded-full overflow-hidden">
                <div className="bg-brand-gold h-1.5 transition-all" style={{ width: `${paymentRate}%` }} />
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wide">Payment Rate</p>
              <p className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">Invoice Lunas / Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Section — 2 columns */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-4 px-1">
          <Database className="w-3.5 h-3.5 text-brand-gold" />
          Data Summary
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Leads & Clients Detail */}
        <div className="bg-white border border-brand-platinum shadow-sm">
          <div className="px-5 py-3 border-b border-brand-platinum">
            <h3 className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              Leads &amp; Clients
            </h3>
          </div>
          <div className="divide-y divide-brand-platinum/50">
            {/* Row: Total Raw Leads */}
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-semibold text-brand-onyx">Total Raw Leads</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-xl font-black text-brand-primary">{totalLeads}</span>
                <span className="text-[10px] text-brand-onyx/40 uppercase font-semibold w-16">ALL</span>
              </div>
            </div>
            {/* Row: Total Clients */}
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-semibold text-brand-onyx">Total Clients</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-xl font-black text-brand-primary">{totalClients}</span>
                <span className="text-[10px] text-brand-onyx/40 uppercase font-semibold w-16">Post-DP</span>
              </div>
            </div>
            {/* Row: Total Projects */}
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-semibold text-brand-onyx">Total Projects</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-xl font-black text-brand-primary">{totalProjects}</span>
                <span className="text-[10px] text-brand-onyx/40 uppercase font-semibold w-16">Pipeline</span>
              </div>
            </div>
            {/* Row: Nilai Project */}
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-semibold text-brand-onyx">Nilai Project</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-lg font-black text-brand-primary">{formatCurrency(projectValue._sum.value)}</span>
                <span className="text-[10px] text-brand-onyx/40 uppercase font-semibold w-16">Estimasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dokumen & Transaksi Detail */}
        <div className="bg-white border border-brand-platinum shadow-sm">
          <div className="px-5 py-3 border-b border-brand-platinum">
            <h3 className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Dokumen &amp; Transaksi
            </h3>
          </div>
          <div className="divide-y divide-brand-platinum/50">
            {/* Row: Quotations */}
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-semibold text-brand-onyx">Quotations (SPH)</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-xl font-black text-brand-primary">{totalQuotations}</span>
                <span className="text-[10px] text-brand-onyx/40 uppercase font-semibold w-24 truncate">{formatCurrency(quotationValue._sum.amount)}</span>
              </div>
            </div>
            {/* Row: Total Invoices */}
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-semibold text-brand-onyx">Total Invoices</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-xl font-black text-brand-primary">{totalInvoices}</span>
                <span className="text-[10px] text-brand-onyx/40 uppercase font-semibold w-24 truncate">{formatCurrency(invoiceValue._sum.amount)}</span>
              </div>
            </div>
            {/* Row: Invoice Lunas */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-brand-gold-light">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-semibold text-brand-gold">Invoice Lunas</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-xl font-black text-brand-primary">{paidInvoices}</span>
                <span className="text-[10px] text-brand-gold/70 uppercase font-semibold w-24 truncate">{formatCurrency(paidValue._sum.amount)}</span>
              </div>
            </div>
            {/* Row: Invoice Belum Lunas */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-red-50/50">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 text-red-500" />
                <span className="text-sm font-semibold text-red-500">Invoice Belum Lunas</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-xl font-black text-red-600">{unpaidInvoices}</span>
                <span className="text-[10px] text-red-400 uppercase font-semibold w-24 truncate">Menunggu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

