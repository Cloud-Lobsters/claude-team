# @auth/sveltekit – Official SvelteKit integration for Auth.js

> **⚠️** `@auth/sveltekit` is currently experimental. The API may change.

This guide shows how to add authentication to a SvelteKit app in a few lines of code, covering installation, configuration, lazy‑initialisation, sign‑in/out flows, session handling, and route protection.

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

Create an `auth.ts` file in the project root:

```ts
// src/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub],
});
```

Export the `handle` hook in `hooks.server.ts`:

```ts
// src/hooks.server.ts
export { handle } from "./auth";
```

> **Tip** – Set the `AUTH_SECRET` environment variable (≥ 32 random characters).  
> On Vercel you can use `AUTH_TRUST_HOST=true` for other hosts like Cloudflare Pages or Netlify.

The callback URL for providers defaults to:

```
[origin]/auth/callback/[provider]
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

---

## 4. Sign‑in / Sign‑out

### 4.1 Server‑side (form actions)

`@auth/sveltekit` ships `<SignIn />` and `<SignOut />` components that use SvelteKit’s form actions.

**Frontend**

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

**Form actions**

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

### 4.2 Client‑side

Exported helpers from `@auth/sveltekit/client` allow you to trigger sign‑in/out from the browser.

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
        <input bind:value={password} type="password" id="password" name="password" required />
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

## 5. Managing the session

To make the session available to all routes, load it in the root layout:

```ts
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
```

The returned object is merged into `$page.data`, so you can access it via `$page.data.session`.

---

## 6. Handling authorization

### 6.1 Per‑component (per‑page)

Protect a single page by checking the session in its `+page.server.ts`:

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

> **Important** – Always read the session from `event.locals.auth()` inside the load function; do not rely on the `$page` store for protection logic.

### 6.2 Per‑path (handle hook)

You can protect entire URI prefixes by extending the `handle` hook:

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
  if (event.url.pathname.startsWith("/authenticated")) {
    const session = await event.locals.auth();
    if (!session) throw redirect(303, "/auth/signin");
  }
  return resolve(event);
}

export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
```

Now any route under `/authenticated` is automatically protected.

---

## 7. Notes

* If you enable prerendering, links to the default sign‑in page (`<a href="/auth/signin">`) will break. Use the provided components or client helpers instead.
* The `AUTH_TRUST_HOST` variable should be set to `true` when deploying outside Vercel (e.g., Cloudflare Pages, Netlify).

---

## 8. Error types

### 8.1 `AuthError`

Base error class for all Auth.js errors.

```ts
class AuthError extends Error {
  cause?: Record<string, unknown> & { err: Error };
  err?: Error;
  type: ErrorType;
}
```

### 8.2 `CredentialsSignin`

Thrown from the `authorize` callback of the Credentials provider.

```ts
class CredentialsSignin extends SignInError {
  code: string;          // appears in the redirect URL
  static type: string;   // e.g. "CredentialsSignin"
}
```

---

## 9. Types

### 9.1 `Account`

```ts
interface Account extends Partial<TokenEndpointResponse> {
  provider: string;
  providerAccountId: string;
  type: ProviderType;
  userId?: string;
}
```

### 9.2 `DefaultSession`

```ts
interface DefaultSession {
  expires: string;
  user?: User;
}
```

### 9.3 `Session`

```ts
interface Session extends DefaultSession {
  // same as DefaultSession
}
```

### 9.4 `User`

```ts
interface User extends DefaultUser {
  email?: string | null;
  id?: string;
  image?: string | null;
  name?: string | null;
}
```

### 9.5 `Profile`

```ts
interface Profile {
  // OpenID Connect standard claims
  address?: null | { ... };
  birthdate?: null | string;
  email?: null | string;
  email_verified?: null | boolean;
  family_name?: null | string;
  gender?: null | string;
  given_name?: null | string;
  id?: null | string;
  locale?: null | string;
  middle_name?: null | string;
  name?: null | string;
  nickname?: null | string;
  phone_number?: null | string;
  picture?: any;
  preferred_username?: null | string;
  profile?: null | string;
  sub?: null | string;
  updated_at?: null | string | number | Date;
  website?: null | string;
  zoneinfo?: null | string;
}
```

---

## 10. Custom fetch

If you need to override the default fetch (e.g., corporate proxy), use the `customFetch` symbol:

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

## 11. `SvelteKitAuth` API

```ts
function SvelteKitAuth(
  config: SvelteKitAuthConfig | (event) => PromiseLike<SvelteKitAuthConfig>
): {
  handle: Handle;
  signIn: Action;
  signOut: Action;
}
```

* `handle` – SvelteKit `Handle` hook that processes all requests.  
* `signIn` – Server‑side form action for signing in.  
* `signOut` – Server‑side form action for signing out.

---

## 12. Summary

1. Install `@auth/sveltekit`.  
2. Create `auth.ts` with `SvelteKitAuth`.  
3. Export `handle` in `hooks.server.ts`.  
4. Use `<SignIn />` / `<SignOut />` components or client helpers.  
5. Load the session in the root layout.  
6. Protect routes via per‑page loads or a custom `handle` hook.

Happy coding!