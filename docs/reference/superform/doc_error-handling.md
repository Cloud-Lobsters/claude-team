````markdown
# Superforms Error Handling Documentation

## Error Handling Basics

Errors from Superforms are exposed via the `$errors` store. Example usage:

```svelte
<script lang="ts">
	const { form, errors } = superForm(data.form);
</script>

<form method="POST">
	<label for="name">Name</label>
	<input name="name" aria-invalid={$errors.name ? 'true' : undefined} bind:value={$form.name} />
	{#if $errors.name}
		<span class="invalid">{$errors.name}</span>
	{/if}
	<div><button>Submit</button></div>
</form>
```
````

---

## `setError` Function

Adds errors post-validation. Example in SvelteKit action:

```typescript
import { setError } from 'sveltekit-superforms';

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		if (form.data.emailExists) {
			return setError(form, 'email', 'Email already exists');
		}
		return { form };
	}
};
```

---

## Server Errors Handling

Superforms normalizes server errors. Use `onError` event for custom handling. Example error types:

| Error Type     | Example                                         |
| -------------- | ----------------------------------------------- |
| Expected error | `error(404, { code: 'user_not_found' })`        |
| Exception      | `throw new Error("Database error")`             |
| JSON response  | `return json({ status: 429 }, { status: 429 })` |

---

## Initial Form Errors

Control initial error display with the `errors` option:

```typescript
// Hide errors on empty form
const form = await superValidate(zod(schema));

// Force validation on load
const form2 = await superValidate(zod(schema), { errors: true });
```

---

## Client-Side Usage Options

Configure error behavior via `superForm` options:

```typescript
const { form, enhance } = superForm(data.form, {
	errorSelector: '[aria-invalid="true"]',
	scrollToError: 'smooth',
	autoFocusOnError: 'detect',
	stickyNavbar: '#nav',
	customValidity: true
});
```

### Options Details:

- **errorSelector**: CSS selector for error fields (default: `[aria-invalid="true"],[data-invalid]`)
- **scrollToError**: Scroll behavior (`smooth`, `auto`, or `off`)
- **autoFocusOnError**: Auto-focus behavior (default: detects mobile)
- **stickyNavbar**: Selector for sticky elements to avoid overlap
- **customValidity**: Enables browser validation tooltips

---

## Custom Validity Mode

Enables browser validation tooltips:

```svelte
{#if $errors}
	<div>Errors exist</div>
{/if}

<form use:enhance>
	<input name="name" aria-invalid={$errors.name ? 'true' : undefined} />
</form>
```

---

## Form-Level & Array Errors

Access form-level errors via `$errors._errors` and array errors via `$errors.tags._errors`:

```typescript
const schema = z
	.object({
		password: z.string().min(8),
		confirm: z.string().min(8)
	})
	.refine((data) => data.password === data.confirm, {
		message: 'Passwords must match',
		path: ['confirm']
	});
```

---

## Listing All Errors

Display all errors in a list:

```svelte
{#if $allErrors.length}
	<ul>
		{#each $allErrors as error}
			<li>
				<b>{error.path.join('.')}: </b>
				{error.messages.join('. ')}
			</li>
		{/each}
	</ul>
{/if}
```

---

## Custom Error Messages

Define messages directly in the schema:

```typescript
const schema = z.object({
	name: z.string().min(2, 'Name too short'),
	email: z.string().email('Invalid email format')
});
```

---

## Testing the Form

Example form with validation:

```svelte
<form method="POST">
	<input name="name" aria-invalid={$errors.name ? 'true' : undefined} />
	<input name="email" aria-invalid={$errors.email ? 'true' : undefined} />
	<button>Submit</button>
</form>
```

---

## Important Notes

- `setError` errors are transient and cleared on client validation
- Use `fail(400, { form })` when adding errors manually
- `customValidity` requires `use:enhance` and JavaScript enabled
- Mobile devices avoid auto-focus to prevent UI shifts
- Form-level errors require schema refinements

```

This documentation structure maintains all original examples and key information while organizing it into a clear, markdown-based format. Each section includes code examples, configuration options, and usage notes as per the original content.
```
