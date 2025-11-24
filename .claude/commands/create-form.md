# Create Form Component

Create a new form component with **SvelteKit Superforms** for type-safe form handling with validation, following the team's form pattern.

## Instructions

First, ask the user for:
1. **Form purpose** (e.g., "Create user", "Edit claim", "Login form")
2. **Form fields** with types (e.g., name: string, email: string, age: number)
3. **Validation rules** (required fields, email format, min/max lengths, custom validations)
4. **Submit action** (what happens on form submit? create record, update record, API call?)
5. **Location** (e.g., `src/routes/dashboard/users/create/+page.svelte`)

Then follow these steps:

---

## Step 1: Read the Form Pattern

Read the **Form Pattern (Superforms)** section from `.claude-team/CLAUDE.md`.

Key principles:
- Define Zod schema for validation
- Server action handles submission
- Client uses `superForm()` for reactivity
- Type-safe throughout

---

## Step 2: Define Zod Validation Schema

Create a Zod schema for your form fields:

```typescript
import { z } from 'zod';

export const {formName}Schema = z.object({
	{fieldName}: z.string().min(1, 'Field is required'),
	email: z.string().email('Invalid email address'),
	age: z.number().min(18, 'Must be at least 18').optional(),
	// Add more fields with validation rules
});

export type {FormName}Schema = typeof {formName}Schema;
```

**Example (User creation form):**
```typescript
import { z } from 'zod';

export const createUserSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	role: z.enum(['admin', 'user', 'viewer']),
	phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional()
});

export type CreateUserSchema = typeof createUserSchema;
```

**Common Zod Validators:**
- `z.string()` - String field
- `z.number()` - Number field
- `z.boolean()` - Boolean/checkbox
- `z.enum(['a', 'b'])` - Select from options
- `z.date()` - Date field
- `.min(n)` - Minimum length/value
- `.max(n)` - Maximum length/value
- `.email()` - Email validation
- `.url()` - URL validation
- `.regex(/pattern/)` - Custom pattern
- `.optional()` - Optional field
- `.nullable()` - Nullable field
- `.refine((val) => condition, 'Error message')` - Custom validation

---

## Step 3: Create Server Action

In `+page.server.ts`, create form action:

```typescript
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { {formName}Schema } from './schema';
import { db } from '$lib/server/db'; // Adjust import

export const load: PageServerLoad = async () => {
	// Initialize form with default values
	const form = await superValidate(zod({formName}Schema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod({formName}Schema));

		// Validate form
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			// TODO: Implement your business logic
			// Example: Create database record
			const result = await db.{tableName}.create({
				data: {
					...form.data
				}
			});

			// Return success
			return { form, success: true };
		} catch (error) {
			console.error('Form submission error:', error);

			// Return error to form
			return fail(500, {
				form,
				error: 'Failed to process form. Please try again.'
			});
		}
	}
};
```

**Example (User creation):**
```typescript
export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(createUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			// Hash password
			const hashedPassword = await bcrypt.hash(form.data.password, 10);

			// Create user
			const user = await db.user.create({
				data: {
					name: form.data.name,
					email: form.data.email,
					password: hashedPassword,
					role: form.data.role,
					phone: form.data.phone
				}
			});

			return {
				form,
				success: true,
				message: 'User created successfully'
			};
		} catch (error) {
			if (error.code === 'P2002') {
				// Unique constraint violation
				return fail(400, {
					form,
					error: 'Email already exists'
				});
			}

			return fail(500, { form, error: 'Failed to create user' });
		}
	}
};
```

---

## Step 4: Create Form Component

In `+page.svelte`, create the form:

