````markdown
# Input Component

The Input component provides a form input field or a component that mimics an input field, with various states and configurations.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add input
```
````

### Manual Installation

```bash
# Using pnpm
pnpm add shadcn-svelte

# Using npm
npm install shadcn-svelte

# Using bun
bun add shadcn-svelte

# Using yarn
yarn add shadcn-svelte
```

---

## Usage

```svelte
<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
</script>

<Input type="email" placeholder="email" class="max-w-xs" />
```

---

## Examples

### Default

```svelte
<Input placeholder="Your input" />
```

### Disabled

```svelte
<Input disabled placeholder="Disabled input" />
```

### With Label

```svelte
<Label for="email" class="sr-only">Email address</Label>
<Input id="email" type="email" placeholder="hello@your-email.com" />
```

### With Text (Email)

```svelte
<div class="flex gap-2">
	<span class="text-sm text-muted-foreground">Email</span>
	<Input placeholder="hello@your-email.com" />
</div>
```

### With Button

```svelte
<div class="flex gap-2">
	<Input placeholder="Your email" class="flex-1" />
	<Button variant="primary">Subscribe</Button>
</div>
```

### Invalid

```svelte
<Input class="border-red-500" />
<p class="mt-2 text-sm text-red-500">Please enter a valid email address.</p>
```

### File Input

```svelte
<Input type="file" class="max-w-xs" />
```

### Form Example

```svelte
<form>
	<div class="space-y-2">
		<Label for="username">Username</Label>
		<Input id="username" placeholder="Your username" />
		<p class="text-sm text-muted-foreground">This will be your public display name.</p>
	</div>
	<Button type="submit" class="mt-4">Submit</Button>
</form>
```

---

## Props

| Prop          | Description                        | Type      | Default |
| ------------- | ---------------------------------- | --------- | ------- |
| `type`        | Input type (e.g., `text`, `email`) | `string`  | `text`  |
| `disabled`    | Disables the input                 | `boolean` | `false` |
| `placeholder` | Placeholder text                   | `string`  | -       |

---

## Built By

Built by [shadcn](https://ui.shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) & [CokaKoala](https://github.com/CokaKoala).

```

### Key Features:
- **States**: Disabled, invalid, and default states.
- **Integration**: Works with Tailwind CSS for styling.
- **Flexibility**: Supports various input types (text, email, file) and can be combined with other components like `Label` and `Button`.

This documentation retains all examples from the original text while organizing them into a clean, markdown-based structure with proper syntax highlighting and sections.
```
