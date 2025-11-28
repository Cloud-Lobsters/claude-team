# Foursquare Provider – Auth.js

The **Foursquare** provider lets you add Foursquare login to your Auth.js application.  
It follows the OAuth 2 specification, but requires an additional `apiVersion` parameter.

---

## 1.  Setup

### 1.1  Callback URL

```
https://example.com/api/auth/callback/foursquare
```

> **Tip** – The callback URL must match the one registered in your Foursquare app settings.

### 1.2  Configuration

```ts
import { Auth } from "@auth/core";
import FourSquare from "@auth/core/providers/foursquare";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    FourSquare({
      clientId:   FOURSQUARE_CLIENT_ID,
      clientSecret: FOURSQUARE_CLIENT_SECRET,
      apiVersion: "20240101",   // YYYYMMDD format
    }),
  ],
});
```

> **Note** – `apiVersion` is mandatory. It tells Foursquare which API version you’re prepared to handle.

---

## 2.  Resources

- [Foursquare OAuth documentation](https://developer.foursquare.com/docs/oauth/)
- [Auth.js source code – `providers/foursquare`](https://github.com/authjs/authjs/blob/main/packages/core/src/providers/foursquare.ts)

---

## 3.  Notes

- By default, Auth.js assumes the provider follows OAuth 2.  
- The provider comes with sensible defaults; you can override them by passing additional options (see the *Customizing a built‑in OAuth provider* guide).  
- If you encounter a bug in the default configuration, open an issue on GitHub.  
- Auth.js strictly follows the OAuth spec; it cannot guarantee compliance with provider‑specific quirks.

---

## 4.  API Reference

```ts
/**
 * Adds Foursquare login to your Auth.js application.
 *
 * @param options - OAuth configuration for Foursquare.
 * @returns OAuthConfig<Record<string, any>>
 */
export default function default(
  options: OAuthUserConfig<Record<string, any>> & { apiVersion: string }
): OAuthConfig<Record<string, any>>;
```

### Parameters

| Name      | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<Record<string, any>> & { apiVersion: string }` | OAuth settings plus the required `apiVersion` (YYYYMMDD). |

### Returns

`OAuthConfig<Record<string, any>>` – the configured provider instance ready for use with `Auth()`.

---

## 5.  Customizing the Provider

If you need to tweak scopes, endpoints, or other defaults, pass the desired options to `FourSquare()`:

```ts
FourSquare({
  clientId:   FOURSQUARE_CLIENT_ID,
  clientSecret: FOURSQUARE_CLIENT_SECRET,
  apiVersion: "20240101",
  scope: ["profile", "email"],          // custom scopes
  // ...other overrides
});
```

---

## 6.  Quick Start Checklist

1. Register a Foursquare app and obtain `clientId` & `clientSecret`.  
2. Set the callback URL in the Foursquare dashboard.  
3. Add the provider to your Auth.js configuration as shown above.  
4. Deploy and test the login flow.

---

**Auth.js © Balázs Orbán and Team – 2025**