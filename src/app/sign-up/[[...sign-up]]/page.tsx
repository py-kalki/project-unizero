'use client';

import { SignUp } from '@clerk/nextjs';

/**
 * Custom Sign-Up Page
 *
 * Provides a branded registration experience using Clerk's pre-built SignUp component.
 * Styled to match the application's shadcn/ui theme and mirrors sign-in page styling.
 */
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
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
