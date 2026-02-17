'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Error boundary props
 */
interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Boundary Component
 *
 * Catches unhandled errors in the application and displays a user-friendly message.
 * In development mode, shows the actual error message for debugging.
 * In production, shows a generic message to prevent information leakage.
 */
export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    // Log error to console in development
    if (isDevelopment) {
      console.error('Application error:', error);
    }
    // In production, you would send to an error reporting service
    // like Sentry, LogRocket, etc.
  }, [error, isDevelopment]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        {isDevelopment && error.message && (
          <p className="text-sm text-destructive">{error.message}</p>
        )}
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
