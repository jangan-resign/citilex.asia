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
            const senderPhone = msg.from;
            const incomingWamid = msg.id; // WhatsApp Message ID
            const senderProfileName = change.value.contacts?.[0]?.profile?.name || "Customer Baru";

            let messageText = msg.text?.body || "";
            let attachments: string[] = [];

            if (msg.type === "image" && msg.image?.id) {
              attachments.push(`/api/media/${msg.image.id}`);
              messageText = msg.image.caption || "🖼️ Mengirim gambar";
            } else if (msg.type === "document" && msg.document?.id) {
              attachments.push(`/api/media/${msg.document.id}`);
              messageText = msg.document.filename || msg.document.caption || "📄 Mengirim dokumen";
            } else if (msg.type === "video" && msg.video?.id) {
              attachments.push(`/api/media/${msg.video.id}`);
              messageText = msg.video.caption || "🎥 Mengirim video";
            } else if (msg.type === "audio" && msg.audio?.id) {
              attachments.push(`/api/media/${msg.audio.id}`);
              messageText = "🎵 Mengirim audio";
            }

            // Abaikan jika bukan pesan teks atau media yang kita dukung
            if (!messageText && attachments.length === 0) continue;

            console.log(`📩 Pesan masuk dari ${senderPhone}: ${messageText} ${attachments.length > 0 ? '(dengan lampiran)' : ''}`);

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

            // 2. Simpan pesan masuk ke DB (dengan wamid dan lampiran)
            await prisma.message.create({
              data: {
                customerId: customer.id,
                sender: "customer",
                text: messageText,
                attachments: attachments,
                wamid: incomingWamid,
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
              const karinaResult = await generateKarinaResponse(senderPhone, formattedHistory, messageText);
              const karinaReply = karinaResult.text;
              const extractedInfo = karinaResult.extractedInfo;

              // 5. Update Customer jika ada info yang terekstrak
              if (extractedInfo) {
                await prisma.customer.update({
                  where: { id: customer.id },
                  data: {
                    name: extractedInfo.name || customer.name,
                    company: extractedInfo.company || customer.company,
                    domicile: extractedInfo.domicile || customer.domicile,
                  }
                });
                console.log(`🤖 Karina otomatis mengupdate data klien:`, extractedInfo);
              }

              // 6. Kirim balasan via WhatsApp API (reply ke pesan masuk)
              const sentResult = await sendWhatsAppMessage(senderPhone, karinaReply, incomingWamid);

              if (sentResult) {
                const botWamid = typeof sentResult === "string" ? sentResult : null;
                // 7. Simpan balasan bot ke DB
                await prisma.message.create({
                  data: {
                    customerId: customer.id,
                    sender: "bot",
                    text: karinaReply,
                    isRead: true,
                    ...(botWamid && { wamid: botWamid }),
                    replyToWamid: incomingWamid,
                  }
                });
              }
            }
          }
          
          if (change.value && change.value.statuses) {
            for (const status of change.value.statuses) {
              const wamid = status.id;
              if (status.status === "failed") {
                console.log(`❌ Pesan gagal dikirim (wamid: ${wamid}):`, status.errors);
                const failedMsg = await prisma.message.findUnique({ where: { wamid } });
                if (failedMsg && !failedMsg.text.startsWith("[GAGAL]")) {
                  await prisma.message.update({
                    where: { wamid },
                    data: { text: `[GAGAL] ${failedMsg.text}` }
                  });
                }
              } else if (status.status === "read") {
                await prisma.message.update({
                  where: { wamid },
                  data: { isRead: true }
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
