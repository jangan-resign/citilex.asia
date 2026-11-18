export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface SeoCheckItem {
  id: string;
  label: string;
  passed: boolean;
  points: number;
  maxPoints: number;
}

export const BLOG_CATEGORIES = [
  "Panduan Bahan",
  "Tips Gathering & Event",
  "Sablon & Bordir",
  "Harga & Pengadaan",
] as const;

export function slugifyText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function estimateReadingTime(content: string): number {
  const words = content
    .replace(/[#*|>`_\-\[\]()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function evaluateSeoScore(params: {
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  targetKeyword?: string | null;
  content: string;
  coverImage?: string | null;
  coverAlt?: string | null;
  faqItems?: BlogFaqItem[] | null;
}): { score: number; wordCount: number; checks: SeoCheckItem[] } {
  const titleLen = (params.metaTitle || params.title || "").trim().length;
  const metaDescLen = (params.metaDescription || "").trim().length;
  const keyword = (params.targetKeyword || "").trim().toLowerCase();
  const contentText = (params.content || "").trim();
  const words = contentText
    .replace(/[#*|>`_\-\[\]()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const wordCount = words.length;

  const h2Count = (contentText.match(/^##\s+.+$/gm) || []).length;
  const hasInternalLink = /\]\(\/(kaos-|polo-|seragam-|konveksi-|portofolio|tentang-kami|kontak)/i.test(
    contentText
  );

  const keywordInTitleOrIntro =
    keyword.length > 0 &&
    ((params.title || "").toLowerCase().includes(keyword) ||
      contentText.slice(0, 400).toLowerCase().includes(keyword));

  const validFaqs = (params.faqItems || []).filter(
    (item) => item.question.trim().length > 4 && item.answer.trim().length > 10
  );

  const checks: SeoCheckItem[] = [
    {
      id: "title",
      label: `Panjang Judul / Meta Title optimal (30–70 karakter, saat ini ${titleLen})`,
      passed: titleLen >= 30 && titleLen <= 70,
      points: titleLen >= 30 && titleLen <= 70 ? 15 : titleLen >= 15 ? 8 : 0,
      maxPoints: 15,
    },
    {
      id: "meta-desc",
      label: `Meta Description ideal (100–165 karakter, saat ini ${metaDescLen})`,
      passed: metaDescLen >= 100 && metaDescLen <= 165,
      points: metaDescLen >= 100 && metaDescLen <= 165 ? 15 : metaDescLen >= 50 ? 8 : 0,
      maxPoints: 15,
    },
    {
      id: "keyword",
      label: "Target Keyword muncul di judul atau paragraf pembuka",
      passed: keywordInTitleOrIntro,
      points: keywordInTitleOrIntro ? 15 : 0,
      maxPoints: 15,
    },
    {
      id: "length",
      label: `Kedalaman artikel B2B minimal 600 kata (saat ini ${wordCount} kata)`,
      passed: wordCount >= 600,
      points: wordCount >= 600 ? 15 : wordCount >= 300 ? 8 : 0,
      maxPoints: 15,
    },
    {
      id: "headings",
      label: `Memiliki minimal 2 Sub-heading H2 (##) (saat ini ${h2Count})`,
      passed: h2Count >= 2,
      points: h2Count >= 2 ? 10 : h2Count === 1 ? 5 : 0,
      maxPoints: 10,
    },
    {
      id: "internal-link",
      label: "Menanam Internal Link ke Money Pages / Layanan Citilex",
      passed: hasInternalLink,
      points: hasInternalLink ? 10 : 0,
      maxPoints: 10,
    },
    {
      id: "cover",
      label: "Cover Image terpasang lengkap dengan Alt Text SEO",
      passed: Boolean(params.coverImage?.trim()) && Boolean(params.coverAlt?.trim()),
      points:
        Boolean(params.coverImage?.trim()) && Boolean(params.coverAlt?.trim())
          ? 10
          : Boolean(params.coverImage?.trim())
            ? 5
            : 0,
      maxPoints: 10,
    },
    {
      id: "faq",
      label: `FAQ Schema terisi minimal 2 tanya-jawab (saat ini ${validFaqs.length})`,
      passed: validFaqs.length >= 2,
      points: validFaqs.length >= 2 ? 10 : validFaqs.length === 1 ? 5 : 0,
      maxPoints: 10,
    },
  ];

  const score = checks.reduce((sum, item) => sum + item.points, 0);
  return { score, wordCount, checks };
}
