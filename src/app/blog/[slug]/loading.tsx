import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { Skeleton } from "../../../components/ui/Skeleton";

const sidebarLinkIndices = [0, 1, 2, 3, 4];
const paragraphBlockIndices = [0, 1, 2];

export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <Header />

      <main className="pt-8" aria-busy="true" aria-label="Memuat artikel">
        {/* HERO HEADER ARTIKEL */}
        <section className="px-6 md:px-12 pt-14 pb-12 border-b border-brand-platinum bg-white">
          <div className="max-w-[1280px] mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-3.5 w-16 rounded-none" />
              <Skeleton className="h-3.5 w-3 rounded-none" />
              <Skeleton className="h-3.5 w-12 rounded-none" />
              <Skeleton className="h-3.5 w-3 rounded-none" />
              <Skeleton className="h-3.5 w-28 rounded-none" />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-7 w-32 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-none" />
              <Skeleton className="h-4 w-24 rounded-none" />
              <Skeleton className="h-4 w-36 rounded-none" />
            </div>

            <div className="space-y-3 max-w-4xl">
              <Skeleton className="h-10 md:h-12 w-full rounded-none" />
              <Skeleton className="h-10 md:h-12 w-3/4 rounded-none" />
            </div>

            <div className="space-y-2 max-w-3xl">
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-5/6 rounded-none" />
            </div>

            <div className="w-full bg-brand-snow border border-brand-platinum p-2 rounded-none mt-8">
              <Skeleton className="w-full aspect-[16/9] max-h-[520px] rounded-none" />
            </div>
          </div>
        </section>

        {/* BODY ARTIKEL + SIDEBAR STICKY */}
        <section className="py-14 md:py-20 px-6 md:px-12 bg-white">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Kolom Kiri: Paragraf & Sub-Heading */}
            <div className="lg:col-span-8 space-y-8">
              {paragraphBlockIndices.map((idx) => (
                <div key={idx} className="space-y-3">
                  <Skeleton className="h-7 w-2/3 rounded-none" />
                  <Skeleton className="h-4 w-full rounded-none" />
                  <Skeleton className="h-4 w-11/12 rounded-none" />
                  <Skeleton className="h-4 w-full rounded-none" />
                  <Skeleton className="h-4 w-4/5 rounded-none" />
                </div>
              ))}
            </div>

            {/* Kolom Kanan: 2 Kotak Sidebar Sticky */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-brand-snow border border-brand-platinum p-6 rounded-none space-y-4">
                <Skeleton className="h-3 w-36 rounded-none" />
                <Skeleton className="h-5 w-44 rounded-none" />
                <div className="divide-y divide-brand-platinum border-t border-brand-platinum pt-2 space-y-3">
                  {sidebarLinkIndices.map((idx) => (
                    <Skeleton key={idx} className="h-4 w-full rounded-none" />
                  ))}
                </div>
              </div>

              <div className="bg-white border border-brand-platinum p-6 rounded-none space-y-4">
                <Skeleton className="h-3 w-24 rounded-none" />
                <Skeleton className="h-5 w-48 rounded-none" />
                <div className="space-y-4 border-t border-brand-platinum pt-3">
                  {paragraphBlockIndices.map((idx) => (
                    <div key={idx} className="space-y-1.5">
                      <Skeleton className="h-3 w-24 rounded-none" />
                      <Skeleton className="h-4 w-full rounded-none" />
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
