# Phase 3: AI Discovery Core - Research

**Researched:** 2026-02-17
**Domain:** AI Tool Discovery & Catalog Management
**Confidence:** HIGH

## Summary

Phase 3 implements the core discovery features for browsing, searching, and filtering the AI tool catalog. This requires database schema additions for AI tools and categories, server-side filtering/search capabilities, and client-side UI components using URL-based state for shareability.

**Primary recommendation:** Implement URL-driven search/filter with server-side Prisma queries. Use Next.js 15 async `searchParams` pattern with debounced client-side input. Seed 50+ tools across 9 categories.

## User Constraints (from CONTEXT.md)

This section is copied from project context:

### Locked Decisions

- **9 phases** for comprehensive depth
- **Split subscription** into Core + Calculations
- **Split dashboard** into Core + Analytics
- **Discovery before subscription** — users can browse before tracking
- **Use SQLite** for local development
- **Clerk** for authentication
- **Stale data prevention** — timestamp tracking on AI tools (Phase 3)

### Deferred Ideas (OUT OF SCOPE)

- None specified for this phase

---

## Standard Stack

### Core Dependencies (Already Installed)

| Library      | Version | Purpose              | Why Standard                              |
| ------------ | ------- | -------------------- | ----------------------------------------- |
| Next.js      | 15.5.x  | Full-stack framework | App Router, Server Components, API routes |
| React        | 19.x    | UI library           | Required by Next.js 15                    |
| Prisma       | 7.x     | ORM                  | Type-safe database access                 |
| Clerk        | 6.x     | Authentication       | User auth, middleware                     |
| Tailwind CSS | 3.x     | Styling              | Utility-first CSS                         |
| shadcn/ui    | Latest  | Components           | Radix-based accessible components         |

### Additional Packages Needed

| Library      | Version | Purpose        | When to Use                                |
| ------------ | ------- | -------------- | ------------------------------------------ |
| lucide-react | Latest  | Icons          | Already installed - use for category icons |
| date-fns     | Latest  | Date utilities | For timestamp formatting                   |

### Installation

```bash
# No new packages needed - existing stack supports this phase
# Prisma schema update and seed script will be created
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── (main)/                 # Main app routes (authenticated)
│   │   ├── tools/
│   │   │   ├── page.tsx       # Tool catalog (browse/search/filter)
│   │   │   └── [slug]/        # Tool detail page
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   └── api/
│       └── tools/
│           └── route.ts        # Tool API (if needed)
│
├── components/
│   └── tools/
│       ├── tool-card.tsx       # Individual tool display
│       ├── tool-grid.tsx       # Grid of tools
│       ├── tool-filters.tsx   # Category & pricing filters
│       ├── tool-search.tsx     # Search input with debounce
│       └── category-badge.tsx  # Category display
│
├── lib/
│   ├── db/
│   │   ├── client.ts           # Prisma client singleton
│   │   └── schema.prisma       # Database schema
│   └── services/
│       └── tool.service.ts     # Tool business logic
│
├── constants/
│   └── categories.ts           # Category definitions
│
├── types/
│   └── tools.ts                # Tool-related types
│
└── data/
    └── seed-tools.ts           # Seed data script
```

### Pattern 1: URL-Driven Search & Filter

**What:** Search and filter state stored in URL query params
**When to use:** Any search/filter functionality needing shareable URLs
**Why:** SEO-friendly, bookmarkable, browser history works naturally

```typescript
// src/app/(main)/tools/page.tsx
// Next.js 15 - searchParams is a Promise

type SearchParams = Promise<{
  q?: string;
  category?: string;
  pricing?: string;
  page?: string;
}>;

export default async function ToolsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = params.q || '';
  const category = params.category || '';
  const pricing = params.pricing || '';
  const page = parseInt(params.page || '1');
  const perPage = 12;

  const { tools, total } = await toolService.getTools({
    query,
    category,
    pricing,
    page,
    perPage,
  });

  return (
    <div>
      <ToolSearch initialValue={query} />
      <ToolFilters
        activeCategory={category}
        activePricing={pricing}
      />
      <ToolGrid tools={tools} total={total} />
    </div>
  );
}
```

