# Phase 2: Authentication - Research

**Researched:** 2026-02-15
**Domain:** Next.js Authentication with Clerk
**Confidence:** HIGH

## Summary

Clerk is already partially integrated in Phase 1 with `ClerkProvider` in `layout.tsx` and `clerkMiddleware` in `middleware.ts`. Phase 2 requires creating custom auth pages, configuring OAuth providers (Google, GitHub), and implementing the password reset flow. Clerk handles session persistence automatically using a hybrid approach with short-lived JWTs (60 seconds) that refresh transparently, ensuring sessions persist across browser refreshes without additional configuration.

**Primary recommendation:** Use Clerk's pre-built `<SignIn>` and `<SignUp />` components on custom routes, configure OAuth providers in the Clerk Dashboard, and create a custom password reset page using Clerk's `useSignIn` hook with the `reset_password_email_code` strategy.

---

## User Constraints

### Locked Decisions

- Using Clerk for authentication (from Phase 1 research)
- PostgreSQL database via Neon cloud (already connected)
- Next.js 15 with App Router

### Claude's Discretion

- UI component styling (shadcn/ui integration)
- Exact page routing structure
- Custom password reset flow vs Clerk's built-in Account Portal

### Deferred Ideas

- Multi-session handling (not in scope for Phase 2)
- Organization/team features (future phase)

---

## Standard Stack

### Core

| Library       | Version | Purpose          | Why Standard                       |
| ------------- | ------- | ---------------- | ---------------------------------- |
| @clerk/nextjs | ^6.37.4 | Primary auth SDK | Official Clerk Next.js integration |
| @clerk/themes | ^2.4.52 | Theme support    | Official dark theme for shadcn/ui  |

### Supporting

| Library      | Version   | Purpose                | When to Use               |
| ------------ | --------- | ---------------------- | ------------------------- |
| @clerk/types | ^4.101.15 | TypeScript definitions | When typing Clerk objects |

**Installation:**

```bash
npm install @clerk/nextjs@latest @clerk/themes@latest
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx       # Custom sign-in page
│   │   ├── sign-up/
│   │   │   └── [[...sign-up]]/
│   │   │       └── page.tsx       # Custom sign-up page
│   │   └── forgot-password/
│   │       └── page.tsx            # Password reset page
│   ├── api/
│   │   └── clerk/
│   │       └── webhook/            # Clerk webhooks (optional)
│   ├── layout.tsx                  # Already has ClerkProvider
│   └── middleware.ts               # Already has clerkMiddleware
└── components/
    └── auth/
        └── user-button.tsx          # SignedIn/SignedOut + UserButton
```

### Pattern 1: Custom Sign-In Page

**What:** Host Clerk's pre-built `<SignIn>` component on a custom route
**When to Use:** When you need full control over the sign-in page styling and behavior
**Example:**

```tsx
// src/app/sign-in/[[...sign-in]]/page.tsx
// Source: https://clerk.com/docs/nextjs/components/authentication/sign-in

import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
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
```

### Pattern 2: Custom Sign-Up Page

**What:** Host Clerk's pre-built `<SignUp />` component on a custom route
**When to Use:** When you need full control over the sign-up page styling
**Example:**

```tsx
// src/app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
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
```

### Pattern 3: Protected Layout with UserButton

**What:** Show signed-in state with UserButton or SignInButton based on auth status
**When to Use:** In the main app layout or header for persistent auth UI
**Example:**

```tsx
// src/components/auth/user-button.tsx
// Source: https://clerk.com/docs/nextjs/components/overview

'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export function AuthButton() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
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
```

### Pattern 4: Custom Password Reset Flow

**What:** Create a two-step form: request reset code, then enter new password
**When to Use:** When you need custom password reset UI beyond Clerk's default
**Example:**

```tsx
// src/app/forgot-password/page.tsx
// Source: https://clerk.com/docs/guides/development/custom-flows/account-updates/forgot-password

'use client';

import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'request' | 'reset' | 'complete'>('request');

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    await signIn.create({
      strategy: 'reset_password_email_code',
      identifier: email,
    });
    setStep('reset');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    const result = await signIn.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code,
      password: newPassword,
    });

    if (result.status === 'complete') {
      setActive({ session: result.createdSessionId });
      router.push('/dashboard');
    }
  };

  if (step === 'request') {
    return (
      <form onSubmit={handleRequestReset}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit">Send Reset Code</button>
      </form>
    );
  }

  if (step === 'reset') {
    return (
      <form onSubmit={handleResetPassword}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter reset code"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
        />
        <button type="submit">Reset Password</button>
      </form>
    );
  }

  return <div>Password reset complete!</div>;
}
```

