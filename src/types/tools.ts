import type { AITool, Category, PricingType } from '@prisma/client';

// Re-export Prisma types for convenience
export type { AITool, Category, PricingType };

/**
 * Tool with category relation included
 */
export type ToolWithCategory = AITool & {
  category: Category;
};

/**
 * Filter parameters for tool search
 */
export interface ToolFilters {
  query?: string;
  category?: string;
  pricing?: string;
  page?: number;
  perPage?: number;
}

/**
 * Result from getTools query
 */
export interface GetToolsResult {
  tools: ToolWithCategory[];
  total: number;
  page: number;
  perPage: number;
}

/**
 * Pricing type labels for display
 */
export const PRICING_LABELS: Record<string, string> = {
  FREE: 'Free',
  FREEMIUM: 'Freemium',
  SUBSCRIPTION: 'Subscription',
  PER_TOKEN: 'Pay per token',
} as const;

/**
 * Get display label for a pricing type
 */
export function getPricingLabel(pricingType: string): string {
  return PRICING_LABELS[pricingType] || pricingType;
}
