import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Skeleton } from "../components/ui/Skeleton";

const highlightSkeletonIndices = [0, 1, 2];

export default function PublicLoading() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <Header />

      <main className="pt-8" aria-busy="true" aria-label="Memuat halaman">
        {/* SECTION 1: HERO 2 KOLOM */}
        <section className="px-6 md:px-12 pt-14 pb-20 md:pt-20 md:pb-28">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-7 md:space-y-8">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-16 rounded-none" />
                <Skeleton className="h-3.5 w-3 rounded-none" />
                <Skeleton className="h-3.5 w-28 rounded-none" />
              </div>

              <Skeleton className="h-3.5 w-48 rounded-none" />

              <div className="space-y-3">
                <Skeleton className="h-11 md:h-14 w-11/12 rounded-none" />
                <Skeleton className="h-11 md:h-14 w-4/5 rounded-none" />
                <Skeleton className="h-11 md:h-14 w-2/3 rounded-none" />
              </div>

              <div className="space-y-2.5 max-w-xl">
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-5/6 rounded-none" />
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Skeleton className="h-14 w-64 rounded-none" />
                <Skeleton className="h-14 w-44 rounded-none" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-brand-platinum p-2.5 shadow-xl rounded-none">
                <Skeleton className="w-full h-[460px] md:h-[560px] rounded-none" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 3-COLUMN HIGHLIGHTS */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-snow border-y border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-10">
            <Skeleton className="h-8 w-72 rounded-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlightSkeletonIndices.map((idx) => (
                <div
                  key={idx}
                  className="bg-white p-7 md:p-8 border border-brand-platinum rounded-none space-y-4"
                >
                  <Skeleton className="h-8 w-8 rounded-none" />
                  <Skeleton className="h-5 w-3/4 rounded-none" />
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-full rounded-none" />
                    <Skeleton className="h-3.5 w-11/12 rounded-none" />
                    <Skeleton className="h-3.5 w-4/5 rounded-none" />
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
