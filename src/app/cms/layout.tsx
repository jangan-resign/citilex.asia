import type { Metadata } from "next";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { CmsSidebar } from "../../components/cms/CmsSidebar";

export const metadata: Metadata = {
  title: "AI Blog CMS Studio | CITILEX ASIA",
  description: "Content Management System & AI SEO Generator CITILEX ASIA",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CmsLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value || "cms";

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-slate-50 font-sans antialiased overflow-hidden">
      <CmsSidebar userRole={role} />
      <main className="flex-1 overflow-auto flex flex-col relative">{children}</main>
    </div>
  );
}
