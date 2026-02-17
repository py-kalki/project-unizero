'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

/**
 * Auth Button Component
 *
 * Conditional rendering component that shows:
 * - SignInButton (modal) when user is signed out
 * - UserButton with avatar when user is signed in
 *
 * Used in the header to provide persistent auth state.
 */
export function AuthButton() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-9 w-9',
            },
          }}
        />
      </SignedIn>
    </>
  );
}

export default AuthButton;
