import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// GET for Facebook Webhook verification
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "citilex-meta-token";

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Facebook Lead Ads usually sends:
    // { entry: [ { changes: [ { value: { form_id: '...', leadgen_id: '...' } } ] } ] }
    // Fetching actual data requires calling Graph API with leadgen_id, but for now we'll just save the webhook payload
    
    // Default parsing (simplified)
    let campaignName = "Facebook Lead Ads";
    let customerName = "Unknown from Meta";
    let customerPhone = "000000000";

    // In a real scenario, we would use leadgen_id to fetch the data from Graph API:
    // const leadgenId = payload.entry?.[0]?.changes?.[0]?.value?.leadgen_id;
    // const graphData = await fetch(`https://graph.facebook.com/v19.0/${leadgenId}?access_token=...`)

    await prisma.adsLead.create({
      data: {
        source: "META",
        campaignName,
        customerName,
        customerPhone,
        rawData: payload,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in Meta Ads Webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
