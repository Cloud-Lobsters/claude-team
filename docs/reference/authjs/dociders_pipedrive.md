# @auth/core – Pipedrive Provider

> Built‑in Pipedrive integration for Auth.js (OAuth 2.0).

---

## Overview

The **Pipedrive** provider allows you to authenticate users via Pipedrive’s OAuth 2.0 flow.  
It returns a `PipedriveProfile` object that contains the user’s Pipedrive data.

---

## PipedriveProfile

```ts
export interface PipedriveProfile extends Record<string, any> {
  /** User data returned by Pipedrive */
  data: {
    activated: boolean;
    active_flag: boolean;
    company_country: string;
    company_domain: string;
    company_id: number;
    company_industry: string;
    company_name: string;
    created: Date;
    default_currency: string;
    email: string;
    has_created_company: boolean;
    icon_url: string;
    id: number;
    is_admin: number;
    is_you: boolean;
    lang: number;
    language: {
      country_code: string;
      language_code: string;
    };
    last_login: Date;
    locale: string;
    modified: Date;
    name: string;
    phone: string;
    role_id: number;
    signup_flow_variation: string;
    timezone_name: string;
    timezone_offset: string;
  };
  /** Optional fields – may be omitted by the provider */
  activated?: boolean;
  active_flag?: boolean;
  company_country?: string;
  company_domain?: string;
  company_id?: number;
  company_industry?: string;
  company_name?: string;
  created?: Date;
  default_currency?: string;
  has_created_company?: boolean;
  icon_url?: string;
  is_admin?: number;
  is_you?: boolean;
  lang?: number;
  language?: {
    country_code: string;
    language_code: string;
  };
  language?: {
    country_code?: string;
    language_code?: string;
  };
  last_login?: Date;
  locale?: string;
  modified?: Date;
  phone?: string;
  role_id?: number;
  signup_flow_variation?: string;
  timezone_name?: string;
  timezone_offset?: string;
  /** Indicates whether the authentication succeeded */
  success: boolean;
}
```

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/pipedrive
```

### Configuration

```ts
import { Auth } from "@auth/core";
import Pipedrive from "@auth/core/providers/pipedrive";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Pipedrive({
      clientId: PIPEDRIVE_CLIENT_ID,
      clientSecret: PIPEDRIVE_CLIENT_SECRET,
    }),
  ],
});
```

> Replace `PIPEDRIVE_CLIENT_ID` and `PIPEDRIVE_CLIENT_SECRET` with your credentials.

---

## Notes

* The provider follows the OAuth 2.0 specification by default.  
* If you need to override any defaults, refer to the *Customizing a Built‑in OAuth Provider* guide.  
* Auth.js does not guarantee compliance with provider‑specific deviations from the spec.  
* Report bugs or non‑compliance issues via the GitHub issue tracker.

---

## Type Parameters

```ts
/**
 * @param options - OAuth user configuration
 * @returns OAuth configuration for the provider
 */
function default<P extends PipedriveProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P>;
```

---

## Resources

* [Pipedrive OAuth Documentation](https://developers.pipedrive.com/docs/api/v1/oauth)

---