import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Pastikan GOOGLE_API_KEY sudah terpasang
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function generateKarinaResponse(customerPhone: string, messageHistory: { role: string; text: string }[], newMessage: string) {
  // Model yang digunakan (Gemini 2.5 Flash!)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Konteks Karina dari DB
  let systemInstruction = `Kamu adalah Karina, Customer Service ramah dari Citilex Asia.`;
  let availableAssets: { id: string; name: string; type: string; url: string; size: string; description: string | null }[] = [];
  try {
    const { prisma } = require('../lib/prisma');
    const [config, assets] = await Promise.all([
      prisma.systemConfig.findUnique({ where: { key: "karina_context" } }),
      prisma.asset.findMany(),
    ]);
    availableAssets = assets || [];
    if (config?.value) {
      systemInstruction = typeof config.value === "string" ? JSON.parse(config.value) : String(config.value);
    }
    if (availableAssets.length > 0) {
      const assetListText = availableAssets
        .map((a) => `- "${a.name}" (${a.type}, ${a.size})${a.description ? ` - ${a.description}` : ""}`)
        .join("\n");
      systemInstruction += `\n\n## INSTRUKSI PENGIRIMAN FILE / KATALOG
Jika pelanggan meminta katalog, warna kain, size chart, pricelist, atau dokumen yang relevan dengan daftar aset berikut, PANGGIL fungsi \`sendAsset\` dengan \`fileName\` yang sesuai dari daftar ini, lalu jawab pesan pelanggan dengan ramah bahwa filenya sedang dikirimkan:
${assetListText}`;
    }
  } catch (error) {
    console.error("Gagal membaca konteks Karina dari DB", error);
  }

  // Format history untuk Gemini (pastikan tidak menduplikasi pesan terakhir)
  const cleanHistory = messageHistory.filter((msg) => msg.text && msg.text.trim() !== "");
  if (cleanHistory.length > 0 && cleanHistory[cleanHistory.length - 1].text === newMessage && cleanHistory[cleanHistory.length - 1].role === "customer") {
    cleanHistory.pop();
  }

  const contents: any[] = cleanHistory.map((msg) => ({
    role: msg.role === "bot" || msg.role === "cs" || msg.role === "crm" ? "model" : "user",
    parts: [{ text: msg.text }],
  }));

  // Tambahkan pesan terbaru
  contents.push({
    role: "user",
    parts: [{ text: newMessage }],
  });

  const functionDeclarations: any[] = [
    {
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
    }
  ];

  if (availableAssets.length > 0) {
    functionDeclarations.push({
      name: "sendAsset",
      description: "Gunakan fungsi ini untuk mengirimkan file dokumen/katalog/size chart dari daftar aset kepada pelanggan via WhatsApp.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          fileName: {
            type: SchemaType.STRING,
            description: "Nama file aset yang ingin dikirimkan (harus sama atau sesuai dengan daftar aset yang tersedia)."
          }
        },
        required: ["fileName"]
      }
    });
  }

  try {
    const result = await model.generateContent({
      contents,
      systemInstruction,
      tools: [{ functionDeclarations }]
    });
    
    const response = result.response;
    let replyText = "";
    let extractedInfo: any = null;
    const assetsToSend: { name: string; url: string; type: "document" | "image" }[] = [];

    const calls = typeof response.functionCalls === "function" ? response.functionCalls() : undefined;

    if (calls && calls.length > 0) {
      const functionResponseParts: any[] = [];

      for (const call of calls) {
        if (call.name === "updateCustomerInfo") {
          extractedInfo = call.args;
          functionResponseParts.push({
            functionResponse: { name: call.name, response: { status: "ok" } }
          });
        } else if (call.name === "sendAsset") {
          const requestedName = String((call.args as any)?.fileName || "").trim().toLowerCase();
          const matchedAsset = availableAssets.find(
            (a) =>
              a.name.toLowerCase() === requestedName ||
              a.name.toLowerCase().includes(requestedName) ||
              requestedName.includes(a.name.toLowerCase())
          );
          if (matchedAsset) {
            assetsToSend.push({
              name: matchedAsset.name,
              url: matchedAsset.url,
              type: matchedAsset.type === "image" ? "image" : "document",
            });
            functionResponseParts.push({
              functionResponse: { name: call.name, response: { status: "sent", fileName: matchedAsset.name } }
            });
          } else {
            functionResponseParts.push({
              functionResponse: { name: call.name, response: { status: "not_found" } }
            });
          }
        }
      }

      // Gunakan content asli dari candidate agar thoughtSignature dari Gemini 2.5 tetap terjaga
      const modelTurnContent = response.candidates?.[0]?.content || {
        role: "model",
        parts: calls.map((call) => ({ functionCall: call }))
      };

      try {
        const followUp = await model.generateContent({
          contents: [
            ...contents,
            modelTurnContent,
            { role: "user", parts: functionResponseParts }
          ],
          systemInstruction
        });
        replyText = followUp.response.text();
      } catch (followUpErr) {
        console.error("Gemini follow-up error:", followUpErr);
        try {
          replyText = response.text();
        } catch {
          replyText = "";
        }
        if (!replyText) {
          replyText = assetsToSend.length > 0
            ? `Baik kak, berikut Karina kirimkan file ${assetsToSend.map(a => a.name).join(", ")} ya 😊`
            : "Baik kak, terima kasih informasinya! Ada lagi yang bisa Karina bantu? 😊";
        }
      }
    } else {
      replyText = response.text();
    }

    return { text: replyText, extractedInfo, assetsToSend };
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return { text: "Maaf kak, Karina lagi sedikit pusing nih (sistem error). Mohon ditunggu ya, nanti dibalas lagi!", extractedInfo: null, assetsToSend: [] };
  }
}
