# Submit Behavior

## Overview

When a form is submitted, it’s important to provide feedback that the server is processing the request. Superforms offers configuration options to control form behavior during and after submission, ensuring a smooth user experience with loading timers and submission handling.

---

## Usage

Configure submission behavior using the `superForm` hook with the `clearOnSubmit` and `multipleSubmits` options:

```javascript
const { form, enhance } = superForm(data.form, {
  clearOnSubmit: 'message' | 'errors' | 'errors-and-message' | 'none' = 'message',
  multipleSubmits: 'prevent' | 'allow' | 'abort' = 'prevent'
});
```

---

## `clearOnSubmit`

Controls what is cleared after submission:

### Options

- **`'message'` (default):** Clears the status message.
- **`'errors'`:** Clears all form errors.
- **`'errors-and-message'`:** Clears both errors and messages.
- **`'none'`:** Retains errors and messages (prevents DOM layout shifts).

### Example

```javascript
// Clear only errors after submission
superForm(data.form, { clearOnSubmit: 'errors' });
```

---

## `multipleSubmits`

Manages repeated submissions before a response is received:

### Options

- **`'prevent'` (default):** Disables resubmission until a response or timeout occurs.
- **`'abort'`:** Cancels the ongoing request and sends a new one.
- **`'allow'`:** Permits unlimited submissions (e.g., for real-time forms).

### Example

```javascript
// Allow multiple submissions (use with caution)
superForm(data.form, { multipleSubmits: 'allow' });
```

---

## Key Considerations

- **Loading Timers:** Submissions trigger loading states until a response is received (see [Loading Timers](#loading-timers) for details).
- **DOM Stability:** Use `clearOnSubmit: 'none'` to avoid layout shifts caused by dynamic content removal.

---

## When to Use Each Option

| Scenario                           | Recommended Setting          |
| ---------------------------------- | ---------------------------- |
| Prevent form "double-click" issues | `multipleSubmits: 'prevent'` |
| Real-time form updates             | `multipleSubmits: 'abort'`   |
| Static forms with no dynamic UI    | `clearOnSubmit: 'none'`      |

---

## Default Behavior

- **`clearOnSubmit` defaults to `'message'`**, removing success/error messages after submission.
- **`multipleSubmits defaults to `'prevent'`**, blocking duplicate submissions until the server responds.

For advanced use cases, adjust these options to align with your application’s needs.
