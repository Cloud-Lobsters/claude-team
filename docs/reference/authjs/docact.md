# Auth.js – Client‑Side API Reference

> This document covers the client‑side API that ships with **Auth.js** (the successor of NextAuth.js).  
> All examples are kept verbatim from the original documentation.

---

## 1. Overview

Auth.js is the official integration for Next.js applications.  
It supports both **Client Components** and the **Pages Router**.  
The client API provides:

| Feature | Description |
|---------|-------------|
| `signIn()` | Initiate a sign‑in flow or redirect to the sign‑in page. |
| `signOut()` | Destroy the current session. |
| `useSession()` | React hook to read and update the session. |
| `SessionProvider` | React context provider that makes the session available throughout the app. |
| `getCsrfToken()` | Retrieve the CSRF token required for state‑changing requests. |
| `getProviders()` | List all configured authentication providers. |
| `getSession()` | Fetch the current session (client‑side only). |

> **Note** – For server‑side actions (e.g. Server Actions in Next.js 13) use the `auth()` export from your auth configuration instead of the client API.

---

## 2. Types & Interfaces

```ts
// GetSessionParams
interface GetSessionParams {
  broadcast?: boolean;          // optional
  event?: string;               // optional
  triggerEvent?: boolean;       // optional
}

// SessionProviderProps
interface SessionProviderProps {
  basePath?: string;            // optional
  baseUrl?: string;             // optional
  children: ReactNode;
  refetchInterval?: number;     // optional, seconds (0 = no polling)
  refetchOnWindowFocus?: boolean; // optional, default true
  refetchWhenOffline?: boolean;   // optional, default false
  session?: null | Session;     // optional
}

// SignInOptions<Redirect>
type SignInOptions<Redirect extends boolean = true> = Record<string, unknown> & {
  callbackUrl?: string;         // deprecated – use redirectTo
  redirect?: Redirect;          // optional
  redirectTo?: string;          // optional
};

// SignInResponse
interface SignInResponse {
  code?: string;
  error?: string;
  ok: boolean;
  status: number;
  url: string | null;
}

// SignOutParams<Redirect>
type SignOutParams<Redirect extends boolean = true> = {
  callbackUrl?: string;         // deprecated – use redirectTo
  redirect?: Redirect;          // optional
  redirectTo?: string;          // optional
};

// SessionContextValue<R>
type SessionContextValue<R extends boolean = false> =
  R extends true
    ? { data: Session; status: "authenticated"; update: UpdateSession }
    : { data: Session; status: "authenticated"; update: UpdateSession }
    | { data: null; status: "unauthenticated" | "loading"; update: UpdateSession };

// UpdateSession
type UpdateSession = (data?: any) => Promise<Session | null>;
```

---

## 3. Core Functions

### 3.1 `getCsrfToken()`

```ts
/**
 * Returns the current CSRF token required for state‑changing requests.
 */
export async function getCsrfToken(): Promise<string>
```

---

### 3.2 `getProviders()`

```ts
/**
 * Returns a map of all configured providers.
 */
export async function getProviders(): Promise<
  | null
  | Record<ProviderId, ClientSafeProvider>
>
```

---

### 3.3 `getSession(params?)`

```ts
/**
 * Fetches the current session.
 * @param params Optional parameters to control polling and events.
 */
export async function getSession(params?: GetSessionParams): Promise<null | Session>
```

---

## 4. React Context

### 4.1 `SessionProvider`

```tsx
/**
 * React Context provider that makes session data available throughout the app.
 *
 * @param props SessionProviderProps
 * @returns React element
 */
export function SessionProvider(props: SessionProviderProps): JSX.Element
```

**Key Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `refetchInterval` | `number` | `0` | Seconds after which the session will be re‑fetched. |
| `refetchOnWindowFocus` | `boolean` | `true` | Refetch when the window gains focus. |
| `refetchWhenOffline` | `boolean` | `false` | Stop polling when offline. |

---

## 5. Authentication Actions

### 5.1 `signIn()`

```ts
/**
 * Initiates a sign‑in flow or redirects to the sign‑in page.
 *
 * @param provider Optional provider ID.
 * @param options   SignInOptions – can be `true` (redirect) or `false` (no redirect).
 * @param authorizationParams Optional additional params for the provider.
 *
 * @returns Promise<void> when redirect is true,
 *          Promise<SignInResponse> when redirect is false.
 */
export function signIn(
  provider?: ProviderId,
  options?: SignInOptions<true>,
  authorizationParams?: SignInAuthorizationParams
): Promise<void>;

export function signIn(
  provider?: ProviderId,
  options?: SignInOptions<false>,
  authorizationParams?: SignInAuthorizationParams
): Promise<SignInResponse>;
```

**Example – Redirect to provider**

```tsx
import { signIn } from "next-auth/react";

<button onClick={() => signIn("google")}>Sign in with Google</button>
```

**Example – Inline error handling**

```tsx
import { signIn } from "next-auth/react";

async function handleLogin() {
  const res = await signIn("credentials", {
    redirect: false,
    email: "user@example.com",
    password: "secret",
  });

  if (!res?.ok) {
    // Show inline error
    console.error(res?.error);
  }
}
```

---

### 5.2 `signOut()`

```ts
/**
 * Initiates a sign‑out, destroying the current session.
 *
 * @param options SignOutParams – can be `true` (redirect) or `false` (no redirect).
 *
 * @returns Promise<void> when redirect is true,
 *          Promise<SignOutResponse> when redirect is false.
 */
export function signOut(options?: SignOutParams<true>): Promise<void>;

export function signOut(options?: SignOutParams<false>): Promise<SignOutResponse>;
```

**Example – Simple sign‑out**

```tsx
import { signOut } from "next-auth/react";

<button onClick={() => signOut()}>Sign out</button>
```

**Example – Sign‑out without redirect**

```tsx
import { signOut } from "next-auth/react";

async function handleLogout() {
  const res = await signOut({ redirect: false });
  if (!res?.ok) {
    console.error(res?.error);
  }
}
```

---

## 6. React Hook – `useSession()`

```ts
/**
 * React hook that gives you access to the logged‑in user’s session data
 * and lets you modify it.
 *
 * @param options Optional configuration.
 * @returns SessionContextValue
 */
export function useSession<R extends boolean = false>(
  options?: UseSessionOptions<R>
): SessionContextValue<R>;
```

**Example – Basic usage**

```tsx
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status, update } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You are not logged in.</p>;

  return (
    <div>
      <p>Signed in as {session.user?.email}</p>
      <button onClick={() => update({ user: { ...session.user, name: "New Name" } })}>
        Update Name
      </button>
    </div>
  );
}
```

---

## 7. Summary

| Function | Purpose | Redirect? |
|----------|---------|-----------|
| `getCsrfToken()` | Get CSRF token | N/A |
| `getProviders()` | List providers | N/A |
| `getSession()` | Fetch session | N/A |
| `SessionProvider` | Context provider | N/A |
| `signIn()` | Sign‑in flow | Yes (default) |
| `signOut()` | Sign‑out flow | Yes (default) |
| `useSession()` | Read/update session | N/A |

> **Tip** – When using the **App Router** (`app/`), prefer the `auth()` export from your auth configuration for server‑side logic. The client API is intended for client‑side usage only.

---

*All examples above are taken directly from the official Auth.js documentation and are fully functional when used in a Next.js project that has Auth.js properly configured.*