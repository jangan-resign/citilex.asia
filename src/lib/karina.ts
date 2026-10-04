import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Pastikan GOOGLE_API_KEY sudah terpasang
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function generateKarinaResponse(customerPhone: string, messageHistory: { role: string; text: string }[], newMessage: string) {
  // Model yang digunakan (Gemini 2.5 Flash!)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Konteks Karina dari DB
  let systemInstruction = `Kamu adalah Karina, Customer Service ramah dari Citilex Asia.`;
  try {
    const { prisma } = require('../lib/prisma');
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
    const result = await model.generateContent({
      contents,
      systemInstruction,
      tools: [{
        functionDeclarations: [{
          name: "updateCustomerInfo",
          description: "Gunakan fungsi ini jika percakapan telah memunculkan informasi terkait identitas klien. Kumpulkan dan update datanya.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              name: { type: SchemaType.STRING, description: "Nama panggilan atau nama asli pelanggan." },
              company: { type: SchemaType.STRING, description: "Bisa berupa nama perusahaan, instansi, sekolah, komunitas, event, atau organisasi." },
              domicile: { type: SchemaType.STRING, description: "Bisa berupa asal kota, provinsi, alamat, atau letak instansi." }
            },
          }
        }]
      }]
    });
    
    const response = result.response;
    let replyText = "";
    let extractedInfo = null;

    if (response.functionCalls && response.functionCalls().length > 0) {
      const call = response.functionCalls()[0];
      if (call.name === "updateCustomerInfo") {
        extractedInfo = call.args;
      }
      
      // Jika model memanggil fungsi, biasanya text kosong. Kita minta model merespons sebagai balasan function
      const followUp = await model.generateContent({
        contents: [
          ...contents,
          { role: "model", parts: [{ functionCall: call }] },
          { role: "user", parts: [{ functionResponse: { name: call.name, response: { status: "ok" } } }] }
        ],
        systemInstruction
      });
      replyText = followUp.response.text();
    } else {
      replyText = response.text();
    }

    return { text: replyText, extractedInfo };
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return { text: "Maaf kak, Karina lagi sedikit pusing nih (sistem error). Mohon ditunggu ya, nanti dibalas lagi!" };
  }
}