**Client-side search component with debounce:**

```typescript
// src/components/tools/tool-search.tsx
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';

export function ToolSearch({ initialValue }: { initialValue: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    params.set('page', '1'); // Reset to first page on search
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      placeholder="Search AI tools..."
      defaultValue={initialValue}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
```

### Pattern 2: Server-Side Filter Logic

**What:** Filter logic executed in service layer, not client
**When to use:** All data filtering
**Why:** Better performance, SEO, security

```typescript
// src/lib/services/tool.service.ts
import { prisma } from '@/lib/db/client';

export async function getTools({
  query = '',
  category = '',
  pricing = '',
  page = 1,
  perPage = 12,
}: {
  query?: string;
  category?: string;
  pricing?: string;
  page?: number;
  perPage?: number;
}) {
  const where: any = {};

  // Text search on name and description
  if (query) {
    where.OR = [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ];
  }

  // Category filter
  if (category) {
    where.category = { slug: category };
  }

  // Pricing type filter
  if (pricing) {
    where.pricingType = pricing;
  }

  const [tools, total] = await Promise.all([
    prisma.aiTool.findMany({
      where,
      include: { category: true },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { name: 'asc' },
    }),
    prisma.aiTool.count({ where }),
  ]);

  return { tools, total, page, perPage };
}
```

### Pattern 3: Prisma Full-Text Search (Optional Enhancement)

**What:** PostgreSQL full-text search for advanced search
**When to use:** When simple contains search is insufficient
**Note:** Requires Prisma preview feature - start with contains, upgrade later

```prisma
// prisma/schema.prisma - Add to generator
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["fullTextSearchPostgres"] // Optional: for advanced search
}
```

---

## Database Schema

### Prisma Models Required

```prisma
// prisma/schema.prisma additions

// AI Tool Categories
model Category {
  id          String    @id @default(cuid())
  name        String    @unique // "Large Language Models", "Image Generation"
  slug        String    @unique // "llms", "image-generation"
  description String?
  icon        String?   // Lucide icon name
  tools       AITool[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([slug])
}

// AI Tools Catalog
model AITool {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique
  description   String?   @db.Text
  websiteUrl    String
  logoUrl       String?
  categoryId    String
  category      Category  @relation(fields: [categoryId], references: [id])

  // Pricing
  pricingType   PricingType @default(FREEMIUM) // FREE, FREEMIUM, SUBSCRIPTION, PER_TOKEN
  monthlyPrice  Decimal?   @db.Decimal(10, 2)  // Null if free
  yearlyPrice   Decimal?   @db.Decimal(10, 2)
  pricingNote   String?    // "Starts at $20/mo", "Pay per token"

  // Features
  features      Json      @default("[]") // Array of feature strings
  isPopular     Boolean   @default(false)

  // Timestamps for stale data tracking
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastVerifiedAt DateTime? // When pricing/features were last verified

  // Relations
  subscriptions Subscription[]
  favorites    Favorite[]

  @@index([categoryId])
  @@index([pricingType])
  @@index([name])
}

enum PricingType {
  FREE
  FREEMIUM
  SUBSCRIPTION
  PER_TOKEN
}

// Add to existing Subscription model
model Subscription {
  // ... existing fields
  toolId     String
  tool       AITool @relation(fields: [toolId], references: [id])
}

// Add to existing User model
model User {
  // ... existing fields
  favorites  Favorite[]
}

// User Favorites
model Favorite {
  id        String   @id @default(cuid())
  userId    String
  toolId    String
  user      User     @relation(fields: [userId], references: [id])
  tool      AITool   @relation(fields: [toolId], references: [id])
  createdAt DateTime @default(now())

  @@unique([userId, toolId])
  @@index([userId])
  @@index([toolId])
}
```

---

## Don't Hand-Roll

| Problem        | Don't Build          | Use Instead                                  | Why                                      |
| -------------- | -------------------- | -------------------------------------------- | ---------------------------------------- |
| Text search    | Custom search engine | Prisma `contains` with `mode: 'insensitive'` | Simple, works well for 50-500 tools      |
| URL state      | Client-only state    | URL query params                             | Shareable, bookmarkable, browser history |
| Debouncing     | Custom debounce hook | `use-debounced-callback` package             | Battle-tested, handles edge cases        |
| Category icons | Custom icon system   | Lucide React (already installed)             | Consistent, accessible                   |
| Pagination     | Custom pagination    | URL params + Prisma skip/take                | Standard pattern                         |

