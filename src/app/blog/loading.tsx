import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Skeleton } from "../../components/ui/Skeleton";

const categoryIndices = [0, 1, 2, 3, 4];
const articleCardIndices = [0, 1, 2, 3, 4, 5];

export default function BlogIndexLoading() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <Header />

      <main className="pt-8" aria-busy="true" aria-label="Memuat daftar artikel blog">
        {/* SECTION 1: HERO BLOG */}
        <section className="px-6 md:px-12 pt-14 pb-16 md:pt-20 md:pb-20 border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-16 rounded-none" />
              <Skeleton className="h-3.5 w-3 rounded-none" />
              <Skeleton className="h-3.5 w-14 rounded-none" />
            </div>

            <Skeleton className="h-3.5 w-60 rounded-none" />

            <div className="space-y-3 max-w-4xl">
              <Skeleton className="h-11 md:h-14 w-11/12 rounded-none" />
              <Skeleton className="h-11 md:h-14 w-3/4 rounded-none" />
            </div>

            <div className="space-y-2 max-w-2xl">
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-4 w-5/6 rounded-none" />
            </div>
          </div>
        </section>

        {/* SECTION 2: FILTER & GRID ARTIKEL */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-snow border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-10">
            <div className="flex flex-wrap items-center gap-3">
              {categoryIndices.map((idx) => (
                <Skeleton key={idx} className="h-11 w-36 rounded-none" />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articleCardIndices.map((idx) => (
                <div
                  key={idx}
                  className="bg-white border border-brand-platinum rounded-none flex flex-col justify-between"
                >
                  <div>
                    <Skeleton className="w-full aspect-[16/10] border-b border-brand-platinum rounded-none" />
                    <div className="p-6 md:p-7 space-y-3">
                      <Skeleton className="h-3.5 w-32 rounded-none" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-full rounded-none" />
                        <Skeleton className="h-5 w-4/5 rounded-none" />
                      </div>
                      <div className="space-y-1.5 pt-1">
                        <Skeleton className="h-3.5 w-full rounded-none" />
                        <Skeleton className="h-3.5 w-11/12 rounded-none" />
                        <Skeleton className="h-3.5 w-3/4 rounded-none" />
                      </div>
                    </div>
                  </div>
                  <div className="px-6 md:px-7 pb-6 pt-3 border-t border-brand-platinum">
                    <Skeleton className="h-4 w-40 rounded-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
