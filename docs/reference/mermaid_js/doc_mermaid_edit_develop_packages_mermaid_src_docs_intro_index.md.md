# LoginForm Component Documentation

## Overview

`LoginForm` is a reusable UI component that renders a user authentication form.  
It supports:

- Email/username input
- Password input
- “Forgot password?” link
- Third‑party sign‑in options (e.g., Google)
- Passkey authentication
- Accessibility‑friendly labels and placeholders

The component is intentionally lightweight and can be integrated into any React‑based application.

---

## Props

| Prop | Type | Default | Description |
|------|------|--------|------------|
| `onSubmit` | `(values: { username: string; password: string }) => void` | **Required** | Callback invoked when the form is submitted. |
| `onForgotPassword` | `() => void` | `undefined` | Callback invoked when the “Forgot password?” link is clicked. |
| `onGoogleSignIn` | `() => void` | `undefined` | Callback invoked when the Google sign‑in button is clicked. |
| `onPasskeySignIn` | `() => void` | `undefined` | Callback invoked when the passkey button is clicked. |
| `submitButtonText` | `string` | `"Sign in"` | Text displayed on the submit button. |
| `googleButtonText` | `string` | `"Continue with Google"` | Text displayed on the Google button. |
| `passkeyButtonText` | `string` | `"Sign in with Passkey"` | Text displayed on the passkey button. |
| `className` | `string` | `""` | Optional CSS class for the root element. |

---

## Usage

```tsx
import { LoginForm } from "./LoginForm";

function App() {
  const handleLogin = ({ username, password }) => {
    // Perform authentication
    console.log("Logging in:", username, password);
  };

  const handleForgotPassword = () => {
    // Redirect to password reset page
    console.log("Forgot password clicked");
  };

  const handleGoogleSignIn = () => {
    // Trigger Google OAuth flow
    console.log("Google sign‑in clicked");
  };

  const handlePasskeySignIn = () => {
    // Trigger WebAuthn passkey flow
    console.log("Passkey sign‑in clicked");
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      onForgotPassword={handleForgotPassword}
      onGoogleSignIn={handleGoogleSignIn}
      onPasskeySignIn={handlePasskeySignIn}
      submitButtonText="Sign in"
      googleButtonText="Continue with Google"
      passkeyButtonText="Sign in with Passkey"
    />
  );
}
```

---

## Component Structure

```html
<form>
  <label for="username">Username or email address</label>
  <input id="username" type="text" placeholder="Username or email address" />

  <label for="password">Password</label>
  <input id="password" type="password" placeholder="Password" />

  <button type="submit">Sign in</button>

  <a href="#" onClick={onForgotPassword}>Forgot password?</a>

  <button type="button" onClick={onGoogleSignIn}>Continue with Google</button>

  <button type="button" onClick={onPasskeySignIn}>Sign in with Passkey</button>
</form>
```

---

## Accessibility Notes

- All form controls have associated `<label>` elements.
- The “Forgot password?” link is keyboard‑accessible.
- Buttons use semantic `<button>` elements for proper focus handling.

---

## Sanitization

All user‑visible strings are hard‑coded or passed via props, ensuring no injection of malicious content. The component does **not** render any raw HTML from external sources.

---

## Extending the Component

If you need additional authentication methods (e.g., Apple, Microsoft), simply add new props and corresponding buttons following the same pattern.

---