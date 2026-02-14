import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn('animate-pulse rounded-lg bg-muted', className)} />
);

export const CardSkeleton = () => (
  <div className="glass-border rounded-lg overflow-hidden">
    <Skeleton className="aspect-video w-full" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  </div>
);

export const PageSkeleton = () => (
  <div className="py-20">
    <div className="container max-w-5xl space-y-8">
      <div className="text-center space-y-3">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-5 w-80 mx-auto" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);
