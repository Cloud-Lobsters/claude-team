````markdown
# Slider Component

The Slider component allows users to select a value from within a given range.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add slider
```
````

### Manual Installation

#### pnpm

```bash
pnpm add shadcn-svelte
```

#### npm

```bash
npm install shadcn-svelte
```

#### bun

```bash
bun add shadcn-svelte
```

#### yarn

```bash
yarn add shadcn-svelte
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Slider } from '$lib/components/ui/slider/index.js';
	let value = $state(33);
</script>

<Slider type="single" bind:value max={100} step={1} class="max-w-[70%]" />
```

---

## Examples

### Multiple Thumbs

Select a range with two thumbs.

```svelte
<script lang="ts">
	import { Slider } from '$lib/components/ui/slider/index.js';
	let value = $state([25, 75]);
</script>

<Slider type="multiple" bind:value max={100} step={1} />
```

---

## Props

| Prop    | Description                      | Type                   | Default     |
| ------- | -------------------------------- | ---------------------- | ----------- | ---------- |
| `type`  | Type of slider (single/multiple) | `'single'              | 'multiple'` | `'single'` |
| `value` | Current value(s)                 | `number` or `number[]` | -           |
| `max`   | Maximum value                    | `number`               | `100`       |
| `step`  | Step increment                   | `number`               | `1`         |
| `class` | Custom CSS class                 | `string`               | -           |

---

## API Reference

- **Slider**: The main slider component.
- **Props**: Configure slider behavior (e.g., `max`, `step`).
- **Events**: Emitted when value changes (handled via `bind:value`).

---

## Preview

### Basic Slider

![Basic Slider](https://via.placeholder.com/600x50/000000/FFFFFF?text=Basic+Slider)

### Multiple Thumbs Slider

![Multiple Thumbs](https://via.placeholder.com/600x50/000000/FFFFFF?text=Multiple+Thumbs)

---

## Notes

- Use `$state` for reactive state management (e.g., `value = $state(33)`).
- Adjust `class` prop for styling (e.g., `max-w-[70%]`).

Built by shadcn. Ported to Svelte by Huntabyte & CokaKoala.

```

### Key Features:
- **Installation**: Multiple package manager options.
- **Examples**: Basic and multiple thumbs usage.
- **Props Table**: Clear prop definitions.
- **Preview Placeholders**: Visual references (replace with actual images if available).
- **State Management**: Notes on reactive state with `$state`.

This structure maintains all original examples while organizing the documentation into logical sections with proper markdown formatting.
```
