# Auth.js – SvelteKit Actions API Reference

> **Auth.js** is the core authentication library for modern web frameworks.  
> This guide documents the SvelteKit‑specific actions that expose the Auth.js
> functionality to your server‑side code.

---

## Table of Contents

- [auth](#auth)
- [signIn](#signin)
- [signOut](#signout)

---

## `auth`

```ts
/**
 * Retrieve the current session for a request.
 *
 * @param event   The SvelteKit `RequestEvent` object.
 * @param config  Optional SvelteKitAuth configuration.
 *
 * @returns A Promise that resolves to the current `Session` object
 *          or `null` if the user is not authenticated.
 */
export async function auth(
  event: RequestEvent,
  config?: SvelteKitAuthConfig
): Promise<Session | null>
```

### Example

```ts
import { auth } from '@auth/sveltekit/actions';

export const load = async ({ event }) => {
  const session = await auth(event);
  return { session };
};
```

---

## `signIn`

```ts
/**
 * Initiate a sign‑in flow for a given provider.
 *
 * @param provider              The provider ID (e.g. `"github"`, `"google"`).
 * @param options               Optional form data or redirect options.
 * @param authorizationParams   Optional query parameters for the provider.
 * @param config                Optional SvelteKitAuth configuration.
 * @param event                 The SvelteKit `RequestEvent` object.
 *
 * @returns A Promise that resolves to the provider’s response
 *          (e.g. a redirect URL or a JSON payload).
 */
export async function signIn(
  provider?: ProviderId,
  options?: FormData | { redirect: boolean; redirectTo: string } & Record<string, any>,
  authorizationParams?: string | Record<string, string> | URLSearchParams | string[][],
  config?: SvelteKitAuthConfig,
  event?: RequestEvent
): Promise<any>
```

### Example

```ts
import { signIn } from '@auth/sveltekit/actions';

export const actions = {
  login: async ({ request, locals }) => {
    // Redirect to the provider’s login page
    return await signIn('github', { redirect: true }, undefined, undefined, locals.event);
  }
};
```

---

## `signOut`

```ts
/**
 * Sign the user out of the current session.
 *
 * @param options  Optional redirect options.
 * @param config   Optional SvelteKitAuth configuration.
 * @param event    The SvelteKit `RequestEvent` object.
 *
 * @returns A Promise that resolves to the provider’s response
 *          (e.g. a redirect URL or a JSON payload).
 */
export async function signOut(
  options?: { redirect: boolean; redirectTo: string },
  config?: SvelteKitAuthConfig,
  event?: RequestEvent
): Promise<any>
```

### Example

```ts
import { signOut } from '@auth/sveltekit/actions';

export const actions = {
  logout: async ({ locals }) => {
    // Redirect to the home page after logout
    return await signOut({ redirect: true, redirectTo: '/' }, undefined, locals.event);
  }
};
```

---

### Notes

- All functions return a `Promise`.  
- The `event` parameter is the SvelteKit `RequestEvent` that contains request/response
  objects and other context.  
- `config` is optional; if omitted, the library will use the default configuration
  defined in your `svelte.config.js` or `auth.config.ts`.  
- The `options` objects for `signIn` and `signOut` allow you to control
  redirection behavior (`redirect: true/false`) and specify a custom
  `redirectTo` URL.

---

**Happy coding!**