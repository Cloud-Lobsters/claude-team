# LinkedIn Provider – Auth.js

The LinkedIn provider is a built‑in OAuth/OIDC integration for Auth.js.  
It follows the LinkedIn OAuth 2.0 specification and returns a user profile that
conforms to the `LinkedInProfile` interface.

> **Note**  
> Auth.js assumes the LinkedIn provider follows the OIDC specification.  
> If you need to override any defaults, see the *Customizing a Built‑in OAuth Provider* guide.

---

## Types

```ts
/**
 * LinkedIn user profile returned by the provider.
 *
 * @see https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2#response-body-schema
 */
export interface LinkedInProfile extends Record<string, any> {
  /** User's email address */
  email: string;

  /** Whether the email address has been verified */
  email_verified: boolean;

  /** User's family name (last name) */
  family_name: string;

  /** User's given name (first name) */
  given_name: string;

  /** User's locale */
  locale: string;

  /** Full name */
  name: string;

  /** URL of the profile picture */
  picture: string;

  /** LinkedIn unique identifier */
  sub: string;
}
```

---

## API

```ts
/**
 * Creates an OIDC configuration for the LinkedIn provider.
 *
 * @param options Configuration options for the provider.
 * @returns An OIDC configuration object.
 */
export function default<P extends LinkedInProfile>(
  options: OIDCUserConfig<P>
): OIDCConfig<P>;
```

---

## Setup

### 1. Create a LinkedIn App

1. Go to the [LinkedIn Developer Portal](https://www.linkedin.com/developers/).
2. Create a new app and note the **Client ID** and **Client Secret**.
3. Set the **OAuth 2.0 Redirect URLs** to:
   ```
   https://example.com/api/auth/callback/linkedin
   ```

### 2. Install Auth.js

```bash
npm i @auth/core
```

### 3. Configure Auth.js

```ts
import { Auth } from "@auth/core";
import LinkedIn from "@auth/core/providers/linkedin";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],
});
```

> Replace `process.env.LINKEDIN_CLIENT_ID` and `process.env.LINKEDIN_CLIENT_SECRET` with your actual credentials.

---

## Example Usage

```ts
import { Auth } from "@auth/core";
import LinkedIn from "@auth/core/providers/linkedin";

export async function GET(request: Request) {
  return await Auth(request, {
    providers: [
      LinkedIn({
        clientId: "YOUR_CLIENT_ID",
        clientSecret: "YOUR_CLIENT_SECRET",
      }),
    ],
  });
}
```

---

## Resources

- [LinkedIn OAuth 2.0 Documentation](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2)
- [LinkedIn App Console](https://www.linkedin.com/developers/apps)

---

## Customization

If you need to adjust the default configuration (e.g., scopes, endpoints), pass a custom `options` object to `LinkedIn()`:

```ts
LinkedIn({
  clientId: "...",
  clientSecret: "...",
  // Custom scopes
  scope: ["r_liteprofile", "r_emailaddress"],
  // Override endpoints if necessary
  authorization: "https://www.linkedin.com/oauth/v2/authorization",
  token: "https://www.linkedin.com/oauth/v2/accessToken",
});
```

---

## Disclaimer

Auth.js strictly adheres to the OAuth/OIDC specifications.  
If you encounter a bug or a deviation from the spec, open an issue on GitHub.  
For non‑compliance issues, we may not pursue a resolution, but you can discuss it in the Auth.js Discussions.