---

## Common Pitfalls

### Pitfall 1: Forgetting Next.js 15 searchParams is Async

**What goes wrong:** `searchParams.q` returns undefined, page crashes
**Why it happens:** Next.js 15 changed `searchParams` from object to Promise
**How to avoid:** Always `await searchParams` in server components
**Warning signs:** TypeScript errors about Promise, runtime undefined values

```typescript
// ❌ WRONG - Next.js 15
export default function Page({ searchParams }: { searchParams: any }) {
  const q = searchParams.q; // undefined!
}

// ✅ CORRECT - Next.js 15
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;
  const q = params.q; // works
}
```

### Pitfall 2: Client-Side Filter Without URL Sync

**What goes wrong:** Filter state lost on refresh, can't share URLs
**Why it happens:** Using React state instead of URL params
**How to avoid:** Always sync filters to URL, read initial state from URL
**Warning signs:** "Back button doesn't work", "Can't share filtered view"

### Pitfall 3: Not Handling Empty States

**What goes wrong:** Blank page when no tools match filter
**Why it happens:** No "no results" UI
**How to avoid:** Add empty state with clear call-to-action

```typescript
// src/components/tools/tool-grid.tsx
if (tools.length === 0) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">No tools found</p>
      <Button variant="link" onClick={() => clearFilters()}>
        Clear filters
      </Button>
    </div>
  );
}
```

### Pitfall 4: Missing Indexes on Filtered Columns

**What goes wrong:** Slow queries as data grows
**Why it happens:** No database indexes on categoryId, pricingType
**How to avoid:** Add `@@index` on frequently filtered columns (already in schema)

### Pitfall 5: Stale Data Without Verification Tracking

**What goes wrong:** Tool pricing/features become outdated
**Why it happens:** No tracking of when data was last verified
**How to avoid:** Add `lastVerifiedAt` timestamp, implement verification workflow (Phase 9)

---

## Code Examples

### Tool Card Component

```typescript
// src/components/tools/tool-card.tsx
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    logoUrl: string | null;
    pricingType: string;
    monthlyPrice: number | null;
    category: { name: string; slug: string };
  };
}

export function ToolCard({ tool }: ToolCardProps) {
  const pricingLabel = getPricingLabel(tool.pricingType, tool.monthlyPrice);

  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center gap-4">
          {tool.logoUrl && (
            <img src={tool.logoUrl} alt={tool.name} className="w-10 h-10 rounded-lg" />
          )}
          <div>
            <CardTitle>{tool.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {tool.category.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2">
            {tool.description}
          </CardDescription>
          <p className="text-sm font-medium mt-2">{pricingLabel}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function getPricingLabel(pricingType: string, monthlyPrice: number | null): string {
  switch (pricingType) {
    case 'FREE':
      return 'Free';
    case 'FREEMIUM':
      return 'Freemium';
    case 'SUBSCRIPTION':
      return monthlyPrice ? `$${monthlyPrice}/mo` : 'Paid';
    case 'PER_TOKEN':
      return 'Pay per token';
    default:
      return pricingType;
  }
}
```

### Filter Sidebar Component

