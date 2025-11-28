# FACEIT Provider – Auth.js

The **FACEIT** provider allows you to add FACEIT login to your application using Auth.js.  
It follows the OAuth 2.0 Authorization Code flow and automatically requests the scopes needed to obtain the user’s basic profile information.

---

## Overview

```ts
import { Auth } from "@auth/core";
import FACEIT from "@auth/core/providers/faceit";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    FACEIT({
      clientId: FACEIT_CLIENT_ID,
      clientSecret: FACEIT_CLIENT_SECRET,
    }),
  ],
});
```

---

## Setup

| Item | Value |
|------|-------|
| **Callback URL** | `https://example.com/api/auth/callback/faceit` |
| **Scopes** | `openid email profile` (provides email, nickname, guid, avatar) |

---

## Configuration

```ts
import FACEIT from "@auth/core/providers/faceit";

FACEIT({
  clientId: "<YOUR_FACEIT_CLIENT_ID>",
  clientSecret: "<YOUR_FACEIT_CLIENT_SECRET>",
  // Optional overrides:
  // authorization: { params: { scope: "openid email profile" } },
  // profile: (profile) => ({ id: profile.guid, name: profile.nickname, email: profile.email, image: profile.avatar }),
});
```

> **Note**: The provider uses the standard OAuth 2.0 Authorization Code grant.  
> If you need to customize the default configuration, refer to the *Customizing a Built‑in OAuth Provider* guide.

---

## Resources

- [FACEIT OAuth Documentation](https://www.faceit.com/en/developers)

---

## Notes

- The provider assumes the FACEIT API follows the OAuth 2.0 specification.
- If you encounter a bug in the default configuration, open an issue on the Auth.js GitHub repository.
- Auth.js does not guarantee compliance with provider deviations from the spec; issues may be closed if they are non‑compliant.

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<Record<string, any>>` | Custom configuration options for the provider. |

---

## Returns

`OAuthConfig<Record<string, any>>` – The configured OAuth provider ready to be used with Auth.js.

---