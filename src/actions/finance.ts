"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

// --- CASH FLOW ---
export async function getCashFlows(month?: number, year?: number) {
  const where: any = {};
  
  if (month !== undefined && year !== undefined) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    where.date = {
      gte: startDate,
      lte: endDate,
    };
  }

  return await prisma.cashFlow.findMany({
    where,
    orderBy: { date: "desc" },
  });
}

export async function addCashFlow(data: {
  date: Date;
  type: string;
  amount: number;
  category: string;
  description: string;
  referenceId?: string;
}) {
  const result = await prisma.cashFlow.create({
    data,
  });
  revalidatePath("/app/finance/cash-flow");
  return result;
}

// --- EXPENSES ---
export async function getExpenses(month?: number, year?: number) {
  const where: any = {};
  
  if (month !== undefined && year !== undefined) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    where.date = {
      gte: startDate,
      lte: endDate,
    };
  }

  return await prisma.expense.findMany({
    where,
    orderBy: { date: "desc" },
  });
}

export async function recordExpense(data: {
  date: Date;
  amount: number;
  category: string;
  description: string;
  receiptUrl?: string;
}) {
  const result = await prisma.expense.create({
    data,
  });
  revalidatePath("/app/finance/expenses");
  return result;
}

export async function updateExpenseStatus(id: string, status: string) {
  const expense = await prisma.expense.update({
    where: { id },
    data: { status },
  });

  // If approved/paid, create a cash flow OUT
  if (status === "PAID") {
    await prisma.cashFlow.create({
      data: {
        date: expense.date,
        type: "OUT",
        amount: expense.amount,
        category: "OPERATIONAL",
        description: expense.description,
        referenceId: expense.id,
      },
    });
    revalidatePath("/app/finance/cash-flow");
  }

  revalidatePath("/app/finance/expenses");
  return expense;
}

// --- TAX RECORDS ---
export async function getTaxRecords(year?: string) {
  const where = year ? { period: { contains: year } } : {};
  return await prisma.taxRecord.findMany({
    where,
    orderBy: { period: "desc" },
  });
}

export async function recordTax(data: {
  period: string;
  type: string;
  amount: number;
  description?: string;
}) {
  const result = await prisma.taxRecord.create({
    data,
  });
  revalidatePath("/app/finance/tax");
  return result;
}

export async function markTaxPaid(id: string) {
  const tax = await prisma.taxRecord.update({
    where: { id },
    data: {
      status: "PAID",
      paidAt: new Date(),
    },
  });

  // Create a cash flow OUT for tax payment
  await prisma.cashFlow.create({
    data: {
      date: tax.paidAt!,
      type: "OUT",
      amount: tax.amount,
      category: "TAX",
      description: `Pembayaran ${tax.type} Periode ${tax.period}`,
      referenceId: tax.id,
    },
  });

  revalidatePath("/app/finance/tax");
  revalidatePath("/app/finance/cash-flow");
  return tax;
}
