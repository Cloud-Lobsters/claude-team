# FusionAuth Provider – Auth.js Documentation

> **Auth.js** – The open‑source authentication framework for Node.js and the web.  
> This page documents the built‑in FusionAuth provider, its configuration, and how to use it in a Next.js application.

---

## 1. Overview

FusionAuth is an OAuth 2 / OpenID Connect (OIDC) provider.  
Auth.js ships with a ready‑to‑use provider that implements the standard OAuth 2 flow and returns a `FusionAuthProfile` object that can be customized via Lambda functions.

> **Tip** – If you’re using multi‑tenant FusionAuth, you must pass the `tenantId` option to apply the correct theme and tenant‑specific settings.

---

## 2. `FusionAuthProfile`

The default profile returned by FusionAuth.  
It extends `Record<string, any>` and is indexable.

| Property | Type | Description |
|----------|------|-------------|
| `at_hash` | `string` | Access token hash |
| `aud` | `string` | Audience |
| `authenticationType` | `string` | Authentication type |
| `c_hash` | `string` | Code hash |
| `email` | `string` | User email |
| `email_verified` | `boolean` | Email verification flag |
| `exp` | `number` | Expiration time (Unix epoch) |
| `family_name?` | `string` | Optional family name |
| `given_name?` | `string` | Optional given name |
| `iat` | `number` | Issued at (Unix epoch) |
| `iss` | `string` | Issuer |
| `jti` | `string` | JWT ID |
| `middle_name?` | `string` | Optional middle name |
| `name?` | `string` | Optional full name |
| `picture?` | `string` | Optional profile picture URL |
| `preferred_username?` | `string` | Optional preferred username |
| `scope` | `string` | Scopes granted |
| `sid` | `string` | Session ID |
| `sub` | `string` | Subject (user ID) |

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/fusionauth
```

> **Note** – The callback URL must match the one configured in your FusionAuth application.

### 3.2 Install Dependencies

```bash
npm i @auth/core @auth/core/providers/fusionauth
```

### 3.3 Basic Configuration

```ts
import { Auth } from "@auth/core";
import FusionAuth from "@auth/core/providers/fusionauth";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    FusionAuth({
      clientId: FUSIONAUTH_CLIENT_ID,
      clientSecret: FUSIONAUTH_CLIENT_SECRET,
      tenantId: FUSIONAUTH_TENANT_ID,   // required for multi‑tenant setups
      issuer: FUSIONAUTH_ISSUER,
    }),
  ],
});
```

---

## 4. FusionAuth Application Settings

1. **Create an application**  
   `https://your-fusionauth-server-url/admin/application`

2. **OAuth Settings**  
   - **Redirect URL** – `https://localhost:3000/api/auth/callback/fusionauth`  
   - **Enabled Grants** – Ensure **Authorization Code** is enabled.  
   - **JWT Settings** – If using JWTs, set the signing algorithm to **RS256**.  
     *Generate an RSA key pair → Settings → Key Master → Generate RSA → SHA‑256.*  
     *Assign the key to the application’s Access Token and Id Token signing keys.*

3. **Optional** – For multi‑tenant apps, set the `tenantId` in the provider options.

---

## 5. Customizing the Provider

Auth.js exposes a `default` function that returns an `OAuthConfig<P>`:

```ts
function default<P>(options: OAuthUserConfig<P> & { tenantId: string }): OAuthConfig<P>
```

- **`P`** – Extends `FusionAuthProfile`.  
- **`options`** – Standard OAuth user config plus `tenantId`.  
- **Return** – Configured OAuth provider.

---

## 6. Example: Using FusionAuth in Next.js

> **Prerequisite** – Install `next-auth` and its types.