### Pattern 5: Server-Side Auth Check

**What:** Use `auth()` from `@clerk/nextjs/server` in Server Components
**When to Use:** To protect routes or get user data server-side
**Example:**

```tsx
// src/app/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <div>Welcome to your dashboard!</div>;
}
```

---

## Don't Hand-Roll

| Problem              | Don't Build                              | Use Instead                            | Why                                               |
| -------------------- | ---------------------------------------- | -------------------------------------- | ------------------------------------------------- |
| Session management   | Custom JWT handling, token refresh logic | Clerk's built-in session management    | Clerk handles 60-second JWT refresh automatically |
| OAuth provider setup | Manual OAuth callback handling           | Clerk Dashboard configuration          | Handles token exchange, callback URLs, errors     |
| Password hashing     | bcrypt/manual password storage           | Clerk's managed authentication         | Security, forgot password flow built-in           |
| Route protection     | Custom middleware auth checks            | `clerkMiddleware()` + `auth.protect()` | Battle-tested, handles edge cases                 |

---

## Common Pitfalls

### Pitfall 1: Missing Environment Variables

**What goes wrong:** Auth flow breaks silently, users can't sign in
**Why it happens:** Missing `CLERK_SIGN_IN_URL` or `CLERK_SIGN_UP_URL` causes Clerk to redirect to Account Portal
**How to avoid:** Ensure all required Clerk env vars are set:

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

**Warning signs:** Users redirected to clerk.com instead of your custom pages

### Pitfall 2: OAuth Provider Not Enabled in Clerk Dashboard

**What goes wrong:** Google/GitHub buttons don't appear on sign-in page
**Why it happens:** Providers must be enabled in Clerk Dashboard, not just configured in env
**How to avoid:** Enable providers at https://dashboard.clerk.com -> Your App -> User & Authentication -> Social Connections
**Warning signs:** OAuth buttons missing from Clerk components

### Pitfall 3: Missing Redirect URLs in OAuth Provider

**What goes wrong:** OAuth flow fails with redirect_uri mismatch error
**Why it happens:** Callback URLs in Google/GitHub don't match Clerk's actual domain
**How to avoid:** Add Clerk's callback URLs to your OAuth provider settings:

- Google: Add from Clerk Dashboard -> Social Connections -> Google -> Copy URLs
- GitHub: Add from Clerk Dashboard -> Social Connections -> GitHub -> Copy URLs
  **Warning signs:** "redirect_uri_mismatch" error during OAuth

### Pitfall 4: Client-Side Only Auth Components

**What goes wrong:** Auth state not available during SSR, flash of unauthenticated content
**Why it happens:** Using only client-side hooks without Server Components
**How to avoid:** Combine `auth()` server-side with `SignedIn/SignedOut` client components
**Warning signs:** Hydration errors, content flashes before auth loads

---

## Code Examples

### Complete Auth Layout Integration

```tsx
// src/app/layout.tsx (update existing)
// Source: https://clerk.com/docs/nextjs/quickstart

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthButton } from '@/components/auth/user-button';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'UNIZERO - AI Subscription Manager',
  description: 'Discover, compare, and manage AI tool subscriptions',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#000000',
        },
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
        },
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <html lang="en" suppressHydrationWarning>
          <body className={`${inter.className} antialiased`}>
            <header className="flex justify-end p-4 gap-4">
              <AuthButton />
            </header>
            <main>{children}</main>
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
```

### Middleware Configuration (Already Implemented)

