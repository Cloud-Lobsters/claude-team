# Mattermost Provider – Auth.js

The Mattermost provider allows you to add OAuth2‑based login to your Auth.js application.  
Below is a concise, sanitized reference that keeps all examples and key details.

---

## 1. Overview

- **Provider**: `@auth/core/providers/mattermost`
- **OAuth2**: The provider follows the standard OAuth 2 specification.
- **Issuer**: Required – the base URL of your Mattermost instance (e.g. `https://my-cool-server.cloud.mattermost.com`).

---

## 2. `MattermostProfile`

The profile object returned by the provider contains the following fields:

| Property | Type | Description |
|----------|------|-------------|
| `auth_data` | `string` | Raw authentication data. |
| `auth_service` | `string` | Authentication service name. |
| `create_at` | `number` | Milliseconds since epoch when the user was created. |
| `delete_at` | `number` | Milliseconds since epoch when the user was deleted. |
| `disable_welcome_email` | `boolean` | Whether welcome email is disabled. |
| `email` | `string` | User’s email address. |
| `email_verified` | `boolean` | Whether the email is verified. |
| `first_name` | `string` | User’s first name. |
| `id` | `string` | Unique user ID. |
| `last_name` | `string` | User’s last name. |
| `last_password_update` | `number` | Milliseconds since epoch of last password change. |
| `locale` | `string` | User’s locale. |
| `nickname` | `string` | User’s nickname. |
| `notify_props` | `object` | Notification preferences (see below). |
| `channel` | `string` | Channel‑wide notification setting (`true`/`false`). |
| `comments` | `string` | Comment notification setting. |
| `desktop` | `string` | Desktop notification mode (`all`, `mention`, `none`). |
| `desktop_sound` | `string` | Desktop sound setting (`true`/`false`). |
| `desktop_threads` | `string` | Desktop thread notification setting. |
| `email` | `string` | Email notification setting (`true`/`false`). |
| `email_threads` | `string` | Email thread notification setting. |
| `first_name` | `string` | First‑name mention setting (`true`/`false`). |
| `mention_keys` | `string` | Comma‑separated list of mention keywords. |
| `push` | `string` | Push notification mode (`all`, `mention`, `none`). |
| `push_status` | `string` | Push status setting. |
| `push_threads` | `string` | Push thread setting. |
| `position` | `string` | User’s position. |
| `roles` | `string` | User’s roles. |
| `terms_of_service_create_at?` | `number` | Optional: milliseconds when terms were accepted. |
| `terms_of_service_id?` | `string` | Optional: ID of accepted terms. |
| `timezone` | `object` | Timezone configuration. |
| `update_at` | `number` | Milliseconds since epoch of last update. |
| `username` | `string` | User’s username. |

### `notify_props` Sub‑object

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| `channel` | `string` | `"true"` | Enable channel‑wide notifications. |
| `comments` | `string` | – | – |
| `desktop` | `string` | `"all"` | `all`, `mention`, `none`. |
| `desktop_sound` | `string` | `"true"` | Enable desktop sound. |
| `desktop_threads` | `string` | – | – |
| `email` | `string` | `"true"` | Enable email notifications. |
| `email_threads` | `string` | – | – |
| `first_name` | `string` | `"true"` if first name set, else `"false"` | Enable first‑name mentions. |
| `mention_keys` | `string` | `username,@username` | Custom mention keywords. |
| `push` | `string` | `"mention"` | `all`, `mention`, `none`. |
| `push_status` | `string` | – | – |
| `push_threads` | `string` | – | – |

### `timezone` Sub‑object

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| `automaticTimezone` | `string` | – | Set automatically when `useAutomaticTimezone` is `true`. |
| `manualTimezone` | `string` | – | e.g. `"Europe/Berlin"`. |
| `useAutomaticTimezone` | `string` | `"true"` | `"true"` to use browser/system timezone. |

---

## 3. Setup

### Callback URL

```
https://example.com/api/auth/callback/mattermost
```

### Configuration Example

```ts
import { Auth } from "@auth/core";
import Mattermost from "@auth/core/providers/mattermost";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Mattermost({
      clientId: MATTERMOST_CLIENT_ID,
      clientSecret: MATTERMOST_CLIENT_SECRET,
      issuer: MATTERMOST_ISSUER, // e.g. https://my-cool-server.cloud.mattermost.com
    }),
  ],
});
```

> **Note**  
> The `issuer` option is mandatory and must point to the base URL of your Mattermost instance.

---

## 4. Resources

- [Mattermost OAuth documentation](https://docs.mattermost.com/developer/oauth2-apps.html)
- [Creating a Mattermost OAuth2 app](http://<your-mattermost-instance-url>/<your-team>/integrations/oauth2-apps)

---

## 5. Customization

The provider comes with a default configuration. To override defaults, refer to the [customizing a built‑in OAuth provider](https://authjs.dev/guides/customizing-providers) guide.

---

## 6. Disclaimer

Auth.js strictly adheres to the OAuth 2 specification. If you encounter a bug in the default configuration, open an issue. For spec non‑compliance, we may not pursue a resolution. For additional help, visit the Discussions section.

---

## 7. Type Parameters

```ts
type P extends MattermostProfile;

function default<P>(config: OAuthUserConfig<P> & { issuer: string }): OAuthConfig<P>;
```

---

**Auth.js © Balázs Orbán and Team – 2025**