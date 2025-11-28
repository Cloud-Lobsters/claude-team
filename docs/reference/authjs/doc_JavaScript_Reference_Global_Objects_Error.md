# JavaScript Error Objects

> **Error** objects represent runtime errors that occur during script execution.  
> They are serializable, can be cloned with `structuredClone()` or transferred between workers with `postMessage()`, and are thrown with the `throw` keyword.

---

## 1. Overview

| Feature | Description |
|---------|-------------|
| **Runtime errors** | New `Error` objects are created and thrown when a runtime error occurs. |
| **Serializable** | `Error` instances can be cloned or transferred between contexts. |
| **Subclassable** | Custom error types can be created by extending `Error`. |
| **Cause chaining** | The `cause` option allows linking an error to its underlying cause. |

---

## 2. Constructor

```js
new Error([message[, options]])
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | `string` | Human‑readable description of the error. |
| `options` | `Object` | Optional. May contain a `cause` property that references the underlying error. |

> **Note**: The `cause` property is part of the ECMAScript 2022 specification.

---

## 3. Static Properties

| Property | Type | Notes |
|----------|------|-------|
| `Error.stackTraceLimit` | `number` | **Non‑standard**. Limits the number of stack frames in `error.stack`. |

---

## 4. Static Methods

| Method | Signature | Notes |
|--------|-----------|-------|
| `Error.captureStackTrace(targetObject[, constructorOpt])` | `void` | **Non‑standard**. Creates a `stack` property on `targetObject`. |
| `Error.isError(value)` | `boolean` | Returns `true` if `value` is an `Error` instance. |
| `Error.prepareStackTrace(error, structuredStackTrace)` | `string` | **Non‑standard**. Optional callback to format stack traces. |

---

## 5. Instance Properties

| Property | Type | Notes |
|----------|------|-------|
| `name` | `string` | Name of the error type (e.g., `"Error"`, `"TypeError"`). |
| `message` | `string` | Human‑readable error message. |
| `stack` | `string` | **Non‑standard**. Stack trace. |
| `cause` | `Error` | The underlying error passed via the `cause` option. |
| `fileName` | `string` | **Non‑standard**. File that raised the error. |
| `lineNumber` | `number` | **Non‑standard**. Line number of the error. |
| `columnNumber` | `number` | **Non‑standard**.