# Discord Provider – Auth.js

> **Auth.js** – The open‑source authentication framework for modern web apps.  
> This page documents the built‑in Discord OAuth provider.

---

## Overview

The Discord provider implements the standard OAuth 2 flow and returns a user profile that matches Discord’s user object.  
It is available in the `@auth/core/providers/discord` module.

```ts
import { Auth } from "@auth/core";
import Discord from "@auth/core/providers/discord";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Discord({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
});
```

---

## Profile Shape

The provider returns a `DiscordProfile` object that extends `Record<string, any>` and contains the following fields:

| Property | Type | Description |
|----------|------|-------------|
| `accent_color` | `null | number` | User’s banner color (hex integer). |
| `avatar` | `null | string` | Avatar hash. |
| `avatar_decoration` | `null | string` | Undocumented field – avatar inside an ice‑cube. |
| `banner` | `null | string` | Banner hash. |
| `banner_color` | `null | string` | Undocumented field – custom banner color. |
| `bot?` | `boolean` | Whether the user belongs to an OAuth2 application. |
| `discriminator` | `string` | Discord‑tag. |
| `display_name` | `null | string` | Undocumented field – custom nickname. |
| `email` | `null | string` | User’s email. |
| `flags` | `number` | User account flags. |
| `global_name` | `null | string` | Display name if set. |
| `id` | `string` | User’s snowflake ID. |
| `image_url` | `string` | CDN URL of the profile picture. |
| `locale` | `string` | User’s language option. |
| `mfa_enabled` | `boolean` | Whether 2FA is enabled. |
| `premium_type` | `number` | Nitro subscription type. |
| `public_flags` | `number` | Public flags. |
| `system?` | `boolean` | Whether the user is an official Discord system user. |
| `username` | `string` | Username (not unique). |
| `verified` | `boolean` | Whether the email is verified. |

> **Note**: The provider also includes any additional fields returned by Discord.

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/discord
```

### Configuration

```ts
import { Auth } from "@auth/core";
import Discord from "@auth/core/providers/discord";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Discord({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
});
```

- `clientId` – Your Discord application’s client ID.  
- `clientSecret` – Your Discord application’s client secret.

---

## Resources

- [Discord OAuth documentation](https://discord.com/developers/docs/topics/oauth2)  
- [Discord OAuth apps](https://discord.com/developers/applications)

---

## Customization

The provider comes with a default configuration. To override defaults, refer to the guide on [customizing a built‑in OAuth provider](#).

---

## Disclaimer

Auth.js strictly follows the OAuth 2 specification. If you encounter a bug in the default configuration, open an issue. For non‑compliance with the spec, we may not pursue a resolution. Feel free to ask for help in Discussions.

---

## Type Parameters

```ts
type DiscordProfile = {
  // ...properties listed above
};

function default<P extends DiscordProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P>;
```

---

## Related Topics

- [Auth.js](https://authjs.dev) – Core authentication framework  
- [Providers](https://authjs.dev/docs/providers) – Built‑in OAuth providers  
- [Adapters](https://authjs.dev/docs/adapters) – Database adapters  

---