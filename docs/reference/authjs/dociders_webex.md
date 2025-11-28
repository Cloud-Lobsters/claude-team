# Webex Provider – Auth.js

The Webex provider allows you to add Webex login to your application using Auth.js.  
It follows the OAuth 2.0 specification and returns a `WebexProfile` object that contains the user’s basic information.

> **Note**  
> The returned fields may vary depending on the user’s role, the OAuth integration’s scope, and the organization the OAuth integration belongs to.  
> For a complete list of available fields, see the [Webex People API – Get My Own Details](https://developer.webex.com/docs/api/v1/people/get-my-own-details).

---

## 1. `WebexProfile`

```ts
interface WebexProfile extends Record<string, any> {
  /** Optional avatar URL */
  avatar?: string;

  /** Optional display name */
  displayName?: string;

  /** Email addresses of the user */
  emails: string[];

  /** Unique identifier for the user */
  id: string;
}
```

---

## 2. Default Configuration

```ts
function default<P>(config: OAuthUserConfig<P> & { apiBaseUrl: string }): OAuthConfig<P>
```

The provider is configured with a default OAuth 2.0 setup.  
If you need to override any defaults, refer to the *Customizing a Built‑in OAuth Provider* guide.

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/webex
```

Make sure this URL is registered in your Webex OAuth integration.

### 3.2 Configuration Example

```ts
import { Auth } from "@auth/core";
import Webex from "@auth/core/providers/webex";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Webex({
      clientId: WEBEX_CLIENT_ID,
      clientSecret: WEBEX_CLIENT_SECRET,
    }),
  ],
});
```

> **Tip** – Replace `WEBEX_CLIENT_ID` and `WEBEX_CLIENT_SECRET` with the credentials from your Webex OAuth integration.

---

## 4. Resources

- [Webex OAuth 2.0 Integration Guide](https://developer.webex.com/docs/api/v1/people/get-my-own-details)
- [Login with Webex](https://developer.webex.com/docs/api/v1/people/get-my-own-details)

---

## 5. Notes

- Auth.js assumes the Webex provider follows the OAuth 2.0 specification.
- If you encounter a bug in the default configuration, open an issue on the Auth.js GitHub repository.
- Auth.js strictly adheres to the OAuth 2.0 spec and cannot guarantee compliance with provider deviations. If a problem is due to non‑compliance, the issue may not be resolved.

---

## 6. Type Parameters

| Type Parameter | Description |
|----------------|-------------|
| `P extends WebexProfile` | The profile type returned by the provider. |

---

## 7. Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `OAuthUserConfig<P> & { apiBaseUrl: string; }` | Configuration options for the provider. |

---

## 8. Returns

| Return | Type | Description |
|--------|------|-------------|
| `OAuthConfig<P>` | | The configured OAuth provider instance. |

---