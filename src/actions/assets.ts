"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { compileKarinaContext } from "./playbook";

export async function getAssets() {
  return await prisma.asset.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createAsset(data: { name: string; type: string; url: string; size: string; description?: string }) {
  const asset = await prisma.asset.create({
    data,
  });
  await compileKarinaContext();
  revalidatePath("/app/assets");
  return asset;
}

export async function deleteAsset(id: string) {
  await prisma.asset.delete({ where: { id } });
  await compileKarinaContext();
  revalidatePath("/app/assets");
}
