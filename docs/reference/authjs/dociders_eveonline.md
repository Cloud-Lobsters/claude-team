# EVEOnline Provider – Auth.js

The **EVEOnline** provider is a built‑in OAuth 2.0 integration for Auth.js.  
It allows you to authenticate users via their EVE Online account and retrieve
their character information.

> **⚠️** When creating your application on the EVE Online developer portal,
> select **Authentication Only** as the connection type.

---

## Table of Contents

- [Provider Overview](#provider-overview)
- [Type Definitions](#type-definitions)
- [Setup & Configuration](#setup--configuration)
- [Callback URL](#callback-url)
- [Example Usage](#example-usage)
- [Customizing the Provider](#customizing-the-provider)
- [Notes & Tips](#notes--tips)
- [Resources](#resources)

---

## Provider Overview

```ts
import EveOnline from "@auth/core/providers/eveonline";
```

The provider follows the standard OAuth 2.0 flow.  
It returns an `EVEOnlineProfile` object containing the authenticated user’s
character data.

---

## Type Definitions

```ts
/**
 * Profile returned by the EVEOnline provider.
 */
export interface EVEOnlineProfile extends Record<string, any> {
  /** The character’s unique ID. */
  CharacterID: number;

  /** The character’s name. */
  CharacterName: string;

  /** Hash of the character owner. */
  CharacterOwnerHash: string;

  /** ISO‑8601 expiration timestamp. */
  ExpiresOn: string;

  /** Intellectual property string. */
  IntellectualProperty: string;

  /** Scopes granted. */
  Scopes: string;

  /** Token type (usually "Bearer"). */
  TokenType: string;
}
```

---

## Setup & Configuration

```ts
import { Auth } from "@auth/core";
import EveOnline from "@auth/core/providers/eveonline";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    EveOnline({
      clientId: process.env.EVEONLINE_CLIENT_ID,
      clientSecret: process.env.EVEONLINE_CLIENT_SECRET,
    }),
  ],
});
```

### Options

| Option | Type | Description |
|--------|------|-------------|
| `clientId` | `string` | Your EVE Online application client ID. |
| `clientSecret` | `string` | Your EVE Online application client secret. |
| `authorization` | `string | OAuthConfig["authorization"]` | Custom authorization URL or config. |
| `token` | `string | OAuthConfig["token"]` | Custom token URL or config. |
| `profile` | `string | OAuthConfig["profile"]` | Custom profile URL or config. |
| `scope` | `string` | Space‑separated scopes. Default: `"esi-characters.read_location.v1 esi-characters.read_online.v1 esi-characters.read_standing.v1 esi-characters.read_titles.v1 esi-characters.read_wallet.v1 esi-characters.read_contacts.v1 esi-characters.read_blueprints.v1 esi-characters.read_assets.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation_roles.v1 esi-characters.read_corporation_membership.v1 esi-characters.read_corporation