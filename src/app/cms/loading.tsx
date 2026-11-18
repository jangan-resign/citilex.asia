import { Skeleton } from "../../components/ui/Skeleton";

const kpiIndices = [0, 1, 2, 3];
const recentArticleIndices = [0, 1, 2, 3];

export default function CmsLoading() {
  return (
    <div className="min-h-full w-full bg-slate-50 flex flex-col" aria-busy="true" aria-label="Memuat CMS">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-8 py-5 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-7 w-64 rounded-lg" />
            <Skeleton className="h-4 w-80 rounded-md" />
          </div>
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-36 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* 4 Kartu KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiIndices.map((idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-28 rounded" />
                <Skeleton className="h-4 w-4 rounded" />
              </div>
              <Skeleton className="h-8 w-16 rounded" />
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          ))}
        </div>

        {/* Grid Konten Utama (Kiri: Daftar Artikel, Kanan: Panel Panduan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-36 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
            <div className="divide-y divide-slate-100 space-y-3">
              {recentArticleIndices.map((idx) => (
                <div key={idx} className="pt-3 flex items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-3.5 w-40 rounded" />
                    <Skeleton className="h-4 w-4/5 rounded" />
                  </div>
                  <Skeleton className="h-8 w-28 rounded-lg shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
              <Skeleton className="h-5 w-44 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-36 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
