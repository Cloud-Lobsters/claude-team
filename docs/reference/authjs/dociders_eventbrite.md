# Eventbrite Provider – Auth.js

The **Eventbrite** provider is a built‑in OAuth 2.0 integration for Auth.js.  
It allows you to add Eventbrite login to your application and to make authenticated
requests to the Eventbrite API.

---

## 1. Overview

| Feature | Description |
|---------|-------------|
| **Provider** | `@auth/core/providers/eventbrite` |
| **OAuth 2.0** | Yes |
| **Profile type** | `EventbriteProfile` |
| **Documentation** | <https://www.eventbrite.com/platform/api#/reference/user/retrieve-your-user/retrieve-your-user> |

---

## 2. Profile Shape

```ts
export interface EventbriteProfile extends Record<string, any> {
  /** Array of email objects */
  emails: {
    email: string;
    primary: boolean;
    verified: boolean;
  }[];

  /** Primary email address */
  email: string;

  /** Whether the primary email is verified */
  verified: boolean;

  /** First name */
  first_name: string;

  /** Unique user ID */
  id: string;

  /** Image ID */
  image_id: string;

  /** Last name */
  last_name: string;

  /** Full name */
  name: string;
}
```

---

## 3. Setup

### 3.1 Callback URL

Add the following callback URL to your Eventbrite app settings:

```
https://example.com/api/auth/callback/eventbrite
```

### 3.2 Configuration

```ts
import { Auth } from "@auth/core";
import Eventbrite from "@auth/core/providers/eventbrite";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Eventbrite({
      clientId: EVENTBRITE_CLIENT_ID,
      clientSecret: EVENTBRITE_CLIENT_SECRET,
    }),
  ],
});
```

> **Tip** – Replace `EVENTBRITE_CLIENT_ID` and `EVENTBRITE_CLIENT_SECRET` with the
> credentials from your Eventbrite app.

---

## 4. Resources

| Resource | Link |
|----------|------|
| Eventbrite OAuth documentation | <https://www.eventbrite.com/platform/api#/reference/user/retrieve-your-user/retrieve-your-user> |
| Eventbrite App Management | <https://www.eventbrite.com/applications> |
| OAuth 2.0 spec | <https://oauth.net/2/> |

---

## 5. Customization

The provider comes with a default configuration.  
If you need to override any defaults, refer to the guide on [customizing a built‑in OAuth provider](#).

---

## 6. Notes & Disclaimer

- Auth.js assumes the Eventbrite provider follows the OAuth 2.0 specification.
- If you encounter a bug in the default configuration, open an issue on GitHub.
- Auth.js does not guarantee compliance with any provider‑specific deviations from the spec.  
  For non‑spec issues, we may not pursue a resolution.

---

## 7. Type Parameters

```ts
/**
 * @template P extends EventbriteProfile
 * @param {OAuthUserConfig<P>} config
 * @returns {OAuthConfig<P>}
 */
function default<P>(config): OAuthConfig<P>
```

---

## 8. Example Usage

```ts
import { Auth } from "@auth/core";
import Eventbrite from "@auth/core/providers/eventbrite";

export async function POST(request: Request) {
  return await Auth(request, {
    providers: [
      Eventbrite({
        clientId: process.env.EVENTBRITE_CLIENT_ID!,
        clientSecret: process.env.EVENTBRITE_CLIENT_SECRET!,
      }),
    ],
  });
}
```

---

### End of Documentation

---