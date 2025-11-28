# Auth.js – Provider Configuration Reference

Auth.js is a framework‑agnostic authentication library that supports OAuth, OIDC, email (passwordless), credentials, and WebAuthn providers.  
This reference describes the core provider types, the common options they share, and the specific configuration objects you pass to `AuthConfig.providers`.

> **NOTE** – All examples below are taken verbatim from the official Auth.js documentation.  
> They are kept intact to illustrate the exact shape of the configuration objects.

---

## 1.  Provider Overview

| Provider | Type | Description |
|----------|------|-------------|
| **OAuth** | `oauth` | Standard OAuth 2.0 provider (e.g. GitHub, Google). |
| **OIDC** | `oidc` | OpenID Connect provider (e.g. Google, Azure AD). |
| **Email** | `email` | Passwordless email‑link provider. |
| **Credentials** | `credentials` | Custom username/password provider. |
| **WebAuthn** | `webauthn` | WebAuthn/FIDO2 provider. |

All providers expose a **unique `id`** (used in URLs and `signIn('id')`) and a **human‑readable `name`** (shown on the default sign‑in page).

---

## 2.  `AppProvider` – The Base Interface

```ts
interface AppProvider extends CommonProviderOptions {
  /** The URL to redirect to after a successful sign‑in. */
  callbackUrl: string;

  /** The provider’s unique identifier. */
  id: string;

  /** The provider’s display name. */
  name: string;

  /** The URL of the sign‑in button on the default page. */
  signinUrl: string;

  /** The provider type (`oauth`, `oidc`, `email`, `credentials`, `webauthn`). */
  type: ProviderType;
}
```

> `CommonProviderOptions` is the shared base for all provider types (see §3).

---

## 3.  `CommonProviderOptions`

```ts
interface CommonProviderOptions {
  /** Unique provider ID – part of the callback URL. */
  id: string;

  /** Display name on the sign‑in page. */
  name: string;

  /** Provider type. */
  type: ProviderType;
}
```

---

## 4.  OAuth 2.0 Providers – `OAuth2Config<Profile>`

```ts
interface OAuth2Config<Profile = any> extends CommonProviderOptions {
  /** Optional custom fetch implementation. */
  [customFetch]?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;

  /** Callback to transform the raw token set into the shape stored in the DB. */
  account?: AccountCallback;

  /** Allow automatic account linking when the same email exists. */
  allowDangerousEmailAccountLinking?: boolean;

  /** Authorization endpoint URL or handler. */
  authorization?: string | AuthorizationEndpointHandler;

  /** CSRF protection checks. */
  checks?: ("none" | "state" | "pkce")[];

  /** OAuth client overrides. */
  client?: Partial<Client & { token_endpoint_auth_method: string }>;

  /** Client credentials. */
  clientId?: string;
  clientSecret?: string;

  /** Issuer URL (optional). */
  issuer?: string;

  /** JWKS endpoint (optional). */
  jwks_endpoint?: any;

  /** Optional profile transformation. */
  profile?: ProfileCallback<Profile>;

  /** Optional redirect proxy URL. */
  redirectProxyUrl?: string;

  /** Button styling options. */
  style?: OAuthProviderButtonStyles;

  /** Token endpoint URL or handler. */
  token?: string | TokenEndpointHandler;

  /** Userinfo endpoint URL or handler. */
  userinfo?: string | UserinfoEndpointHandler;

  /** Well‑known OIDC discovery URL (optional). */
  wellKnown?: string;
}
```

### 4.1  `AccountCallback`

```ts
type AccountCallback = (tokens: TokenSet) => TokenSet | undefined | void;
```

> **Example** – Customising the stored account for GitHub:

```ts
import GitHub from "@auth/core/providers/github";

GitHub({
  account(account) {
    // GitHub returns a `refresh_token_expires_in` field.
    const refresh_token_expires_at =
      Math.floor(Date.now() / 1000) + Number(account.refresh_token_expires_in);

    return {
      access_token: account.access_token,
      expires_at: account.expires_at,
      refresh_token: account.refresh_token,
      refresh_token_expires_at,
    };
  },
});
```

---

## 5.  OpenID Connect Providers – `OIDCConfig<Profile>`

