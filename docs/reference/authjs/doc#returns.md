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

## 2. Basic Usage

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
> On Vercel you can generate one with `openssl rand -hex 32` or use https://generate-secret.vercel.app/32.

---

## 3. Lazy Initialization

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

## 4. Sign‑In / Sign‑Out

### 4.1 Server‑Side (Form Actions)

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

#### Server‑side actions

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

### 4.2 Client‑Side

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

## 5. Managing the Session

Add a layout load function to expose the session to all pages:

```ts
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
```

Now `$page.data.session` is available everywhere.

---

## 6. Handling Authorization

### 6.1 Per‑Component (Page‑level)

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

> **Important** – Always fetch the session from `event.locals.auth()` inside the load function; do not rely on the `$page` store.

### 6.2 Per‑Path (Handle Hook)

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

## 8. Error Types

| Error | Description | Key Properties |
|-------|-------------|----------------|
| **AuthError** | Base class for all Auth.js errors. | `cause?`, `err?`, `type` |
| **CredentialsSignin** | Thrown by the `authorize` callback of the Credentials provider. | `code`, `type` (static) |
| **Account** | Holds provider account data (extends `TokenSet`). | `access_token?`, `expires_at?`, `id_token?`, `provider`, `providerAccountId`, `refresh_token?`, `scope?`, `token_type?`, `type`, `userId?` |
| **DefaultSession** | Base session shape. | `expires`, `user?` |
| **Profile** | User info returned by OAuth providers. | `address?`, `birthdate?`, `email?`, `email_verified?`, `family_name?`, `gender?`, `given_name?`, `id?`, `locale?`, `middle_name?`, `name?`, `nickname?`, `phone_number?`, `picture?`, `preferred_username?`, `profile?`, `sub?`, `updated_at?`, `website?`, `zoneinfo?` |
| **Session** | Active session. | `expires`, `user?` |
| **User** | Shape of the returned object in the OAuth provider’s profile callback. | `email?`, `id?`, `image?`, `name?` |

---

## 9. Custom Fetch

If you need to override the default fetch (e.g. corporate proxy, custom headers), use the `customFetch` symbol:

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

## 10. API Reference

### `SvelteKitAuth(config)`

```ts
{
  handle: Handle;
  signIn: Action;
  signOut: Action;
}
```

* `config` – `SvelteKitAuthConfig` or async function returning it.

### `SvelteKitAuthConfig`

Re‑exports the core `SvelteKitAuthConfig` type.

---

## 11. Quick Start Summary

1. **Install** `@auth/sveltekit`.
2. **Create** `src/auth.ts` with `SvelteKitAuth`.
3. **Export** `handle` in `hooks.server.ts`.
4. **Add** sign‑in/out components or client helpers.
5. **Expose** session via a layout load.
6. **Protect** routes with page loads or a handle hook.

Happy coding! 🚀