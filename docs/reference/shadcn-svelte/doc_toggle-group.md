# Toggle Group Component

The Toggle Group component allows users to select one or multiple options from a set of toggle buttons. It provides a clean and accessible way to handle toggle states with different variants and sizes.

---

## Installation

### CLI

Use the Shadcn-Svelte CLI to add the Toggle Group component:

```bash
pnpm dlx shadcn-svelte@latest add toggle-group
```

### Manual Installation

Import the component directly:

```svelte
<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
</script>
```

---

## Usage

### Basic Usage

```svelte
<ToggleGroup.Root type="single">
	<ToggleGroup.Item value="a">A</ToggleGroup.Item>
	<ToggleGroup.Item value="b">B</ToggleGroup.Item>
	<ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
```

---

## Examples

### Default

A basic toggle group with multiple selection.

```svelte
<ToggleGroup.Root type="multiple">
	<ToggleGroup.Item value="bold" aria-label="Toggle bold">
		<BoldIcon class="h-4 w-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="italic" aria-label="Toggle italic">
		<ItalicIcon class="h-4 w-4" />
	</ToggleGroup.Item>
	<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
		<UnderlineIcon class="h-4 w-4" />
	</ToggleGroup.Item>
</ToggleGroup.Root>
```

### Outline

Use the `variant="outline"` prop for an outlined style.

```svelte
<ToggleGroup.Root variant="outline" type="multiple">
	<!-- Items here -->
</ToggleGroup.Root>
```

### Single Selection

Limit selection to one item using `type="single"`.

```svelte
<ToggleGroup.Root type="single">
	<!-- Items here -->
</ToggleGroup.Root>
```

### Small Size

Use smaller toggles with `size="sm"` (default size is `md`).

```svelte
<ToggleGroup.Root size="sm">
	<!-- Items here -->
</ToggleGroup.Root>
```

### Large Size

Use larger toggles with `size="lg"`.

```svelte
<ToggleGroup.Root size="lg">
	<!-- Items here -->
</ToggleGroup.Root>
```

### Disabled State

Disable all items by adding `disabled` to the root.

```svelte
<ToggleGroup.Root type="single" disabled>
	<ToggleGroup.Item value="a">A</ToggleGroup.Item>
</ToggleGroup.Root>
```

---

## Props

### Root Props

| Prop       | Description                | Type      | Default     |
| ---------- | -------------------------- | --------- | ----------- |
| `type`     | `"single"` or `"multiple"` | `string`  | `"single"`  |
| `variant`  | `"default"` or `"outline"` | `string`  | `"default"` |
| `size`     | `"sm"`, `"md"`, or `"lg"`  | `string`  | `"md"`      |
| `disabled` | Disable all items          | `boolean` | `false`     |

### Item Props

| Prop         | Description                            | Type     |
| ------------ | -------------------------------------- | -------- |
| `value`      | Unique value for the item              | `string` |
| `aria-label` | Accessibility label for screen readers | `string` |

---

## Notes

- **Icons**: The example uses [Lucide](https://lucide.dev/) icons. Install them via:
  ```bash
  pnpm add @lucide/svelte
  ```
- **Themes**: Customize the appearance using Tailwind CSS utilities or the theming system.

---

## Attribution

Built by [shadcn](https://ui.shadcn.com/). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) & [CokaKoala](https://github.com/CokaKoala).
