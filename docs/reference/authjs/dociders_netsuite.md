# NetSuite OAuth Provider – Auth.js Documentation

> **⚠️ Disclaimer**  
> By using this provider you consent to sharing your data with NetSuite.  
> The author of this provider is not affiliated with NetSuite.  
> You must be a NetSuite customer with a *Full Access* user and have the OAuth 2.0 feature enabled in your account.

---

## 1. Overview

The **NetSuite** provider lets you authenticate users via NetSuite’s OAuth 2.0 flow and fetch a minimal user profile from a NetSuite RESTlet or Suitelet.  
It is part of the `@auth/core` package and can be used in any framework that supports Auth.js (Next.js, SvelteKit, Express, etc.).

---

## 2. Types

```ts
// NetSuiteProfile – the shape of the user object returned by your userinfo endpoint
export interface NetSuiteProfile {
  /** NetSuite internal user id */
  id: number;

  /** User’s full name */
  name: string;

  /** Role id */
  role: number;

  /** Location id */
  location: number;

  /** Email address */
  email: string;

  /** Optional phone number */
  contact?: number;

  /** Optional department id */
  department?: number;

  /** Optional role center */
  roleCenter?: string;

  /** Optional role id string */
  roleId?: string;

  /** Optional subsidiary id */
  subsidiary?: number;
}
```

```ts
// OAuthNetSuiteOptions – provider‑specific configuration
export interface OAuthNetSuiteOptions {
  /** NetSuite account ID (e.g. `TSTDRV1234567` or `81555` for production) */
  accountID: string;

  /** Prompt value – controls when the consent screen appears */
  prompt: string;

  /** OAuth scopes you want to request */
  scope: string;

  /** URL of a RESTlet/Suitelet that returns the user profile */
  userinfo: string;
}
```

---

## 3. Provider Function

```ts
import { OAuthConfig, OAuthUserConfig } from "@auth/core";
import { default as defaultProvider } from "@auth/core/providers/oauth";

export default function NetSuite<P extends NetSuiteProfile>(
  config: OAuthUserConfig<P> & OAuthNetSuiteOptions
): OAuthConfig<P> {
  return defaultProvider<P>(config);
}
```

> The provider is a thin wrapper around the generic OAuth provider.  
> It simply forwards the configuration to `defaultProvider`.

---

## 4. Configuration Example

```ts
import { Auth } from "@auth/core";
import NetSuite from "@auth/core/providers/netsuite";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    NetSuite({
      accountID: "TSTDRV1234567",          // NetSuite account ID
      prompt: "login",                     // optional: "none", "login", "consent", etc.
      scope: "restlets",                   // e.g. "restlets", "rest_webservices", "suiteanalytics_connect"
      userinfo: "https://1234567.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=123&deploy=1",
    }),
  ],
});
```

> Replace the `accountID` and `userinfo` URL with your own values.

---

## 5. Setting Up the NetSuite Integration

1. **Create an Integration Record**  
   * Uncheck **TBA Auth Flow**.  
   * Check **OAuth 2.0 Auth Flow**.  
   * Copy the **Callback URL** (e.g. `https://example.com/api/auth/callback/netsuite`) into the *Redirect URI* field.  
   * Select the scopes you need (`rest_webservices`, `restlets`, `suiteanalytics_connect`).  
   * Add any policies, logos, terms, or privacy PDFs you want to display on the consent screen.  
   * Save the record.

2. **Generate Credentials**  
   * After saving, NetSuite will provide a **Client ID** and **Client Secret**.  
   * Store these securely; they will be used in your Auth.js configuration.

3. **Deploy a RESTlet / Suitelet**  
   * The `userinfo` endpoint must return a JSON object that matches the `NetSuiteProfile` shape.  
   * Deploy it with **All Roles** access so the OAuth flow can call it.

---

## 6. Example RESTlet (SuiteScript 2.1)

```js
/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(["N/runtime"], (runtime) => {
  /**
   * Handles GET requests.
   * @param {Object} requestParams - Query parameters.
   * @returns {string | Object} Response body.
   */
  const get = (requestParams) => {
    const userObject = runtime.getCurrentUser();

    try {
      const { id, name, role, location, email, contact } = userObject;

      const user = {
        id,
        name,
        role,
        location,
        email,
        contact,
      };

      return JSON.stringify(user);
    } catch (e) {
      log.error({ title: "Error grabbing current user:", details: e });
      return { error: "Unable to fetch user" };
    }
  };

  return { get };
});
```

> Deploy this script, enable it for **All Roles**, and use the resulting URL as the `userinfo` value in your provider configuration.

---

## 7. Notes & Tips

| Topic | Recommendation |
|-------|----------------|
| **HTTPS** | The Redirect URI must use `https`. For local testing, use a tunnel service like `ngrok`. |
| **Prompt** | Use `"none"` to skip the consent screen if a session exists; `"login"` forces re‑authentication; `"consent"` forces the consent screen every time. |
| **Scope** | Request only the scopes you need to keep the token size small. |
| **Profile Matching** | The JSON returned by your `userinfo` endpoint must match the `NetSuiteProfile` interface exactly; otherwise the session will not be created. |
| **Error Handling** | If the RESTlet fails, the OAuth flow will abort. Ensure the endpoint is highly available. |

---

## 8. Resources

* [NetSuite – Creating an Integration Record (OAuth 2.0)](https://docs.netsuite.com/app/help/helpcenter.nl?fid=section_160855585734.html)
* [NetSuite – Authorizing OAuth Requests](https://docs.netsuite.com/app/help/helpcenter.nl?fid=section_160855585734.html)
* [NetSuite – Configure OAuth Roles](https://docs.netsuite.com/app/help/helpcenter.nl?fid=section_160855585734.html)
* [NetSuite OAuth 2.0 Overview](https://docs.netsuite.com/app/help/helpcenter.nl?fid=section_160855585734.html)

---

## 9. Type Parameters

```ts
/**
 * @template P extends NetSuiteProfile
 * @param {OAuthUserConfig<P> & OAuthNetSuiteOptions} config
 * @returns {OAuthConfig<P>}
 */
```

---

### End of Documentation
---