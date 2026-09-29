"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getInventory() {
  return await prisma.inventory.findMany({
    orderBy: {
      fabric: 'asc'
    },
    include: {
      logs: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      }
    }
  });
}

export async function getInventoryLogs() {
  return await prisma.inventoryLog.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      inventory: true
    }
  });
}

export async function updateStock(data: {
  fabric: string;
  color: string;
  changeKg: number;
  type: 'IN' | 'OUT';
  notes?: string;
}) {
  const { fabric, color, changeKg, type, notes } = data;

  // Ensure positive number for change
  const absChange = Math.abs(changeKg);

  if (absChange === 0) {
    throw new Error("Jumlah harus lebih dari 0");
  }

  // Find existing inventory item or create it
  let inventory = await prisma.inventory.findFirst({
    where: { fabric, color }
  });

  if (!inventory) {
    if (type === 'OUT') {
      throw new Error(`Stok ${fabric} - ${color} tidak ditemukan. Tidak dapat melakukan pengeluaran.`);
    }
    
    // Create new
    inventory = await prisma.inventory.create({
      data: {
        fabric,
        color,
        stockKg: 0
      }
    });
  }

  const newStock = type === 'IN' 
    ? inventory.stockKg + absChange 
    : inventory.stockKg - absChange;

  if (newStock < 0) {
    throw new Error(`Stok tidak mencukupi! Sisa stok saat ini: ${inventory.stockKg} Kg`);
  }

  // Use a transaction to update stock and create log
  await prisma.$transaction([
    prisma.inventory.update({
      where: { id: inventory.id },
      data: { stockKg: newStock }
    }),
    prisma.inventoryLog.create({
      data: {
        inventoryId: inventory.id,
        type,
        amountKg: absChange,
        notes: notes || null
      }
    })
  ]);

  revalidatePath('/app/inventory');
  return { success: true, newStock };
}
