import { getBlogMediaList } from "../../../actions/cms";
import { MediaGalleryClient } from "../../../components/cms/MediaGalleryClient";

export const dynamic = "force-dynamic";

export default async function CmsMediaGalleryPage() {
  const media = await getBlogMediaList();
  return <MediaGalleryClient initialMedia={media} />;
}
