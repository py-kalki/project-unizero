'use client';

import { ToolCard } from './tool-card';
import type { ToolWithCategory } from '@/types/tools';

interface ToolGridProps {
  tools: ToolWithCategory[];
  onClearFilters?: () => void;
}

export function ToolGrid({ tools, onClearFilters }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground">No tools found</p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
