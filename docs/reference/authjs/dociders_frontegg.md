# Frontegg Provider – Auth.js

The Frontegg provider enables **OpenID Connect (OIDC)** authentication with Frontegg in Auth.js.  
It follows the standard OIDC flow and returns a `FronteggProfile` object that contains the user’s claims.

---

## 1. `FronteggProfile`

The profile returned by the provider’s `profile` callback.

| Property | Type | Description |
|----------|------|-------------|
| `email` | `string` | The user’s email address. |
| `email_verified` | `boolean` | Indicates whether the email has been verified. |
| `name` | `string` | The user’s full name. |
| `profilePictureUrl` | `string` | URL to the user’s avatar. |
| `roles` | `string[]` | Array of roles assigned to the user. |
| `sub` | `string` | The unique Frontegg ID for the user. |
| `[claim: string]` | `unknown` | Any additional claims returned by Frontegg. |

```ts
interface FronteggProfile {
  email: string;
  email_verified: boolean;
  name: string;
  profilePictureUrl: string;
  roles: string[];
  sub: string;
  [claim: string]: unknown;
}
```

---

## 2. Default Configuration

```ts
function default(options: OIDCUserConfig<FronteggProfile>): OIDCConfig<FronteggProfile>
```

The provider ships with a sensible default configuration that can be overridden by passing an `options` object.

---

## 3. Setup

### 3.1 Callback URL

Add the following callback URL to your Frontegg portal:

```
https://example.com/api/auth/callback/frontegg
```

### 3.2 Configuration

```ts
import { Auth } from "@auth/core";
import Frontegg from "@auth/core/providers/frontegg";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Frontegg({
      clientId: AUTH_FRONTEGG_ID,
      clientSecret: AUTH_FRONTEGG_SECRET,
      issuer: AUTH_FRONTEGG_ISSUER,
    }),
  ],
});
```

### 3.3 Environment Variables

Create a `.env.local` file in the project root and add:

```dotenv
# Frontegg credentials
AUTH_FRONTEGG_ID="<Client ID>"
AUTH_FRONTEGG_SECRET="<API KEY>"
AUTH_FRONTEGG_ISSUER="https://[YOUR_SUBDOMAIN].frontegg.com"
```

> **How to obtain these values**  
> 1. Log into the Frontegg portal.  
> 2. Navigate to **Authentication → Login method → Hosted login** and add your callback URL.  
> 3. Go to **Environments → Your environment → Env settings** to find the `Client ID` and `API KEY`.  
> 4. Under **Domains → Domain name** you’ll find the issuer URL.

---

## 4. Customizing the Provider

The provider follows the OIDC spec. If you need to override any defaults (e.g., scopes, custom endpoints), pass an `options` object to `Frontegg()`:

```ts
Frontegg({
  clientId: "...",
  clientSecret: "...",
  issuer: "...",
  // Custom scopes
  scope: "openid profile email",
  // Custom endpoints
  authorizationEndpoint: "https://custom.auth.com/authorize",
  tokenEndpoint: "https://custom.auth.com/token",
});
```

---

## 5. Notes

- The provider assumes a standard OIDC implementation.  
- If you encounter a bug or a non‑compliant behavior, open an issue on the Auth.js GitHub repository.  
- For non‑spec compliance, the maintainers may not pursue a fix; consider raising a discussion instead.

---

## 6. Resources

- [Frontegg Documentation](https://frontegg.com/docs)  
- [Auth.js GitHub](https://github.com/authjs/authjs)  
- [Auth.js NPM Package](https://www.npmjs.com/package/@auth/core)

---