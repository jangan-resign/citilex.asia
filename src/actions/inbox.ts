"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTotalUnreadCount() {
  const count = await prisma.message.count({
    where: {
      isRead: false,
      sender: "customer",
    },
  });
  return count;
}

export async function getCustomers() {
  const customers = await prisma.customer.findMany({
    where: {
      messages: { some: {} }
    },
    orderBy: { updatedAt: "desc" },
    include: {
      qualification: true,
      invoices: {
        where: { status: "PAID" },
        orderBy: { updatedAt: "desc" },
        take: 1
      },
      projects: {
        orderBy: { updatedAt: "desc" },
        take: 1
      },
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
  return customers;
}

export async function getMessages(customerId: string) {
  const messages = await prisma.message.findMany({
    where: { customerId },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}

import { sendWhatsAppMessage, sendWhatsAppMedia } from "../lib/whatsapp";

export async function sendMessage(customerId: string, text: string, sender: "customer" | "bot" | "cs" | "crm", waText?: string, replyToMessageId?: string) {
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) throw new Error("Customer not found");

  let sentWamid: string | null = null;
  let replyToWamid: string | null = null;

  // Jika ini reply, cari wamid dari pesan yang di-reply
  if (replyToMessageId) {
    const replyToMsg = await prisma.message.findUnique({ where: { id: replyToMessageId } });
    if (replyToMsg?.wamid) replyToWamid = replyToMsg.wamid;
  }

  // Kirim via WA API jika bukan customer
  if (sender !== "customer") {
    const textToSend = waText || text;
    const result = await sendWhatsAppMessage(customer.phone, textToSend, replyToWamid || undefined);
    if (result && typeof result === "string") {
      sentWamid = result;
    } else if (!result) {
      console.error("Gagal mengirim pesan WA ke:", customer.phone);
    }
  }

  // Simpan ke DB (text lengkap termasuk format reply untuk inbox kita)
  const message = await prisma.message.create({
    data: {
      customerId,
      text,
      sender,
      ...(sentWamid && { wamid: sentWamid }),
      ...(replyToWamid && { replyToWamid }),
    },
  });

  await prisma.customer.update({
    where: { id: customerId },
    data: { updatedAt: new Date() },
  });

  revalidatePath("/app");
  return message;
}

export async function sendMediaMessage(customerId: string, mediaUrl: string, mediaType: "document" | "image", filename: string, sender: "customer" | "bot" | "cs" | "crm") {
  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) throw new Error("Customer not found");

  let sentWamid: string | null = null;

  if (sender !== "customer") {
    const result = await sendWhatsAppMedia(customer.phone, mediaUrl, mediaType, filename);
    if (result && typeof result === "string") {
      sentWamid = result;
    } else if (!result) {
      console.error("Gagal mengirim media WA ke:", customer.phone);
    }
  }

  // Simpan ke DB dengan attachments
  const message = await prisma.message.create({
    data: {
      customerId,
      text: filename, // Gunakan nama file sebagai teks fallback
      sender,
      attachments: [mediaUrl],
      ...(sentWamid && { wamid: sentWamid }),
    },
  });

  await prisma.customer.update({
    where: { id: customerId },
    data: { updatedAt: new Date() },
  });

  revalidatePath("/app");
  return message;
}

export async function changeChatOwner(customerId: string, owner: string) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { owner },
  });
  revalidatePath("/app");
}

export async function updateCustomerQualification(customerId: string, customerData: any, qualificationData: any) {
  // Update Customer (name, company, domicile)
  const currentCustomer = await prisma.customer.findUnique({ where: { id: customerId } });
  
  let newStatus = currentCustomer?.status;
  if (currentCustomer?.status === "active" && qualificationData.items && qualificationData.items.length > 0) {
    newStatus = "qualified";
  }

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      ...customerData,
      ...(newStatus && { status: newStatus }),
    },
  });

  // Upsert OrderQualification
  await prisma.orderQualification.upsert({
    where: { customerId },
    update: qualificationData,
    create: {
      customerId,
      ...qualificationData
    }
  });

  revalidatePath("/app");
}

