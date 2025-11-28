# SvelteKit – Loading Data

This guide explains how to fetch and expose data to your pages and layouts in SvelteKit.  
All examples are kept verbatim from the official documentation and are wrapped in
proper code blocks for easy copy‑and‑paste.

---

## 1. Overview

Before a `+page.svelte` (or any `+layout.svelte`) component is rendered, you often need to
load data.  
Data is loaded via **load functions** that live in sibling `+page.js`/`+page.server.js`
or `+layout.js`/`+layout.server.js` files.

| File | Runs | Where it runs | Typical use |
|------|------|---------------|-------------|
| `+page.js` / `+layout.js` | **Universal** | Server (SSR) *and* Browser (hydration & client navigation) | Public data, API calls that don’t need secrets |
| `+page.server.js` / `+layout.server.js` | **Server‑only** | Server only | Private data, DB access, environment variables |

> **Tip** – If a route contains both a universal and a server load, the server load runs first.

---

## 2. Page Data

### 2.1. Basic Example

```ts
// src/routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    post: {
      title: `Title for ${params.slug} goes here`,
      content: `Content for ${params.slug} goes here`
    }
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>
```

### 2.2. Legacy Mode

Before SvelteKit 2.16.0 you had to type the props manually:

```ts
// +page.svelte
import type { PageData } from './$types';
let { data }: { data: PageData } = $props();
```

In Svelte 4 you can simply write:

```svelte
<script lang="ts">
  export let data;
</script>
```

### 2.3. Server‑only Load

```ts
// src/routes/blog/[slug]/+page.server.ts
import * as db from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  return {
    post: await db.getPost(params.slug)
  };
};
```

> **Note** – The type changes from `PageLoad` to `PageServerLoad` because server loads
> receive additional arguments (`cookies`, `locals`, etc.).

---

## 3. Layout Data

Layouts can also load data. The data is merged with child layouts and pages.

```ts
// src/routes/blog/[slug]/+layout.server.ts
import * as db from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  return {
    posts: await db.getPostSummaries()
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+layout.svelte -->
<script lang="ts">
  import type { LayoutProps } from './$types';
  let { data, children }: LayoutProps = $props();
</script>

<main>
  <!-- +page.svelte is rendered here -->
  {@render children()}
</main>

<aside>
  <h2>More posts</h2>
  <ul>
    {#each data.posts as post}
      <li>
        <a href="/blog/{post.slug}">{post.title}</a>
      </li>
    {/each}
  </ul>
</aside>
```

### 3.1. Accessing Parent Data

```ts
// src/routes/blog/[slug]/+page.svelte
<script lang="ts">
  import { page } from '$app/state';
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();

  // `data.posts` comes from the parent layout
  let index = $derived(data.posts.findIndex(post => post.slug === page.params.slug));
  let next = $derived(data.posts[index + 1]);
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>

{#if next}
  <p>Next post: <a href="/blog/{next.slug}">{next.title}</a></p>
{/if}
```

> If multiple load functions return the same key, the **last** one wins.