```typescript
// src/components/tools/tool-filters.tsx
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categories = [
  { slug: 'llms', name: 'Large Language Models' },
  { slug: 'image-generation', name: 'Image Generation' },
  { slug: 'video-generation', name: 'Video Generation' },
  { slug: 'audio-music', name: 'Audio & Music' },
  { slug: 'coding', name: 'Coding & Developer' },
  { slug: 'productivity', name: 'Productivity' },
  { slug: 'writing', name: 'Writing & Content' },
  { slug: 'research', name: 'Research' },
  { slug: 'marketing', name: 'Marketing' },
];

const pricingTypes = [
  { value: 'FREE', label: 'Free' },
  { value: 'FREEMIUM', label: 'Freemium' },
  { value: 'SUBSCRIPTION', label: 'Subscription' },
  { value: 'PER_TOKEN', label: 'Per Token' },
];

export function ToolFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeCategory = searchParams.get('category') || '';
  const activePricing = searchParams.get('pricing') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  const hasFilters = activeCategory || activePricing;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-medium mb-2">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              variant={activeCategory === cat.slug ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('category', activeCategory === cat.slug ? '' : cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Pricing Filter */}
      <div>
        <h4 className="text-sm font-medium mb-2">Pricing</h4>
        <div className="flex flex-wrap gap-2">
          {pricingTypes.map((price) => (
            <Button
              key={price.value}
              variant={activePricing === price.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateFilter('pricing', activePricing === price.value ? '' : price.value)}
            >
              {price.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Seed Data Script

```typescript
// prisma/seed.ts
import { PrismaClient, PricingType } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Large Language Models',
    slug: 'llms',
    icon: 'Brain',
    description: 'AI chatbots and text generation',
  },
  {
    name: 'Image Generation',
    slug: 'image-generation',
    icon: 'Image',
    description: 'AI-powered image creation',
  },
  {
    name: 'Video Generation',
    slug: 'video-generation',
    icon: 'Video',
    description: 'AI video creation and editing',
  },
  {
    name: 'Audio & Music',
    slug: 'audio-music',
    icon: 'Music',
    description: 'Voice synthesis and music AI',
  },
  {
    name: 'Coding & Developer',
    slug: 'coding',
    icon: 'Code',
    description: 'AI coding assistants',
  },
  {
    name: 'Productivity',
    slug: 'productivity',
    icon: 'Zap',
    description: 'AI productivity tools',
  },
  {
    name: 'Writing & Content',
    slug: 'writing',
    icon: 'FileText',
    description: 'AI writing assistants',
  },
  {
    name: 'Research',
    slug: 'research',
    icon: 'BookOpen',
    description: 'Research and analysis AI',
  },
  {
    name: 'Marketing',
    slug: 'marketing',
    icon: 'Megaphone',
    description: 'Marketing and SEO AI',
  },
];

