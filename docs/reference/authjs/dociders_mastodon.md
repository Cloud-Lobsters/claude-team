# @auth/core – Mastodon Provider

> Built‑in integration for Mastodon OAuth 2.0 authentication.

---

## Overview

The **Mastodon** provider allows you to add Mastodon login to your Auth.js application.  
Because Mastodon is a federated network, you must specify the *issuer* (the instance you want to connect to).

---

## Types

```ts
/**
 * Mastodon user profile returned by the provider.
 */
export interface MastodonProfile extends Record<string, any> {
  acct: string;
  avatar: string;
  avatar_static: string;
  bot: boolean;
  created_at: string;
  display_name: string;
  followers_count: number;
  following_count: number;
  header: string;
  header_static: string;
  id: string;
  last_status_at: null | string;
  locked: boolean;
  note: string;
  statuses_count: number;
  url: string;
  username: string;
}
```

---

## Setup

### 1. Install

```bash
npm i @auth/core
```

### 2. Create a callback URL

```
https://example.com/api/auth/callback/mastodon
```

### 3. Configure the provider

```ts
import { Auth } from "@auth/core";
import Mastodon from "@auth/core/providers/mastodon";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Mastodon({
      clientId: MASTODON_CLIENT_ID,
      clientSecret: MASTODON_CLIENT_SECRET,
      issuer: MASTODON_ISSUER, // e.g. "https://mastodon.social"
    }),
  ],
});
```

> **Tip** – The provider comes with sensible defaults.  
> If you need to override any of them, refer to the *Customizing a Built‑in OAuth Provider* guide.

---

## API Reference

### `Mastodon(options)`

```ts
function Mastodon<P extends MastodonProfile>(
  options: OAuthUserConfig<P> & { issuer: string }
): OAuthConfig<P>
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<P> & { issuer: string }` | Configuration options for the provider. |
| `issuer`  | `string` | The Mastodon instance URL (e.g., `https://mastodon.social`). |

> **Return** – An `OAuthConfig<P>` object that can be passed to `Auth()`.

---

## Example

```ts
import { Auth } from "@auth/core";
import Mastodon from "@auth/core/providers/mastodon";

export async function POST(request: Request) {
  return await Auth(request, {
    providers: [
      Mastodon({
        clientId: process.env.MASTODON_CLIENT_ID!,
        clientSecret: process.env.MASTODON_CLIENT_SECRET!,
        issuer: process.env.MASTODON_ISSUER!, // "https://mastodon.social"
      }),
    ],
  });
}
```

---

## Notes

- **OAuth 2.0** – Auth.js assumes the Mastodon provider follows the OAuth 2.0 spec.
- **Federated Instances** – Because Mastodon is federated, you must explicitly set the `issuer` to the instance you wish to authenticate against.
- **Compliance** – Auth.js strictly follows the OAuth 2.0 spec. If you encounter a non‑compliant provider, open an issue or discuss it in the community.

---

## Resources

- [Mastodon OAuth Documentation](https://docs.joinmastodon.org/admin/oauth/)
- [Mastodon OAuth Configuration](https://docs.joinmastodon.org/admin/oauth/)

---