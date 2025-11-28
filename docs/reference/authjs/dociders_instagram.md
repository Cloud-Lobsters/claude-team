# Instagram Provider – Auth.js

The **Instagram** provider lets you add Instagram login to your application using Auth.js.  
It follows the OAuth 2 specification and is available as a built‑in provider.

---

## 1. Installation

```bash
npm i @auth/core
```

> The provider is part of the core package, so no separate installation is required.

---

## 2. Usage

```ts
import { Auth } from "@auth/core";
import Instagram from "@auth/core/providers/instagram";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Instagram({
      clientId: INSTAGRAM_CLIENT_ID,
      clientSecret: INSTAGRAM_CLIENT_SECRET,
    }),
  ],
});
```

### Callback URL

```
https://example.com/api/auth/callback/instagram
```

> The callback URL must be registered in your Instagram (Facebook) app settings.

---

## 3. Configuration

| Option          | Type   | Description                                 |
|-----------------|--------|---------------------------------------------|
| `clientId`      | string | Your Instagram App Client ID.               |
| `clientSecret`  | string | Your Instagram App Client Secret.           |
| `authorization` | string | Authorization endpoint (default: Instagram’s). |
| `token`         | string | Token endpoint (default: Instagram’s).      |
| `profile`       | string | Profile endpoint (default: Instagram’s).    |
| `scope`         | string | Space‑separated list of scopes.             |

> The provider uses the default OAuth 2 endpoints. If you need to override any of them, pass the corresponding option.

---

## 4. Notes

- **Email** – Instagram’s API does **not** return an email address.  
  If you need an email, you must collect it separately from the user.

- **HTTPS Requirement** – Instagram (via Facebook) requires the callback URL to use HTTPS, even for local development.  
  Options:
  - Add an SSL certificate to your local server.
  - Use a tunneling service such as [ngrok](https://ngrok.com/).

- **Display App** – The Instagram app must be a *display* app in the Facebook developer console.

- **Customization** – To override the default configuration, refer to the guide on [customizing built‑in OAuth providers](#).

---

## 5. Customizing the Provider

```ts
import Instagram from "@auth/core/providers/instagram";

const customInstagram = Instagram({
  clientId: "YOUR_ID",
  clientSecret: "YOUR_SECRET",
  authorization: "https://custom.auth/authorize",
  token: "https://custom.auth/token",
  profile: "https://custom.auth/profile",
  scope: "user_profile user_media",
});
```

---

## 6. Resources

- [Instagram OAuth Documentation](https://developers.facebook.com/docs/instagram-basic-display-api/)
- [Instagram OAuth Apps](https://developers.facebook.com/apps/)

---

## 7. Troubleshooting

- **Non‑compliance with OAuth spec** – Auth.js strictly follows the spec. If you encounter deviations, open an issue on GitHub.  
- **Email missing** – Instagram does not provide an email; you must prompt the user for it.

---

## 8. License & Credits

Auth.js © Balázs Orbán and Team – 2025  
Licensed under the MIT License.  
Contributions welcome on GitHub.