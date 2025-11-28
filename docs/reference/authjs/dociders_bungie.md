# Bungie Provider – Auth.js

The Bungie provider lets you add “Sign in with Bungie” to your Auth.js‑based application.  
Below is a concise, sanitized reference that keeps all the examples from the original documentation.

---

## 1. Overview

- **Provider name**: `bungie`
- **OAuth 2.0** – Auth.js treats Bungie as a standard OAuth 2 provider.
- **Required scopes**: `profile`, `membership`, `notifications`, `forum_activity` (add any additional scopes you need).

---

## 2. Setup

### 2.1 Callback URL

```
https://example.com/api/auth/callback/bungie
```

> **Important**: Bungie requires HTTPS for all sites, even local development.  
> For local testing use `https://127.0.0.1:3000/api/auth/callback/bungie`.

### 2.2 Register Your Application

1. Go to the [Bungie Developer Portal](https://www.bungie.net/en/Application).
2. Fill in:
   - **Application name**
   - **Application status** (e.g., `Active`)
   - **Website** (e.g., `https://example.com`)
   - **OAuth Client Type** → `Confidential`
   - **Redirect URL** → `https://localhost:3000/api/auth/callback/bungie`
   - **Scope** → `profile membership notifications forum_activity`
   - **Origin Header** – see note below.

### 2.3 HTTPS for Local Development

Bungie does **not** allow `localhost` as the website URL.  
Use `https://127.0.0.1:3000` instead.

#### 2.3.1 Create a Self‑Signed Certificate

```bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj "/CN=localhost" -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

> **Windows**: Use the OpenSSL binary that ships with Git for Windows (`C:/Program Files/Git/mingw64/bin/openssl.exe`).  
> Add `OPENSSL_CONF=C:/Program Files/Git/mingw64/ssl/openssl.cnf` to your environment if needed.

Place the generated `localhost.key` and `localhost.crt` in a `certificates/` folder.

#### 2.3.2 Run a Local HTTPS Server

```js
// server.js
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./certificates/localhost.key"),
  cert: fs.readFileSync("./certificates/localhost.crt"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on https://localhost:3000");
  });
});
```

Run with:

```bash
node server.js
```

---

## 3. Configuration

```js
import { Auth } from "@auth/core";
import Bungie from "@auth/core/providers/bungie";

const request = new Request(origin);
const response = await Auth(request, {
  providers: [
    Bungie({
      clientId: BUNGIE_CLIENT_ID,
      clientSecret: BUNGIE_CLIENT_SECRET,
      headers: { "X-API-Key": BUNGIE_API_KEY },
    }),
  ],
});
```

### 3.1 Options

| Option | Type | Description |
|--------|------|-------------|
| `clientId` | `string` | Your Bungie OAuth client ID. |
| `clientSecret` | `string` | Your Bungie OAuth client secret. |
| `headers` | `Record<string, string>` | Optional headers (e.g., `X-API-Key`). |

> **Note**: The provider defaults to the standard OAuth 2 flow. Override any defaults by passing additional options (see *Customizing a Built‑in OAuth Provider*).

---

## 4. Resources

- [Bungie OAuth Documentation](https://bungie.net/en/Developer)
- [How to set up localhost with HTTPS in a Next.js app](https://nextjs.org/docs/api-reference/next.config.js/https)

---

## 5. Notes

- Auth.js assumes the Bungie provider follows the OAuth 2 specification.  
- If you encounter a bug in the default configuration, open an issue on GitHub.  
- For non‑compliance with the spec, the maintainers may not pursue a fix.

---

## 6. API Reference

### `default(options)`

```ts
function default(options: OAuthUserConfig<Record<string, any>>): OAuthConfig<Record<string, any>>
```

- **Parameters**
  - `options` – `OAuthUserConfig<Record<string, any>>`  
    Configuration options for the provider.
- **Returns** – `OAuthConfig<Record<string, any>>`  
  The configured OAuth provider instance.

---

## 7. Example Usage

```js
// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import Bungie from "@auth/core/providers/bungie";

export default NextAuth({
  providers: [
    Bungie({
      clientId: process.env.BUNGIE_CLIENT_ID,
      clientSecret: process.env.BUNGIE_CLIENT_SECRET,
      headers: { "X-API-Key": process.env.BUNGIE_API_KEY },
    }),
  ],
});
```

---

**Auth.js © Balázs Orbán and Team – 2025**