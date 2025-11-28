# Zitadel Provider – Auth.js

The Zitadel provider is a fully‑featured OpenID Connect (OIDC) integration for Auth.js.  
It exposes the standard OIDC claims and adds a convenient `email_verified` flag that can be used to restrict access to verified accounts.

> **NOTE**  
> Auth.js assumes that the Zitadel provider follows the OpenID Connect specification.  
> The redirect URI must match the callback path exactly (e.g. `https://example.com/api/auth/callback/zitadel`).

---

## 1.  ZitadelProfile

The profile returned by Zitadel when the `profile` callback is invoked.  
It extends `Record<string, any>` and contains all standard OIDC claims.

```ts
export interface ZitadelProfile extends Record<string, any> {
  amr: string;
  aud: string;
  auth_time: number;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  gender: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  locale: string;
  name: string;
  nbf: number;
  phone: string;
  phone_verified: boolean;
  picture: string;
  preferred_username: string;
  sub: string;
}
```

---

## 2.  Default Configuration

```ts
/**
 * Returns the default OIDC configuration for the Zitadel provider.
 *
 * @param options - OAuth user configuration
 * @returns OIDC configuration
 */
export function default<P>(options: OAuthUserConfig<P>): OIDCConfig<P>
```

---

## 3.  Setup

### 3.1  Callback URL

| Environment | Callback URL |
|-------------|--------------|
| Production  | `https://{YOUR_DOMAIN}/api/auth/callback/zitadel` |
| Development | `http://localhost:3000/api/auth/callback/zitadel` |

> **Tip** – Enable *dev mode* in the Zitadel console to allow local redirects.

### 3.2  Configuration Example

```ts
import { Auth } from "@auth/core";
import ZITADEL from "@auth/core/providers/zitadel";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    ZITADEL({
      clientId: ZITADEL_CLIENT_ID,
      clientSecret: ZITADEL_CLIENT_SECRET,
    }),
  ],
});
```

---

## 4.  Customizing the Provider

The provider comes with sensible defaults, but you can override any option.  
For example, to restrict sign‑in to only verified email addresses:

```ts
const options = {
  providers: [
    ZITADEL({
      clientId: ZITADEL_CLIENT_ID,
      clientSecret: ZITADEL_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "zitadel") {
        // Only allow users with a verified email
        return profile.email_verified;
      }
      // Custom logic for other providers
      return true;
    },
  },
};
```

---

## 5.  Resources

| Resource | Description |
|----------|-------------|
| **ZITADEL OpenID Endpoints** | The endpoints exposed by Zitadel for OIDC. |
| **ZITADEL Recommended OAuth Flows** | Best‑practice flows for integrating with Zitadel. |

---

## 6.  Disclaimer

Auth.js strictly follows the OIDC specification.  
If you encounter a bug in the default configuration, open an issue.  
For non‑compliance with the spec, we may not pursue a fix, but you can discuss it in the Auth.js Discussions.

---

## 7.  Type Parameters

```ts
/**
 * @template P - Extends ZitadelProfile
 */
export interface OAuthUserConfig<P> { /* ... */ }

export interface OIDCConfig<P> { /* ... */ }
```

---

### End of Documentation
---