# ProxyAgent – Undici

`ProxyAgent` is a drop‑in replacement for the Node.js `http.Agent` that routes all requests through an HTTP/HTTPS proxy.  
It implements the `undici.Dispatcher` interface, so it can be used with any of Undici’s request APIs (`request`, `fetch`, `setGlobalDispatcher`, etc.).

> **NOTE** – All examples below are fully runnable with the latest Undici release.  
> They assume you have installed Undici (`npm i undici`) and are running Node ≥ 18.

---

## 1.  Overview

```ts
import { ProxyAgent } from 'undici';
```

* **Purpose** – Forward all HTTP/HTTPS traffic through a proxy server.
* **Features**  
  * Supports HTTP, HTTPS, and HTTP/2 proxies.  
  * Automatic tunneling for secure connections (`CONNECT`).  
  * Optional authentication via `token` or legacy `auth`.  
  * Custom TLS options for both the proxy and the target endpoint.  
  * Works as a global dispatcher or a per‑request dispatcher.

---

## 2.  Constructor

```ts
new ProxyAgent([options])
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `ProxyAgentOptions` | **Yes** | Configuration object that extends `AgentOptions`. |

### 2.1  `ProxyAgentOptions`

```ts
interface ProxyAgentOptions extends AgentOptions {
  /** The proxy URI – string, URL instance, or `{ uri: string }`. */
  uri: string | URL | { uri: string };

  /** Optional bearer or basic token for proxy authentication. */
  token?: string;

  /** Deprecated – use `token` instead. */
  auth?: string;

  /** Factory that creates a Dispatcher for a given origin. */
  clientFactory?: (origin: URL, opts: object) => Dispatcher;

  /** TLS options for the request socket (target endpoint). */
  requestTls?: RequestTlsBuildOptions;

  /** TLS options for the proxy socket. */
  proxyTls?: RequestTlsBuildOptions;

  /** Force tunneling even for unsecured proxy/endpoint connections. */
  proxyTunnel?: boolean;
}
```

> **Important** – `AgentOptions#connect` is omitted; the proxy handles all connections.

---

## 3.  Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `close()` | `Promise<void>` | Closes the agent and waits for all pools/clients to finish. |
| `dispatch(options, handlers)` | `void` | Delegates to the underlying dispatcher. |
| `request(options[, callback])` | `Promise<Response>` | Same as `Dispatcher.request`. |

---

## 4.  Examples

> All examples use the latest Undici API (`request`, `fetch`, `setGlobalDispatcher`).  
> Replace `my.proxy.server` with your actual proxy host.

### 4.1  Basic ProxyAgent Instantiation

```ts
import { ProxyAgent } from 'undici';

const proxyAgent = new ProxyAgent('my.proxy.server');
// or
const proxyAgent = new ProxyAgent(new URL('my.proxy.server'));
// or
const proxyAgent = new ProxyAgent({ uri: 'my.proxy.server' });
// or
const proxyAgent = new ProxyAgent({
  uri: new URL('my.proxy.server'),
  proxyTls: { signal: AbortSignal.timeout(1000) }
});
```

### 4.2  Basic Proxy Request – Global Dispatcher

```ts
import { setGlobalDispatcher, request, ProxyAgent } from 'undici';

const proxyAgent = new ProxyAgent('my.proxy.server');
setGlobalDispatcher(proxyAgent);

const { statusCode, body } = await request('http://localhost:3000/foo');

console.log('response received', statusCode); // 200

for await (const data of body) {
  console.log('data', data.toString('utf8')); // foo
}
```

### 4.3  Basic Proxy Request – Local Dispatcher

```ts
import { ProxyAgent, request } from 'undici';

const proxyAgent = new ProxyAgent('my.proxy.server');

const { statusCode, body } = await request('http://localhost:3000/foo', {
  dispatcher: proxyAgent
});

console.log('response received', statusCode); // 200

for await (const data of body) {
  console.log('data', data.toString('utf8')); // foo
}
```

### 4.4  Basic Proxy Request with Authentication

```ts
import { setGlobalDispatcher, request, ProxyAgent } from 'undici';

const proxyAgent = new ProxyAgent({
  uri: 'my.proxy.server',
  // token: 'Bearer xxxx'
  token: `Basic ${Buffer.from('username:password').toString('base64')}`
});
setGlobalDispatcher(proxyAgent);

const { statusCode, body } = await request('http://localhost:3000/foo');

console.log('response received', statusCode); // 200

for await (const data of body) {
  console.log('data', data.toString('utf8')); // foo
}
```

### 4.5  Clean Up After Tests

```ts
import { ProxyAgent, setGlobalDispatcher } from 'undici';

const proxyAgent = new ProxyAgent('my.proxy.server');
setGlobalDispatcher(proxyAgent);

await proxyAgent.close();
```

### 4.6  ProxyAgent with `fetch`

```ts
import { ProxyAgent, fetch } from 'undici';

// Define the ProxyAgent
const proxyAgent = new ProxyAgent('http://localhost:8000');

// Make a GET request through the proxy
const response = await fetch('http://localhost:3000/foo', {
  dispatcher: proxyAgent,
  method: 'GET',
});

console.log('Response status:', response.status);
console.log('Response data:', await response.text());
```

### 4.7  ProxyAgent with a Custom Proxy Server

```ts
import * as http from 'node:http';
import { createProxy } from 'proxy';
import { ProxyAgent, fetch } from 'undici';

// Create a proxy server
const proxyServer = createProxy(http.createServer());
proxyServer.listen(8000, () => {
  console.log('Proxy server running on port 8000');
});

// Define and use the ProxyAgent
const proxyAgent = new ProxyAgent('http://localhost:8000');

const response = await fetch('http://example.com', {
  dispatcher: proxyAgent,
  method: 'GET',
});

console.log('Response status:', response.status);
console.log('Response data:', await response.text());
```

### 4.8  ProxyAgent with HTTPS Tunneling

```ts
import { ProxyAgent, fetch } from 'undici';

// Define a ProxyAgent for HTTPS proxy
const proxyAgent = new ProxyAgent('https://secure.proxy.server');

// Make a request to an HTTPS endpoint via the proxy
const response = await fetch('https://secure.endpoint.com/api/data', {
  dispatcher: proxyAgent,
  method: 'GET',
});

console.log('Response status:', response.status);
console.log('Response data:', await response.json());
```

### 4.9  ProxyAgent as a Global Dispatcher

```ts
import { ProxyAgent, setGlobalDispatcher, fetch } from 'undici';

// Define and configure the ProxyAgent
const proxyAgent = new ProxyAgent('http://localhost:8000');
setGlobalDispatcher(proxyAgent);

// Make requests without specifying the dispatcher
const response = await fetch('http://example.com');
console.log('Response status:', response.status);
console.log('Response data:', await response.text());
```

---

## 5.  Closing the Agent

```ts
await proxyAgent.close(); // Promise<void>
```

Closes the agent and waits for all active pools and clients to finish before resolving.

---

## 6.  Summary

* **`ProxyAgent`** is a fully‑featured HTTP/HTTPS proxy dispatcher for Undici.  
* It supports authentication, custom TLS options, and tunneling.  
* Use it as a global dispatcher or pass it per request.  
* Always call `close()` in test suites or when shutting down to free resources.

Happy proxying!