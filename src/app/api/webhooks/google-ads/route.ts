import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Google Lead Form usually sends:
    // { user_column_data: [ { column_name: 'Full Name', string_value: 'John Doe' }, ... ], campaign_id: '123' }
    
    // Default parsing (simplified for generic use)
    let customerName = "Unknown from Google";
    let customerPhone = "000000000";
    let customerEmail = null;

    if (payload.user_column_data) {
      for (const field of payload.user_column_data) {
        const key = field.column_name?.toLowerCase() || "";
        if (key.includes("name")) customerName = field.string_value;
        if (key.includes("phone")) customerPhone = field.string_value;
        if (key.includes("email")) customerEmail = field.string_value;
      }
    }

    await prisma.adsLead.create({
      data: {
        source: "GOOGLE",
        campaignName: payload.campaign_id || "Google Lead Form",
        customerName,
        customerPhone,
        customerEmail,
        rawData: payload,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in Google Ads Webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
