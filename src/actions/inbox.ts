"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCustomers() {
  const customers = await prisma.customer.findMany({
    where: {
      messages: { some: {} }
    },
    orderBy: { updatedAt: "desc" },
    include: {
      qualification: true,
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
  return customers;
}

export async function getMessages(customerId: string) {
  const messages = await prisma.message.findMany({
    where: { customerId },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}

export async function sendMessage(customerId: string, text: string, sender: "customer" | "bot" | "cs" | "crm") {
  const message = await prisma.message.create({
    data: {
      customerId,
      text,
      sender,
    },
  });
  
  await prisma.customer.update({
    where: { id: customerId },
    data: { updatedAt: new Date() },
  });

  revalidatePath("/app");
  return message;
}

export async function changeChatOwner(customerId: string, owner: string) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { owner },
  });
  revalidatePath("/app");
}

export async function updateCustomerQualification(customerId: string, customerData: any, qualificationData: any) {
  // Update Customer (name, company, domicile)
  const currentCustomer = await prisma.customer.findUnique({ where: { id: customerId } });
  
  let newStatus = currentCustomer?.status;
  if (currentCustomer?.status === "active" && qualificationData.items && qualificationData.items.length > 0) {
    newStatus = "qualified";
  }

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      ...customerData,
      ...(newStatus && { status: newStatus }),
    },
  });

  // Upsert OrderQualification
  await prisma.orderQualification.upsert({
    where: { customerId },
    update: qualificationData,
    create: {
      customerId,
      ...qualificationData
    }
  });

  revalidatePath("/app");
}

export async function updateCustomerStatus(id: string, status: string) {
  await prisma.customer.update({
    where: { id },
    data: { status }
  });
  revalidatePath('/app/leads');
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({
    where: { id }
  });
  revalidatePath('/app/leads');
}

export async function createCustomer(data: { name: string; company?: string; phone: string }) {
  const customer = await prisma.customer.create({
    data: {
      name: data.name,
      company: data.company || null,
      phone: data.phone,
      status: "active",
      owner: "Karina"
    }
  });
  revalidatePath('/app/leads');
  revalidatePath('/app/clients');
  return customer;
}

export async function markMessagesAsRead(customerId: string) {
  await prisma.message.updateMany({
    where: {
      customerId,
      sender: "customer",
      isRead: false
    },
    data: {
      isRead: true
    }
  });
  revalidatePath("/app");
}

