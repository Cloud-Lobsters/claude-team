# Auth.js – Error Reference

This document lists all built‑in error classes that Auth.js can throw.  
Each entry contains:

* **Description** – what the error represents  
* **Inheritance** – the parent class  
* **Properties** – public fields that can be inspected  
* **Examples** – real‑world log snippets that Auth.js emits

> **Tip** – All examples are taken verbatim from the Auth.js logs.  
> They are useful for debugging and for writing custom error handlers.

---

## Table of Contents

| Error | Extends | Properties | Example |
|-------|---------|------------|---------|
| [AccessDenied](#accessdenied) | `AuthError` | `type` | – |
| [AccountNotLinked](#accountnotlinked) | `SignInError` | `type` | – |
| [AdapterError](#adaptererror) | `AuthError` | `type` | – |
| [AuthError](#autherror) | `Error` | `type`, `cause?`, `err?` | – |
| [CallbackRouteError](#callbackrouteerror) | `AuthError` | `type` | – |
| [CredentialsSignin](#credentialssignin) | `SignInError` | `type`, `code` | – |
| [DuplicateConditionalUI](#duplicateconditionalui) | `AuthError` | `type` | – |
| [EmailSignInError](#emailsigninerror) | `SignInError` | `type` | – |
| [ErrorPageLoop](#errorpageloop) | `AuthError` | `type` | – |
| [EventError](#eventerror) | `AuthError` | `type` | – |
| [ExperimentalFeatureNotEnabled](#experimentalfeaturenotenabled) | `AuthError` | `type` | – |
| [InvalidCallbackUrl](#invalidcallbackurl) | `AuthError` | `type` | – |
| [InvalidCheck](#invalidcheck) | `AuthError` | `type` | – |
| [InvalidEndpoints](#invalidendpoints) | `AuthError` | `type` | – |
| [InvalidProvider](#invalidprovider) | `AuthError` | `type` | – |
| [JWTSessionError](#jwtsessionerror) | `AuthError` | `type` | – |
| [MissingAdapter](#missingadapter) | `AuthError` | `type` | – |
| [MissingAdapterMethods](#missingadaptermethods) | `AuthError` | `type` | – |
| [MissingAuthorize](#missingauthorize) | `AuthError` | `type` | – |
| [MissingCSRF](#missingcsrf) | `SignInError` | `type` | – |
| [MissingSecret](#missingsecret) | `AuthError` | `type` | – |
| [MissingWebAuthnAutocomplete](#missingwebauthnanautocomplete) | `AuthError` | `type` | – |
| [OAuthAccountNotLinked](#oauthaccountnotlinked) | `SignInError` | `type` | – |
| [OAuthCallbackError](#oauthcallbackerror) | `SignInError` | `type` | – |
| [OAuthProfileParseError](#oauthprofileparseerror) | `AuthError` | `type` | – |
| [OAuthSignInError](#oauthsigninerror) | `SignInError` | `type` | – |
| [SessionTokenError](#sessiontokenerror) | `AuthError` | `type` | – |
| [SignInError](#signinerror) | `AuthError` | `type` | – |
| [SignOutError](#signouterror) | `AuthError` | `type` | – |
| [UnknownAction](#unknownaction) | `AuthError` | `type` | – |
| [UnsupportedStrategy](#unsupportedstrategy) | `AuthError` | `type` | – |
| [UntrustedHost](#untrustedhost) | `AuthError` | `type` | – |
| [Verification](#verification) | `AuthError` | `type` | – |
| [WebAuthnVerificationError](#webauthnverificationerror) | `AuthError` | `type` | – |

---

## Error Details

### AccessDenied

Thrown when the execution of the `signIn` callback fails or if it returns `false`.

```ts
class AccessDenied extends AuthError {
  static type = "AccessDenied";
}
```

---

### AccountNotLinked

Thrown when an email address is already associated with an account but the user is trying an account that is not linked to it.  
For security reasons, Auth.js does not automatically link accounts to existing accounts if the user is not signed in.

```ts
class AccountNotLinked extends SignInError {
  static type = "AccountNotLinked";
}
```

---

### AdapterError

One of the database Adapter methods failed during execution.

> **Debug log**  
> ```log
> [auth][debug]: adapter_getUserByEmail
> { "args": [undefined] }
> ```

```ts
class AdapterError extends AuthError {
  static type = "AdapterError";
}
```

---

### AuthError

Base error class for all Auth.js errors. It’s optimized to be printed in the server logs in a nicely formatted way via the `logger.error` option.

```ts
class AuthError extends Error {
  type: ErrorType;
  cause?: Record<string, unknown> & { err: Error };
  err?: Error;
}
```

---

### CallbackRouteError

This error occurs when the user cannot finish login. Depending on the provider type, this could have happened for multiple reasons.

> **Details log**  
> ```log
> [auth][details]: { "provider": "github" }
> ```

> **Cause log**  
> ```log
> [auth][cause]: <original stack trace>
> ```

```ts
class CallbackRouteError extends AuthError {
  static type = "CallbackRouteError";
}
```

---

### CredentialsSignin

Can be thrown from the `authorize` callback of the Credentials provider.  
When an error occurs during the authorize callback, two things can happen:

1. The user is redirected to the signin page, with `error=CredentialsSignin&code=credentials` in the URL.  
2. If you throw this error in a framework that handles form actions server‑side, this error is thrown instead of redirecting the user.

```ts
class CredentialsSignin extends SignInError {
  static type = "CredentialsSignin";
  code: string = "credentials";
}
```

> **Note** – The `code` property is included in the URL, so avoid leaking sensitive information.

---

### DuplicateConditionalUI

Thrown when multiple providers have `enableConditionalUI` set to true. Only one provider can have this option enabled at a time.

```ts
class DuplicateConditionalUI extends AuthError {
  static type = "DuplicateConditionalUI";
}
```

---

### EmailSignInError

Happens when login by an Email provider could not be started.

Possible causes:

* The email sent from the client is invalid, could not be normalized by `EmailConfig.normalizeIdentifier`
* The provided email/token combination has expired
* There was an error with the database

```ts
class EmailSignInError extends SignInError {
  static type = "EmailSignInError";
}
```

---

### ErrorPageLoop

Thrown when Auth.js is misconfigured and accidentally tried to require authentication on a custom error page.  
To prevent an infinite loop, Auth.js will instead render its default error page.

```ts
class ErrorPageLoop extends AuthError {
  static type = "ErrorPageLoop";
}
```

---

### EventError

One of the events methods failed during execution.  
Make sure that the events methods are implemented correctly and uncaught errors are handled.

```ts
class EventError extends AuthError {
  static type = "EventError";
}
```

---

### ExperimentalFeatureNotEnabled

Thrown when an experimental feature is used but not enabled.

```ts
class ExperimentalFeatureNotEnabled extends AuthError {
  static type = "ExperimentalFeatureNotEnabled";
}
```

---

### InvalidCallbackUrl

Thrown when Auth.js is unable to verify a `callbackUrl` value.  
The browser either disabled cookies or the `callbackUrl` is not a valid URL.

```ts
class InvalidCallbackUrl extends AuthError {
  static type = "InvalidCallbackUrl";
}
```

---

### InvalidCheck

Thrown when a PKCE, state or nonce OAuth check could not be performed.  
This could happen if the OAuth provider is configured incorrectly or if the browser is blocking cookies.

```ts
class InvalidCheck extends AuthError {
  static type = "InvalidCheck";
}
```

---

### InvalidEndpoints

One of the configured OAuth or OIDC providers is missing the authorization, token or userinfo, or issuer configuration.

```ts
class InvalidEndpoints extends AuthError {
  static type = "InvalidEndpoints";
}
```

---

### InvalidProvider

Thrown when an endpoint was incorrectly called without a provider, or with an unsupported provider.

```ts
class InvalidProvider extends AuthError {
  static type = "InvalidProvider";
}
```

---

### JWTSessionError

Logged on the server when Auth.js could not decode or encode a JWT‑based (strategy: `"jwt"`) session.

Possible causes are either a misconfigured secret or a malformed JWT or encode/decode methods.

```ts
class JWTSessionError extends AuthError {
  static type = "JWTSessionError";
}
```

---

### MissingAdapter

Thrown if Auth.js is misconfigured.  
This could happen if you configured an Email provider but did not set up a database adapter, or tried using a strategy: `"database"` session without a database adapter.

```ts
class MissingAdapter extends AuthError {
  static type = "MissingAdapter";
}
```

---

### MissingAdapterMethods

Thrown similarly to `MissingAdapter`, but only some required methods were missing.

```ts
class MissingAdapterMethods extends AuthError {
  static type = "MissingAdapterMethods";
}
```

---

### MissingAuthorize

Thrown when a Credentials provider is missing the `authorize` configuration.  
To perform credentials sign in, the `authorize` method is required.

```ts
class MissingAuthorize extends AuthError {
  static type = "MissingAuthorize";
}
```

---

### MissingCSRF

Error for missing CSRF tokens in client‑side actions (`signIn`, `signOut`, `useSession#update`).  
Thrown when actions lack the double submit cookie, essential for CSRF protection.

```ts
class MissingCSRF extends SignInError {
  static type = "MissingCSRF";
}
```

---

### MissingSecret

Auth.js requires a secret or multiple secrets to be set, but none was found.  
If you are using a framework like Next.js, we try to automatically infer the secret from the `AUTH_SECRET`, `AUTH_SECRET_1`, etc. environment variables.  
Alternatively, you can also explicitly set the `AuthConfig.secret` option.

```ts
class MissingSecret extends AuthError {
  static type = "MissingSecret";
}
```

---

### MissingWebAuthnAutocomplete

Thrown when a WebAuthn provider has `enableConditionalUI` set to true but no formField has `webauthn` in its `autocomplete` param.  
The webauthn autocomplete param is required for conditional UI to work.

```ts
class MissingWebAuthnAutocomplete extends AuthError {
  static type = "MissingWebAuthnAutocomplete";
}
```

---

### OAuthAccountNotLinked

Thrown when an Email address is already associated with an account but the user is trying an OAuth account that is not linked to it.

```ts
class OAuthAccountNotLinked extends SignInError {
  static type = "OAuthAccountNotLinked";
}
```

---

### OAuthCallbackError

Thrown when an OAuth provider returns an error during the sign in process.  
This could happen for example if the user denied access to the application or there was a configuration error.

```ts
class OAuthCallbackError extends SignInError {
  static type = "OAuthCallbackError";
}
```

---

### OAuthProfileParseError

This error occurs during an OAuth sign in attempt when the provider’s response could not be parsed.

```ts
class OAuthProfileParseError extends AuthError {
  static type = "OAuthProfileParseError";
}
```

---

### OAuthSignInError

Happens when login by OAuth could not be started.

Possible causes:

* The Authorization Server is not compliant with the OAuth 2.0 or the OIDC specification.

> **Details log**  
> ```log
> [auth][details]: { "provider": "github" }
> ```

```ts
class OAuthSignInError extends SignInError {
  static type = "OAuthSignInError";
}
```

---

### SessionTokenError

Logged on the server when Auth.js could not retrieve a session from the database (strategy: `"database"`).  
The database adapter might be misconfigured or the database is not reachable.

```ts
class SessionTokenError extends AuthError {
  static type = "SessionTokenError";
}
```

---

### SignInError

Thrown when the user’s sign‑in attempt failed.

```ts
class SignInError extends AuthError {
  type: ErrorType;
}
```

---

### SignOutError

Represents an error that occurs during the sign‑out process.  
This error is logged when there are issues in terminating a user’s session, either by failing to delete the session from the database (in database session strategies) or encountering issues during other parts of the sign‑out process, such as emitting sign‑out events or clearing session cookies.

```ts
class SignOutError extends AuthError {
  static type = "SignOutError";
}
```

---

### UnknownAction

Auth.js was requested to handle an operation that it does not support.

```ts
class UnknownAction extends AuthError {
  static type = "UnknownAction";
}
```

---

### UnsupportedStrategy

Thrown when a Credentials provider is present but the JWT strategy (`strategy: "jwt"`) is not enabled.

```ts
class UnsupportedStrategy extends AuthError {
  static type = "UnsupportedStrategy";
}
```

---

### UntrustedHost

Thrown when the `trustHost` option was not set to `true`.  
Auth.js requires the `trustHost` option to be set to `true` since it’s relying on the request headers’ host value.

```ts
class UntrustedHost extends AuthError {
  static type = "UntrustedHost";
}
```

---

### Verification

The user’s email/token combination was invalid.  
This could be because the email/token combination was not found in the database, or because the token has expired.

```ts
class Verification extends AuthError {
  static type = "Verification";
}
```

---

### WebAuthnVerificationError

Thrown when a WebAuthn provider fails to verify a client response.

```ts
class WebAuthnVerificationError extends AuthError {
  static type = "WebAuthnVerificationError";
}
```

---

## Using the Errors

```ts
import { AuthError, SignInError } from "@auth/core/errors";

try {
  await signIn("github");
} catch (err) {
  if (err instanceof SignInError) {
    // Handle sign‑in failures
  } else if (err instanceof AuthError) {
    // Handle generic Auth.js errors
  } else {
    // Unknown error
  }
}
```

> **Tip** – Inspect `err.type` to quickly determine the error category.

---

## Summary

Auth.js provides a rich set of error classes that cover every failure point in the authentication flow.  
By catching these errors and inspecting their `type` and optional `cause`/`err` properties, you can build robust error handling and logging for your application.