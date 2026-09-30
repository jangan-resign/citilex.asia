import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

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

            console.log(`📩 Pesan masuk dari ${senderPhone}: ${messageText}`);

            // TODO: Nanti di sini kita simpan ke database dan panggil AI Karina
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
