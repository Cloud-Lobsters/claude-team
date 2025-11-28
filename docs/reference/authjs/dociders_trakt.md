# Trakt Provider – @auth/core

The Trakt provider lets you add Trakt authentication to your Auth.js application.  
It follows the OAuth 2 specification and returns a `TraktUser` object that contains the
user’s profile information.

> **Note**  
> Trakt does **not** provide the authenticated user’s e‑mail address and does not allow hot‑linking of profile images.

---

## 1. `TraktUser` Type

```ts
export interface TraktUser extends Record<string, any> {
  about: null | string;
  age: null | number;
  gender: null | string;
  ids: {
    slug: string;
  };
  slug: string;
  images: {
    avatar: {
      full: string;
    };
  };
  avatar: {
    full: string;
  };
  joined_at: string;
  location: null | string;
  name: string;
  private: boolean;
  username: string;
  vip: boolean;
  vip_ep: boolean;
}
```

---

## 2. Default Configuration

```ts
/**
 * Returns the default OAuth configuration for Trakt.
 *
 * @template P - The user type (defaults to `TraktUser`).
 * @param options - OAuth user configuration.
 * @returns OAuth configuration for Trakt.
 */
function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>
```

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/trakt
```

> Replace `example.com` with your own domain.

### 3.2 Configuration Example

```ts
import { Auth } from "@auth/core";
import Trakt from "@auth/core/providers/trakt";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Trakt({
      clientId: TRAKT_CLIENT_ID,
      clientSecret: TRAKT_CLIENT_SECRET,
    }),
  ],
});
```

> **Environment variables**  
> Store your Trakt credentials in `.env`:

```
TRAKT_CLIENT_ID=your-client-id
TRAKT_CLIENT_SECRET=your-client-secret
```

---

## 4. Resources

- [Trakt OAuth documentation](https://trakt.docs.apiary.io/)
- If you are using the production API (`api.trakt.tv`), follow the example above.  
  For the sandbox environment (`api-staging.trakt.tv`), adjust the URLs accordingly.

---

## 5. Notes

| Issue | Description |
|-------|-------------|
| Hot‑linking | Trakt forbids hot‑linking of images, even for authenticated users. |
| Email | Trakt does not supply the authenticated user’s e‑mail address. |
| Customization | The provider comes with a default configuration. Override it by passing custom options to `Trakt(...)`. |

---

## 6. Type Parameters

| Parameter | Description |
|-----------|-------------|
| `P extends TraktUser` | The user type returned by the provider. |

---

## 7. Example Usage

```ts
import { Auth } from "@auth/core";
import Trakt from "@auth/core/providers/trakt";

export async function POST(request: Request) {
  return await Auth(request, {
    providers: [
      Trakt({
        clientId: process.env.TRAKT_CLIENT_ID!,
        clientSecret: process.env.TRAKT_CLIENT_SECRET!,
      }),
    ],
  });
}
```

---

### 8. Further Reading

- [Customizing a built‑in OAuth provider](https://authjs.dev/docs/providers/customizing)
- [Auth.js API reference](https://authjs.dev/docs/api-reference)

---

*Auth.js © Balázs Orbán and Team – 2025*