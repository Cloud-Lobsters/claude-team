# Nextcloud Provider – Auth.js

The **Nextcloud** provider allows you to add Nextcloud OAuth 2 authentication to your Auth.js application.  
It follows the standard OAuth 2 flow and returns a `NextcloudProfile` object that contains the user’s profile data.

> **NOTE**  
> The provider is based on the OAuth 2 specification. If you encounter a non‑compliant behaviour, open an issue on the Auth.js repository.

---

## 1. Profile Interface

```ts
/**
 * Represents the Nextcloud user profile data returned from
 * `/ocs/v1.php/cloud/users/`.
 */
export interface NextcloudProfile extends Record<string, any> {
  /** The address of the user. */
  address: string; // Example: "Foobar 12, 12345 Town"

  /** The biography or detailed description of the user. */
  biography: string;

  /** The display name of the user. */
  displayname: string; // Example: "Frank K."

  /** The email address associated with the user. */
  email: string | null; // Example: "frank@domain.tld"

  /** Indicates whether the user account is enabled or disabled. */
  enabled: boolean; // Example: true

  /** The user’s Fediverse handle. */
  fediverse: string;

  /** An array of group names that the user belongs to. */
  groups: string[]; // Example: ["admin", "group1", "group2"]

  /** The headline or brief description of the user. */
  headline: string;

  /** The user’s username. */
  id: string; // Example: "frank"

  /** The language preference of the user. */
  language: string; // Example: "en"

  /** The locale or language locale of the user. */
  locale: string; // Example: "en_US"

  /** The organization associated with the user. */
  organisation: string;

  /** The phone number of the user. */
  phone: string;

  /** The role or position of the user. */
  role: string;

  /** The storage location of the user’s files. */
  storageLocation: string; // Example: "/path/to/nextcloud/data/frank"

  /** The user’s Twitter handle. */
  twitter: string; // Example: "Nextcloud"

  /** The website URL of the user. */
  website: string; // Example: "https://nextcloud.com"
}
```

---

## 2. Provider Factory

```ts
/**
 * Adds Nextcloud login to your Auth.js application.
 *
 * @param options OAuthUserConfig<NextcloudProfile>
 * @returns OAuthConfig<NextcloudProfile>
 */
export function default(options: OAuthUserConfig<NextcloudProfile>): OAuthConfig<NextcloudProfile>
```

### Example

```ts
import { Auth } from "@auth/core";
import Nextcloud from "@auth/core/providers/nextcloud";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Nextcloud({
      clientId:   AUTH_NEXTCLOUD_ID,
      clientSecret: AUTH_NEXTCLOUD_SECRET,
      issuer:     AUTH_NEXTCLOUD_ISSUER,
    }),
  ],
});
```

---

## 3. Setup

| Item | Value |
|------|-------|
| **Callback URL** | `https://example.com/auth/callback/nextcloud` |
| **Configuration** | See the example above. |

---

## 4. Customizing the Provider

The provider comes with a default configuration. To override any defaults, pass the desired options to the `Nextcloud()` factory. Refer to the [customizing a built‑in OAuth provider](https://authjs.dev/guides/customizing-oauth-providers) guide for details.

---

## 5. Resources

- [Nextcloud Documentation](https://nextcloud.com/)
- [Nextcloud OAuth 2](https://nextcloud.com/oauth2/)
- [Nextcloud Clients and Client APIs](https://nextcloud.com/developer/)
- [Nextcloud User provisioning API](https://nextcloud.com/developer/)

---

## 6. Parameters & Return Types

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<NextcloudProfile>` | Configuration options for the provider. |
| **Returns** | `OAuthConfig<NextcloudProfile>` | The configured OAuth provider. |

---

## 7. Notes

- Auth.js assumes the Nextcloud provider follows the OAuth 2 specification.
- If you discover a bug in the default configuration, open an issue on the Auth.js GitHub repository.
- The provider is fully type‑safe; the returned profile conforms to `NextcloudProfile`.

---

**Auth.js © Balázs Orbán and Team – 2025**