# @auth/sveltekit – Official SvelteKit integration for Auth.js

> **⚠️** `@auth/sveltekit` is currently experimental. The API may change.

This documentation covers the most common use‑cases for adding authentication to a SvelteKit app with Auth.js.  
All code snippets are fully runnable – copy them into your project and you’re good to go.

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

When you need to read environment variables from the request (e.g. Cloudflare Workers), pass an async function to `SvelteKitAuth`:

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
> `AUTH_TRUST_HOST=true` is required when deploying outside Vercel (e.g. Cloudflare Pages, Netlify).

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

`@auth/sveltekit/client` exposes two helper functions that can be called from any component:

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

### 7.1 Per‑component (recommended)

Add logic to the page’s `+page.server.ts`:

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

> **Important** – Always read the session from `event.locals.auth()` inside the load function.  
> Do **not** rely on the `$page` store in a `+page.server.ts` load.

### 7.2 Per‑path (middleware)

Use the `handle` hook returned by `SvelteKitAuth` and chain it with a custom authorisation hook:

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

Now every request to `/authenticated/*` is automatically protected.

---

## 8. Notes

* If you enable prerendering, links to the default sign‑in page (`<a href="/auth/signin">`) will break.  
  Use the built‑in components or client‑side helpers instead.
* The callback URL for providers defaults to `[origin]/auth/callback/[provider]`.  
  Override `SvelteKitAuthConfig.basePath` if you need a different path.

---

## 9. Error classes

### 9.1 `AuthError`

```ts
class AuthError extends Error {
  cause?: Record<string, unknown> & { err: Error };
  err?: Error;
  type: ErrorType;
}
```

*Used for all Auth.js errors.*

### 9.2 `CredentialsSignin`

Thrown from the `authorize` callback of the Credentials provider.

```ts
class CredentialsSignin extends SignInError {
  code: string;          // e.g. "credentials"
  static type: string;   // "CredentialsSignin"
}
```

*If thrown in a framework that handles form actions, the error is thrown instead of redirecting.*

---

## 10. Types

Below are the most common types you’ll encounter. They are re‑exported from `@auth/sveltekit`.

| Type | Description |
|------|-------------|
| `Account` | OAuth account information (extends `TokenSet`). |
| `DefaultSession` | Base session shape. |
| `Session` | Active session (extends `DefaultSession`). |
| `User` | User profile returned by OAuth providers. |
| `Profile` | Standard OpenID Connect claims. |
| `SvelteKitAuthConfig` | Configuration object for `SvelteKitAuth`. |
| `customFetch` | Symbol to override the default fetch used by providers. |

---

## 11. Example: Using a custom fetch (corporate proxy)

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

## 12. Quick reference – `SvelteKitAuth`

```ts
SvelteKitAuth(config: SvelteKitAuthConfig | (event) => PromiseLike<SvelteKitAuthConfig>) => {
  handle: Handle;   // SvelteKit hook
  signIn: Action;   // Server‑side form action
  signOut: Action;  // Server‑side form action
}
```

---

### 🎉 You’re ready to add authentication to your SvelteKit app!  
Happy coding!