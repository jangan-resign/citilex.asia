import { getBlogMediaList, getBlogPostById } from "../../../actions/cms";
import { ArticleStudioClient, type EditablePost } from "../../../components/cms/ArticleStudioClient";
import { allSeoMoneyPages } from "../../../lib/seo-pages";
import type { BlogFaqItem } from "../../../lib/cms-utils";

export const dynamic = "force-dynamic";

interface CmsWritePageProps {
  searchParams: Promise<{
    id?: string;
    topicId?: string;
    topic?: string;
    keyword?: string;
    category?: string;
  }>;
}

export default async function CmsWritePage({ searchParams }: CmsWritePageProps) {
  const params = await searchParams;

  const [postRecord, mediaGallery] = await Promise.all([
    params.id ? getBlogPostById(params.id) : Promise.resolve(null),
    getBlogMediaList(),
  ]);

  const initialPost: EditablePost | null = postRecord
    ? {
        id: postRecord.id,
        title: postRecord.title,
        slug: postRecord.slug,
        excerpt: postRecord.excerpt,
        content: postRecord.content,
        coverImage: postRecord.coverImage,
        coverAlt: postRecord.coverAlt,
        category: postRecord.category,
        targetKeyword: postRecord.targetKeyword,
        tags: postRecord.tags,
        metaTitle: postRecord.metaTitle,
        metaDescription: postRecord.metaDescription,
        faqItems: Array.isArray(postRecord.faqItems)
          ? (postRecord.faqItems as unknown as BlogFaqItem[])
          : [],
        status: postRecord.status,
        authorName: postRecord.authorName,
      }
    : null;

  const moneyPages = [
    ...allSeoMoneyPages.map((p) => ({ slug: p.slug, label: p.h1Primary })),
    { slug: "portofolio", label: "Portofolio Produksi" },
    { slug: "tentang-kami", label: "Tentang Citilex Asia" },
    { slug: "kontak", label: "Kontak & Lokasi" },
  ];

  return (
    <ArticleStudioClient
      initialPost={initialPost}
      prefill={{
        topicId: params.topicId,
        topic: params.topic,
        keyword: params.keyword,
        category: params.category,
      }}
      mediaGallery={mediaGallery.map((m) => ({
        id: m.id,
        name: m.name,
        url: m.url,
        altText: m.altText,
      }))}
      moneyPages={moneyPages}
    />
  );
}
