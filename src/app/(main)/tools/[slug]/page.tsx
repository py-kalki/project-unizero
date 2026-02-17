import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Prisma } from '@prisma/client';
import { getToolBySlug } from '@/lib/services/tool.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

/**
 * Generate metadata for tool detail page
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: tool.name,
    description: tool.description || `Learn more about ${tool.name}`,
  };
}

/**
 * Tool detail page props - Next.js 15 params is a Promise
 */
interface ToolDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Get pricing display label
 */
function getPricingDisplay(pricingType: string): string {
  const labels: Record<string, string> = {
    FREE: 'Free',
    FREEMIUM: 'Freemium',
    SUBSCRIPTION: 'Subscription',
    PER_TOKEN: 'Pay per token',
  };
  return labels[pricingType] || pricingType;
}

/**
 * Format price for display
 */
function formatPrice(price: number | null): string {
  if (price === null) return 'N/A';
  return `$${price}/mo`;
}

/**
 * Tool detail page - shows full information about a specific tool
 */
export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  // Handle tool not found
  if (!tool) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Back navigation */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tools
      </Link>

      {/* Tool header */}
      <div className="space-y-4 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            {tool.category && (
              <Badge variant="secondary" className="mt-2">
                {tool.category.name}
              </Badge>
            )}
          </div>
          <Button asChild>
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Visit Website
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Description */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {tool.description || 'No description available.'}
            </p>

            {/* Features */}
            {tool.features &&
              Array.isArray(tool.features) &&
              tool.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Features</h3>
                  <ul className="space-y-2">
                    {(tool.features as string[]).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-1 text-green-500 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing card */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Type</span>
                <Badge variant="outline">
                  {getPricingDisplay(tool.pricingType)}
                </Badge>
              </div>

              {tool.pricingType === 'SUBSCRIPTION' && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monthly</span>
                    <span className="font-semibold">
                      {formatPrice(Number(tool.monthlyPrice))}
                    </span>
                  </div>
                  {tool.yearlyPrice && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Yearly</span>
                      <span className="font-semibold">
                        {formatPrice(Number(tool.yearlyPrice))}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {tool.pricingNote && (
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    {tool.pricingNote}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verification info */}
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Last verified:{' '}
                  {tool.lastVerifiedAt
                    ? new Date(tool.lastVerifiedAt).toLocaleDateString()
                    : 'Never'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
