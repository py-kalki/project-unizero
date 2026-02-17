'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ToolWithCategory } from '@/types/tools';

/**
 * Pricing type labels for display
 */
const PRICING_LABELS: Record<string, string> = {
  FREE: 'Free',
  FREEMIUM: 'Freemium',
  SUBSCRIPTION: 'Subscription',
  PER_TOKEN: 'Pay per token',
};

/**
 * Get display label for a pricing type
 */
function getPricingDisplay(pricingType: string | null): string {
  if (!pricingType) return 'Unknown';
  return PRICING_LABELS[pricingType] || pricingType;
}

interface ToolCardProps {
  tool: ToolWithCategory;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-1">{tool.name}</CardTitle>
            {tool.category && (
              <Badge variant="secondary" className="shrink-0">
                {tool.category.name}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {tool.description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Badge variant="outline">{getPricingDisplay(tool.pricingType)}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