### 3.2. `page.data` in a Layout

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.data.title}</title>
</svelte:head>
```

> `page.data` is typed by `App.PageData`.  
> In Svelte 4 or earlier, use `$app/stores` instead of `$app/state`.

---

## 4. Universal vs Server Load

| Feature | Universal (`+page.js`) | Server (`+page.server.js`) |
|---------|------------------------|----------------------------|
| Runs on | Server (SSR) + Browser | Server only |
| Can access | `fetch`, `setHeaders`, `parent`, `depends`, `untrack` | Same, plus `cookies`, `locals`, `platform`, `request` |
| Return type | Any value (including Svelte components) | Must be serializable (JSON + BigInt, Date, Map, Set, RegExp, etc.) |
| Use case | Public API calls, data that can be fetched client‑side | DB queries, private env vars, authentication |

> **Example of both together**

```ts
// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async () => ({
  serverMessage: 'hello from server load function'
});
```

```ts
// src/routes/+page.ts
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ data }) => ({
  serverMessage: data.serverMessage,
  universalMessage: 'hello from universal load function'
});
```

---

## 5. Using URL Data

```ts
// src/routes/a/[b]/[...c]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = ({ route }) => {
  console.log(route.id); // '/a/[b]/[...c]'
};
```

`params` is derived from `url.pathname` and `route.id`.

```ts
// Example params
{
  "b": "x",
  "c": "y/z"
}
```

---

## 6. Making Fetch Requests

```ts
// src/routes/items/[id]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/items/${params.id}`);
  const item = await res.json();

  return { item };
};
```

* The provided `fetch` inherits cookies and auth headers on the server.  
* Relative URLs are resolved automatically on the server.  
* During SSR, the response is inlined into the HTML; during hydration it is read from the HTML.

---

## 7. Cookies

```ts
// src/routes/+layout.server.ts
import * as db from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const sessionid = cookies.get('sessionid');

  return {
    user: await db.getUser(sessionid)
  };
};
```

> Cookies are forwarded only to the same host or a sub‑domain of the SvelteKit app.

---

## 8. Headers

```ts
// src/routes/products/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, setHeaders }) => {
  const url = `https://cms.example.com/products.json`;
  const response = await fetch(url);

  // Cache the page’s HTML for the same duration as the underlying data
  setHeaders({
    age: response.headers.get('age'),
    'cache-control': response.headers.get('cache-control')
  });

  return response.json();
};
```

* `setHeaders` only works on the server.  
* You can set a header **once**; duplicate calls are an error.  
* Use `cookies.set()` for `Set-Cookie` headers.

---

## 9. Using Parent Data

```ts
// src/routes/+layout.ts
import type { LayoutLoad } from './$types';
export const load: LayoutLoad = () => ({ a: 1 });
```

```ts
// src/routes/abc/+layout.ts
import type { LayoutLoad } from './$types';
export const load: LayoutLoad = async ({ parent }) => {
  const { a } = await parent();
  return { b: a + 1 };
};
```

```ts
// src/routes/abc/+page.ts
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ parent }) => {
  const { a, b } = await parent();
  return { c: a + b };
};
```

```svelte
<!-- src/routes/abc/+page.svelte -->
<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<p>{data.a} + {data.b} = {data.c}</p>
```

> The `parent()` call returns merged data from all ancestor layouts.

---

## 10. Errors & Redirects

### 10.1. Throwing Errors

```ts
// src/routes/admin/+layout.server.ts
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
  if (!locals.user) {
    error(401, 'not logged in');
  }
  if (!locals.user.isAdmin) {
    error(403, 'not an admin');
  }
};
```

### 10.2. Redirects

```ts
// src/routes/user/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
  if (!locals.user) {
    redirect(307, '/login');
  }
};
```

> Do **not** wrap `redirect()` in a `try { … } catch { … }` block; it throws immediately.

---

## 11. Streaming with Promises

```ts
// src/routes/blog/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  return {
    // `await` happens last so comments can stream while post loads
    comments: loadComments(params.slug),
    post: await loadPost(params.slug)
  };
};
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>

{#await data.comments}
  Loading comments...
{:then comments}
  {#each comments as comment}
    <p>{comment.content}</p>
  {/each}
{:catch error}
  <p>error loading comments: {error.message}</p>
{/await}
```

> **Important** – On platforms that don’t support streaming (e.g. AWS Lambda),
> the page will render only after all promises resolve.

---

## 12. Parallel Loading & Rerunning

* All load functions run **concurrently** during navigation.  
* A load function reruns when:
  * A referenced `params` property changes.
  * A referenced `url` property changes (`pathname`, `search`, etc.).
  * `await parent()` is called and the parent reruns.
  * A dependency declared via `fetch()` or `depends()` is invalidated.
  * `invalidateAll()` is called.

### 12.1. Manual Invalidation

```ts
// src/routes/random-number/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, depends }) => {
  const response = await fetch('https://api.example.com/random-number');
  depends('app:random'); // custom dependency

  return { number: await response.json() };
};
```

```svelte
<!-- src/routes/random-number/+page.svelte -->
<script lang="ts">
  import { invalidate, invalidateAll } from '$app/navigation';
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();

  function rerunLoadFunction() {
    invalidate('app:random');
    invalidate('https://api.example.com/random-number');
    invalidate(url => url.href.includes('random-number'));
    invalidateAll();
  }
</script>

<p>random number: {data.number}</p>
<button on:click={rerunLoadFunction}>Update random number</button>
```

---

## 13. Authentication & `getRequestEvent`

```ts
// src/lib/server/auth.ts
import { redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';

export function requireLogin() {
  const { locals, url } = getRequestEvent();

  if (!locals.user) {
    const redirectTo = url.pathname + url.search;
    const params = new URLSearchParams({ redirectTo });
    redirect(307, `/login?${params}`);
  }

  return locals.user;
}
```

```ts
// src/routes/+page.server.ts
import { requireLogin } from '$lib/server/auth';

export function load() {
  const user = requireLogin();
  return { message: `hello ${user.name}!` };
}
```

> `getRequestEvent()` gives you access to `locals`, `url`, etc., without passing them
> through every load function.

---

## 14. Further Reading

* [Tutorial: Loading data](https://kit.svelte.dev/docs/load)
* [Tutorial: Errors and redirects](https://kit.svelte.dev/docs/errors)
* [Tutorial: Advanced loading](https://kit.svelte.dev/docs/advanced-loading)

---