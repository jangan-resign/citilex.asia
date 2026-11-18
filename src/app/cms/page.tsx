import Link from "next/link";
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  Lightbulb,
  Globe,
  FolderOpen,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { getCmsOverviewStats } from "../../actions/cms";
import { allSeoMoneyPages } from "../../lib/seo-pages";

export const dynamic = "force-dynamic";

export default async function CmsOverviewPage() {
  const stats = await getCmsOverviewStats();

  return (
    <div className="min-h-full w-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-8 py-5 shrink-0 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <LayoutDashboard className="h-6 w-6 text-brand-gold" />
              SEO &amp; Content Overview
            </h1>
            <p className="text-slate-500 text-xs lg:text-sm mt-1">
              Studio manajemen artikel SEO berbasis Gemini 2.5 Flash untuk mendorong trafik B2B ke citilex.asia.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/cms/topics"
              className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Lightbulb className="w-4 h-4 text-brand-gold" />
              <span>Riset Topik</span>
            </Link>
            <Link
              href="/cms/write"
              className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>Tulis Artikel AI</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Artikel Published
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalPublished}</p>
            <p className="text-xs text-slate-500">{stats.totalDraft} artikel masih berstatus Draft</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Rata-Rata Skor SEO
              </span>
              <Sparkles className="w-4 h-4 text-brand-gold" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {stats.avgSeoScore}
              <span className="text-base font-medium text-slate-400">/100</span>
            </p>
            <p className="text-xs text-slate-500">Target ideal artikel B2B minimal 80/100</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Money Pages Aktif
              </span>
              <Globe className="w-4 h-4 text-brand-gold" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{allSeoMoneyPages.length}</p>
            <p className="text-xs text-slate-500">5 Layanan + 6 Area Jabodetabek</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Bank Ide &amp; Media
              </span>
              <FolderOpen className="w-4 h-4 text-slate-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.unusedTopics}</p>
            <p className="text-xs text-slate-500">
              Topik siap tulis • {stats.totalMedia} gambar UploadThing
            </p>
          </div>
        </div>

        {/* Shortcut Modules + Recent Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Artikel Terbaru */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-gold" />
                <h2 className="text-sm font-bold text-slate-900">Artikel Terbaru</h2>
              </div>
              <Link href="/cms/articles" className="text-xs font-semibold text-brand-gold hover:underline">
                Lihat Semua →
              </Link>
            </div>

            {stats.recentPosts.length === 0 ? (
              <div className="p-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-brand-gold-light text-brand-gold flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-800">Belum ada artikel dibuat</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Gunakan AI Article Studio bertenaga Gemini 2.5 Flash untuk membuat artikel SEO pertama Anda dalam hitungan detik.
                </p>
                <div className="pt-2">
                  <Link
                    href="/cms/write"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat Artikel Pertama</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {stats.recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            post.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {post.status}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">{post.category}</span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readingTimeMin} mnt baca
                        </span>
                      </div>
                      <Link
                        href={`/cms/write?id=${post.id}`}
                        className="block text-sm font-bold text-slate-900 hover:text-brand-gold truncate"
                      >
                        {post.title}
                      </Link>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        SEO {post.seoScore}/100
                      </span>
                      <Link
                        href={`/cms/write?id=${post.id}`}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                      >
                        Edit
                      </Link>
                      {post.status === "PUBLISHED" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-brand-gold hover:bg-brand-gold-light rounded-lg"
                          title="Lihat artikel publik"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Panduan Cepat Alur Konten */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900">Alur Kerja Penulisan Cepat</h2>
              <ol className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-gold-light text-brand-gold font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span>
                    Pilih ide dari <strong className="text-slate-800">AI Topic Bank</strong> atau minta Gemini meriset topik baru.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-gold-light text-brand-gold font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span>
                    Klik <strong className="text-slate-800">Generate Artikel AI</strong> di Studio agar struktur H2, tabel &amp; FAQ otomatis tersusun.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-gold-light text-brand-gold font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>
                    Unggah foto cover via <strong className="text-slate-800">UploadThing</strong>, pastikan skor SEO hijau, lalu klik <strong className="text-slate-800">Publish</strong>.
                  </span>
                </li>
              </ol>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-slate-900">Direktori Internal Link</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tanamkan link ke 11 halaman layanan &amp; kota di setiap artikel agar peringkat Money Pages ikut terdongkrak.
              </p>
              <Link
                href="/cms/landing-pages"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold hover:underline"
              >
                <span>Buka Money Pages Directory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