`OIDCConfig` extends `OAuth2Config` but removes the `type` and `checks` fields (they are fixed for OIDC).

```ts
interface OIDCConfig<Profile = any> extends Omit<OAuth2Config<Profile>, "type" | "checks"> {
  /** Whether to skip the `userinfo_endpoint` (default: true). */
  idToken?: boolean;

  /** OIDC specific checks. */
  checks?: ("none" | "state" | "nonce" | "pkce")[];

  /** Provider type is fixed to `"oidc"`. */
  type: "oidc";
}
```

---

## 6.  Email Provider – `EmailConfig`

```ts
interface EmailConfig extends CommonProviderOptions {
  /** Email provider type is `"email"`. */
  type: "email";

  /** Custom send‑verification‑request logic. */
  sendVerificationRequest: (params: EmailProviderSendVerificationRequestParams) => Promise<void>;

  /** Optional profile transformation. */
  profile?: ProfileCallback<any>;
}
```

---

## 7.  Credentials Provider – `CredentialsConfig`

```ts
interface CredentialsConfig extends CommonProviderOptions {
  /** Provider type is `"credentials"`. */
  type: "credentials";

  /** Custom authorize logic. */
  authorize: (credentials: CredentialInput, req: Request) => Promise<User | null>;

  /** Optional profile transformation. */
  profile?: ProfileCallback<any>;
}
```

---

## 8.  WebAuthn Provider – `WebAuthnConfig`

```ts
interface WebAuthnConfig extends CommonProviderOptions {
  /** Provider type is `"webauthn"`. */
  type: "webauthn";

  /** Custom WebAuthn logic. */
  // (implementation details omitted for brevity)
}
```

---

## 9.  Styling – `OAuthProviderButtonStyles`

```ts
interface OAuthProviderButtonStyles {
  /** Background color (deprecated – use `brandColor`). */
  bg?: string;

  /** Brand color for the button. */
  brandColor?: string;

  /** Logo URL. */
  logo?: string;

  /** Button text. */
  text?: string;
}
```

---

## 10.  Type Aliases & Helper Types

| Alias | Description |
|-------|-------------|
| `Provider<P>` | Union of all provider configs (`OAuthConfig<P> | EmailConfig | CredentialsConfig | WebAuthnConfig`). |
| `ProviderId` | `"credentials" | "email" | "oauth" | "oidc" | "webauthn" | string`. |
| `ProviderType` | `"credentials" | "email" | "oauth" | "oidc" | "webauthn"`. |
| `AppProviders` | Array of `Provider` instances. |
| `OAuthConfig<Profile>` | `OAuth2Config<Profile> | OIDCConfig<Profile>`. |
| `OAuthUserConfig<Profile>` | Partial config for a single OAuth provider. |
| `ProfileCallback<Profile>` | `(profile: Profile, tokens: TokenSet) => Awaitable<User>`. |

---

## 11.  Usage Example – Full AuthConfig

```ts
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Email from "@auth/core/providers/email";
import Credentials from "@auth/core/providers/credentials";

export const authOptions = {
  providers: [
    // OAuth provider
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      account(account) {
        // Custom account shape
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      },
    }),

    // OIDC provider
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // OIDC defaults are used; no need to specify `type`
    }),

    // Email provider
    Email({
      type: "email",
      sendVerificationRequest: async ({ identifier, url, token, baseUrl, provider }) => {
        // Send email logic here
      },
    }),

    // Credentials provider
    Credentials({
      type: "credentials",
      authorize: async (credentials) => {
        // Verify username/password
        return { id: "1", name: "John Doe", email: "john@example.com" };
      },
    }),
  ],

  // Other Auth.js options (callbacks, session, etc.) go here
};
```

---

## 12.  Security Notes

* **Automatic account linking** (`allowDangerousEmailAccountLinking`) is disabled by default.  
  Enable it only if you trust the provider’s email verification.

* **CSRF protection** (`checks`) defaults to `["pkce"]`.  
  When `redirectProxyUrl` is set, `"state"` is added automatically.

* **PKCE** is required for all OAuth/OIDC flows to mitigate authorization code interception.

---

## 13.  Further Reading

* [OAuth 2.0 RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)  
* [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)  
* [PKCE RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)  

---