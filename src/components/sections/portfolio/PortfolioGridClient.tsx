"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioItem } from "../../../lib/data";

const categories: Array<"Semua" | PortfolioItem["category"]> = [
  "Semua",
  "Kaos Custom",
  "Polo Shirt",
];

const filterBtnBaseClass = [
  "px-6 py-3 text-xs font-bold tracking-[0.18em] uppercase",
  "border transition-colors duration-200",
].join(" ");

const cardClass = [
  "group bg-white border border-brand-platinum",
  "hover:border-brand-primary hover:shadow-lg",
  "transition-all duration-300 flex flex-col justify-between",
].join(" ");

const loadMoreBtnClass = [
  "px-8 py-4 border border-brand-primary bg-white text-brand-primary",
  "text-xs font-bold tracking-[0.2em] uppercase",
  "hover:bg-brand-primary hover:text-brand-white",
  "transition-all duration-300",
].join(" ");

interface PortfolioGridClientProps {
  items: PortfolioItem[];
}

export default function PortfolioGridClient({ items }: PortfolioGridClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<"Semua" | PortfolioItem["category"]>("Semua");
  const [showAll, setShowAll] = useState(false);

  const filteredItems =
    selectedCategory === "Semua"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, 6);
  const hasMore = !showAll && filteredItems.length > 6;

  const handleCategoryChange = (cat: "Semua" | PortfolioItem["category"]) => {
    setSelectedCategory(cat);
    setShowAll(false);
  };

  return (
    <div className="space-y-10">
      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              aria-pressed={isActive}
              className={[
                filterBtnBaseClass,
                isActive
                  ? "bg-brand-primary text-brand-white border-brand-primary"
                  : "bg-white text-brand-onyx border-brand-platinum hover:border-brand-primary hover:text-brand-primary",
              ].join(" ")}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* GRID KARTU PORTOFOLIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((item) => (
          <article key={item.id} className={cardClass}>
            <div>
              {/* IMAGE WRAPPER */}
              <div className="relative aspect-[4/3] bg-brand-snow border-b border-brand-platinum overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} — ${item.client} (${item.year})`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 left-3 z-10 px-3.5 py-1.5 bg-black/85 border border-[#D4AF37]/40 backdrop-blur-xs">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F3D98B]">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* TITLE & CLIENT META */}
              <div className="p-6 md:p-7 space-y-2">
                <h3 className="text-lg font-extrabold tracking-tight uppercase text-brand-primary">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-brand-onyx/75 uppercase tracking-wider">
                  {item.client} • {item.year}
                </p>

                {/* SPESIFIKASI JUMLAH & TEKNIK */}
                <div className="grid grid-cols-2 gap-4 border-t border-brand-platinum pt-4 mt-4">
                  <div>
                    <span className="block text-[10px] font-bold tracking-[0.18em] uppercase text-brand-onyx/70">
                      Jumlah
                    </span>
                    <span className="block text-sm font-extrabold text-brand-primary mt-1">
                      {item.qty}
                    </span>
                  </div>
                  <div className="border-l border-brand-platinum pl-4">
                    <span className="block text-[10px] font-bold tracking-[0.18em] uppercase text-brand-onyx/70">
                      Teknik
                    </span>
                    <span className="block text-sm font-extrabold text-brand-primary mt-1">
                      {item.technique}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {hasMore && (
        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className={loadMoreBtnClass}
          >
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  );
}
