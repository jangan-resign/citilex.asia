import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Skeleton } from "../../components/ui/Skeleton";

const channelIndices = [0, 1, 2];
const officeIndices = [0, 1];

export default function KontakLoading() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <Header />

      <main className="pt-8" aria-busy="true" aria-label="Memuat halaman kontak">
        {/* SECTION 1: HERO KONTAK & SALURAN KOMUNIKASI */}
        <section className="px-6 md:px-12 pt-14 pb-20 md:pt-20 md:pb-24 border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-14">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-16 rounded-md" />
                <Skeleton className="h-3.5 w-3 rounded-md" />
                <Skeleton className="h-3.5 w-20 rounded-md" />
              </div>

              <Skeleton className="h-3.5 w-48 rounded-md" />

              <div className="space-y-3">
                <Skeleton className="h-11 md:h-14 w-11/12 rounded-xl" />
                <Skeleton className="h-11 md:h-14 w-3/4 rounded-xl" />
              </div>

              <div className="space-y-2 max-w-xl">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
              </div>
            </div>

            {/* 3 KARTU SALURAN KOMUNIKASI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {channelIndices.map((idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 border border-brand-platinum rounded-2xl space-y-5"
                >
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-5 w-1/2 rounded-md" />
                  <Skeleton className="h-4 w-4/5 rounded-md" />
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: LOKASI KANTOR & PUSAT PRODUKSI */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-snow border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-10">
            <Skeleton className="h-8 w-80 rounded-lg" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {officeIndices.map((idx) => (
                <div
                  key={idx}
                  className="bg-white border border-brand-platinum p-8 md:p-10 rounded-2xl space-y-6"
                >
                  <Skeleton className="h-6 w-44 rounded-full" />
                  <Skeleton className="h-7 w-3/4 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                  </div>
                  <Skeleton className="h-12 w-56 rounded-xl" />
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
