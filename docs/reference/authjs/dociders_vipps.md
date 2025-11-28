# Auth.js – Vipps Provider

> **Auth.js** is the open‑source authentication framework that powers NextAuth.js and many other adapters.  
> This page documents the **Vipps** OIDC provider that can be used with Auth.js.

---

## 1. Overview

The Vipps provider implements the OpenID Connect (OIDC) flow for the Norwegian mobile‑payment service Vipps.  
It exposes a `VippsProfile` type that represents the user profile returned by Vipps, and a `default()` function that returns the provider configuration.

---

## 2. `VippsProfile`

`VippsProfile` extends `Record<string, any>` and is indexable.  
It contains the fields that Vipps returns in the `id_token` and `userinfo` endpoints.

```ts
export interface VippsProfile extends Record<string, any> {
  // Basic personal data
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nin: string;          // Norwegian national identification number
  phone_number: string;
  sid: string;
  sub: string;

  // Address information
  address: Address;
  other_addresses: Address[];

  // Birthdate
  birthdate: string;

  // Vipps‑specific consent data
  delegatedConsents: {
    confirmConsentButtonText: string;
    consents: {
      accepted: boolean;
      id: string;
      required: boolean;
      textDisplayedToUser: string;
    }[];
    heading: string;
    language: string;
    links: {
      privacyStatementLinkText: string;
      privacyStatementLinkUrl: string;
      termsLinkText: string;
      termsLinkUrl: string;
    };
    termsDescription: string;
    timeOfConsent: string;
  };

  // Bank account information
  accounts: {
    account_name: string;
    account_number: number;
    bank_name: string;
  }[];
}
```

> **Note**: `Address` is the standard OIDC address object (see the OIDC spec).

---

## 3. Provider Configuration

```ts
import Vipps from "@auth/core/providers/vipps";

export const providers = [
  Vipps({
    clientId: process.env.AUTH_VIPPS_ID,
    clientSecret: process.env.AUTH_VIPPS_SECRET,
    // Optional: override the issuer for testing
    // issuer: "https://apitest.vipps.no",
  }),
];
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OIDCUserConfig<VippsProfile>` | Configuration options for the provider. |

### Returns

`OIDCConfig<VippsProfile>` – the fully‑configured provider ready to be used in Auth.js.

---

## 4. Example Usage

```ts
import { NextAuthOptions } from "@auth/core";
import Vipps from "@auth/core/providers/vipps";

export const authOptions: NextAuthOptions = {
  providers: [
    Vipps({
      clientId: process.env.AUTH_VIPPS_ID!,
      clientSecret: process.env.AUTH_VIPPS_SECRET!,
      // For local testing, point to the Vipps test issuer
      // issuer: "https://apitest.vipps.no",
    }),
  ],
  // ...other Auth.js options
};
```

> **Tip**: When testing locally, override the `issuer` option with `https://apitest.vipps.no` to use the Vipps test environment.

---

## 5. Related Resources

- [Vipps Login API](https://vipps.no/en/login/)
- [Auth.js Documentation](https://authjs.dev/)
- [OIDC Specification](https://openid.net/specs/openid-connect-core-1_0.html)

---

## 6. Contributing

Feel free to open issues or pull requests on the [Auth.js GitHub repository](https://github.com/authjs/authjs).  
All contributors are welcome!

---