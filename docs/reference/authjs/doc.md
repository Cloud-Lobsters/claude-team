# Clerk for Next.js – Code‑First Documentation

> Clerk is a full‑featured authentication & user‑management platform that works out‑of‑the‑box with the Next.js App Router.  
> This guide focuses on the **code** you’ll write – installation, components, middleware, hooks, and examples.

---

## Table of Contents

1. [Installation](#installation)
2. [Provider Setup](#provider-setup)
3. [UI Components](#ui-components)
   - [Sign‑In](#signin)
   - [Sign‑Up](#signup)
   - [SignedIn / SignedOut](#signedin-signedout)
   - [Protect](#protect)
4. [Middleware](#middleware)
   - [Basic Auth Middleware](#basic-auth-middleware)
   - [Role‑Based Access Control](#role-based-access-control)
5. [Hooks](#hooks)
   - [useAuth](#useauth)
   - [useUser](#useuser)
6. [Server‑Side Utilities](#server-side-utilities)
7. [FAQ (Code‑Related)](#faq-code-related)

---

## 1. Installation

```bash
# npm
npm install @clerk/nextjs

# yarn
yarn add @clerk/nextjs
```

> **Tip** – After installing, run `npx clerk login` to authenticate your CLI with your Clerk account and generate the required environment variables.

---

## 2. Provider Setup

Wrap your application with `ClerkProvider`.  
Place it in `app/layout.tsx` (or `pages/_app.tsx` if you’re still on the Pages Router).

```tsx
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
```

---

## 3. UI Components

Clerk ships with a set of pre‑built React components that you can drop into your pages.

### Sign‑In

```tsx
// app/signin/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn />;
}
```

> **Customizing** – Pass props to `SignIn` to enable/disable providers, set redirect URLs, etc.

### Sign‑Up

```tsx
// app/signup/page.tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp />;
}
```

### SignedIn / SignedOut

These components conditionally render children based on the user’s auth state.

```tsx
// app/dashboard/page.tsx
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Dashboard() {
  return (
    <>
      <SignedIn>
        <p>Welcome back!</p>
      </SignedIn>
      <SignedOut>
        <p>Please sign in to view your dashboard.</p>
      </SignedOut>
    </>
  );
}
```

### Protect

Render content only for users with a specific permission.

```tsx
// app/invoices/page.tsx
import { Protect } from '@clerk/nextjs';

export default function InvoicesPage() {
  return (
    <Protect
      permission="org:invoices:create"
      fallback={<p>You do not have the permissions.</p>}
    >
      <p>Here are your invoices.</p>
    </Protect>
  );
}
```

---

## 4. Middleware

Middleware runs on every request, allowing you to enforce authentication or role‑based access before the page renders.

### Basic Auth Middleware

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // throws if not signed in
  }
});
```

### Role‑Based Access Control

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect({ role: 'org:admin' }); // only org admins
  }
});
```

> **Note** – `auth.protect({ role: 'org:admin' })` checks the user’s role in the current organization.

---

## 5. Hooks

Hooks give you programmatic access to auth state and user data.

### `useAuth`

```tsx
// app/profile/page.tsx
import { useAuth } from '@clerk/nextjs';

export default function ProfilePage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <p>Loading...</p>;
  if (!isSignedIn) return <p>Sign in to view this page</p>;

  const fetchData = async () => {
    const token = await getToken(); // JWT for your API
    // fetch your protected data here
  };

  return <div>Profile content</div>;
}
```

### `useUser`

```tsx
// app/welcome/page.tsx
import { useUser } from '@clerk/nextjs';

export default function WelcomePage() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  if (isSignedIn) {
    return <p>Hello {user?.fullName}!</p>;
  }

  return <p>Not signed in</p>;
}
```

---

## 6. Server‑Side Utilities

Clerk also provides server‑side helpers for API routes, server actions, and route handlers.

```ts
// app/api/protected/route.ts
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth(); // throws if not authenticated

  // your protected logic here
  return new Response(JSON.stringify({ userId }));
}
```

---

## 7. FAQ (Code‑Related)

| Question | Answer |
|----------|--------|
| **How do I protect a page with the App Router?** | Use `clerkMiddleware` in `middleware.ts` and `SignedIn`/`SignedOut` components. |
| **Can I use Clerk with the Pages Router?** | Yes – the same components and hooks work, but you’ll need to wrap `_app.tsx` with `ClerkProvider`. |
| **How do I get a JWT for my API?** | Call `await getToken()` inside a component or `await auth()` in a server route. |
| **What if I need a custom sign‑in form?** | Use Clerk’s `useSignIn` hook or the low‑level `Elements` API to build your own UI. |
| **How do I handle role‑based access on the server?** | Pass `{ role: 'org:admin' }` to `auth.protect()` in middleware or server routes. |

---

### Quick Reference

```tsx
// 1️⃣ Wrap app with ClerkProvider
<ClerkProvider>{children}</ClerkProvider>

// 2️⃣ Use UI components
<SignIn />
<SignUp />
<SignedIn>...</SignedIn>
<SignedOut>...</SignedOut>
<Protect permission="org:invoices:create">...</Protect>

// 3️⃣ Middleware
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

// 4️⃣ Hooks
const { isSignedIn, user } = useUser();
const { getToken } = useAuth();
```

---

**Happy coding!**  
If you run into any issues, consult the [Clerk Docs](https://docs.clerk.dev) or open an issue on the GitHub repo.