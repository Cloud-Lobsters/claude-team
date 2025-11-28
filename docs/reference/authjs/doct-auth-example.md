# SvelteKit Auth – Example App

> **⚠️ This repository is a *full‑stack* example that demonstrates how to integrate Auth.js (formerly NextAuth.js) with a SvelteKit application.**  
> It is meant for learning and experimentation – not for production use out of the box.

---

## Table of Contents

| Section | Description |
|---------|-------------|
| [Overview](#overview) | What this example shows |
| [Getting Started](#getting-started) | Quick deployment & local setup |
| [Environment Variables](#environment-variables) | What you need to configure |
| [Configuration Files](#configuration-files) | Key config snippets |
| [Using Auth.js in SvelteKit](#using-authjs-in-sveltekit) | How to sign‑in, sign‑out, and protect routes |
| [Examples](#examples) | Code snippets that illustrate the concepts |
| [Contributing](#contributing) | How to help |
| [License](#license) | Legal stuff |

---

## Overview

This example demonstrates:

* **Auth.js** (the successor of NextAuth.js) integrated with **SvelteKit**.
* OAuth2 providers (e.g. GitHub, Google) and email‑password authentication.
* Server‑side session handling with `@auth/sveltekit`.
* A minimal UI that shows how to access the session data in components.

---

## Getting Started

### Deploy to Vercel

> You can deploy this example instantly to Vercel with a single click:

```bash
# In your terminal
npx vercel --prod
```

> Or click the button on the repo page:  
> <https://sveltekit-auth-example.vercel.app>

### Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/nextauthjs/sveltekit-auth-example.git
cd sveltekit-auth-example

# 2. Install dependencies
pnpm install          # or npm i / yarn

# 3. Copy the example env file
cp .env.example .env

# 4. Edit .env with your own credentials (see below)

# 5. Start the dev server
pnpm dev
```

Open `http://localhost:5173` in your browser.

---

## Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```dotenv
# Auth.js secret – keep this private
AUTH_SECRET=super-secret-key

# Example provider: GitHub
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Example provider: Google
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Optional: Email provider
EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
EMAIL_FROM=example@example.com
```

> **Tip:** Use a service like [Vercel Secrets](https://vercel.com/docs/concepts/projects/environment-variables) for production.

---

## Configuration Files

### `svelte.config.js`

```js
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { sveltekit } from '@sveltejs/kit/vite';

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    vite: {
      plugins: [sveltekit()]
    }
  }
};
```

### `vite.config.js`

```js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()]
});
```

### `tsconfig.json`

```json
{
  "extends": "@sveltejs/kit/tsconfig.json",
  "compilerOptions": {
    "types": ["@sveltejs/kit", "@auth/sveltekit"]
  }
}
```

### `package.json`

```json
{
  "name": "sveltekit-auth-example",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@auth/sveltekit": "^0.1.0",
    "@sveltejs/adapter-auto": "^1.0.0",
    "@sveltejs/kit": "^1.0.0",
    "svelte": "^4.0.0"
  },
  "devDependencies": {
    "svelte-preprocess": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

---

## Using Auth.js in SvelteKit

### 1. Create the Auth.js API route

Create `src/routes/api/auth/[...auth].ts`:

```ts
import { auth } from '@auth/sveltekit';

export const GET = auth();
export const POST = auth();
export const DELETE = auth();
```

### 2. Sign‑in & Sign‑out UI

`src/routes/+page.svelte`:

```svelte
<script lang="ts">
  import { session } from '$app/stores';
  import { signIn, signOut } from '@auth/sveltekit';
  import { onMount } from 'svelte';

  let user: any;

  onMount(() => {
    const unsubscribe = session.subscribe((s) => (user = s?.user));
    return unsubscribe;
  });
</script>

{#if user}
  <p>Welcome, {user.name}!</p>
  <button on:click={() => signOut()}>Sign out</button>
{:else}
  <button on:click={() => signIn('github')}>Sign in with GitHub</button>
{/if}
```

### 3. Protect a route

`src/routes/protected/+page.server.ts`:

```ts
import { auth } from '@auth/sveltekit';

export const load = auth({
  // Redirect to sign‑in if not authenticated
  redirectTo: '/api/auth/signin'
});
```

`src/routes/protected/+page.svelte`:

```svelte
<script lang="ts">
  export let data;
</script>

<h1>Protected Page</h1>
<p>Hello, {data.user?.name}!</p>
```

---

## Examples

Below are the key code snippets that illustrate the concepts above.

### Example 1 – `.env.example`

```dotenv
AUTH_SECRET=super-secret-key
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### Example 2 – `src/routes/api/auth/[...auth].ts`

```ts
import { auth } from '@auth/sveltekit';

export const GET = auth();
export const POST = auth();
export const DELETE = auth();
```

### Example 3 – Sign‑in button

```svelte
<button on:click={() => signIn('github')}>Sign in with GitHub</button>
```

### Example 4 – Protected route load

```ts
export const load = auth({
  redirectTo: '/api/auth/signin'
});
```

---

## Contributing

Feel free to open issues or pull requests.  
See the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

---

## License

This project is licensed under the ISC license – see the [LICENSE](LICENSE) file for details.