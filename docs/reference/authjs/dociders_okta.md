# Okta Provider – Auth.js

The Okta provider is a fully‑featured OAuth2 / OpenID Connect integration that can be used with Auth.js.  
Below is a concise, self‑contained reference that includes type definitions, configuration, usage examples, and important notes.

---

## 1.  OktaProfile

```ts
/**
 * The user profile returned by Okta.
 * Extends `Record<string, any>` so that any additional claims are preserved.
 */
export interface OktaProfile extends Record<string, any> {
  /** Indexable – any additional properties */
  [key: string]: any;

  /** Address claim */
  address: string;
  /** Authentication methods used */
  amr: string;
  /** Access token hash */
  at_hash: string;
  /** Audience */
  aud: string;
  /** Authentication time */
  auth_time: string;
  /** Birthdate */
  birthdate: string;
  /** ID token hash */
  c_hash: string;
  /** Email */
  email: string;
  /** Email verified flag */
  email_verified: string;
  /** Expiration time */
  exp: string;
  /** Family name */
  family_name: string;
  /** Gender */
  gender: string;
  /** Given name */
  given_name: string;
  /** Issued at */
  iat: string;
  /** Identity provider */
  idp: string;
  /** Issuer */
  iss: string;
  /** JWT ID */
  jti: string;
  /** Locale */
  locale: string;
  /** Middle name */
  middle_name: string;
  /** Full name */
  name: string;
  /** Nickname */
  nickname: string;
  /** Nonce */
  nonce: string;
  /** Phone number */
  phone_number: string;
  /** Profile picture */
  picture: string;
  /** Preferred username */
  preferred_username: string;
  /** Profile URL */
  profile: string;
  /** Subject */
  sub: string;
  /** Updated at */
  updated_at: string;
  /** Version */
  ver: string;
  /** Website */
  website: string;
  /** Time zone */
  zoneinfo: string;
}
```

---

## 2.  Default Configuration

```ts
/**
 * Returns the default OAuth configuration for Okta.
 *
 * @template P  The profile type (defaults to `OktaProfile`).
 * @param options  OAuth user configuration.
 * @returns OAuth configuration object.
 */
export function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>;
```

> **Note** – The default configuration follows the OpenID Connect specification.  
> If you need to override any defaults, refer to the *Customising a Built‑in OAuth Provider* guide.

---

## 3.  Setup

### 3.1  Callback URL

```
https://example.com/api/auth/callback/okta
```

> The callback URL must be registered in your Okta application settings.

### 3.2  Configuration Example

```ts
import { Auth } from "@auth/core";
import Okta from "@auth/core/providers/okta";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Okta({
      clientId: OKTA_CLIENT_ID,
      clientSecret: OKTA_CLIENT_SECRET,
      issuer: OKTA_ISSUER, // e.g. https://dev-123456.okta.com/oauth2/default
    }),
  ],
});
```

> Replace `OKTA_CLIENT_ID`, `OKTA_CLIENT_SECRET`, and `OKTA_ISSUER` with your Okta credentials.

---

## 4.  Resources

- [Okta OAuth Documentation](https://developer.okta.com/docs/guides/implement-oauth/overview/)

---

## 5.  Notes

- The Okta provider is based on the OpenID Connect specification by default.
- The provider comes with a default configuration. To override the defaults for your use case, check out the guide on *Customising a Built‑in OAuth Provider*.
- If you discover a bug in the default configuration, open an issue on the repository.  
  Auth.js strictly adheres to the spec and cannot guarantee compliance with provider deviations.

---

## 6.  Type Parameters

| Parameter | Description |
|-----------|-------------|
| `P extends OktaProfile` | The profile type returned by Okta. |

---

## 7.  Function Signature

```ts
/**
 * @template P
 * @param options OAuthUserConfig<P>
 * @returns OAuthConfig<P>
 */
function default<P>(options: OAuthUserConfig<P>): OAuthConfig<P>;
```

---

## 8.  Parameters

| Name | Type | Description |
|------|------|-------------|
| `options` | `OAuthUserConfig<P>` | Configuration options for the Okta provider. |

---

## 9.  Returns

| Type | Description |
|------|-------------|
| `OAuthConfig<P>` | The fully‑configured OAuth provider instance. |

---

### 9.1  Example Usage

```ts
import { Auth } from "@auth/core";
import Okta from "@auth/core/providers/okta";

const request = new Request("https://example.com/api/auth/callback/okta");

const response = await Auth(request, {
  providers: [
    Okta({
      clientId: "your-okta-client-id",
      clientSecret: "your-okta-client-secret",
      issuer: "https://dev-123456.okta.com/oauth2/default",
    }),
  ],
});
```

---

### 9.2  Customising the Provider