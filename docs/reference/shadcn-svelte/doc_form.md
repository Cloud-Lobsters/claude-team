````markdown
# Formsnap Component

The Formsnap component in shadcn-svelte provides a structured way to build accessible, type-safe forms using Formsnap and SvelteKit Superforms. It simplifies form handling with validation, accessibility, and component integration.

---

## Features

- **Composable Components**: Build forms using modular components.
- **Scoped Form State**: Use `Form.Field` to scope form state to individual fields.
- **Validation**: Built-in support for Zod or other validation libraries.
- **Accessibility**: Automatically applies ARIA attributes and labels.
- **Component Integration**: Works seamlessly with components like `Select`, `RadioGroup`, and `Switch`.

---

## Anatomy

The basic structure of a form using Formsnap:

```html
<form method="POST" use:enhance>
	<Form.Field {form} name="fieldName">
		<Form.Control>
			<Form.Label>Label</Form.Label>
			<!-- Input component (e.g., Input, Select) -->
		</Form.Control>
		<Form.Description>Helper text.</Form.Description>
		<Form.FieldErrors>Validation errors.</Form.FieldErrors>
	</Form.Field>
	<Form.Button type="submit">Submit</Form.Button>
</form>
```
````

---

## Example

### Basic Form Setup

#### 1. Define a Zod Schema (schema.ts)

```typescript
import { z } from 'zod';

export const formSchema = z.object({
	username: z.string().min(2).max(50)
});
export type FormSchema = typeof formSchema;
```

#### 2. Setup the Server Load Function (+page.server.ts)

```typescript
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';

export const load = async () => ({
	form: await superValidate(zod(formSchema))
});
```

#### 3. Create the Form Component (settings-form.svelte)

```svelte
<script>
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema } from './schema';
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';

	let { data } = $props();
	const form = superForm(data.form, { validators: zodClient(formSchema) });
	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="username">
		<Form.Control>
			<Form.Label>Username</Form.Label>
			<Input {...props} bind:value={$formData.username} />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
```

#### 4. Use the Form in a Page (+page.svelte)

```svelte
<script>
	import SettingsForm from './settings-form.svelte';
	let { data } = $props();
</script>

<SettingsForm {data} />
```

#### 5. Server Action Handling (+page.server.ts)

```typescript
export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) return fail(400, { form });
		return { form };
	}
};
```

---

## Installation

Install the component using the CLI:

```bash
pnpm dlx shadcn-svelte@latest add form
```

---

## Usage

### Step-by-Step Guide

#### 1. Create a Form Schema

Define validation rules using Zod in a dedicated file (e.g., `schema.ts`).

#### 2. Setup Server Load Function

Generate an initial form state in `+page.server.ts`.

#### 3. Build the Form Component

- Use `Form.Field` to scope fields.
- Bind input values to form data.
- Display errors and descriptions.

#### 4. Integrate the Form into a Page

Pass the form data from the server to your form component.

#### 5. Handle Form Submission

Implement server actions to validate and process form data.

---

## Preview

A basic form with validation:

```html
<!-- Example UI Preview -->
Username This is your public display name. Submit
```

---

## Next Steps

- **Formsnap Docs**: [Formsnap Documentation](https://formsnap.js.org/)
- **Superforms Docs**: [SvelteKit Superforms](https://form-superforms.sveltejs.science/)

---

## Related Components

Explore other form-related components:

- [Checkbox](/components/checkbox)
- [Date Picker](/components/date-picker)
- [Input](/components/input)
- [Radio Group](/components/radio-group)
- [Select](/components/select)
- [Switch](/components/switch)
- [Textarea](/components/textarea)
- [Dropdown Menu](/components/dropdown-menu)
- [Hover Card](/components/hover-card)

```

This documentation maintains all examples, code snippets, and structure while sanitizing any extraneous content (e.g., the sponsor section). Each section is clearly separated, and code blocks are formatted with appropriate syntax highlighting.
```
