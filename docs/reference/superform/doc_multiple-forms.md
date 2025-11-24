# Multiple Forms on the Same Page

Since there is only one `$page` store per route, multiple forms on the same page (e.g., a login and registration form) can interfere with each other. Superforms handles this automatically when using `use:enhance` and different schema types. For identical schemas, use the `id` option to distinguish forms.

---

## Key Concepts

### Different Schema Types

- **Automatic Handling**: Forms with distinct field structures are managed without extra configuration.
- **Same Schema Issue**: Copying a schema and reusing it (even with a new name) requires an `id` to avoid conflicts.

### ID Configuration

- **Server-Side**: Specify `id` when initializing forms:
  ```typescript
  const loginForm = await superValidate(zod(loginSchema), { id: 'login' });
  const registerForm = await superValidate(zod(registerSchema), { id: 'register' });
  ```

---

## Example: Login and Registration Forms

### Server (`+page.server.ts`)

```typescript
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
});

export const load = async () => ({
  loginForm: await superValidate(zod(loginSchema)),
  registerForm: await superValidate(zod(registerSchema))
});

export const actions = {
  login: async ({ request }) => {
    const form = await superValidate(request, zod(loginSchema));
    if (!form.valid) return fail(400, { form });
    return message(form, 'Login successful!');
  },
  register: async ({ request }) => {
    const form = await superValidate(request, zod(registerSchema);
    if (!form.valid) return fail(400, { form };
    return message(form, 'Registration successful!');
  }
};
```

### Client (`+page.svelte`)

```svelte
<script>
	import { superForm } from 'sveltekit-superforms/client';

	let { data } = $props();

	const {
		form: loginForm,
		errors: loginErrors,
		enhance: loginEnhance,
		message: loginMessage
	} = superForm(data.loginForm, { resetForm: true });
	const {
		form: registerForm,
		errors: registerErrors,
		enhance: registerEnhance,
		message: registerMessage
	} = superForm(data.registerForm, { resetForm: true });
</script>

{#if $loginMessage}
	<h3>{$loginMessage}</h3>
{/if}

<form method="POST" action="?/login" use:loginEnhance>
	<!-- Login fields -->
</form>

{#if $registerMessage}
	<h3>{$registerMessage}</h3>
{/if}

<form method="POST" action="?/register" use:registerEnhance>
	<!-- Registration fields -->
</form>
```

---

## Advanced Usage

### Setting IDs on the Client

- **Automatic ID Handling**: The `id` is inferred from the initial form data.
- **Custom ID**:
  ```typescript
  const { form, enhance } = superForm(data.form, { id: 'custom-id' });
  ```

### Without `use:enhance`

Include a hidden `__superform_id` field:

```svelte
<form method="POST" action="?/action">
	<input type="hidden" name="__superform_id" value={$formId} />
</form>
```

---

## Hidden Forms for Dynamic Scenarios

Example: Username availability check:

```typescript
// Client-side setup
const { submitting, submit, formId } = superForm(
	{ username: '' },
	{
		invalidateAll: false,
		applyAction: false,
		onSubmit({ formData }) {
			formData.set('username', $form.username);
		},
		onUpdated({ form }) {
			$errors.username = form.errors.username;
		}
	}
);

// Form action
export const actions = {
	check: async ({ request }) => {
		const form = await superValidate(request, usernameSchema);
		// Validation logic
		return { form };
	}
};
```

---

## Configuration Tips

- **Prevent Unwanted Resets**: Use `invalidateAll: false` or `applyAction: false` to retain form state.
- **Multi-Step Forms**: Return multiple forms in an action response, e.g., `return { loginForm, registerForm }`.

---

## Troubleshooting

- **Data Loss**: If one form resets another, check `invalidateAll` and `applyAction` settings.
- **Schema Conflicts**: Ensure schemas differ in fields or types to avoid collisions.

---

## Testing

Use SuperDebug to inspect form states and network requests. Test scenarios like:

- Submitting one form without affecting the other.
- Validating dynamic fields (e.g., username checks).

---

### Example Test Scenario

```svelte
<!-- Example UI for testing -->
<form action="?/login" use:enhance>
	<!-- Login fields -->
</form>

<form action="?/register" use:enhance>
	<!-- Registration fields -->
</form>
```

---

### Notes

- **Hidden Forms**: Use `__superform_id` for non-enhanced forms.
- **Dynamic IDs**: For tables with editable rows, set `id` to a row identifier (e.g., `id: 'row-123'`).

---

### FAQ

**Q: Why does my form reset when another form is submitted?**  
A: Adjust `invalidateAll` or `applyAction` in `superForm` options to prevent unintended updates.

**Q: Can I reuse the same schema for multiple forms?**  
A: No. Schemas must differ in fields or types. Use `id` to distinguish identical schemas.

---

This documentation ensures forms are isolated, validated, and updated correctly, even when sharing the same route.