const tools = [
  // LLMs
  {
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: "OpenAI's conversational AI assistant.",
    websiteUrl: 'https://chatgpt.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: 20,
    categorySlug: 'llms',
    isPopular: true,
  },
  {
    name: 'Claude',
    slug: 'claude',
    description: "Anthropic's AI assistant focused on helpfulness.",
    websiteUrl: 'https://claude.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: 25,
    categorySlug: 'llms',
    isPopular: true,
  },
  {
    name: 'Gemini',
    slug: 'gemini',
    description: "Google's multimodal AI assistant.",
    websiteUrl: 'https://gemini.google.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'llms',
  },
  {
    name: 'Perplexity',
    slug: 'perplexity',
    description: 'AI-powered search engine with citations.',
    websiteUrl: 'https://perplexity.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: 20,
    categorySlug: 'llms',
    isPopular: true,
  },
  {
    name: 'Mistral',
    slug: 'mistral',
    description: 'Open-source AI assistant from Mistral AI.',
    websiteUrl: 'https://mistral.ai',
    pricingType: 'FREE',
    monthlyPrice: null,
    categorySlug: 'llms',
  },
  {
    name: 'Llama',
    slug: 'llama',
    description: "Meta's open-source large language model.",
    websiteUrl: 'https://llama.ai',
    pricingType: 'FREE',
    monthlyPrice: null,
    categorySlug: 'llms',
  },

  // Image Generation
  {
    name: 'Midjourney',
    slug: 'midjourney',
    description: 'AI image generation from text descriptions.',
    websiteUrl: 'https://midjourney.com',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: 10,
    categorySlug: 'image-generation',
    isPopular: true,
  },
  {
    name: 'DALL-E',
    slug: 'dall-e',
    description: "OpenAI's image generation model.",
    websiteUrl: 'https://openai.com/dall-e-3',
    pricingType: 'PER_TOKEN',
    monthlyPrice: null,
    categorySlug: 'image-generation',
  },
  {
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description: 'Open-source image generation model.',
    websiteUrl: 'https://stability.ai',
    pricingType: 'FREE',
    monthlyPrice: null,
    categorySlug: 'image-generation',
    isPopular: true,
  },
  {
    name: 'Leonardo',
    slug: 'leonardo',
    description: 'AI-powered image creation platform.',
    websiteUrl: 'https://leonardo.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: 12,
    categorySlug: 'image-generation',
  },
  {
    name: 'Adobe Firefly',
    slug: 'adobe-firefly',
    description: "Adobe's generative AI for images.",
    websiteUrl: 'https://firefly.adobe.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'image-generation',
  },

  // Coding
  {
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: 'AI pair programmer by GitHub and OpenAI.',
    websiteUrl: 'https://github.com/features/copilot',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: 10,
    categorySlug: 'coding',
    isPopular: true,
  },
  {
    name: 'Cursor',
    slug: 'cursor',
    description: 'AI-first code editor built on VS Code.',
    websiteUrl: 'https://cursor.sh',
    pricingType: 'FREEMIUM',
    monthlyPrice: 20,
    categorySlug: 'coding',
    isPopular: true,
  },
  {
    name: 'Windsurf',
    slug: 'windsurf',
    description: 'AI-powered IDE from Codeium.',
    websiteUrl: 'https://windsurf.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'coding',
  },
  {
    name: 'Tabnine',
    slug: 'tabnine',
    description: 'AI code completion tool.',
    websiteUrl: 'https://tabnine.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: 12,
    categorySlug: 'coding',
  },
  {
    name: 'Amazon CodeWhisperer',
    slug: 'amazon-codewhisperer',
    description: "AWS's AI coding companion.",
    websiteUrl: 'https://aws.amazon.com/codewhisperer',
    pricingType: 'FREE',
    monthlyPrice: null,
    categorySlug: 'coding',
  },
  {
    name: 'Replit AI',
    slug: 'replit-ai',
    description: 'AI assistant for Replit platform.',
    websiteUrl: 'https://replit.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: 7,
    categorySlug: 'coding',
  },

  // Video Generation
  {
    name: 'Runway',
    slug: 'runway',
    description: 'AI video generation and editing platform.',
    websiteUrl: 'https://runway.ml',
    pricingType: 'FREEMIUM',
    monthlyPrice: 15,
    categorySlug: 'video-generation',
    isPopular: true,
  },
  {
    name: 'Pika',
    slug: 'pika',
    description: 'AI video generation from text and images.',
    websiteUrl: 'https://pika.art',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'video-generation',
  },
  {
    name: 'Sora',
    slug: 'sora',
    description: "OpenAI's text-to-video model.",
    websiteUrl: 'https://openai.com/sora',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: null,
    categorySlug: 'video-generation',
  },
  {
    name: 'Luma Dream Machine',
    slug: 'luma-dream-machine',
    description: 'AI video generation from images.',
    websiteUrl: 'https://lumalabs.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'video-generation',
  },

  // Audio & Music
  {
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    description: 'AI voice synthesis and cloning.',
    websiteUrl: 'https://elevenlabs.io',
    pricingType: 'FREEMIUM',
    monthlyPrice: 5,
    categorySlug: 'audio-music',
    isPopular: true,
  },
  {
    name: 'Murf AI',
    slug: 'murf-ai',
    description: 'AI voice generator for professionals.',
    websiteUrl: 'https://murf.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: 29,
    categorySlug: 'audio-music',
  },
  {
    name: 'Descript',
    slug: 'descript',
    description: 'Audio/video editor with AI transcription.',
    websiteUrl: 'https://descript.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: 12,
    categorySlug: 'audio-music',
  },
  {
    name: 'Suno',
    slug: 'suno',
    description: 'AI music generation from text prompts.',
    websiteUrl: 'https://suno.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: 10,
    categorySlug: 'audio-music',
    isPopular: true,
  },
  {
    name: 'udio',
    slug: 'udio',
    description: 'AI music creation platform.',
    websiteUrl: 'https://udio.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'audio-music',
  },

  // Productivity
  {
    name: 'Notion AI',
    slug: 'notion-ai',
    description: 'AI assistant integrated into Notion.',
    websiteUrl: 'https://notion.so',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: 10,
    categorySlug: 'productivity',
    isPopular: true,
  },
  {
    name: 'Raycast AI',
    slug: 'raycast-ai',
    description: 'AI assistant for macOS.',
    websiteUrl: 'https://raycast.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: 10,
    categorySlug: 'productivity',
  },
  {
    name: 'Arc Browser',
    slug: 'arc-browser',
    description: 'Browser with AI features from The Browser Company.',
    websiteUrl: 'https://arc.net',
    pricingType: 'FREE',
    monthlyPrice: null,
    categorySlug: 'productivity',
  },
  {
    name: 'Gamma',
    slug: 'gamma',
    description: 'AI-powered presentation maker.',
    websiteUrl: 'https://gamma.app',
    pricingType: 'FREEMIUM',
    monthlyPrice: 10,
    categorySlug: 'productivity',
    isPopular: true,
  },
  {
    name: 'Napkin',
    slug: 'napkin',
    description: 'AI visual content generator.',
    websiteUrl: 'https://napkin.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'productivity',
  },
  {
    name: 'Otter.ai',
    slug: 'otter-ai',
    description: 'AI meeting notes and transcription.',
    websiteUrl: 'https://otter.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: 10,
    categorySlug: 'productivity',
  },

  // Writing
  {
    name: 'Jasper',
    slug: 'jasper',
    description: 'AI writing assistant for marketing.',
    websiteUrl: 'https://jasper.ai',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: 49,
    categorySlug: 'writing',
  },
  {
    name: 'Copy.ai',
    slug: 'copy-ai',
    description: 'AI copywriting tool.',
    websiteUrl: 'https://copy.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: 36,
    categorySlug: 'writing',
  },
  {
    name: 'Writesonic',
    slug: 'writesonic',
    description: 'AI content writing platform.',
    websiteUrl: 'https://writesonic.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: 12,
    categorySlug: 'writing',
  },
  {
    name: 'Grammarly',
    slug: 'grammarly',
    description: 'AI writing enhancement and grammar checker.',
    websiteUrl: 'https://grammarly.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: 12,
    categorySlug: 'writing',
    isPopular: true,
  },

  // Research
  {
    name: 'Elicit',
    slug: 'elicit',
    description: 'AI research assistant for literature review.',
    websiteUrl: 'https://elicit.org',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'research',
    isPopular: true,
  },
  {
    name: 'Consensus',
    slug: 'consensus',
    description: 'AI search engine for scientific papers.',
    websiteUrl: 'https://consensus.app',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'research',
  },
  {
    name: 'Perplexity Pro',
    slug: 'perplexity-pro',
    description: 'Advanced research search with pro features.',
    websiteUrl: 'https://perplexity.ai',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: 20,
    categorySlug: 'research',
  },
  {
    name: 'SciSpace',
    slug: 'scispace',
    description: 'AI research platform for papers.',
    websiteUrl: 'https://scispace.com',
    pricingType: 'FREEMIUM',
    monthlyPrice: null,
    categorySlug: 'research',
  },
  {
    name: 'ResearchRabbit',
    slug: 'research-rabbit',
    description: 'AI-powered research assistant.',
    websiteUrl: 'https://researchrabbit.com',
    pricingType: 'FREE',
    monthlyPrice: null,
    categorySlug: 'research',
  },

  // Marketing
  {
    name: 'HubSpot AI',
    slug: 'hubspot-ai',
    description: 'AI tools integrated into HubSpot CRM.',
    websiteUrl: 'https://hubspot.com',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: 15,
    categorySlug: 'marketing',
  },
  {
    name: 'Jasper Marketing',
    slug: 'jasper-marketing',
    description: 'AI marketing content generation.',
    websiteUrl: 'https://jasper.ai',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: 199,
    categorySlug: 'marketing',
  },
  {
    name: 'Surfer SEO',
    slug: 'surfer-seo',
    description: 'AI-powered SEO content optimization.',
    websiteUrl: 'https://surferseo.com',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: 49,
    categorySlug: 'marketing',
  },
  {
    name: 'Copy.ai',
    slug: 'copy-ai-marketing',
    description: 'AI marketing copy generator.',
    websiteUrl: 'https://copy.ai',
    pricingType: 'FREEMIUM',
    monthlyPrice: 36,
    categorySlug: 'marketing',
  },
  {
    name: 'MarketMuse',
    slug: 'marketmuse',
    description: 'AI content planning and optimization.',
    websiteUrl: 'https://marketmuse.com',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: 150,
    categorySlug: 'marketing',
  },
  {
    name: 'Phrasee',
    slug: 'phrasee',
    description: 'AI for marketing copy optimization.',
    websiteUrl: 'https://phrasee.co',
    pricingType: 'SUBSCRIPTION',
    monthlyPrice: null,
    categorySlug: 'marketing',
  },
];

