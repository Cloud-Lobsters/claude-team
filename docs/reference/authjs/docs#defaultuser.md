# Auth.js – Core Types & API Reference

> **Auth.js** is the core authentication library that powers the framework‑specific packages
> (`@auth/nextjs`, `@auth/sveltekit`, `@auth/express`, …).  
> This document contains the public types, interfaces, and a minimal usage example that
> works with any framework.

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

> After installing, you can import the types directly from `@auth/core/types` if you need
> them in a TypeScript project.

---

## Usage

> Even if you’re not using TypeScript, modern IDEs (e.g. VS Code) will pick up the types
> from this package and provide autocompletion, inline documentation, and quick links.

```ts
import { Auth } from "@auth/core";

const request = new Request("https://example.com");

const response = await Auth(request, {
  callbacks: {
    // These callbacks are optional – the library already provides sensible defaults.
    jwt(): JWT {
      return { foo: "bar" }; // <-- This is unnecessary!
    },
    session(
      { session, token }: { session: Session; token: JWT }
    ) {
      return session; // <-- This is unnecessary!
    },
  },
});
```

> The `Auth` function accepts a `Request` object and an optional configuration object.
> The configuration can contain callbacks, providers, adapters, etc.  
> The example above shows the minimal shape of the callbacks; in most cases you can omit
> them entirely.

---

## Types & Interfaces

Below are the public types exported by `@auth/core`.  
They are grouped by logical domain and are presented in the order they appear in the
source code.

> **Note**: The type definitions are intentionally verbose to aid IDE tooling.  
> If you only need a subset, feel free to cherry‑pick the ones you care about.

### 1. Account

```ts
/**
 * Information about an OAuth provider account.
 * Extends `Partial<TokenEndpointResponse>` and `TokenSet`.
 */
export interface Account extends Partial<TokenEndpointResponse>, TokenSet {
  /** Provider’s id (e.g. "google") */
  provider: string;

  /** Provider account id (depends on provider type) */
  providerAccountId: string;

  /** Provider type ("oauth", "oidc", "email", "credentials") */
  type: ProviderType;

  /** Optional user id that owns this account */
  userId?: string;
}
```

### 2. Authenticator

```ts
/**
 * WebAuthn authenticator – an entity that can authenticate a user.
 */
export interface Authenticator {
  /** Number of times the authenticator has been used */
  counter: number;

  /** Whether the client authenticator backed up the credential */
  credentialBackedUp: boolean;

  /** Device type of the authenticator */
  credentialDeviceType: string;

  /** Base64 encoded credential ID */
  credentialID: string;

  /** Base64 encoded credential public key */
  credentialPublicKey: string;

  /** Provider account ID connected to the authenticator */
  providerAccountId: string;

  /** Optional transport flags */
  transports?: null | string;

  /** Optional user id that owns this authenticator */
  userId?: string;
}
```

### 3. CookieOption & CookiesOptions

```ts
/**
 * Options for a single cookie.
 */
export interface CookieOption {
  /** Cookie name */
  name: string;

  /** Cookie serialization options */
  options: SerializeOptions;
}

/**
 * Collection of cookie options used by Auth.js.
 */
export interface CookiesOptions {
  callbackUrl: Partial<CookieOption>;
  csrfToken: Partial<CookieOption>;
  nonce: Partial<CookieOption>;
  pkceCodeVerifier: Partial<CookieOption>;
  sessionToken: Partial<CookieOption>;
  state: Partial<CookieOption>;
  webauthnChallenge: Partial<CookieOption>;
}
```

### 4. DefaultSession & Session

```ts
/**
 * Minimal session shape returned by Auth.js.
 */
export interface DefaultSession {
  /** ISO‑8601 timestamp when the session expires */
  expires: string;

  /** Optional user object */
  user?: User;
}

/**
 * Active session of the logged‑in user.
 */
export interface Session extends DefaultSession {}
```

### 5. DefaultUser & User

```ts
/**
 * Minimal user shape returned by Auth.js.
 */
export interface DefaultUser {
  /** User id */
  id?: string;

  /** User name */
  name?: string | null;

  /** User email */
  email?: string | null;

  /** User avatar URL */
  image?: string | null;
}

/**
 * User shape returned by OAuth providers’ `profile` callback.
 */
export interface User extends DefaultUser {
  /** Additional fields may be added by adapters */
}
```

### 6. LoggerInstance

```ts
/**
 * Logger interface – you can override any method.
 */
export interface LoggerInstance {
  debug(message: string, metadata?: unknown): void;
  error(error: Error): void;
  warn(code: WarningCode): void;
}
```

