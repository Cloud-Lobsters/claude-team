# Twitter Provider – Auth.js

> **Auth.js** – The open‑source authentication framework for Node.js and the web.

This document describes the built‑in **Twitter** provider that ships with Auth.js.  
It covers the data model (`TwitterProfile`), configuration, usage examples, and
important notes about OAuth 1.0 vs OAuth 2.0.

---

## 1. `TwitterProfile` – User Data Returned by Twitter

```ts
export interface TwitterProfile {
  /** The raw data returned by Twitter. */
  data: {
    /** ISO‑8601 timestamp of account creation. */
    created_at: string;

    /** User’s profile description (bio). */
    description: string;

    /** User’s email address. (currently unsupported) */
    email: string;

    /** Structured data about the description and URL. */
    entities: {
      /** Hashtags, cashtags, mentions in the description. */
      description: {
        hashtags: Array<{
          /** End index of the hashtag in the description string. */
          end: number;
          /** Start index of the hashtag in the description string. */
          start: number;
          /** The hashtag text without the “#”. */
          tag: string;
        }>;
      };
      /** URLs in the profile website field. */
      url: {
        urls: Array<{
          /** Display‑friendly URL. */
          display_url: string;
          /** End index of the URL in the profile string. */
          end: number;
          /** Expanded URL. */
          expanded_url: string;
          /** Start index of the URL in the profile string. */
          start: number;
          /** Raw URL. */
          url: string;
        }>;
      };
    };

    /** Unique user identifier (string to avoid integer overflow). */
    id: string;

    /** Free‑form location string. */
    location: string;

    /** User’s display name. */
    name: string;

    /** ID of the user’s pinned tweet. */
    pinned_tweet_id: string;

    /** URL of the profile image. */
    profile_image_url: string;

    /** Whether the account is protected. */
    protected: boolean;

    /** User’s website URL. */
    url: string;

    /** Twitter handle (screen name). */
    username: string;

    /** Whether the account is verified. */
    verified: boolean;
  };

  /** Optional fields – only present if requested via `user.fields`. */
  created_at?: string;
  description?: string;
  email?: string;
  entities?: {
    description: {
      hashtags: Array<{
        end: number;
        start: number;
        tag: string;
      }>;
    };
    url: {
      urls: Array<{
        display_url: string;
        end: number;
        expanded_url: string;
        start: number;
        url: string;
      }>;
    };
  };
  location?: string;
  pinned_tweet_id?: string;
  profile_image_url?: string;
  protected?: boolean;
  url?: string;
  verified?: boolean;

  /** Optional expanded data (e.g., pinned tweet). */
  includes?: {
    tweets: Array<{
      id: string;
      text: string;
    }>;
  };

  /** Optional array of tweets (if `expansions=tweets`). */
  tweets?: Array<{
    id: string;
    text: string;
  }>;
}
```

> **How to request optional fields**  
> Add `user.fields=<comma‑separated list>` to the OAuth request query string.  
> Example: `user.fields=description,entities,location,verified`.

---

## 2. Provider Configuration

```ts
import { Auth } from "@auth/core";
import Twitter from "@auth/core/providers/twitter";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Twitter({
      clientId: TWITTER_CLIENT_ID,
      clientSecret: TWITTER_CLIENT_SECRET,
    }),
  ],
});
```

### 2.1 OAuth 2.0 (Opt‑in)

Twitter supports OAuth 2.0. To enable it, add `version: "2.0"`:

```ts
Twitter({
  clientId: process.env.TWITTER_ID,
  clientSecret: process.env.TWITTER_SECRET,
  version: "2.0", // opt‑in to Twitter OAuth 2.0
});
```

> **Note** – OAuth 2.0 changes the API endpoints you can call.  
> See the official Twitter OAuth 2.0 documentation for details.

### 2.2 OAuth 1.0 (Default)

The provider defaults to OAuth 1.0. In this mode you receive:

- `oauth_token`
- `oauth_token_secret`

These must be stored if you use an adapter.

> **Tip** – Enable “Request email address from users” in your Twitter app
> permissions if you need the user’s email.

---

## 3. Setup – Callback URL

```
https://example.com/api/auth/callback/twitter
```

Add this URL to your Twitter app’s callback settings.

---

## 4. Resources

- [Twitter App Documentation](https://developer.twitter.com/en/docs/apps)
- [Twitter OAuth 2.0 Docs](https://developer.twitter.com/en/docs/authentication/oauth-2-0)

---

## 5. Notes & Caveats

| Topic | Detail |
|-------|--------|
| **Only OAuth 1.0 provider** | Twitter is the sole built‑in provider using OAuth 1.0. |
| **No `access_token` / `refresh_token`** | OAuth 1.0 returns `oauth_token` and `oauth_token_secret`. |
| **Email support** | Email is currently unsupported by Twitter OAuth 2.0. |
| **Spec compliance** | Auth.js follows the provider spec strictly; deviations are not
  guaranteed to be handled. |

---

## 6. API Reference

### `default(config: OAuthUserConfig<TwitterProfile>): OAuthConfig<TwitterProfile>`

Adds Twitter login to your application.

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| `config` | `OAuthUserConfig<TwitterProfile>` | Provider configuration options. |

#### Returns

`OAuthConfig<TwitterProfile>`

---

## 7. Example – Full Setup

```ts
import { Auth } from "@auth/core";
import Twitter from "@auth/core/providers/twitter";

export async function GET(request: Request) {
  return await Auth(request, {
    providers: [
      Twitter({
        clientId: process.env.TWITTER_CLIENT_ID!,
        clientSecret: process.env.TWITTER_CLIENT_SECRET!,
        // Uncomment to use OAuth 2.0
        // version: "2.0",
      }),
    ],
  });
}
```

---

### 7.1 Using Optional Fields

```ts
Twitter({
  clientId: TWITTER_CLIENT_ID,
  clientSecret: TWITTER_CLIENT_SECRET,
  // Request additional fields
  // These will appear in `profile.data`
  // e.g., description, entities, location, verified
  // Add them to the `user.fields` query param
});
```

---

## 8. Summary

- **Provider**: Twitter (OAuth 1.0 by default, OAuth 2.0 opt‑in)
- **Data**: `TwitterProfile` – includes user info, optional fields, and
  expanded tweets.
- **Setup**: Add callback URL, configure provider, and optionally enable
  OAuth 2.0.
- **Notes**: Store `oauth_token`/`oauth_token_secret` if using adapters.

Happy coding! 🚀