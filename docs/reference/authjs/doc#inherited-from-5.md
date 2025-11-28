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

Export the `handle` function in `hooks.server.ts` so SvelteKit can use it:

```ts
// src/hooks.server.ts
export { handle } from "./auth";
```

> **Tip** – `AUTH_SECRET` must be set in your environment.  
> Minimum 32‑character random string (e.g. `openssl rand -hex 32`).

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

#### 4.1.1 Front‑end component

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

#### 4.1.2 Form‑action routes

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

## 5. Managing the session

Add a layout load function so `$page.data.session` is available everywhere:

```ts
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
```

---

## 6. Handling authorization

### 6.1 Per‑component (recommended)

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

> **Important** – always read the session from `event.locals.auth()` inside `load`.  
> Do **not** rely on `$page.data.session` in a `+page.server.ts` load.

### 6.2 Per‑path (middleware)

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

* If you enable prerendering, avoid using `<a href="/auth/signin">` – use the built‑in components or client‑side helpers instead.
* The callback URL for providers defaults to `[origin]/auth/callback/[provider]`. Override `SvelteKitAuthConfig.basePath` if you need a different path.

---

## 8. Error types

| Error | Description | Key properties |
|-------|-------------|----------------|
| **AuthError** | Base class for all Auth.js errors. | `cause?`, `err?`, `type` |
| **CredentialsSignin** | Thrown by the `authorize` callback of the Credentials provider. | `code`, `type` |
| **Account** | Holds provider account data (extends `TokenSet`). | `access_token?`, `expires_at?`, `id_token?`, `provider`, `providerAccountId`, `refresh_token?`, `scope?`, `token_type?`, `type`, `userId?` |
| **DefaultSession** | Base session shape. | `expires`, `user?` |
| **Profile** | User info returned by OAuth providers. | `address?`, `birthdate?`, `email?`, `email_verified?`, `family_name?`, `gender?`, `given_name?`, `id?`, `locale?`, `middle_name?`, `name?`, `nickname?`, `phone_number?`, `picture?`, `preferred_username?`, `profile?`, `sub?`, `updated_at?`, `website?`, `zoneinfo?` |
| **Session** | Active session. | `expires`, `user?` |
| **User** | Shape of the returned object in the OAuth provider’s profile callback. | `email?`, `id?`, `image?`, `name?` |

---

## 9. Custom fetch (advanced)

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

## 10. API reference

### `SvelteKitAuth(config)`

```ts
{
  handle: Handle;
  signIn: Action;
  signOut: Action;
}
```

* `config` – `SvelteKitAuthConfig` or an async function returning it.

### `SvelteKitAuthConfig`

Re‑exports the core Auth.js config with SvelteKit‑specific additions (e.g. `basePath`).

---

## 11. Quick start checklist

1. Install `@auth/sveltekit`.
2. Create `src/auth.ts` with `SvelteKitAuth`.
3. Export `handle` in `hooks.server.ts`.
4. Add `signIn`/`signOut` routes or use client‑side helpers.
5. (Optional) Add layout load to expose session.
6. Protect routes via `+page.server.ts` or middleware.

Happy coding! 🚀