### 7. PagesOptions

```ts
/**
 * Paths for built‑in pages.
 */
export interface PagesOptions {
  /** Error page path */
  error?: string; // default: "/error"

  /** New user page path */
  newUser?: string;

  /** Sign‑in page path */
  signIn?: string; // default: "/signin"

  /** Sign‑out page path */
  signOut?: string;

  /** Verify request page path */
  verifyRequest?: string;
}
```

### 8. Profile

```ts
/**
 * Standard OpenID Connect claims returned by OAuth providers.
 */
export interface Profile {
  address?: null | {
    country?: null | string;
    formatted?: null | string;
    locality?: null | string;
    postal_code?: null | string;
    region?: null | string;
    street_address?: null | string;
  };
  birthdate?: null | string;
  email?: null | string;
  email_verified?: null | boolean;
  family_name?: null | string;
  gender?: null | string;
  given_name?: null | string;
  id?: null | string;
  locale?: null | string;
  middle_name?: null | string;
  name?: null | string;
  nickname?: null | string;
  phone_number?: null | string;
  picture?: any;
  preferred_username?: null | string;
  profile?: null | string;
  sub?: null | string;
  updated_at?: null | string | number | Date;
  website?: null | string;
  zoneinfo?: null | string;
}
```

### 9. PublicProvider

```ts
/**
 * Public representation of an OAuth provider.
 */
export interface PublicProvider {
  /** Callback URL for the provider */
  callbackUrl: string;

  /** Provider id (e.g. "google") */
  id: string;

  /** Provider name */
  name: string;

  /** Sign‑in URL for the provider */
  signinUrl: string;

  /** Provider type ("oauth", "oidc", "email", "credentials") */
  type: string;
}
```

### 10. ResponseInternal

```ts
/**
 * Internal response type used by Auth.js.
 */
export interface ResponseInternal<Body = any> {
  body?: Body;
  cookies?: Cookie[];
  headers?: HeadersInit;
  redirect?: string;
  status?: number;
}
```

### 11. AuthAction

```ts
/**
 * Supported actions by Auth.js – each maps to a REST API endpoint.
 */
export type AuthAction =
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

### 12. Awaitable & Awaited

```ts
/**
 * Utility types for async handling.
 */
export type Awaitable<T> = T | PromiseLike<T>;
export type Awaited<T> = T extends Promise<infer U> ? U : T;
```

### 13. ErrorPageParam & SignInPageErrorParam

```ts
/**
 * Query parameter values for the error page.
 */
export type ErrorPageParam = "Configuration" | "AccessDenied" | "Verification";

/**
 * Query parameter values for the sign‑in page.
 */
export type SignInPageErrorParam =
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
```

### 14. SemverString

```ts
/**
 * Semantic version string.
 */
export type SemverString =
  | `v${number}`
  | `v${number}.${number}`
  | `v${number}.${number}.${number}`;
```

### 15. TokenSet

```ts
/**
 * Tokens returned by OAuth providers.
 */
export type TokenSet = Partial<TokenEndpointResponse> & {
  /** Absolute timestamp (in seconds) when the access_token expires */
  expires_at: number;
};
```

### 16. WarningCode

```ts
/**
 * Known warning codes emitted by the logger.
 */
export type WarningCode =
  | "debug-enabled"
  | "csrf-disabled"
  | "env-url-basepath-redundant"
  | "env-url-basepath-mismatch"
  | "experimental-webauthn";
```

### 17. WebAuthnOptionsResponseBody

```ts
/**
 * Response body for the `/webauthn-options` endpoint.
 */
export type WebAuthnOptionsResponseBody =
  | {
      action: WebAuthnAuthenticate;
      options: PublicKeyCredentialRequestOptionsJSON;
    }
  | {
      action: WebAuthnRegister;
      options: PublicKeyCredentialCreationOptionsJSON;
    };
```

### 18. AuthConfig

> The `AuthConfig` interface is re‑exported from `@auth/core`.  
> It contains all configuration options (providers, adapters, callbacks, pages, etc.).
> For a full list, see the source code or the framework‑specific documentation.

---

## Summary

* **Installation** – `npm install @auth/core`
* **Usage** – Call `Auth(request, config)` from any framework.
* **Example** – See the code snippet above.
* **Types** – All public types are listed above for reference and IDE support.

Feel free to copy/paste the type definitions into your own project or use them as a
reference when extending Auth.js with custom adapters, callbacks, or pages.