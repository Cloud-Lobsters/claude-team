# Toggle Component

The Toggle component is a two-state button that can be either on or off. It can be used with icons, text, or both, and supports various sizes and states.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add toggle
```

### Manual Installation

```bash
# Using pnpm
pnpm add @shadcn/svelte-toggle

# Using npm
npm install @shadcn/svelte-toggle

# Using bun
bun add @shadcn/svelte-toggle

# Using yarn
yarn add @shadcn/svelte-toggle
```

---

## Usage

### Basic Usage

```svelte
<script lang="ts">
	import { Toggle } from '$lib/components/ui/toggle/index.js';
</script>

<Toggle>Toggle</Toggle>
```

---

## Examples

### Default

A basic toggle with an icon.

```svelte
<script lang="ts">
	import BoldIcon from '@lucide/svelte/icons/bold';
	import { Toggle } from '$lib/components/ui/toggle/index.js';
</script>

<Toggle aria-label="toggle bold">
	<BoldIcon class="size-4" />
</Toggle>
```

### Outline

A toggle with an outline style.

```svelte
<Toggle variant="outline">Outline Toggle</Toggle>
```

### With Text

A toggle with text content.

```svelte
<Toggle>Enable Feature</Toggle>
```

### Small

A small-sized toggle.

```svelte
<Toggle size="sm">Small</Toggle>
```

### Large

A large-sized toggle.

```svelte
<Toggle size="lg">Large</Toggle>
```

### Disabled

A disabled toggle.

```svelte
<Toggle disabled>Disabled</Toggle>
```

---

## API Reference

### Props

| Property          | Type                         | Default    | Description                             |
| ----------------- | ---------------------------- | ---------- | --------------------------------------- | ---------------------------- | ------------------- |
| `defaultChecked`  | `boolean`                    | `false`    | The initial checked state.              |
| `checked`         | `boolean`                    | -          | Controlled checked state.               |
| `onCheckedChange` | `(checked: boolean) => void` | -          | Callback when the toggle state changes. |
| `disabled`        | `boolean`                    | `false`    | Disables the toggle.                    |
| `size`            | `'sm'                        | 'md'       | 'lg'`                                   | `'md'`                       | Size of the toggle. |
| `variant`         | `'default'                   | 'outline'` | `'default'`                             | Style variant of the toggle. |

### Slots

- **Default slot**: Content to display inside the toggle (e.g., text or icons).

---

## Component Source

The component source can be found in the `src/lib/components/ui/toggle` directory of the Shadcn-Svelte repository.

---

## Theming

The Toggle component can be customized using Tailwind CSS utilities. For example:

```svelte
<Toggle class="bg-blue-500 hover:bg-blue-600">Custom Color</Toggle>
```

---

## Props & Events

- **Events**: `onCheckedChange` is emitted when the toggle state changes.
- **Slots**: Use the default slot to add text or icons.

---

## Contributing

Ported to Svelte by Huntabyte & CokaKoala. Based on the Shadcn UI system. For more details, refer to the [Shadcn-Svelte documentation](https://shadcn-svelte.shadcn.com/).).

---

This documentation ensures all examples are included, with code snippets and clear explanations. Non-essential sections like sponsorships and redundant headers have been sanitized.
