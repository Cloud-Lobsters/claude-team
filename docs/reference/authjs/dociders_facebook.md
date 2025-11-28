# Facebook Provider – Auth.js

The **Facebook** provider is a built‑in OAuth 2.0 integration that lets you add Facebook login to your Auth.js application.

> **⚠️ Production Note**  
> Facebook does not allow `localhost` URLs for production callbacks. Use a dedicated development app for local testing.

---

## 1. Types

```ts
// Facebook profile returned by the provider
export interface FacebookProfile extends Record<string, any> {
  /** Facebook user ID */
  id: string;

  /** User picture object */
  picture: FacebookPicture;
}
```

```ts
// Picture object
export interface FacebookPicture {
  data: {
    url: string;
    is_silhouette: boolean;
  };
}
```

---

## 2. Default Export

```ts
/**
 * Returns a configured OAuth provider for Facebook.
 *
 * @template P - The profile type (defaults to `FacebookProfile`).
 * @param {OAuthUserConfig<P>} options - Provider options.
 * @returns {OAuthConfig<P>}
 */
export default function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>;
```

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/facebook
```

> **Tip** – In a local dev environment, use a dedicated Facebook app with a `localhost` callback URL.

### 3.2 Configuration Example

```ts
import { Auth } from "@auth/core";
import Facebook from "@auth/core/providers/facebook";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Facebook({
      clientId: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
    }),
  ],
});
```

> Replace `FACEBOOK_CLIENT_ID` and `FACEBOOK_CLIENT_SECRET` with the credentials from your Facebook app.

---

## 4. Notes & Common Gotchas

| Issue | Explanation |
|-------|-------------|
| **Email not returned** | Facebook may not provide an email for accounts created on mobile. |
| **Spec compliance** | Auth.js follows the OAuth 2.0 spec strictly. If you encounter non‑compliant behavior, open an issue. |
| **Customization** | To override defaults, refer to the “Customizing a built‑in OAuth provider” guide. |

---

## 5. Resources

- [Facebook OAuth Documentation](https://developers.facebook.com/docs/facebook-login/)
- [Auth.js GitHub Repository](https://github.com/authjs/authjs)
- [Auth.js Discussions](https://github.com/authjs/authjs/discussions)

---

## 6. License

Auth.js © Balázs Orbán and Team – 2025  
MIT License

---