async function main() {
  console.log('Seeding database...');

  // Create categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Created categories');

  // Create tools
  for (const tool of tools) {
    const category = categories.find((c) => c.slug === tool.categorySlug);
    const categoryRecord = await prisma.category.findUnique({
      where: { slug: category!.slug },
    });

    if (categoryRecord) {
      await prisma.aITool.upsert({
        where: { slug: tool.slug },
        update: {},
        create: {
          name: tool.name,
          slug: tool.slug,
          description: tool.description,
          websiteUrl: tool.websiteUrl,
          pricingType: tool.pricingType as PricingType,
          monthlyPrice: tool.monthlyPrice,
          yearlyPrice: tool.monthlyPrice ? tool.monthlyPrice * 10 : null,
          categoryId: categoryRecord.id,
          isPopular: tool.isPopular || false,
        },
      });
    }
  }
  console.log(`Created ${tools.length} tools`);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## State of the Art

| Old Approach             | Current Approach                       | When Changed          | Impact                          |
| ------------------------ | -------------------------------------- | --------------------- | ------------------------------- |
| Client-side filter state | URL-driven state with server filtering | Next.js App Router    | Shareable URLs, better SEO      |
| Synchronous searchParams | Async searchParams (Promise)           | Next.js 15 (Oct 2024) | Must await in server components |
| Local state for filters  | URL query params                       | Modern SPA patterns   | Browser history support         |
| Simple LIKE queries      | Full-text search (optional)            | Prisma 5+             | Better search relevance         |

---

## Open Questions

1. **Should search be fuzzy/typo-tolerant?**
   - What we know: Prisma `contains` is exact-match (case-insensitive)
   - What's unclear: How important is typo-tolerance for 50 tools?
   - Recommendation: Start with `contains`, add fuzzy search later if needed

2. **Pagination or infinite scroll?**
   - What we know: URL params work well with pagination
   - What's unclear: User preference for 50+ tools
   - Recommendation: Start with numbered pagination (12 per page)

3. **Logo handling for tools?**
   - What we know: Most tools have logo at `tool.com/favicon.ico` or logo
   - What's unclear: Should we fetch automatically or use placeholders?
   - Recommendation: Use tool website favicon as default, manual upload for polish

---

## Sources

### Primary (HIGH confidence)

- **Next.js 15 Search & Pagination:** https://nextjs.org/learn/dashboard-app/adding-search-and-pagination — Official docs, covers searchParams as Promise
- **Prisma Full-Text Search:** https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search — Official docs for PostgreSQL FTS
- **Prisma Filtering:** https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting — Official filtering docs
- **shadcn/ui Components:** https://ui.shadcn.com/ — Official component library

### Secondary (MEDIUM confidence)

- **Next.js Search Best Practices:** https://nextjsstarter.com/blog/nextjs-search-filters-7-uiux-best-practices/ — Industry best practices
- **Tailwind Category Filters:** https://tailwindcss.com/plus/ui-blocks/ecommerce/components/category-filters — Official UI patterns

### Tertiary (LOW confidence)

- **AI Tools Categories:** https://www.v7labs.com/blog/best-ai-tools-listed — Industry resource for category definitions

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Existing project stack well-established
- Architecture: HIGH - URL-driven patterns well-documented in Next.js 15
- Database schema: HIGH - Standard Prisma patterns, verified in docs
- Pitfalls: HIGH - Next.js 15 searchParams change well-documented
- Seed data: MEDIUM - Based on web research, may need curation

**Research date:** 2026-02-17
**Valid until:** 2026-03-17 (30 days - stable phase)
