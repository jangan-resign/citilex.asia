"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowLeft,
  Save,
  Globe,
  Loader2,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  HelpCircle,
  Link2,
} from "lucide-react";
import { UploadDropzone } from "../../utils/uploadthing";
import { saveBlogPost } from "../../actions/cms";
import { generateSeoArticleWithAi } from "../../actions/cms-ai";
import {
  BLOG_CATEGORIES,
  evaluateSeoScore,
  slugifyText,
  type BlogFaqItem,
} from "../../lib/cms-utils";

export interface EditablePost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  coverAlt: string | null;
  category: string;
  targetKeyword: string | null;
  tags: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  faqItems: BlogFaqItem[];
  status: "DRAFT" | "PUBLISHED";
  authorName: string;
}

interface ArticleStudioClientProps {
  initialPost?: EditablePost | null;
  prefill?: {
    topicId?: string;
    topic?: string;
    keyword?: string;
    category?: string;
  };
  mediaGallery: { id: string; name: string; url: string; altText: string | null }[];
  moneyPages: { slug: string; label: string }[];
}

export function ArticleStudioClient({
  initialPost,
  prefill,
  mediaGallery,
  moneyPages,
}: ArticleStudioClientProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [mobileTab, setMobileTab] = useState<"ai" | "editor" | "seo">(
    initialPost ? "editor" : "ai"
  );

  // Saved identity state
  const [postId, setPostId] = useState<string | undefined>(initialPost?.id);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(initialPost?.status || "DRAFT");

  // Main form state
  const [title, setTitle] = useState(initialPost?.title || prefill?.topic || "");
  const [slug, setSlug] = useState(
    initialPost?.slug || (prefill?.topic ? slugifyText(prefill.topic) : "")
  );
  const [slugLocked, setSlugLocked] = useState(Boolean(initialPost?.id));
  const [category, setCategory] = useState(
    initialPost?.category || prefill?.category || BLOG_CATEGORIES[0]
  );
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage || "");
  const [coverAlt, setCoverAlt] = useState(initialPost?.coverAlt || "");
  const [targetKeyword, setTargetKeyword] = useState(
    initialPost?.targetKeyword || prefill?.keyword || ""
  );
  const [tagsText, setTagsText] = useState((initialPost?.tags || []).join(", "));
  const [metaTitle, setMetaTitle] = useState(initialPost?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialPost?.metaDescription || "");
  const [authorName, setAuthorName] = useState(
    initialPost?.authorName || "Tim Editorial Citilex Asia"
  );
  const [faqItems, setFaqItems] = useState<BlogFaqItem[]>(
    initialPost?.faqItems && initialPost.faqItems.length > 0
      ? initialPost.faqItems
      : [{ question: "", answer: "" }]
  );

  // AI Generator state
  const [aiTopic, setAiTopic] = useState(prefill?.topic || initialPost?.title || "");
  const [aiKeyword, setAiKeyword] = useState(
    prefill?.keyword || initialPost?.targetKeyword || ""
  );
  const [aiNotes, setAiNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Gallery picker & link helper
  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [showLinkPicker, setShowLinkPicker] = useState(false);

  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [lastPublishedSlug, setLastPublishedSlug] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const resetFormToNew = () => {
    setPostId(undefined);
    setStatus("DRAFT");
    setTitle("");
    setSlug("");
    setSlugLocked(false);
    setCategory(BLOG_CATEGORIES[0]);
    setExcerpt("");
    setContent("");
    setCoverImage("");
    setCoverAlt("");
    setTargetKeyword("");
    setTagsText("");
    setMetaTitle("");
    setMetaDescription("");
    setAuthorName("Tim Editorial Citilex Asia");
    setFaqItems([{ question: "", answer: "" }]);
    setAiTopic("");
    setAiKeyword("");
    setAiNotes("");
    setShowGalleryPicker(false);
    setShowLinkPicker(false);
  };

  const seoEval = useMemo(
    () =>
      evaluateSeoScore({
        title,
        metaTitle,
        metaDescription,
        targetKeyword,
        content,
        coverImage,
        coverAlt,
        faqItems,
      }),
    [title, metaTitle, metaDescription, targetKeyword, content, coverImage, coverAlt, faqItems]
  );

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugLocked) {
      setSlug(slugifyText(val));
    }
  };

  const insertIntoContent = (snippet: string) => {
    const textarea = contentRef.current;
    if (!textarea) {
      setContent((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
      return;
    }
    const start = textarea.selectionStart ?? content.length;
    const end = textarea.selectionEnd ?? content.length;
    const nextContent = content.slice(0, start) + snippet + content.slice(end);
    setContent(nextContent);
    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + snippet.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 10);
  };

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) {
      setFeedback({ type: "error", text: "Isi topik atau judul ide untuk AI terlebih dahulu." });
      return;
    }
    setIsGenerating(true);
    setFeedback(null);
    setLastPublishedSlug(null);
    try {
      const res = await generateSeoArticleWithAi({
        topic: aiTopic,
        targetKeyword: aiKeyword,
        category,
        additionalNotes: aiNotes,
      });
      if (res.success && res.data) {
        const d = res.data;
        setTitle(d.title);
        setSlug(d.slug);
        setSlugLocked(false);
        setExcerpt(d.excerpt);
        setCategory(d.category);
        setTargetKeyword(d.targetKeyword);
        setTagsText((d.tags || []).join(", "));
        setMetaTitle(d.metaTitle);
        setMetaDescription(d.metaDescription);
        setCoverAlt(d.coverAlt);
        setContent(d.content);
        if (d.faqItems && d.faqItems.length > 0) {
          setFaqItems(d.faqItems);
        }
        setMobileTab("editor");
        setFeedback({
          type: "success",
          text: "Artikel lengkap, Meta SEO, dan FAQ berhasil di-generate oleh Gemini 2.5 Flash! Silakan review sebelum Publish.",
        });
      } else {
        setFeedback({ type: "error", text: res.error || "Gagal menghasilkan artikel." });
      }
    } catch {
      setFeedback({ type: "error", text: "Terjadi kendala saat menghubungi Gemini AI." });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (targetStatus: "DRAFT" | "PUBLISHED") => {
    setIsSaving(true);
    setFeedback(null);
    setLastPublishedSlug(null);
    try {
      const tags = tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await saveBlogPost({
        id: postId,
        topicId: prefill?.topicId,
        title,
        slug,
        excerpt,
        content,
        coverImage,
        coverAlt,
        category,
        targetKeyword,
        tags,
        metaTitle,
        metaDescription,
        faqItems,
        status: targetStatus,
        authorName,
      });

      if (res.success) {
        if (targetStatus === "PUBLISHED" && !initialPost) {
          const publishedTitle = title.trim() || res.post.title;
          setLastPublishedSlug(res.post.slug);
          resetFormToNew();
          setFeedback({
            type: "success",
            text: `Artikel "${publishedTitle}" berhasil diterbitkan ke /blog dan otomatis masuk sitemap.xml! Editor telah dikosongkan untuk artikel berikutnya.`,
          });
        } else {
          setPostId(res.post.id);
          setSlug(res.post.slug);
          setSlugLocked(true);
          setStatus(res.post.status);
          if (targetStatus === "PUBLISHED") {
            setLastPublishedSlug(res.post.slug);
          }
          setFeedback({
            type: "success",
            text:
              targetStatus === "PUBLISHED"
                ? "Artikel berhasil diperbarui & diterbitkan ke /blog dan sitemap.xml!"
                : "Artikel berhasil disimpan sebagai Draft.",
          });
        }
        router.refresh();
      } else {
        setFeedback({ type: "error", text: res.error });
      }
    } catch {
      setFeedback({ type: "error", text: "Gagal menyimpan artikel ke database." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-full w-full bg-slate-50 flex flex-col">
      {/* Top Action Header */}
      <div className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 shrink-0 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/cms/articles"
              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 shrink-0"
              title="Kembali ke daftar artikel"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base lg:text-lg font-bold text-slate-900 truncate">
                  {postId ? "Edit Artikel Studio" : "AI Article Studio"}
                </h1>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    status === "PUBLISHED"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {status}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Skor SEO Live:{" "}
                <strong
                  className={
                    seoEval.score >= 80
                      ? "text-emerald-600"
                      : seoEval.score >= 55
                        ? "text-amber-600"
                        : "text-slate-700"
                  }
                >
                  {seoEval.score}/100
                </strong>{" "}
                • {seoEval.wordCount} kata
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {postId && (
              <button
                type="button"
                onClick={() => {
                  if (initialPost) {
                    router.push("/cms/write");
                  } else {
                    setLastPublishedSlug(null);
                    setFeedback(null);
                    resetFormToNew();
                  }
                }}
                className="px-3 py-2 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Artikel Baru</span>
              </button>
            )}

            {status === "PUBLISHED" && slug && (
              <Link
                href={`/blog/${slug}`}
                target="_blank"
                className="px-3 py-2 text-xs font-semibold border border-brand-gold text-brand-gold rounded-lg hover:bg-brand-gold-light flex items-center gap-1.5"
              >
                <span>Lihat Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}

            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave("DRAFT")}
              className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Simpan Draft</span>
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave("PUBLISHED")}
              className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-brand-gold" />
              )}
              <span>{status === "PUBLISHED" ? "Update Publish" : "Publish Sekarang"}</span>
            </button>
          </div>
        </div>

        {/* Sticky Mobile Tab Switcher */}
        <div className="lg:hidden grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setMobileTab("ai")}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-colors ${
              mobileTab === "ai"
                ? "bg-brand-gold-light text-brand-gold border border-brand-gold/30"
                : "bg-slate-50 text-slate-600"
            }`}
          >
            ✨ AI &amp; Cover
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("editor")}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-colors ${
              mobileTab === "editor"
                ? "bg-brand-gold-light text-brand-gold border border-brand-gold/30"
                : "bg-slate-50 text-slate-600"
            }`}
          >
            📝 Tulis Artikel
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("seo")}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-colors ${
              mobileTab === "seo"
                ? "bg-brand-gold-light text-brand-gold border border-brand-gold/30"
                : "bg-slate-50 text-slate-600"
            }`}
          >
            🔍 SEO &amp; FAQ
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className="max-w-7xl w-full mx-auto px-4 lg:px-8 pt-4">
          <div
            className={`p-3.5 rounded-xl border text-xs font-medium flex items-center justify-between gap-3 ${
              feedback.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <span>{feedback.text}</span>
            {feedback.type === "success" && (lastPublishedSlug || (status === "PUBLISHED" && slug)) && (
              <Link
                href={`/blog/${lastPublishedSlug || slug}`}
                target="_blank"
                className="font-bold underline shrink-0 flex items-center gap-1"
              >
                Buka Artikel <ExternalLink className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Main Dual-Column Workspace */}
      <div className="p-4 lg:p-8 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: EDITOR & FAQ */}
        <div className="lg:col-span-8 space-y-6">
          {/* Core Editor Card */}
          <div
            className={`bg-white border border-slate-200 rounded-xl p-5 lg:p-6 shadow-sm space-y-5 ${
              mobileTab === "editor" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Judul Artikel (H1)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: Perbedaan Cotton Combed 30s vs Cotton Bamboo untuk Kaos Gathering"
                className="w-full px-3.5 py-2.5 text-sm font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>URL Slug (/blog/...)</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSlugLocked(false);
                      setSlug(slugifyText(title));
                    }}
                    className="text-[11px] font-medium text-brand-gold hover:underline"
                  >
                    Sync Judul
                  </button>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlugLocked(true);
                    setSlug(slugifyText(e.target.value));
                  }}
                  placeholder="perbedaan-combed-30s-vs-bamboo"
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Kategori Artikel</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-semibold text-slate-700"
                >
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Ringkasan Singkat (Excerpt)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Ringkasan 1-2 kalimat yang muncul di halaman daftar blog..."
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>

            {/* Content Markdown Editor + Helper Toolbar */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs font-bold text-slate-700">
                  Konten Artikel (Format Markdown)
                </label>
                <div className="flex flex-wrap items-center gap-1.5 relative">
                  <button
                    type="button"
                    onClick={() => insertIntoContent("\n\n## Sub-Heading Utama\n\n")}
                    className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                  >
                    + H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertIntoContent("\n\n### Poin Detail\n\n")}
                    className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                  >
                    + H3
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      insertIntoContent(
                        "\n\n| Spesifikasi | Opsi A | Opsi B |\n| :--- | :--- | :--- |\n| Bahan | Combed 30s | Cotton Bamboo |\n| Harga Mulai | Rp 79.000 | Rp 89.000 |\n\n"
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded"
                  >
                    + Tabel
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowLinkPicker((prev) => !prev)}
                      className="px-2.5 py-1 text-[11px] font-bold bg-brand-gold-light text-brand-gold rounded border border-brand-gold/30 flex items-center gap-1"
                    >
                      <Link2 className="w-3 h-3" />
                      <span>Sisipkan Link Layanan</span>
                    </button>
                    {showLinkPicker && (
                      <div className="absolute right-0 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-30 max-h-60 overflow-y-auto p-1.5">
                        {moneyPages.map((mp) => (
                          <button
                            key={mp.slug}
                            type="button"
                            onClick={() => {
                              insertIntoContent(`[${mp.label}](/${mp.slug})`);
                              setShowLinkPicker(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 rounded-lg flex flex-col"
                          >
                            <span className="font-bold text-slate-800">{mp.label}</span>
                            <span className="text-[10px] text-slate-400 font-mono">/{mp.slug}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <textarea
                ref={contentRef}
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis artikel di sini atau klik 'Generate Artikel Lengkap dengan AI'..."
                className="w-full px-4 py-3 text-xs lg:text-sm font-mono leading-relaxed bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
          </div>

          {/* FAQ Schema Editor Card */}
          <div
            className={`bg-white border border-slate-200 rounded-xl p-5 lg:p-6 shadow-sm space-y-4 ${
              mobileTab === "seo" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-gold" />
                <h2 className="text-sm font-bold text-slate-900">
                  FAQ Artikel (Otomatis JSON-LD FAQPage)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setFaqItems((prev) => [...prev, { question: "", answer: "" }])}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah FAQ</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Pertanyaan #{index + 1}
                    </span>
                    {faqItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setFaqItems((prev) => prev.filter((_, i) => i !== index))
                        }
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) =>
                      setFaqItems((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, question: e.target.value } : item
                        )
                      )
                    }
                    placeholder="Pertanyaan yang sering diajukan calon pembeli..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-semibold"
                  />
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) =>
                      setFaqItems((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, answer: e.target.value } : item
                        )
                      )
                    }
                    placeholder="Jawaban singkat dan jelas..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI GENERATOR, COVER MEDIA & SEO CHECKLIST */}
        <div className="lg:col-span-4 space-y-6">
          {/* Gemini 2.5 Flash AI Generator */}
          <div
            className={`bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 ${
              mobileTab === "ai" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-brand-gold-light text-brand-gold flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">AI SEO Writer</h2>
                <p className="text-[11px] text-slate-500">Powered by Gemini 2.5 Flash</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Topik / Ide Judul Artikel</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Misal: Tips memilih bahan kaos gathering kantor outdoor"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Target Keyword Utama</label>
                <input
                  type="text"
                  value={aiKeyword}
                  onChange={(e) => setAiKeyword(e.target.value)}
                  placeholder="Misal: bahan kaos gathering kantor"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Catatan Tambahan (Opsional)</label>
                <textarea
                  rows={2}
                  value={aiNotes}
                  onChange={(e) => setAiNotes(e.target.value)}
                  placeholder="Misal: Tekankan minimal order 50 pcs & perbandingan Combed 30s vs Bamboo..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white"
                />
              </div>

              <button
                type="button"
                disabled={isGenerating}
                onClick={handleAiGenerate}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-black text-white font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                    <span>Gemini Menulis Artikel...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    <span>Generate Artikel Lengkap</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Cover Image & UploadThing */}
          <div
            className={`bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 ${
              mobileTab === "ai" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-brand-gold" />
                <h2 className="text-sm font-bold text-slate-900">Gambar Cover Artikel</h2>
              </div>
              {mediaGallery.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowGalleryPicker((prev) => !prev)}
                  className="text-[11px] font-semibold text-brand-gold hover:underline"
                >
                  {showGalleryPicker ? "Tutup Galeri" : "Pilih dari Galeri"}
                </button>
              )}
            </div>

            {coverImage && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                <img src={coverImage} alt={coverAlt || title} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] font-bold rounded"
                >
                  Ganti
                </button>
              </div>
            )}

            {showGalleryPicker && mediaGallery.length > 0 && (
              <div className="grid grid-cols-3 gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg max-h-40 overflow-y-auto">
                {mediaGallery.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setCoverImage(m.url);
                      if (!coverAlt) setCoverAlt(m.altText || m.name);
                      setShowGalleryPicker(false);
                    }}
                    className="aspect-video rounded overflow-hidden border border-slate-200 hover:border-brand-gold"
                  >
                    <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-1 bg-slate-50/40">
              <UploadDropzone
                endpoint="blogImageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) {
                    setCoverImage(res[0].url);
                    if (!coverAlt) setCoverAlt(title || res[0].name);
                  }
                }}
                onUploadError={(err: Error) => {
                  alert(`Gagal upload cover: ${err.message}`);
                }}
                appearance={{
                  container: "cursor-pointer border-none py-4",
                  button:
                    "bg-slate-800 text-white hover:bg-slate-900 text-xs px-3 py-1.5 font-semibold rounded-lg cursor-pointer",
                  label: "text-brand-gold font-bold text-xs",
                  allowedContent: "text-slate-400 text-[10px]",
                  uploadIcon: "text-slate-700 h-7 w-7",
                }}
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">URL Cover Image</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Alt Text Gambar (SEO)</label>
                <input
                  type="text"
                  value={coverAlt}
                  onChange={(e) => setCoverAlt(e.target.value)}
                  placeholder="Deskripsi gambar untuk Google Images..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* Meta SEO & Live Score */}
          <div
            className={`bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 ${
              mobileTab === "seo" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Metadata &amp; Checklist SEO</h2>
              <span
                className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                  seoEval.score >= 80
                    ? "bg-emerald-50 text-emerald-700"
                    : seoEval.score >= 55
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                }`}
              >
                {seoEval.score}/100
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Target Keyword</label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={title}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Meta Description</label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Tags (pisahkan koma)</label>
                <input
                  type="text"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="kaos gathering, cotton combed 30s"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Nama Penulis</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              {seoEval.checks.map((check) => (
                <div key={check.id} className="flex items-start gap-2 text-[11px]">
                  {check.passed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                  )}
                  <span className={check.passed ? "text-slate-700 font-medium" : "text-slate-400"}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
