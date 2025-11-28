# Zoom Provider – Auth.js

The Zoom provider implements OAuth 2.0 for authenticating users with Zoom.  
It is available as part of the `@auth/core` package.

> **Note**  
> The provider follows the OAuth 2.0 specification. If you encounter a
> non‑compliant behaviour, open an issue on the Auth.js repository.

---

## Type: `ZoomProfile`

The profile returned by Zoom after a successful authentication.

| Property | Type | Description |
|----------|------|-------------|
| `account_id` | `string` | Zoom account ID |
| `created_at` | `string` | ISO‑8601 timestamp of account creation |
| `dept` | `string` | Department |
| `email` | `string` | User email |
| `first_name` | `string` | First name |
| `group_ids` | `string[]` | Array of group IDs |
| `host_key` | `string` | Host key |
| `id` | `string` | User ID |
| `im_group_ids` | `string[]` | Array of IM group IDs |
| `jid` | `string` | JID |
| `language` | `string` | Preferred language |
| `last_client_version` | `string` | Last client version |
| `last_login_time` | `string` | ISO‑8601 timestamp of last login |
| `last_name` | `string` | Last name |
| `personal_meeting_url` | `string` | Personal meeting URL |
| `phone_country` | `string` | Phone country code |
| `phone_number` | `string` | Phone number |
| `pic_url` | `string` | Profile picture URL |
| `pmi` | `number` | Personal Meeting ID |
| `role_name` | `string` | Role name |
| `status` | `string` | Status |
| `timezone` | `string` | Timezone |
| `type` | `number` | Type |
| `use_pmi` | `boolean` | Whether PMI is used |
| `vanity_url` | `string` | Vanity URL |
| `verified` | `number` | Verification status |

The type extends `Record<string, any>` and is indexable (`[key: string]: any`).

---

## Usage

### 1. Install

```bash
npm i @auth/core
```

### 2. Configure the provider

```ts
import { Auth } from "@auth/core";
import Zoom from "@auth/core/providers/zoom";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Zoom({
      clientId: process.env.ZOOM_CLIENT_ID!,
      clientSecret: process.env.ZOOM_CLIENT_SECRET!,
    }),
  ],
});
```

### 3. Callback URL

Set the callback URL in your Zoom app settings to:

```
https://example.com/api/auth/callback/zoom
```

---

## Customizing the Provider

The Zoom provider comes with a default configuration. To override defaults:

```ts
Zoom({
  clientId: "...",
  clientSecret: "...",
  // Custom scopes, endpoints, etc.
  authorization: {
    params: { scope: "user:read" },
  },
});
```

See the [customizing a built‑in OAuth provider](https://authjs.dev/docs/providers/customizing) guide for more details.

---

## Resources

- [Zoom OAuth 2.0 Integration Guide](https://developers.zoom.us/docs/integrations/oauth/#using-an-access-token)

---

## API Reference

```ts
/**
 * Adds Zoom login to your application.
 *
 * @param config - OAuth configuration for Zoom.
 * @returns OAuthConfig<ZoomProfile>
 */
function default(config: OAuthUserConfig<ZoomProfile>): OAuthConfig<ZoomProfile>
```

---

## License

Auth.js © Balázs Orbán and Team – 2025.  
See the [LICENSE](https://github.com/authjs/authjs/blob/main/LICENSE) file for details.