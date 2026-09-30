import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { generateKarinaResponse } from "../../../../lib/karina";
import { sendWhatsAppMessage } from "../../../../lib/whatsapp";

// GET: Verifikasi Webhook dari Meta (WhatsApp Cloud API)
export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  // Pastikan token verifikasi sama dengan yang ada di .env.local
  if (mode === "subscribe" && token === process.env.WA_WEBHOOK_VERIFY_TOKEN) {
    console.log("✅ WhatsApp Webhook Terverifikasi!");
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// POST: Menerima pesan masuk dari WhatsApp
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Pastikan ini adalah notifikasi pesan dari WhatsApp
    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value && change.value.messages) {
            // Ada pesan masuk!
            const msg = change.value.messages[0];
            const senderPhone = msg.from; // Nomor pengirim
            const messageText = msg.text?.body || ""; // Isi pesan teks
            const senderProfileName = change.value.contacts?.[0]?.profile?.name || "Customer Baru";

            // Abaikan jika bukan pesan teks
            if (!messageText) continue;

            console.log(`📩 Pesan masuk dari ${senderPhone}: ${messageText}`);

            // 1. Cari atau buat kustomer di DB
            let customer = await prisma.customer.findUnique({
              where: { phone: senderPhone },
            });

            if (!customer) {
              customer = await prisma.customer.create({
                data: {
                  name: senderProfileName,
                  phone: senderPhone,
                  owner: "Karina", // Default ke bot Karina
                }
              });
            }

            // 2. Simpan pesan masuk ke DB
            await prisma.message.create({
              data: {
                customerId: customer.id,
                sender: "customer",
                text: messageText,
              }
            });

            // 3. Jika owner masih Karina, biarkan AI yang membalas
            if (customer.owner === "Karina") {
              // Ambil 5 riwayat chat terakhir untuk konteks AI
              const history = await prisma.message.findMany({
                where: { customerId: customer.id },
                orderBy: { createdAt: 'desc' },
                take: 6 // Termasuk pesan yang baru masuk
              });
              
              // Balik urutannya agar dari terlama ke terbaru
              const formattedHistory = history.reverse().slice(0, 5).map(m => ({
                role: m.sender,
                text: m.text
              }));

              // 4. Generate respons AI
              const karinaReply = await generateKarinaResponse(senderPhone, formattedHistory, messageText);

              // 5. Kirim balasan via WhatsApp API
              const sent = await sendWhatsAppMessage(senderPhone, karinaReply);

              if (sent) {
                // 6. Simpan balasan bot ke DB
                await prisma.message.create({
                  data: {
                    customerId: customer.id,
                    sender: "bot",
                    text: karinaReply,
                    isRead: true, // Pesan keluar otomatis isRead
                  }
                });
              }
            }
          }
        }
      }
      return new NextResponse("EVENT_RECEIVED", { status: 200 });
    }

    return new NextResponse("Not Found", { status: 404 });
  } catch (error) {
    console.error("Error processing WhatsApp Webhook:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
