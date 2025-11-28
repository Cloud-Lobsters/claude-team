# Auth.js – Express Adapter API Reference

The **@auth/express** package provides a thin wrapper that lets you use Auth.js with an Express‑style HTTP server.  
Below is a clean, self‑contained reference for the three public helpers that the adapter exposes.

---

## `encodeUrlEncoded(object)`

Encodes a plain JavaScript object into a URL‑encoded query string.

| Parameter | Type | Description |
|-----------|------|-------------|
| `object` | `Record<string, any>` | The object to encode. |

**Returns**: `string` – The URL‑encoded representation.

```ts
import { encodeUrlEncoded } from '@auth/express';

const payload = { foo: 'bar', count: 42 };
const encoded = encodeUrlEncoded(payload);
// → 'foo=bar&count=42'
```

---

## `toExpressResponse(response, res)`

Adapts a **Web Response** (the standard `Response` type used by Auth.js) to an **Express Response** (`res`).  
It calls the appropriate Express methods (`status`, `set`, `send`, etc.) so that the response is sent correctly.

| Parameter | Type | Description |
|-----------|------|-------------|
| `response` | `Response` | The Web Response returned by Auth.js. |
| `res` | `Response` | The Express Response object. |

**Returns**: `Promise<void>` – Resolves when the response has been fully sent.

```ts
import { toExpressResponse } from '@auth/express';

async function handler(req, res) {
  const webResponse = await someAuthHandler(req);
  await toExpressResponse(webResponse, res);
}
```

---

## `toWebRequest(req)`

Converts an **Express Request** into a **Web Request** that Auth.js understands.  
This is useful when you want to hand the request over to Auth.js’s core logic.

| Parameter | Type | Description |
|-----------|------|-------------|
| `req` | `Request` | The Express Request object. |

**Returns**: `Request` – The adapted Web Request.

```ts
import { toWebRequest } from '@auth/express';

function handler(req, res) {
  const webReq = toWebRequest(req);
  // Pass `webReq` to Auth.js handlers
}
```

---

## Quick Start Example

```ts
import express from 'express';
import { toWebRequest, toExpressResponse } from '@auth/express';
import { authHandler } from '@auth/core';

const app = express();

app.use(express.json());

app.all('/api/auth/:action', async (req, res) => {
  const webReq = toWebRequest(req);
  const webRes = await authHandler(webReq);
  await toExpressResponse(webRes, res);
});

app.listen(3000, () => console.log('Auth.js Express server listening on port 3000'));
```

---

### Notes

* All functions are pure and side‑effect free except for `toExpressResponse`, which writes to the Express response stream.
* The adapter is intentionally lightweight; it only bridges the request/response shape between Express and Auth.js’s Web‑API‑compatible core.

---