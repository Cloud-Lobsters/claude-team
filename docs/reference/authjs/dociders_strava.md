# Strava Provider – Auth.js

The **Strava** provider is a built‑in OAuth 2.0 integration for Auth.js.  
It exposes a `StravaProfile` type and a `default` helper that returns an `OAuthConfig`.

---

## `StravaProfile`

```ts
export interface StravaProfile extends Record<string, any> {
  /** First name of the user */
  firstname: string;

  /** Unique Strava user ID */
  id: string;

  /** Last name of the user */
  lastname: string;

  /** URL of the user’s profile picture */
  profile: string;
}
```

---

## `default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>`

Creates an OAuth configuration for Strava.

```ts
import { Auth } from "@auth/core";
import Strava from "@auth/core/providers/strava";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Strava({
      clientId: STRAVA_CLIENT_ID,
      clientSecret: STRAVA_CLIENT_SECRET,
    }),
  ],
});
```

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `options` | `OAuthUserConfig<P>` | Configuration options for the provider. |

### Returns

`OAuthConfig<P>` – The fully‑configured OAuth provider ready to be used with Auth.js.

---

## Setup

1. **Callback URL**  
   Register the following callback URL in your Strava app settings:

   ```
   https://example.com/api/auth/callback/strava
   ```

2. **Configuration**  
   ```ts
   import { Auth } from "@auth/core";
   import Strava from "@auth/core/providers/strava";

   const request = new Request(origin);

   const response = await Auth(request, {
     providers: [
       Strava({
         clientId: STRAVA_CLIENT_ID,
         clientSecret: STRAVA_CLIENT_SECRET,
       }),
     ],
   });
   ```

---

## Resources

- [Strava API Documentation](https://developers.strava.com/)

---

## Notes

- Auth.js assumes the Strava provider follows the OAuth 2 specification.
- The provider comes with a default configuration. To override defaults, see the guide on *Customizing a Built‑in OAuth Provider*.
- If you discover a bug in the default configuration, open an issue on GitHub.  
  Auth.js adheres strictly to the OAuth spec and cannot guarantee compliance with provider deviations.

---

## Type Parameters

| Parameter | Extends |
|-----------|---------|
| `P` | `StravaProfile` |

---