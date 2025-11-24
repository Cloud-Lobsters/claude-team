````markdown
# Status Messages

A status message like "Form posted" can be displayed after submitting a form. The validation object contains a message store used for this.

---

## Usage

To display the message in your Svelte component:

```svelte
<script>
	import { superForm } from 'sveltekit-superforms';

	const { form, message } = superForm(data.form);
</script>

{#if $message}
	<div class="message">{$message}</div>
{/if}
```
````

---

## The Message Helper

On the server, use the `message` helper to send the message along with the form:

```typescript
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return message(form, 'Invalid form');
		}

		if (form.data.email.includes('spam')) {
			return message(form, 'No spam please', { status: 403 });
		}

		return message(form, 'Valid form!');
	}
};
```

You can also return structured data:

```typescript
return message(form, { text: 'User created', id: newId });
```

---

## Strongly Typed Messages

### Generic Type Parameters

Type the message using generics:

```typescript
import { Infer, superValidate } from 'sveltekit-superforms';

const form = await superValidate<Infer<typeof schema>, { status: string; text: string }>(
	event,
	zod(schema)
);
```

### Global Type Declaration

Define a global `Message` type in `src/app.d.ts`:

```typescript
declare global {
	namespace App {
		namespace Superforms {
			type Message = {
				type: 'error' | 'success';
				text: string;
			};
		}
	}
}
```

This allows omitting the generic type:

```svelte
<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	const { form, message } = superForm(data.form);
</script>

{#if $message}
	<div class:success={$message.type == 'success'} class:error={$message.type == 'error'}>
		{$message.text}
	</div>
{/if}
```

---

## Using the Message Data Programmatically

Handle messages in event handlers:

```typescript
const { form, enhance } = superForm(data.form, {
	onUpdated({ form }) {
		if (form.message) {
			toast(form.message.text, {
				icon: form.message.status == 'success' ? '✅' : '❌'
			});
		}
	}
});
```

---

## Limitations

- **Redirects**: Messages are lost during redirects. Use [sveltekit-flash-message](https://github.com/sveltekit-flash-message) for redirect scenarios.
- **Status Codes**: The `status` option in `message()` only affects the HTTP status if it’s ≥400. Otherwise, it defaults to 200.

---

### Previous/Next

- [← Snapshots](snapshots.md) | [Strict Mode →](strict-mode.md)

```

### Key Features Preserved:
1. **Code Examples**: All original code snippets are retained with syntax highlighting.
2. **TypeScript Integration**: Type definitions and generics are explicitly shown.
3. **Global Type Declaration**: The `src/app.d.ts` example is included verbatim.
4. **Event Handling**: The `onUpdated` example demonstrates programmatic message usage.
5. **Limitations Note**: Highlights edge cases like redirects and status code behavior.

This structure maintains the original information while improving readability through markdown formatting and code blocks.
```
