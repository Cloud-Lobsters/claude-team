# WorkOS Provider – Auth.js Documentation

> **Auth.js** – A lightweight, framework‑agnostic authentication library for Node.js.  
> This guide covers the built‑in WorkOS provider, which bridges your application to a variety of SSO providers via WorkOS.

---

## 1. Overview

WorkOS is not an identity provider itself; it acts as a bridge to multiple SSO providers (Okta, Azure AD, Google Workspace, etc.).  
Auth.js treats the WorkOS provider as a standard OAuth 2.0 provider, but you must specify the **WorkOS Connection** you want to use for each sign‑in.

---

## 2. Profile Object

```ts
/**
 * The profile returned by WorkOS after a successful sign‑in.
 */
export interface WorkOSProfile extends Record<string, any> {
  /** Connection ID */
  connection_id: string;
  /** Connection type (e.g., "saml", "oauth") */
  connection_type: string;
  /** User email */
  email: string;
  /** First name */
  first_name: string;
  /** User ID */
  id: string;
  /** Identity provider ID */
  idp_id: string;
  /** Last name */
  last_name: string;
  /** Object type */
  object: string;
  /** Organization ID */
  organization_id: string;
  /** Raw attributes returned by the SSO provider */
  raw_attributes: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    picture: string;
  };
  /** Alias for `email` */
  email: string;
  /** Alias for `first_name` */
  firstName: string;
  /** Alias for `id` */
  id: string;
  /** Alias for `last_name` */
  lastName: string;
  /** User picture URL */
  picture: string;
}
```

---

## 3. Setup

### 3.1. Install

```bash
npm i @auth/core @auth/core/providers/workos
```

### 3.2. Callback URL

```
https://example.com/api/auth/callback/workos
```

### 3.3. Configuration

```ts
import { Auth } from "@auth/core";
import WorkOS from "@auth/core/providers/workos";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    WorkOS({
      clientId: WORKOS_CLIENT_ID,
      clientSecret: WORKOS_CLIENT_SECRET,
      issuer: WORKOS_ISSUER, // e.g., "https://api.workos.com"
    }),
  ],
});
```

> **Tip** – The provider defaults to the OAuth 2.0 spec. If you need to tweak any defaults, see *Customizing a Built‑in OAuth Provider* below.

---

## 4. Custom Login Flow (Domain‑Based Connection)

Because WorkOS requires a **Connection** to be specified, a common pattern is to let the user enter their email, extract the domain, and pass it to `signIn`.

### 4.1. Custom Sign‑In Page

```tsx
// pages/auth/signin.tsx
import { useState } from "react";
import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  const [email, setEmail] = useState("");

  return (
    <>
      {Object.values(providers).map((provider) => {
        if (provider.id === "workos") {
          return (
            <div key={provider.id}>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={() =>
                  signIn(provider.id, undefined, {
                    domain: email.split("@")[1],
                  })
                }
              >
                Sign in with SSO
              </button>
            </div>
          );
        }

        return (
          <div key={provider.id}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return { props: { providers } };
}
```

### 4.2. Explanation

- `signIn(provider.id, undefined, { domain: ... })`  
  Passes the extracted domain as an `authorizationParams` value.  
- WorkOS will use the domain to determine which Connection to use.

---

## 5. Type Parameters & Options

```ts
/**
 * Options for the WorkOS provider.
 *
 * @template P - Profile type (defaults to WorkOSProfile)
 */
export type WorkOSOptions<P extends WorkOSProfile = WorkOSProfile> = OAuthUserConfig<P> & {
  /** The WorkOS Connection ID to use for this sign‑in. */
  connection: string;
};
```

---

## 6. Customizing the Provider

If you need to override any defaults (e.g., scopes, callback URLs, etc.), pass the desired options to `WorkOS()`:

```ts
WorkOS({
  clientId: "...",
  clientSecret: "...",
  issuer: "...",
  // Custom scopes
  scope: "openid profile email",
  // Custom callback URL
  callbackUrl: "https://example.com/api/auth/callback/workos",
});
```

---

## 7. Notes & Troubleshooting

- **WorkOS is a bridge** – it does not store user identities; it forwards authentication to the underlying SSO provider.
- **Connection ID** – You must know the Connection ID you want to use. It can be obtained from the WorkOS dashboard or via the WorkOS API.
- **Domain‑based connections** – The example above uses the domain to automatically select a Connection. If you prefer a static Connection, simply omit the `domain` parameter and provide the `connection` option in the provider config.
- **Spec compliance** – Auth.js follows the OAuth 2.0 spec strictly. If a provider deviates, file an issue on the Auth.js GitHub repository.

---

## 8. Resources

- [WorkOS SSO OAuth Documentation](https://workos.com/docs)
- [Auth.js GitHub Repository](https://github.com/authjs/authjs)
- [NextAuth.js Docs (for reference)](https://next-auth.js.org)

---

**Auth.js © Balázs Orbán and Team – 2025**