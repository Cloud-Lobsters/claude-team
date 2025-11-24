# Checkbox Component

The Checkbox component allows users to toggle between checked and unchecked states. It is commonly used in forms, settings, and consent agreements.

---

## Installation

### CLI

Use the Shadcn Svelte CLI to add the Checkbox component:

```bash
pnpm dlx shadcn-svelte@latest add checkbox
```

### Manual Installation

Import the component directly:

```svelte
<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>
```

---

## Usage

### Basic Example

```svelte
<div class="flex items-center gap-3">
	<Checkbox id="terms" />
	<Label for="terms">Accept terms and conditions</Label>
</div>
```

### Checked State

```svelte
<div class="flex items-start gap-3">
	<Checkbox id="terms-2" checked />
	<div class="grid gap-2">
		<Label for="terms-2">Accept terms and conditions</Label>
		<p class="text-muted-foreground text-sm">
			By clicking this checkbox, you agree to the terms and conditions.
		</p>
	</div>
</div>
```

### Disabled State

```svelte
<div class="flex items-start gap-3">
	<Checkbox id="toggle" disabled />
	<Label for="toggle">Enable notifications</Label>
</div>
```

### Custom Styling

```svelte
<Label
	class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
>
	<Checkbox
		id="toggle-2"
		checked
		class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
	/>
	<div class="grid gap-1.5 font-normal">
		<p class="text-sm font-medium leading-none">Enable notifications</p>
		<p class="text-muted-foreground text-sm">
			You can enable or disable notifications at any time.
		</p>
	</div>
</Label>
```

---

## Examples

### Form Integration

```svelte
<form>
	<div class="flex flex-col gap-6">
		<!-- Checkbox examples here -->
	</div>
</form>
```

---

## Props

| Prop       | Description                        | Type      | Default |
| ---------- | ---------------------------------- | --------- | ------- |
| `checked`  | Whether the checkbox is checked    | `boolean` | `false` |
| `disabled` | Disables user interaction          | `boolean` | `false` |
| `id`       | Unique identifier for the checkbox | `string`  | -       |

---

## Theming

Customize the appearance using Tailwind CSS classes or utility-first styles. The component respects default Shadcn Svelte themes and can be further styled via the `class` prop.

---

## Accessibility

- Uses `aria-checked` and proper ARIA roles for screen readers.
- Ensure the `id` and `Label`'s `for` attribute are synchronized.

---

## API Reference

For advanced usage, refer to the [Checkbox component source](./index.js) and [API documentation](./).

---

## Examples Gallery

### Default Checkbox

![Default Checkbox](https://via.placeholder.com/300x50?text=Default+Checkbox)

### Checked Checkbox

![Checked Checkbox](https://via.placeholder.com/300x50?text=Checked+Checkbox)

### Disabled Checkbox

![Disabled Checkbox](https://via.placeholder.com/300x50?text=Disabled+Checkbox)

---

## Related Components

- [Label](/components/label)
- [Form](/components/form)
- [Switch](/components/switch)

---

**Built by shadcn. Ported to Svelte by Huntabyte & CokaKoala.**
