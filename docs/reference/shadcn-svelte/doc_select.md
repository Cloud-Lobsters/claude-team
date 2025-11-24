````svelte
<!-- Select Component Documentation -->

# Select The Select component allows users to choose from a list of options triggered by a button.
--- ## Installation ### CLI ```bash pnpm dlx shadcn-svelte@latest add select
````

### Manual Installation

```svelte
<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
</script>
```

---

## Usage

### Basic Example

```svelte
<Select.Root type="single" name="theme" bind:value>
	<Select.Trigger class="w-[180px]">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Theme</Select.Label>
			<Select.Item value="light">Light</Select.Item>
			<Select.Item value="dark">Dark</Select.Item>
			<Select.Item value="system">System</Select.Item>
		</Select.Group>
	</Select.Content>
</Select.Root>
```

---

## Examples

### Form Integration

```svelte
<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { createForm } from '@felte/svelte';

	const { form } = createForm({
		schema: {
			email: (value) => value === 'verified@example.com'
		}
	});

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'grapes', label: 'Grapes' },
		{ value: 'pineapple', label: 'Pineapple' }
	];

	let value = $state('');
	const triggerContent = $derived(fruits.find((f) => f.value === value)?.label ?? 'Select a fruit');
</script>

<form use:form class="space-y-4">
	<div class="flex flex-col space-y-1.5">
		<Select.Root type="single" bind:value>
			<Select.Trigger class="w-[180px]">
				{triggerContent}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Fruits</Select.Label>
					{#each fruits as fruit (fruit.value)}
						<Select.Item
							value={fruit.value}
							label={fruit.label}
							disabled={fruit.value === 'grapes'}
						>
							{fruit.label}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
	<button type="submit" class="btn">Submit</button>
</form>
```

---

## Props

### Select.Root

- `type`: `"single"` (default) or `"multiple"`
- `value`: Selected value(s)
- `bind:value`: Two-way binding for selected value

### Select.Item

- `value`: Unique identifier for the option
- `disabled`: Disables the option
- `label`: Optional label for accessibility

---

## Theming

Customize the Select component using Tailwind CSS classes on the `Select.Trigger` and `Select.Content` elements.

---

## Accessibility

- Use `aria-label` or `aria-labelledby` on `Select.Root` for screen readers.
- Ensure options have distinct `value` attributes.

---

## API Reference

For detailed prop and event documentation, refer to the [Component Source](#).

---

## Examples

### Disabled Option

```svelte
<Select.Item value="grapes" disabled>Grapes (Out of stock)</Select.Item>
```

### Dynamic Options

```svelte
{#each fruits as fruit}
	<Select.Item {...fruit} />
{/each}
```

---

## Troubleshooting

- **No options showing?** Ensure `Select.Content` is a direct child of `Select.Root`.
- **State not updating?** Use `bind:value` for two-way data binding.

```

This documentation structure includes:
1. Installation methods
2. Basic usage examples
3. Form integration example with disabled options
4. Prop descriptions
5. Theming guidance
6. Accessibility notes
7. Troubleshooting tips

All original examples (form, dynamic options, disabled states) are preserved and formatted for clarity. The code blocks use proper Svelte syntax with TypeScript imports. The structure follows standard component documentation conventions while maintaining the project's branding and key features.
```
