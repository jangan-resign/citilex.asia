import type { Metadata } from "next";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CmsSidebar } from "../../components/cms/CmsSidebar";
import { prisma } from "../../lib/prisma";

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
  const role = cookieStore.get("cms_auth_role")?.value;
  const sessionToken = cookieStore.get("cms_session_token")?.value;

  if (role !== "cms" || !sessionToken) {
    redirect("/login?from=cms");
  }

  const activeSession = await prisma.roleSession.findUnique({
    where: { role: "cms" },
  });

  if (
    !activeSession ||
    activeSession.sessionToken !== sessionToken ||
    activeSession.expiresAt <= new Date()
  ) {
    redirect("/login?from=cms");
  }

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-slate-50 font-sans antialiased overflow-hidden">
      <CmsSidebar userRole="cms" />
      <main className="flex-1 overflow-auto flex flex-col relative">{children}</main>
    </div>
  );
}
