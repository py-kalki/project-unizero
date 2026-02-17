import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTools } from '@/lib/services/tool.service';
import { ToolSearch } from '@/components/tools/tool-search';
import { ToolFilters } from '@/components/tools/tool-filters';
import { ToolGrid } from '@/components/tools/tool-grid';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI Tools',
  description:
    'Discover and explore AI tools for productivity, creativity, and more.',
};

/**
 * Search parameters type - Next.js 15 requires Promise
 */
type SearchParams = Promise<{
  q?: string;
  category?: string;
  pricing?: string;
  page?: string;
}>;

interface ToolsPageProps {
  searchParams: SearchParams;
}

/**
 * Tools catalog page with search, filters, and pagination
 */
export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  // Next.js 15: await searchParams
  const params = await searchParams;

  const query = params.q || '';
  const category = params.category || '';
  const pricing = params.pricing || '';
  const page = parseInt(params.page || '1', 10);
  const perPage = 12;

  // Fetch tools with filters
  const { tools, total } = await getTools({
    query,
    category,
    pricing,
    page,
    perPage,
  });

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI Tools</h1>
        <p className="text-muted-foreground">
          Discover and explore {total} AI tools for productivity, creativity,
          and more.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="w-full md:w-64 shrink-0">
          <ToolFilters />
        </div>
        <div className="flex-1 space-y-6">
          <ToolSearch initialValue={query} />

          {/* Results info */}
          {query || category || pricing ? (
            <p className="text-sm text-muted-foreground">
              Showing {tools.length} of {total} tools
              {query && ` matching "${query}"`}
            </p>
          ) : null}

          {/* Tool grid */}
          <Suspense fallback={<ToolGridSkeleton />}>
            <ToolGrid tools={tools} />
          </Suspense>

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationControls currentPage={page} totalPages={totalPages} />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Pagination controls component
 */
function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <a
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-1 rounded border hover:bg-muted"
        >
          Previous
        </a>
      )}

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <a
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-1 rounded border hover:bg-muted"
        >
          Next
        </a>
      )}
    </div>
  );
}

/**
 * Skeleton loader for tool grid during Suspense
 */
function ToolGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="h-[180px] animate-pulse">
          <CardContent className="p-6 space-y-3">
            <div className="h-5 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
