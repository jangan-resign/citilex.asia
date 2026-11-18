import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Skeleton } from "../../components/ui/Skeleton";

const badgeIndices = [0, 1, 2];
const facilityIndices = [0, 1, 2, 3];
const locationIndices = [0, 1];
const advantageIndices = [0, 1, 2, 3, 4, 5];

export default function TentangKamiLoading() {
  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-brand-primary selection:text-brand-white">
      <Header />

      <main className="pt-8" aria-busy="true" aria-label="Memuat profil perusahaan">
        {/* SECTION 1: HERO TENTANG KAMI (12 KOLOM) */}
        <section className="px-6 md:px-12 pt-14 pb-20 md:pt-20 md:pb-24 border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-7">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-16 rounded-md" />
                <Skeleton className="h-3.5 w-3 rounded-md" />
                <Skeleton className="h-3.5 w-24 rounded-md" />
              </div>

              <Skeleton className="h-3.5 w-56 rounded-md" />

              <div className="space-y-3">
                <Skeleton className="h-11 md:h-14 w-11/12 rounded-xl" />
                <Skeleton className="h-11 md:h-14 w-4/5 rounded-xl" />
              </div>

              <div className="space-y-2.5 max-w-2xl">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-11/12 rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>

              <div className="flex flex-wrap gap-3">
                {badgeIndices.map((idx) => (
                  <Skeleton key={idx} className="h-9 w-40 rounded-lg" />
                ))}
              </div>

              <Skeleton className="h-14 w-64 rounded-xl" />
            </div>

            {/* RIGHT: 2x2 FOTO FASILITAS */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {facilityIndices.map((idx) => (
                <div
                  key={idx}
                  className="bg-white border border-brand-platinum p-2 rounded-2xl space-y-2"
                >
                  <Skeleton className="w-full aspect-[4/3] rounded-xl" />
                  <Skeleton className="h-3.5 w-3/4 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: LOKASI & KEUNGGULAN */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-brand-snow border-b border-brand-platinum">
          <div className="max-w-[1280px] mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locationIndices.map((idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 border border-brand-platinum rounded-2xl space-y-4"
                >
                  <Skeleton className="h-3.5 w-36 rounded-md" />
                  <Skeleton className="h-6 w-2/3 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-4/5 rounded-md" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantageIndices.map((idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 border border-brand-platinum rounded-2xl space-y-3"
                >
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-3.5 w-full rounded-md" />
                  <Skeleton className="h-3.5 w-5/6 rounded-md" />
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
