# Salesforce Provider – Auth.js

The Salesforce provider is a built‑in OAuth 2.0 / OpenID Connect provider for Auth.js.  
It exposes a simple configuration API and returns a user profile that matches the
`SalesforceProfile` interface.

---

## `SalesforceProfile`

```ts
export interface SalesforceProfile extends Record<string, any> {
  /** User’s email address */
  email: string;

  /** User’s display name */
  nickname: string;

  /** URL of the user’s avatar */
  picture: string;

  /** Unique identifier for the user */
  sub: string;
}
```

---

## Default Configuration

```ts
/**
 * Returns the default OIDC configuration for the Salesforce provider.
 *
 * @param options - Custom options to override the defaults.
 * @returns OIDCConfig<SalesforceProfile>
 */
export function default(options: OIDCUserConfig<SalesforceProfile>): OIDCConfig<SalesforceProfile>
```

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/salesforce
```

> **Tip** – Register this URL in your Salesforce connected app under *OAuth Settings* → *Callback URL*.

### Configuration Example

```ts
import { Auth } from "@auth/core";
import Salesforce from "@auth/core/providers/salesforce";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Salesforce({
      clientId: AUTH_SALESFORCE_ID,
      clientSecret: AUTH_SALESFORCE_SECRET,
    }),
  ],
});
```

> Replace `AUTH_SALESFORCE_ID` and `AUTH_SALESFORCE_SECRET` with the credentials from your Salesforce connected app.

---

## Resources

- [Auth0 documentation](https://auth0.com/docs/)
- [Salesforce OAuth 2.0 guide](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_understanding_auth.htm)

---

## Notes

- The provider ships with a sensible default configuration.  
- To customize any of the defaults (e.g., scopes, endpoints), pass an `options` object to `Salesforce()` as shown above.

---

## Help & Issues

If you encounter a bug in the default configuration, open an issue on the Auth.js GitHub repository.  
For non‑spec compliance issues, the Auth.js team may not pursue a fix.

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OIDCUserConfig<SalesforceProfile>` | Custom configuration options for the provider. |

---

## Returns

`OIDCConfig<SalesforceProfile>`

---