```typescript
// middleware.ts - Already configured for Phase 1
// Source: https://clerk.com/docs/nextjs/middleware

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

### Environment Variables Required

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Auth Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/

# Fallback redirects
CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

---

## State of the Art

| Old Approach                   | Current Approach                            | When Changed | Impact                                      |
| ------------------------------ | ------------------------------------------- | ------------ | ------------------------------------------- |
| Custom JWT implementation      | Clerk's managed sessions                    | 2023+        | Zero-config, auto-refresh, 60-second tokens |
| Manual OAuth callback handling | Clerk Dashboard configuration               | 2023+        | One-click provider setup                    |
| Custom password reset emails   | Built-in reset_password_email_code strategy | 2024+        | Two-step verification flow                  |
| Server-only session check      | Hybrid client + server auth                 | 2024+        | No layout shift, SSR support                |

**Deprecated/outdated:**

- `<SignInButton>` and `<SignUpButton>` replaced by `<SignedIn>/<SignedOut>` + custom buttons
- Legacy Clerk hooks (useSession) replaced by `auth()` server function + `useUser()` client hook

---

## OAuth Setup Steps

### Google OAuth Configuration

1. **Enable Google in Clerk Dashboard:**
   - Go to https://dashboard.clerk.com -> Your App -> User & Authentication -> Social Connections
   - Click Google -> Enable
   - In development: Use Clerk's shared credentials (no setup needed)
   - In production: Click "Create new credentials" to set up your own

2. **For Production (Custom Credentials):**
   - Go to https://console.cloud.google.com/apis/credentials
   - Create OAuth 2.0 Client ID
   - Set authorized redirect URIs: `https://clerk.[your-domain].com/v1/oauth_callback`
   - Copy Client ID and Client Secret to Clerk Dashboard

### GitHub OAuth Configuration

1. **Enable GitHub in Clerk Dashboard:**
   - Go to https://dashboard.clerk.com -> Your App -> User & Authentication -> Social Connections
   - Click GitHub -> Enable
   - In development: Use Clerk's shared credentials
   - In production: Create your own OAuth App

2. **For Production (Custom Credentials):**
   - Go to https://github.com/settings/developers
   - Create New OAuth App
   - Authorization callback URL: `https://clerk.[your-domain].com/v1/oauth_callback`
   - Copy Client ID and Client Secret to Clerk Dashboard

---

## Session Persistence Behavior

Clerk handles session persistence automatically:

1. **Hybrid Cookie Architecture:**
   - Long-lived cookie on Clerk's Frontend API domain (HTTP-only, Secure, SameSite=Lax)
   - Short-lived JWT (60 seconds) in `__session` cookie for API authentication

2. **Automatic Refresh:**
   - JWTs refresh transparently in the background
   - No code required - handled by Clerk's client SDK
   - Works across browser refresh, new tabs, same-origin requests

3. **Session Duration:**
   - Default: 7 days max lifetime (configurable in Clerk Dashboard)
   - Active sessions stay alive with regular activity
   - Inactive sessions expire after max lifetime

4. **Browser Limitations:**
   - Some browsers clear cookies on close/restart
   - Cannot override completely - browser behavior takes precedence

**Verification:** Session persistence is built-in - no additional code needed beyond existing Clerk setup.

---

## Open Questions

1. **Should we use Clerk's Account Portal or custom pages?**
   - What we know: Account Portal provides hosted pages, custom gives full control
   - What's unclear: Whether custom pages are worth the maintenance
   - Recommendation: Use custom pages for full branding control (as planned)

2. **Multi-session support needed?**
   - What we know: Clerk supports multiple sessions, UserButton handles switching
   - What's unclear: Whether Phase 2 should include this
   - Recommendation: Not in scope for Phase 2, can add later

---

## Sources

### Primary (HIGH confidence)

- Clerk Documentation: https://clerk.com/docs/nextjs/quickstart
- Clerk SignIn Component: https://clerk.com/docs/nextjs/components/authentication/sign-in
- Clerk SignUp Component: https://clerk.com/docs/nextjs/components/authentication/sign-up
- Clerk Password Reset Guide: https://clerk.com/docs/guides/development/custom-flows/account-updates/forgot-password
- Clerk Middleware: https://clerk.com/docs/nextjs/middleware

### Secondary (MEDIUM confidence)

- Clerk Blog: Next.js Google Authentication: https://clerk.com/blog/nextjs-google-authentication
- Clerk Session Management: https://clerk.com/articles/nextjs-session-management-solving-nextauth-persistence-issues

### Tertiary (LOW confidence)

- Community tutorials on custom password reset flows (verify against official docs)

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - Official Clerk SDK, version from package.json
- Architecture: HIGH - Based on official Clerk documentation and patterns
- Pitfalls: HIGH - Common issues documented in official guides
- OAuth setup: MEDIUM - Configuration steps from Clerk docs, specific app setup may vary

**Research date:** 2026-02-15
**Valid until:** 2026-03-15 (Clerk API stable, quarterly updates)
