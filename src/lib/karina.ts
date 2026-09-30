import { GoogleGenerativeAI } from "@google/generative-ai";

// Pastikan GOOGLE_API_KEY sudah terpasang
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function generateKarinaResponse(customerPhone: string, messageHistory: { role: string; text: string }[], newMessage: string) {
  // Model yang digunakan (Gemini 2.5 Flash!)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Konteks Karina
  const systemInstruction = `Kamu adalah Karina, Customer Service ramah dan profesional dari Citilex Asia (produsen kaos & kemeja PDL B2B/B2C).
Tugasmu:
1. Menyapa dengan hangat dan sopan.
2. Memberikan info dasar terkait pemesanan kaos/kemeja.
3. Kalau mereka minta hitung estimasi harga, arahkan untuk bilang "Mohon ditunggu sebentar ya kak, CS kami akan segera bantu hitungkan harga pastinya."
Gaya bahasamu kasual tapi sopan, gunakan emoji secukupnya. Jangan panggil dirimu AI. Jangan panggil klien dengan sebutan "Anda" tapi panggil dengan "kakak" atau "kak".`;

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
