# SvelteKit Auth – Authentication for SvelteKit

> **⚠️ Experimental** – The `@auth/sveltekit` package is still in early stages.  
> Use it in production only after you’ve verified it meets your security and stability requirements.

`@auth/sveltekit` is the first official authentication library for SvelteKit, built on top of the new `@auth/core` decoupled engine. It brings the same feature set that powers NextAuth.js to any SvelteKit project, including OAuth providers such as GitHub, Google, Facebook, and many more.

---

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
   - [Defining OAuth Providers](#defining-oauth-providers)
   - [Environment Variables](#environment-variables)
3. [Using the Client API](#using-the-client-api)
   - [Sign‑In / Sign‑Out Buttons](#sign‑in--sign‑out-buttons)
4. [Protecting Routes](#protecting-routes)
5. [Templates & Resources](#templates--resources)
6. [Contributing & Feedback](#contributing--feedback)

---

## 1. Installation

```bash
# npm
npm i @auth/sveltekit @auth/core

# pnpm
pnpm add @auth/sveltekit @auth/core

# yarn
yarn add @auth/sveltekit @auth/core
```

> **Tip** – If you’re starting a new project, you can use the official SvelteKit Auth template:
> ```bash
> npx degit authjs/sveltekit-auth-template my-app
> cd my-app
> pnpm install
> ```

---

## 2. Configuration

### 2.1 Defining OAuth Providers

Create a `src/hooks.server.ts` file (or `src/hooks.server.js` if you prefer JavaScript) and configure the authentication handler:

```ts
// src/hooks.server.ts
import SvelteKitAuth from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth({
  providers: [
    GitHub({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
});
```

> **What this does**  
> * `SvelteKitAuth` registers the auth middleware.  
> * `GitHub` is an OAuth provider that will redirect users to GitHub for authentication.  
> * The `clientId` and `clientSecret` come from your GitHub OAuth app.

### 2.2 Environment Variables

Store your secrets in a `.env` file (or your deployment platform’s secret store). For the example above:

```
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

> **Security note** – Never commit secrets to version control. Use `$env/static/private` to load them at build time.

---

## 3. Using the Client API

The client API exposes `signIn` and `signOut` helpers that you can call from any Svelte component.

```svelte
<script>
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
</script>

<p>
  {#if Object.keys($page.data.session || {}).length}
    {#if $page.data.session.user.image}
      <span
        style="background-image: url('{$page.data.session.user.image}')"
        class="avatar"
      />
    {/if}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>
        {$page.data.session.user.email || $page.data.session.user.name}
      </strong>
    </span>
    <button on:click={() => signOut()} class="button">Sign out</button>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <button on:click={() => signIn("github")}>Sign In with GitHub</button>
  {/if}
</p>
```

> **Explanation**  
> * `$page.data.session` is populated by the auth middleware.  
> * `signIn("github")` triggers the GitHub OAuth flow.  
> * `signOut()` logs the user out and clears the session.

You can place this logic in a shared layout if you want the UI to be available on multiple routes.

---

## 4. Protecting Routes

To restrict access to a page for authenticated users only, use the `load` function in the page’s `+page.ts` (or `+page.js`):

```ts
// src/routes/protected/+page.ts
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { session } = await parent();
  if (!session?.user) {
    throw redirect(302, "/");
  }
  return {};
};
```

> **How it works**  
> * `parent()` fetches the data from the root layout, which includes the session.  
> * If no user is present, the user is redirected to the home page.

---

## 5. Templates & Resources

* **SvelteKit Auth Template** – A starter project that includes the auth setup and a protected route example.  
  ```bash
  npx degit authjs/sveltekit-auth-template my-app
  cd my-app
  pnpm install
  ```

* **Documentation** – The official Auth.js docs are available on GitHub and the Auth.js website.  
* **Community** – Join the Auth.js Discord or follow the project on Twitter for updates.

---

## 6. Contributing & Feedback

We’re actively expanding Auth.js beyond Next.js. If you’d like to see support for another framework or have suggestions for SvelteKit Auth, let us know:

* **GitHub Issues** – Open an issue in the `@auth/sveltekit` repository.  
* **Twitter** – @authjs – share your thoughts.  
* **OpenCollective** – Sponsor the project to help us grow.

---

### Quick Checklist

- [ ] Install `@auth/sveltekit` and `@auth/core`.  
- [ ] Configure providers in `src/hooks.server.ts`.  
- [ ] Add `signIn` / `signOut` UI in your components.  
- [ ] Protect routes with a `load` function.  
- [ ] Keep secrets out of source control.  

Happy coding! 🚀