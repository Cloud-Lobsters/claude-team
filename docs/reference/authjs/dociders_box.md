# `@auth/core/providers/box`

Built‑in integration for Box OAuth 2.0.

---

## `default(options)`

```ts
import { Auth } from "@auth/core";
import Box from "@auth/core/providers/box";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Box({ clientId: BOX_CLIENT_ID, clientSecret: BOX_CLIENT_SECRET }),
  ],
});
```

### Setup

| Item | Value |
|------|-------|
| **Callback URL** | `https://example.com/api/auth/callback/box` |

### Configuration

```ts
import Box from "@auth/core/providers/box";

Box({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  // Optional overrides:
  // authorization: { params: { scope: "files_content_read" } },
  // profile: async (profile) => ({ id: profile.id, name: profile.name }),
});
```

### Resources

- [Box Developers Documentation](https://developer.box.com/)
- [Box OAuth 2.0 Documentation](https://developer.box.com/guides/authentication/oauth2/)

### Notes

- The provider follows the OAuth 2.0 specification by default.
- Customization is possible via the `options` object (see the example above).
- If you encounter a bug in the default configuration, open an issue on the repository.

### Parameters

| Name   | Type                                 | Description |
|--------|--------------------------------------|-------------|
| `options` | `OAuthUserConfig<Record<string, any>>` | Configuration options for the Box provider. |

### Returns

`OAuthConfig<Record<string, any>>`

---