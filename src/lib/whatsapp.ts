export async function sendWhatsAppMessage(to: string, text: string, replyToWamid?: string): Promise<string | false> {
  const phoneId = process.env.WA_PHONE_NUMBER_ID;
  const token = process.env.WA_ACCESS_TOKEN;

  if (!phoneId || !token) {
    console.error("WA API credentials missing");
    return false;
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;
    
    // Build request body
    const body: any = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "text",
      text: {
        preview_url: false,
        body: text,
      },
    };

    // Jika ini reply ke pesan tertentu, tambahkan context
    if (replyToWamid) {
      body.context = {
        message_id: replyToWamid,
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("WhatsApp API Error:", errData);
      return false;
    }

    // Ambil wamid dari response
    const data = await response.json();
    const wamid = data?.messages?.[0]?.id || null;
    return wamid || true as any;
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    return false;
  }
}

export async function sendWhatsAppMedia(to: string, mediaUrl: string, mediaType: "document" | "image", filename?: string, caption?: string, replyToWamid?: string): Promise<string | false> {
  const phoneId = process.env.WA_PHONE_NUMBER_ID;
  const token = process.env.WA_ACCESS_TOKEN;

  if (!phoneId || !token) {
    console.error("WA API credentials missing");
    return false;
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;
    
    const mediaObject: any = { link: mediaUrl };
    if (caption) mediaObject.caption = caption;
    if (mediaType === "document" && filename) mediaObject.filename = filename;

    const body: any = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: mediaType,
      [mediaType]: mediaObject
    };

    if (replyToWamid) {
      body.context = {
        message_id: replyToWamid,
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("WhatsApp API Error:", errData);
      return false;
    }

    const data = await response.json();
    const wamid = data?.messages?.[0]?.id || null;
    return wamid || true as any;
  } catch (error) {
    console.error("Failed to send WhatsApp media:", error);
    return false;
  }
}
