# Authentik Provider – @auth/core

The **Authentik** provider is a built‑in OAuth/OIDC integration for Auth.js.  
It follows the OpenID Connect specification and exposes a typed user profile
(`AuthentikProfile`) that contains all standard claims returned by Authentik.

---

## 1.  AuthentikProfile

```ts
export interface AuthentikProfile extends Record<string, any> {
  /** Authentication Context Class Reference */
  acr: string;
  /** Access Token hash */
  at_hash: string;
  /** Audience */
  aud: string;
  /** Authentication time (Unix timestamp) */
  auth_time: number;
  /** Code hash */
  c_hash: string;
  /** User email */
  email: string;
  /** Email verified flag */
  email_verified: boolean;
  /** Expiration time (Unix timestamp) */
  exp: number;
  /** Family name */
  family_name: string;
  /** Given name */
  given_name: string;
  /** Groups the user belongs to */
  groups: string[];
  /** Issued at time (Unix timestamp) */
  iat: number;
  /** Issuer */
  iss: string;
  /** Full name */
  name: string;
  /** Nickname */
  nickname: string;
  /** Nonce */
  nonce: string;
  /** Preferred username */
  preferred_username: string;
  /** Subject (user ID) */
  sub: string;
}
```

---

## 2.  Setup

### 2.1  Callback URL

```
https://<your-domain>/api/auth/callback/authentik
```

> **Tip** – The `issuer` option must **not** contain a trailing slash.  
> Example: `https://my-authentik-domain.com/application/o/My_Slug`

### 2.2  Configuration Example

```ts
import { Auth } from "@auth/core";
import Authentik from "@auth/core/providers/authentik";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Authentik({
      clientId: AUTHENTIK_CLIENT_ID,
      clientSecret: AUTHENTIK_CLIENT_SECRET,
      issuer: AUTHENTIK_ISSUER,
    }),
  ],
});
```

> Replace `AUTHENTIK_CLIENT_ID`, `AUTHENTIK_CLIENT_SECRET`, and `AUTHENTIK_ISSUER`
> with the values from your Authentik application.

---

## 3.  API Reference

### 3.1  `default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>`

Adds the Authentik provider to your Auth.js configuration.

```ts
import Authentik from "@auth/core/providers/authentik";

const provider = Authentik({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  issuer: "https://your-authentik-domain.com/application/o/your-slug",
});
```

---

## 4.  Type Parameters

| Parameter | Description |
|-----------|-------------|
| `P` | Extends `AuthentikProfile`. Allows you to add custom fields to the user profile. |

---

## 5.  Parameters

| Name | Type | Description |
|------|------|-------------|
| `options` | `OAuthUserConfig<P>` | Configuration options for the provider. |

---

## 6.  Returns

| Type | Description |
|------|-------------|
| `OAuthConfig<P>` | The configured OAuth provider ready to be used by Auth.js. |

---

## 7.  Resources

- [Authentik OAuth Documentation](https://authentik.io/docs/oauth)
- [OpenID Connect Specification](https://openid.net/specs/openid-connect-core-1_0.html)

---

## 8.  Notes

- By default, Auth.js assumes the Authentik provider follows the OpenID Connect specification.
- The provider comes with a default configuration. To override defaults, refer to the “Customizing a Built‑in OAuth Provider” guide.
- If you encounter a bug in the default configuration, open an issue on the Auth.js GitHub repository.  
  Auth.js strictly adheres to the spec and cannot guarantee compliance with non‑standard provider behavior.

---