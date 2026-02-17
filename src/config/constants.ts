/**
 * Application Constants
 *
 * Centralized constants following DRY principle.
 * All application-wide constants should be defined here.
 * @module config/constants
 */

// App info
/** Application name */
export const APP_NAME = 'UNIZERO';

/** Application description */
export const APP_DESCRIPTION = 'AI Subscription Manager & Discovery Hub';

/**
 * Application base URL
 * Falls back to production URL if env var not set
 */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://unizero.ai';

/**
 * Default page size for pagination
 * @default 10
 */
export const DEFAULT_PAGE_SIZE = 10;

/**
 * Maximum page size for pagination
 * @default 100
 */
export const MAX_PAGE_SIZE = 100;

// Cache durations (in seconds)

/**
 * Cache duration constants in seconds
 * @property SHORT - 1 minute
 * @property MEDIUM - 5 minutes
 * @property LONG - 1 hour
 * @property DAY - 24 hours
 */
export const CACHE_DURATIONS = {
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  DAY: 86400,
} as const;

// API rate limiting

/**
 * Rate limiting constants
 * @property DEFAULT - Default requests per window
 * @property AUTH - Auth requests per window
 * @property API - API requests per window
 */
export const RATE_LIMITS = {
  DEFAULT: 100,
  AUTH: 10,
  API: 1000,
} as const;

// Feature flags

/**
 * Feature flags for toggling functionality
 * @property ANALYTICS - Enable analytics features
 * @property COMPARISON - Enable tool comparison features
 * @property EXPORT - Enable data export features
 */
export const FEATURES = {
  ANALYTICS: process.env.NEXT_PUBLIC_FEATURE_ANALYTICS === 'true',
  COMPARISON: process.env.NEXT_PUBLIC_FEATURE_COMPARISON === 'true',
  EXPORT: process.env.NEXT_PUBLIC_FEATURE_EXPORT === 'true',
} as const;

// User roles (for future use)

/**
 * User role constants
 * @property USER - Regular user role
 * @property ADMIN - Administrator role
 */
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

// Subscription billing cycles

/**
 * Subscription billing cycle types
 * @property MONTHLY - Monthly billing
 * @property YEARLY - Yearly billing
 * @property LIFETIME - One-time lifetime purchase
 */
export const BILLING_CYCLES = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  LIFETIME: 'lifetime',
} as const;

// AI Tool categories (for future use)

/**
 * AI tool category classifications
 * @property TEXT_GENERATION - Text generation AI tools
 * @property IMAGE_GENERATION - Image generation AI tools
 * @property VIDEO_GENERATION - Video generation AI tools
 * @property AUDIO_GENERATION - Audio generation AI tools
 * @property CODE_ASSISTANT - Code assistant AI tools
 * @property PRODUCTIVITY - Productivity AI tools
 * @property OTHER - Other uncategorized tools
 */
export const TOOL_CATEGORIES = {
  TEXT_GENERATION: 'text-generation',
  IMAGE_GENERATION: 'image-generation',
  VIDEO_GENERATION: 'video-generation',
  AUDIO_GENERATION: 'audio-generation',
  CODE_ASSISTANT: 'code-assistant',
  PRODUCTIVITY: 'productivity',
  OTHER: 'other',
} as const;
