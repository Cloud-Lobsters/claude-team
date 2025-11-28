# @auth/core – osu! Provider

The **osu!** provider is a built‑in OAuth provider for Auth.js that lets you add osu! login to your application.  
It follows the OAuth 2 specification and returns an `OsuProfile` object that contains all user data exposed by the osu! API.

> **⚠️ Note** – osu! does **not** provide an email address in the user profile.

---

## 1. Types

```ts
// The full user profile returned by the provider
export interface OsuProfile extends OsuUserCompact {
  /** Full avatar URL */
  avatar_url: string;

  /** Country information */
  country: {
    code: string;   // ISO‑3166‑1 alpha‑2
    name: string;   // Full country name
  };

  /** Cover image */
  cover: {
    custom_url: null | string;
    id: null | number;
    url: string;
  };

  /** Discord ID (string or null) */
  discord: null | string;

  /** Whether the user has supported the game */
  has_supported: boolean;

  /** Interests (string or null) */
  interests: null | string;

  /** Join date */
  join_date: Date;

  /** Kudosu points */
  kudosu: {
    available: number;
    total: number;
  };

  /** Last visit (Date or null) */
  last_visit: null | Date;

  /** Location (string or null) */
  location: null | string;

  /** Max blocks/friends */
  max_blocks: number;
  max_friends: number;

  /** Occupation (string or null) */
  occupation: null | string;

  /** Play mode */
  playmode: string;

  /** Play style */
  playstyle: string[];

  /** Profile order */
  profile_order: string[];

  /** Title (string or null) */
  title: null | string;
  title_url: null | string;

  /** Twitter handle (string or null) */
  twitter: null | string;

  /** Website (string or null) */
  website: null | string;
}
```

```ts
// Compact version used internally
export interface OsuUserCompact {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: number;
  is_active: boolean;
  is_bot: boolean;
  is_deleted: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: null | Date;
  pm_friends_only: boolean;
  profile_colour: null | string;
  username: string;
}
```

---

## 2. Setup

### 2.1 Callback URL

Add the following callback URL to your osu! application console:

```
https://example.com/api/auth/callback/osu
```

### 2.2 Configuration

```ts
import { Auth } from "@auth/core";
import Osu from "@auth/core/providers/osu";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Osu({
      clientId: OSU_CLIENT_ID,
      clientSecret: OSU_CLIENT_SECRET,
    }),
  ],
});
```

> Replace `OSU_CLIENT_ID` and `OSU_CLIENT_SECRET` with the values from your osu! app console.

---

## 3. Usage Example

```ts
import { Auth } from "@auth/core";
import Osu from "@auth/core/providers/osu";

export async function POST(request: Request) {
  return await Auth(request, {
    providers: [
      Osu({
        clientId: process.env.OSU_CLIENT_ID!,
        clientSecret: process.env.OSU_CLIENT_SECRET!,
      }),
    ],
  });
}
```

When a user signs in, the session will contain an `OsuProfile` object:

```ts
{
  avatar_url: "https://assets.ppy.sh/...",
  country: { code: "US", name: "United States" },
  cover: { custom_url: null, id: null, url: "https://assets.ppy.sh/..." },
  discord: null,
  has_supported: true,
  interests: null,
  join_date: "2020-01-01T00:00:00Z",
  kudosu: { available: 123, total: 456 },
  last_visit: "2024-08-01T12:34:56Z",
  location: null,
  max_blocks: 100,
  max_friends: 200,
  occupation: null,
  playmode: "osu",
  playstyle: ["keyboard"],
  pm_friends_only: false,
  profile_colour: "#ff00ff",
  username: "example_user",
  title: null,
  title_url: null,
  twitter: null,
  website: null,
}
```

---

## 4. Customizing the Provider

The provider comes with a default configuration. If you need to override any defaults (e.g., scopes, endpoints), pass an `OAuthUserConfig` object:

```ts
Osu({
  clientId: "...",
  clientSecret: "...",
  // Custom scopes
  scope: "public",
  // Custom authorization URL
  authorization: "https://osu.ppy.sh/oauth/authorize",
});
```

See the [OAuth provider documentation](https://authjs.dev/docs/providers/oauth) for full customization options.

---

## 5. Resources

- [osu! OAuth documentation](https://osu.ppy.sh/docs/index.html#oauth)
- [osu! app console](https://osu.ppy.sh/home/settings/developer)

---

## 6. Disclaimer

Auth.js strictly adheres to the OAuth 2 specification. If you encounter a non‑compliant behavior from osu!, open an issue on GitHub. For general questions, use the Auth.js Discussions.

---