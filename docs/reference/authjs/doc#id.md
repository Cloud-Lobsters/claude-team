# @auth/sveltekit – Official SvelteKit integration for Auth.js

> **⚠️** `@auth/sveltekit` is currently experimental.  
> The API may change in future releases.

This documentation covers the most common use‑cases for adding authentication to a SvelteKit app with Auth.js.  
All code snippets are ready to copy‑paste into your project.

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

Create an `auth.ts` file in the project root (or wherever you prefer) and export the `handle`, `signIn` and `signOut` helpers:

```ts
// src/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [GitHub],
});
```

Re‑export the `handle` in your SvelteKit hooks:

```ts
// src/hooks.server.ts
export { handle } from "./auth";
```

> **Tip** – The `AUTH_SECRET` environment variable must be set (≥ 32 random characters).  
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

## 4. Sign‑In / Sign‑Out Components (Server‑Side)

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

> The `signInPage` and `signOutPage` props on the components let you override the default routes.

---

## 5. Client‑Side Sign‑In / Sign‑Out

If you prefer to trigger authentication from client‑side code, import the helpers from `@auth/sveltekit/client`:

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

## 6. Making the Session Available to All Routes

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

## 7. Authorization – Protecting Routes

### 7.1 Per‑Component (per‑page)

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

### 7.2 Per‑Path (handle hook)

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

> The `sequence` helper runs the authentication middleware first, then your custom authorization logic.

---

## 8. Notes

* If you enable prerendering, links to the default sign‑in page (`<a href="/auth/signin">`) will break.  
  Use the provided components or client‑side helpers instead.
* The callback URL for providers defaults to `[origin]/auth/callback/[provider]`.  
  Override `SvelteKitAuthConfig.basePath` if you need a different path.

---

## 9. Error Types

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

> The `code` is appended to the redirect URL (`?error=CredentialsSignin&code=credentials`).  
> Never expose sensitive information in this code.

---

## 10. Advanced – Custom Fetch

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

> See the official guides for corporate‑proxy support and the `customFetch` documentation.

---

## 11. API Reference – `SvelteKitAuth`

```ts
SvelteKitAuth(config: SvelteKitAuthConfig | (event) => PromiseLike<SvelteKitAuthConfig>)
  : { handle: Handle; signIn: Action; signOut: Action }
```

* `handle` – SvelteKit `Handle` hook that authenticates every request.  
* `signIn` – Server‑side form action for signing in.  
* `signOut` – Server‑side form action for signing out.

---

## 12. Quick Start Checklist

1. **Install** `@auth/sveltekit`.  
2. **Create** `src/auth.ts` with your providers.  
3. **Export** `handle` in `src/hooks.server.ts`.  
4. **Add** `<SignIn />` / `<SignOut />` components or use client‑side helpers.  
5. **Load** the session in a layout if you need it globally.  
6. **Protect** routes via page loads or the handle hook.  
7. **Set** `AUTH_SECRET` (and `AUTH_TRUST_HOST` if needed).  

Happy coding! 🚀