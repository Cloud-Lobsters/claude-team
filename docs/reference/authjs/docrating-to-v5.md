# Migrating from **NextAuth.js v4** to **v5**

> This guide walks you through the changes introduced in NextAuth.js v5 and shows you how to update your project.  
> All code examples from the original migration guide are preserved.

---

## 1. Overview

NextAuth.js v5 is a major rewrite that introduces:

* **App‑Router first** – the new `auth.ts` file lives at the repository root.
* **Universal `auth()`** – a single function that replaces `getServerSession`, `getSession`, `withAuth`, `getToken`, and `useSession`.
* **Edge‑compatible** – built on standard Web APIs; no Next.js‑specific imports.
* **Stricter OAuth/OIDC compliance** – some providers may need updates.
* **OAuth 1.0 support removed** – the `oauth_token` columns can be dropped.
* **New environment‑variable prefix** – `AUTH_` instead of `NEXTAUTH_`.

---

## 2. Installation

```bash
# npm
npm install next-auth@beta

# pnpm
pnpm add next-auth@beta

# yarn
yarn add next-auth@beta

# bun
bun add next-auth@beta
```

> **Tip**: The `@beta` tag is required until the 5.0.0 release is published.

---

## 3. New Features

| Feature | What it means |
|---------|---------------|
| **App‑Router‑first** | `auth.ts` lives at the repo root; `pages/` still works. |
| **OAuth on preview deployments** | OAuth flows now work on Vercel preview URLs. |
| **Simplified setup** | Shared config, inferred env variables. |
| **New `account()` callback** | Added to provider callbacks. |
| **Edge‑compatible** | Runs in any environment that supports the Web API. |
| **Universal `auth()`** | One function for all server‑side auth needs. |

---

## 4. Breaking Changes

| Area | Old | New |
|------|-----|-----|
| OAuth spec | Looser compliance | Stricter OAuth/OIDC |
| OAuth 1.0 | Supported | Deprecated |
| Minimum Next.js | 13.x | **14.0** |
| Imports | `next-auth/next`, `next-auth/middleware` | `next-auth` only |
| ID token handling | `idToken: false` disables ID token check | Still visits `userinfo_endpoint` |
| Environment variables | `NEXTAUTH_*` | `AUTH_*` |
| Adapter packages | `@next-auth/*-adapter` | `@auth/*-adapter` |
| Cookie prefix | `next-auth` | `authjs` |

---

## 5. Migration Steps

### 5.1 Create a Root `auth.ts`

```ts
// ./auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
});
```

* The file can be named anything, but `auth.ts` is conventional.
* No need to install `@auth/core` for provider imports – they come from `next-auth`.

### 5.2 Update API Route

```ts
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
```

* The old `[...nextauth]` route becomes a thin wrapper around the exported handlers.

### 5.3 Replace Server‑Side Auth Calls

| Context | Old | New |
|---------|-----|-----|
| Server Component | `getServerSession(authOptions)` | `auth()` |
| Middleware | `withAuth(middleware, subset)` | `auth()` wrapper |
| API Route (Node.js) | `getServerSession(req, res, authOptions)` | `auth(req, res)` |
| API Route (Edge) | Not supported | `auth()` wrapper |
| `getServerSideProps` | `getServerSession(ctx.req, ctx.res, authOptions)` | `auth(ctx)` |
| `getServerSideProps` token | `getToken(ctx.req)` | `auth(req, res)` |

**Example – Server Component**

```tsx
// app/page.tsx
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return <p>Welcome {session?.user.name}!</p>;
}
```

**Example – Middleware**

```ts
// middleware.ts
import { auth } from "@/auth";

export default auth(async function middleware(req) {
  // custom logic
});
```

---

## 6. Adapters

### 6.1 Install the New Scope

```bash
# Prisma
npm install @auth/prisma-adapter

# TypeORM
npm install @auth/typeorm-adapter

# ...etc
```

> **Do not** use `@next-auth/*-adapter`.

### 6.2 Example – Prisma Adapter

```ts
// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
```

---

## 7. Database Migrations

* **OAuth 1.0 columns** (`oauth_token`, `oauth_token_secret`) can be removed.
* **Provider‑specific columns** (e.g., `refresh_token_expires_in`) are optional; remove if unused.
* If you use them, return the values via the new `account()` callback.

---

## 8. Edge Compatibility

If your adapter or ORM isn’t Edge‑ready, split the config:

```ts
// auth.config.ts
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default { providers: [GitHub] } satisfies NextAuthConfig;
```

```ts
// auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
```

```ts
// middleware.ts
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  // custom logic
});
```

---

## 9. Environment Variables

| Variable | Purpose | Notes |
|----------|---------|-------|
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | Provider credentials | Auto‑detected |
| `AUTH_URL` | Base URL | Auto‑detected from request headers; optional |
| `AUTH_TRUST_HOST` | Trust proxy headers | Equivalent to `trustHost: true` |
| `AUTH_SECRET` | Session encryption | Required; no need to pass in config |

> **Remove** any `NEXTAUTH_*` variables; they are no longer used.

---

## 10. TypeScript

* `NextAuthOptions` → `NextAuthConfig`.
* Types are re‑exported from framework packages:

```ts
export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";
```

* Adapter types are available from `next-auth/adapters`, `@auth/sveltekit/adapters`, etc.

---

## 11. Cookies

The cookie prefix changed from `next-auth` to `authjs`.

---

## 12. Summary

1. **Install** `next-auth@beta`.
2. **Create** `auth.ts` at the repo root.
3. **Export** `{ auth, handlers, signIn, signOut }`.
4. **Replace** old API routes and auth calls with the new exports.
5. **Update** adapters to the `@auth/*-adapter` scope.
6. **Adjust** database schema if you used OAuth 1.0 or provider‑specific columns.
7. **Split** config for Edge‑compatibility if needed.
8. **Migrate** environment variables to the `AUTH_` prefix.
9. **Update** TypeScript types.

> If you run into issues, open a GitHub issue or join the Discord community.

---