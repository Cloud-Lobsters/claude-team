# TikTok Provider – Auth.js

The TikTok provider is a built‑in OAuth 2.0 provider for Auth.js.  
It allows you to add TikTok login to your application with minimal configuration.

> **Note**  
> Email addresses are not supported by TikTok.  
> Production applications cannot use `localhost` URLs – you must register the domain and callback URLs in the TikTok app console and obtain approval from the TikTok team.  
> For local testing you can use the TikTok sandbox and a tunneling service such as ngrok.

---

## 1.  Provider Overview

| Property | Type | Description |
|----------|------|-------------|
| `data` | `object` | Raw response from TikTok. |
| `user` | `object` | Normalised user profile. |
| `error` | `object` | Error information if the request fails. |

### 1.1  User Profile (`user`)

| Field | Type | Optional | Description |
|-------|------|----------|-------------|
| `avatar_large_url` | `string` | ✓ | High‑resolution profile image. |
| `avatar_url` | `string` | | Profile image. |
| `avatar_url_100` | `string` | ✓ | 100×100 profile image. |
| `bio_description` | `string` | ✓ | User’s bio. |
| `display_name` | `string` | | Display name. |
| `email` | `string` | ✓ | **Not supported** – always `undefined`. |
| `follower_count` | `number` | ✓ | Number of followers. |
| `following_count` | `number` | ✓ | Number of accounts followed. |
| `is_verified` | `boolean` | ✓ | Verified badge status. |
| `likes_count` | `number` | ✓ | Total likes across all videos. |
| `open_id` | `string` | | Unique identifier for the user in the current app. |
| `profile_deep_link` | `string` | ✓ | Link to the user’s TikTok profile page. |
| `union_id` | `string` | ✓ | Persistent identifier across multiple apps from the same developer. |
| `username` | `string` | | TikTok username. |
| `video_count` | `number` | ✓ | Total number of public videos. |

> **How to request optional fields**  
> Add the desired field names to the `fields` query parameter in the user‑info request, e.g. `fields=avatar_url_100,display_name`.

### 1.2  Error Object (`error`)

| Field | Type | Description |
|-------|------|-------------|
| `code` | `string` | Error category. |
| `log_id` | `string` | Internal log identifier. |
| `message` | `string` | Human‑readable error message. |

---

## 2.  Setup

### 2.1  Install Auth.js

```bash
npm i @auth/core
```

### 2.2  Add the TikTok provider

```ts
import { Auth } from "@auth/core";
import TikTok from "@auth/core/providers/tiktok";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    TikTok({
      clientId: process.env.AUTH_TIKTOK_ID,
      clientSecret: process.env.AUTH_TIKTOK_SECRET,
    }),
  ],
});
```

> **Environment variables**  
> `AUTH_TIKTOK_ID` – the *Client Key* from the TikTok application.  
> `AUTH_TIKTOK_SECRET` – the client secret.

### 2.3  Callback URL

```
https://example.com/api/auth/callback/tiktok
```

Add this URL to the **Redirect URLs** section of your TikTok app console.

---

## 3.  Customising the Provider

The default configuration is sufficient for most use cases, but you can override it if you need custom scopes, fields, or request handling.

```ts
import { OAuthConfig, OAuthUserConfig } from "@auth/core/types";

export default function TikTokCustom(
  options: OAuthUserConfig<TiktokProfile>
): OAuthConfig<TiktokProfile> {
  return {
    id: "tiktok",
    name: "TikTok",
    type: "oauth",
    client: {
      token_endpoint_auth_method: "client_secret_post",
    },

    // Authorization endpoint
    authorization: {
      url: "https://www.tiktok.com/v2/auth/authorize",
      params: {
        client_key: options.clientId,
        scope: "user.info.profile,user.info.stats,video.list", // Add scopes you need
      },
    },

    // Token endpoint
    token: "https://open.tiktokapis.com/v2/oauth/token/",

    // User info endpoint
    userinfo: "https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,username",

    // Custom fetch to add client_key to the token request
    async [customFetch](...args) {
      const url = new URL(args[0] instanceof Request ? args[0].url : args[0]);

      if (url.pathname.endsWith("/token/")) {
        const [url, request] = args;
        const customHeaders = {
          ...request?.headers,
          "content-type": "application/x-www-form-urlencoded",
        };

        const customBody = new URLSearchParams(request?.body as string);
        customBody.append("client_key", process.env.AUTH_TIKTOK_ID!);

        const response = await fetch(url, {
          ...request,
          headers: customHeaders,
          body: customBody.toString(),
        });

        const json = await response.json();
        return Response.json({ ...json });
      }

      return fetch(...args);
    },

    // Profile mapping
    profile(profile) {
      return {
        id: profile.data.user.open_id,
        name: profile.data.user.display_name,
        image: profile.data.user.avatar_url,
        email: profile.data.user.email || profile.data.user.username || null,
      };
    },
  };
}
```

> **Tip** – If you need additional fields, add them to the `fields` query parameter in the `userinfo` URL.

---

## 4.  Resources

| Resource | Link |
|----------|------|
| TikTok App Console | https://open.tiktokapis.com/ |
| TikTok Login Kit Documentation | https://developers.tiktok.com/doc/tiktok-login-kit |
| TikTok OAuth 2.0 Spec | https://developers.tiktok.com/doc/tiktok-login-kit |

---

## 5.  FAQ

| Question | Answer |
|----------|--------|
| **Can I use `localhost` for production?** | No. Production apps must register a real domain. |
| **Does TikTok provide email?** | No, email is not returned. |
| **What scopes are available?** | `user.info.profile`, `user.info.stats`, `video.list`, etc. |
| **How to get a higher‑resolution avatar?** | Request `avatar_large_url` by adding `fields=avatar_url_100` to the user‑info request. |

---

## 6.  Disclaimer

Auth.js follows the OAuth 2.0 specification strictly. If you encounter a non‑compliant provider behavior, open an issue on GitHub. For spec‑related bugs, the maintainers may not pursue a fix.

---