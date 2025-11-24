````markdown
# Snapshots

A nice SvelteKit feature is snapshots, which saves and restores data when the user navigates on the site. This is perfect for saving the form state, and with Superforms, you can take advantage of this in one line of code, as an alternative to a tainted form message. Note that it only works for browser history navigation.

---

## Usage

To enable snapshot integration with Superforms, use the following code:

```svelte
<script>
	import { superForm } from 'superforms';

	// Initialize the form with superForm
	const { form, capture, restore } = superForm(data.form);

	// Export the snapshot configuration
	export const snapshot = { capture, restore };
</script>
```
````

### Notes:

- The `export const snapshot` must be placed in a `+page.svelte` file. It cannot be used in components.
- The `options` object passed to `superForm` cannot be serialized for snapshots. If you dynamically modify the `options`, create custom `capture`/`restore` methods to handle these changes.
- This feature only works for browser history navigation (back/forward buttons).

---

## Testing the Feature

### Example Form

```svelte
<form method="post">
	<label>
		Name
		<input type="text" name="name" bind:value={form.name} />
	</label>
	<label>
		E-mail
		<input type="email" name="email" bind:value={form.email} />
	</label>
	<button type="submit">Submit</button>
	<button type="reset" onclick={restore}>Reset</button>
</form>
```

### Test Steps:

1. Modify the form fields (e.g., type into "Name" and "E-mail" inputs) without submitting.
2. Navigate to another page (e.g., click "Previous page" or "Next page").
3. Use the browser's back button to return to the form page.
4. The form should restore to its intermediate state.

---

## Notes

- **Limitation**: Only works for browser history navigation (not server-side transitions).
- **Dynamic Options**: If your `superForm` options change dynamically, implement custom `capture`/`restore` logic to persist state correctly.

---

Found a typo or an inconsistency? Make a quick correction here!

```

This structure maintains all original examples and notes while formatting them into a clear, markdown-based documentation format. The code blocks are preserved, and key points are highlighted with bullet points and notes.
```
