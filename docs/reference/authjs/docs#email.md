# Auth.js – Core Types & Usage Guide

> **Auth.js** is the core authentication library that powers the framework‑specific packages (`@auth/next`, `@auth/sveltekit`, etc.).  
> This guide covers the public types, installation, and a minimal usage example.  
> All examples from the original documentation are preserved.

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

> After installing, you can import the sub‑module from `@auth/core/types` if you need explicit type imports.

---

## 2. Usage

> Even if you’re not using TypeScript, IDEs such as VS Code will pick up the types automatically, giving you autocompletion and inline documentation.

### 2.1 Basic Auth Function

```ts
import { Auth } from "@auth/core";

const request = new Request("https://example.com");

const response = await Auth(request, {
  callbacks: {
    // These callbacks are optional – the library already knows the types.
    jwt(): JWT {
      return { foo: "bar" };
    },
    session({ session, token }: { session: Session; token: JWT }) {
      return session;
    },
  },
});
```

> **Tip:** The `Auth` function already infers the types for `jwt` and `session`; you don’t need to annotate them manually.

---

## 3. Core Types

Below is a curated list of the most frequently used types.  
All types are exported from `@auth/core/types`.

| Type | Description | Key Properties |
|------|-------------|----------------|
| **Account** | Information about the provider account. | `provider`, `providerAccountId`, `access_token?`, `refresh_token?`, `expires_at?`, `id_token?`, `token_type?`, `scope?`, `userId?` |
| **Authenticator** | WebAuthn authenticator data. | `counter`, `credentialID`, `credentialPublicKey`, `providerAccountId`, `userId?`, `credentialBackedUp?`, `credentialDeviceType?`, `transports?` |
| **CookieOption** | Cookie configuration. | `name`, `options` |
| **DefaultSession** | Base session shape. | `expires`, `user?` |
| **DefaultUser** | Base user shape. | `id?`, `name?`, `email?`, `image?` |
| **LoggerInstance** | Custom logger interface. | `debug(message, metadata?)`, `error(error)`, `warn(code)` |
| **PagesOptions** | Custom page paths. | `error`, `newUser`, `signIn`, `signOut`, `verifyRequest` |
| **Profile** | OAuth provider profile. | `sub?`, `name?`, `email?`, `picture?`, … (OpenID Connect standard claims) |
| **PublicProvider** | Public provider metadata. | `id`, `name`, `type`, `signinUrl`, `callbackUrl` |
| **ResponseInternal<Body>** | Internal response shape. | `body?`, `cookies?`, `headers?`, `redirect?`, `status?` |
| **Session** | Active session. | `expires`, `user?` |
| **Theme** | Built‑in page theme. | `brandColor?`, `buttonText?`, `colorScheme?`, `logo?` |
| **User** | User shape returned by OAuth providers. | `id?`, `name?`, `email?`, `image?` |
| **AuthAction** | Supported actions (REST endpoints). | `"callback"`, `"csrf"`, `"error"`, `"providers"`, `"session"`, `"signin"`, `"signout"`, `"verify-request"`, `"webauthn-options"` |
| **TokenSet** | OAuth token set. | `access_token?`, `refresh_token?`, `expires_at`, `id_token?`, `token_type?`, `scope?` |
| **WarningCode** | Logger warning codes. | `"debug-enabled"`, `"csrf-disabled"`, … |
| **WebAuthnOptionsResponseBody** | WebAuthn options response. | `{ action: "authenticate", options: PublicKeyCredentialRequestOptionsJSON }` or `{ action: "register", options: PublicKeyCredentialCreationOptionsJSON }` |
| **AuthConfig** | Re‑exported configuration interface. | (see framework docs) |

> **Note:** All optional properties are suffixed with `?`.  
> The `TokenSet` type extends `Partial<TokenEndpointResponse>` and adds an `expires_at` timestamp.

---

## 4. Example: Custom Callback & Session

```ts
import { Auth } from "@auth/core";

const request = new Request("https://example.com");

const response = await Auth(request, {
  callbacks: {
    // Add custom data to the JWT
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // Expose the custom data in the session
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
```

---

## 5. Common Actions & Endpoints

| Action | Method | Description |
|--------|--------|-------------|
| `callback` | GET / POST | Handles OAuth or Credentials callbacks |
| `csrf` | GET | Returns CSRF token (double‑submit cookie) |
| `error` | GET | Renders error page |
| `providers` | GET | Returns list of configured providers |
| `session` | GET / POST | Get or update session |
| `signin` | GET / POST | Render sign‑in page / initiate sign‑in |
| `signout` | GET / POST | Render sign‑out page / terminate session |
| `verify-request` | GET | Render verification request page |
| `webauthn-options` | GET | Return WebAuthn options |

---

## 6. Extending Types

If you need to add custom fields to the session or user objects, extend the corresponding interfaces:

```ts
declare module "@auth/core/types" {
  interface Session {
    // Add a custom field
    customField?: string;
  }

  interface User {
    // Add a custom field
    role?: "admin" | "user";
  }
}
```

---

## 7. Resources

- **TypeScript Basics** – Learn the fundamentals of TypeScript.  
- **Extending Built‑in Types** – How to augment Auth.js types.  
- **Refresh‑Token Rotation** – Database strategy guide.  
- **OpenID Connect Claims** – Standard profile claims reference.  

---

## 8. FAQ

| Question | Answer |
|----------|--------|
| *Do I need to import types manually?* | No. The `Auth` function already infers the types. Import only if you need explicit type references. |
| *Can I disable CSRF?* | Yes, but only if your framework already provides CSRF protection. |
| *What is `AuthConfig`?* | It’s the configuration interface used by framework adapters (e.g., `@auth/next`). |

---

### End of Documentation

Feel free to explore the full API reference on the official website or the GitHub repository. Happy coding!