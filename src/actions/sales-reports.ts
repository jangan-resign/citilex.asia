"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSalesDashboardData(month: number | "all", year: number | "all") {
  const customerWhere: any = {};
  const projectWhere: any = { status: { not: "cancelled" } };
  
  if (year !== "all") {
    if (month !== "all") {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      customerWhere.createdAt = { gte: startDate, lt: endDate };
      projectWhere.createdAt = { gte: startDate, lt: endDate };
    } else {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year + 1, 0, 1);
      customerWhere.createdAt = { gte: startDate, lt: endDate };
      projectWhere.createdAt = { gte: startDate, lt: endDate };
    }
  }

  // 1. ALL LEADS (Raw Leads = All Leads as requested by user)
  const allCustomers = await prisma.customer.findMany({
    where: customerWhere,
    include: {
      invoices: true,
      projects: true
    },
    orderBy: { createdAt: 'desc' }
  });

  const allLeads = allCustomers.map(c => ({
    id: c.id,
    name: c.name,
    phone: c.phone,
    company: c.company,
    status: c.status,
    notes: c.internalNotes || "",
    createdAt: c.createdAt.toISOString(),
    isClosed: c.invoices.length > 0 || c.projects.some(p => p.pipeline !== "DEAL")
  }));

  // 2. Qualified Leads (status == 'qualified', not closed)
  const qualifiedLeads = allLeads.filter(l => l.status === "qualified" && !l.isClosed);

  // 3. Closing Details (Projects that have passed the DEAL stage or have invoices)
  const closedProjectWhere: any = { 
    status: { not: "cancelled" },
    pipeline: { not: "DEAL" } // quotation-sent is in DEAL, so it won't be counted as closed yet
  };
  
  if (year !== "all") {
    if (month !== "all") {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      closedProjectWhere.createdAt = { gte: startDate, lt: endDate };
    } else {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year + 1, 0, 1);
      closedProjectWhere.createdAt = { gte: startDate, lt: endDate };
    }
  }

  const projects = await prisma.project.findMany({
    where: closedProjectWhere,
    include: { customer: true },
    orderBy: { createdAt: 'desc' }
  });

  const closingDetails = projects.map(p => ({
    id: p.id,
    customerName: p.customer.name,
    customerPhone: p.customer.phone,
    customerCompany: p.customer.company,
    projectName: p.title,
    value: p.value,
    items: p.items,
    createdAt: p.createdAt.toISOString()
  }));

  // 4. Metrics calculation
  const totalRawLeads = allLeads.length; // Raw Leads is now representing ALL leads
  const totalQualified = qualifiedLeads.length;
  // Use the unique count of closed leads from the cohort for conversion rate, not the raw project count
  const totalClosing = allLeads.filter(l => l.isClosed).length;
  const closingRate = totalRawLeads > 0 ? (totalClosing / totalRawLeads) * 100 : 0;

  return {
    metrics: {
      rawLeadsCount: totalRawLeads,
      qualifiedLeadsCount: totalQualified,
      closingProjectsCount: projects.length, // Display the actual count of closed projects for the card
      closingRate
    },
    allLeads,
    qualifiedLeads,
    closingDetails
  };
}

export async function updateLeadNotes(customerId: string, notes: string) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { internalNotes: notes }
  });
  revalidatePath('/app/sales-reports');
}
