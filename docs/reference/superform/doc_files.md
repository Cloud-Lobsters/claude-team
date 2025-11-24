````markdown
# File Uploads in Superforms

Superforms supports file uploads starting from version 2. This guide covers handling file uploads with validation, form actions, and client-side interactions.

---

## Returning Files in Form Actions

**Important Note:** File objects cannot be serialized. Use Superforms' `fail`, `message`, or `setError` to handle form returns:

```javascript
// Recommended imports
import { fail, message, setError } from 'sveltekit-superforms';

// Automatic handling
if (!form.valid) return fail(400, { form });
return message(form, 'Success!');

// Avoid default SvelteKit fail:
import { fail } from '@sveltejs/kit'; // ❌ Avoid this
```
````

If using the default `fail` from SvelteKit, use `withFiles` to strip files:

```javascript
import { withFiles } from 'sveltekit-superforms';

// With default fail:
import { fail } from '@sveltejs/kit';
return fail(400, withFiles({ form }));
```

---

## Examples

### Single File Input

#### Proxy Method

```svelte
<script>
	import { superForm, fileProxy } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';

	const { form, enhance, errors } = superForm(data.form, {
		validators: zodClient(schema)
	});

	const file = fileProxy(form, 'image');
</script>

<form method="POST" enctype="multipart/form-data" use:enhance>
	<input type="file" name="image" accept="image/png, image/jpeg" bind:files={$file} />
	{#if $errors.image}
		<span>{$errors.image}</span>
	{/if}
	<button>Submit</button>
</form>
```

#### Schema Definition

```javascript
import { z } from 'zod';
import { superValidate, fail } from 'sveltekit-superforms';

const schema = z.object({
	image: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 100_000, 'Max 100 kB upload size.')
});

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		// ...
	}
};
```

### Multiple Files Input

#### Proxy Method

```svelte
<script>
	import { superForm, filesProxy } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';

	const { form, enhance, errors } = superForm(data.form, {
		validators: zodClient(schema)
	});

	const files = filesProxy(form, 'images');
</script>

<form method="POST" enctype="multipart/form-data" use:enhance>
	<input type="file" multiple name="images" accept="image/png, image/jpeg" bind:files={$files} />
	{#if $errors.images}
		<span>{$errors.images}</span>
	{/if}
	<button>Submit</button>
</form>
```

#### Schema for Multiple Files

```javascript
const schema = z.object({
	images: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 100_000, 'Max 100 kB per file')
		.array()
});
```

---

## Validating Files Manually

If your validation library doesn’t support files, extract files from `FormData`:

```javascript
import { message, fail } from 'sveltekit-superforms';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(schema));

		if (!form.valid) return fail(400, { form });

		const image = formData.get('image');
		if (image instanceof File) {
			// Process file
		}

		return message(form, 'Upload successful!');
	}
};
```

---

## Progress Bar for Uploads

Use the `customRequest` option in `use:enhance` for progress tracking:

```svelte
<script>
  import { superForm } from 'sveltekit-superforms';

  const { form, enhance, errors } = superForm(...);
</script>

<form
	use:enhance={{
		customRequest: async ({ request, update }) => {
			const controller = new AbortController();
			const progress = (e) => {
				const percent = (e.loaded / e.total) * 100;
				update({ progress: percent });
			};
			// Implement upload logic with progress events
		}
	}}
>
	<!-- Form content -->
</form>
```

---

## Preventing File Uploads

Disable files entirely with `allowFiles: false`:

```javascript
// Disable files globally
const form = await superValidate(request, zod(schema), { allowFiles: false });

// Enable files (default behavior):
const form = await superValidate(request, zod(schema), { allowFiles: true });
```

---

## Table of Contents

- [Returning files in form actions](#returning-files-in-form-actions)
- [Examples](#examples)
  - [Single file input](#single-file-input)
  - [Multiple files](#multiple-files)
- [Validating files manually](#validating-files-manually)
- [Progress bar for uploads](#progress-bar-for-uploads)
- [Preventing file uploads](#preventing-file-uploads)

```

This documentation maintains all original examples while organizing them into clear sections with proper syntax highlighting and structure. Key points like file serialization, proxy usage, and manual validation are emphasized with code snippets and notes. The table of contents ensures easy navigation.
```
