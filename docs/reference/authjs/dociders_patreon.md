# Patreon Provider – Auth.js

> **Auth.js** – The open‑source authentication framework for Node.js and the web.  
> This document describes the built‑in Patreon OAuth provider.

---

## Table of Contents

- [Overview](#overview)
- [PatreonProfile](#patreonprofile)
- [Setup](#setup)
- [Configuration](#configuration)
- [Resources](#resources)
- [Notes](#notes)
- [Type Parameters](#type-parameters)

---

## Overview

The Patreon provider implements the OAuth 2.0 flow for authenticating users via Patreon.  
It returns a `PatreonProfile` object containing the user’s basic information.

---

## PatreonProfile

```ts
interface PatreonProfile extends Record<string, any> {
  /** User’s email address */
  email: string;

  /** User’s display name */
  nickname: string;

  /** URL of the user’s avatar image */
  picture: string;

  /** Unique identifier for the user */
  sub: string;
}
```

The provider extends `Record<string, any>` so you can access any additional fields returned by Patreon.

---

## Setup

1. **Install Auth.js**

   ```bash
   npm i @auth/core
   ```

2. **Add the Patreon provider**

   ```ts
   import { Auth } from "@auth/core";
   import Patreon from "@auth/core/providers/patreon";

   const request = new Request(origin);
   const response = await Auth(request, {
     providers: [
       Patreon({
         clientId: PATREON_CLIENT_ID,
         clientSecret: PATREON_CLIENT_SECRET,
       }),
     ],
   });
   ```

3. **Callback URL**

   Configure the callback URL in your Patreon app settings:

   ```
   https://example.com/api/auth/callback/patreon
   ```

---

## Configuration

```ts
Patreon(options: OAuthUserConfig<PatreonProfile>): OAuthConfig<PatreonProfile>
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<PatreonProfile>` | OAuth configuration options (client ID, secret, scopes, etc.). |

> The provider uses the standard OAuth 2.0 specification.  
> If you need to override default settings, refer to the “Customizing a Built‑in OAuth Provider” guide.

---

## Resources

- **Patreon OAuth documentation** – https://www.patreon.com/portal/oauth2
- **Patreon Platform** – https://www.patreon.com/platform
- **API v2 Scopes** – https://docs.patreon.com/#scopes

---

## Notes

- Auth.js assumes the Patreon provider follows OAuth 2.0.  
- If you encounter a bug in the default configuration, open an issue on GitHub.  
- Auth.js does not guarantee compliance with any deviations from the OAuth spec by Patreon.

---

## Type Parameters

```ts
type P extends PatreonProfile
```

`P` represents the type of the user profile returned by the provider.  
You can extend or narrow this type to match your application’s needs.

---