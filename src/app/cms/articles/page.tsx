import { getBlogPosts } from "../../../actions/cms";
import { ArticlesLibraryClient } from "../../../components/cms/ArticlesLibraryClient";

export const dynamic = "force-dynamic";

export default async function CmsArticlesPage() {
  const posts = await getBlogPosts();
  return <ArticlesLibraryClient initialPosts={posts} />;
}
