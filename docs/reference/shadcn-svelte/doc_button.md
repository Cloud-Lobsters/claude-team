````markdown
# Button

Displays a button or a component that looks like a button.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add button
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

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button variant="outline">Button</Button>
```

---

## Link

Convert the button into an `<a>` element by passing an `href` prop:

```svelte
<Button href="/dashboard">Dashboard</Button>
```

Alternatively, use the `buttonVariants` helper for custom elements:

```svelte
<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
</script>

<a href="/dashboard" class={buttonVariants({ variant: 'outline' })}> Dashboard </a>
```

---

## Examples

### Primary

```svelte
<Button>Primary Button</Button>
```

### Secondary

```svelte
<Button variant="secondary">Secondary</Button>
```

### Destructive

```svelte
<Button variant="destructive">Delete</Button>
```

### Outline

```svelte
<Button variant="outline">Outline</Button>
```

### Ghost

```svelte
<Button variant="ghost">Ghost</Button>
```

### Link

```svelte
<Button variant="link">Link</Button>
```

### With Icon

```svelte
<Button>
	<svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<!-- Icon SVG code here -->
	</svg>
	Login with Email
</Button>
```

### Loading

```svelte
<Button loading>Loading...</Button>
```

---

## Variants

| Variant       | Usage Example                                    |
| ------------- | ------------------------------------------------ |
| `primary`     | `<Button>Primary</Button>`                       |
| `secondary`   | `<Button variant="secondary">Secondary</Button>` |
| `destructive` | `<Button variant="destructive">Delete</Button>`  |
| `outline`     | `<Button variant="outline">Outline</Button>`     |
| `ghost`       | `<Button variant="ghost">Ghost</Button>`         |
| `link`        | `<Button variant="link">Link</Button>`           |

---

## Props

| Prop      | Type      | Description                         |
| --------- | --------- | ----------------------------------- |
| `variant` | `string`  | Button variant (default: `primary`) |
| `href`    | `string`  | Converts to an anchor tag           |
| `loading` | `boolean` | Shows loading state                 |

---

## Theming

Customize button styles via Tailwind CSS utilities or the component's built-in variants.

---

## Contributors

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) & [CokaKoala](https://github.com/CokaKoala).

```

---

### Notes:
- All examples retain their original code snippets.
- Props table summarizes key props and their usage.
- Theming section references Tailwind CSS for customization.
- Contributors are acknowledged as per the original footer.
```
