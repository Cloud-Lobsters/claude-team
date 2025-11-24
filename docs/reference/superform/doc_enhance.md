````markdown
# use:enhance

The `use:enhance` action provided by Superforms enables client-side form enhancements such as auto-focus, loading indicators, and form state persistence. It must be used on a `<form>` element to activate these features.

---

## Basic Usage

```svelte
<script lang="ts">
	const { form, enhance } = superForm(data.form);
</script>

<form method="POST" use:enhance>
	<!-- Form fields here -->
</form>
```
````

### Requirements:

- **JavaScript must be enabled** for client-side features (auto-focus, loading timers, etc.).
- **Cannot use SvelteKit's built-in `use:enhance`**—only the one returned by `superForm` is supported.
- Only one `use:enhance` should be applied per form to avoid conflicts.

---

## Modifying `use:enhance` Behavior

The default behavior can be adjusted via options passed to `superForm`:

```typescript
const { form, enhance, reset } = superForm(data.form, {
	applyAction: true,
	invalidateAll: true,
	resetForm: true,
	onError: 'apply' // Optional
});
```

### Configuration Options

#### `applyAction` (default: `true`)

- **Purpose**: Controls whether the form reacts to `$page.form` and `$page.status` changes.
- **When to disable**: Useful when avoiding conflicts with external state updates (e.g., Supabase events).
- **Default Behavior**: Automatically updates form state and redirects as per SvelteKit conventions.

#### `invalidateAll` (default: `true`)

- **Purpose**: Controls whether the page’s `load` functions re-run after a successful form submission.
- **Options**:
  - `true`: Prioritizes form data returned from the server (optimistic updates).
  - `'force'`: Prioritizes data from `load` functions, preventing form data from overriding it.

#### **Optimistic Updates**

- **Default (`invalidateAll: true`)**: The form displays the server’s updated data immediately, assuming success.
- **Conflict Resolution**: Use `invalidateAll: 'force'` to ensure the `load` function’s data takes precedence, useful for partial updates.

#### `resetForm` (default: `true`)

- **Purpose**: Resets the form to its initial state after a successful submission.
- **Note**: When using `bind:value` on inputs, a standard HTML form reset won’t work. Superforms resets the form’s internal state instead.

---

## Handling Errors Like SvelteKit Defaults

By default, Superforms prevents data loss by converting `ActionResult` errors into form failures. To revert to SvelteKit’s default error handling (rendering `+error.svelte`), use:

```typescript
const { form, enhance } = superForm(data.form, {
	onError: 'apply' // Triggers SvelteKit’s error page
});
```

⚠️ **Warning**: This can cause data loss if the user’s input is erased by the error page.

---

## When to Adjust Defaults

- **Single Form**: Defaults work well out of the box.
- **Multiple Forms**: Experiment with `invalidateAll: 'force'` and adjust `resetForm` to avoid conflicts.
- **External State Updates**: Disable `applyAction` if using external state management (e.g., Supabase).

---

## Key Notes

- **Client-Side Features**: Auto-focus, loading timers, and events require `use:enhance`.
- **Server-Side Fallback**: Without JavaScript, only HTML5 validation constraints work.
- **Resetting Forms**: Use the `reset` function for programmatic resets when `resetForm` is disabled.

For advanced scenarios, see the [Events](#events) and [Multiple Forms](#multiple-forms) guides.

```

This structure organizes the content into clear sections with code examples, configuration options, and warnings. It maintains all original examples and explanations while using markdown formatting for readability.
```
