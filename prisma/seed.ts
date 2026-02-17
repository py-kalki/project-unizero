import { PrismaClient, PricingType } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    name: 'Large Language Models',
    slug: 'llms',
    icon: 'Brain',
    description: 'Conversational AI assistants',
  },
  {
    name: 'Image Generation',
    slug: 'image-generation',
    icon: 'Image',
    description: 'AI image creation tools',
  },
  {
    name: 'Video Generation',
    slug: 'video-generation',
    icon: 'Video',
    description: 'AI video creation tools',
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
  // LLMs (6)
  {
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: "OpenAI's conversational AI assistant.",
    websiteUrl: 'https://chatgpt.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 20,
    categorySlug: 'llms',
    isPopular: true,
  },
  {
    name: 'Claude',
    slug: 'claude',
    description: "Anthropic's AI assistant focused on helpfulness.",
    websiteUrl: 'https://claude.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 25,
    categorySlug: 'llms',
    isPopular: true,
  },
  {
    name: 'Gemini',
    slug: 'gemini',
    description: "Google's multimodal AI assistant.",
    websiteUrl: 'https://gemini.google.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'llms',
  },
  {
    name: 'Perplexity',
    slug: 'perplexity',
    description: 'AI-powered search engine with citations.',
    websiteUrl: 'https://perplexity.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 20,
    categorySlug: 'llms',
    isPopular: true,
  },
  {
    name: 'Mistral',
    slug: 'mistral',
    description: 'Open-source AI assistant from Mistral AI.',
    websiteUrl: 'https://mistral.ai',
    pricingType: 'FREE' as PricingType,
    monthlyPrice: null,
    categorySlug: 'llms',
  },
  {
    name: 'Llama',
    slug: 'llama',
    description: "Meta's open-source large language model.",
    websiteUrl: 'https://llama.ai',
    pricingType: 'FREE' as PricingType,
    monthlyPrice: null,
    categorySlug: 'llms',
  },

  // Image Generation (5)
  {
    name: 'Midjourney',
    slug: 'midjourney',
    description: 'AI image generation from text descriptions.',
    websiteUrl: 'https://midjourney.com',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: 10,
    categorySlug: 'image-generation',
    isPopular: true,
  },
  {
    name: 'DALL-E',
    slug: 'dall-e',
    description: "OpenAI's image generation model.",
    websiteUrl: 'https://openai.com/dall-e-3',
    pricingType: 'PER_TOKEN' as PricingType,
    monthlyPrice: null,
    categorySlug: 'image-generation',
  },
  {
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description: 'Open-source image generation model.',
    websiteUrl: 'https://stability.ai',
    pricingType: 'FREE' as PricingType,
    monthlyPrice: null,
    categorySlug: 'image-generation',
    isPopular: true,
  },
  {
    name: 'Leonardo',
    slug: 'leonardo',
    description: 'AI-powered image creation platform.',
    websiteUrl: 'https://leonardo.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 12,
    categorySlug: 'image-generation',
  },
  {
    name: 'Adobe Firefly',
    slug: 'adobe-firefly',
    description: "Adobe's generative AI for images.",
    websiteUrl: 'https://firefly.adobe.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'image-generation',
  },

  // Coding (6)
  {
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: 'AI pair programmer by GitHub and OpenAI.',
    websiteUrl: 'https://github.com/features/copilot',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: 10,
    categorySlug: 'coding',
    isPopular: true,
  },
  {
    name: 'Cursor',
    slug: 'cursor',
    description: 'AI-first code editor built on VS Code.',
    websiteUrl: 'https://cursor.sh',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 20,
    categorySlug: 'coding',
    isPopular: true,
  },
  {
    name: 'Windsurf',
    slug: 'windsurf',
    description: 'AI-powered IDE from Codeium.',
    websiteUrl: 'https://windsurf.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'coding',
  },
  {
    name: 'Tabnine',
    slug: 'tabnine',
    description: 'AI code completion tool.',
    websiteUrl: 'https://tabnine.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 12,
    categorySlug: 'coding',
  },
  {
    name: 'Amazon CodeWhisperer',
    slug: 'amazon-codewhisperer',
    description: "AWS's AI coding companion.",
    websiteUrl: 'https://aws.amazon.com/codewhisperer',
    pricingType: 'FREE' as PricingType,
    monthlyPrice: null,
    categorySlug: 'coding',
  },
  {
    name: 'Replit AI',
    slug: 'replit-ai',
    description: 'AI assistant for Replit platform.',
    websiteUrl: 'https://replit.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 7,
    categorySlug: 'coding',
  },

  // Video Generation (4)
  {
    name: 'Runway',
    slug: 'runway',
    description: 'AI video generation and editing platform.',
    websiteUrl: 'https://runway.ml',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 15,
    categorySlug: 'video-generation',
    isPopular: true,
  },
  {
    name: 'Pika',
    slug: 'pika',
    description: 'AI video generation from text and images.',
    websiteUrl: 'https://pika.art',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'video-generation',
  },
  {
    name: 'Sora',
    slug: 'sora',
    description: "OpenAI's text-to-video model.",
    websiteUrl: 'https://openai.com/sora',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: null,
    categorySlug: 'video-generation',
  },
  {
    name: 'Luma Dream Machine',
    slug: 'luma-dream-machine',
    description: 'AI video generation from images.',
    websiteUrl: 'https://lumalabs.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'video-generation',
  },

  // Audio & Music (5)
  {
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    description: 'AI voice synthesis and cloning.',
    websiteUrl: 'https://elevenlabs.io',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 5,
    categorySlug: 'audio-music',
    isPopular: true,
  },
  {
    name: 'Murf AI',
    slug: 'murf-ai',
    description: 'AI voice generator for professionals.',
    websiteUrl: 'https://murf.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 29,
    categorySlug: 'audio-music',
  },
  {
    name: 'Descript',
    slug: 'descript',
    description: 'Audio/video editor with AI transcription.',
    websiteUrl: 'https://descript.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 12,
    categorySlug: 'audio-music',
  },
  {
    name: 'Suno',
    slug: 'suno',
    description: 'AI music generation from text prompts.',
    websiteUrl: 'https://suno.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 10,
    categorySlug: 'audio-music',
    isPopular: true,
  },
  {
    name: 'Udio',
    slug: 'udio',
    description: 'AI music creation platform.',
    websiteUrl: 'https://udio.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'audio-music',
  },

  // Productivity (6)
  {
    name: 'Notion AI',
    slug: 'notion-ai',
    description: 'AI assistant integrated into Notion.',
    websiteUrl: 'https://notion.so',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: 10,
    categorySlug: 'productivity',
    isPopular: true,
  },
  {
    name: 'Raycast AI',
    slug: 'raycast-ai',
    description: 'AI assistant for macOS.',
    websiteUrl: 'https://raycast.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 10,
    categorySlug: 'productivity',
  },
  {
    name: 'Arc Browser',
    slug: 'arc-browser',
    description: 'Browser with AI features from The Browser Company.',
    websiteUrl: 'https://arc.net',
    pricingType: 'FREE' as PricingType,
    monthlyPrice: null,
    categorySlug: 'productivity',
  },
  {
    name: 'Gamma',
    slug: 'gamma',
    description: 'AI-powered presentation maker.',
    websiteUrl: 'https://gamma.app',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 10,
    categorySlug: 'productivity',
    isPopular: true,
  },
  {
    name: 'Napkin',
    slug: 'napkin',
    description: 'AI visual content generator.',
    websiteUrl: 'https://napkin.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'productivity',
  },
  {
    name: 'Otter.ai',
    slug: 'otter-ai',
    description: 'AI meeting notes and transcription.',
    websiteUrl: 'https://otter.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 10,
    categorySlug: 'productivity',
  },

  // Writing (4)
  {
    name: 'Jasper',
    slug: 'jasper',
    description: 'AI writing assistant for marketing.',
    websiteUrl: 'https://jasper.ai',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: 49,
    categorySlug: 'writing',
  },
  {
    name: 'Copy.ai',
    slug: 'copy-ai',
    description: 'AI copywriting tool.',
    websiteUrl: 'https://copy.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 36,
    categorySlug: 'writing',
  },
  {
    name: 'Writesonic',
    slug: 'writesonic',
    description: 'AI content writing platform.',
    websiteUrl: 'https://writesonic.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 12,
    categorySlug: 'writing',
  },
  {
    name: 'Grammarly',
    slug: 'grammarly',
    description: 'AI writing enhancement and grammar checker.',
    websiteUrl: 'https://grammarly.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 12,
    categorySlug: 'writing',
    isPopular: true,
  },

  // Research (5)
  {
    name: 'Elicit',
    slug: 'elicit',
    description: 'AI research assistant for literature review.',
    websiteUrl: 'https://elicit.org',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'research',
    isPopular: true,
  },
  {
    name: 'Consensus',
    slug: 'consensus',
    description: 'AI search engine for scientific papers.',
    websiteUrl: 'https://consensus.app',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'research',
  },
  {
    name: 'Perplexity Pro',
    slug: 'perplexity-pro',
    description: 'Advanced research search with pro features.',
    websiteUrl: 'https://perplexity.ai',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: 20,
    categorySlug: 'research',
  },
  {
    name: 'SciSpace',
    slug: 'scispace',
    description: 'AI research platform for papers.',
    websiteUrl: 'https://scispace.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'research',
  },
  {
    name: 'ResearchRabbit',
    slug: 'research-rabbit',
    description: 'AI-powered research assistant.',
    websiteUrl: 'https://researchrabbit.com',
    pricingType: 'FREE' as PricingType,
    monthlyPrice: null,
    categorySlug: 'research',
  },

  // Marketing (6)
  {
    name: 'HubSpot AI',
    slug: 'hubspot-ai',
    description: 'AI tools integrated into HubSpot CRM.',
    websiteUrl: 'https://hubspot.com',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: 15,
    categorySlug: 'marketing',
  },
  {
    name: 'Jasper Marketing',
    slug: 'jasper-marketing',
    description: 'AI marketing content generation.',
    websiteUrl: 'https://jasper.ai',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: 199,
    categorySlug: 'marketing',
  },
  {
    name: 'Surfer SEO',
    slug: 'surfer-seo',
    description: 'AI-powered SEO content optimization.',
    websiteUrl: 'https://surferseo.com',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: 49,
    categorySlug: 'marketing',
  },
  {
    name: 'Copy.ai Marketing',
    slug: 'copy-ai-marketing',
    description: 'AI marketing copy generator.',
    websiteUrl: 'https://copy.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 36,
    categorySlug: 'marketing',
  },
  {
    name: 'MarketMuse',
    slug: 'marketmuse',
    description: 'AI content planning and optimization.',
    websiteUrl: 'https://marketmuse.com',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: 150,
    categorySlug: 'marketing',
  },
  {
    name: 'Phrasee',
    slug: 'phrasee',
    description: 'AI for marketing copy optimization.',
    websiteUrl: 'https://phrasee.co',
    pricingType: 'SUBSCRIPTION' as PricingType,
    monthlyPrice: null,
    categorySlug: 'marketing',
  },
  // Additional tools to reach 50+
  {
    name: 'Grok',
    slug: 'grok',
    description: "xAI's conversational AI assistant.",
    websiteUrl: 'https://x.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'llms',
  },
  {
    name: 'Character AI',
    slug: 'character-ai',
    description: 'AI characters for conversations.',
    websiteUrl: 'https://character.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'llms',
  },
  {
    name: 'Hugging Face',
    slug: 'hugging-face',
    description: 'Open-source AI model hub.',
    websiteUrl: 'https://huggingface.co',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'llms',
  },
  {
    name: 'Ideogram',
    slug: 'ideogram',
    description: 'AI image generation with text rendering.',
    websiteUrl: 'https://ideogram.ai',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'image-generation',
  },
  {
    name: 'Kling AI',
    slug: 'kling-ai',
    description: 'Chinese AI video generation tool.',
    websiteUrl: 'https://klingai.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: null,
    categorySlug: 'video-generation',
  },
  {
    name: 'HeyGen',
    slug: 'heygen',
    description: 'AI video generation with avatars.',
    websiteUrl: 'https://heygen.com',
    pricingType: 'FREEMIUM' as PricingType,
    monthlyPrice: 30,
    categorySlug: 'video-generation',
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
  console.log(`Created ${categories.length} categories`);

  // Create tools
  let toolsCreated = 0;
  for (const tool of tools) {
    const categoryRecord = await prisma.category.findUnique({
      where: { slug: tool.categorySlug },
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
          pricingType: tool.pricingType,
          monthlyPrice: tool.monthlyPrice,
          yearlyPrice: tool.monthlyPrice ? tool.monthlyPrice * 10 : null,
          categoryId: categoryRecord.id,
          isPopular: tool.isPopular || false,
          lastVerifiedAt: new Date(),
        },
      });
      toolsCreated++;
    }
  }
  console.log(`Created ${toolsCreated} tools`);

  // Verify counts
  const categoryCount = await prisma.category.count();
  const toolCount = await prisma.aITool.count();

  console.log(`\nSeeding complete!`);
  console.log(`Total categories: ${categoryCount}`);
  console.log(`Total tools: ${toolCount}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
