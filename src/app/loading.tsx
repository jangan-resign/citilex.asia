import { Skeleton } from "../components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-24 bg-white">
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2 w-full flex flex-col items-center">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}
