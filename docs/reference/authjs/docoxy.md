# Supporting Corporate Proxies in Auth.js

Auth.js uses the standard `fetch` API to communicate with OAuth providers.  
If your organization routes outbound traffic through a corporate proxy, you’ll need to
configure the fetch implementation to respect that proxy.

---

## 1.  Using a Custom Fetch Function

You can supply a custom fetch implementation to any provider by passing it as the
`[customFetch]` option.

```ts
// auth.ts
import NextAuth, { customFetch } from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth } = NextAuth({
  providers: [
    GitHub({
      // Replace the default fetch with your custom implementation
      [customFetch]: /* your custom fetch function */
    })
  ]
});
```

---

## 2.  Using the **undici** Library

`undici` is a high‑performance HTTP client that can be configured to use a
proxy dispatcher. This approach works well on Node.js runtimes.

```ts
// auth.ts
import NextAuth, { customFetch } from "next-auth";
import GitHub from "next-auth/providers/github";
import { ProxyAgent, fetch as undici } from "undici";

const dispatcher = new ProxyAgent("http://my.proxy.server");

function proxy(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
  // @ts-expect-error `undici` has a `duplex` option
  return undici(args[0], { ...args[1], dispatcher });
}

export const { handlers, auth } = NextAuth({
  providers: [GitHub({ [customFetch]: proxy })],
});
```

> **Tip**  
> Replace `"http://my.proxy.server"` with your actual proxy URL (including protocol).

---

## 3.  Using **HttpsProxyAgent**

On Edge runtimes or when `undici` is unavailable, a simpler approach is to use
`https-proxy-agent`. This works by attaching an `agent` to the fetch options.

```ts
// auth.ts
import NextAuth, { customFetch } from "next-auth";
import GitHub from "next-auth/providers/github";
const { HttpsProxyAgent } = require("https-proxy-agent");

const proxyAgent = new HttpsProxyAgent("http://my.proxy.server");

async function proxy(url: string, options: any): Promise<Response> {
  const response = (await fetch(url, {
    ...options,
    agent: proxyAgent,
  })) as unknown as Response;
  return response;
}

export const { handlers, auth } = NextAuth({
  providers: [GitHub({ [customFetch]: proxy })],
});
```

> **Note**  
> The `https-proxy-agent` package supports both HTTP and HTTPS proxies.

---

## 4.  Resources

- **undici** – [Basic Proxy Request with local agent dispatcher](https://github.com/nodejs/undici)
- **https-proxy-agent** – [GitHub repository](https://github.com/TooTallNate/https-proxy-agent)

---

## 5.  Quick Checklist

| Step | Action |
|------|--------|
| 1 | Install the proxy library (`undici` or `https-proxy-agent`). |
| 2 | Create a custom fetch function that routes through the proxy. |
| 3 | Pass that function to the provider via `[customFetch]`. |
| 4 | Test the flow to ensure OAuth requests go through the proxy. |

---

### Example: Full `auth.ts` with `undici`

```ts
import NextAuth, { customFetch } from "next-auth";
import GitHub from "next-auth/providers/github";
import { ProxyAgent, fetch as undici } from "undici";

const dispatcher = new ProxyAgent("http://my.proxy.server");

function proxy(...args: Parameters<typeof fetch>): ReturnType<typeof fetch> {
  // @ts-expect-error `undici` has a `duplex` option
  return undici(args[0], { ...args[1], dispatcher });
}

export const { handlers, auth } = NextAuth({
  providers: [GitHub({ [customFetch]: proxy })],
});
```

### Example: Full `auth.ts` with `https-proxy-agent`

```ts
import NextAuth, { customFetch } from "next-auth";
import GitHub from "next-auth/providers/github";
const { HttpsProxyAgent } = require("https-proxy-agent");

const proxyAgent = new HttpsProxyAgent("http://my.proxy.server");

async function proxy(url: string, options: any): Promise<Response> {
  const response = (await fetch(url, {
    ...options,
    agent: proxyAgent,
  })) as unknown as Response;
  return response;
}

export const { handlers, auth } = NextAuth({
  providers: [GitHub({ [customFetch]: proxy })],
});
```

---

**Happy coding!**  
If you run into issues, check the provider’s documentation or open an issue on the Auth.js GitHub repository.