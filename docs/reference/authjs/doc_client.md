# @auth/sveltekit – Client API Reference

> **⚠️** This documentation covers the client‑side API that is available in SvelteKit
> projects that use **Auth.js**.  
> For server‑side usage (e.g. Server Actions) import the corresponding functions
> from your Auth config instead.

---

## 1. Types

### 1.1 `SignInOptions<Redirect>`

```ts
/**
 * Options for the `signIn` helper.
 *
 * @template Redirect – `true` (default) to perform a redirect, `false` to stay on the same page.
 */
export interface SignInOptions<Redirect extends boolean = true>
  extends Record<string, unknown> {
  /** Optional callback URL. Deprecated – use `redirectTo` instead. */
  callbackUrl?: string;

  /** Whether to redirect after a successful sign‑in. */
  redirect?: Redirect;

  /** Where to redirect after a successful sign‑in. */
  redirectTo?: string;
}
```

> **Note**  
> `callbackUrl` is kept for backward compatibility but is deprecated.  
> Prefer `redirectTo` for specifying the post‑sign‑in destination.

---

### 1.2 `SignInResponse`

```ts
export interface SignInResponse {
  /** The authorization code (if any). */
  code?: string;

  /** Error message (if any). */
  error?: string;

  /** `true` if the sign‑in succeeded. */
  ok: boolean;

  /** HTTP status code returned by the provider. */
  status: number;

  /** URL to redirect to (or `null` if no redirect). */
  url: string | null;
}
```

---

### 1.3 `SignOutParams<Redirect>`

```ts
/**
 * Options for the `signOut` helper.
 *
 * @template Redirect – `true` (default) to perform a redirect, `false` to stay on the same page.
 */
export interface SignOutParams<Redirect extends boolean = true> {
  /** Optional callback URL. Deprecated – use `redirectTo` instead. */
  callbackUrl?: string;

  /** Whether to redirect after a successful sign‑out. */
  redirect?: Redirect;

  /** Where to redirect after a successful sign‑out. */
  redirectTo?: string;
}
```

---

### 1.4 `SignOutResponse`

```ts
export interface SignOutResponse {
  /** URL to redirect to after sign‑out. */
  url: string;
}
```

---

### 1.5 `SignInAuthorizationParams`

```ts
/**
 * Parameters that can be passed to the provider’s authorization endpoint.
 *
 * Accepts any of the following shapes:
 * - `string`
 * - `string[][]`
 * - `Record<string, string>`
 * - `URLSearchParams`
 */
export type SignInAuthorizationParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams;
```

---

## 2. Functions

### 2.1 `signIn`

| Overload | Parameters | Returns | Notes |
|----------|------------|---------|-------|
| **Client‑side (redirect)** | `provider?: ProviderId`<br>`options?: SignInOptions<true>`<br>`authorizationParams?: SignInAuthorizationParams` | `Promise<void>` | Performs a full redirect to the provider’s sign‑in page. |
| **Client‑side (no redirect)** | `provider?: ProviderId`<br>`options?: SignInOptions<false>`<br>`authorizationParams?: SignInAuthorizationParams` | `Promise<SignInResponse>` | Returns a response object instead of redirecting. |
| **Server‑side** | Same as above | `Promise<void>` | Import from your Auth config (`import { signIn } from '@/auth'`). |

> **Usage Example – Redirect (default)**

```svelte
<script lang="ts" context="module">
  export const load = async () => {
    // Redirect to the default sign‑in page
    await signIn();
  };
</script>
```

> **Usage Example – No Redirect (inline error handling)**

```svelte
<script lang="ts">
  import { signIn } from '@auth/sveltekit/client';

  async function handleLogin() {
    const result = await signIn('credentials', {
      redirect: false,          // stay on the same page
      redirectTo: '/dashboard', // where to go on success
    });

    if (!result.ok) {
      // Show an inline error message
      console.error(result.error);
    } else {
      // Optionally handle the redirect manually
      window.location.href = result.url ?? '/dashboard';
    }
  }
</script>

<form on:submit|preventDefault={handleLogin}>
  <!-- form fields -->
  <button type="submit">Login</button>
</form>
```

> **Usage Example – Passing Authorization Params**

```ts
await signIn('google', {
  redirect: false,
  redirectTo: '/profile',
}, {
  prompt: 'consent',
  access_type: 'offline',
});
```

---

### 2.2 `signOut`

| Overload | Parameters | Returns | Notes |
|----------|------------|---------|-------|
| **Client‑side (redirect)** | `options?: SignOutParams<true>` | `Promise<void>` | Performs a full redirect to the sign‑out page. |
| **Client‑side (no redirect)** | `options?: SignOutParams<false>` | `Promise<SignOutResponse>` | Returns a response object instead of redirecting. |
| **Server‑side** | Same as above | `Promise<void>` | Import from your Auth config (`import { signOut } from '@/auth'`). |

> **Usage Example – Redirect (default)**

```svelte
<script lang="ts">
  import { signOut } from '@auth/sveltekit/client';

  async function handleLogout() {
    await signOut(); // redirects to the default sign‑out page
  }
</script>

<button on:click={handleLogout}>Logout</button>
```

> **Usage Example – No Redirect (inline handling)**

```svelte
<script lang="ts">
  import { signOut } from '@auth/sveltekit/client';

  async function handleLogout() {
    const result = await signOut({ redirect: false });

    // The session is already cleared; you can update UI accordingly
    console.log('Signed out, redirect URL:', result.url);
  }
</script>

<button on:click={handleLogout}>Logout</button>
```

---

## 3. Common Patterns

### 3.1 Handling `redirect: false`

When you set `redirect: false`, the page will **not** reload.  
The session is destroyed, and any `useSession` hook will automatically
update to reflect the logged‑out state. This gives a smoother user experience.

```ts
const result = await signOut({ redirect: false });
if (result.url) {
  // Optionally navigate manually
  window.location.href = result.url;
}
```

### 3.2 Using `redirectTo`

`redirectTo` replaces the older `callbackUrl` option.  
It specifies the exact URL the user should be sent to after a successful
sign‑in or sign‑out.

```ts
await signIn('github', { redirectTo: '/welcome' });
```

---

## 4. Server‑Side Usage

For Server Actions or API routes, import the helpers directly from your
Auth config:

```ts
// src/lib/auth.ts
import { auth } from '@auth/sveltekit';

export const { signIn, signOut } = auth;
```

Then use them in your server code:

```ts
export const POST = async (request) => {
  const { signIn } = await import('$lib/auth');
  await signIn('credentials', { redirect: false });
  return new Response(null, { status: 204 });
};
```

---

## 5. Summary

| Function | Redirect? | Return Type | Typical Use |
|----------|-----------|-------------|-------------|
| `signIn` | ✅ (default) | `Promise<void>` | Full redirect to provider |
| `signIn` | ❌ (`redirect: false`) | `Promise<SignInResponse>` | Inline error handling |
| `signOut` | ✅ (default) | `Promise<void>` | Full redirect to sign‑out page |
| `signOut` | ❌ (`redirect: false`) | `Promise<SignOutResponse>` | Inline sign‑out handling |

> **Tip** – Always prefer `redirectTo` over the deprecated `callbackUrl`.

---

**Happy coding!** 🚀