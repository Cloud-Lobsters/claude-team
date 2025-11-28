# Auth.js – Sign‑In & Sign‑Out Guide

This document explains how to add sign‑in and sign‑out functionality to your Auth.js application.  
All examples below are ready to copy‑paste into your project.

> **Note**  
> The examples assume you are using the **Next.js** framework (client‑side or server‑side).  
> If you are using another framework (Qwik, SvelteKit, Express, …) the import paths may differ slightly, but the API is the same.

---

## 1. Sign‑In

### 1.1 Basic Sign‑In Button

```tsx
// app/components/auth/signin-button.tsx
import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();          // redirects to the default /signin page
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  );
}
```

* `signIn()` – redirects the user to the configured sign‑in page.  
* If you have a custom sign‑in page, the user will be sent there automatically.  
* After authentication the user is redirected back to the page they started from.

### 1.2 Sign‑In with a Specific Provider

```tsx
// app/components/signin-button.tsx
import { signIn } from "@/auth.ts";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      <button type="submit">Sign in with GitHub</button>
    </form>
  );
}
```

* `signIn("github")` – attempts to log in directly with GitHub.  
* `redirectTo` – optional; after a successful sign‑in the user will be sent to `/dashboard`.

---

## 2. Sign‑Out

### 2.1 Basic Sign‑Out Button

```tsx
// app/components/signout-button.tsx
import { signOut } from "@/auth.ts";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();          // logs the user out of the session
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
```

* `signOut()` – terminates the current session.  
* **Important** – If the user authenticated via an OAuth provider (e.g., GitHub), this will *not* sign them out of that provider’s own session.

---

## 3. Summary

| Action | Function | Notes |
|--------|----------|-------|
| Sign‑in (default) | `signIn()` | Redirects to `/signin` (or custom page). |
| Sign‑in (provider) | `signIn("provider", { redirectTo })` | Directly logs in with the provider; optional redirect. |
| Sign‑out | `signOut()` | Ends the local session; does not affect external OAuth sessions. |

---

### Quick Reference

```tsx
// Sign‑in button
<form action={async () => { "use server"; await signIn(); }}>
  <button type="submit">Sign in</button>
</form>

// Sign‑in with provider
<form action={async () => { "use server"; await signIn("github", { redirectTo: "/dashboard" }); }}>
  <button type="submit">Sign in with GitHub</button>
</form>

// Sign‑out button
<form action={async () => { "use server"; await signOut(); }}>
  <button type="submit">Sign Out</button>
</form>
```

Feel free to adapt the component names, paths, and styling to fit your project’s architecture. Happy coding!