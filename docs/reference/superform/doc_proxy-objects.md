````markdown
# Proxy Objects

Proxy objects in SvelteKit Superforms allow automatic conversion between string input values and typed schema values. They are useful when working with form fields that require non-string types (e.g., numbers, dates) or when integrating with third-party libraries.

---

## Available Proxies

Import proxies from the `sveltekit-superforms` package:

```svelte
import {(booleanProxy,
dateProxy,
intProxy,
numberProxy,
stringProxy,
formFieldProxy,
arrayProxy,
fieldProxy)} from 'sveltekit-superforms';
```
````

---

## Basic Usage

### Example with `intProxy`

```svelte
<script>
	import { superForm, intProxy } from 'sveltekit-superforms';

	const superform = superForm(data.form);
	const { form, errors, enhance } = superform;

	// Create a proxy for the 'id' field (number type)
	const idProxy = intProxy(form, 'id');

	// Alternative with taint disabled
	const idProxy2 = intProxy(superform, 'id', { taint: false });
</script>

<input type="number" bind:value={$idProxy} />
```

**Key Points:**

- Proxies automatically convert between string (input) and schema types (e.g., `string` → `number`).
- Use `superForm` as the first argument to control tainting (avoids marking the form as "dirty" on updates).

---

## Nested Proxies

Proxies work with nested data paths:

```svelte
// For a schema like { user: { profile: { email: string } } }
const emailProxy = stringProxy(form, 'user.profile.email');
```

This creates the necessary nested objects if they don’t exist.

---

## Date Input Handling

### Date Proxies

The `dateProxy` requires careful handling due to HTML `<input type="date">` constraints:

```svelte
<script>
	const proxyDate = dateProxy(form, 'date', { format: 'date', empty: true });
</script>

<input
	type="date"
	bind:value={$proxyDate}
	aria-invalid={$errors.date ? 'true' : undefined}
	min={$constraints.date?.min?.toISOString().slice(0, 10)}
	max={$constraints.date?.max?.toISOString().slice(0, 10)}
/>
```

**Important Options:**

- `format: 'date'` ensures the proxy returns `yyyy-mm-dd` instead of full ISO strings.
- `empty: true` sets the value to `undefined` for falsy inputs (e.g., empty strings).

---

## API Reference

### Common Options

| Option  | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| `taint` | Disable form tainting when updating (default: `true`).                      |
| `empty` | Set the value to `undefined` when the input is falsy (e.g., empty strings). |

---

## When to Use Proxies

- **When needed:**

  - Integrating with third-party components expecting non-string values.
  - Enforcing `undefined`/`null` for empty inputs.
  - Working with nested schema fields.

- **When not needed:**  
  Svelte’s `bind:value` automatically converts between strings and numbers/booleans. Proxies are optional in most cases.

---

## Example: Date Proxy in Action

```svelte
<script>
  const proxyDate = dateProxy(form, 'date', { format: 'date', empty: true });
</script>

<!-- Form submission result when input is empty -->
<pre>
{
  date: undefined
}
</pre>

<input type="date" bind:value={$proxyDate}>
<button use:enhance>Submit</button>
```

---

## Notes

1. **Automatic Conversion:**  
   Most numeric/date conversions are handled by Svelte’s `bind:value`. Proxies are optional but provide fine-grained control.

2. **Tainting:**  
   Use `taint: false` when updating form values programmatically without marking the form as "dirty".

3. **Nested Paths:**  
   Proxies automatically create missing nested objects (e.g., `user.profile.email`).

---

## Migration Note

In **Strict Mode**, proxies enforce type safety. Always validate proxy usage against your schema’s type definitions.

```

This documentation retains all original examples while organizing the content into clear sections. Key points like automatic type conversion, nested paths, and date handling are emphasized with code snippets and notes. The API options and usage scenarios are highlighted for quick reference.
```
