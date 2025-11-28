# Refresh Token Rotation – Auth.js Documentation

> **TL;DR**  
> Refresh‑token rotation lets you renew an access token without user interaction.  
> Auth.js supports it via the **JWT** or **Database** session strategies.  
> The following guide shows how to implement it for Google OAuth in a Next.js app.

---

## 1. What is Refresh‑Token Rotation?

When an access token expires, the provider can issue a *refresh token* that can be used to obtain a new access token.  
Refresh tokens are usually **single‑use** – after a successful refresh they are invalidated.  
Because of this, a race condition can occur if multiple requests try to refresh at the same time.  
Auth.js does not yet provide a built‑in lock, but you can mitigate this by:

* Refreshing in the background before the token expires.  
* Using a single request path that serialises refreshes (e.g. a dedicated API route).

---

## 2. Prerequisites

| Item | Notes |
|------|-------|
| **OAuth provider** | Must support `refresh_token` (Google, GitHub, etc.) |
| **Access type** | For Google, set `access_type: "offline"` and `prompt: "consent"` |
| **Environment variables** | `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` |

---

## 3. JWT Session Strategy

### 3.1. Setup

```ts
// ./auth.ts
import NextAuth, { type User } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth } = NextAuth({
  providers: [
    Google({
      // Google requires "offline" access_type to provide a `refresh_token`
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // First‑time login – store tokens
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      }

      // Token still valid – nothing to do
      if (Date.now() < token.expires_at * 1000) {
        return token;
      }

      // Token expired – try to refresh
      if (!token.refresh_token) throw new TypeError("Missing refresh_token");

      try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          body: new URLSearchParams({
            client_id: process.env.AUTH_GOOGLE_ID!,
            client_secret: process.env.AUTH_GOOGLE_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token!,
          }),
        });

        const tokensOrError = await response.json();

        if (!response.ok) throw tokensOrError;

        const newTokens = tokensOrError as {
          access_token: string;
          expires_in: number;
          refresh_token?: string;
        };

        return {
          ...token,
          access_token: newTokens.access_token,
          expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
          // Preserve old refresh_token if provider didn't return a new one
          refresh_token: newTokens.refresh_token ?? token.refresh_token,
        };
      } catch (error) {
        console.error("Error refreshing access_token", error);
        token.error = "RefreshTokenError";
        return token;
      }
    },

    async session({ session, token }) {
      session.error = token.error;
      return session;
    },
  },
});
```

### 3.2. TypeScript Augmentation

```ts
declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
  }
}
```

### 3.3. Handling Errors

```tsx
// app/dashboard/page.tsx
import { auth, signIn } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    await signIn("google"); // Force re‑auth to get fresh tokens
  }
}
```

---

## 4. Database Session Strategy

When using a database adapter, store the tokens in the `account` table.

```ts
// ./auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const [googleAccount] = await prisma.account.findMany({
        where: { userId: user.id, provider: "google" },
      });

      if (googleAccount.expires_at * 1000 < Date.now()) {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: "refresh_token",
              refresh_token: googleAccount.refresh_token,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          await prisma.account.update({
            data: {
              access_token: newTokens.access_token,
              expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
              refresh_token: newTokens.refresh_token ?? googleAccount.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: googleAccount.providerAccountId,
              },
            },
          });
        } catch (error) {
          console.error("Error refreshing access_token", error);
          session.error = "RefreshTokenError";
        }
      }

      return session;
    },
  },
});
```

```ts
declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
  }
}
```

---

## 5. Summary

| Strategy | Where tokens are stored | Typical use‑case |
|----------|------------------------|------------------|
| **JWT** | Encrypted JWT in an HttpOnly cookie | Stateless, no DB |
| **Database** | `account` table | Persisted, easier to audit |

Both strategies follow the same refresh flow:

1. **Check expiry** (`expires_at`).  
2. **If expired**, call the provider’s token endpoint with `grant_type=refresh_token`.  
3. **Store** the new `access_token`, `expires_at`, and optionally a new `refresh_token`.  
4. **Handle errors** by setting `session.error` and optionally forcing a re‑auth.

---

> **Next steps**  
> * Add a lock or background refresh to avoid race conditions.  
> * Extend the guide for other providers (GitHub, Azure AD, etc.).  
> * Contribute to Auth.js if you’d like to see built‑in support for automatic rotation.  

*Last updated: June 22 2025*