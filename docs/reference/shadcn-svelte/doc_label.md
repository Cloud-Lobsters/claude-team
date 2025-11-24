# Label Component Documentation

## Overview

The Label component provides an accessible way to associate text labels with form controls. It ensures proper screen reader support and semantic HTML structure.

---

## Installation

### Using CLI

```bash
pnpm dlx shadcn-svelte@latest add label
```

### Manual Installation

```bash
# pnpm
pnpm add shadcn-svelte

# npm
npm install shadcn-svelte

# bun
bun add shadcn-svelte

# yarn
yarn add shadcn-svelte
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<Label for="email">Your email address</Label>
```

### Checkbox Example

```svelte
<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<div>
	<div class="flex items-center space-x-2">
		<Checkbox id="terms" />
		<Label for="terms">Accept terms and conditions</Label>
	</div>
</div>
```

---

## API Reference

| Property | Type     | Description                                                               |
| -------- | -------- | ------------------------------------------------------------------------- |
| `for`    | `string` | **Required**. The `id` of the form element this label is associated with. |
| Children | `string` | The visible label text.                                                   |

---

## Notes

- Always pair with form elements like `<input>`, `<Checkbox>`, or other controls using the `for` prop.
- The component automatically adds the `label` HTML tag with proper `for` attribute binding.

---

### Component Source

The component is implemented in:  
`$lib/components/ui/label/index.js`

---

### Built By

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/Huntabyte) & [CokaKoala](https://github.com/CokaKoala).
