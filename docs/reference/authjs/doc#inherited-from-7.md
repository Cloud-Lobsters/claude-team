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
> On Vercel you can use `AUTH_TRUST_HOST=true` for other hosts.

The callback URL for providers defaults to:

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

## 4. Sign‑in / Sign‑out

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

Now `$page.data.session` is available in every page.

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

> **Important** – Always read the session from `event.locals.auth()` inside `load`.  
> Do **not** rely on `$page.data.session` in a `+page.server.ts` load.

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

---

## 7. Notes

* When prerendering, avoid `<a href="/auth/signin">` links; use the built‑in components or client‑side helpers.
* The `AUTH_TRUST_HOST` flag should be set to `true` on non‑Vercel hosts.

---

## 8. Error types

| Error | Description | Key properties |
|-------|-------------|----------------|
| **AuthError** | Base class for all Auth.js errors. | `cause?`, `err?`, `type` |
| **CredentialsSignin** | Thrown by the `authorize` callback of the Credentials provider. | `code`, `type` (static) |

> **Security tip** – Never expose sensitive error details in the `code` query parameter.

---

## 9. Core types (excerpt)

```ts
// Auth.js core types (simplified)

interface Account extends Partial<TokenEndpointResponse> {
  provider: string;
  providerAccountId: string;
  type: ProviderType;
  userId?: string;
}

interface Session extends DefaultSession {
  user?: User;
}

interface User extends DefaultUser {
  email?: string | null;
  image?: string | null;
  name?: string | null;
}
```

---

## 10. Custom fetch (advanced)

```ts
import { Auth, customFetch } from "@auth/core";
import GitHub from "@auth/core/providers/github";
import { ProxyAgent } from "undici";

const dispatcher = new ProxyAgent("my.proxy.server");
function proxy(...args: Parameters<typeof fetch>) {
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

* `config` – `SvelteKitAuthConfig` or a function `(event) => PromiseLike<SvelteKitAuthConfig>`.

### `SvelteKitAuthConfig`

Re‑exports the core `SvelteKitAuthConfig` type.

---

## 12. Further reading

* [Auth.js docs](https://authjs.dev/)
* [SvelteKit handle hooks](https://kit.svelte.dev/docs/hooks)
* [Token rotation guide](https://authjs.dev/guides/refresh-token-rotation#database-strategy)

---

**Happy coding!**