```ts
/// <reference types="next-auth" />

import NextAuth from 'next-auth';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    {
      id: 'fusionauth',
      name: 'FusionAuth',
      type: 'oidc',
      issuer: process.env.AUTH_FUSIONAUTH_ISSUER!,
      clientId: process.env.AUTH_FUSIONAUTH_CLIENT_ID!,
      clientSecret: process.env.AUTH_FUSIONAUTH_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'offline_access email openid profile',
          tenantId: process.env.AUTH_FUSIONAUTH_TENANT_ID!,
        },
      },
      userinfo: `${process.env.AUTH_FUSIONAUTH_ISSUER}/oauth2/userinfo`,
      // Workaround for a known processing issue
      // https://github.com/nextauthjs/next-auth/issues/8745#issuecomment-1907799026
      token: {
        url: `${process.env.AUTH_FUSIONAUTH_ISSUER}/oauth2/token`,
        conform: async (response: Response) => {
          if (response.status === 401) return response;

          const newHeaders = Array.from(response.headers.entries())
            .filter(([key]) => key.toLowerCase() !== 'www-authenticate')
            .reduce(
              (headers, [key, value]) => (headers.append(key, value), headers),
              new Headers()
            );

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
        },
      },
    },
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt(params) {
      const { token, user, account } = params;
      if (account) {
        // First‑time login – store tokens
        return { ...token, ...account };
      } else if (
        token.expires_at &&
        Date.now() < (token.expires_at as number) * 1000
      ) {
        // Token still valid
        return token;
      } else {
        // Token expired – refresh
        if (!token.refresh_token) throw new TypeError('Missing refresh_token');

        try {
          const refreshResponse = await fetch(
            `${process.env.AUTH_FUSIONAUTH_ISSUER}/oauth2/token`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                client_id: process.env.AUTH_FUSIONAUTH_CLIENT_ID!,
                client_secret: process.env.AUTH_FUSIONAUTH_CLIENT_SECRET!,
                grant_type: 'refresh_token',
                refresh_token: token.refresh_token as string,
              }),
            }
          );

          if (!refreshResponse.ok) throw new Error('Failed to refresh token');

          const tokensOrError = await refreshResponse.json();

          if (!refreshResponse.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          return {
            ...token,
            access_token: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            refresh_token: newTokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error('Error refreshing access_token', error);
          token.error = 'RefreshTokenError';
          return token;
        }
      }
    },
    async session(params) {
      const { session, token } = params;
      return { ...session, ...token };
    },
  },
});
```

### 6.1 Type Declarations

```ts
declare module 'next-auth' {
  interface Session {
    access_token: string;
    expires_in: number;
    id_token?: string;
    expires_at: number;
    refresh_token?: string;
    refresh_token_id?: string;
    error?: 'RefreshTokenError';
    scope: string;
    token_type: string;
    userId: string;
    provider: string;
    type: string;
    providerAccountId: string;
  }
}

declare module 'next-auth' {
  interface JWT {
    access_token: string;
    expires_in: number;
    id_token?: string;
    expires_at: number;
    refresh_token?: string;
    refresh_token_id?: string;
    error?: 'RefreshTokenError';
    scope: string;
    token_type: string;
    userId: string;
    provider: string;
    type: string;
    providerAccountId: string;
  }
}
```

---

## 7. Resources

- [FusionAuth OAuth Documentation](https://fusionauth.io/docs/v1/tech/oauth/)
- [FusionAuth 5‑Minute Setup Guide](https://fusionauth.io/docs/v1/tech/quickstart/)
- [Auth.js GitHub Repository](https://github.com/authjs/authjs)
- [NextAuth.js Documentation](https://next-auth.js.org/)

---

## 8. Notes & Troubleshooting

- **Multi‑tenant** – Always provide `tenantId` in the provider options.  
- **RS256** – If you’re using JWTs, ensure the signing algorithm is RS256; otherwise token validation will fail.  
- **Token Refresh** – The example above handles token refresh automatically. If you encounter `RefreshTokenError`, check that the refresh token is still valid and that the client secret is correct.  
- **Compliance** – Auth.js strictly follows the OAuth 2 / OIDC spec. If a provider deviates, file an issue on the Auth.js GitHub repo.

---

**Auth.js** © 2025 – Auth.js is maintained by Balázs Orbán and the community.