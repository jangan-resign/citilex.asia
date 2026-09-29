"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { PipelineStage } from "@prisma/client";

export async function getAllCustomersForDropdown() {
  return await prisma.customer.findMany({
    orderBy: { name: "asc" }
  });
}

export async function getPipelineItems() {
  const projects = await prisma.project.findMany({
    include: { 
      customer: {
        include: {
          qualification: true
        }
      }
    },
    orderBy: { createdAt: "desc" },
  });

  return projects.map((p) => ({
    id: p.id,
    clientName: p.customer.name,
    customerCompany: p.customer.company,
    customerDomicile: p.customer.domicile,
    projectName: p.title,
    amount: p.value,
    status: p.status, // This maps to the Kanban column ID
    pipeline: p.pipeline, // DEAL, PRE_PROD, etc.
    date: p.createdAt.toISOString().split("T")[0],
    items: (p.items as any) || []
  }));
}

export async function createProjectFromLead(customerId: string, dataArray: any[], targetStatus: string = "new-lead") {
  // calculate total value
  const totalValue = dataArray.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  
  // Title could be product name
  const title = dataArray.length > 0 ? dataArray[0].name || dataArray[0].modelBase || "Pesanan Baru" : "Pesanan Baru";

  await prisma.project.create({
    data: {
      customerId,
      title,
      value: totalValue,
      pipeline: "DEAL",
      status: targetStatus,
      items: dataArray,
    }
  });
  revalidatePath("/app");
}

export async function createProject({ 
  title, value, customerId, pipeline, status, items,
  customerName, customerCompany, customerDomicile, customerPhone
}: { 
  title: string; value: number; customerId: string; pipeline: PipelineStage; status: string; items?: any[],
  customerName?: string; customerCompany?: string; customerDomicile?: string; customerPhone?: string;
}) {
  let finalCustomerId = customerId;

  if (customerId === "manual") {
    const newCustomer = await prisma.customer.create({
      data: {
        name: customerName || "Klien Manual",
        company: customerCompany || null,
        domicile: customerDomicile || null,
        phone: customerPhone || `manual-${Date.now()}-${Math.floor(Math.random()*1000)}`
      }
    });
    finalCustomerId = newCustomer.id;
  }

  await prisma.project.create({
    data: {
      customerId: finalCustomerId,
      title,
      value,
      pipeline,
      status,
      items: items || [],
    }
  });
  revalidatePath('/app');
}

export async function updateProject({ projectId, newPipeline, newStatus }: { projectId: string; newPipeline: PipelineStage; newStatus: string }) {
  await prisma.project.update({
    where: { id: projectId },
    data: {
      pipeline: newPipeline,
      status: newStatus
    }
  });

  revalidatePath("/app/pipelines");
}

export async function deleteProject(projectId: string) {
  await prisma.project.delete({
    where: { id: projectId }
  });
  revalidatePath("/app/pipelines");
}

export async function clearColumn(pipeline: PipelineStage, status: string) {
  await prisma.project.deleteMany({
    where: {
      pipeline,
      status
    }
  });
  revalidatePath("/app/pipelines");
}
