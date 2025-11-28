# @auth/sveltekit – Official SvelteKit integration for Auth.js

> **⚠️ Experimental** – the API may change in future releases.

This guide shows how to add authentication to a SvelteKit app with only a few lines of code.  
All examples are kept verbatim from the official documentation.

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

Export the `handle` function in `hooks.server.ts`:

```ts
// src/hooks.server.ts
export { handle } from "./auth";
```

> **Important** – set the `AUTH_SECRET` environment variable (≥ 32 random characters).  
> For non‑Vercel deployments, also set `AUTH_TRUST_HOST=true`.

The callback URL for each provider must be:

```
[origin]/auth/callback/[provider]
```

---

## 3. Lazy initialization

Useful when environment variables are available only at request time (e.g. Cloudflare Workers).

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

## 4. Signing in / Signing out

### 4.1 Server‑side (form actions)

#### Front‑end

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

#### Server actions

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

Add a layout load that injects the session into `$page.data`:

```ts
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
```

Now `$page.data.session` is available in every route.

---

## 6. Handling authorization

### 6.1 Per component (page)

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

> **Never** put this logic in a `+layout.server.ts`; it may not run for all leaf routes.

### 6.2 Per path (handle hook)

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

---

## 7. Notes

* When prerendering, avoid `<a href="/auth/signin">` links; use the provided components or functions instead.
* The `AUTH_SECRET` must be at least 32 characters long.
* For non‑Vercel hosts, set `AUTH_TRUST_HOST=true`.

---

## 8. Error types

### 8.1 `AuthError`

```ts
class AuthError extends Error {
  cause?: Record<string, unknown> & { err: Error };
  err?: Error;
  type: ErrorType;
}
```

### 8.2 `CredentialsSignin`

Thrown by the `authorize` callback of the Credentials provider.

```ts
class CredentialsSignin extends SignInError {
  code: string;          // appears in the redirect URL
  static type: string;   // error type
}
```

---

## 9. Core types

| Type | Description |
|------|-------------|
| `Account` | OAuth account information (extends `TokenSet`). |
| `DefaultSession` | Base session shape. |
| `Profile` | User profile returned by OAuth provider. |
| `Session` | Active session (extends `DefaultSession`). |
| `User` | User object returned by provider callbacks. |

---

## 10. Custom fetch

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

## 11. API reference

### `SvelteKitAuth(config)`

```ts
{
  handle: Handle;
  signIn: Action;
  signOut: Action;
}
```

* `config` – `SvelteKitAuthConfig` or a function that returns it.

### `SvelteKitAuthConfig`

Re‑exports the core `SvelteKitAuthConfig` type.

---

## 12. Further reading

* [Auth.js documentation](https://authjs.dev/)
* [SvelteKit handle hooks](https://kit.svelte.dev/docs/hooks)
* [Corporate proxy guide](https://authjs.dev/guides/corporate-proxy)

---