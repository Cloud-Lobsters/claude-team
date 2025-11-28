# WordPress Provider – Auth.js

The WordPress provider allows you to add WordPress OAuth login to your Auth.js application.

---

## `default()` – Create a WordPress OAuth configuration

```ts
import { default as WordPress } from "@auth/core/providers/wordpress";

const config = WordPress({
  clientId:   WORKPRESS_CLIENT_ID,
  clientSecret: WORKPRESS_CLIENT_SECRET,
});
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `config` | `OAuthUserConfig<Record<string, any>>` | Configuration options for the WordPress provider. |

### Returns

`OAuthConfig<Record<string, any>>` – The fully‑configured OAuth provider ready to be passed to `Auth()`.

---

## Setup

1. **Callback URL**

   ```
   https://example.com/api/auth/callback/wordpress
   ```

2. **Configuration**

   ```ts
   import { Auth } from "@auth/core";
   import WordPress from "@auth/core/providers/wordpress";

   const request = new Request(origin);
   const response = await Auth(request, {
     providers: [
       WordPress({
         clientId:   WORKPRESS_CLIENT_ID,
         clientSecret: WORKPRESS_CLIENT_SECRET,
       }),
     ],
   });
   ```

3. **Resources**

   * [WordPress OAuth documentation](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/)

4. **Notes**

   * By default, Auth.js assumes that the WordPress provider follows the OAuth 2 specification.
   * The provider comes with a default configuration. To override defaults, see the guide on customizing a built‑in OAuth provider.
   * If you encounter a bug in the default configuration, open an issue. Auth.js adheres strictly to the OAuth spec and cannot guarantee compliance with provider deviations.

---

## Example

```ts
import { Auth } from "@auth/core";
import WordPress from "@auth/core/providers/wordpress";

export async function GET(request: Request) {
  const response = await Auth(request, {
    providers: [
      WordPress({
        clientId:   process.env.WORDPRESS_CLIENT_ID!,
        clientSecret: process.env.WORDPRESS_CLIENT_SECRET!,
      }),
    ],
  });

  return response;
}
```

---

**Disclaimer**  
Auth.js strictly follows the OAuth specification. If a provider deviates from the spec, Auth.js may not resolve the issue. For non‑spec compliance problems, consider opening a discussion or issue.