"use client";

import { useState } from "react";
import { Globe, Copy, Check, ExternalLink } from "lucide-react";

export interface DirectoryPageEntry {
  slug: string;
  label: string;
  title: string;
  group: "Layanan & Intent B2B" | "Area Jabodetabek" | "Profil & Portofolio";
  keywords: string[];
}

export function MoneyPagesClient({ entries }: { entries: DirectoryPageEntry[] }) {
  const [groupFilter, setGroupFilter] = useState<"ALL" | DirectoryPageEntry["group"]>("ALL");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filtered =
    groupFilter === "ALL" ? entries : entries.filter((item) => item.group === groupFilter);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      alert("Gagal menyalin link.");
    }
  };

  return (
    <div className="min-h-full w-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-8 py-5 shrink-0 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Globe className="h-6 w-6 text-brand-gold" />
              Money Pages Directory
            </h1>
            <p className="text-slate-500 text-xs lg:text-sm mt-1">
              Daftar URL landing page B2B Citilex Asia beserta target kata kunci untuk kebutuhan internal linking artikel.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["ALL", "Layanan & Intent B2B", "Area Jabodetabek", "Profil & Portofolio"] as const).map(
              (group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setGroupFilter(group)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    groupFilter === group
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {group === "ALL" ? "Semua" : group}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const markdownLink = `[${item.label}](/${item.slug})`;
            const isCopied = copiedKey === item.slug;
            return (
              <div
                key={item.slug}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-gold-light text-brand-gold">
                      {item.group}
                    </span>
                    <a
                      href={`/${item.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-brand-primary flex items-center gap-1"
                    >
                      <span>/{item.slug}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <h2 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h2>

                  <div className="flex flex-wrap gap-1.5">
                    {item.keywords.slice(0, 3).map((kw) => (
                      <span
                        key={kw}
                        className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(markdownLink, item.slug)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-black transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Link Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Markdown Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
