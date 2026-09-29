import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { key: "FACTORY_DATA" }
    });

    if (!config) {
      // Return 404 so the client knows to fallback to static default data
      return NextResponse.json({ error: "Factory Data not found in DB" }, { status: 404 });
    }

    return NextResponse.json(config.value);
  } catch (error) {
    console.error("Error fetching factory data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const config = await prisma.systemConfig.upsert({
      where: { key: "FACTORY_DATA" },
      update: { value: data },
      create: { key: "FACTORY_DATA", value: data }
    });

    // Revalidate the cache tag so Next.js clears the old cache
    revalidatePath("/app", "layout");

    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error("Error saving factory data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
