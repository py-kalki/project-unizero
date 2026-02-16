import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';

/**
 * Clerk Authentication Configuration
 *
 * Centralized configuration for Clerk authentication.
 * To add new themes or modify behavior, extend this config
 * without modifying the existing provider code.
 */

// Theme options available in the application
export const clerkThemes = {
  dark,
  neobrutalism,
  shadesOfPurple,
} as const;

// Default theme
export const defaultTheme = clerkThemes.dark;

// Protected routes that require authentication
export const protectedRoutes = ['/dashboard(.*)', '/settings(.*)'] as const;

// Public routes that don't require authentication
export const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/api/webhooks(.*)',
] as const;

// Sign in/sign up URLs
export const clerkUrls = {
  signIn: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in',
  signUp: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up',
  afterSignIn: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard',
  afterSignUp: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard',
} as const;

// Clerk appearance configuration
export const clerkAppearance = {
  baseTheme: defaultTheme,
  // Add custom variables here for theming
  variables: {
    colorPrimary: 'hsl(var(--primary))',
    colorText: 'hsl(var(--foreground))',
    colorBackground: 'hsl(var(--background))',
    colorInputBackground: 'hsl(var(--input))',
    colorInputText: 'hsl(var(--foreground))',
    borderRadius: 'var(--radius)',
  },
} as const;
