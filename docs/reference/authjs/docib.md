# @auth/express – HTTP API Adapters

`@auth/express` provides a thin wrapper around the core Auth.js logic that makes it easy to plug Auth.js into an Express‑style HTTP server.  
The package re‑exports a handful of helper functions that convert between the native Express request/response objects and the generic `Request`/`Response` types used by Auth.js.

> **Note**  
> These helpers are thin wrappers around the core functions in `@auth/core`.  
> They are intentionally minimal – if you need more advanced behaviour, use the core functions directly.

---

## Table of Contents

- [Installation](#installation)
- [API Reference](#api-reference)
  - [encodeUrlEncoded](#encodeurlencoded)
  - [toExpressResponse](#toexpressresponse)
  - [toWebRequest](#towebrequest)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```bash
npm install @auth/express
# or
yarn add @auth/express
```

---

## API Reference

### `encodeUrlEncoded`

Re‑exports `encodeUrlEncoded` from `@auth/core`.

```ts
import { encodeUrlEncoded } from '@auth/express';
```

**Purpose**  
Serialises a plain object into a URL‑encoded string suitable for use in `application/x-www-form-urlencoded` bodies.

**Signature**

```ts
function encodeUrlEncoded(data: Record<string, any>): string;
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `data` | `Record<string, any>` | The object to serialise. |

**Returns**  
`string` – The URL‑encoded representation of `data`.

---

### `toExpressResponse`

Re‑exports `toExpressResponse` from `@auth/core`.

```ts
import { toExpressResponse } from '@auth/express';
```

**Purpose**  
Converts a generic `Response` object (used by Auth.js) into an Express `Response` object, setting headers, status code, and body appropriately.

**Signature**

```ts
function toExpressResponse(
  res: Express.Response,
  response: Response
): void;
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `res` | `Express.Response` | The Express response object. |
| `response` | `Response` | The Auth.js response to send. |

**Returns**  
`void` – The function mutates the Express response object.

---

### `toWebRequest`

Re‑exports `toWebRequest` from `@auth/core`.

```ts
import { toWebRequest } from '@auth/express';
```

**Purpose**  
Converts an Express `Request` object into the generic `Request` type used by Auth.js, normalising headers, query parameters, and body.

**Signature**

```ts
function toWebRequest(req: Express.Request): Request;
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `req` | `Express.Request` | The Express request object. |

**Returns**  
`Request` – The normalised request object.

---

## Examples

Below are minimal examples that demonstrate how to use the helpers in a typical Express route.

### 1. Using `toWebRequest` and `toExpressResponse`

```ts
import express from 'express';
import { toWebRequest, toExpressResponse } from '@auth/express';
import { handleAuth } from '@auth/core';

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/api/auth', async (req, res) => {
  // Convert Express request to Auth.js request
  const authRequest = toWebRequest(req);

  // Handle the request with Auth.js core logic
  const authResponse = await handleAuth(authRequest);

  // Convert Auth.js response back to Express response
  toExpressResponse(res, authResponse);
});

app.listen(3000, () => console.log('Server listening on http://localhost:3000'));
```

### 2. Serialising a body with `encodeUrlEncoded`

```ts
import { encodeUrlEncoded } from '@auth/express';

const payload = {
  username: 'alice',
  password: 'secret',
};

const body = encodeUrlEncoded(payload);
// body === 'username=alice&password=secret'
```

### 3. Full flow with a custom adapter

```ts
import express from 'express';
import { toWebRequest, toExpressResponse } from '@auth/express';
import { handleAuth } from '@auth/core';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prismaClient';

const app = express();
app.use(express.json());

app.post('/api/auth', async (req, res) => {
  const authRequest = toWebRequest(req);

  const authResponse = await handleAuth(authRequest, {
    adapter: PrismaAdapter(prisma),
    // ...other Auth.js options
  });

  toExpressResponse(res, authResponse);
});

app.listen(3000);
```

---

## Contributing

Contributions are welcome!  
Please read the [contributing guide](https://github.com/authjs/authjs/blob/main/CONTRIBUTING.md) before submitting a pull request.

---

## License

MIT © Auth.js

---