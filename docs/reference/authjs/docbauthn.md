# `signIn` – WebAuthn Sign‑In Flow

The `signIn` function initiates a WebAuthn authentication flow.  
It is part of the Auth.js (formerly NextAuth.js) library and is used in
React, SvelteKit, Express, Qwik, Solid‑Start, and other supported
frameworks.

---

## Overloads

| Signature | Description |
|-----------|-------------|
| **`function signIn(provider?: ProviderId, options?: SignInOptions<true>, authorizationParams?: SignInAuthorizationParams): Promise<void>`** | Initiates a WebAuthn sign‑in flow that **does not** return a response object. |
| **`function signIn(provider?: ProviderId, options?: SignInOptions<false>, authorizationParams?: SignInAuthorizationParams): Promise<SignInResponse>`** | Initiates a WebAuthn sign‑in flow that **does** return a `SignInResponse` object. |

> **Note:**  
> The generic parameter `<true | false>` on `SignInOptions` determines whether the function resolves to `void` or to a `SignInResponse`.  
> Use `<true>` when you only need to trigger the flow (e.g., redirecting the user).  
> Use `<false>` when you want to handle the response directly in your code.

---

## Parameters

| Name | Type | Optional | Description |
|------|------|----------|-------------|
| `provider?` | `ProviderId` | ✅ | Identifier of the authentication provider (e.g., `"webauthn"`). |
| `options?` | `SignInOptions<true | false>` | ✅ | Configuration options for the sign‑in flow. |
| `authorizationParams?` | `SignInAuthorizationParams` | ✅ | Additional parameters passed to the authorization endpoint. |

---

## Return Types

| Return | When | Description |
|--------|------|-------------|
| `Promise<void>` | `options` is `SignInOptions<true>` | Resolves when the sign‑in flow has been started. |
| `Promise<SignInResponse>` | `options` is `SignInOptions<false>` | Resolves with the sign‑in response object. |

---

## Usage

```ts
import { signIn } from '@auth/core';

// Example 1: Trigger WebAuthn sign‑in without handling the response
await signIn('webauthn', { redirect: true });

// Example 2: Trigger WebAuthn sign‑in and handle the response
const response = await signIn('webauthn', { redirect: false });
console.log(response);
```

> Replace `'webauthn'` with the actual provider ID configured in your Auth.js setup.

---

## References

- [Auth.js – WebAuthn Authentication](https://authjs.dev/getting-started/authentication/webauthn)

---