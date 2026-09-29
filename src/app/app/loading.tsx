import { Skeleton } from "../../components/ui/Skeleton";

export default function AppLoading() {
  return (
    <div className="flex h-full w-full flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[120px] rounded-lg" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
      
      <div className="flex-1 w-full mt-4">
        <Skeleton className="h-full min-h-[400px] w-full rounded-xl" />
      </div>
    </div>
  );
}
