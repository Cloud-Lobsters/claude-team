# Twitch Provider – Auth.js

The Twitch provider is a built‑in OAuth/OIDC provider for Auth.js.  
It follows the Open ID Connect specification and exposes the following user profile fields:

| Property | Type   | Description |
|----------|--------|-------------|
| `email` | `string` | User’s email address |
| `picture` | `string` | URL to the user’s avatar |
| `preferred_username` | `string` | User’s preferred display name |
| `sub` | `string` | Unique identifier for the user |

> **Note** – The provider returns a plain JavaScript object that extends `Record<string, any>` and is indexable (`[key: string]: any`).

---

## 1. Installation

```bash
npm i @auth/core @auth/core/providers/twitch
```

> If you’re using a framework that ships with Auth.js (e.g. Next.js, SvelteKit, Express, etc.) you can skip the manual import of `Auth` and use the framework‑specific integration instead.

---

## 2. Setup

### 2.1 Callback URL

Add the following redirect URL to your Twitch application:

```
https://example.com/api/auth/callback/twitch
```

> Replace `https://example.com` with the actual domain of your application.

### 2.2 Configuration

```ts
import { Auth } from "@auth/core";
import Twitch from "@auth/core/providers/twitch";

const request = new Request(origin); // `origin` is the request URL

const response = await Auth(request, {
  providers: [
    Twitch({
      clientId: TWITCH_CLIENT_ID,
      clientSecret: TWITCH_CLIENT_SECRET,
    }),
  ],
});
```

> **Tip** – If you’re using a framework that already exposes an `Auth` helper (e.g. `next-auth`), you can drop the manual `Auth` call and simply pass the provider to the framework’s configuration.

---

## 3. Customization

The provider comes with a default configuration that works out of the box.  
If you need to override any defaults (e.g. scopes, endpoints, etc.) you can pass an `OIDCUserConfig<TwitchProfile>` object to `Twitch()`.

```ts
Twitch({
  clientId: TWITCH_CLIENT_ID,
  clientSecret: TWITCH_CLIENT_SECRET,
  // Custom scopes
  scope: "user:read:email user:read:subscriptions",
  // Custom endpoints (if Twitch changes them)
  endpoints: {
    authorization: "https://id.twitch.tv/oauth2/authorize",
    token: "https://id.twitch.tv/oauth2/token",
    userinfo: "https://api.twitch.tv/helix/users",
  },
});
```

---

## 4. Resources

- **Twitch App Documentation** – [https://dev.twitch.tv/docs/authentication](https://dev.twitch.tv/docs/authentication)
- **Auth.js GitHub Repository** – [https://github.com/authjs/authjs](https://github.com/authjs/authjs)

---

## 5. FAQ & Troubleshooting

| Question | Answer |
|----------|--------|
| **Why does Auth.js assume OIDC?** | Twitch’s OAuth flow is compatible with the Open ID Connect spec, so Auth.js uses the OIDC flow for consistency. |
| **What if I encounter a bug in the default config?** | Open an issue on the Auth.js GitHub repo. If the issue is a spec non‑compliance, we may not pursue a fix. |
| **Can I use this provider with other frameworks?** | Yes. The provider is framework‑agnostic; just import it and pass it to your framework’s Auth configuration. |

---

## 6. License

Auth.js is open source under the MIT license. See the repository for details.