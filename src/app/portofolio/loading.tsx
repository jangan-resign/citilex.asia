import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Skeleton } from "../../components/ui/Skeleton";

const filterIndices = [0, 1, 2];
const projectCardIndices = [0, 1, 2, 3, 4, 5];

export default function PortofolioLoading() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <Header />

      <main className="pt-8" aria-busy="true" aria-label="Memuat portofolio">
        {/* SECTION 1: HEADER PORTOFOLIO */}
        <section className="px-6 md:px-12 pt-14 pb-16 md:pt-20 md:pb-20 border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-16 rounded-md" />
              <Skeleton className="h-3.5 w-3 rounded-md" />
              <Skeleton className="h-3.5 w-24 rounded-md" />
            </div>

            <Skeleton className="h-3.5 w-52 rounded-md" />

            <div className="space-y-3 max-w-4xl">
              <Skeleton className="h-11 md:h-14 w-11/12 rounded-xl" />
              <Skeleton className="h-11 md:h-14 w-2/3 rounded-xl" />
            </div>

            <div className="space-y-2 max-w-2xl">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>
          </div>
        </section>

        {/* SECTION 2: FILTER & GRID DOKUMENTASI */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-snow border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-8">
            <Skeleton className="h-8 w-80 rounded-lg" />

            <div className="flex flex-wrap items-center gap-3">
              {filterIndices.map((idx) => (
                <Skeleton key={idx} className="h-11 w-32 rounded-xl" />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectCardIndices.map((idx) => (
                <div
                  key={idx}
                  className="bg-white border border-brand-platinum rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <Skeleton className="w-full aspect-[4/3] border-b border-brand-platinum rounded-none" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-5 w-3/4 rounded-md" />
                      <Skeleton className="h-3.5 w-1/2 rounded-md" />
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-3 border-t border-brand-platinum grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-12 rounded-md" />
                      <Skeleton className="h-4 w-20 rounded-md" />
                    </div>
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-14 rounded-md" />
                      <Skeleton className="h-4 w-24 rounded-md" />
                    </div>
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
