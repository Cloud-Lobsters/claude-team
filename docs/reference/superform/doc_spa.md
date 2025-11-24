# Single-Page Applications (SPA) with Superforms

Superforms can be fully utilized in client-side Single-Page Applications (SPAs) or when interacting with external APIs instead of SvelteKit form actions. This guide explains how to configure and use Superforms in such scenarios.

---

## Usage

To enable SPA mode, initialize the form with `SPA: true` and provide client-side validators. The form submission will be handled client-side, and the `onUpdate` event can trigger API calls or custom logic.

### Key Setup

```typescript
import { superForm } from 'sveltekit-superforms';

const { form, errors, enhance } = superForm(initialData, {
  SPA: true,
  validators: /* Your validation adapter */,
  onUpdate({ form }) {
    // Validate or submit form data here
  }
});
```

---

## Loading Data with `+page.ts`

When using SPAs, use `+page.ts` to fetch initial data instead of `+page.server.ts`.

### Example: Loading User Data

**src/routes/user/[id]/+page.ts**

```typescript
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define your Zod schema
const _userSchema = z.object({
	id: z.number().int().positive(),
	name: z.string().min(2),
	email: z.string().email()
});

export const load = async ({ params, fetch }) => {
	const id = parseInt(params.id);
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

	if (response.status >= 400) throw error(response.status);

	const userData = await response.json();
	const form = await superValidate(userData, zod(_userSchema));

	return { form };
};
```

---

## Displaying the Form in `+page.svelte`

Bind the form to the component and handle submission via `onUpdate`.

### Example: Form Component

```svelte
<script lang="ts">
	import { superForm, setMessage, setError } from 'sveltekit-superforms';
	import { _userSchema } from './+page.js';
	import { zod } from 'sveltekit-superforms/adapters';

	let { data } = $$props;

	const { form, errors$, message, constraints, enhance } = superForm(data.form, {
		SPA: true,
		validators: zod(_userSchema),
		onUpdate({ form }) {
			if (form.data.email.includes('spam')) {
				setError(form, 'email', 'Suspicious email address.');
			} else if (form.valid) {
				// Example: Call an external API
				setMessage(form, 'Valid data!');
				// Replace with your API call logic
			}
		}
	});
</script>

<h1>Edit User</h1>

{#if $message}
	<h3>{$message}</h3>
{/if}

<form method="POST" use:enhance>
	<label>
		Name<br />
		<input
			aria-invalid={$errors.name ? 'true' : undefined}
			bind:value={$form.name}
			{...$constraints.name}
		/>
	</label>
	{#if $errors.name}
		<span class="invalid">{$errors.name}</span>
	{/if}

	<!-- Email field -->
	<label>
		Email<br />
		<input
			type="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	{#if $errors.email}
		<span class="invalid">{$errors.email}</span>
	{/if}

	<button>Submit</button>
</form>
```

---

## Without a `+page.ts` File

If no server-side data is needed, use `defaults()` to initialize the form with schema defaults.

### Example: Initializing Without Server Load

```svelte
<script lang="ts">
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas';

	const { form, errors, enhance } = superForm(
		defaults(zod(loginSchema)), // Initialize with schema defaults
		{
			SPA: true,
			validators: zod(loginSchema),
			onUpdate({ form }) {
				if (form.valid) {
					// Example: Submit to an external API
					console.log('Submitting:', form.data);
				}
			}
		}
	);
</script>
```

---

## Handling Initial Data in the Component

To initialize with local data and validate it, use `defaults()` with initial values and call `validateForm()`.

### Example: Initial Data with Validation

```typescript
const initialData = { name: 'New User' };

const { form, errors, validateForm } = superForm(
	defaults(initialData, zod(loginSchema)), // Merge initial data with schema defaults
	{
		SPA: true,
		validators: zod(loginSchema)
		// ... other options
	}
);

// Validate immediately to show errors
validateForm({ update: true });
```

---

### Important Notes:

1. **Client-Side Validation Limitations**: Client-side validation is for convenience only. Always validate on the server.
2. **`use:enhance` Requirement**: The `use:enhance` directive must be added to the `<form>` element for SPA mode to work.
3. **Validation Logic**: Use `onUpdate` to handle form submission logic (e.g., API calls).

---

### Example: Custom Validation in `onUpdate`

```typescript
onUpdate({ form }) {
  // Custom validation logic
  if (form.data.email.includes('spam')) {
    setError(form, 'email', 'Suspicious email address.');
  } else if (form.valid) {
    // Submit to an external API
    fetch('/api/submit', { method: 'POST', body: JSON.stringify(form.data) })
      .then(() => setMessage(form, 'Success!'))
      .catch(() => setError(form, 'general', 'Submission failed.'));
  }
}
```

---

### When to Use This Approach:

- When building SPAs with SvelteKit.
- When interacting with external APIs instead of SvelteKit form actions.
- For client-side form validation and real-time feedback without server round-trips.

Always pair client-side validation with server-side validation for security.
