# Pinterest Provider – Auth.js

The Pinterest provider is a built‑in OAuth 2.0 provider for Auth.js.  
It returns a user profile that extends the base `PinterestProfile` interface.

---

## Types

```ts
// @auth/core/providers/pinterest

/**
 * Pinterest user profile returned by the provider.
 */
export interface PinterestProfile extends Record<string, any> {
  /** Account type – either "BUSINESS" or "PINNER" */
  account_type: "BUSINESS" | "PINNER";

  /** URL of the profile image */
  profile_image: string;

  /** Pinterest username */
  username: string;

  /** URL of the user’s website */
  website_url: string;
}
```

---

## Function

```ts
/**
 * Creates a Pinterest OAuth provider configuration.
 *
 * @template P - The type of the user profile (defaults to `PinterestProfile`).
 * @param options - OAuth user configuration.
 * @returns OAuth configuration for the provider.
 */
export function default<P extends PinterestProfile = PinterestProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P>;
```

---

## Setup

### 1. Create a Pinterest App

1. Go to the [Pinterest App Console](https://developers.pinterest.com/apps/).
2. Create a new app and note the **Client ID** and **Client Secret**.
3. Set the **Callback URL** to:

```
https://example.com/api/auth/callback/pinterest
```

> **Important**  
> In production, ensure the app has *standard API access* (not trial access).

### 2. Install Auth.js

```bash
npm i @auth/core
```

### 3. Configure Auth.js

```ts
import { Auth } from "@auth/core";
import Pinterest from "@auth/core/providers/pinterest";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Pinterest({
      clientId: process.env.PINTEREST_CLIENT_ID!,
      clientSecret: process.env.PINTEREST_CLIENT_SECRET!,
    }),
  ],
});
```

> Replace `origin` with the URL of your application.

---

## Customizing the Provider

The provider comes with sensible defaults. If you need to override any of them, pass the desired options to the `Pinterest()` function. Refer to the [customizing a built‑in OAuth provider](https://authjs.dev/docs/providers/customizing) guide for details.

---

## Resources

- [Pinterest OAuth Documentation](https://developers.pinterest.com/docs/api/overview/)
- [Pinterest App Console](https://developers.pinterest.com/apps/)

---

## Notes

- Auth.js assumes the Pinterest provider follows the OAuth 2 specification.
- If you encounter a bug in the default configuration, open an issue on GitHub.  
  Auth.js adheres strictly to the spec and cannot guarantee compliance with provider deviations.

---