# WebAuthn Provider – Auth.js

The WebAuthn provider lets you add passkey (WebAuthn) authentication to your Auth.js application.  
Below is a cleaned‑up reference of the provider’s API, configuration options, and usage examples.

---

## 1. Overview

| Feature | Description |
|---------|-------------|
| **Provider type** | `"webauthn"` |
| **Default browser script** | `v9.0.1` (can be disabled) |
| **Conditional UI** | Enabled by default – only one provider may enable it at a time |

---

## 2. Types

```ts
// Relaying Party
type RelayingParty = {
  id: string;      // e.g. "example.com"
  name: string;    // e.g. "Example Site"
  origin: string;  // e.g. "https://example.com"
};

// GetUserInfo callback
type GetUserInfo = (
  options: InternalOptions<WebAuthnProviderType>,
  request: RequestInternal
) => Promise<
  | { exists: true; user: User }
  | { exists: false; user: Omit<User, "id"> }
  | null
>;
```

---

## 3. `WebAuthnConfig`

```ts
interface WebAuthnConfig extends CommonProviderOptions {
  type: "webauthn";

  // Optional: override the default SimpleWebAuthn instance
  simpleWebAuthn?: {
    generateAuthenticationOptions: (options?) => Promise<PublicKeyCredentialRequestOptionsJSON>;
    generateRegistrationOptions: (options) => Promise<PublicKeyCredentialCreationOptionsJSON>;
    verifyAuthenticationResponse: (options) => Promise<VerifiedAuthenticationResponse>;
    verifyRegistrationResponse: (options) => Promise<VerifiedRegistrationResponse>;
  };

  // Optional: custom relaying party
  relayingParty?: Partial<RelayingPartyArray>;

  // Optional: custom authentication options passed to SimpleWebAuthn
  authenticationOptions?: Partial<ConfigurableAuthenticationOptions>;
  verifyAuthenticationOptions?: Partial<ConfigurableVerifyAuthenticationOptions>;

  // Optional: custom registration options passed to SimpleWebAuthn
  registrationOptions?: Partial<ConfigurableRegistrationOptions>;
  verifyRegistrationOptions?: Partial<ConfigurableVerifyRegistrationOptions>;

  // Optional: form fields displayed in the default sign‑in/up form
  formFields?: Record<string, CredentialInput>;

  // Optional: enable conditional UI (only one provider may enable this)
  enableConditionalUI?: boolean;

  // Optional: browser script version to load
  simpleWebAuthnBrowserVersion?: false | SemverString;

  // Optional: callback to fetch user info
  getUserInfo?: GetUserInfo;

  // Optional: callback to return the relaying party for the current request
  getRelayingParty?: (options, request) => RelayingParty;
}
```

---

## 4. Default Constants

```ts
const DEFAULT_SIMPLEWEBAUTHN_BROWSER_VERSION: SemverString = "v9.0.1";
const DEFAULT_WEBAUTHN_TIMEOUT: number = /* default timeout in ms */;
```

---

## 5. Usage Example

```ts
import { Auth } from "@auth/core";
import WebAuthn from "@auth/core/providers/webauthn";

const request = new Request("https://example.com");

const response = await Auth(request, {
  providers: [WebAuthn],
});
```

### Customizing the Provider

```ts
import { Auth } from "@auth/core";
import WebAuthn from "@auth/core/providers/webauthn";

const customConfig: Partial<WebAuthnConfig> = {
  // Override the relaying party
  relayingParty: {
    id: "example.com",
    name: "Example Site",
    origin: "https://example.com",
  },

  // Custom form fields
  formFields: {
    email: { label: "Email", type: "email" },
    username: { label: "Username", type: "text" },
  },

  // Custom getUserInfo logic
  getUserInfo: async (options, request) => {
    const email = request.body.get("email");
    if (!email) return null;

    const user = await db.users.findUnique({ where: { email } });
    if (user) return { exists: true, user };

    // Create a new user object (without id)
    return {
      exists: false,
      user: { email, name: request.body.get("username") },
    };
  },

  // Disable conditional UI
  enableConditionalUI: false,
};

const response = await Auth(request, {
  providers: [WebAuthn(customConfig)],
});
```

---

## 6. SimpleWebAuthn Methods

| Method | Purpose | Parameters | Returns |
|--------|---------|------------|---------|
| `generateAuthenticationOptions` | Prepare options for `navigator.credentials.get()` | `options?: GenerateAuthenticationOptionsOpts` | `Promise<PublicKeyCredentialRequestOptionsJSON>` |
| `generateRegistrationOptions` | Prepare options for `navigator.credentials.create()` | `options: GenerateRegistrationOptionsOpts` | `Promise<PublicKeyCredentialCreationOptionsJSON>` |
| `verifyAuthenticationResponse` | Verify a login response | `options: VerifyAuthenticationResponseOpts` | `Promise<VerifiedAuthenticationResponse>` |
| `verifyRegistrationResponse` | Verify a registration response | `options: VerifyRegistrationResponseOpts` | `Promise<VerifiedRegistrationResponse>` |

---

## 7. Resources

- **Server‑side**: [SimpleWebAuthn – Server side](https://github.com/duo-labs/simplewebauthn)
- **Client‑side**: [SimpleWebAuthn – Client side](https://github.com/duo-labs/simplewebauthn)

---

## 8. Notes

- The provider **does not** modify the database; `getUserInfo` must be side‑effect‑free.
- During passkey creation, the passkey’s user ID is a random string, the user name is `user.email`, and the display name is `user.name` (or `user.email` if `name` is missing).
- Only one provider may enable `enableConditionalUI` at a time.

---

**Disclaimer**  
Auth.js strictly follows the WebAuthn specification. If you encounter a bug in the default configuration, open an issue. For spec‑non‑compliance, we may not pursue a fix. Feel free to ask for help in Discussions.