export async function updateCustomerStatus(id: string, status: string) {
  await prisma.customer.update({
    where: { id },
    data: { status }
  });
  revalidatePath('/app/leads');
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({
    where: { id }
  });
  revalidatePath('/app/leads');
}

export async function createCustomer(data: { name: string; company?: string; phone: string }) {
  const customer = await prisma.customer.create({
    data: {
      name: data.name,
      company: data.company || null,
      phone: data.phone,
      status: "active",
      owner: "Karina"
    }
  });
  revalidatePath('/app/leads');
  revalidatePath('/app/clients');
  return customer;
}

export async function markMessagesAsRead(customerId: string) {
  await prisma.message.updateMany({
    where: {
      customerId,
      sender: "customer",
      isRead: false
    },
    data: {
      isRead: true
    }
  });
  revalidatePath("/app");
}

export async function deleteMessage(messageId: string) {
  await prisma.message.delete({
    where: { id: messageId }
  });
  revalidatePath("/app");
}

export async function forwardMessage(messageId: string, targetCustomerId: string) {
  // Ambil pesan asli
  const originalMessage = await prisma.message.findUnique({
    where: { id: messageId },
    include: { customer: true }
  });
  if (!originalMessage) throw new Error("Message not found");

  // Ambil customer tujuan
  const targetCustomer = await prisma.customer.findUnique({
    where: { id: targetCustomerId }
  });
  if (!targetCustomer) throw new Error("Target customer not found");

  const forwardedText = `*[Diteruskan dari ${originalMessage.customer.name}]*\n\n${originalMessage.text}`;

  // Kirim via WA API dan capture wamid
  const fwdResult = await sendWhatsAppMessage(targetCustomer.phone, forwardedText);
  const fwdWamid = (fwdResult && typeof fwdResult === "string") ? fwdResult : null;

  // Simpan ke DB
  await prisma.message.create({
    data: {
      customerId: targetCustomerId,
      text: forwardedText,
      sender: "cs",
      ...(fwdWamid && { wamid: fwdWamid }),
    }
  });

  await prisma.customer.update({
    where: { id: targetCustomerId },
    data: { updatedAt: new Date() }
  });

  revalidatePath("/app");
}

export async function updateInboxNotes(customerId: string, inboxNotes: string) {
  await prisma.customer.update({
    where: { id: customerId },
    data: { inboxNotes }
  });
  revalidatePath("/app");
}

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function autoFillCustomerInfo(customerId: string) {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!customer || customer.messages.length === 0) return null;

  const transcript = customer.messages.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join("\n");

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Ekstrak informasi pelanggan dari riwayat chat berikut:

${transcript}

Tugasmu:
1. Temukan nama pelanggan (jika disebutkan).
2. Temukan "company": Bisa berupa nama perusahaan, instansi, sekolah, kampus, dinas, event, atau komunitas pelanggan. Jika tidak ada petunjuk sama sekali, kembalikan null atau "".
3. Temukan "domicile": Bisa berupa asal kota, alamat pengiriman, letak perusahaan, atau domisili pelanggan. Jika tidak ada petunjuk sama sekali, kembalikan null atau "".

Balas HANYA dengan valid JSON dengan format persis seperti ini, tanpa markdown dan tanpa penjelasan tambahan:
{
  "name": "nama",
  "company": "perusahaan",
  "domicile": "domisili"
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(jsonStr);
    
    const hasNewInfo = (data.name && data.name !== customer.name) || 
                       (data.company && data.company !== customer.company) || 
                       (data.domicile && data.domicile !== customer.domicile);

    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: {
        name: data.name || customer.name,
        company: data.company || customer.company,
        domicile: data.domicile || customer.domicile,
      }
    });

    revalidatePath("/app");
    return { success: true, updatedCustomer, hasNewInfo };
  } catch (error) {
    console.error("Auto fill error:", error);
    return { success: false, updatedCustomer: null, hasNewInfo: false };
  }
}
