# DuendeIdentityServer6 Provider – Auth.js

> Built‑in integration for Duende IdentityServer 6 (OpenID Connect).

---

## Overview

The **DuendeIdentityServer6** provider allows you to add Duende IdentityServer 6 authentication to your Auth.js application.  
It follows the OpenID Connect specification and returns a user object that extends `DuendeISUser`.

```ts
interface DuendeISUser extends Record<string, any> {
  /** User e‑mail address */
  email: string;
  /** Unique user identifier */
  id: string;
  /** User display name */
  name: string;
  /** Whether the e‑mail address is verified */
  verified: boolean;
}
```

---

## Type Parameters

```ts
default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>
```

`P` extends `DuendeISUser`.  
Use the generic to customize the returned user shape.

---

## Setup

### 1. Callback URL

```
https://example.com/api/auth/callback/duende-identity-server6
```

Add this URL to the **Redirect URIs** section of your Duende IdentityServer 6 client configuration.

### 2. Configuration

```ts
import { Auth } from "@auth/core";
import DuendeIdentityServer6 from "@auth/core/providers/duende-identity-server6";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    DuendeIdentityServer6({
      clientId: DIS6_CLIENT_ID,
      clientSecret: DIS6_CLIENT_SECRET,
      issuer: DIS6_ISSUER,
    }),
  ],
});
```

| Option        | Type   | Description                                 |
|---------------|--------|---------------------------------------------|
| `clientId`    | string | Your Duende client ID.                      |
| `clientSecret`| string | Your Duende client secret.                  |
| `issuer`      | string | Base URL of the Duende IdentityServer 6.    |

---

## Resources

- [DuendeIdentityServer6 documentation](https://docs.duendesoftware.com/)
- [Auth.js provider source](https://github.com/authjs/authjs/blob/main/packages/core/src/providers/duende-identity-server6.ts)

---

## Notes

- The provider assumes the Duende IdentityServer 6 instance follows the OpenID Connect spec.
- The default configuration is suitable for most use cases.  
  To override defaults, refer to the [customizing a built‑in OAuth provider](https://authjs.dev/docs/providers/customizing) guide.
- If you encounter a bug in the default configuration, open an issue on the Auth.js GitHub repository.  
  Non‑spec compliance issues may not be addressed.

---

## Demo IdentityServer

The following configuration works with the public demo server at `https://demo.duendesoftware.com`.  
You can sign in with either `bob/bob` or `alice/alice`.

```ts
import DuendeIdentityServer6 from "@auth/core/providers/duende-identity-server6";

const providers = [
  DuendeIdentityServer6({
    clientId: "interactive.confidential",
    clientSecret: "secret",
    issuer: "https://demo.duendesoftware.com",
  }),
];
```

---

## Example Usage

```ts
import { Auth } from "@auth/core";
import DuendeIdentityServer6 from "@auth/core/providers/duende-identity-server6";

export async function POST(request: Request) {
  return await Auth(request, {
    providers: [
      DuendeIdentityServer6({
        clientId: process.env.DIS6_CLIENT_ID!,
        clientSecret: process.env.DIS6_CLIENT_SECRET!,
        issuer: process.env.DIS6_ISSUER!,
      }),
    ],
  });
}
```

---

**Auth.js © Balázs Orbán and Team – 2025**