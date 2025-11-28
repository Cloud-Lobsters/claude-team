# @auth/sveltekit – Official SvelteKit integration for Auth.js

> **⚠️ Experimental** – the API may change in future releases.

This guide shows how to add authentication to a SvelteKit app with only a few lines of code.  
All examples below are fully functional – copy‑paste them into your project and you’re good to go.

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

Create an `auth.ts` file in the project root (or wherever you prefer):

```ts
// src/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub],
});
```

Export the `handle` function in `hooks.server.ts` so SvelteKit can use it for every request:

```ts
// src/hooks.server.ts
export { handle } from "./auth";
```

> **Tip** – `AUTH_SECRET` must be set in your environment.  
> Minimum 32 random characters (e.g. `openssl rand -hex 32`).

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

## 4. Signing in / Signing out

### 4.1 Server‑side (form actions)

#### 4.1.1 Front‑end

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

#### 4.1.2 Form actions

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

> The `signInPage` and `signOutPage` props on the components let you override the default routes.

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

## 5. Making the session available to all routes

Add a layout load that attaches the session to `$page.data`:

```ts
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
```

Now `$page.data.session` is populated everywhere.

---

## 6. Handling authorization

### 6.1 Per‑component (per‑page)

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

> **Important** – always fetch the session from `event.locals.auth()` inside the load function; never rely on the `$page` store in a server load.

### 6.2 Per‑path (handle hook)

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

Now every route under `/authenticated` is protected automatically.

---

## 7. Notes

* If you enable prerendering, avoid using `<a href="/auth/signin">` – use the built‑in components or client‑side helpers instead.
* `AUTH_TRUST_HOST=true` is required when deploying outside Vercel (e.g., Cloudflare Pages, Netlify).

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
  static type: string;   // e.g. "CredentialsSignin"
}
```

---

## 9. Types

| Type | Extends | Key properties |
|------|---------|----------------|
| `Account` | `Partial<TokenEndpointResponse>` | `access_token`, `id_token`, `provider`, `providerAccountId`, `refresh_token`, `type`, `userId` |
| `DefaultSession` | – | `expires`, `user?` |
| `Session` | `DefaultSession` | – |
| `User` | `DefaultUser` | `email?`, `id?`, `image?`, `name?` |
| `Profile` | – | OpenID Connect standard claims (`email`, `name`, `picture`, …) |

---

## 10. Custom fetch

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

* `handle` – SvelteKit hook that processes every request.
* `signIn` – Server‑side form action for signing in.
* `signOut` – Server‑side form action for signing out.

---

## 12. Quick start checklist

1. Install `@auth/sveltekit`.
2. Create `src/auth.ts` with `SvelteKitAuth`.
3. Export `handle` in `hooks.server.ts`.
4. Add `signIn`/`signOut` actions and components.
5. (Optional) Add layout load to expose session.
6. Protect routes via load functions or the handle hook.

Happy coding! 🚀