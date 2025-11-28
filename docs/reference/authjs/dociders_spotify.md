# Spotify Provider – Auth.js

The **Spotify** provider is a built‑in OAuth 2.0 integration for Auth.js.  
It allows you to add Spotify login to your application with minimal configuration.

---

## 1. Overview

| Feature | Description |
|---------|-------------|
| **Provider** | `@auth/core/providers/spotify` |
| **OAuth 2.0** | Yes |
| **Default callback URL** | `https://example.com/api/auth/callback/spotify` |

---

## 2. Types

### `SpotifyImage`

| Property | Type   | Description |
|----------|--------|-------------|
| `url`    | `string` | URL of the image |

### `SpotifyProfile`

```ts
interface SpotifyProfile extends Record<string, any> {
  display_name: string;
  email: string;
  id: string;
  images: SpotifyImage[];
}
```

---

## 3. Setup

### 3.1 Callback URL

Register the following callback URL in your Spotify app console:

```
https://example.com/api/auth/callback/spotify
```

### 3.2 Configuration

```ts
import { Auth } from "@auth/core";
import Spotify from "@auth/core/providers/spotify";

const request = new Request(origin);

const response = await Auth(request, {
  providers: [
    Spotify({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
    }),
  ],
});
```

> **Tip** – Replace `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` with the values from your Spotify developer dashboard.

---

## 4. Resources

- [Spotify OAuth Documentation](https://developer.spotify.com/documentation/general/guides/authorization/)
- [Spotify App Console](https://developer.spotify.com/dashboard/)

---

## 5. Notes

- Auth.js assumes the Spotify provider follows the OAuth 2.0 specification.
- The provider comes with a default configuration.  
  To override defaults, refer to the guide on [customizing a built‑in OAuth provider](#).
- If you encounter a bug in the default configuration, open an issue on the Auth.js GitHub repository.

---

## 6. Type Parameters

```ts
/**
 * @template P extends SpotifyProfile
 * @param {OAuthUserConfig<P>} options
 * @returns {OAuthConfig<P>}
 */
function default<P>(options): OAuthConfig<P>
```

---

## 7. Related Providers

- [Slack](#)
- [Strava](#)

---

## 8. About Auth.js

Auth.js is an open‑source authentication framework for modern web applications.  
For more information, visit the [Auth.js website](https://authjs.dev) or the [GitHub repository](https://github.com/authjs/authjs).

---