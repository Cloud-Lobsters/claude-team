# SvelteKitAuthConfig

`SvelteKitAuthConfig` is the configuration object passed to the `SvelteKitAuth` (or `NextAuth` in Next.js) function.  
It extends `AuthConfig` but omits the raw property, and adds framework‑specific defaults.

> **Tip** – All examples below are valid TypeScript/JavaScript snippets that can be dropped straight into your `auth.ts` file.

---

## 1. Basic Structure

```ts
import { SvelteKitAuthConfig } from '@auth/sveltekit';

export const authConfig: SvelteKitAuthConfig = {
  // your configuration here
};
```

---

## 2. Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **adapter** | `Adapter | undefined` | `undefined` | Database adapter (e.g. Prisma, MongoDB). |
| **basePath** | `string | undefined` | `"/api/auth"` (Next.js) / `"/auth"` (others) | Base path for Auth.js API endpoints. |
| **callbacks** | `Callbacks | undefined` | `undefined` | Async functions that control flow. |
| **cookies** | `Partial<CookiesOptions> | undefined` | `{}` | Override default cookie names/options. |
| **debug** | `boolean | undefined` | `false` | Enable debug logs. |
| **events** | `Events | undefined` | `{}` | Audit‑logging callbacks. |
| **experimental** | `{ enableWebAuthn?: boolean } | undefined` | `{}` | Experimental features. |
| **jwt** | `Partial<JWTOptions> | undefined` | `undefined` | JWT options (enabled by default if no adapter). |
| **logger** | `Partial<LoggerInstance> | undefined` | `console` | Custom logger. |
| **pages** | `Partial<PagesOptions> | undefined` | `{}` | Custom page URLs. |
| **providers** | `Provider[]` | `[]` | List of authentication providers. |
| **redirectProxyUrl** | `string | undefined` | `process.env.AUTH_REDIRECT_PROXY_URL` | Override redirect URI for OAuth. |
| **secret** | `string | string[] | undefined` | `undefined` | Secret(s) for signing tokens & cookies. |
| **session** | `SessionOptions | undefined` | `{}` | Session configuration. |
| **skipCSRFCheck** | `typeof skipCSRFCheck | undefined` | `undefined` | Skip CSRF check (advanced). |
| **theme** | `Theme | undefined` | `undefined` | Theme for built‑in pages. |
| **trustHost** | `boolean | undefined` | `undefined` | Trust the incoming host header. |
| **useSecureCookies** | `boolean | undefined` | `false` (HTTP) / `true` (HTTPS) | Secure‑cookie flag. |

---

## 3. Callbacks

Callbacks are async functions that let you customize the authentication flow.

### 3.1 `jwt`

```ts
callbacks: {
  async jwt({ token, user, account, profile, trigger, session }) {
    // Called on sign‑in or session refresh
    if (trigger === "signIn") {
      token.accessToken = account?.access_token;
    }
    return token;
  }
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `token` | `JWT` | Current JWT payload. |
| `user` | `User | AdapterUser` | User object (only on sign‑in). |
| `account` | `Account | null` | OAuth account info. |
| `profile` | `Profile | undefined` | OAuth profile. |
| `trigger` | `"signIn" | "update" | "signUp"` | Why the callback was invoked. |
| `session` | `any` | Data from `useSession().update()` (if using JWT strategy). |

### 3.2 `redirect`

```ts
callbacks: {
  async redirect({ url, baseUrl }) {
    // Allow relative URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;

    // Allow same‑origin URLs
    if (new URL(url).origin === baseUrl) return url;

    return baseUrl; // fallback
  }
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `string` | Callback URL requested by the client. |
| `baseUrl` | `string` | Base URL of the site. |

### 3.3 `session`

```ts
callbacks: {
  async session({ session, token, user }) {
    // Expose access token to the client
    session.accessToken = token.accessToken;
    return session;
  }
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `session` | `Session | DefaultSession` | Current session object. |
| `token` | `JWT` | JWT payload (if using JWT strategy). |
| `user` | `User | AdapterUser` | User object (if using database strategy). |

### 3.4 `signIn`

```ts
callbacks: {
  async signIn({ profile }) {
    // Only allow users from a specific domain
    return profile?.email?.endsWith("@yourdomain.com");
  }
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `account` | `Account | null` | OAuth account. |
| `credentials` | `Record<string, CredentialInput> | undefined` | Credentials (if using Credentials provider). |
| `email` | `{ verificationRequest: boolean } | undefined` | Email provider state. |
| `profile` | `Profile | undefined` | OAuth profile. |
| `user` | `User | AdapterUser | undefined` | User object. |

---

## 4. Events

Events are fire‑and‑forget callbacks useful for audit logging.

```ts
events: {
  async createUser({ user }) {
    console.log("New user created:", user.id);
  },
  async signIn({ user, account, profile, isNewUser }) {
    console.log("User signed in:", user.email);
  },
  async signOut({ token, session }) {
    console.log("User signed out:", session?.user?.email);
  }
}
```

| Event | Message Shape | Description |
|-------|---------------|-------------|
| `createUser` | `{ user: User }` | After a new user is created. |
| `linkAccount` | `{ account: Account, profile: User | AdapterUser, user: User | AdapterUser }` | After linking an OAuth account. |
| `session` | `{ session: Session, token: JWT }` | After a session is created/updated. |
| `signIn` | `{ account?, isNewUser?, profile?, user }` | After a successful sign‑in. |
| `signOut` | `{ session?, token? }` | After a sign‑out. |
| `updateUser` | `{ user: User }` | After a user is updated. |

---

## 5. Session Configuration

```ts
session: {
  strategy: "jwt",          // or "database"
  maxAge: 2592000,          // 30 days
  updateAge: 86400,         // 1 day
  generateSessionToken: () => crypto.randomUUID()
}
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `strategy` | `"jwt" | "database"` | How sessions are stored. |
| `maxAge` | `number` | `2592000` | Session expiration in seconds. |
| `updateAge` | `number` | `86400` | Frequency of session updates. |
| `generateSessionToken` | `() => string` | Random UUID | Custom token generator for database sessions. |

---

## 6. Example: Full Configuration

```ts
import { SvelteKitAuthConfig } from '@auth/sveltekit';
import Google from '@auth/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prismaClient';

export const authConfig: SvelteKitAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60    // 1 day
  },
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    }
  },
  events: {
    async signIn({ user }) {
      console.log(`User signed in: ${user.email}`);
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  },
  debug: process.env.NODE_ENV !== 'production'
};
```

---

## 7. Advanced Options

- **`experimental.enableWebAuthn`** – Enable WebAuthn support (experimental).  
- **`skipCSRFCheck`** – Disable CSRF protection (advanced).  
- **`trustHost`** – Must be `true` if you rely on the `Host` header.  
- **`useSecureCookies`** – Force cookies to be `Secure` (HTTPS only).  

---

## 8. Common Pitfalls

| Issue | Fix |
|-------|-----|
| **CSRF errors** | Set `trustHost: true` on platforms that set the host header safely. |
| **Session not persisting** | Ensure `adapter` is set or `session.strategy` is `"jwt"`. |
| **Redirect loops** | Verify `redirect` callback returns a valid URL. |
| **Missing `secret`** | Generate with `npx auth secret` and set `AUTH_SECRET`. |

---

## 9. References

- [Auth.js Docs](https://authjs.dev/)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [SvelteKit Auth Docs](https://authjs.dev/docs/frameworks/sveltekit)

---