import { prisma } from '@/lib/db';
import type {
  ToolWithCategory,
  ToolFilters,
  GetToolsResult,
  PricingType,
} from '@/types/tools';

/**
 * Get paginated, filtered AI tools
 */
export async function getTools({
  query = '',
  category = '',
  pricing = '',
  page = 1,
  perPage = 12,
}: ToolFilters): Promise<GetToolsResult> {
  // Build Prisma where clause
  const where: {
    OR?: Array<{
      name?: { contains: string; mode: 'insensitive' };
      description?: { contains: string; mode: 'insensitive' };
    }>;
    category?: { slug: string };
    pricingType?: PricingType;
  } = {};

  // Text search on name and description
  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ];
  }

  // Category filter by slug
  if (category) {
    where.category = { slug: category };
  }

  // Pricing type filter
  if (pricing) {
    where.pricingType = pricing as PricingType;
  }

  // Execute findMany and count in parallel
  const [tools, total] = await Promise.all([
    prisma.aITool.findMany({
      where,
      include: {
        category: true,
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.aITool.count({ where }),
  ]);

  return {
    tools: tools as ToolWithCategory[],
    total,
    page,
    perPage,
  };
}

/**
 * Get a single tool by slug with category relation
 */
export async function getToolBySlug(
  slug: string
): Promise<ToolWithCategory | null> {
  const tool = await prisma.aITool.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  return tool as ToolWithCategory | null;
}
