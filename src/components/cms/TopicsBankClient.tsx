"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lightbulb,
  Sparkles,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";
import { createSeoTopic, deleteSeoTopic } from "../../actions/cms";
import { generateTopicIdeasWithAi } from "../../actions/cms-ai";
import { BLOG_CATEGORIES } from "../../lib/cms-utils";

export interface SeoTopicItem {
  id: string;
  title: string;
  targetKeyword: string;
  category: string;
  searchIntent: string;
  notes: string | null;
  isUsed: boolean;
  createdAt: Date | string;
}

export function TopicsBankClient({ initialTopics }: { initialTopics: SeoTopicItem[] }) {
  const router = useRouter();
  const [topics, setTopics] = useState<SeoTopicItem[]>(initialTopics);
  const [focusArea, setFocusArea] = useState("");
  const [isResearching, setIsResearching] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newCategory, setNewCategory] = useState<string>(BLOG_CATEGORIES[0]);
  const [newIntent, setNewIntent] = useState("Commercial");
  const [newNotes, setNewNotes] = useState("");
  const [isSavingManual, setIsSavingManual] = useState(false);

  useEffect(() => {
    setTopics(initialTopics);
  }, [initialTopics]);

  const handleAiResearch = async () => {
    setIsResearching(true);
    try {
      const res = await generateTopicIdeasWithAi(focusArea);
      if (res.success) {
        setFocusArea("");
        router.refresh();
      } else {
        alert(res.error || "Gagal melakukan riset topik.");
      }
    } catch {
      alert("Gagal menjalankan riset topik AI.");
    } finally {
      setIsResearching(false);
    }
  };

  const handleCreateManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newKeyword.trim()) return;
    setIsSavingManual(true);
    try {
      const created = await createSeoTopic({
        title: newTitle,
        targetKeyword: newKeyword,
        category: newCategory,
        searchIntent: newIntent,
        notes: newNotes,
      });
      setTopics((prev) => [created, ...prev]);
      setNewTitle("");
      setNewKeyword("");
      setNewNotes("");
      setIsAddModalOpen(false);
      router.refresh();
    } catch {
      alert("Gagal menyimpan topik.");
    } finally {
      setIsSavingManual(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus ide topik ini?")) return;
    try {
      await deleteSeoTopic(id);
      setTopics((prev) => prev.filter((t) => t.id !== id));
      router.refresh();
    } catch {
      alert("Gagal menghapus topik.");
    }
  };

  return (
    <div className="min-h-full w-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-8 py-5 shrink-0 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Lightbulb className="h-6 w-6 text-brand-gold" />
              AI Keyword &amp; Topic Bank
            </h1>
            <p className="text-slate-500 text-xs lg:text-sm mt-1">
              Riset otomatis ide artikel bernilai komersial B2B dengan Gemini 2.5 Flash.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Manual</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Gemini Research Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <h2 className="text-sm font-bold text-slate-900">
              Generator Riset Topik B2B (Gemini 2.5 Flash)
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              placeholder="Fokus opsional (misal: seragam gathering cikarang, perbandingan sablon DTF vs plastisol)..."
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <button
              type="button"
              disabled={isResearching}
              onClick={handleAiResearch}
              className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
            >
              {isResearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                  <span>Gemini Sedang Meriset...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>Riset 8 Ide Topik dengan AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Topics Grid */}
        {topics.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3 shadow-sm">
            <Lightbulb className="w-8 h-8 text-brand-gold mx-auto" />
            <p className="text-sm font-bold text-slate-900">Bank topik masih kosong</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Klik tombol &quot;Riset 8 Ide Topik dengan AI&quot; di atas untuk langsung mengisi daftar topik artikel berpotensi lead WA tinggi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => {
              const writeHref = `/cms/write?topicId=${encodeURIComponent(
                topic.id
              )}&topic=${encodeURIComponent(topic.title)}&keyword=${encodeURIComponent(
                topic.targetKeyword
              )}&category=${encodeURIComponent(topic.category)}`;

              return (
                <div
                  key={topic.id}
                  className={`bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4 ${
                    topic.isUsed ? "border-slate-200 opacity-75" : "border-slate-200"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-gold-light text-brand-gold">
                          {topic.searchIntent}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {topic.category}
                        </span>
                      </div>

                      {topic.isUsed && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Sudah Ditulis
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{topic.title}</h3>

                    <p className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-700">Target Keyword:</span>{" "}
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                        {topic.targetKeyword}
                      </span>
                    </p>

                    {topic.notes && (
                      <p className="text-xs text-slate-500 leading-relaxed">{topic.notes}</p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={writeHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors"
                    >
                      <span>Tulis Artikel Ini</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(topic.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      title="Hapus topik"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Tambah Manual */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Tambah Ide Topik Manual</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateManual} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Judul / Ide Artikel</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Panduan Memilih Bahan Polo Shirt untuk Seragam Kantor"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Target Keyword</label>
                <input
                  type="text"
                  required
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Contoh: bahan polo shirt seragam kantor"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                  >
                    {BLOG_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Search Intent</label>
                  <select
                    value={newIntent}
                    onChange={(e) => setNewIntent(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Informational">Informational</option>
                    <option value="Local">Local</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Catatan Sudut Pandang (Opsional)</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Tekankan keunggulan Lacoste Pique vs Soft..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-semibold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingManual}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold disabled:opacity-50"
                >
                  {isSavingManual ? "Menyimpan..." : "Simpan Topik"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
