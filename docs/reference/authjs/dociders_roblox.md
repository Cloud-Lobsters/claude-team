# Roblox Provider – Auth.js

The Roblox provider is a built‑in OAuth2 integration for Auth.js.  
It follows the official Roblox OAuth2 specification and returns a user profile that matches the
[Roblox OAuth2 User Profile](https://create.roblox.com/docs/cloud/reference/oauth2) schema.

---

## Table of Contents

- [Overview](#overview)
- [User Profile (`RobloxProfile`)](#user-profile-robloxprofile)
- [Default Configuration](#default-configuration)
- [Setup](#setup)
  - [Callback URL](#callback-url)
  - [Configuration Example](#configuration-example)
- [Resources](#resources)
- [Parameters](#parameters)
- [Returns](#returns)
- [Disclaimer](#disclaimer)

---

## Overview

```ts
import { Auth } from "@auth/core";
import Roblox from "@auth/providers/roblox";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Roblox({
      clientId: AUTH_ROBLOX_ID,
      clientSecret: AUTH_ROBLOX_SECRET,
    }),
  ],
});
```

The provider handles the OAuth2 flow, exchanges the authorization code for an access token, and
retrieves the user profile.

---

## User Profile (`RobloxProfile`)

The profile returned by the provider extends `Record<string, any>` and includes the following
properties:

| Property            | Type                     | Description |
|---------------------|--------------------------|-------------|
| `created_at`        | `number`                 | Unix timestamp of account creation. |
| `name`              | `string`                 | Full name of the user. |
| `nickname`          | `string`                 | User’s nickname. |
| `picture`           | `null | string`          | URL to the user’s avatar image. |
| `preferred_username`| `string`                 | Preferred username. |
| `profile`           | `string`                 | URL to the user’s profile page. |
| `sub`               | `string`                 | Unique identifier for the user. |

> **Note**: The profile may contain additional fields; the table lists the documented ones.

---

## Default Configuration

```ts
function default(options): OIDCConfig<RobloxProfile>
```

The `default` function returns an `OIDCConfig<RobloxProfile>` that is pre‑configured for Roblox.
You can override any of the default options by passing an `options` object.

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/roblox
```

Register this URL in your Roblox OAuth app settings.

### Configuration Example

```ts
import { Auth } from "@auth/core";
import Roblox from "@auth/providers/roblox";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Roblox({
      clientId: AUTH_ROBLOX_ID,
      clientSecret: AUTH_ROBLOX_SECRET,
    }),
  ],
});
```

Replace `AUTH_ROBLOX_ID` and `AUTH_ROBLOX_SECRET` with the credentials from your Roblox OAuth app.

---

## Resources

- **Roblox OAuth documentation** – https://create.roblox.com/docs/cloud/reference/oauth2
- **Roblox OAuth apps** – https://create.roblox.com/oauth

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OIDCUserConfig<RobloxProfile>` | Custom configuration options for the provider. |

---

## Returns

`OIDCConfig<RobloxProfile>`

The returned configuration is compatible with Auth.js’s OIDC flow and includes the user profile
type.

---

## Disclaimer

Auth.js strictly adheres to the OAuth2 specification and cannot be held responsible for any
deviations by the provider. If you encounter a bug in the default configuration, open an issue.
For non‑compliance with the spec, we may not pursue a resolution. Feel free to ask for help in
Discussions.