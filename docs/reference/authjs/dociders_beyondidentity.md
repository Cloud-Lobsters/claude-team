# BeyondIdentity Provider – Auth.js

The **BeyondIdentity** provider is a built‑in OpenID Connect (OIDC) integration for Auth.js.  
It exposes a simple API that can be used with any framework that supports Auth.js.

---

## 1. Profile Shape

```ts
export interface BeyondIdentityProfile {
  /** The user’s email address. */
  email: string;

  /** The user’s full name. */
  name: string;

  /** The user’s preferred username. */
  preferred_username: string;

  /** The user’s unique identifier. */
  sub: string;
}
```

---

## 2. Default Configuration

```ts
/**
 * Returns the default OIDC configuration for the BeyondIdentity provider.
 *
 * @param config - Custom OIDC user configuration.
 * @returns The full OIDC configuration for the provider.
 */
export function default(config: OIDCUserConfig<BeyondIdentityProfile>): OIDCConfig<BeyondIdentityProfile>
```

> By default, Auth.js assumes that the BeyondIdentity provider follows the OIDC specification.  
> If you need to override any defaults, refer to the *Customizing a Built‑in OAuth Provider* guide.

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/beyondidentity
```

> Replace `example.com` with your own domain.

### 3.2 Configuration Example

```ts
import { Auth } from "@auth/core";
import BeyondIdentity from "@auth/core/providers/beyondidentity";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    BeyondIdentity({
      clientId: BEYOND_IDENTITY_CLIENT_ID,
      clientSecret: BEYOND_IDENTITY_CLIENT_SECRET,
      issuer: BEYOND_IDENTITY_ISSUER,
    }),
  ],
});
```

> *`BEYOND_IDENTITY_CLIENT_ID`*, *`BEYOND_IDENTITY_CLIENT_SECRET`*, and *`BEYOND_IDENTITY_ISSUER`* should be replaced with the values provided by your BeyondIdentity account.

---

## 4. Resources

- [Beyond Identity Developer Docs](https://docs.beyondidentity.com/)

---

## 5. Notes

- Auth.js strictly adheres to the OIDC specification.  
- If you encounter a bug in the default configuration, open an issue on GitHub.  
- For non‑compliance issues, we may not pursue a resolution but you can discuss them in the Auth.js Discussions.

---

## 6. Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OIDCUserConfig<BeyondIdentityProfile>` | Custom configuration options for the provider. |
| **Returns** | `OIDCConfig<BeyondIdentityProfile>` | The fully‑formed OIDC configuration. |

---