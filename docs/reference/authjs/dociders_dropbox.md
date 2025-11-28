# Dropbox Provider – @auth/core

The Dropbox provider lets you add Dropbox OAuth 2 authentication to your Auth.js application.

> **Note** – The provider follows the OAuth 2 specification. If you encounter a non‑compliant behaviour, open an issue on the repository.

---

## `default(options)`

```ts
import { default as Dropbox } from "@auth/core/providers/dropbox";

export default function default(options: OAuthUserConfig<Record<string, any>>): OAuthConfig<Record<string, any>> {
  // implementation …
}
```

### Parameters

| Name   | Type                                 | Description |
|--------|--------------------------------------|-------------|
| `options` | `OAuthUserConfig<Record<string, any>>` | Custom configuration for the provider. |

### Returns

`OAuthConfig<Record<string, any>>` – The fully‑configured OAuth provider.

---

## Setup

1. **Install the package**

   ```bash
   npm i @auth/core
   ```

2. **Create a callback URL**

   ```
   https://example.com/api/auth/callback/dropbox
   ```

3. **Configure the provider**

   ```ts
   import { Auth } from "@auth/core";
   import Dropbox from "@auth/core/providers/dropbox";

   const request = new Request(origin);

   const response = await Auth(request, {
     providers: [
       Dropbox({
         clientId: DROPBOX_CLIENT_ID,
         clientSecret: DROPBOX_CLIENT_SECRET,
       }),
     ],
   });
   ```

   Replace `DROPBOX_CLIENT_ID` and `DROPBOX_CLIENT_SECRET` with the credentials from your Dropbox app.

---

## Resources

- [Dropbox OAuth documentation](https://www.dropbox.com/developers/documentation/http/documentation)

---

## Notes

- The provider is based on OAuth 2.0 by default.
- To override any default settings, refer to the *Customizing a built‑in OAuth provider* guide.

---

## Example

```ts
import { Auth } from "@auth/core";
import Dropbox from "@auth/core/providers/dropbox";

const request = new Request("https://example.com/api/auth/callback/dropbox");

const response = await Auth(request, {
  providers: [
    Dropbox({
      clientId: "YOUR_DROPBOX_CLIENT_ID",
      clientSecret: "YOUR_DROPBOX_CLIENT_SECRET",
    }),
  ],
});
```

This example demonstrates how to initialize Auth.js with the Dropbox provider and handle the callback route.