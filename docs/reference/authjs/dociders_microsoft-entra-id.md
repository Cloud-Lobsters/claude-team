# Microsoft Entra ID Provider – Auth.js

> **Auth.js** – The open‑source authentication framework for Node.js and the web.  
> This document describes the built‑in Microsoft Entra ID (formerly Azure AD) provider that ships with `@auth/core`.

---

## 1. Overview

The Microsoft Entra ID provider implements the OpenID Connect (OIDC) flow against the Microsoft Identity Platform.  
It returns a user profile that conforms to the `MicrosoftEntraIDProfile` interface (see the *Properties* section below).

> **Tip** – The provider automatically fetches the user’s profile photo from Microsoft Graph and returns it as a base‑64 string.

---

## 2. Profile Claims (`MicrosoftEntraIDProfile`)

| Property | Type | Description |
|----------|------|-------------|
| `acct` | `0 | 1` | User account status in the tenant. `0` = member, `1` = guest. |
| `acrs` | `string` | Auth Context IDs – used for step‑up authentication. |
| `aio` | `string` | Internal claim for token reuse – ignore. |
| `at_hash` | `string` | Hash of the access token (only on `/authorize` responses). |
| `aud` | `string` | Audience – your app’s Application ID. |
| `auth_time` | `Date` | Time of last authentication. |
| `c_hash` | `string` | Hash of the authorization code (only on `/authorize` responses). |
| `ctry` | `string` | User’s country/region (ISO‑3166‑1 alpha‑2). |
| `email` | `string` | User’s email address (mutable). |
| `exp` | `Date` | Token expiration time. |
| `family_name` | `string` | Last name / surname. |
| `fwd` | `string` | IP address (when inside a VNET). |
| `given_name` | `string` | First name. |
| `groups` | `string` | Group claim (requires `GroupMembershipClaims` in the app manifest). |
| `hasgroups` | `boolean` | `true` if the user belongs to at least one group. |
| `iat` | `Date` | Issued‑at time. |
| `idp` | `string` | Identity provider that authenticated the user. |
| `in_corp` | `string` | Indicates corporate network login. |
| `ipaddr` | `string` | Client IP address. |
| `iss` | `string` | Issuer URI (includes tenant ID). |
| `login_hint` | `string` | Base‑64 encoded login hint for SSO. |
| `name` | `string` | Human‑readable name. |
| `nbf` | `Date` | “Not before” time. |
| `nonce` | `string` | Nonce from the original authorize request. |
| `oid` | `string` | Immutable object ID (GUID). |
| `onprem_sid` | `string` | On‑premises Security Identifier. |
| `preferred_username` | `string` | Primary username (mutable). |
| `pwd_exp` | `number` | Seconds until password expiration. |
| `pwd_url` | `string` | URL to change password. |
| `rh` | `string` | Internal claim – ignore. |
| `roles` | `string[]` | Roles assigned to the user. |
| `sid` | `string` | Session identifier. |
| `sub` | `string` | Pairwise subject identifier. |
| `tenant_ctry` | `string` | Tenant country/region. |
| `tenant_region_scope` | `string` | Tenant region. |
| `tid` | `string` | Tenant ID (GUID). |
| `upn` | `string` | User Principal Name (mutable). |
| `uti` | `string` | Token identifier (unique per token). |
| `ver` | `"2.0"` | Token version. |
| `verified_primary_email` | `string[]` | Primary authoritative email addresses. |
| `verified_secondary_email` | `string[]` | Secondary authoritative email addresses. |
| `vnet` | `string` | VNET specifier. |
| `xms_cc` | `string` | Client capabilities. |
| `xms_edov` | `boolean` | Email domain verified flag. |
| `xms_pdl` | `string` | Preferred data location (three‑letter code). |
| `xms_pl` | `string` | User preferred language (`LL‑CC`). |
| `xms_tpl` | `string` | Tenant preferred language (`LL`). |
| `ztdid` | `string` | Zero‑touch deployment ID. |

> **Security note** – Never use mutable claims (`email`, `preferred_username`, `upn`) for authorization or as a database key. Use `oid` instead.

---

## 3. Setup

