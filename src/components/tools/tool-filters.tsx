'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * Categories for AI tools (from research)
 * Maps display names to slugs for URL params
 */
const CATEGORIES = [
  { name: 'Writing & Content', slug: 'writing' },
  { name: 'Image Generation', slug: 'image-generation' },
  { name: 'Video & Animation', slug: 'video-animation' },
  { name: 'Audio & Music', slug: 'audio-music' },
  { name: 'Coding & Development', slug: 'coding-development' },
  { name: 'Data & Analytics', slug: 'data-analytics' },
  { name: 'Marketing & Sales', slug: 'marketing-sales' },
  { name: 'Productivity', slug: 'productivity' },
  { name: 'Education & Research', slug: 'education-research' },
];

/**
 * Pricing types for filtering
 */
const PRICING_TYPES = ['FREE', 'FREEMIUM', 'SUBSCRIPTION', 'PER_TOKEN'];

/**
 * Helper to get category display name from slug
 */
function getCategoryName(slug: string): string {
  const category = CATEGORIES.find((c) => c.slug === slug);
  return category?.name || slug;
}

interface ToolFiltersProps {
  onClearFilters?: () => void;
}

type FilterType = 'category' | 'pricing';

export function ToolFilters({ onClearFilters }: ToolFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedCategories = searchParams.getAll('category');
  const selectedPricing = searchParams.getAll('pricing');

  const hasFilters =
    selectedCategories.length > 0 || selectedPricing.length > 0;

  const updateFilter = (type: FilterType, value: string) => {
    const params = new URLSearchParams(searchParams);
    const current = type === 'category' ? selectedCategories : selectedPricing;
    const paramName = type;

    if (current.includes(value)) {
      // Remove filter
      const newValues = current.filter((v) => v !== value);
      params.delete(paramName);
      newValues.forEach((v) => params.append(paramName, v));
    } else {
      // Add filter
      params.append(paramName, value);
    }

    // Reset to page 1
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    params.delete('pricing');
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
    onClearFilters?.();
  };

  const activeFilterCount = selectedCategories.length + selectedPricing.length;

  return (
    <div className="space-y-6">
      {/* Header with clear button */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Category filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Category</h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category.slug);
            return (
              <Button
                key={category.slug}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateFilter('category', category.slug)}
              >
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Pricing filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Pricing</h4>
        <div className="flex flex-wrap gap-2">
          {PRICING_TYPES.map((pricing) => {
            const isSelected = selectedPricing.includes(pricing);
            const label = pricing === 'PER_TOKEN' ? 'Pay per token' : pricing;
            return (
              <Button
                key={pricing}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateFilter('pricing', pricing)}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Active filters summary */}
      {hasFilters && (
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-medium">Active filters</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => updateFilter('category', category)}
              >
                {getCategoryName(category)} ×
              </Badge>
            ))}
            {selectedPricing.map((pricing) => (
              <Badge
                key={pricing}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => updateFilter('pricing', pricing)}
              >
                {pricing} ×
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
