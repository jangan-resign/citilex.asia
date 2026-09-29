"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

// --- EMPLOYEES ---
export async function getEmployees() {
  return await prisma.employee.findMany({
    orderBy: { employeeId: "asc" },
  });
}

export async function addEmployee(data: {
  employeeId: string;
  name: string;
  position: string;
  department: string;
  joinedAt: Date;
  baseSalary: number;
  status: string;
}) {
  const result = await prisma.employee.create({
    data,
  });
  revalidatePath("/app/hrd/employees");
  return result;
}

export async function deleteEmployee(id: string) {
  await prisma.employee.delete({
    where: { id },
  });
  revalidatePath("/app/hrd/employees");
}

// --- ATTENDANCE ---
export async function getAttendances(date?: Date) {
  const where = date
    ? {
        date: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lte: new Date(date.setHours(23, 59, 59, 999)),
        },
      }
    : {};

  return await prisma.attendance.findMany({
    where,
    include: { employee: true },
    orderBy: { date: "desc" },
  });
}

export async function recordAttendance(data: {
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: string;
  notes?: string;
}) {
  const result = await prisma.attendance.create({
    data,
  });
  revalidatePath("/app/hrd/attendance");
  return result;
}

// --- PAYROLL ---
export async function getPayrolls(period?: string) {
  const where = period ? { period } : {};
  return await prisma.payroll.findMany({
    where,
    include: { employee: true },
    orderBy: { period: "desc" },
  });
}

export async function generatePayroll(data: {
  employeeId: string;
  period: string;
  baseSalary: number;
  allowance: number;
  deduction: number;
  dynamicBonus: number;
}) {
  const totalAmount = data.baseSalary + data.allowance + data.dynamicBonus - data.deduction;
  
  const result = await prisma.payroll.create({
    data: {
      ...data,
      totalAmount,
    },
  });
  revalidatePath("/app/hrd/payroll");
  return result;
}

export async function markPayrollPaid(id: string) {
  const result = await prisma.payroll.update({
    where: { id },
    data: {
      status: "PAID",
      paidAt: new Date(),
    },
  });
  revalidatePath("/app/hrd/payroll");
  return result;
}

// --- APPLICANTS ---
export async function getApplicants() {
  return await prisma.applicant.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function addApplicant(data: {
  name: string;
  position: string;
  email?: string;
  phone: string;
  resumeUrl?: string;
}) {
  const result = await prisma.applicant.create({
    data,
  });
  revalidatePath("/app/hrd/recruitment");
  return result;
}

// --- TERMINATION ---
export async function getTerminations() {
  return await prisma.termination.findMany({
    include: { employee: true },
    orderBy: { date: "desc" },
  });
}

export async function recordTermination(data: {
  employeeId: string;
  date: Date;
  type: string;
  reason?: string;
  severancePay: number;
}) {
  // Update employee status to TERMINATED
  await prisma.employee.update({
    where: { id: data.employeeId },
    data: { status: "TERMINATED" },
  });

  const result = await prisma.termination.create({
    data: {
      ...data,
      status: "COMPLETED",
    },
  });
  revalidatePath("/app/hrd/termination");
  revalidatePath("/app/hrd/employees");
  return result;
}
