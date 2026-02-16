/**
 * Theme Configuration
 *
 * Centralized theme settings for the application.
 * Extensible without modifying existing components.
 */

export const themeConfig = {
  // Default theme preference
  defaultTheme: 'system' as const,

  // Theme provider options
  provider: {
    attribute: 'class',
    enableSystem: true,
    disableTransitionOnChange: false,
  },

  // Color scheme
  colors: {
    primary: 'hsl(var(--primary))',
    foreground: 'hsl(var(--foreground))',
    background: 'hsl(var(--background))',
    muted: 'hsl(var(--muted))',
    accent: 'hsl(var(--accent))',
    destructive: 'hsl(var(--destructive))',
  },

  // Animation durations
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const;

export type ThemeConfig = typeof themeConfig;
