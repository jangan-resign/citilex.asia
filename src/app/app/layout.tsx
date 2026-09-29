import { ReactNode } from "react";
import { Sidebar } from "../../components/app/Sidebar";
import { FactoryDataProvider } from "../../components/providers/FactoryDataProvider";
import { prisma } from "../../lib/prisma";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";

export const metadata = {
  title: "Dashboard | CITILEX ASIA Workspace",
  description: "Customer Service Workspace with AI Assistant",
};

const getCachedFactoryData = unstable_cache(
  async () => {
    try {
      const config = await prisma.systemConfig.findUnique({
        where: { key: "FACTORY_DATA" }
      });
      return config ? config.value : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  ["factory-data"],
  { tags: ["factory-data"] }
);

export default async function CSLayout({ children }: { children: ReactNode }) {
  const factoryData = await getCachedFactoryData();
  const cookieStore = await cookies();
  const role = cookieStore.get("auth_role")?.value || "Unknown";

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-slate-50 font-sans antialiased overflow-hidden">
      <FactoryDataProvider initialData={factoryData as any}>
        {/* Sidebar Navigation & Mobile Header */}
        <Sidebar userRole={role} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </FactoryDataProvider>
    </div>
  );
}
