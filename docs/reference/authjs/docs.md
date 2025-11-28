# Auth.js – Core Types & API Reference

> **Auth.js** is the core authentication library that powers the framework‑specific packages
> (`@auth/nextjs`, `@auth/sveltekit`, `@auth/express`, …).  
> This document contains the public types, interfaces, and a quick‑start example that you
> can use in any JavaScript/TypeScript project.

---

## 1. Installation

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

> After installing, you can import the sub‑module from `@auth/core/types` if you need
> explicit type imports. In most cases, the `Auth` function already brings in the
> necessary types.

---

## 2. Quick‑Start Example

```ts
import { Auth } from "@auth/core";

const request = new Request("https://example.com");
const response = await Auth(request, {
  callbacks: {
    // The following callbacks are *already typed* – no need to annotate manually.
    jwt() {
      return { foo: "bar" };
    },
    session({ session, token }) {
      return session;
    },
  },
});
```

> **Tip:** Even if you’re not using TypeScript, VS Code will surface these types
> automatically, giving you autocompletion and inline documentation.

---

## 3. Core Types & Interfaces

Below is a curated list of the most frequently used types.  
All types are exported from `@auth/core/types`.

| Type | Description |
|------|-------------|
| `Account` | Information about a provider account (OAuth, Credentials, etc.). |
| `Authenticator` | WebAuthn authenticator data. |
| `CookieOption` | Configuration for a single cookie. |
| `CookiesOptions` | Collection of cookie options. |
| `DefaultSession` | Base session shape. |
| `DefaultUser` | Base user shape. |
| `LoggerInstance` | Custom logger interface. |
| `PagesOptions` | Paths for built‑in pages. |
| `Profile` | User profile returned by OAuth providers. |
| `PublicProvider` | Public representation of a provider. |
| `ResponseInternal<Body>` | Internal response shape used by the framework. |
| `Session` | Active session of the logged‑in user. |
| `Theme` | Styling options for built‑in pages. |
| `User` | Shape of the user object returned by the `profile` callback. |
| `AuthAction` | Supported actions (e.g. `signin`, `signout`, `session`, …). |
| `Awaitable<T>` | Utility type for values that may be promises. |
| `Awaited<T>` | Utility type for the resolved type of a promise. |
| `ErrorPageParam` | Query‑string values for the error page. |
| `SemverString` | Semantic‑version string. |
| `SignInPageErrorParam` | Query‑string values for the sign‑in page. |
| `TokenSet` | Token set returned by OAuth providers. |
| `WarningCode` | Built‑in warning codes. |
| `WebAuthnOptionsResponseBody` | Response body for WebAuthn options. |
| `AuthConfig` | Re‑export of the main configuration interface. |

---

### 3.1 `Account`

```ts
interface Account extends Partial<TokenEndpointResponse> {
  provider: string;          // e.g. "google"
  providerAccountId: string; // provider‑specific ID
  type: ProviderType;        // "oauth" | "oidc" | "email" | "credentials"
  userId?: string;           // ID of the user this account belongs to
}
```

| Property | Optional | Notes |
|----------|----------|-------|
| `access_token` | ✅ | OAuth access token |
| `authorization_details` | ✅ | Array of `AuthorizationDetails` |
| `expires_at` | ✅ | Absolute timestamp (seconds) when the token expires |
| `expires_in` | ✅ | Seconds until expiration |
| `id_token` | ✅ | OpenID Connect ID token |
| `refresh_token` | ✅ | Refresh token |
| `scope` | ✅ | Scopes granted |
| `token_type` | ✅ | Lower‑cased token type |

---

### 3.2 `Authenticator`

```ts
interface Authenticator {
  counter: number;
  credentialBackedUp: boolean;
  credentialDeviceType: string;
  credentialID: string;          // Base64 encoded
  credentialPublicKey: string;   // Base64 encoded
  providerAccountId: string;
  transports?: null | string;    // Concatenated transport flags
  userId?: string;
}
```

---

### 3.3 `CookieOption` & `CookiesOptions`

```ts
interface CookieOption {
  name: string;
  options: SerializeOptions;
}

interface CookiesOptions {
  callbackUrl?: Partial<CookieOption>;
  csrfToken?: Partial<CookieOption>;
  nonce?: Partial<CookieOption>;
  pkceCodeVerifier?: Partial<CookieOption>;
  sessionToken?: Partial<CookieOption>;
  state?: Partial<CookieOption>;
  webauthnChallenge?: Partial<CookieOption>;
}
```

