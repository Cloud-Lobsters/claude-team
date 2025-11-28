# BankID Norway Provider – Auth.js

The **BankID Norway** provider implements the OpenID Connect flow for the BankID service in Norway.  
It is available as part of the `@auth/core` package and can be used with any framework that supports Auth.js (Next.js, SvelteKit, Express, etc.).

> **NOTE**  
> The provider comes with a fully‑configured default.  
> If you need to override any defaults, see the *Customising a Built‑in Provider* section.

---

## 1.  Profile

The provider returns an `BankIDNorwayProfile` object that contains the standard OpenID Connect claims plus BankID‑specific fields.

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `acr` | `string` | Uniform Resource Name for the IDP option used, including Level of Assurance (LoA). | `urn:bankid:bid;LOA=4` |
| `additionalCertInfo` | `object` | Certificate details. | `{ certQualified: true, certValidFrom: 1690000000, … }` |
| `amr` | `"BID" | "BIM" | "BIS"` | Authentication method reference. | `BID` |
| `at_hash` | `string` | Hash of the access token. | `eJzV...` |
| `aud` | `string` | Audience – always the client ID. | `my-client-id` |
| `auth_time` | `number` | Epoch time of authentication. | `1690000000` |
| `azp` | `string` | Authorized party – equals client ID. | `my-client-id` |
| `bankid_altsub` | `string` | Personal Identifier (PID) / Serial Number from the BankID certificate. | `181266*****` |
| `birthdate` | `string` | User’s birthdate. | `1990-01-01` |
| `email` | `string` (optional) | Returned only from the `userinfo_endpoint`. | `user@example.com` |
| `exp` | `number` | Token expiration time. | `1690003600` |
| `family_name` | `string` | User’s family name. | `Doe` |
| `given_name` | `string` | User’s given name. | `John` |
| `iat` | `number` | Issued at time. | `1690000000` |
| `iss` | `string` | Issuer. | `https://bankid.no` |
| `jti` | `string` | JWT ID. | `abc123` |
| `name` | `string` | Full name. | `John Doe` |
| `nnin_altsub` | `string` (optional) | Norwegian National Identity Number (fødselsnummer). Requires `nnin_altsub` scope. | `18126612345` |
| `originator` | `string` | Issuer of the end‑user certificate (for BID or BIM). | `CN=BankID Bankenes ID-tjeneste Bank CA 2, …` |
| `session_state` | `string` | Session state. | `xyz789` |
| `sid` | `string` | Session ID. | `session-123` |
| `sub` | `string` | Subject (user identifier). | `user-123` |
| `tid` | `string` | Tenant ID – used as input for the Fraud Data service. | `tenant-456` |
| `typ` | `"ID"` | Token type. | `ID` |
| `updated_at` | `number` | Last update time. | `1690000000` |

### `additionalCertInfo` sub‑object

| Field | Type | Example |
|-------|------|---------|
| `certQualified` | `boolean` | `true` |
| `certValidFrom` | `number` | `1690000000` |
| `certValidTo` | `number` | `1692592000` |
| `keyAlgorithm` | `string` | `RSA` |
| `keySize` | `string` | `2048` |
| `policyOid` | `string` | `1.2.3.4.5` |
| `serialNumber` | `string` | `1234567890` |
| `subjectName` | `string` | `CN=John Doe, …` |
| `versionNumber` | `string` | `3` |

---

## 2.  Setup

### 2.1  Callback URL

```
https://example.com/api/auth/callback/bankid-no
```

### 2.2  Configuration

```ts
import { Auth } from "@auth/core";
import BankIDNorge from "@auth/core/providers/bankid-no";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    BankIDNorge({
      clientId: process.env.AUTH_BANKID_NO_ID!,
      clientSecret: process.env.AUTH_BANKID_NO_SECRET!,
    }),
  ],
});
```

> **Tip** – The provider is exported as `BankIDNorge` (the Norwegian spelling).  
> The `clientId` and `clientSecret` are the credentials you receive from BankID.

### 2.3  Default Configuration

```ts
function default(config: OIDCUserConfig<BankIDNorwayProfile>): OIDCConfig<BankIDNorwayProfile>
```

The default configuration already sets the correct endpoints, scopes, and claim mappings.  
If you need to change any of these, pass a custom config object to `BankIDNorge()`.

---

## 3.  Customising a Built‑in Provider

If you need to override defaults (e.g., scopes, redirect URI, or claim mapping), pass a configuration object:

```ts
BankIDNorge({
  clientId: "...",
  clientSecret: "...",
  // Override scopes
  scopes: ["openid", "profile", "email", "bankid_altsub"],
  // Override redirect URI
  redirectUri: "https://example.com/api/auth/callback/bankid-no",
  // Custom claim mapping
  profile: (profile) => ({
    id: profile.sub,
    name: profile.name,
    email: profile.email,
  }),
});
```

---

## 4.  Resources

- **OpenID Connect Provider** – BankID Norway  
  <https://bankid.no/oidc>

---

## 5.  Notes

- The provider strictly follows the OpenID Connect specification.  
- If you encounter a non‑compliant response from BankID, open an issue on the Auth.js GitHub repository.  
- For help, join the Auth.js Discord community or consult the official documentation.

---

## 6.  Example Flow

```ts
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import BankIDNorge from "@auth/core/providers/bankid-no";

export default NextAuth({
  providers: [
    BankIDNorge({
      clientId: process.env.AUTH_BANKID_NO_ID!,
      clientSecret: process.env.AUTH_BANKID_NO_SECRET!,
    }),
  ],
});
```

```ts
// client side
import { signIn, signOut, useSession } from "next-auth/react";

function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <button onClick={() => signIn("bankid-no")}>Sign in with BankID</button>;
}
```

---

### End of Documentation

Feel free to adapt the examples to your framework of choice. Happy coding!