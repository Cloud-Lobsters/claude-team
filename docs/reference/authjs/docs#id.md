# @auth/core – TypeScript Types & Interfaces

> This module contains the public types and interfaces that power **Auth.js**.  
> They are used by the core library, adapters, and framework integrations.  
> Even if you’re not writing TypeScript, the types are picked up by IDEs such as VS Code, giving you autocompletion and inline documentation.

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

> After installing, you can import the types directly from `@auth/core/types`.

---

## Usage

> The `Auth` function and the `AuthConfig` interface are already typed, so you normally **don’t** need to import any of the types below.  
> They are provided for reference and for advanced use‑cases (e.g. custom adapters, middleware, or type‑checking your own callbacks).

```ts
import { Auth } from "@auth/core";

const request = new Request("https://example.com");
const response = await Auth(request, {
  callbacks: {
    jwt(): JWT { // <-- This is unnecessary!
      return { foo: "bar" };
    },
    session(
      { session, token }: { session: Session; token: JWT } // <-- This is unnecessary!
    ) {
      return session;
    },
  },
});
```

> **Tip:** The example above shows the *unnecessary* explicit typing that you can omit.  
> The library infers the types automatically.

---

## Core Types

Below is a curated list of the most important types.  
Each type is followed by a short description and the relevant properties.

> **Note:** The full type definitions are available in the source code; the snippets below are simplified for readability.

### `Account`

Represents an OAuth / OpenID Connect account linked to a user.

```ts
interface Account extends Partial<TokenEndpointResponse> {
  provider: string;          // e.g. "google"
  providerAccountId: string; // provider‑specific ID
  type: ProviderType;        // "oauth" | "oidc" | "email" | "credentials"
  userId?: string;           // ID of the user this account belongs to
}
```

| Property | Description |
|----------|-------------|
| `access_token?` | OAuth access token |
| `refresh_token?` | OAuth refresh token |
| `expires_at?` | Absolute timestamp (seconds) when the access token expires |
| `id_token?` | OpenID Connect ID token |
| `scope?` | OAuth scopes |
| `token_type?` | Token type (lower‑cased) |

---

### `Authenticator`

WebAuthn authenticator data.

```ts
interface Authenticator {
  counter: number;
  credentialBackedUp: boolean;
  credentialDeviceType: string;
  credentialID: string;          // Base64 encoded
  credentialPublicKey: string;   // Base64 encoded
  providerAccountId: string;
  transports?: null | string;
  userId?: string;
}
```

---

### `CookieOption`

Configuration for a single cookie.

```ts
interface CookieOption {
  name: string;
  options: SerializeOptions; // from `cookie` package
}
```

---

### `DefaultSession` & `Session`

```ts
interface DefaultSession {
  expires: string;          // ISO‑8601 string
  user?: User;
}

interface Session extends DefaultSession {}
```

---

### `DefaultUser` & `User`

```ts
interface DefaultUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface User extends DefaultUser {
  // AdapterUser may add more fields
}
```

---

### `LoggerInstance`

Custom logger interface.  
You can override any method; the rest will fall back to the default logger.

```ts
interface LoggerInstance {
  debug(message: string, metadata?: unknown): void;
  error(error: Error): void;
  warn(code: WarningCode): void;
}
```

---

### `PagesOptions`

Configuration for built‑in pages.

```ts
interface PagesOptions {
  error?: string;          // default: "/error"
  newUser?: string;
  signIn?: string;         // default: "/signin"
  signOut?: string;
  verifyRequest?: string;
}
```

---

### `Profile`

Standard OpenID Connect claims returned by a provider.

```ts
interface Profile {
  sub?: string | null;
  name?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  picture?: any;
  email?: string | null;
  email_verified?: boolean | null;
  // …plus many optional fields
}
```

---

### `PublicProvider`

Minimal provider information exposed to the client.

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

### `ResponseInternal<Body>`

Internal response type used by the framework adapters.

```ts
interface ResponseInternal<Body = any> {
  body?: Body;
  cookies?: Cookie[];
  headers?: HeadersInit;
  redirect?: string;
  status?: number;
}
```

---

### `Theme`

Customise the built‑in pages.

```ts
interface Theme {
  brandColor?: string;
  buttonText?: string;
  colorScheme?: "auto" | "dark" | "light";
  logo?: string;
}
```

---

### `AuthAction`

All supported actions that map to REST API endpoints.

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

---

### Utility Types

```ts
type Awaitable<T> = T | PromiseLike<T>;
type Awaited<T> = T extends Promise<infer U> ? U : T;

type ErrorPageParam = "Configuration" | "AccessDenied" | "Verification";

type SignInPageErrorParam =
  | "Signin"
  | "OAuthSignin"
  | "OAuthCallbackError"
  | "OAuthCreateAccount"
  | "EmailCreateAccount"
  | "Callback"
  | "OAuthAccountNotLinked"
  | "EmailSignin"
  | "CredentialsSignin"
  | "SessionRequired";

type SemverString =
  | `v${number}`
  | `v${number}.${number}`
  | `v${number}.${number}.${number}`;

type WarningCode =
  | "debug-enabled"
  | "csrf-disabled"
  | "env-url-basepath-redundant"
  | "env-url-basepath-mismatch"
  | "experimental-webauthn";
```

---

### `TokenSet`

All tokens returned by an OAuth provider, with an `expires_at` field.

```ts
type TokenSet = Partial<TokenEndpointResponse> & {
  expires_at: number;
};
```

---

### `WebAuthnOptionsResponseBody`

Response body for the `/webauthn-options` endpoint.

```ts
type WebAuthnOptionsResponseBody =
  | { action: WebAuthnAuthenticate; options: PublicKeyCredentialRequestOptionsJSON }
  | { action: WebAuthnRegister; options: PublicKeyCredentialCreationOptionsJSON };
```

---

### `AuthConfig`

Re‑exported from the core package.  
It contains all configuration options for Auth.js (providers, callbacks, adapters, etc.).

```ts
export type { AuthConfig } from "@auth/core";
```

---

## Resources

| Topic | Link |
|-------|------|
| Auth.js Docs | https://authjs.dev |
| OAuth Provider List | https://authjs.dev/reference/core/providers |
| Adapter Docs | https://authjs.dev/reference/core/adapters |
| Refresh‑Token Rotation | https://authjs.dev/guides/refresh-token-rotation#database-strategy |
| WebAuthn | https://authjs.dev/guides/webauthn |

---

## Summary

* **Installation** – `npm install @auth/core`
* **Usage** – `Auth(request, config)` is fully typed; you rarely need to import the types manually.
* **Types** – `Account`, `Authenticator`, `Session`, `User`, `Profile`, `PublicProvider`, `AuthAction`, etc.  
  All are exported from `@auth/core/types`.
* **Example** – see the snippet above for a minimal, fully typed usage.

Feel free to dive into the source code for the complete type definitions and to contribute improvements!