"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAdsLeads(source?: "GOOGLE" | "META") {
  const where = source ? { source } : {};
  return await prisma.adsLead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

// Untuk dummy testing di UI karena Webhook belum live
export async function injectDummyAdsLead(data: {
  source: "GOOGLE" | "META";
  campaignName: string;
  customerName: string;
  customerPhone: string;
}) {
  await prisma.adsLead.create({
    data: {
      ...data,
      rawData: { note: "Injected manually for testing" },
    },
  });
  
  if (data.source === "GOOGLE") revalidatePath("/app/google-ads");
  if (data.source === "META") revalidatePath("/app/meta-ads");
}
