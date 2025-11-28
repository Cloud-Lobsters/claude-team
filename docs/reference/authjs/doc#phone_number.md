# @auth/sveltekit – Official SvelteKit integration for Auth.js

> **⚠️** `@auth/sveltekit` is currently experimental. The API may change.

This documentation covers the most common use‑cases for adding authentication to a SvelteKit app with Auth.js.  
All code snippets are fully functional – copy‑paste them into your project and you’re good to go.

---

## 1. Installation

```bash
# npm
npm install @auth/sveltekit

# pnpm
pnpm add @auth/sveltekit

# yarn
yarn add @auth/sveltekit

# bun
bun add @auth/sveltekit
```

---

## 2. Basic usage

Create an `auth.ts` file in the project root (or wherever you prefer) and export the `handle`, `signIn` and `signOut` helpers:

```ts
// src/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub],
});
```

> **Tip** – The `handle` function is a SvelteKit `Handle` hook that must be re‑exported from `src/hooks.server.ts`:

```ts
// src/hooks.server.ts
export { handle } from "./auth";
```

---

## 3. Lazy initialization

When you need to read environment variables from the request (e.g. Cloudflare Workers), you can pass an async function to `SvelteKitAuth`:

```ts
// src/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
  const authOptions = {
    providers: [
      GitHub({
        clientId: event.platform.env.AUTH_GITHUB_ID,
        clientSecret: event.platform.env.AUTH_GITHUB_SECRET,
      }),
    ],
    secret: event.platform.env.AUTH_SECRET,
    trustHost: true,
  };
  return authOptions;
});
```

> **Remember** – `AUTH_SECRET` must be at least 32 random characters.  
> On non‑Vercel hosts set `AUTH_TRUST_HOST=true`.

---

## 4. Sign‑in / Sign‑out components (server‑side)

`@auth/sveltekit` ships two ready‑made components: `<SignIn />` and `<SignOut />`.  
They use SvelteKit’s form actions under the hood.

### 4.1 Front‑end

```svelte
<!-- src/routes/+page.svelte -->
<script>
  import { SignIn, SignOut } from "@auth/sveltekit/components";
  import { page } from "$app/stores";
</script>

<h1>SvelteKit Auth Example</h1>

<div>
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      <img src={$page.data.session.user.image} class="avatar" alt="User Avatar" />
    {/if}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>

    <SignOut>
      <div slot="submitButton" class="buttonPrimary">Sign out</div>
    </SignOut>
  {:else}
    <span class="notSignedInText">You are not signed in</span>

    <SignIn>
      <div slot="submitButton" class="buttonPrimary">Sign in</div>
    </SignIn>

    <SignIn provider="facebook" />
  {/if}
</div>
```

### 4.2 Server‑side form actions

```ts
// src/routes/signin/+page.server.ts
import { signIn } from "../../auth";
import type { Actions } from "./$types";

export const actions: Actions = { default: signIn };
```

```ts
// src/routes/signout/+page.server.ts
import { signOut } from "../../auth";
import type { Actions } from "./$types";

export const actions: Actions = { default: signOut };
```

> **Customisation** – The `signInPage` and `signOutPage` props on the components let you override the default routes.

---

## 5. Client‑side sign‑in / sign‑out

`@auth/sveltekit/client` exposes two helper functions that work in the browser:

```svelte
<!-- src/routes/+page.svelte -->
<script>
  import { signIn, signOut } from "@auth/sveltekit/client";
  let password;
</script>

<nav>
  <p>
    These actions are all using the methods exported from
    <code>@auth/sveltekit/client</code>
  </p>

  <div class="actions">
    <div class="wrapper-form">
      <button on:click={() => signIn("github")}>Sign In with GitHub</button>
    </div>

    <div class="wrapper-form">
      <button on:click={() => signIn("discord")}>Sign In with Discord</button>
    </div>

    <div class="wrapper-form">
      <div class="input-wrapper">
        <label for="password">Password</label>
        <input
          bind:value={password}
          type="password"
          id="password"
          name="password"
          required
        />
      </div>

      <button on:click={() => signIn("credentials", { password })}>
        Sign In with Credentials
      </button>

      <button on:click={() => signOut()}>Sign Out</button>
    </div>
  </div>
</nav>
```

