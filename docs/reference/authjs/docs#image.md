# Auth.js – Core Types & API Reference

> **Auth.js** is the core authentication library that powers the framework‑specific packages (`@auth/next`, `@auth/sveltekit`, etc.).  
> This document contains the public types, interfaces, and usage examples that you’ll need when working directly with `@auth/core`.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Core Types](#core-types)
  - [Account](#account)
  - [Authenticator](#authenticator)
  - [CookieOption](#cookieoption)
  - [DefaultSession](#defaultsession)
  - [DefaultUser](#defaultuser)
  - [LoggerInstance](#loggerinstance)
  - [PagesOptions](#pagesoptions)
  - [Profile](#profile)
  - [PublicProvider](#publicprovider)
  - [ResponseInternal](#responseinternal)
  - [Session](#session)
  - [Theme](#theme)
  - [User](#user)
  - [AuthAction](#authaction)
  - [Awaitable / Awaited](#awaitable-async)
  - [ErrorPageParam](#errorpageparam)
  - [SemverString](#semverstring)
  - [SignInPageErrorParam](#signinpageerrorparam)
  - [TokenSet](#tokenset)
  - [WarningCode](#warningcode)
  - [WebAuthnOptionsResponseBody](#webauthnoptionsresponsebody)
  - [AuthConfig](#authconfig)
- [Resources](#resources)

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

> After installing, you can import the sub‑module directly from `@auth/core/types` if you need explicit type imports.

---

## Usage

> Even if you’re not using TypeScript, IDEs such as VS Code will automatically pick up these types and provide autocompletion, documentation links, and inline examples.

> Typically you **don’t** need to import any types manually when calling the `Auth` function – the function is fully typed internally.

---

## Example

```ts
import { Auth } from "@auth/core";

const request = new Request("https://example.com");

const response = await Auth(request, {
  callbacks: {
    // These callbacks are already typed; no need to annotate manually.
    jwt() {
      return { foo: "bar" };
    },
    session({ session, token }) {
      return session;
    },
  },
});
```

---

## Core Types

Below is a concise reference of the public types exported by `@auth/core`.  
All properties are optional unless otherwise noted.

### Account

Represents an OAuth provider account and extends `TokenSet`.

| Property | Type | Notes |
|----------|------|-------|
| `access_token?` | `string` | |
| `authorization_details?` | `AuthorizationDetails[]` | |
| `expires_at?` | `number` | Absolute timestamp (seconds) when the access token expires. |
| `expires_in?` | `number` | Seconds until expiration. |
| `id_token?` | `string` | |
| `provider` | `string` | Provider ID (e.g., `"google"`). |
| `providerAccountId` | `string` | Provider‑specific account ID. |
| `refresh_token?` | `string` | |
| `scope?` | `string` | |
| `token_type?` | `Lowercase<string>` | Always lower‑cased. |
| `type` | `ProviderType` | Provider type. |
| `userId?` | `string` | ID of the user this account belongs to. |

---

### Authenticator

Represents a WebAuthn authenticator.

| Property | Type | Notes |
|----------|------|-------|
| `counter` | `number` | Number of times used. |
| `credentialBackedUp` | `boolean` | |
| `credentialDeviceType` | `string` | |
| `credentialID` | `string` | Base64‑encoded ID. |
| `credentialPublicKey` | `string` | Base64‑encoded public key. |
| `providerAccountId` | `string` | |
| `transports?` | `null | string` | Concatenated transport flags. |
| `userId?` | `string` | |

---

### CookieOption

Used for cookie configuration.

| Property | Type | Notes |
|----------|------|-------|
| `name` | `string` | Cookie name. |
| `options` | `SerializeOptions` | Cookie serialization options. |

---

### DefaultSession

Base session shape.

| Property | Type | Notes |
|----------|------|-------|
| `expires` | `string` | ISO‑8601 timestamp. |
| `user?` | `User` | Optional user object. |

---

### DefaultUser

Base user shape.

| Property | Type | Notes |
|----------|------|-------|
| `email?` | `null | string` | |
| `id?` | `string` | |
| `image?` | `null | string` | |
| `name?` | `null | string` | |

---

### LoggerInstance

Customizable logger. Override any method; the rest fall back to defaults.

| Method | Signature | Returns |
|--------|-----------|---------|
| `debug(message: string, metadata?: unknown)` | `void` | |
| `error(error: Error)` | `void` | |
| `warn(code: WarningCode)` | `void` | |

---

### PagesOptions

Configuration for built‑in pages.

| Property | Type | Notes |
|----------|------|-------|
| `error` | `string` | Path to error page (`"/error"` by default). |
| `newUser` | `string` | Path for first‑time sign‑in. |
| `signIn` | `string` | Path to sign‑in page (`"/signin"` by default). |
| `signOut` | `string` | Path to sign‑out page. |
| `verifyRequest` | `string` | Path to verification request page. |

---

### Profile

User profile returned by OAuth providers (OpenID Connect claims).

| Property | Type | Notes |
|----------|------|-------|
| `address?` | `null | { country?: string; formatted?: string; locality?: string; postal_code?: string; region?: string; street_address?: string; }` | |
| `birthdate?` | `null | string` | |
| `email?` | `null | string` | |
| `email_verified?` | `null | boolean` | |
| `family_name?` | `null | string` | |
| `gender?` | `null | string` | |
| `given_name?` | `null | string` | |
| `id?` | `null | string` | |
| `locale?` | `null | string` | |
| `middle_name?` | `null | string` | |
| `name?` | `null | string` | |
| `nickname?` | `null | string` | |
| `phone_number?` | `null | string` | |
| `picture?` | `any` | |
| `preferred_username?` | `null | string` | |
| `profile?` | `null | string` | |
| `sub?` | `null | string` | |
| `updated_at?` | `null | string | number | Date` | |
| `website?` | `null | string` | |
| `zoneinfo?` | `null | string` | |

---

### PublicProvider

Information about a configured provider.

| Property | Type | Notes |
|----------|------|-------|
| `callbackUrl` | `string` | |
| `id` | `string` | |
| `name` | `string` | |
| `signinUrl` | `string` | |
| `type` | `string` | |

---

### ResponseInternal\<Body\>

Internal response type used by the framework.

| Property | Type | Notes |
|----------|------|-------|
| `body?` | `Body` | |
| `cookies?` | `Cookie[]` | |
| `headers?` | `HeadersInit` | |
| `redirect?` | `string` | |
| `status?` | `number` | |

---

### Session

Active session of the logged‑in user.

| Property | Type | Notes |
|----------|------|-------|
| `expires` | `string` | |
| `user?` | `User` | |

---

### Theme

Customise built‑in pages.

| Property | Type | Notes |
|----------|------|-------|
| `brandColor?` | `string` | |
| `buttonText?` | `string` | |
| `colorScheme?` | `"auto" | "dark" | "light"` | |
| `logo?` | `string` | |

---

### User

Shape of the object returned by the provider’s `profile` callback.

| Property | Type | Notes |
|----------|------|-------|
| `email?` | `null | string` | |
| `id?` | `string` | |
| `image?` | `null | string` | |
| `name?` | `null | string` | |

---

### AuthAction

Supported actions that map to REST API endpoints.

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

> Each action may have a GET and POST variant depending on whether it changes server state.

---

### Awaitable / Awaited

Utility types for async handling.

```ts
type Awaitable<T> = T | PromiseLike<T>;
type Awaited<T> = T extends Promise<infer U> ? U : T;
```

---

### ErrorPageParam

Query parameter for the error page.

```ts
type ErrorPageParam = "Configuration" | "AccessDenied" | "Verification";
```

---

### SemverString

Semantic version string.

```ts
type SemverString =
  | `v${number}`
  | `v${number}.${number}`
  | `v${number}.${number}.${number}`;
```

---

### SignInPageErrorParam

Error codes shown on the sign‑in page.

```ts
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
```

---

### TokenSet

Tokens returned by OAuth providers.

```ts
type TokenSet = Partial<TokenEndpointResponse> & {
  expires_at: number;
};
```

| Property | Type | Notes |
|----------|------|-------|
| `expires_at?` | `number` | Absolute timestamp (seconds). |

---

### WarningCode

Internal warning codes.

```ts
type WarningCode =
  | "debug-enabled"
  | "csrf-disabled"
  | "env-url-basepath-redundant"
  | "env-url-basepath-mismatch"
  | "experimental-webauthn";
```

---

### WebAuthnOptionsResponseBody

Response body for WebAuthn options.

```ts
type WebAuthnOptionsResponseBody =
  | { action: WebAuthnAuthenticate; options: PublicKeyCredentialRequestOptionsJSON }
  | { action: WebAuthnRegister; options: PublicKeyCredentialCreationOptionsJSON };
```

---

### AuthConfig

Re‑exports the `AuthConfig` interface from the core package.  
See the framework‑specific docs for full configuration details.

---

## Resources

- **[Auth.js Docs](https://authjs.dev)** – Full reference and guides.  
- **[GitHub Repository](https://github.com/authjs/authjs)** – Source code, issues, and PRs.  
- **[Discord Community](https://discord.gg/authjs)** – Ask questions and discuss.  

---

*Auth.js © Balázs Orbán and Team – 2025*