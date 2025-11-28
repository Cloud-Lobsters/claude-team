# `LoginPage` Component Documentation

The `LoginPage` component renders a fully‑featured authentication form that mimics the look‑and‑feel of GitHub’s public login page.  
It is intentionally lightweight and can be dropped into any React application that needs a quick, accessible login UI.

> **Note**  
> This component is purely presentational. All authentication logic (e.g. API calls, OAuth flows, passkey handling) must be supplied by the consumer via the callback props.

---

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onLogin` | `(credentials: { username: string; password: string }) => void` | ✅ | Called when the user submits the form. The callback receives the entered username/email and password. |
| `onForgotPassword` | `() => void` | ❌ | Called when the user clicks the *Forgot password?* link. |
| `onGoogleLogin` | `() => void` | ❌ | Called when the user clicks *Continue with Google*. |
| `onPasskeyLogin` | `() => void` | ❌ | Called when the user clicks *Sign in with a passkey*. |
| `onCreateAccount` | `() => void` | ❌ | Called when the user clicks *New to GitHub? Create an account*. |
| `onTerms` | `() => void` | ❌ | Called when the user clicks *Terms*. |
| `onPrivacy` | `() => void` | ❌ | Called when the user clicks *Privacy*. |
| `onDocs` | `() => void` | ❌ | Called when the user clicks *Docs*. |
| `onSupport` | `() => void` | ❌ | Called when the user clicks *Contact GitHub Support*. |
| `onCookieSettings` | `() => void` | ❌ | Called when the user clicks *Manage cookies*. |
| `onShareInfo` | `() => void` | ❌ | Called when the user clicks *Do not share my personal information*. |
| `className` | `string` | ❌ | Optional CSS class to apply to the root element. |
| `style` | `React.CSSProperties` | ❌ | Optional inline styles for the root element. |

---

## Usage Example

```tsx
import React from 'react';
import { LoginPage } from './LoginPage';

export const App = () => {
  const handleLogin = ({ username, password }) => {
    // Replace with real authentication logic
    console.log('Logging in', { username, password });
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <LoginPage
      onLogin={handleLogin}
      onForgotPassword={handleForgotPassword}
      onGoogleLogin={handleGoogleLogin}
      onCreateAccount={() => console.log('Create account clicked')}
      onTerms={() => console.log('Terms clicked')}
      onPrivacy={() => console.log('Privacy clicked')}
      onDocs={() => console.log('Docs clicked')}
      onSupport={() => console.log('Support clicked')}
      onCookieSettings={() => console.log('Cookie settings clicked')}
      onShareInfo={() => console.log('Share info clicked')}
    />
  );
};
```

---

## Component Structure

```
<div class="login-page">
  <h1>Sign in to GitHub</h1>

  <form onSubmit={handleSubmit}>
    <label>
      Username or email address
      <input type="text" name="username" required />
    </label>

    <label>
      Password
      <input type="password" name="password" required />
    </label>

    <button type="submit">Sign in</button>
  </form>

  <a href="#" onClick={onForgotPassword}>Forgot password?</a>

  <hr />

  <button onClick={onGoogleLogin}>Continue with Google</button>
  <button onClick={onPasskeyLogin}>Sign in with a passkey</button>

  <p>
    New to GitHub? <a href="#" onClick={onCreateAccount}>Create an account</a>
  </p>

  <footer>
    <a href="#" onClick={onTerms}>Terms</a> |
    <a href="#" onClick={onPrivacy}>Privacy</a> |
    <a href="#" onClick={onDocs}>Docs</a> |
    <a href="#" onClick={onSupport}>Contact GitHub Support</a> |
    <a href="#" onClick={onCookieSettings}>Manage cookies</a> |
    <a href="#" onClick={onShareInfo}>Do not share my personal information</a>
  </footer>
</div>
```

---

## Accessibility

* All form controls have associated `<label>` elements.  
* The component uses semantic HTML (`<form>`, `<button>`, `<a>`, `<footer>`).  
* Keyboard navigation is fully supported.  
* The component accepts a `className` prop so that developers can override styles without breaking the layout.

---

## Styling

The component ships with minimal default styles. Feel free to override them via CSS or a CSS‑in‑JS solution. Example:

```css
.login-page {
  max-width: 400px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

.login-page button {
  width: 100%;
  margin-top: 1rem;
}
```

---

## Extending

If you need to add additional authentication methods (e.g. GitHub OAuth, SSO), simply pass a new callback prop and render an extra button in the component. The component is intentionally agnostic to the underlying authentication mechanism.

---

## License

MIT © 2025

---