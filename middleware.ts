/**
 * Authentication Middleware
 *
 * Protects routes using Clerk authentication.
 * Routes are configured in @/config/clerk for easy modification.
 * @module middleware
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { protectedRoutes } from '@/config/clerk';

/**
 * Route matcher for protected routes
 * Matches all routes defined in protectedRoutes config
 */
const isProtectedRoute = createRouteMatcher([...protectedRoutes]);

/**
 * Clerk middleware handler
 * Protects specified routes by requiring authentication
 */
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

/**
 * Middleware configuration
 * Matches all routes except static files, _next, and api/trpc
 */
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
