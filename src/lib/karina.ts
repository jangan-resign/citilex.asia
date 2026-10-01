import { GoogleGenerativeAI } from "@google/generative-ai";

// Pastikan GOOGLE_API_KEY sudah terpasang
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function generateKarinaResponse(customerPhone: string, messageHistory: { role: string; text: string }[], newMessage: string) {
  // Model yang digunakan (Gemini 2.5 Flash!)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Konteks Karina dari DB
  let systemInstruction = `Kamu adalah Karina, Customer Service ramah dari Citilex Asia.`;
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const config = await prisma.systemConfig.findUnique({ where: { key: "karina_context" } });
    if (config?.value) {
      systemInstruction = JSON.parse(config.value as string);
    }
  } catch (error) {
    console.error("Gagal membaca konteks Karina dari DB", error);
  }

  // Format history untuk Gemini
  const contents = messageHistory.map((msg) => ({
    role: msg.role === "bot" ? "model" : "user",
    parts: [{ text: msg.text }],
  }));

  // Tambahkan pesan terbaru
  contents.push({
    role: "user",
    parts: [{ text: newMessage }],
  });

  try {
    // Generate content
    const result = await model.generateContent({
      contents,
      systemInstruction,
    });
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Maaf kak, Karina lagi sedikit pusing nih (sistem error). Mohon ditunggu ya, nanti dibalas lagi!";
  }
}
