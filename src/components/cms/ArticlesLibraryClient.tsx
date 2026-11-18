"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Search,
  Sparkles,
  ExternalLink,
  Trash2,
  Edit3,
  Globe,
  FileEdit,
  Loader2,
  Clock,
} from "lucide-react";
import { toggleBlogPostStatus, deleteBlogPost } from "../../actions/cms";
import { BLOG_CATEGORIES } from "../../lib/cms-utils";

export interface ArticleSummaryItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  targetKeyword: string | null;
  readingTimeMin: number;
  seoScore: number;
  status: "DRAFT" | "PUBLISHED";
  updatedAt: Date | string;
}

export function ArticlesLibraryClient({
  initialPosts,
}: {
  initialPosts: ArticleSummaryItem[];
}) {
  const router = useRouter();
  const [posts, setPosts] = useState<ArticleSummaryItem[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (statusFilter !== "ALL" && post.status !== statusFilter) return false;
      if (categoryFilter !== "ALL" && post.category !== categoryFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          post.title.toLowerCase().includes(q) ||
          post.slug.toLowerCase().includes(q) ||
          (post.targetKeyword || "").toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [posts, search, statusFilter, categoryFilter]);

  const handleToggleStatus = async (id: string) => {
    setBusyId(id);
    try {
      const res = await toggleBlogPostStatus(id);
      if (res.success) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: res.post.status } : p))
        );
        router.refresh();
      }
    } catch {
      alert("Gagal mengubah status publikasi.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus permanen artikel "${title}"?`)) return;
    setBusyId(id);
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } catch {
      alert("Gagal menghapus artikel.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="min-h-full w-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-8 py-5 shrink-0 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <FileText className="h-6 w-6 text-brand-gold" />
              Articles Library
            </h1>
            <p className="text-slate-500 text-xs lg:text-sm mt-1">
              Kelola seluruh artikel blog SEO Citilex Asia ({posts.length} total artikel).
            </p>
          </div>

          <Link
            href="/cms/write"
            className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 w-fit"
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Tulis Artikel AI Baru</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, keyword, atau slug artikel..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["ALL", "PUBLISHED", "DRAFT"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  statusFilter === status
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {status === "ALL" ? "Semua Status" : status}
              </button>
            ))}

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700"
            >
              <option value="ALL">Semua Kategori</option>
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3 shadow-sm">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-800">Tidak ada artikel ditemukan</p>
            <p className="text-xs text-slate-500">
              Ubah filter pencarian Anda atau buat artikel baru menggunakan AI Article Studio.
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-5">Artikel &amp; Keyword</th>
                    <th className="py-3.5 px-4">Kategori</th>
                    <th className="py-3.5 px-4">Skor SEO</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredPosts.map((post) => {
                    const isBusy = busyId === post.id;
                    return (
                      <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-5 max-w-md">
                          <Link
                            href={`/cms/write?id=${post.id}`}
                            className="font-bold text-sm text-slate-900 hover:text-brand-gold line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                            <span className="font-mono text-slate-400">/blog/{post.slug}</span>
                            {post.targetKeyword && (
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                                KW: {post.targetKeyword}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">
                          {post.category}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`font-bold px-2.5 py-1 rounded-lg ${
                              post.seoScore >= 80
                                ? "bg-emerald-50 text-emerald-700"
                                : post.seoScore >= 60
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {post.seoScore}/100
                          </span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                              post.status === "PUBLISHED"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleToggleStatus(post.id)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold inline-flex items-center gap-1 disabled:opacity-50"
                              title={post.status === "PUBLISHED" ? "Ubah ke Draft" : "Publish Sekarang"}
                            >
                              {isBusy ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : post.status === "PUBLISHED" ? (
                                <FileEdit className="w-3.5 h-3.5 text-amber-600" />
                              ) : (
                                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                              )}
                              <span>{post.status === "PUBLISHED" ? "Draftkan" : "Publish"}</span>
                            </button>

                            <Link
                              href={`/cms/write?id=${post.id}`}
                              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                              title="Edit artikel"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </Link>

                            {post.status === "PUBLISHED" && (
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-brand-gold-light text-brand-gold"
                                title="Lihat di blog publik"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            )}

                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleDelete(post.id, post.title)}
                              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 disabled:opacity-50"
                              title="Hapus artikel"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-3">
              {filteredPosts.map((post) => {
                const isBusy = busyId === post.id;
                return (
                  <div
                    key={post.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          post.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {post.status}
                      </span>
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        SEO {post.seoScore}/100
                      </span>
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-slate-900 leading-snug">{post.title}</h2>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readingTimeMin} mnt
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleToggleStatus(post.id)}
                        className="py-2 px-2 text-xs font-semibold border border-slate-200 rounded-lg text-slate-700 bg-slate-50"
                      >
                        {post.status === "PUBLISHED" ? "Draftkan" : "Publish"}
                      </button>
                      <Link
                        href={`/cms/write?id=${post.id}`}
                        className="py-2 px-2 text-xs font-semibold bg-slate-900 text-white rounded-lg text-center"
                      >
                        Edit
                      </Link>
                      {post.status === "PUBLISHED" ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="py-2 px-2 text-xs font-semibold border border-brand-gold text-brand-gold rounded-lg text-center"
                        >
                          Buka
                        </Link>
                      ) : (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleDelete(post.id, post.title)}
                          className="py-2 px-2 text-xs font-semibold border border-red-200 text-red-600 rounded-lg"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
