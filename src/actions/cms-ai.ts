"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { GoogleGenerativeAI, SchemaType, type ObjectSchema } from "@google/generative-ai";
import { prisma } from "../lib/prisma";
import { packages, poloPackages } from "../lib/data";
import { allSeoMoneyPages } from "../lib/seo-pages";
import { BLOG_CATEGORIES, slugifyText, type BlogFaqItem } from "../lib/cms-utils";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

async function requireCmsAuth(): Promise<void> {
  const cookieStore = await cookies();
  const role = cookieStore.get("cms_auth_role")?.value;
  if (role !== "cms") {
    throw new Error("Unauthorized");
  }
}

export interface GeneratedSeoArticle {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  targetKeyword: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  coverAlt: string;
  content: string;
  faqItems: BlogFaqItem[];
}

const articleResponseSchema: ObjectSchema = {
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING, description: "Judul artikel SEO yang menarik untuk B2B (45-65 karakter)." },
    slug: { type: SchemaType.STRING, description: "Slug URL huruf kecil dipisah tanda hubung." },
    excerpt: { type: SchemaType.STRING, description: "Ringkasan artikel 1-2 kalimat (120-160 karakter)." },
    category: {
      type: SchemaType.STRING,
      description: `Pilih salah satu dari: ${BLOG_CATEGORIES.join(", ")}`,
    },
    targetKeyword: { type: SchemaType.STRING, description: "Kata kunci utama yang dibidik." },
    tags: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "3 sampai 5 tag topik relevan.",
    },
    metaTitle: { type: SchemaType.STRING, description: "Meta title SEO (50-65 karakter)." },
    metaDescription: { type: SchemaType.STRING, description: "Meta description persuasif (120-160 karakter)." },
    coverAlt: { type: SchemaType.STRING, description: "Alt text deskriptif untuk gambar cover." },
    content: {
      type: SchemaType.STRING,
      description:
        "Konten artikel Markdown lengkap 800-1200 kata. Wajib memakai ## H2, ### H3, daftar poin, minimal 1 tabel perbandingan Markdown, dan 2-3 internal link Markdown ke URL resmi Citilex Asia.",
    },
    faqItems: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: { type: SchemaType.STRING },
          answer: { type: SchemaType.STRING },
        },
        required: ["question", "answer"],
      },
      description: "3 sampai 4 tanya-jawab FAQ relevan untuk Rich Snippet FAQPage.",
    },
  },
  required: [
    "title",
    "slug",
    "excerpt",
    "category",
    "targetKeyword",
    "tags",
    "metaTitle",
    "metaDescription",
    "coverAlt",
    "content",
    "faqItems",
  ],
};

const topicIdeasResponseSchema: ObjectSchema = {
  type: SchemaType.OBJECT,
  properties: {
    topics: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          targetKeyword: { type: SchemaType.STRING },
          category: { type: SchemaType.STRING },
          searchIntent: { type: SchemaType.STRING, description: "Commercial, Informational, atau Local" },
          notes: { type: SchemaType.STRING },
        },
        required: ["title", "targetKeyword", "category", "searchIntent", "notes"],
      },
    },
  },
  required: ["topics"],
};

function buildBrandContext(): string {
  const kaosSummary = packages
    .map((p) => `- ${p.name}: mulai Rp ${p.price}/pcs (${p.description})`)
    .join("\n");
  const poloSummary = poloPackages
    .map((p) => `- ${p.name}: mulai Rp ${p.price}/pcs (${p.description})`)
    .join("\n");
  const moneyPagesList = allSeoMoneyPages
    .map((m) => `- [/${m.slug}]: ${m.h1Primary} (${m.breadcrumbLabel})`)
    .join("\n");

  return `## DATA RESMI CITILEX ASIA (WAJIB AKURAT, JANGAN MENGARANG HARGA)
- Brand: CITILEX ASIA (di bawah PT Nusa Garment Indonesia)
- Target Pembeli: HRD, Panitia Gathering/Outing, Procurement Kantor, Instansi Pemerintah/Swasta, Event Organizer, Sekolah/Kampus.
- Minimal Order (MOQ): 50 pcs per desain.
- Estimasi Waktu Pengerjaan: 3 - 21 hari kerja (tergantung kuantitas & teknik cetak).
- Jakarta Rep. Office: Jl. Bintaro Tengah Blok J4 No.12, Bintaro, Pesanggrahan, Jakarta Selatan 12330.
- Production Center: Jl. Menayu Lor Plurugan No.112, Tirtonirmolo, Kasihan, Bantul, DI Yogyakarta.
- WhatsApp Resmi: +62 813-2927-1515

### Harga Paket Kaos Resmi:
${kaosSummary}

### Harga Paket Polo Shirt Resmi:
${poloSummary}

### Daftar Halaman Internal yang Bisa Di-Link (Gunakan Format Markdown Link [anchor text](/slug)):
${moneyPagesList}
- [/portofolio]: Hasil Produksi Klien (Shopee, POS Indonesia, BANK BRI, Adhi Karya, SDIT BIKA, Bakpia Jogkau)
- [/tentang-kami]: Profil Perusahaan & Fasilitas CITILEX ASIA
- [/kontak]: Kontak & Lokasi Kantor Resmi`;
}

