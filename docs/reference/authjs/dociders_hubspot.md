# HubSpot Provider – Auth.js

The HubSpot provider lets you add HubSpot OAuth 2.0 authentication to your Auth.js application.

---

## Overview

- **Provider name**: `hubspot`
- **OAuth 2.0** compliant
- Returns a limited set of user information (see HubSpot docs)

---

## Setup

### Callback URL

```
https://example.com/api/auth/callback/hubspot
```

> **Note**: Replace `example.com` with your own domain.

---

## Configuration

```ts
import { Auth } from "@auth/core";
import HubSpot from "@auth/core/providers/hubspot";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    HubSpot({
      clientId: HUBSPOT_CLIENT_ID,
      clientSecret: HUBSPOT_CLIENT_SECRET,
    }),
  ],
});
```

- `clientId` – Your HubSpot app’s Client ID  
- `clientSecret` – Your HubSpot app’s Client Secret

> **Prerequisite**: Create an app in your HubSpot Developer Account  
> (see [HubSpot Developer Tools Overview](https://developers.hubspot.com/docs/api/developer-tools-overview)).

---

## Resources

- [HubSpot OAuth documentation](https://developers.hubspot.com/docs/api/oauth)

---

## Notes

- The provider follows the OAuth 2.0 spec by default.
- HubSpot returns only a subset of user data; name and profile photo are not available via the API.
- To customize the default configuration, refer to the “Customizing a Built‑in OAuth Provider” guide.

---

## Type Parameters

| Type Parameter | Description |
|----------------|-------------|
| `P extends HubSpotProfile` | The shape of the user profile returned by HubSpot. |

---

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `OAuthUserConfig<P>` | Configuration options for the provider. |

---

## Returns

`OAuthConfig<P>`

---

## Example

```ts
import { Auth } from "@auth/core";
import HubSpot from "@auth/core/providers/hubspot";

const request = new Request("https://example.com");

const response = await Auth(request, {
  providers: [
    HubSpot({
      clientId: "YOUR_HUBSPOT_CLIENT_ID",
      clientSecret: "YOUR_HUBSPOT_CLIENT_SECRET",
    }),
  ],
});
```

---

**Disclaimer**  
Auth.js strictly adheres to the OAuth 2.0 specification. If you encounter a bug or non‑compliance issue, open an issue on GitHub. For non‑spec compliance, we may not pursue a resolution. Feel free to ask for help in the Discussions.