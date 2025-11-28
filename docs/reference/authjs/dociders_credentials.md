# Auth.js – Credentials Provider Documentation

> This document describes the **Credentials** provider that ships with Auth.js.  
> It is intended for use cases where you already have an existing system that
> authenticates users with arbitrary credentials (e.g. username/password,
> domain, 2‑factor, hardware token, etc.).  
> Because credentials are not persisted in a database, the provider can only
> be used when **JSON Web Tokens** are enabled for sessions.

---

## 1. `CredentialInput`

`CredentialInput` is the type that describes a single field in the
credentials form that Auth.js renders on the default sign‑in page.

```ts
/**
 * Extends the standard HTML `<input>` attributes.
 * Only the `label` property is required – all other attributes are optional.
 */
export type CredentialInput = Partial<JSX.IntrinsicElements["input"]> & {
  /** The label that will be shown next to the input field. */
  label: string;
};
```

> **Tip** – If you need to add custom validation or UI logic, you can
> supply any of the standard `<input>` attributes (e.g. `type`, `required`,
> `pattern`, etc.) via the `CredentialInput` object.

---

## 2. `CredentialsConfig`

`CredentialsConfig` is the configuration object you pass to the
`Credentials()` provider factory.

```ts
export interface CredentialsConfig<CredentialsInputs extends Record<string, CredentialInput>>
  extends CommonProviderOptions {
  /** The unique provider id – always `"credentials"`. */
  id: string;

  /** The provider name shown on the sign‑in button. */
  name: string;

  /** The type of the provider – always `"credentials"`. */
  type: "credentials";

  /** The form fields that will be rendered. */
  credentials: CredentialsInputs;

  /**
   * Called when the user submits the form.
   *
   * @param credentials  The values entered by the user.
   * @param request      The original HTTP request.
   *
   * @returns A `User` object on success, `null` or a `CredentialsSignin`
   *          error on failure.
   */
  authorize(
    credentials: Partial<Record<keyof CredentialsInputs, unknown>>,
    request: Request
  ): Awaitable<null | User>;
}
```

### 2.1 `authorize()` – Full Control

The `authorize` callback gives you complete control over how you validate
and authenticate the credentials.

> **Important** – Auth.js does **not** perform any validation for you.
> Use a library such as **Zod** or **Yup** to validate the input before
> attempting authentication.

```ts
import { CredentialsSignin } from "@auth/core/providers/credentials";

class CustomError extends CredentialsSignin {
  code = "custom_error";
}

// URL will contain `error=CredentialsSignin&code=custom_error`
async function authorize(credentials, request) {
  // 1️⃣ Validate the credentials (e.g. with Zod)
  if (!isValidCredentials(credentials)) {
    throw new CustomError(); // generic error for the user
  }

  // 2️⃣ Attempt to fetch the user from your backend
  const user = await getUser(credentials);
  return user ?? null; // null → redirect to login page
}
```

### 2.2 Error Handling

* Returning `null` or throwing a `CredentialsSignin` error redirects the
  user back to the login page with an error query string:
  `?error=CredentialsSignin&code=…`.
* In server‑side frameworks that handle form actions, the error is
  thrown by the form action and can be caught directly.

---

## 3. `CredentialsProviderId`

```ts
export type CredentialsProviderId = "credentials";
```

This is the literal type used for the provider’s `id` and `type`
properties.

---

## 4. `default()` – Factory Function

The `default` function is a convenience wrapper that creates a
`CredentialsConfig` instance.

```ts
/**
 * @template CredentialsInputs
 * @param {Partial<CredentialsConfig<CredentialsInputs>>} config
 * @returns {CredentialsConfig<CredentialsInputs>}
 */
export function default<CredentialsInputs extends Record<string, CredentialInput>>(
  config: Partial<CredentialsConfig<CredentialsInputs>>
): CredentialsConfig<CredentialsInputs> {
  // implementation omitted – returns a fully‑typed config
}
```

> **Why use `default()`?**  
> It provides type inference for the `credentials` object and ensures
> that the returned config satisfies the `CredentialsConfig` interface.

---

## 5. Example – Username / Password

```ts
import { Auth } from "@auth/core";
import Credentials from "@auth/core/providers/credentials";

const request = new Request("https://example.com");

const response = await AuthHandler(request, {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ request }) {
        const response = await fetch(request);
        if (!response.ok) return null;
        return (await response.json()) ?? null;
      },
    }),
  ],
  secret: "...",
  trustHost: true,
});
```

---

## 6. Summary

| Feature | What it does |
|---------|--------------|
| `CredentialInput` | Describes a single form field (label + optional `<input>` attributes). |
| `CredentialsConfig` | Configuration for the provider (id, name, type, credentials, authorize). |
| `authorize()` | Callback that validates credentials and returns a `User` or `null`. |
| `CredentialsProviderId` | Literal type `"credentials"`. |
| `default()` | Factory that returns a fully‑typed `CredentialsConfig`. |
| Error handling | Throw `CredentialsSignin` (or subclass) to redirect with an error code. |

> **Security note** – Because credentials are not stored in a database,
> the provider should only be used when you have a secure, external
> authentication system and you are using JWT‑based sessions.  
> For most applications, consider using a battle‑tested OAuth provider
> instead of building your own password flow.