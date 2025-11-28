# @auth/core – Passkey Provider

The Passkey provider is a thin wrapper around the WebAuthn provider that pre‑configures the most common Passkey‑related defaults.  
It can be used out‑of‑the‑box or customized to fit your specific needs.

---

## `default(config?: Partial<WebAuthnConfig>): WebAuthnConfig`

Adds Passkey login to your page.

### Setup

Install the required peer dependency:

```bash
# npm
npm install @simplewebauthn/browser@9.0.1

# pnpm
pnpm add @simplewebauthn/browser@9.0.1

# yarn
yarn add @simplewebauthn/browser@9.0.1

# bun
bun add @simplewebauthn/browser@9.0.1
```

### Example

```ts
import { Auth } from "@auth/core";
import Passkey from "@auth/core/providers/passkey";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [Passkey],
});
```

### Resources

| Resource | Description |
|----------|-------------|
| [SimpleWebAuthn – Server side](https://github.com/duo-labs/simplewebauthn) | Server‑side implementation |
| [SimpleWebAuthn – Client side](https://github.com/duo-labs/simplewebauthn) | Client‑side implementation |
| [Passkeys.dev – Intro](https://passkeys.dev/) | Introduction to Passkeys |
| [Passkeys.dev – Specifications](https://passkeys.dev/specs) | Official specifications |

### Notes

* The provider is an extension of the WebAuthn provider with default Passkey values.  
  You may override any of these defaults, but be aware that authenticators might not recognize your credentials as Passkey credentials if you change them.
* The Passkey provider comes with a default configuration. For custom behaviour, see the guide on customizing a built‑in WebAuthn provider.
* If you discover a bug in the default configuration, open an issue.  
  Auth.js strictly follows the specification and cannot guarantee compliance with non‑spec behaviour.

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `config` | `Partial<WebAuthnConfig>` | Optional configuration overrides. |

### Returns

`WebAuthnConfig` – The final configuration object used by the provider.

---

## About Auth.js

* **Introduction** – Auth.js is a modern authentication library for Node.js and the browser.  
* **Security** – Built with the latest security best practices.  
* **Community** – Join the Discord community for support and discussions.  
* **Downloads** – Available on GitHub, NPM, and other package managers.  

> Auth.js © Balázs Orbán and Team – 2025