/**
 * Loading Component
 *
 * Displays a loading spinner while page content is being loaded.
 * Used during client-side navigation in Next.js App Router.
 * @module app/loading
 */

export default function Loading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
