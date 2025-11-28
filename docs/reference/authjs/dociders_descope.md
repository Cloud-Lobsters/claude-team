# Auth.js – Descope Provider

The **Descope** provider gives you a quick way to add Descope‑based authentication to your Auth.js application.  
Below is a concise, sanitized reference that keeps all the examples you need.

---

## 1. `DescopeProfile`

The profile object returned by Descope when the `profile` callback is used.

| Property | Type | Description |
|----------|------|-------------|
| `email` | `string` | The user’s email address. |
| `email_verified` | `boolean` | Whether the email has been verified. |
| `name` | `string` | The user’s full name. |
| `phone_number` | `string` | The user’s phone number. |
| `phone_number_verified` | `boolean` | Whether the phone number has been verified. |
| `picture` | `string` | URL to the user’s avatar. |
| `sub` | `string` | The user’s unique Descope ID. |
| `[claim: string]` | `unknown` | Any additional claims returned by Descope. |

```ts
interface DescopeProfile {
  email: string;
  email_verified: boolean;
  name: string;
  phone_number: string;
  phone_number_verified: boolean;
  picture: string;
  sub: string;
  [claim: string]: unknown;
}
```

---

## 2. Setup

### 2.1 Callback URL

Add the following callback URL to your Descope application:

```
https://example.com/api/auth/callback/descope
```

### 2.2 Configuration

```ts
import { Auth } from "@auth/core";
import Descope from "@auth/core/providers/descope";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Descope({
      clientId: process.env.AUTH_DESCOPE_ID,
      clientSecret: process.env.AUTH_DESCOPE_SECRET,
      issuer: process.env.AUTH_DESCOPE_ISSUER,
    }),
  ],
});
```

### 2.3 Environment Variables

Create a `.env.local` file in the project root and add:

```dotenv
# Descope Issuer ID (last segment of the issuer URL)
AUTH_DESCOPE_ID="<Descope Issuer's last url segment>"

# Descope Access Key
AUTH_DESCOPE_SECRET="<Descope Access Key>"

# Descope Issuer URL
AUTH_DESCOPE_ISSUER="<Descope Issuer URL>"
```

> **How to find these values**  
> 1. Log into the Descope console.  
> 2. Navigate to **Authentication Methods → SSO → Identity Provider** to get the Issuer ID.  
> 3. Go to **Manage → Access Keys** for the secret.  
> 4. Open **Applications → OIDC Application → Issuer** for the full issuer URL.

---

## 3. Customization

The Descope provider ships with a default configuration that follows the OIDC spec.  
If you need to override any defaults, refer to the [customizing a built‑in OAuth provider](https://authjs.dev/docs/providers/customizing) guide.

---

## 4. Notes

* Auth.js assumes the Descope provider follows the OIDC specification.  
* If you encounter a bug or a spec deviation, open an issue on GitHub.  
* For non‑spec compliance issues, the maintainers may not pursue a fix.

---

## 5. References

* [Descope OIDC Documentation](https://descope.com/docs/oidc)  
* [Descope Flows](https://descope.com/docs/flows)  

---