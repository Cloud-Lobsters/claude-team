# Yandex Provider – Auth.js

The Yandex provider allows you to add Yandex OAuth authentication to your Auth.js application.  
Below is a concise, sanitized reference that keeps all examples and key details.

---

## Overview

- **Provider**: `@auth/core/providers/yandex`
- **Purpose**: Authenticate users via Yandex OAuth and retrieve their profile information.
- **Default Configuration**: Provided by Auth.js; can be overridden with custom options.

---

## Profile (`YandexProfile`)

| Property | Type | Description | Optional |
|----------|------|-------------|----------|
| `birthday` | `null | string` | User’s date of birth in `YYYY-MM-DD`. Unknown parts are `0`. Example: `0000-12-23`. | ✅ |
| `client_id` | `string` | ID of the app the OAuth token was issued for. | ❌ |
| `default_avatar_id` | `string` | ID of the user’s profile picture. Use the URL format below to download. | ✅ |
| `default_email` | `string` | Default email address for contacting the user. | ✅ |
| `default_phone` | `{ id: number; number: string; }` | Default phone number. May be omitted by the API. | ✅ |
| `display_name` | `string` | User’s display name. | ✅ |
| `emails` | `string[]` | Array of the user’s email addresses (currently only the default). | ✅ |
| `first_name` | `string` | User’s first name. | ✅ |
| `id` | `string` | Yandex user’s unique ID. | ❌ |
| `is_avatar_empty` | `boolean` | Indicates if the default avatar is a stub. | ✅ |
| `last_name` | `string` | User’s last name. | ✅ |
| `login` | `string` | User’s Yandex login. | ❌ |
| `psuid` | `string` | Authorized Yandex user ID (derived from `client_id` & `user_id`). | ❌ |
| `real_name` | `string` | Full name as entered in Yandex ID. | ✅ |
| `sex` | `null | "female" | "male"` | User’s gender. `null` means unknown. | ✅ |

### Avatar URL Format

```text
https://avatars.yandex.net/get-yapic/<default_avatar_id>/<size>
```

| Size | Dimensions |
|------|------------|
| `islands-small` | 28 × 28 |
| `islands-34` | 34 × 34 |
| `islands-middle` | 42 × 42 |
| `islands-50` | 50 × 50 |
| `islands-retina-small` | 56 × 56 |
| `islands-68` | 68 × 68 |
| `islands-75` | 75 × 75 |
| `islands-retina-middle` | 84 × 84 |
| `islands-retina-50` | 100 × 100 |
| `islands-200` | 200 × 200 |

> **Example**  
> ```text
> https://avatars.yandex.net/get-yapic/31804/BYkogAC6AoB17bN1HKRFAyKiM4-1/islands-200
> ```

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/yandex
```

### Configuration

```ts
import { Auth } from "@auth/core";
import Yandex from "@auth/core/providers/yandex";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Yandex({
      clientId: YANDEX_CLIENT_ID,
      clientSecret: YANDEX_CLIENT_SECRET,
    }),
  ],
});
```

> Replace `YANDEX_CLIENT_ID` and `YANDEX_CLIENT_SECRET` with your credentials.

---

## Resources

- [Yandex – Creating an OAuth app](https://yandex.com/dev/oauth/doc/dg/concepts/registration.html)
- [Yandex – Manage OAuth apps](https://yandex.com/dev/oauth/doc/dg/concepts/management.html)
- [Yandex – OAuth documentation](https://yandex.com/dev/oauth/doc/dg/concepts/overview.html)

---

## Customizing the Provider

The provider comes with a default configuration. To override defaults, pass an `options` object to `Yandex()`:

```ts
Yandex({
  clientId: "...",
  clientSecret: "...",
  // custom options here
});
```

See the Auth.js documentation on customizing built‑in OAuth providers for more details.

---

## Disclaimer

Auth.js strictly follows the OAuth specification and cannot guarantee compliance with provider‑specific deviations. If you encounter a bug in the default configuration, open an issue. For spec non‑compliance, we may not pursue a fix.

---