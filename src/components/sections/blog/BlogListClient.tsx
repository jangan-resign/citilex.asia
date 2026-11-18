"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { BLOG_CATEGORIES } from "../../../lib/cms-utils";

export interface PublicBlogCard {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  coverAlt: string | null;
  category: string;
  readingTimeMin: number;
  publishedAt: string | null;
  authorName: string;
}

const filterBtnBaseClass = [
  "px-5 py-3 text-xs font-bold tracking-[0.16em] uppercase",
  "border transition-colors duration-200",
].join(" ");

const articleCardClass = [
  "group bg-white border border-brand-platinum",
  "hover:border-brand-primary hover:shadow-lg",
  "transition-all duration-300 flex flex-col justify-between",
].join(" ");

export default function BlogListClient({ posts }: { posts: PublicBlogCard[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = ["Semua", ...BLOG_CATEGORIES];

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "Semua") return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  };

  return (
    <div className="space-y-10">
      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
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

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white border border-brand-platinum p-10 text-center space-y-2">
          <p className="text-sm font-extrabold uppercase tracking-wider text-brand-primary">
            Belum ada artikel pada kategori ini
          </p>
          <p className="text-xs text-brand-onyx/80">
            Pilih kategori &quot;Semua&quot; untuk melihat seluruh panduan pengadaan apparel Citilex Asia.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className={articleCardClass}>
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative aspect-[16/10] bg-brand-snow border-b border-brand-platinum overflow-hidden"
                >
                  <Image
                    src={post.coverImage || "/og-image.png"}
                    alt={post.coverAlt || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/85 border border-[#D4AF37]/40 backdrop-blur-xs">
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#F3D98B]">
                      {post.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6 md:p-7 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-brand-onyx/75">
                    {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                    {post.publishedAt && <span>•</span>}
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTimeMin} mnt baca
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold tracking-tight uppercase text-brand-primary leading-snug group-hover:underline underline-offset-4">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs md:text-sm text-brand-onyx/85 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 md:px-7 pb-6 pt-3 border-t border-brand-platinum">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-between w-full py-1.5 text-xs font-bold tracking-[0.18em] uppercase text-brand-primary"
                >
                  <span>Baca Panduan Lengkap</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
