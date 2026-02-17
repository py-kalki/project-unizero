/**
 * Theme Configuration
 *
 * Centralized theme settings for the application.
 * Extensible without modifying existing components.
 * @module config/theme
 */

/**
 * Theme configuration object
 */
export const themeConfig = {
  /** Default theme preference */
  defaultTheme: 'system' as const,

  /** Theme provider options */
  provider: {
    attribute: 'class',
    enableSystem: true,
    disableTransitionOnChange: false,
  },

  /** Color scheme tokens */
  colors: {
    primary: 'hsl(var(--primary))',
    foreground: 'hsl(var(--foreground))',
    background: 'hsl(var(--background))',
    muted: 'hsl(var(--muted))',
    accent: 'hsl(var(--accent))',
    destructive: 'hsl(var(--destructive))',
  },

  /** Animation durations in milliseconds */
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const;

/** Type definition for theme configuration */
export type ThemeConfig = typeof themeConfig;
