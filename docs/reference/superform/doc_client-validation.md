# Superforms Documentation

## Client-Side Validation

Superforms offers two client-side validation methods: **built-in browser validation** and **custom validation schemas**.

---

### Built-in Browser Validation

Leverage native browser validation without JavaScript by spreading the `$constraints` store onto form fields.

#### Constraints Object

The `constraints` store maps schema validators to HTML attributes:

```typescript
interface Constraints {
	pattern?: string; // First RegExp pattern from string validators
	step?: number | 'any'; // For number inputs with step validation
	minlength?: number; // Minimum string length
	maxlength?: number; // Maximum string length
	min?: number | string; // Minimum value (number/date)
	max?: number | string; // Maximum value (number/date)
	required?: true; // True if field is required
}
```

#### Example Usage

```svelte
<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	let { data } = $props();
	const { form, constraints } = superForm(data.form);
</script>

<input name="email" type="email" bind:value={$form.email} {...$constraints.email} />
```

#### Special Input Types

For date fields, ensure data and constraints are in `YYYY-MM-DD` format:

```svelte
<input
	name="date"
	type="date"
	aria-invalid={$errors.date ? 'true' : undefined}
	bind:value={$proxyDate}
	{...$constraints.date}
	min={$constraints.date?.min?.toString().slice(0, 10)}
/>
```

---

### Using a Validation Schema

For advanced validation, use a schema with `superForm` options. Requires `use:enhance`.

#### Options

```typescript
superForm(data, {
	validators: ClientValidationAdapter | 'clear' | false,
	validationMethod: 'auto' | 'oninput' | 'onblur' | 'onsubmit',
	customValidity: boolean
});
```

#### Adapter Setup

Import the same schema used on the server:

```typescript
import { valibotClient } from 'sveltekit-superforms/adapters';
import { schema } from './schema.js';

const { form, errors, enhance } = superForm(data.form, {
	validators: valibotClient(schema)
});
```

#### Dynamic Schema Switching

Switch schemas for multi-step forms:

```typescript
import { valibot } from 'sveltekit-superforms/adapters';
import { schema, partialSchema } from './schema.js';

const { form, options } = superForm(data.form, {
	validators: valibot(partialSchema)
});

// Switch to full schema
options.validators = valibot(schema);
```

---

### Validation Methods

#### `validate()`

Validate individual fields:

```typescript
// Validate current field value
validate('name');

// Validate with custom value
validate('name', { value: 'Test', update: 'errors' });

// Validate nested data
validate('tags[1].name', { value: 'Test', taint: true });
```

#### `validateForm()`

Validate the entire form:

```typescript
const result = await validateForm({ schema: valibot(partialSchema) });

if (result.valid) {
	// Proceed
}
```

---

### Validation Triggers

- **validationMethod** defaults to "auto":
  - Validates on `input` if field has errors
  - Validates on `blur-sm` otherwise
- Override with:
  - `oninput`: Validate on every keystroke
  - `onblur`: Validate when focus leaves field
  - `onsubmit`: Validate only on form submission

---

### Asynchronous Validation

For slow validations (e.g., username checks), use debouncing:

```typescript
// Example with throttle-debounce
import { debounce } from 'throttle-debounce';

debounce(300, async () => {
	$errors.username = ['Username taken'];
});
```

---

### Error Handling

- **Manual Error Setting**:

```typescript
$errors.username = ['Username is already taken'];
```

- **CustomValidity Option**: Uses browser tooltips instead of `$errors`.

---

### Example: Tag Validation Form

```svelte
{#each $errors.tags as error}
	<div class="error">{error}</div>
{/each}

<input type="text" name="tags" bind:value={$form.tags} {...$constraints.tags} />
```

**Behavior**:

- Errors appear when focus leaves field (onblur)
- Correcting input removes errors immediately (oninput)

---

### Notes

- **Bundle Size**: Client adapters add ~1-2KB to your bundle
- **Schema Consistency**: Use same schema on client/server for adapters
- **Nested Data**: Use dot notation for nested fields (e.g., `tags[1].name`)

---

### Try It Out

Test the tag validation example:

1. Leave a tag empty → error appears on blur
2. Correct input → error disappears on input
3. Submit form to see final validation

> **Note**: Enable SuperDebug for real-time validation feedback.
