# Concept2 Provider – Auth.js

The **Concept2** provider is a built‑in OAuth 2.0 integration for Auth.js.  
It exposes a typed user profile (`Concept2Profile`) and a helper function to
create the provider configuration.

---

## 1. `Concept2Profile`

| Property          | Type                     | Description |
|-------------------|--------------------------|-------------|
| `age_restricted`  | `boolean`                | Indicates if the user is age‑restricted. |
| `country`         | `string`                 | User’s country code. |
| `dob`             | `string`                 | Date of birth (ISO‑8601). |
| `email`           | `string`                 | User’s email address. |
| `email_permission`| `null | boolean`         | Permission to use the email. |
| `first_name`      | `string`                 | User’s first name. |
| `gender`          | `string`                 | User’s gender. |
| `id`              | `number`                 | Unique user identifier. |
| `last_name`       | `string`                 | User’s last name. |
| `logbook_privacy` | `null | string`          | Logbook privacy setting. |
| `max_heart_rate`  | `null | number`          | User’s maximum heart rate. |
| `profile_image`   | `string`                 | URL to the profile image. |
| `username`        | `string`                 | User’s username. |
| `weight`          | `null | number`          | User’s weight. |

The type extends `Record<string, any>` and is indexable (`[key: string]: any`).

---

## 2. Setup

### 2.1 Callback URL

```
https://example.com/api/auth/callback/concept2
```

> **Note**: Replace `example.com` with your own domain.

### 2.2 Configuration

```ts
import { Auth } from "@auth/core";
import Concept2 from "@auth/core/providers/concept2";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Concept2({
      clientId: CONCEPT2_CLIENT_ID,
      clientSecret: CONCEPT2_CLIENT_SECRET,
    }),
  ],
});
```

- `CONCEPT2_CLIENT_ID` – Your Concept2 OAuth client ID.  
- `CONCEPT2_CLIENT_SECRET` – Your Concept2 OAuth client secret.

---

## 3. Resources

- [Concept2 OAuth Documentation](https://developer.concept2.com/)

---

## 4. Notes

- Auth.js assumes the Concept2 provider follows the OAuth 2 specification.  
- The provider comes with a default configuration.  
- To override defaults, refer to the guide on *Customizing a Built‑in OAuth Provider*.  
- If you encounter a bug in the default configuration, open an issue on GitHub.  
- Auth.js strictly adheres to the OAuth 2 spec; deviations are not guaranteed to be supported.

---

## 5. API Reference

### `Concept2(options: OAuthUserConfig<Concept2Profile>): OAuthConfig<Concept2Profile>`

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<Concept2Profile>` | Configuration options for the provider. |

**Returns**: `OAuthConfig<Concept2Profile>`

---

## 6. Example Usage

```ts
import { Auth } from "@auth/core";
import Concept2 from "@auth/core/providers/concept2";

export async function POST(request: Request) {
  return await Auth(request, {
    providers: [
      Concept2({
        clientId: process.env.CONCEPT2_CLIENT_ID!,
        clientSecret: process.env.CONCEPT2_CLIENT_SECRET!,
      }),
    ],
  });
}
```

---

### 6.1 Customizing the Provider

```ts
Concept2({
  clientId: "...",
  clientSecret: "...",
  // Override default scopes
  authorization: {
    params: { scope: "profile email" },
  },
  // Custom callback URL
  callbackUrl: "https://myapp.com/auth/callback/concept2",
});
```

---

## 7. Related Topics

- [Auth.js – Getting Started](https://authjs.dev/docs/getting-started)
- [OAuth Providers](https://authjs.dev/docs/providers)
- [Customizing OAuth Providers](https://authjs.dev/docs/providers/custom)

---