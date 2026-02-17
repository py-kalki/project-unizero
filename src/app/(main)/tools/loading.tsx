import { Card, CardContent } from '@/components/ui/card';

/**
 * Loading state for tools page - shows skeleton cards while data loads
 */
export default function ToolsLoading() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-32 bg-muted rounded animate-pulse" />
        <div className="h-4 w-64 bg-muted rounded animate-pulse" />
      </div>

      {/* Search and filters skeleton */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="w-full md:w-64 shrink-0">
          <div className="h-48 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex-1 space-y-6">
          <div className="h-10 w-64 bg-muted rounded animate-pulse" />

          {/* Tool grid skeleton */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-[180px]">
                <CardContent className="p-6 space-y-3">
                  <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
