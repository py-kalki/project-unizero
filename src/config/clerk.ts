/**
 * Clerk Authentication Configuration
 *
 * Centralized configuration for Clerk authentication.
 * To add new themes or modify behavior, extend this config
 * without modifying the existing provider code.
 * @module config/clerk
 */

import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';

/**
 * Available Clerk themes
 * @property dark - Dark theme (default)
 * @property neobrutalism - Neo-brutalism style
 * @property shadesOfPurple - Purple color scheme
 */
export const clerkThemes = {
  dark,
  neobrutalism,
  shadesOfPurple,
} as const;

/**
 * Default Clerk theme
 * @default clerkThemes.dark
 */
export const defaultTheme = clerkThemes.dark;

/**
 * Protected routes that require authentication
 * These routes will redirect unauthenticated users to sign-in
 */
export const protectedRoutes = ['/dashboard(.*)', '/settings(.*)'] as const;

/**
 * Public routes that don't require authentication
 * These routes are accessible without being logged in
 */
export const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/api/webhooks(.*)',
] as const;

/**
 * Clerk URL configuration
 * Handles sign-in, sign-up, and redirect URLs
 */
export const clerkUrls = {
  signIn: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in',
  signUp: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up',
  afterSignIn: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard',
  afterSignUp: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard',
  // Fallback redirect URLs (new recommended approach)
  signInFallbackRedirectUrl:
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || '/dashboard',
  signUpFallbackRedirectUrl:
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL || '/dashboard',
} as const;

/**
 * Clerk appearance configuration
 * Customizes the look and feel of Clerk components
 */
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
