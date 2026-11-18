import { redirect } from "next/navigation";

export default async function CmsEditByIdRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/cms/write?id=${encodeURIComponent(id)}`);
}
