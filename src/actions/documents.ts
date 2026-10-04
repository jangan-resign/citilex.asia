"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getQuotations(month: number | "all" = "all", year: number | "all" = "all") {
  const where: any = {};
  if (year !== "all") {
    if (month !== "all") {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      where.createdAt = { gte: startDate, lt: endDate };
    } else {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year + 1, 0, 1);
      where.createdAt = { gte: startDate, lt: endDate };
    }
  }

  return await prisma.quotation.findMany({
    where,
    include: { project: { include: { customer: true } }, customer: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function saveQuotationToDb(data: {
  docNumber: string;
  projectId?: string;
  customerId?: string;
  amount: number;
  status?: string;
  customerName?: string;
  customerCompany?: string;
  customerDomicile?: string;
  customerPhone?: string;
  items?: any[];
}) {
  let finalItems: any[] = data.items || [];
  
  if (finalItems.length === 0 && data.customerId) {
    const customer = await prisma.customer.findUnique({
      where: { id: data.customerId },
      include: { qualification: true }
    });
    if (customer?.qualification?.items) {
      finalItems = Array.isArray(customer.qualification.items) ? customer.qualification.items : [];
    }
  }

  await prisma.quotation.upsert({
    where: { docNumber: data.docNumber },
    update: {
      amount: data.amount,
      status: data.status || "Draft",
      projectId: data.projectId || null,
      customerName: data.customerName || "Kustomer",
      customerCompany: data.customerCompany || null,
      customerDomicile: data.customerDomicile || null,
      customerPhone: data.customerPhone || null,
      items: finalItems,
    },
    create: {
      docNumber: data.docNumber,
      customerName: data.customerName || "Kustomer",
      customerCompany: data.customerCompany || null,
      customerDomicile: data.customerDomicile || null,
      customerPhone: data.customerPhone || null,
      amount: data.amount,
      projectId: data.projectId || null,
      customerId: data.customerId || null,
      status: data.status || "Draft",
      items: finalItems,
    },
  });
  revalidatePath("/app/quotations");
}

export async function getInvoices(month: number | "all" = "all", year: number | "all" = "all") {
  const where: any = {};
  if (year !== "all") {
    if (month !== "all") {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      where.createdAt = { gte: startDate, lt: endDate };
    } else {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year + 1, 0, 1);
      where.createdAt = { gte: startDate, lt: endDate };
    }
  }

  return await prisma.invoice.findMany({
    where,
    include: { project: { include: { customer: true } }, customer: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function saveInvoiceToDb(data: {
  docNumber: string;
  projectId?: string;
  customerId?: string;
  amount: number;
  type: string;
  status?: string;
  customerName?: string;
  customerCompany?: string;
  customerDomicile?: string;
  customerPhone?: string;
  items?: any[];
}) {
  let finalItems: any[] = data.items || [];
  
  if (finalItems.length === 0 && data.customerId) {
    const customer = await prisma.customer.findUnique({
      where: { id: data.customerId },
      include: { qualification: true }
    });
    if (customer?.qualification?.items) {
      finalItems = Array.isArray(customer.qualification.items) ? customer.qualification.items : [];
    }
  }

  const upsertedInvoice = await prisma.invoice.upsert({
    where: { docNumber: data.docNumber },
    update: {
      projectId: data.projectId || null,
      customerId: data.customerId || null,
      customerName: data.customerName || null,
      customerCompany: data.customerCompany || null,
      customerDomicile: data.customerDomicile || null,
      amount: data.amount,
      type: data.type,
      items: finalItems,
    },
    create: {
      docNumber: data.docNumber,
      projectId: data.projectId || null,
      customerId: data.customerId || null,
      customerName: data.customerName || null,
      customerCompany: data.customerCompany || null,
      customerDomicile: data.customerDomicile || null,
      amount: data.amount,
      type: data.type,
      status: data.status || "UNPAID",
      items: finalItems,
    },
  });

  let customerId = data.customerId;
  if (!customerId) {
    const newCustomer = await prisma.customer.create({
      data: {
        name: data.customerName || "Klien Manual",
        company: data.customerCompany,
        domicile: data.customerDomicile,
        phone: data.customerPhone || `manual-${Date.now()}-${Math.floor(Math.random()*1000)}`
      }
    });
    customerId = newCustomer.id;
    await prisma.invoice.update({ where: { id: upsertedInvoice.id }, data: { customerId: newCustomer.id } });
  }

  if (customerId) {
    let project = upsertedInvoice.projectId ? await prisma.project.findUnique({ where: { id: upsertedInvoice.projectId } }) : null;
    
    if (!project) {
      const existingProject = await prisma.project.findFirst({
         where: { customerId: customerId, status: { notIn: ['completed', 'cancelled'] } }
      });
      if (existingProject) {
         project = existingProject;
         await prisma.invoice.update({ where: { id: upsertedInvoice.id }, data: { projectId: project.id } });
         await prisma.project.update({ where: { id: project.id }, data: { pipeline: "DEAL", status: 'invoice-dp-issued', value: Math.max(project.value, data.amount) }});
      } else {
         project = await prisma.project.create({
           data: {
             customerId: customerId,
             title: data.customerName ? `Pesanan ${data.customerName}` : "Pesanan Baru",
             value: data.amount,
             pipeline: "DEAL",
             status: "invoice-dp-issued",
             items: finalItems,
           }
         });
         await prisma.invoice.update({ where: { id: upsertedInvoice.id }, data: { projectId: project.id } });
      }
    } else {
       if (project.pipeline === "DEAL") {
           await prisma.project.update({ where: { id: project.id }, data: { status: 'invoice-dp-issued', value: Math.max(project.value, data.amount) }});
       }
    }
  }

  revalidatePath("/app/invoices");
}

export async function markInvoicePaid(id: string) {
  const invoice = await prisma.invoice.update({
    where: { id },
    data: {
      status: "PAID",
      paidAt: new Date(),
    },
  });

  let customerId = invoice.customerId;
  if (!customerId) {
    // Auto-create customer if not exists
    const newCustomer = await prisma.customer.create({
      data: {
        name: invoice.customerName || "Klien Manual",
        company: invoice.customerCompany,
        domicile: invoice.customerDomicile,
        phone: invoice.customerPhone || `manual-${Date.now()}-${Math.floor(Math.random()*1000)}`,
        owner: "CRM"
      }
    });
    customerId = newCustomer.id;
    await prisma.invoice.update({ where: { id }, data: { customerId: newCustomer.id } });
  } else {
    // Change owner to CRM for existing customer
    await prisma.customer.update({
      where: { id: customerId },
      data: { owner: "CRM" }
    });
  }

  if (customerId) {
    let project = invoice.projectId ? await prisma.project.findUnique({ where: { id: invoice.projectId } }) : null;
    
    if (!project) {
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        include: { qualification: true }
      });
      // Fallback to invoice.items if customer has no items
      const customerItems = customer?.qualification?.items ? (Array.isArray(customer.qualification.items) ? customer.qualification.items : []) : invoice.items;
      
      project = await prisma.project.create({
        data: {
          customerId: customerId,
          title: invoice.customerName ? `Pesanan ${invoice.customerName}` : "Pesanan Baru",
          value: invoice.amount,
          pipeline: "PRE_PROD",
          status: "drafting",
          items: customerItems,
        }
      });
      await prisma.invoice.update({ where: { id }, data: { projectId: project.id } });
    } else {
      await prisma.project.update({
        where: { id: project.id },
        data: { pipeline: "PRE_PROD", status: "drafting", value: Math.max(project.value, invoice.amount) }
      });
    }
  }

  // Sinkronisasi otomatis ke Cash Flow (IN)
  await prisma.cashFlow.create({
    data: {
      date: invoice.paidAt!,
      type: "IN",
      amount: invoice.amount,
      category: "INVOICE",
      description: `Pelunasan Invoice ${invoice.docNumber || "-"} ${invoice.customerName ? `(${invoice.customerName})` : ""}`,
      referenceId: invoice.id,
    }
  });

  revalidatePath("/app", "layout");
}


export async function deleteInvoice(id: string) {
  await prisma.invoice.delete({ where: { id } });
  revalidatePath('/app/invoices');
}

export async function deleteQuotation(id: string) {
  await prisma.quotation.delete({ where: { id } });
  revalidatePath('/app/quotations');
}

export async function updateQuotationStatus(id: string, status: string) {
  const quotation = await prisma.quotation.update({
    where: { id },
    data: { status }
  });

  let customerId = quotation.customerId;
  if (status === "Sent" && !customerId) {
    // Auto-create customer if not exists
    const newCustomer = await prisma.customer.create({
      data: {
        name: quotation.customerName || "Klien Manual",
        company: quotation.customerCompany,
        domicile: quotation.customerDomicile,
        phone: quotation.customerPhone || `manual-${Date.now()}-${Math.floor(Math.random()*1000)}`
      }
    });
    customerId = newCustomer.id;
    await prisma.quotation.update({ where: { id }, data: { customerId: newCustomer.id } });
  }

  if (status === "Sent" && customerId) {
    let project = quotation.projectId ? await prisma.project.findUnique({ where: { id: quotation.projectId } }) : null;
    
    if (!project) {
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        include: { qualification: true }
      });
      // Fallback to quotation.items if customer has no items
      const customerItems = customer?.qualification?.items ? (Array.isArray(customer.qualification.items) ? customer.qualification.items : []) : quotation.items;
      
      project = await prisma.project.create({
        data: {
          customerId: customerId,
          title: quotation.customerName ? `Pesanan ${quotation.customerName}` : "Pesanan Baru",
          value: quotation.amount,
          pipeline: "DEAL",
          status: "quotation-sent",
          items: customerItems,
        }
      });
      await prisma.quotation.update({ where: { id }, data: { projectId: project.id } });
    } else {
      await prisma.project.update({
        where: { id: project.id },
        data: { pipeline: "DEAL", status: "quotation-sent" }
      });
    }
  }

  revalidatePath('/app/quotations');
}


export async function markInvoiceUnpaid(id: string) {
  const invoice = await prisma.invoice.update({
    where: { id },
    data: {
      status: 'UNPAID',
      paidAt: null,
    },
  });

  await prisma.cashFlow.deleteMany({
    where: { referenceId: id, category: 'INVOICE' },
  });

  if (invoice.projectId) {
    await prisma.project.update({
      where: { id: invoice.projectId },
      data: {
        pipeline: "DEAL",
        status: "invoice-dp-issued"
      }
    });
  }

  if (invoice.customerId) {
    await prisma.customer.update({
      where: { id: invoice.customerId },
      data: { owner: "CS" }
    });
  }

  revalidatePath('/app', 'layout');
}

