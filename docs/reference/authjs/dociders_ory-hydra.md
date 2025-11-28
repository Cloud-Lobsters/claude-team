# Ory Hydra Provider – Auth.js

The **Ory Hydra** provider lets you add Ory Hydra (OpenID Connect) authentication to your Auth.js application.  
Below is a concise, sanitized reference that keeps all examples and type information.

---

## 1. Overview

- **Provider**: `@auth/core/providers/ory-hydra`
- **Specification**: OpenID Connect (OIDC)
- **Default configuration** is provided; you can override it via the `options` object.

---

## 2. TypeScript Types

```ts
/**
 * Profile returned by the Ory Hydra provider.
 */
export interface OryHydraProfile extends Record<string, any> {
  /** Authentication method references */
  amr: string;
  /** Audience */
  aud: string;
  /** Optional email */
  email?: string;
  /** Expiration time */
  exp: string;
  /** Issued at */
  iat: string;
  /** Issuer */
  iss: string;
  /** JWT ID */
  jti: string;
  /** Subject */
  sub: string;
  /** Version */
  ver: string;
}

/**
 * Provider configuration.
 */
export function default<P extends OryHydraProfile>(
  options: OIDCUserConfig<P>
): OIDCConfig<P>;
```

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/hydra
```

> **Tip**: The callback URL must match the one registered in your Ory Hydra instance.

### 3.2 Configuration Example

```ts
import { Auth } from "@auth/core";
import OryHydra from "@auth/core/providers/ory-hydra";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    OryHydra({
      clientId: ORY_HYDRA_CLIENT_ID,
      clientSecret: ORY_HYDRA_CLIENT_SECRET,
      issuer: ORY_HYDRA_ISSUER,
    }),
  ],
});
```

Replace the environment variables (`ORY_HYDRA_CLIENT_ID`, etc.) with your own credentials.

---

## 4. Customizing the Provider

The provider exposes a `default` function that accepts an `options` object.  
You can override any default OIDC settings (e.g., scopes, redirect URI, etc.) by passing the desired values:

```ts
OryHydra({
  clientId: "...",
  clientSecret: "...",
  issuer: "...",
  // Custom scopes
  scope: "openid profile email",
  // Custom redirect URI
  redirectUri: "https://myapp.com/api/auth/callback/hydra",
});
```

---

## 5. Notes

- **Deployment**: Ory Hydra can be used via the default Ory Network or self‑hosted.
- **Compliance**: Auth.js strictly follows the OIDC spec. If you encounter non‑compliant behavior, open an issue or discuss it in the community.
- **Documentation**: For deeper details, refer to the [Ory Hydra documentation](https://www.ory.sh/hydra/docs/).

---

## 6. Resources

- [Auth.js – Ory Hydra Provider](https://authjs.dev/docs/providers/ory-hydra)
- [Ory Hydra Docs](https://www.ory.sh/hydra/docs/)
- [OpenID Connect Spec](https://openid.net/specs/openid-connect-core-1_0.html)

---

## 7. License & Credits

Auth.js © Balázs Orbán and Team – 2025  
© Ory Sh – 2025

---