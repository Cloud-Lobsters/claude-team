# Auth.js – Google Provider

The Google provider is a built‑in OAuth provider that follows the Open ID Connect specification.  
It exposes a typed profile (`GoogleProfile`) and a convenient `Google()` helper that returns an `OAuthConfig`.

---

## 1.  GoogleProfile

```ts
/**
 * Google OAuth profile returned by the provider.
 */
export interface GoogleProfile extends Record<string, any> {
  /** Audience */
  aud: string;
  /** Authorized party */
  azp: string;
  /** User email */
  email: string;
  /** Whether the email is verified */
  email_verified: boolean;
  /** Expiration time (seconds since epoch) */
  exp: number;
  /** Family name (optional) */
  family_name?: string;
  /** Given name */
  given_name: string;
  /** Hosted domain (optional) */
  hd?: string;
  /** Issued at (seconds since epoch) */
  iat: number;
  /** Issuer */
  iss: string;
  /** JWT ID (optional) */
  jti?: string;
  /** Locale (optional) */
  locale?: string;
  /** Full name */
  name: string;
  /** Not before (optional) */
  nbf?: number;
  /** Profile picture URL */
  picture: string;
  /** Subject (user ID) */
  sub: string;
}
```

---

## 2.  Setup

### 2.1  Callback URL

| Environment | Callback URL |
|-------------|--------------|
| Production  | `https://{YOUR_DOMAIN}/api/auth/callback/google` |
| Development | `http://localhost:3000/api/auth/callback/google` |

> **Note**  
> The callback URL must be registered in the Google Cloud Console under **Authorized redirect URIs**.

### 2.2  Basic Configuration

```ts
import { Auth } from "@auth/core";
import Google from "@auth/core/providers/google";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
```

---

## 3.  Advanced Options

### 3.1  Force Refresh Token

Google only issues a refresh token the first time a user signs in.  
To always receive a refresh token you can add the following parameters to the authorization request:

```ts
Google({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
});
```

> **Caution** – This will prompt every user to confirm access each time they sign in.

### 3.2  Email Verification & Domain Restriction

You can restrict sign‑in to verified email addresses or a specific domain:

```ts
{
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true; // other providers
    },
  },
}
```

---

## 4.  Customizing the Provider

The Google provider comes with sensible defaults.  
If you need to override any of those defaults, refer to the guide on *Customizing a Built‑in OAuth Provider*.

---

## 5.  Miscellaneous

- **Refresh Token** – If you need the refresh token or access token and you’re not persisting users in a database, you’ll need to handle it manually (e.g., store it in a session or a secure cookie).
- **Compliance** – Auth.js strictly follows the OAuth/OpenID Connect spec. If you encounter a provider that deviates, open an issue or discuss it in the community.

---

## 6.  References

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google OAuth Configuration](https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred)

---

**Auth.js** © Balázs Orbán and Team – 2025  
[GitHub](https://github.com/authjs/authjs) | [NPM](https://www.npmjs.com/package/@auth/core) | [Discord](https://discord.gg/authjs)