# SimpleLogin Provider – Auth.js

The **SimpleLogin** provider is a built‑in OAuth integration for Auth.js.  
It follows the OpenID Connect specification and can be used with any framework that supports Auth.js (Next.js, SvelteKit, Express, etc.).

---

## 1.  Provider Overview

| Property | Type | Description |
|----------|------|-------------|
| `avatar_url` | `string | undefined` | URL of the user’s avatar. |
| `client` | `string` | The client identifier. |
| `email` | `string` | User’s email address. |
| `email_verified` | `boolean` | Whether the email has been verified. |
| `id` | `number` | Unique numeric ID. |
| `name` | `string` | User’s display name. |
| `sub` | `string` | Subject identifier (unique per provider). |

> **Type Parameter**  
> `P extends SimpleLoginProfile` – the shape of the user profile returned by the provider.

---

## 2.  Setup

### 2.1  Callback URL

| Environment | Callback URL |
|-------------|--------------|
| **Production** | `https://{YOUR_DOMAIN}/api/auth/callback/simplelogin` |
| **Development** | `http://localhost:{PORT}/api/auth/callback/simplelogin` (localhost is automatically whitelisted) |

> **Important**  
> * All redirect URIs must be HTTPS in production.  
> * Localhost is exempted for convenience.

### 2.2  Configuration

```ts
import { Auth } from "@auth/core";
import SimpleLogin from "@auth/core/providers/simplelogin";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    SimpleLogin({
      clientId:   SIMPLELOGIN_CLIENT_ID,
      clientSecret: SIMPLELOGIN_CLIENT_SECRET,
    }),
  ],
});
```

> Replace `SIMPLELOGIN_CLIENT_ID` and `SIMPLELOGIN_CLIENT_SECRET` with the credentials obtained from the SimpleLogin dashboard.

---

## 3.  Resources

| Resource | Link |
|----------|------|
| Sign in with SimpleLogin | https://simplelogin.io/ |
| SimpleLogin OAuth documentation | https://docs.simplelogin.io/docs/oauth |
| SimpleLogin OAuth Configuration | https://docs.simplelogin.io/docs/oauth-configuration |

---

## 4.  Notes

* Auth.js assumes the SimpleLogin provider follows the OpenID Connect spec.  
* The provider’s default configuration is usually sufficient; however, you can override defaults by passing additional options to `SimpleLogin(...)`.  
* If you encounter a bug in the default configuration, open an issue on the Auth.js GitHub repository.  
* Auth.js strictly adheres to the spec and cannot guarantee compliance from third‑party providers. If a provider deviates from the spec, the issue may not be resolved.

---

## 5.  API Reference

```ts
/**
 * Adds SimpleLogin login to your application.
 *
 * @param options - OAuth configuration options.
 * @returns OAuthConfig<P>
 */
function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>
```

---

## 6.  Example Usage (Next.js API Route)

```ts
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import SimpleLogin from "@auth/core/providers/simplelogin";

export default NextAuth({
  providers: [
    SimpleLogin({
      clientId: process.env.SIMPLELOGIN_CLIENT_ID!,
      clientSecret: process.env.SIMPLELOGIN_CLIENT_SECRET!,
    }),
  ],
});
```

---

## 7.  Further Reading

* [Auth.js Documentation](https://authjs.dev/)
* [OpenID Connect Specification](https://openid.net/specs/openid-connect-core-1_0.html)

---