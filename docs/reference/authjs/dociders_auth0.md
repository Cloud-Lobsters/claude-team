# Auth0 Provider – Auth.js

The **Auth0** provider is a built‑in OAuth provider for Auth.js that lets you authenticate users via Auth0.  
It follows the OpenID Connect (OIDC) specification and returns an `Auth0Profile` object that contains the user’s profile information.

---

## 1. Overview

| Feature | Description |
|---------|-------------|
| **Provider** | Auth0 |
| **Protocol** | OAuth 2.0 / OpenID Connect |
| **Profile type** | `Auth0Profile` |
| **Default callback URL** | `https://example.com/api/auth/callback/auth0` |

---

## 2. `Auth0Profile`

The profile returned by Auth0 when the `profile` callback is used. It extends `Record<string, any>` and contains the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `app_metadata` | `object` | Custom fields that influence user access (e.g., roles, plans). |
| `blocked` | `boolean` | Whether the user is blocked. |
| `created_at` | `Date` | Timestamp of profile creation. |
| `email` | `string` | User’s email address. |
| `email_verified` | `boolean` | Whether the email is verified. |
| `family_name` | `string` | User’s family name. |
| `given_name` | `string` | User’s given name. |
| `identities` | `Array<Identity>` | Information from the identity provider(s). |
| `last_ip` | `string` | IP of the last login. |
| `last_login` | `Date` | Timestamp of the last login. |
| `last_password_reset` | `Date` | Timestamp of the last password reset (Database connections only). |
| `logins_count` | `number` | Total number of logins. |
| `multifactor` | `string` | List of MFA providers the user is enrolled in. |
| `name` | `string` | Full name. |
| `nickname` | `string` | Nickname. |
| `phone_number` | `string` | Phone number (SMS connections only). |
| `phone_verified` | `boolean` | Whether the phone number is verified. |
| `picture` | `string` | URL to the profile picture. |
| `sub` | `string` | Unique identifier. |
| `updated_at` | `Date` | Timestamp of the last profile update. |
| `user_id` | `string` | Unique identifier for the connection/provider. |
| `user_metadata` | `object` | Custom fields that do not affect access. |
| `username` | `string` | Username. |

### `Identity` (inside `identities`)

| Property | Type | Description |
|----------|------|-------------|
| `connection` | `string` | Auth0 connection name. |
| `isSocial` | `boolean` | Whether the connection is social. |
| `profileData` | `object` | User info from the provider. |
| `provider` | `string` | Provider name (e.g., `google-oauth2`). |
| `user_id` | `string` | Provider‑specific user ID. |

---

## 3. Setup

### 3.1 Install Auth.js

```bash
npm i @auth/core
```

### 3.2 Import the provider

```ts
import { Auth } from "@auth/core";
import Auth0 from "@auth/core/providers/auth0";
```

### 3.3 Create the authentication handler

```ts
const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Auth0({
      clientId: AUTH0_ID,
      clientSecret: AUTH0_SECRET,
    }),
  ],
});
```

> **Tip** – Replace `AUTH0_ID` and `AUTH0_SECRET` with your Auth0 credentials.

---

## 4. Configuration

The provider accepts an `OIDCUserConfig<Auth0Profile>` object.  
The following options are available:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clientId` | `string` | **Required** | Auth0 client ID. |
| `clientSecret` | `string` | **Required** | Auth0 client secret. |
| `issuer` | `string` | `https://YOUR_DOMAIN/` | Auth0 domain. |
| `authorization` | `object` | `{ params: { scope: "openid profile email" } }` | Authorization endpoint parameters. |
| `token` | `object` | `{ params: { grant_type: "authorization_code" } }` | Token endpoint parameters. |
| `profile` | `function` | Default | Function to transform the raw profile into `Auth0Profile`. |
| `callbackUrl` | `string` | `https://example.com/api/auth/callback/auth0` | Callback URL. |

> **Customizing** – To override defaults, pass the desired options in the `Auth0()` call.

---

## 5. Example – Full Flow

```ts
import { Auth } from "@auth/core";
import Auth0 from "@auth/core/providers/auth0";

export async function authHandler(request: Request) {
  return await Auth(request, {
    providers: [
      Auth0({
        clientId: process.env.AUTH0_ID!,
        clientSecret: process.env.AUTH0_SECRET!,
        issuer: `https://${process.env.AUTH0_DOMAIN}`,
        callbackUrl: `${process.env.BASE_URL}/api/auth/callback/auth0`,
      }),
    ],
  });
}
```

---

## 6. Notes

- The provider uses the default Auth0 configuration.  
- If you need to customize the OAuth flow (e.g., scopes, response type), adjust the `authorization` and `token` options.  
- The `profile` callback can be overridden to map Auth0’s raw profile to a custom shape.

---

## 7. Resources

- [Auth0 Documentation](https://auth0.com/docs/)
- [Auth.js GitHub Repository](https://github.com/authjs/authjs)
- [OpenID Connect Spec](https://openid.net/specs/openid-connect-core-1_0.html)

---

## 8. Support

If you encounter a bug or a spec deviation, open an issue on the Auth.js GitHub repository. For general questions, join the Discord community or consult the Discussions section.