---

### 3.4 `DefaultSession` & `Session`

```ts
interface DefaultSession {
  expires: string;          // ISO‑8601 string
  user?: User;
}

interface Session extends DefaultSession {}
```

---

### 3.5 `DefaultUser` & `User`

```ts
interface DefaultUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface User extends DefaultUser {
  // Adapter‑specific fields can extend this
}
```

---

### 3.6 `LoggerInstance`

```ts
interface LoggerInstance {
  debug(message: string, metadata?: unknown): void;
  error(error: Error): void;
  warn(code: WarningCode): void;
}
```

---

### 3.7 `PagesOptions`

```ts
interface PagesOptions {
  error?: string;          // Path to error page (default: "/error")
  newUser?: string;        // Path for first‑time sign‑in
  signIn?: string;         // Path to sign‑in page (default: "/signin")
  signOut?: string;        // Path to sign‑out page
  verifyRequest?: string;  // Path to verification request page
}
```

---

### 3.8 `Profile`

```ts
interface Profile {
  sub?: string | null;
  name?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  picture?: any;
  email?: string | null;
  email_verified?: boolean | null;
  gender?: string | null;
  birthdate?: string | null;
  address?: {
    street_address?: string | null;
    locality?: string | null;
    region?: string | null;
    postal_code?: string | null;
    country?: string | null;
    formatted?: string | null;
  } | null;
  phone_number?: string | null;
  preferred_username?: string | null;
  profile?: string | null;
  website?: string | null;
  updated_at?: string | number | Date | null;
  locale?: string | null;
  zoneinfo?: string | null;
  [claim: string]: unknown; // Any other OpenID Connect claims
}
```

---

### 3.9 `PublicProvider`

```ts
interface PublicProvider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}
```

---

### 3.10 `ResponseInternal<Body>`

```ts
type ResponseInternal<Body = any> = {
  body?: Body;
  cookies?: Cookie[];
  headers?: HeadersInit;
  redirect?: string;
  status?: number;
};
```

---

### 3.11 `AuthAction`

```ts
type AuthAction =
  | "callback"
  | "csrf"
  | "error"
  | "providers"
  | "session"
  | "signin"
  | "signout"
  | "verify-request"
  | "webauthn-options";
```

> Each action maps to a REST endpoint. Some actions have both GET and POST variants.

---

### 3.12 Utility Types

| Type | Description |
|------|-------------|
| `Awaitable<T>` | `T | PromiseLike<T>` |
| `Awaited<T>` | `T extends Promise<infer U> ? U : T` |
| `ErrorPageParam` | `"Configuration" | "AccessDenied" | "Verification"` |
| `SemverString` | `"v${number}" | "v${number}.${number}" | "v${number}.${number}.${number}"` |
| `SignInPageErrorParam` | `"Signin" | "OAuthSignin" | ...` |
| `TokenSet` | `Partial<TokenEndpointResponse> & { expires_at: number }` |
| `WarningCode` | `"debug-enabled" | "csrf-disabled" | ...` |
| `WebAuthnOptionsResponseBody` | `{ action: WebAuthnAuthenticate; options: PublicKeyCredentialRequestOptionsJSON } | { action: WebAuthnRegister; options: PublicKeyCredentialCreationOptionsJSON }` |

---

## 4. Common Use‑Cases

### 4.1 Customizing the Sign‑In Page

```ts
const pages: PagesOptions = {
  signIn: "/custom-signin",
  error: "/custom-error",
};
```

### 4.2 Adding a Custom Logger

```ts
const logger: LoggerInstance = {
  debug: (msg, meta) => console.debug(msg, meta),
  error: err => console.error(err),
  warn: code => console.warn(`⚠️ ${code}`),
};
```

### 4.3 Using WebAuthn Options

```ts
import { Auth } from "@auth/core";

const request = new Request("https://example.com/webauthn-options");
const response = await Auth(request, { /* config */ });
// response.body will be of type WebAuthnOptionsResponseBody
```

---

## 5. Resources

- **Official Docs** – https://authjs.dev
- **GitHub Repo** – https://github.com/authjs/authjs
- **Discord Community** – https://discord.gg/authjs

---

> **Note:** The examples above are intentionally minimal. In a real application you’ll
> typically provide a full `AuthConfig` object with providers, callbacks, adapters,
> and other options. The types above will guide you in building that configuration
> with full type safety.