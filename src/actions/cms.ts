"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";
import {
  estimateReadingTime,
  evaluateSeoScore,
  slugifyText,
  type BlogFaqItem,
} from "../lib/cms-utils";

const cmsAllowedRoles = ["super-admin", "business-partner", "marketing", "cms"];

async function requireCmsAuth(): Promise<string> {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value;
  if (!role || !cmsAllowedRoles.includes(role)) {
    throw new Error("Akses ditolak: Silakan login dengan akun CMS atau Admin.");
  }
  return role;
}

export async function getCmsOverviewStats() {
  await requireCmsAuth();

  const [totalPublished, totalDraft, allPosts, totalTopics, unusedTopics, totalMedia] =
    await Promise.all([
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.blogPost.count({ where: { status: "DRAFT" } }),
      prisma.blogPost.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          status: true,
          seoScore: true,
          readingTimeMin: true,
          updatedAt: true,
          publishedAt: true,
        },
      }),
      prisma.seoTopic.count(),
      prisma.seoTopic.count({ where: { isUsed: false } }),
      prisma.blogMedia.count(),
    ]);

  const avgAgg = await prisma.blogPost.aggregate({
    _avg: { seoScore: true },
  });

  return {
    totalPublished,
    totalDraft,
    totalPosts: totalPublished + totalDraft,
    avgSeoScore: Math.round(avgAgg._avg.seoScore || 0),
    totalTopics,
    unusedTopics,
    totalMedia,
    recentPosts: allPosts,
  };
}

export async function getBlogPosts() {
  await requireCmsAuth();
  return prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function getBlogPostById(id: string) {
  await requireCmsAuth();
  return prisma.blogPost.findUnique({
    where: { id },
  });
}

export async function getPublishedBlogPosts() {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function getPublishedBlogPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });
}

export interface SaveBlogPostInput {
  id?: string;
  topicId?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  coverAlt?: string | null;
  category: string;
  targetKeyword?: string | null;
  tags?: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  faqItems?: BlogFaqItem[];
  status: "DRAFT" | "PUBLISHED";
  authorName?: string;
}

export async function saveBlogPost(input: SaveBlogPostInput) {
  await requireCmsAuth();

  const title = input.title.trim();
  const content = input.content.trim();
  if (!title || !content) {
    return { success: false as const, error: "Judul dan isi artikel tidak boleh kosong." };
  }

  let cleanSlug = slugifyText(input.slug || title);
  if (!cleanSlug) {
    cleanSlug = `artikel-${Date.now()}`;
  }

  // Pastikan slug unik bila bentrok dengan artikel lain
  const existingWithSlug = await prisma.blogPost.findUnique({
    where: { slug: cleanSlug },
    select: { id: true },
  });

  if (existingWithSlug && existingWithSlug.id !== input.id) {
    cleanSlug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;
  }

  const sanitizedFaqs = (input.faqItems || []).filter(
    (item) => item.question.trim().length > 0 && item.answer.trim().length > 0
  );

  const readingTimeMin = estimateReadingTime(content);
  const { score: seoScore } = evaluateSeoScore({
    title,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    targetKeyword: input.targetKeyword,
    content,
    coverImage: input.coverImage,
    coverAlt: input.coverAlt,
    faqItems: sanitizedFaqs,
  });

  const existingRecord = input.id
    ? await prisma.blogPost.findUnique({
        where: { id: input.id },
        select: { publishedAt: true },
      })
    : null;

  const publishedAt =
    input.status === "PUBLISHED" ? existingRecord?.publishedAt || new Date() : null;

  const payload = {
    title,
    slug: cleanSlug,
    excerpt: input.excerpt.trim() || content.slice(0, 160).replace(/[#*\n]/g, " ").trim(),
    content,
    coverImage: input.coverImage?.trim() || null,
    coverAlt: input.coverAlt?.trim() || title,
    category: input.category.trim() || "Panduan Bahan",
    targetKeyword: input.targetKeyword?.trim() || null,
    tags: (input.tags || []).map((t) => t.trim()).filter(Boolean),
    metaTitle: input.metaTitle?.trim() || title,
    metaDescription: input.metaDescription?.trim() || input.excerpt.trim() || null,
    faqItems: sanitizedFaqs as unknown as object[],
    readingTimeMin,
    seoScore,
    status: input.status,
    authorName: input.authorName?.trim() || "Tim Editorial Citilex Asia",
    publishedAt,
  };

  const saved = input.id
    ? await prisma.blogPost.update({
        where: { id: input.id },
        data: payload,
      })
    : await prisma.blogPost.create({
        data: payload,
      });

  if (input.topicId) {
    await prisma.seoTopic
      .update({
        where: { id: input.topicId },
        data: { isUsed: true },
      })
      .catch(() => {});
  }

  revalidatePath("/cms");
  revalidatePath("/cms/articles");
  revalidatePath("/cms/topics");
  revalidatePath("/blog");
  revalidatePath(`/blog/${saved.slug}`);
  revalidatePath("/sitemap.xml");

  return { success: true as const, post: saved };
}

export async function toggleBlogPostStatus(id: string) {
  await requireCmsAuth();

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return { success: false as const, error: "Artikel tidak ditemukan." };
  }

  const nextStatus = existing.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
  const updated = await prisma.blogPost.update({
    where: { id },
    data: {
      status: nextStatus,
      publishedAt: nextStatus === "PUBLISHED" ? existing.publishedAt || new Date() : null,
    },
  });

  revalidatePath("/cms");
  revalidatePath("/cms/articles");
  revalidatePath("/blog");
  revalidatePath(`/blog/${updated.slug}`);
  revalidatePath("/sitemap.xml");

  return { success: true as const, post: updated };
}

export async function deleteBlogPost(id: string) {
  await requireCmsAuth();

  const deleted = await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/cms");
  revalidatePath("/cms/articles");
  revalidatePath("/blog");
  revalidatePath(`/blog/${deleted.slug}`);
  revalidatePath("/sitemap.xml");

  return { success: true as const };
}

export async function getSeoTopics() {
  await requireCmsAuth();
  return prisma.seoTopic.findMany({
    orderBy: [{ isUsed: "asc" }, { createdAt: "desc" }],
  });
}

export async function createSeoTopic(data: {
  title: string;
  targetKeyword: string;
  category: string;
  searchIntent: string;
  notes?: string;
}) {
  await requireCmsAuth();

  const topic = await prisma.seoTopic.create({
    data: {
      title: data.title.trim(),
      targetKeyword: data.targetKeyword.trim(),
      category: data.category.trim() || "Panduan Bahan",
      searchIntent: data.searchIntent.trim() || "Commercial",
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath("/cms");
  revalidatePath("/cms/topics");
  return topic;
}

export async function deleteSeoTopic(id: string) {
  await requireCmsAuth();
  await prisma.seoTopic.delete({ where: { id } });
  revalidatePath("/cms");
  revalidatePath("/cms/topics");
  return { success: true as const };
}

export async function getBlogMediaList() {
  await requireCmsAuth();
  return prisma.blogMedia.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteBlogMedia(id: string) {
  await requireCmsAuth();
  await prisma.blogMedia.delete({ where: { id } });
  revalidatePath("/cms/media");
  return { success: true as const };
}
