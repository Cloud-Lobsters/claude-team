# @auth/core – Core Auth.js Library

> **⚠️ Experimental** – The API is still evolving. Use with caution in production.

`@auth/core` is the foundation of Auth.js.  
It implements the authentication flow using the standard Web `Request`/`Response` APIs and can be used directly or as the base for framework‑specific adapters (NextAuth, SvelteKit, Express, etc.).

---

## Installation

```bash
# npm
npm install @auth/core

# pnpm
pnpm add @auth/core

# yarn
yarn add @auth/core

# bun
bun add @auth/core
```

---

## Basic Usage

```ts
import { Auth } from "@auth/core";

const request = new Request("https://example.com");
const response = await Auth(request, {
  providers: [/* your providers */],
  secret: "super-secret",
  trustHost: true,
});

console.log(response instanceof Response); // true
```

---

## AuthConfig

`AuthConfig` is the configuration object passed to `Auth`.  
All properties are optional; defaults are shown in the table below.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `adapter?` | `Adapter` | – | Database adapter (e.g. Prisma, MongoDB). |
| `basePath?` | `string` | `"/api/auth"` (NextAuth) / `"/auth"` (others) | Base path for Auth.js endpoints. |
| `callbacks?` | `Callbacks` | – | Async functions that control the flow. |
| `cookies?` | `Partial<CookiesOptions>` | `{}` | Override cookie names/options. |
| `debug?` | `boolean` | `false` | Enable debug logs. |
| `events?` | `Events` | `{}` | Audit‑logging callbacks. |
| `experimental?` | `{ enableWebAuthn?: boolean }` | `{}` | Experimental features. |
| `jwt?` | `Partial<JWTOptions>` | – | JWT configuration. |
| `logger?` | `Partial<LoggerInstance>` | `console` | Custom logger. |
| `pages?` | `Partial<PagesOptions>` | `{}` | Custom page URLs. |
| `providers` | `Provider[]` | `[]` | List of authentication providers. |
| `raw?` | `typeof raw` | – | For framework authors. |
| `redirectProxyUrl?` | `string` | `AUTH_REDIRECT_PROXY_URL` env var | Override redirect URI for OAuth. |
| `secret?` | `string | string[]` | – | Secret(s) for signing cookies & JWTs. |
| `session?` | `SessionOptions` | – | Session strategy & timing. |
| `skipCSRFCheck?` | `typeof skipCSRFCheck` | – | Skip CSRF protection (frameworks only). |
| `theme?` | `Theme` | – | Theme for built‑in pages. |
| `trustHost?` | `boolean` | `false` | Trust the `Host` header. |
| `useSecureCookies?` | `boolean` | `false` (HTTP) / `true` (HTTPS) | Secure cookie flag. |
| `customFetch?` | `typeof customFetch` | – | Override fetch used by providers. |

---

## Callbacks

Callbacks are async functions that let you customize the authentication flow.

### `jwt`

```ts
jwt: async ({ token, user, account, profile, trigger }) => {
  // Called on sign‑in or session access
  if (trigger === "signIn") {
    token.accessToken = account?.access_token;
  }
  return token;
}
```

### `redirect`

```ts
redirect: async ({ url, baseUrl }) => {
  // Allow relative URLs
  if (url.startsWith("/")) return `${baseUrl}${url}`;

  // Allow same‑origin URLs
  if (new URL(url).origin === baseUrl) return url;

  return baseUrl; // fallback
}
```

### `session`

```ts
session: async ({ session, token, user }) => {
  // Expose access token to client
  session.accessToken = token.accessToken;
  return session;
}
```

### `signIn`

```ts
signIn: async ({ profile }) => {
  // Only allow users from a specific domain
  return profile?.email?.endsWith("@yourdomain.com");
}
```

---

## Events

Events are fire‑and‑forget callbacks useful for audit logging.

| Event | Message Shape | Example |
|-------|---------------|---------|
| `createUser` | `{ user: User }` | `createUser: async ({ user }) => console.log("Created", user.id)` |
| `linkAccount` | `{ account: Account, profile: User | AdapterUser, user: User | AdapterUser }` | `linkAccount: async ({ account }) => console.log("Linked", account.provider)` |
| `session` | `{ session: Session, token: JWT }` | `session: async ({ token }) => console.log("Session token", token)` |
| `signIn` | `{ account?, isNewUser?, profile?, user }` | `signIn: async ({ user }) => console.log("Signed in", user.email)` |
| `signOut` | `{ session?, token? }` | `signOut: async ({ session }) => console.log("Signed out", session?.userId)` |
| `updateUser` | `{ user: User }` | `updateUser: async ({ user }) => console.log("Updated", user.id)` |

---

## Session Options

```ts
session: {
  generateSessionToken?: () => string; // custom token generator
  maxAge?: number;                     // seconds until expiration (default 2592000 = 30 days)
  strategy?: "jwt" | "database";       // default "jwt" unless adapter is present
  updateAge?: number;                  // seconds between session updates (default 86400 = 1 day)
}
```

---

## Custom Fetch

If you need to route provider requests through a corporate proxy or add custom headers:

```ts
import { Auth, customFetch } from "@auth/core";
import GitHub from "@auth/core/providers/github";
import { ProxyAgent } from "undici";

const dispatcher = new ProxyAgent("http://my.proxy.server");

function proxy(...args: Parameters<typeof fetch>) {
  return undici(args[0], { ...(args[1] ?? {}), dispatcher });
}

const response = await Auth(request, {
  providers: [GitHub({ [customFetch]: proxy })],
});
```

---

## Example: Full AuthConfig

```ts
import { Auth } from "@auth/core";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  events: {
    signIn: async ({ user }) => console.log("User signed in:", user.email),
  },
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};
```

---

## Auth() Function

```ts
/**
 * Core authentication handler.
 *
 * @param request - A standard Web `Request` object.
 * @param config  - AuthConfig (plus optional `raw` for framework authors).
 * @returns A `Response` (or `ResponseInternal` if `raw` is set).
 */
export async function Auth(request: Request, config: AuthConfig): Promise<Response>;
```

---

## Utility Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `createActionURL(action, protocol, headers, envObject, config)` | `URL` | Builds the URL for a given Auth action. |
| `isAuthAction(action)` | `action is AuthAction` | Type guard for Auth actions. |
| `setEnvDefaults(envObject, config, suppressBasePathWarning?)` | `void` | Sets default env variables on the config. |

---

## Notes & Best Practices

- **Secrets**: Use `npx auth secret` to generate a strong secret.  
  For rotating secrets, pass an array: `secret: ["new-secret", "old-secret"]`.
- **CSRF**: If your framework already protects against CSRF, set `skipCSRFCheck: skipCSRFCheck`.
- **Secure Cookies**: Enable `useSecureCookies: true` on production HTTPS sites.
- **Debugging**: Set `debug: true` or provide a custom `logger` to capture detailed logs.
- **Experimental**: Features like WebAuthn are behind `experimental.enableWebAuthn`.

---

## Further Reading

- [Auth.js Guides](https://authjs.dev/guides)
- [Adapter Documentation](https://authjs.dev/adapters)
- [Provider List](https://authjs.dev/providers)
- [Security Best Practices](https://authjs.dev/security)

---

*This documentation is a distilled, sanitized version of the official Auth.js API reference. All examples from the original source are preserved.*