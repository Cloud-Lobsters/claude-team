# Apple Sign‑In Provider – @auth/core

> This document describes the built‑in **Apple** OAuth provider that ships with `@auth/core`.  
> It covers the data structures, usage examples, configuration options, and important notes.

---

## 1. Types

```ts
// The shape of the user query parameter that Apple sends the first time the user consents.
export interface AppleNonConformUser {
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  firstName: string;
  lastName: string;
}

// The profile returned by Apple when using the `profile` callback.
export interface AppleProfile extends Record<string, any> {
  // Standard JWT claims
  at_hash: string;
  aud: string;
  auth_time: number;
  email: string;
  email_verified: true | "true";
  exp: number;
  iat: number;
  is_private_email: boolean | "true" | "false";
  iss: "https://appleid.apple.com";
  nonce: string;
  nonce_supported: boolean;
  real_user_status: 0 | 1 | 2;
  sub: string;
  transfer_sub: string;

  // Optional user data (only present on first consent)
  user?: AppleNonConformUser;
}
```

---

## 2. Usage

```ts
import Apple from "@auth/core/providers/apple";

export const providers = [
  Apple({
    clientId: process.env.AUTH_APPLE_ID,
    clientSecret: process.env.AUTH_APPLE_SECRET,
  }),
];
```

### Callback URL

```
https://example.com/auth/callback/apple
```

> **Important** – Apple does **not** support `http://localhost` URLs.  
> The callback must be a live HTTPS endpoint.

---

## 3. Configuration

```ts
/**
 * @param config
 * @returns OAuthConfig<AppleProfile>
 */
function default(config: OAuthUserConfig<AppleProfile>): OAuthConfig<AppleProfile> {
  // internal implementation – you normally just call Apple(...)
}
```

### Required Options

| Option | Type | Description |
|--------|------|-------------|
| `clientId` | `string` | Your Apple **Client ID** (Service ID). |
| `clientSecret` | `string` | A JWT that serves as the Apple **Client Secret**. |

> Use the CLI helper `npx auth add apple` to generate the client secret and add the env variables to your `.env` file.

---

## 4. Notes & Gotchas

| Topic | Details |
|-------|---------|
| **Client Secret** | Must be a JWT. The CLI helper generates it for you. |
| **User Data** | Apple only returns `email` and `name` on the **first** consent. Subsequent logins will not provide these fields. |
| **Multiple Deployments** | Apple does not allow the same client to be used across multiple deployments (e.g., preview environments). |
| **Non‑compliance** | If you encounter a spec violation, open an issue. The provider follows the spec strictly. |
| **Local Development** | Use a tunnel (e.g., ngrok) with HTTPS; Apple will reject `http://localhost`. |

---

## 5. Resources

- [Sign in with Apple Overview](https://developer.apple.com/sign-in-with-apple/)
- [Apple REST API](https://developer.apple.com/documentation/sign_in_with_apple)
- [How to retrieve the user’s information from Apple ID servers](https://developer.apple.com/documentation/sign_in_with_apple)
- [Creating the Client Secret](https://developer.apple.com/documentation/sign_in_with_apple/generating_a_client_secret)

---

## 6. Example Project

```ts
// auth.ts
import NextAuth from "next-auth";
import Apple from "@auth/core/providers/apple";

export default NextAuth({
  providers: [
    Apple({
      clientId: process.env.AUTH_APPLE_ID!,
      clientSecret: process.env.AUTH_APPLE_SECRET!,
    }),
  ],
  callbacks: {
    async profile(profile) {
      // `profile` is of type AppleProfile
      return {
        id: profile.sub,
        name: profile.user?.name?.firstName + " " + profile.user?.name?.lastName,
        email: profile.email,
      };
    },
  },
});
```

---

### End of Documentation

Feel free to open an issue or discussion if you need help or encounter a bug.