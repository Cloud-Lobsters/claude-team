# @auth/solid-start/client API Reference

This reference covers the client‑side helpers that ship with **Auth.js** for Solid‑Start.  
All examples are taken verbatim from the original documentation.

---

## SignInResponse

The object returned by the server‑side overload of `signIn`.

| Property | Type | Description |
|----------|------|-------------|
| `code` | `undefined | string` | Optional response code. |
| `error` | `undefined | string` | Optional error message. |
| `ok` | `boolean` | Indicates whether the request succeeded. |
| `status` | `number` | HTTP status code. |
| `url` | `null | string` | Redirect URL if the sign‑in flow redirects the user. |

---

## SignInAuthorizationParams

`SignInAuthorizationParams` is a flexible type that lets you pass additional query parameters to the sign‑in request.

```ts
type SignInAuthorizationParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams;
```

---

## signIn

`signIn` initiates a sign‑in flow or redirects the user to a page that lists all available providers.  
It automatically protects against CSRF.

### Overloads

```ts
// Client‑side usage – returns void
function signIn(
  provider?: ProviderId,
  options?: SignInOptions<true>,
  authorizationParams?: SignInAuthorizationParams
): Promise<void>

// Server‑side usage – returns a SignInResponse
function signIn(
  provider?: ProviderId,
  options?: SignInOptions<false>,
  authorizationParams?: SignInAuthorizationParams
): Promise<SignInResponse>
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `provider?` | `ProviderId` | Identifier of the provider to use. |
| `options?` | `SignInOptions<true/false>` | Options for the sign‑in flow. |
| `authorizationParams?` | `SignInAuthorizationParams` | Extra query parameters. |

### Returns

| Context | Return type |
|---------|-------------|
| Client component (`"use client"` or Pages Router) | `Promise<void>` |
| Server action | `Promise<SignInResponse>` |

### Notes

- The **client‑side overload** can only be used from **client components**.  
- For **server actions** import the `signIn` function from your auth configuration instead of `@auth/solid-start/client`.

---

## signOut

`signOut` removes the session cookie and automatically includes the CSRF token in the request.

```ts
import { signOut } from "@auth/solid-start/client";

signOut();
```

### Function Signature

```ts
function signOut(options?: SignOutParams<true>): Promise<void>
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options?` | `SignOutParams<true>` | Optional parameters for the sign‑out request. |

### Returns

- `Promise<void>`

### Notes

- The CSRF token is added automatically.  
- The session cookie is cleared on the client side.

---

> **Tip** – If you need to perform a sign‑in or sign‑out from a server‑side action, use the corresponding functions exported from your auth configuration instead of the client helpers.  

*All examples are kept from the original documentation. This reference is intended for developers using the `@auth/solid-start/client` package.*