# SvelteKitAuthConfig

`SvelteKitAuthConfig` is the configuration object passed to the `SvelteKitAuth` helper.  
It extends `AuthConfig` (minus the `raw` property) and adds a few framework‑specific defaults.

> **Tip** – All examples below are taken directly from the official Auth.js documentation and are fully runnable.

---

## Table of Contents

- [Basic Options](#basic-options)
- [Callbacks](#callbacks)
- [Events](#events)
- [Experimental Features](#experimental-features)
- [JWT Options](#jwt-options)
- [Logger](#logger)
- [Pages](#pages)
- [Providers](#providers)
- [Redirect Proxy URL](#redirect-proxy-url)
- [Secret](#secret)
- [Session](#session)
- [Advanced Options](#advanced-options)
- [Full Example](#full-example)

---

## Basic Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `adapter?` | `Adapter` | – | Pass a database adapter (e.g. Prisma, MongoDB). |
| `basePath?` | `string` | `"/auth"` (or `"/api/auth"` for Next.js) | Base path of the Auth.js API endpoints. |
| `debug?` | `boolean` | `false` | Enables debug logs (ignored if `logger` is set). |
| `skipCSRFCheck?` | `typeof skipCSRFCheck` | – | Advanced CSRF‑check override. |
| `trustHost?` | `boolean` | – | Must be `true` if the host header is trusted. |
| `useSecureCookies?` | `boolean` | `false` on `http://`, `true` on `https://` | Controls the `Secure` flag on cookies. |

---

## Callbacks

Callbacks are async functions that let you customize the authentication flow.

| Callback | Parameters | Returns | Example |
|----------|------------|---------|---------|
| `jwt` | `{ account, isNewUser, profile, session, token, trigger, user }` | `null | JWT` | `async ({ token, user }) => ({ ...token, role: user.role })` |
| `redirect` | `{ baseUrl, url }` | `string` | <details><summary>Example</summary>```js
callbacks: {
  async redirect({ url, baseUrl }) {
    // Allow relative URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;

    // Allow same‑origin URLs
    if (new URL(url).origin === baseUrl) return url;

    return baseUrl;
  }
}
```</details> |
| `session` | `{ session, token, user }` | `Session | DefaultSession` | <details><summary>Example</summary>```js
callbacks: {
  async session({ session, token, user }) {
    session.accessToken = token.accessToken;
    return session;
  }
}
```</details> |
| `signIn` | `{ account, credentials, email, profile, user }` | `string | boolean` | <details><summary>Example</summary>```js
callbacks: {
  async signIn({ profile }) {
    return profile?.email?.endsWith("@yourdomain.com");
  }
}
```</details> |

> **Note** – The `jwt` callback is invoked on sign‑in, sign‑up, and session refresh.  
> The `session` callback is invoked whenever a session is read.

---

## Events

Events are fire‑and‑forget hooks useful for audit logging.

| Event | Parameters | Example |
|-------|------------|---------|
| `createUser` | `{ user: User }` | <details><summary>Example</summary>```js
events: {
  async createUser({ user }) {
    console.log("New user created:", user.id);
  }
}
```</details> |
| `linkAccount` | `{ account, profile, user }` | <details><summary>Example</summary>```js
events: {
  async linkAccount({ account, user }) {
    console.log(`Linked ${account.provider} to user ${user.id}`);
  }
}
```</details> |
| `session` | `{ session, token }` | <details><summary>Example</summary>```js
events: {
  async session({ session }) {
    console.log("Session accessed:", session.id);
  }
}
```</details> |
| `signIn` | `{ account, isNewUser, profile, user }` | <details><summary>Example</summary>```js
events: {
  async signIn({ user }) {
    console.log("User signed in:", user.id);
  }
}
```</details> |
| `signOut` | `{ session, token }` | <details><summary>Example</summary>```js
events: {
  async signOut({ session }) {
    console.log("User signed out:", session.userId);
  }
}
```</details> |
| `updateUser` | `{ user: User }` | <details><summary>Example</summary>```js
events: {
  async updateUser({ user }) {
    console.log("User updated:", user.id);
  }
}
```</details> |

---

## Experimental Features

```ts
experimental?: {
  enableWebAuthn?: boolean;
}
```

> **Default** – `false`  
> **Warning** – Experimental features may change or be removed.

---

## JWT Options

```ts
jwt?: Partial<JWTOptions>;
```

> JSON Web Tokens are enabled by default if no adapter is supplied.  
> Tokens are encrypted (JWE) by default; you can override encryption settings here.

---

## Logger

```ts
logger?: Partial<LoggerInstance>;
```

> Override the built‑in logger or forward logs to an external service.

> **Example**

```ts
import log from "logging-service";

export const { handlers, auth, signIn, signOut } = SvelteKitAuth({
  logger: {
    error(code, ...message) {
      log.error(code, message);
    },
    warn(code, ...message) {
      log.warn(code, message);
    },
    debug(code, ...message) {
      log.debug(code, message);
    }
  }
});
```

> When `logger` is set, `debug` option is ignored.

---

## Pages

```ts
pages?: Partial<PagesOptions>;
```

> Override default sign‑in, sign‑out, error, verify‑request, and new‑user pages.

> **Example**

```ts
pages: {
  signIn: '/auth/signin',
  signOut: '/auth/signout',
  error: '/auth/error',
  verifyRequest: '/auth/verify-request',
  newUser: '/auth/new-user'
}
```

---

## Providers

```ts
providers: Provider[];
```

> List of authentication providers (Google, GitHub, Email, etc.).  
> Default: `[]`.

---

## Redirect Proxy URL

```ts
redirectProxyUrl?: string;
```

> Useful for preview deployments where the final URL is unknown.  
> Sets the `redirect_uri` during OAuth flows.

> **Example**

```ts
redirectProxyUrl: "https://authjs.example.com/api/auth"
```

> You can also set it per provider:

```ts
GitHub({
  clientId: "...",
  clientSecret: "...",
  redirectProxyUrl: "https://github.example.com/api/auth"
});
```

---

## Secret

```ts
secret?: string | string[];
```

> Random string(s) used to sign cookies and encrypt tokens.  
> Generate with `npx auth secret`.

> **Rotating secrets** – Pass an array; the first secret that can decrypt the JWT is used.

---

## Session

```ts
session?: {
  generateSessionToken?: () => string;
  maxAge?: number;
  strategy?: "jwt" | "database";
  updateAge?: number;
}
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `generateSessionToken` | `() => string` | `randomUUID` | Custom token generator for database sessions. |
| `maxAge` | `number` | `2592000` (30 days) | Session expiration in seconds. |
| `strategy` | `"jwt" | "database"` | `"jwt"` (or `"database"` if an adapter is supplied) | How sessions are stored. |
| `updateAge` | `number` | `86400` (1 day) | Frequency of session updates. `0` updates on every request. |

---

## Advanced Options

| Property | Type | Description |
|----------|------|-------------|
| `cookies` | `Partial<CookiesOptions>` | Override cookie names and options. |
| `theme` | `Theme` | Customise built‑in page themes. |

> **Caution** – These options can have complex side effects. Use only if you understand the implications.

---

## Full Example

```ts
// src/lib/auth.ts
import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "$lib/prisma";
import log from "logging-service";

export const { handlers, auth, signIn, signOut } = SvelteKitAuth({
  // 1️⃣ Adapter
  adapter: PrismaAdapter(prisma),

  // 2️⃣ Base path
  basePath: "/api/auth",

  // 3️⃣ Providers
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],

  // 4️⃣ Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ profile }) {
      return profile?.email?.endsWith("@example.com");
    }
  },

  // 5️⃣ Events
  events: {
    async createUser({ user }) {
      log.info("User created:", user.id);
    },
    async signOut({ session }) {
      log.info("User signed out:", session?.userId);
    }
  },

  // 6️⃣ Logger
  logger: {
    error(code, ...message) {
      log.error(code, message);
    },
    warn(code, ...message) {
      log.warn(code, message);
    },
    debug(code, ...message) {
      log.debug(code, message);
    }
  },

  // 7️⃣ Session strategy
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 // 1 hour
  },

  // 8️⃣ Secret
  secret: process.env.AUTH_SECRET!
});
```

> **Deploy** – Add the generated `handlers` to your SvelteKit routes (e.g. `src/routes/api/auth/[...]/+server.ts`).

---

### Quick Reference

```ts
export interface SvelteKitAuthConfig extends Omit<AuthConfig, "raw"> {
  adapter?: Adapter;
  basePath?: string;
  callbacks?: {
    jwt?: (params) => Awaitable<null | JWT>;
    redirect?: (params) => Awaitable<string>;
    session?: (params) => Awaitable<Session | DefaultSession>;
    signIn?: (params) => Awaitable<string | boolean>;
  };
  events?: {
    createUser?: (message) => Awaitable<void>;
    linkAccount?: (message) => Awaitable<void>;
    session?: (message) => Awaitable<void>;
    signIn?: (message) => Awaitable<void>;
    signOut?: (message) => Awaitable<void>;
    updateUser?: (message) => Awaitable<void>;
  };
  experimental?: { enableWebAuthn?: boolean };
  jwt?: Partial<JWTOptions>;
  logger?: Partial<LoggerInstance>;
  pages?: Partial<PagesOptions>;
  providers: Provider[];
  redirectProxyUrl?: string;
  secret?: string | string[];
  session?: {
    generateSessionToken?: () => string;
    maxAge?: number;
    strategy?: "jwt" | "database";
    updateAge?: number;
  };
  cookies?: Partial<CookiesOptions>;
  debug?: boolean;
  skipCSRFCheck?: typeof skipCSRFCheck;
  theme?: Theme;
  trustHost?: boolean;
  useSecureCookies?: boolean;
}
```

---