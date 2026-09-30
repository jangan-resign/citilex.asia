export async function sendWhatsAppMessage(to: string, text: string) {
  const phoneId = process.env.WA_PHONE_NUMBER_ID;
  const token = process.env.WA_ACCESS_TOKEN;

  if (!phoneId || !token) {
    console.error("WA API credentials missing");
    return false;
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "text",
        text: {
          preview_url: false,
          body: text,
        },
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("WhatsApp API Error:", errData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    return false;
  }
}
