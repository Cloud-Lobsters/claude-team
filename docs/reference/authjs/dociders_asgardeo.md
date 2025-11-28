# Asgardeo Provider – Auth.js

The **Asgardeo** provider is a built‑in OAuth 2.0 / OpenID Connect provider for Auth.js.  
It allows you to authenticate users via an Asgardeo application and retrieve a user profile that conforms to the `AsgardeoProfile` interface.

---

## 1. `AsgardeoProfile`

The profile returned by the provider when the `profile` callback is used.

| Property | Type   | Description                     |
|----------|--------|---------------------------------|
| `email`  | `string` | The user’s email address. |
| `given_name` | `string` | The user’s first name. |
| `picture` | `string` | URL of the user’s profile picture. |
| `sub` | `string` | The Asgardeo account ID. |

```ts
interface AsgardeoProfile extends Record<string, any> {
  email: string;
  given_name: string;
  picture: string;
  sub: string;
}
```

---

## 2. Default Configuration

```ts
function default(config: OIDCUserConfig<AsgardeoProfile>): OIDCConfig<AsgardeoProfile>
```

The provider comes with a sensible default configuration that follows the OAuth 2.0 specification.  
If you need to override any defaults, pass an `OIDCUserConfig<AsgardeoProfile>` object to the provider constructor.

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/asgardeo
```

Add this URL to the **Authorized redirect URLs** in your Asgardeo application.

---

### 3.2 Configuration Example

```ts
import { Auth } from "@auth/core";
import Asgardeo from "@auth/core/providers/asgardeo";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Asgardeo({
      clientId: process.env.ASGARDEO_CLIENT_ID!,
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET!,
      issuer: process.env.ASGARDEO_ISSUER!,
    }),
  ],
});
```

> **Tip**: Store the credentials in a `.env` file at the project root:

```
ASGARDEO_CLIENT_ID="Your client ID"
ASGARDEO_CLIENT_SECRET="Your client secret"
ASGARDEO_ISSUER="https://<your-tenant>.asgard.io"
```

---

## 4. Configuring Asgardeo

1. **Log into the Asgardeo console**.  
2. Navigate to the **Application** tab.  
3. Register a **Standard based, OpenID Connect** application.  
4. Add the callback URLs:
   * Development: `http://localhost:3000/api/auth/callback/asgardeo`
   * Production: `https://{YOUR_DOMAIN}.com/api/auth/callback/asgardeo`
5. Go to the **Protocol** tab:
   * Enable **Authorization Code** as the grant type.
   * Add the same redirect URLs under **Authorized redirect URLs**.
   * Add the same URLs under **Allowed origins**.
6. Make the following user attributes mandatory in the console:
   * Email
   * First Name
   * Photo URL
7. Save the application and copy the **Client ID**, **Client Secret**, and **Issuer URL** into your `.env` file.

---

## 5. Notes

* The provider assumes the standard OAuth 2.0 flow.  
* If you encounter a bug in the default configuration, open an issue on the Auth.js repository.  
* Auth.js strictly follows the OAuth 2.0 specification; deviations by the provider are outside its scope.

---

## 6. Resources

* [Asgardeo Authentication Guide](https://asgardeo.io/docs/authentication)  
* [OAuth 2.0 Specification](https://datatracker.ietf.org/doc/html/rfc6749)

---

## 7. Example Project

```bash
# .env
ASGARDEO_CLIENT_ID="..."
ASGARDEO_CLIENT_SECRET="..."
ASGARDEO_ISSUER="https://<tenant>.asgard.io"

# server.ts
import { Auth } from "@auth/core";
import Asgardeo from "@auth/core/providers/asgardeo";

export async function GET(request: Request) {
  return await Auth(request, {
    providers: [
      Asgardeo({
        clientId: process.env.ASGARDEO_CLIENT_ID!,
        clientSecret: process.env.ASGARDEO_CLIENT_SECRET!,
        issuer: process.env.ASGARDEO_ISSUER!,
      }),
    ],
  });
}
```

Run the server and navigate to `/api/auth/signin` to see the Asgardeo sign‑in button.

---