import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: mediaId } = await params;
  const token = process.env.WA_ACCESS_TOKEN;

  try {
    // 1. Dapatkan URL media dari Meta API
    const res = await fetch(`https://graph.facebook.com/v19.0/${mediaId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const data = await res.json();
    if (!data.url) return new NextResponse("Media URL Not Found", { status: 404 });

    // 2. Download binary media dari URL yang didapat
    const mediaRes = await fetch(data.url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // 3. Teruskan media ke client (sebagai proxy)
    const headers = new Headers();
    headers.set("Content-Type", mediaRes.headers.get("content-type") || "application/octet-stream");
    
    return new NextResponse(mediaRes.body, { headers });
  } catch (error) {
    console.error("Error fetching media:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
