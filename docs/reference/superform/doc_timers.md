# Loading Timers

Provide user feedback during form submission delays by utilizing loading timers to display progress indicators.

---

## Usage

Initialize loading timers with `superForm` options:

```svelte
<script lang="ts">
	const { form, enhance, submitting, delayed, timeout } = superForm(data.form, {
		delayMs: 500, // Minimum delay before showing loading indicator (default: 500ms)
		timeoutMs: 8000 // Maximum timeout before showing error (default: 8000ms)
	});
</script>
```

**Parameters:**

- `delayMs`: Minimum time (ms) before showing a loading indicator (must be ≥ 0 and ≤ `timeoutMs`).
- `timeoutMs`: Maximum time (ms) to wait before considering the submission timed out (must be ≥ `delayMs`).

⚠️ **Note:**

- `use:enhance` must be added to the form element for client-side behavior.
- Ensure `delayMs ≤ timeoutMs` to avoid undefined behavior.

---

## Submit State

The submission process transitions through these states over time:

```
Idle → submitting → delayed → timeout
       0 ms         500 ms    8000 ms
```

**Stores:**

- `$submitting`: `true` from submission start until server response.
- `$delayed`: `true` after `delayMs` (e.g., 500ms).
- `$timeout`: `true` after `timeoutMs` (e.g., 8000ms).

States are **not mutually exclusive**. For example, `submitting` remains `true` even after `delayed` or `timeout` are triggered.

---

## Loading Indicators

Display a loading spinner after the `delayMs` threshold:

```svelte
<script>
	import spinner from '$lib/assets/spinner.svg';
	const { form, delayed } = superForm(data.form);
</script>

<form method="POST" use:enhance>
	<button>Submit</button>
	{#if $delayed}
		<img src={spinner} alt="Loading..." />
	{/if}
</form>
```

**Why `delayed` instead of `submitting`?**  
Based on [Nielsen's 3 response-time limits](https://www.nngroup.com/articles/response-times-3-important-limits/), immediate feedback isn't needed for delays under 0.5 seconds. The `delayed` state triggers feedback after the `delayMs` threshold.

---

## Example: Visualizing Timers

This example demonstrates adjustable timer behavior:

```svelte
<script>
	const { form, timeout, enhance } = superForm(data.form, {
		delayMs: 500,
		timeoutMs: 2000 // Shortened for demonstration
	});
</script>

<form method="POST" use:enhance>
	<button>Submit</button>
	{#if $delayed}
		<div>Delayed spinner 🔄</div>
	{/if}
	{#if $timeout}
		<div>Timeout error ⚠️</div>
	{/if}
</form>
```

**Scenario:**

- **Server response delay:** 4000ms (simulated)
- **delayMs:** 500ms (spinner appears after 0.5s)
- **timeoutMs:** 2000ms (timeout error shows after 2s)

**Behavior:**

- The form will show a "timeout error" at 2000ms even though the server responds at 4000ms. Adjust `timeoutMs` to match expected server response times.

---

## Best Practices

1. **Avoid premature feedback:** Use `delayed` for spinners and `timeout` for errors.
2. **Tune thresholds:** Align `timeoutMs` with realistic server response times.
3. **Prevent multiple submissions:** The default `multipleSubmits` option prevents repeated submissions until the timeout state is reached.

---

## API Reference

| Store         | Description                                             |
| ------------- | ------------------------------------------------------- |
| `$submitting` | `true` from submission start until server response.     |
| `$delayed`    | `true` after `delayMs` has passed.                      |
| `$timeout`    | `true` after `timeoutMs` has passed without a response. |

---

### Example Configuration

```svelte
<script>
	// Custom timer values
	const { form, delayed, timeout } = superForm(data.form, {
		delayMs: 300, // Show spinner after 0.3 seconds
		timeoutMs: 10000 // Allow up to 10 seconds before timeout
	});
</script>
```

---

### Migration Notes (v2 → v1)

- In v1, timers were part of the `superForm` return object. In v2, they are explicit stores (`submitting`, `delayed`, `timeout`).

---

### Related Concepts

- [Client Validation](client-validation.md)
- [Error Handling](error-handling.md)

---

This documentation ensures developers can implement responsive loading feedback while maintaining user experience best practices.
