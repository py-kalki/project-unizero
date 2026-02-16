import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { protectedRoutes } from '@/config/clerk';

/**
 * Authentication Middleware
 *
 * Protects routes using Clerk authentication.
 * Routes are configured in @/config/clerk for easy modification.
 */

const isProtectedRoute = createRouteMatcher([...protectedRoutes]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  // Match all routes except static files, _next, and api/trpc
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