export async function generateSeoArticleWithAi(params: {
  topic: string;
  targetKeyword?: string;
  category?: string;
  additionalNotes?: string;
}): Promise<{ success: boolean; data?: GeneratedSeoArticle; error?: string }> {
  try {
    await requireCmsAuth();

    if (!process.env.GOOGLE_API_KEY) {
      return { success: false, error: "GOOGLE_API_KEY belum terpasang di .env." };
    }

    const topic = params.topic.trim();
    if (!topic) {
      return { success: false, error: "Masukkan topik atau kata kunci artikel terlebih dahulu." };
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: articleResponseSchema,
      },
    });

    const prompt = `Kamu adalah Senior SEO Content Strategist & B2B Apparel Copywriter untuk CITILEX ASIA.

${buildBrandContext()}

## TUGAS PENULISAN
Buatkan 1 artikel blog SEO berkualitas tinggi berbahasa Indonesia yang ditujukan bagi pengambil keputusan B2B (HRD, Panitia Gathering, Procurement, EO).
- Topik / Judul Awal: ${topic}
- Target Kata Kunci Utama: ${params.targetKeyword?.trim() || topic}
- Kategori Pilihan: ${params.category?.trim() || "Sesuaikan dengan daftar kategori resmi"}
${params.additionalNotes?.trim() ? `- Catatan Tambahan Penulis: ${params.additionalNotes.trim()}` : ""}

## ATURAN KUALITAS WAJIB:
1. Jangan membuat artikel yang terdengar seperti tugas sekolah umum — fokuslah pada panduan praktis pengadaan, simulasi memilih bahan agar nyaman/awet, perbandingan biaya, dan tips menghindari kesalahan cetak.
2. Masukkan Target Kata Kunci secara alami di judul, paragraf pembuka (100 kata pertama), dan minimal 1 sub-heading ##.
3. Panjang konten isi wajib 800 hingga 1.200 kata dalam Markdown yang rapi:
   - Gunakan heading level ## dan ### (JANGAN gunakan # H1 di dalam content karena H1 sudah dirender oleh halaman).
   - Sertakan minimal 1 tabel perbandingan Markdown (misalnya perbandingan bahan, harga mulai, atau teknik sablon vs bordir).
   - Tanamkan **2 hingga 3 internal link Markdown** yang relevan ke halaman Citilex di atas (contoh: [vendor kaos gathering kantor](/kaos-gathering-kantor), [polo shirt bordir perusahaan](/polo-shirt-custom), [portofolio produksi kami](/portofolio)).
4. Gunakan hanya harga & data MOQ (50 pcs) resmi Citilex Asia di atas.
5. Buat 3-4 FAQ di field faqItems yang benar-benar sering ditanyakan panitia/HRD.`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const parsed = JSON.parse(rawText) as GeneratedSeoArticle;

    return {
      success: true,
      data: {
        ...parsed,
        slug: slugifyText(parsed.slug || parsed.title),
        category: BLOG_CATEGORIES.includes(parsed.category as (typeof BLOG_CATEGORIES)[number])
          ? parsed.category
          : params.category || BLOG_CATEGORIES[0],
      },
    };
  } catch (err: unknown) {
    console.error("generateSeoArticleWithAi error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gagal menghasilkan artikel dari Gemini AI.",
    };
  }
}

export async function generateTopicIdeasWithAi(focusArea?: string): Promise<{
  success: boolean;
  count?: number;
  error?: string;
}> {
  try {
    await requireCmsAuth();

    if (!process.env.GOOGLE_API_KEY) {
      return { success: false, error: "GOOGLE_API_KEY belum terpasang di .env." };
    }

    const existingTopics = await prisma.seoTopic.findMany({
      select: { title: true, targetKeyword: true },
    });
    const existingList = existingTopics.map((t) => `- ${t.title} (${t.targetKeyword})`).join("\n");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: topicIdeasResponseSchema,
      },
    });

    const prompt = `Kamu adalah SEO Strategist untuk konveksi kaos & polo B2B CITILEX ASIA (Jakarta & Yogyakarta).
Hasilkan **8 ide topik artikel blog bernilai komersial tinggi** yang dicari oleh HRD, panitia event, EO, sekolah/kampus, dan procurement sebelum mereka memesan kaos/polo minimal 50 pcs.

${focusArea?.trim() ? `Fokus topik yang diinginkan: ${focusArea.trim()}` : "Fokus pada campuran panduan bahan (Combed vs Bamboo vs PE, Lacoste Pique vs Diamond), perbandingan sablon (DTF vs Plastisol vs Bordir), tips gathering kantor, & efisiensi anggaran pengadaan."}

Kategori yang diizinkan hanya salah satu dari: ${BLOG_CATEGORIES.join(", ")}.
searchIntent hanya salah satu dari: Commercial, Informational, Local.

Hindari menduplikasi topik yang sudah ada berikut:
${existingList || "(Belum ada topik tersimpan)"}`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const parsed = JSON.parse(rawText) as {
      topics: Array<{
        title: string;
        targetKeyword: string;
        category: string;
        searchIntent: string;
        notes: string;
      }>;
    };

    const topicsToInsert = (parsed.topics || []).slice(0, 8);
    if (topicsToInsert.length === 0) {
      return { success: false, error: "AI tidak mengembalikan daftar topik." };
    }

    await prisma.seoTopic.createMany({
      data: topicsToInsert.map((item) => ({
        title: item.title,
        targetKeyword: item.targetKeyword,
        category: BLOG_CATEGORIES.includes(item.category as (typeof BLOG_CATEGORIES)[number])
          ? item.category
          : BLOG_CATEGORIES[0],
        searchIntent: ["Commercial", "Informational", "Local"].includes(item.searchIntent)
          ? item.searchIntent
          : "Commercial",
        notes: item.notes,
      })),
    });

    revalidatePath("/cms");
    revalidatePath("/cms/topics");

    return { success: true, count: topicsToInsert.length };
  } catch (err: unknown) {
    console.error("generateTopicIdeasWithAi error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Gagal riset ide topik dengan Gemini AI.",
    };
  }
}
