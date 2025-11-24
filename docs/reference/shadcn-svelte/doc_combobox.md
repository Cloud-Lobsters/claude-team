# Combobox Component

The Combobox component provides an autocomplete input with a list of suggestions, built using the `Popover` and `Command` components.

---

## Installation

The Combobox requires the following dependencies:

1. **Popover Component**: [Installation Guide](popover.md)
2. **Command Component**: [Installation Guide](command.md)
3. **Lucide Icons**: Ensure `@lucide/svelte` is installed.

```bash
npm install @lucide/svelte
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';

	const frameworks = [
		{ value: 'sveltekit', label: 'SvelteKit' },
		{ value: 'next.js', label: 'Next.js' }
		// ... (other frameworks)
	];

	let open = $state(false);
	let value = $state('');
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(frameworks.find((f) => f.value === value)?.label);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => triggerRef.focus());
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		<Button
			variant="outline"
			class="w-[200px] justify-between"
			role="combobox"
			aria-expanded={open}
		>
			{selectedValue || 'Select a framework...'}
			<ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." />
			<Command.List>
				<Command.Empty>No framework found.</Command.Empty>
				<Command.Group>
					{#each frameworks as framework}
						<Command.Item
							value={framework.value}
							onSelect={() => {
								value = framework.value;
								closeAndFocusTrigger();
							}}
						>
							<CheckIcon
								class={cn('mr-2 size-4', value !== framework.value && 'text-transparent')}
							/>
							{framework.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
```

---

## Examples

### Basic Combobox

**Preview**  
Select a framework...

**Code**

```svelte
<!-- Same as the Usage example above -->
```

---

### Form Integration

To use the Combobox within a form, wrap it with `<Form.Control>` from `formsnap` to ensure proper form submission:

```svelte
<script>
	import { Form, FormLabel, FormControl } from 'formsnap';
</script>

<Form>
	<FormLabel>Framework</FormLabel>
	<FormControl name="framework">
		<!-- Combobox component here -->
	</FormControl>
</Form>
```

**Note**: Requires `formsnap@0.5.0` or higher for proper form handling.

---

## Notes

1. **Keyboard Navigation**:

   - Use arrow keys to navigate options.
   - Press `Enter` to select an item.
   - Press `Escape` to close the dropdown.

2. **Icon Requirements**:  
   Icons like `CheckIcon` and `ChevronsUpDownIcon` are from `@lucide/svelte`. Customize or replace as needed.

3. **State Management**:
   - `value` tracks the selected option.
   - `selectedValue` derives the label from the selected `value`.

---

## Props & Events

### Combobox Props

| Property   | Type       | Description                         |
| ---------- | ---------- | ----------------------------------- |
| `value`    | `string`   | Selected value                      |
| `onSelect` | `function` | Callback when an option is selected |

---

## Theming

Customize the appearance using Tailwind CSS classes. For example:

```css
/* Example styling for the trigger button */
button {
	@variant outline;
	justify-content: space-between;
}
```

---

## Accessibility

- The `role="combobox"` and `aria-expanded` attributes ensure screen reader compatibility.
- The `closeAndFocusTrigger` function refocuses the trigger button after selection for keyboard accessibility.

---

## Related Components

- [Popover](popover.md)
- [Command](command.md)
- [FormSnap Integration](formsnap.md)

---

## Troubleshooting

- **Form Submission Issues**: Ensure `formsnap` is at least version `0.5.0`.
- **Icon Not Found**: Verify `@lucide/svelte` is installed and icons are imported correctly.