---

## 6. Making the session available to all routes

Add a `+layout.server.ts` that loads the session and injects it into the `$page` store:

```ts
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
```

Now `$page.data.session` is available in every page.

---

## 7. Authorization – protecting routes

### 7.1 Per‑component (per‑page)

```ts
// src/routes/protected/+page.server.ts
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth();
  if (!session?.user) throw redirect(303, "/auth");
  return {};
};
```

> **Important** – Always fetch the session from `event.locals.auth()` inside the page load, not from the `$page` store.  
> The store may be stale if the layout load didn’t run.

### 7.2 Per‑path (middleware)

```ts
// src/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub],
});
```

```ts
// src/hooks.server.ts
import { redirect, type Handle } from "@sveltejs/kit";
import { handle as authenticationHandle } from "./auth";
import { sequence } from "@sveltejs/kit/hooks";

async function authorizationHandle({ event, resolve }) {
  // Protect any routes under /authenticated
  if (event.url.pathname.startsWith("/authenticated")) {
    const session = await event.locals.auth();
    if (!session) throw redirect(303, "/auth/signin");
  }
  return resolve(event);
}

export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
```

> **Tip** – `sequence` lets you chain multiple middleware functions.

---

## 8. Notes

* If you enable prerendering, links to the default sign‑in page (`<a href="/auth/signin">`) will break. Use the built‑in components or client‑side helpers instead.
* The callback URL for providers defaults to `[origin]/auth/callback/[provider]`. Override `SvelteKitAuthConfig.basePath` if you need a different path.

---

## 9. Error types

### 9.1 `AuthError`

```ts
class AuthError extends Error {
  cause?: Record<string, unknown> & { err: Error };
  err?: Error;
  type: ErrorType;
}
```

### 9.2 `CredentialsSignin`

Thrown by the `authorize` callback of the Credentials provider.

```ts
class CredentialsSignin extends SignInError {
  code: string;          // e.g. "credentials"
  static type: string;   // "CredentialsSignin"
}
```

> **Security** – The `code` is exposed in the query string. Keep it generic (e.g. “Invalid credentials”) to avoid leaking sensitive information.

---

## 10. Core types (excerpt)

```ts
// TokenSet (returned by OAuth providers)
interface TokenSet {
  access_token?: string;
  authorization_details?: AuthorizationDetails[];
  expires_at?: number;   // timestamp in seconds
  expires_in?: number;
  id_token?: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  type: ProviderType;
  userId?: string;
}

// Session
interface Session extends DefaultSession {
  expires: string;
  user?: User;
}

// User
interface User extends DefaultUser {
  email?: string | null;
  id?: string;
  image?: string | null;
  name?: string | null;
}
```

---

## 11. Custom fetch (advanced)

If you need to route provider requests through a corporate proxy or add custom headers, override the default fetch:

```ts
import { Auth, customFetch } from "@auth/core";
import GitHub from "@auth/core/providers/github";
import { ProxyAgent } from "undici";

const dispatcher = new ProxyAgent("my.proxy.server");

function proxy(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
  return undici(args[0], { ...(args[1] ?? {}), dispatcher });
}

const response = await Auth(request, {
  providers: [GitHub({ [customFetch]: proxy })],
});
```

---

## 12. Summary

1. **Install** `@auth/sveltekit`.  
2. **Create** `auth.ts` with `SvelteKitAuth`.  
3. **Export** `handle` from `hooks.server.ts`.  
4. **Use** `<SignIn />` / `<SignOut />` or client‑side helpers.  
5. **Load** the session in a layout or page.  
6. **Protect** routes via page loads or middleware.  

Happy coding! 🚀