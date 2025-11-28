# Keycloak Provider – Auth.js

The **Keycloak** provider is a built‑in OpenID Connect (OIDC) integration for Auth.js.  
It allows you to add Keycloak authentication to any Auth.js‑powered application.

> **Note**  
> Auth.js assumes the provider follows the OIDC specification.  
> If you encounter a bug in the default configuration, open an issue on GitHub.

---

## 1. Overview

| Feature | Description |
|---------|-------------|
| **Provider** | `@auth/core/providers/keycloak` |
| **Type** | OIDC |
| **Default configuration** | Provided, but can be overridden |

---

## 2. `KeycloakProfile`

The profile returned by Keycloak extends `Record<string, any>` and includes the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `acr` | `string` | Authentication Context Class Reference |
| `at_hash` | `string` | Access Token hash |
| `aud` | `string` | Audience |
| `auth_time` | `number` | Authentication time |
| `azp` | `string` | Authorized party |
| `email` | `string` | User email |
| `email_verified` | `boolean` | Email verification status |
| `exp` | `number` | Expiration time |
| `family_name` | `string` | User’s family name |
| `given_name` | `string` | User’s given name |
| `iat` | `number` | Issued at |
| `iss` | `string` | Issuer |
| `jti` | `string` | JWT ID |
| `name` | `string` | Full name |
| `picture` | `string` | Profile picture URL |
| `preferred_username` | `string` | Preferred username |
| `session_state` | `string` | Session state |
| `sid` | `string` | Session ID |
| `sub` | `string` | Subject (user ID) |
| `typ` | `string` | Token type |
| `user` | `any` | Raw user object (optional) |

---

## 3. Setup

### 3.1 Callback URL

Add the following callback URL to your Keycloak client configuration:

```
https://example.com/api/auth/callback/keycloak
```

### 3.2 Configuration

```ts
import { Auth } from "@auth/core";
import Keycloak from "@auth/core/providers/keycloak";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Keycloak({
      clientId: KEYCLOAK_CLIENT_ID,
      clientSecret: KEYCLOAK_CLIENT_SECRET,
      issuer: KEYCLOAK_ISSUER, // e.g. https://my-keycloak-domain.com/realms/My_Realm
    }),
  ],
});
```

> **Tip**  
> Create an *OpenID Connect* client in Keycloak with **Access Type** set to **confidential**.

### 3.3 Customizing the Provider

If you need to override the default settings, refer to the [customizing a built‑in OAuth provider](https://authjs.dev/docs/providers/customizing) guide.

---

## 4. Resources

- [Keycloak OIDC Documentation](https://www.keycloak.org/docs/latest/securing_apps/#openid-connect)
- [Auth.js GitHub Repository](https://github.com/authjs/authjs)
- [Auth.js Documentation](https://authjs.dev)

---

## 5. Type Definitions

```ts
/**
 * KeycloakProfile extends the standard OIDC profile with Keycloak‑specific fields.
 */
export interface KeycloakProfile extends Record<string, any> {
  acr: string;
  at_hash: string;
  aud: string;
  auth_time: number;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  picture: string;
  preferred_username: string;
  session_state: string;
  sid: string;
  sub: string;
  typ: string;
  user: any;
}

/**
 * Keycloak provider options.
 */
export type KeycloakOptions<P extends KeycloakProfile = KeycloakProfile> = OIDCUserConfig<P>;

/**
 * Returns an OIDC configuration for Keycloak.
 */
export function default<P extends KeycloakProfile = KeycloakProfile>(
  options: KeycloakOptions<P>
): OIDCConfig<P>;
```

---

## 6. Example Flow

1. **User clicks “Login with Keycloak”**  
   → Redirects to Keycloak’s authorization endpoint.

2. **Keycloak authenticates the user**  
   → Redirects back to `/api/auth/callback/keycloak` with an authorization code.

3. **Auth.js exchanges the code for tokens**  
   → Retrieves the user profile and stores session data.

4. **User is authenticated**  
   → Session cookie is set; you can access `req.auth` in your routes.

---

## 7. FAQ

| Question | Answer |
|----------|--------|
| *Can I use Keycloak with a custom realm?* | Yes – set `issuer` to `https://<keycloak-domain>/realms/<realm-name>`. |
| *What if my Keycloak client is public?* | The provider expects a **confidential** client. Public clients are not supported. |
| *How do I handle token refresh?* | Auth.js handles token refresh automatically if the provider supports it. |

---

**Auth.js** © Balázs Orbán and Team – 2025  
[GitHub](https://github.com/authjs/authjs) | [NPM](https://www.npmjs.com/package/@auth/core) | [Docs](https://authjs.dev)