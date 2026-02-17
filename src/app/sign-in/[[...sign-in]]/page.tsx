'use client';

import { SignIn } from '@clerk/nextjs';

/**
 * Custom Sign-In Page
 *
 * Provides a branded sign-in experience using Clerk's pre-built SignIn component.
 * Styled to match the application's shadcn/ui theme.
 */
export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'bg-background border shadow-sm',
          },
        }}
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