```svelte
<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { {formName}Schema } from './schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient({formName}Schema),
		onUpdated: ({ form: f }) => {
			if (f.message) {
				toast.success(f.message);
			}
		},
		onError: ({ result }) => {
			toast.error(result.error?.message || 'An error occurred');
		}
	});

	const { form: formData, enhance, errors, constraints } = form;
</script>

<form method="POST" use:enhance>
	<div class="space-y-4">
		<!-- Text Input Field -->
		<Form.Field {form} name="{fieldName}">
			<Form.Control let:attrs>
				<Form.Label>{Field Label}</Form.Label>
				<Input
					{...attrs}
					type="text"
					bind:value={$formData.{fieldName}}
					{...$constraints.{fieldName}}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Email Field -->
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input
					{...attrs}
					type="email"
					bind:value={$formData.email}
					{...$constraints.email}
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Select Field -->
		<Form.Field {form} name="role">
			<Form.Control let:attrs>
				<Form.Label>Role</Form.Label>
				<select
					{...attrs}
					bind:value={$formData.role}
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
				>
					<option value="">Select role...</option>
					<option value="admin">Admin</option>
					<option value="user">User</option>
					<option value="viewer">Viewer</option>
				</select>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Checkbox Field -->
		<Form.Field {form} name="agreeToTerms">
			<Form.Control let:attrs>
				<div class="flex items-center space-x-2">
					<input
						{...attrs}
						type="checkbox"
						bind:checked={$formData.agreeToTerms}
						class="h-4 w-4"
					/>
					<Form.Label>I agree to the terms and conditions</Form.Label>
				</div>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Submit Button -->
		<Form.Button type="submit" class="w-full">
			Submit
		</Form.Button>
	</div>
</form>
```

---

## Step 5: Handle Form States

Add loading and error states:

```svelte
<script lang="ts">
	// ... existing imports ...
	import { Loader2 } from 'lucide-svelte';

	const { form: formData, enhance, errors, delayed, submitting } = form;
</script>

<form method="POST" use:enhance>
	<!-- Form fields -->

	<Form.Button type="submit" disabled={$submitting} class="w-full">
		{#if $delayed}
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			Submitting...
		{:else}
			Submit
		{/if}
	</Form.Button>
</form>

<!-- Show general form errors -->
{#if $errors._errors}
	<div class="mt-4 p-4 bg-destructive/10 border border-destructive rounded-md">
		<p class="text-sm text-destructive">{$errors._errors[0]}</p>
	</div>
{/if}
```

---

## Step 6: Add Success Handling

Handle successful form submission:

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';

	const form = superForm(data.form, {
		validators: zodClient({formName}Schema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success('Form submitted successfully!');
				// Optionally redirect
				goto('/dashboard/list');
			}
		},
		onError: ({ result }) => {
			toast.error(result.error?.message || 'An error occurred');
		}
	});
</script>
```

---

## Step 7: Add Field Types Reference

Common field patterns:

### Text Input
```svelte
<Form.Field {form} name="fieldName">
	<Form.Control let:attrs>
		<Form.Label>Label</Form.Label>
		<Input {...attrs} type="text" bind:value={$formData.fieldName} />
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
```

### Textarea
```svelte
<Form.Field {form} name="description">
	<Form.Control let:attrs>
		<Form.Label>Description</Form.Label>
		<textarea
			{...attrs}
			bind:value={$formData.description}
			rows="4"
			class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2"
		/>
	</Form.Control>
	<Form.FieldErrors />
</Form.Field>
```

### Number Input
```svelte
<Input {...attrs} type="number" bind:value={$formData.age} min="0" max="120" />
```

### Date Input
```svelte
<Input {...attrs} type="date" bind:value={$formData.birthdate} />
```

### Select with Options
```svelte
<select {...attrs} bind:value={$formData.status} class="flex h-10 w-full rounded-md border">
	<option value="">Select...</option>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
```

---

## Important Notes

### ✅ Best Practices:
- Always use Zod for validation
- Validate on both client and server
- Provide clear error messages
- Show loading states during submission
- Handle success and error cases
- Use proper input types (email, number, date)
- Add constraints (`min`, `max`, `required`)
- Use `enhance` for progressive enhancement
- Show toast notifications for feedback

### ❌ Avoid:
- Client-side only validation
- Unclear error messages
- No loading states
- Not handling errors
- Missing required field indicators
- No success feedback

---

## Pattern Reference

See `.claude-team/CLAUDE.md` > Component Patterns > Form Pattern (Superforms)

For Superforms documentation, see `.claude-team/docs/reference/superform/`

---

## Summary

After completing these steps, you will have:
1. ✅ Zod schema with validation rules
2. ✅ Server action handling form submission
3. ✅ Type-safe form component
4. ✅ Client-side and server-side validation
5. ✅ Error handling and display
6. ✅ Loading states
7. ✅ Success feedback
8. ✅ Clean, maintainable form implementation
