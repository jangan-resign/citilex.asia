"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

// --- SOP Actions ---
export async function getSops() {
  return await prisma.sop.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function createSop(data: { title: string; description: string; content: string }) {
  const sop = await prisma.sop.create({
    data,
  });
  await compileKarinaContext();
  revalidatePath("/app/playbook");
  return sop;
}

export async function updateSop(id: string, data: { title: string; description: string; content: string; isActive: boolean }) {
  const sop = await prisma.sop.update({
    where: { id },
    data,
  });
  await compileKarinaContext();
  revalidatePath("/app/playbook");
  return sop;
}

export async function deleteSop(id: string) {
  await prisma.sop.delete({ where: { id } });
  await compileKarinaContext();
  revalidatePath("/app/playbook");
}

// --- Knowledge Actions ---
export async function getKnowledge() {
  return await prisma.knowledge.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function createKnowledge(data: { title: string; content: string; category: string }) {
  const knowledge = await prisma.knowledge.create({
    data,
  });
  await compileKarinaContext();
  revalidatePath("/app/playbook");
  return knowledge;
}

export async function updateKnowledge(id: string, data: { title: string; content: string; category: string }) {
  const knowledge = await prisma.knowledge.update({
    where: { id },
    data,
  });
  await compileKarinaContext();
  revalidatePath("/app/playbook");
  return knowledge;
}

export async function deleteKnowledge(id: string) {
  await prisma.knowledge.delete({ where: { id } });
  await compileKarinaContext();
  revalidatePath("/app/playbook");
}

// --- Persona Actions ---
export async function getPersona() {
  const persona = await prisma.persona.findFirst();
  if (!persona) {
    return await prisma.persona.create({
      data: {
        tone: "ramah",
        coreInstructions: `1. Kamu adalah Karina, Asisten Virtual CITILEX ASIA.
2. Selalu gunakan emoji seperlunya untuk mencairkan suasana.
3. Jangan pernah memaksa pelanggan untuk langsung membeli (hard selling).
4. Fokus pada konsultasi dan membantu menyelesaikan masalah pelanggan.
5. Jika kamu tidak tahu jawabannya, katakan jujur dan serahkan ke manusia (Take Over).`
      }
    });
  }
  return persona;
}

export async function savePersona(data: { tone: string; coreInstructions: string }) {
  const existing = await prisma.persona.findFirst();
  if (existing) {
    await prisma.persona.update({
      where: { id: existing.id },
      data,
    });
  } else {
    await prisma.persona.create({ data });
  }
  await compileKarinaContext();
  revalidatePath("/app/playbook");
}

// --- Context Compilation ---
export async function compileKarinaContext() {
  const [sops, knowledges, persona, assets] = await Promise.all([
    prisma.sop.findMany({ where: { isActive: true } }),
    prisma.knowledge.findMany(),
    getPersona(),
    prisma.asset.findMany(),
  ]);

  let prompt = `## IDENTITAS
Kamu adalah Karina, Customer Service dari Citilex Asia (produsen kaos & kemeja PDL B2B/B2C).
Jangan pernah panggil dirimu AI. Panggil pelanggan dengan "Kakak" atau "Kak", jangan pernah pakai kata "Anda".
Gaya bahasa: ${persona.tone === "ramah" ? "Ramah & Santai (banyak emoji, hangat)" : persona.tone === "profesional" ? "Profesional (formal, lugas)" : "Konsultan Pakar (memberi saran teknis)"}

## INSTRUKSI INTI
${persona.coreInstructions}

## SOP AKTIF (Ikuti alur ini)
`;

  sops.forEach((sop) => {
    prompt += `\n### ${sop.title}\n${sop.content}\n`;
  });

  prompt += `\n## PENGETAHUAN PERUSAHAAN (Gunakan info ini untuk menjawab)\n`;
  knowledges.forEach((kn) => {
    prompt += `\n### ${kn.title} (${kn.category})\n${kn.content}\n`;
  });

  prompt += `\n## ASET & DOKUMEN YANG TERSEDIA
Jika pelanggan meminta atau membutuhkan dokumen ini, sebutkan bahwa kamu bisa mengirimkannya. Kamu HANYA bisa mengirim dokumen yang ada di daftar ini (gunakan nama file aslinya).
`;
  if (assets.length === 0) {
    prompt += `- Belum ada aset yang tersedia.\n`;
  } else {
    assets.forEach((asset) => {
      prompt += `- ${asset.name} (${asset.type}, ${asset.size})${asset.description ? ` - ${asset.description}` : ""}\n`;
    });
  }

  // Save to SystemConfig
  await prisma.systemConfig.upsert({
    where: { key: "karina_context" },
    update: { value: JSON.stringify(prompt) },
    create: { key: "karina_context", value: JSON.stringify(prompt) },
  });

  return prompt;
}
