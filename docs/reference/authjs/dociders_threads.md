# Threads Provider – Auth.js

> **Auth.js** – The open‑source authentication framework for Node.js and the web.  
> This document describes the built‑in **Threads** OAuth provider.

---

## 1. Overview

The Threads provider allows you to authenticate users via the Threads OAuth 2.0 flow.  
It returns a `ThreadsProfile` object that contains the user’s basic information.

> ⚠️ **Email address is not returned** by the Threads API.

---

## 2. `ThreadsProfile` – User Properties

| Property | Type | Description | Notes |
|----------|------|-------------|-------|
| `id` | `string` | Unique identifier of the user. Returned as a string to avoid integer overflow issues. | |
| `threads_biography?` | `string` | The user’s profile biography (bio). | Optional – include `fields=threads_biography` in the auth request. |
| `threads_profile_picture_url?` | `string` | URL of the user’s profile image. | Optional – include `fields=threads_profile_picture_url` in the auth request. |
| `username?` | `string` | The user’s Threads handle. | Optional – include `fields=username` in the auth request. |

```ts
// Example of a ThreadsProfile object
const profile: ThreadsProfile = {
  id: "1234567890",
  threads_biography: "Coffee lover & coder",
  threads_profile_picture_url: "https://example.com/avatar.jpg",
  username: "dev_guru",
};
```

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/threads
```

> **Important**: Threads requires the callback URL to be configured in your Facebook app.  
> Facebook enforces HTTPS even for localhost, so you’ll need an SSL certificate or a tunnel (e.g., ngrok).

### 3.2 Configuration

```ts
import { Auth } from "@auth/core";
import Threads from "@auth/core/providers/threads";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Threads({
      clientId: THREADS_CLIENT_ID,
      clientSecret: THREADS_CLIENT_SECRET,
    }),
  ],
});
```

> Replace `THREADS_CLIENT_ID` and `THREADS_CLIENT_SECRET` with the credentials from your Threads app.

---

## 4. Resources

- [Threads OAuth documentation](https://developers.facebook.com/docs/threads/)
- [Threads OAuth apps](https://developers.facebook.com/apps/)

---

## 5. Customization

The provider comes with a default configuration that follows the OAuth 2.0 spec.  
If you need to override any defaults, refer to the guide on [customizing a built‑in OAuth provider](#).

---

## 6. Disclaimer

Auth.js strictly adheres to the OAuth 2.0 specification.  
If you encounter a bug in the default configuration, open an issue.  
For non‑compliance with the spec, we may not pursue a resolution, but you can discuss it in the community.

---

## 7. Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OAuthUserConfig<ThreadsProfile>` | Provider configuration object. |
| **Returns** | `OAuthConfig<ThreadsProfile>` | Configured provider instance. |

---