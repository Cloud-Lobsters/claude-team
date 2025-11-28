# Auth.js – Provider Identifier Types

Auth.js exposes two string literal union types that represent the supported **email** and **OAuth** providers.  
These types are useful when you want to type‑check provider IDs in your own code or when you need to
reference a provider in a type‑safe way.

> **Note**  
> The list below is generated from the official Auth.js source.  
> If you add a new provider or remove an existing one, update the type accordingly.

---

## 1. `EmailProviderId`

```ts
/**
 * A string literal union of all supported email providers.
 *
 * @example
 * // Valid values
 * const provider: EmailProviderId = "email";
 * const provider: EmailProviderId = "nodemailer";
 *
 * // Invalid value – TypeScript will error
 * const provider: EmailProviderId = "github"; // ❌
 */
export type EmailProviderId =
  | "email"
  | "forwardemail"
  | "mailgun"
  | "nodemailer"
  | "passkey"
  | "postmark"
  | "resend"
  | "sendgrid";
```

### Usage

```ts
import type { EmailProviderId } from "@auth/core/providers";

function configureEmailProvider(id: EmailProviderId) {
  // Implementation …
}
```

---

## 2. `OAuthProviderId`

```ts
/**
 * A string literal union of all supported OAuth providers.
 *
 * @example
 * // Valid values
 * const provider: OAuthProviderId = "github";
 * const provider: OAuthProviderId = "google";
 *
 * // Invalid value – TypeScript will error
 * const provider: OAuthProviderId = "email"; // ❌
 */
export type OAuthProviderId =
  | "42-school"
  | "apple"
  | "asgardeo"
  | "atlassian"
  | "auth0"
  | "authentik"
  | "azure-ad-b2c"
  | "azure-ad"
  | "azure-devops"
  | "bankid-no"
  | "battlenet"
  | "beyondidentity"
  | "bitbucket"
  | "box"
  | "boxyhq-saml"
  | "bungie"
  | "click-up"
  | "cognito"
  | "coinbase"
  | "concept2"
  | "descope"
  | "discord"
  | "dribbble"
  | "dropbox"
  | "duende-identity-server6"
  | "eventbrite"
  | "eveonline"
  | "facebook"
  | "faceit"
  | "figma"
  | "foursquare"
  | "freshbooks"
  | "frontegg"
  | "fusionauth"
  | "github"
  | "gitlab"
  | "google"
  | "hubspot"
  | "huggingface"
  | "identity-server4"
  | "instagram"
  | "kakao"
  | "keycloak"
  | "kinde"
  | "line"
  | "linkedin"
  | "logto"
  | "loops"
  | "mailchimp"
  | "mailru"
  | "mastodon"
  | "mattermost"
  | "medium"
  | "microsoft-entra-id"
  | "naver"
  | "netlify"
  | "netsuite"
  | "nextcloud"
  | "notion"
  | "okta"
  | "onelogin"
  | "ory-hydra"
  | "osso"
  | "osu"
  | "passage"
  | "patreon"
  | "ping-id"
  | "pinterest"
  | "pipedrive"
  | "reddit"
  | "roblox"
  | "salesforce"
  | "simplelogin"
  | "slack"
  | "spotify"
  | "strava"
  | "threads"
  | "tiktok"
  | "todoist"
  | "trakt"
  | "twitch"
  | "twitter"
  | "united-effects"
  | "vipps"
  | "vk"
  | "webex"
  | "wechat"
  | "wikimedia"
  | "wordpress"
  | "workos"
  | "yandex"
  | "zitadel"
  | "zoho"
  | "zoom";
```

### Usage

```ts
import type { OAuthProviderId } from "@auth/core/providers";

function configureOAuthProvider(id: OAuthProviderId) {
  // Implementation …
}
```

---

## 3. Practical Example

```ts
import { EmailProviderId, OAuthProviderId } from "@auth/core/providers";

type Provider = EmailProviderId | OAuthProviderId;

function registerProvider(id: Provider) {
  if (isEmailProvider(id)) {
    // Handle email provider
  } else {
    // Handle OAuth provider
  }
}

function isEmailProvider(id: Provider): id is EmailProviderId {
  return [
    "email",
    "forwardemail",
    "mailgun",
    "nodemailer",
    "passkey",
    "postmark",
    "resend",
    "sendgrid",
  ].includes(id);
}
```

---

## 4. Extending the Types

If you add a custom provider that isn’t part of the official list, you can extend the union:

```ts
// In your own codebase
declare module "@auth/core/providers" {
  export type EmailProviderId = "@auth/core/providers".EmailProviderId | "my-custom-email";
  export type OAuthProviderId = "@auth/core/providers".OAuthProviderId | "my-custom-oauth";
}
```

---

## 5. References

- **Auth.js** – Official documentation: https://authjs.dev
- **TypeScript** – String literal unions: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#string-literal-types

---