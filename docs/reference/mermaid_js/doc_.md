# CookieManager – A Simple Cookie‑Handling Utility

The **CookieManager** module is a lightweight helper that abstracts the common cookie‑handling
behaviour you’ll find on modern web services (e.g. X/Twitter).  
It implements the same user‑experience that the X cookie banner offers:

* **Accept all cookies** – enables every cookie, including non‑essential ones.  
* **Refuse non‑essential cookies** – keeps only the essential cookies.  
* **Show cookie choices** – displays a banner that lets the user decide.  

The module is intentionally minimal – it does **not** implement a full cookie‑policy
engine, but it gives you a clean API to plug into your own front‑end.

> **NOTE**  
> The examples below are written in vanilla JavaScript.  
> If you’re using a framework (React, Vue, etc.) you can adapt the calls
> accordingly.

---

## API Overview

| Method | Description | Parameters | Returns |
|-------|------------|-----------|--------|
| `CookieManager.acceptAllCookies()` | Grants permission for all cookies. | None | `Promise<void>` |
| `CookieManager.refuseNonEssentialCookies()` | Grants permission only for essential cookies. | None | `Promise<void>` |
| `CookieManager.showCookieChoices()` | Opens the cookie‑choice banner. | None | `Promise<void>` |
| `CookieManager.isEssentialCookie(name)` | Checks if a cookie is essential. | `name: string` | `boolean` |
| `CookieManager.getCookie(name)` | Reads a cookie value. | `name: string` | `string | null` |
| `CookieManager.setCookie(name, value, options)` | Sets a cookie. | `name: string`, `value: string`, `options?: CookieOptions` | `void` |

### `CookieOptions`

```ts
interface CookieOptions {
  /** Expiration in days (default: 365) */
  expires?: number;
  /** Path for the cookie (default: '/') */
  path?: string;
  /** Domain for the cookie (default: current domain) */
  domain?: string;
  /** Secure flag (default: true) */
  secure?: boolean;
  /** SameSite policy ('Lax', 'Strict', 'None') */
  sameSite?: 'Lax' | 'Strict' | 'None';
}
```

---

## Usage Examples

### 1. Accept All Cookies

```js
// User clicks “Accept all cookies”
CookieManager.acceptAllCookies()
  .then(() => console.log('All cookies accepted'))
  .catch(err => console.error(err));
```

### 2. Refuse Non‑Essential Cookies

```js
// User clicks “Refuse non‑essential cookies”
CookieManager.refuseNonEssentialCookies()
  .then(() => console.log('Only essential cookies remain'))
  .catch(err => console.error(err));
```

### 3. Show Cookie Choices Banner

```js
// Show the banner on page load
document.addEventListener('DOMContentLoaded', () => {
  CookieManager.showCookieChoices();
});
```

### 4. Check if a Cookie is Essential

```js
if (CookieManager.isEssentialCookie('session_id')) {
  console.log('Session cookie is essential');
}
```

### 5. Read and Write Cookies

```js
// Set a cookie
CookieManager.setCookie('theme', 'dark', { expires: 30, sameSite: 'Lax' });

// Read a cookie
const theme = CookieManager.getCookie('theme');
console.log(`Current theme: ${theme}`);
```

---

## Implementation Sketch

Below is a minimal implementation that you can copy‑paste into your project.  
It uses the browser’s `document.cookie` API and respects the
`SameSite`, `Secure`, and `Expires` attributes.

```js
class CookieManager {
  static acceptAllCookies() {
    return new Promise((resolve) => {
      // In a real app, you’d set flags in localStorage or a cookie
      // to remember the user’s choice.
      // Here we simply set a flag cookie.
      this.setCookie('cookie_policy', 'accepted', { expires: 365 });
      resolve();
    });
  }

  static refuseNonEssentialCookies() {
    return new Promise((resolve) => {
      this.setCookie('cookie_policy', 'refused', { expires: 365 });
      resolve();
    });
  }

  static showCookieChoices() {
    return new Promise((resolve) => {
      // Render a simple banner
      const banner = document.createElement('div');
      banner.id = 'cookie-banner';
      banner.innerHTML = `
        <p>We use cookies to improve your experience.</p>
        <button id="accept-all">Accept all cookies</button>
        <button id="refuse-non-essential">Refuse non‑essential cookies</button>
      `;
      document.body.appendChild(banner);

      document.getElementById('accept-all').onclick = () => {
        this.acceptAllCookies().then(() => {
          banner.remove();
          resolve();
        });
      };
      document.getElementById('refuse-non-essential').onclick = () => {
        this.refuseNonEssentialCookies().then(() => {
          banner.remove();
          resolve();
        });
      };
    });
  }

  static isEssentialCookie(name) {
    // Define essential cookies here
    const essential = ['session_id', 'auth_token'];
    return essential.includes(name);
  }

  static getCookie(name) {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  }

  static setCookie(name, value, options = {}) {
    const {
      expires = 365,
      path = '/',
      domain,
      secure = true,
      sameSite = 'Lax',
    } = options;

    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    const expiresStr = `expires=${date.toUTCString()}`;

    const cookieStr = [
      `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
      expiresStr,
      `path=${path}`,
      domain ? `domain=${domain}` : '',
      secure ? 'secure' : '',
      `SameSite=${sameSite}`,
    ]
      .filter(Boolean)
      .join('; ');

    document.cookie = cookieStr;
  }
}
```

---

## FAQ

| Question | Answer |
|---------|-------|
| **Does this module handle GDPR compliance?** | It provides the UI and basic cookie handling, but you must still comply with GDPR by providing a full cookie‑policy page and obtaining explicit consent where required. |
| **Can I add custom cookie categories?** | Yes – extend `isEssentialCookie` and add UI controls in `showCookieChoices`. |
| **What about server‑side cookies?** | This module only manipulates client‑side cookies. Server‑side cookies must be set via HTTP headers. |

---

### Summary

The **CookieManager** gives you a quick, reusable way to:

* Show a cookie‑choice banner.  
* Store the user’s preference.  
* Read/write cookies with proper attributes.  

Feel free to adapt the code to your framework or extend it with more sophisticated consent logic.