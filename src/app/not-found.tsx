/**
 * Not Found Page
 *
 * Custom 404 error page displayed when a route doesn't exist.
 * Provides navigation options to help users find what they're looking for.
 * @module app/not-found
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * 404 Not Found Page Component
 * Displays when a requested page doesn't exist
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