### 3.1 Callback URL

```
https://example.com/api/auth/callback/microsoft-entra-id
```

> The callback URL must be registered in the Azure portal under **Authentication** → **Redirect URIs**.

### 3.2 Environment Variables

| Variable | Description |
|----------|-------------|
| `AUTH_MICROSOFT_ENTRA_ID_ID` | Your Azure AD **Application (client) ID**. |
| `AUTH_MICROSOFT_ENTRA_ID_SECRET` | The **client secret** for the application. |
| `AUTH_MICROSOFT_ENTRA_ID_ISSUER` *(optional)* | The issuer URI, e.g. `https://login.microsoftonline.com/<tenant-id>/v2.0/`. |

> If `AUTH_MICROSOFT_ENTRA_ID_ISSUER` is omitted, the provider defaults to `https://login.microsoftonline.com/common/v2.0/`, allowing any Microsoft account (personal, school, or work).

### 3.3 Configuration

```ts
import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id";

export const authOptions = {
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      // Optional: restrict to a single tenant
      // issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    }),
  ],
};
```

> **Restricting to a single tenant** – set `issuer` to `https://login.microsoftonline.com/<tenant-id>/v2.0/`.

---

## 4. Resources

- [Microsoft Entra OAuth documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow)
- [Microsoft Entra OAuth apps](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

---

## 5. Notes

- **Profile photo** – Microsoft Entra ID returns the photo as an `ArrayBuffer`. The provider converts it to a base‑64 string (`data:image/png;base64,…`). The default size is **48 × 48** pixels to keep JWT payloads small.
- The provider follows the OpenID Connect specification. If you encounter a spec deviation, open an issue on the Auth.js GitHub repository.

---

## 6. API Reference

### `default(config)`

```ts
/**
 * Creates an OIDC configuration for Microsoft Entra ID.
 *
 * @param config - OIDC user configuration extended with optional photo size.
 * @returns OIDCConfig<MicrosoftEntraIDProfile>
 *
 * @example
 * import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id";
 *
 * const provider = MicrosoftEntraID({
 *   clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
 *   clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
 *   issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
 *   profilePhotoSize: 96, // optional: 48 | 64 | 96 | 120 | 240 | 360 | 432 | 504 | 648
 * });
 */
export default function default(
  config: OIDCUserConfig<MicrosoftEntraIDProfile> & {
    profilePhotoSize?: 48 | 64 | 96 | 120 | 240 | 360 | 432 | 504 | 648;
  }
): OIDCConfig<MicrosoftEntraIDProfile>;
```

- **Parameters**
  - `config` – Standard OIDC user configuration (`clientId`, `clientSecret`, `issuer`, etc.) plus an optional `profilePhotoSize` (default `48`).
- **Returns** – An `OIDCConfig<MicrosoftEntraIDProfile>` ready to be passed to Auth.js.

---

### Example: Using the Provider in a Next.js API Route

```ts
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id";

export default NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      // Optional: restrict to your tenant
      // issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    }),
  ],
});
```

---

## 7. Customizing the Provider

The provider can be customized by overriding any of the default options:

```ts
MicrosoftEntraID({
  clientId: "...",
  clientSecret: "...",
  issuer: "...",
  // Override the default scopes
  authorization: {
    params: {
      scope: "openid profile email offline_access",
    },
  },
  // Custom profile mapping
  async profile(profile) {
    return {
      id: profile.oid,
      name: profile.name,
      email: profile.email,
      image: profile.picture, // base‑64 string
    };
  },
});
```

---

## 8. Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| “Invalid client secret” | Wrong `clientSecret` | Verify the secret in Azure portal. |
| “Issuer mismatch” | `issuer` not set correctly | Ensure `issuer` matches the tenant’s `/v2.0/` endpoint. |
| “Missing photo” | Photo size too large for JWT | Reduce `profilePhotoSize` or store the photo elsewhere. |

---

## 9. Contributing & Issues

If you discover a bug or a spec deviation, please open an issue on the [Auth.js GitHub repository](https://github.com/authjs/authjs).  
For feature requests or discussions, use the GitHub Discussions or the Discord community.

---