/**
 * Application Constants
 *
 * Centralized constants following DRY principle.
 */

// App info
export const APP_NAME = 'UNIZERO';
export const APP_DESCRIPTION = 'AI Subscription Manager & Discovery Hub';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://unizero.ai';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const;

// API rate limiting
export const RATE_LIMITS = {
  DEFAULT: 100, // requests per window
  AUTH: 10, // auth requests per window
  API: 1000, // API requests per window
} as const;

// Feature flags
export const FEATURES = {
  ANALYTICS: process.env.NEXT_PUBLIC_FEATURE_ANALYTICS === 'true',
  COMPARISON: process.env.NEXT_PUBLIC_FEATURE_COMPARISON === 'true',
  EXPORT: process.env.NEXT_PUBLIC_FEATURE_EXPORT === 'true',
} as const;

// User roles (for future use)
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

// Subscription billing cycles
export const BILLING_CYCLES = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  LIFETIME: 'lifetime',
} as const;

// AI Tool categories (for future use)
export const TOOL_CATEGORIES = {
  TEXT_GENERATION: 'text-generation',
  IMAGE_GENERATION: 'image-generation',
  VIDEO_GENERATION: 'video-generation',
  AUDIO_GENERATION: 'audio-generation',
  CODE_ASSISTANT: 'code-assistant',
  PRODUCTIVITY: 'productivity',
  OTHER: 'other',
} as const;
