````markdown
# Switch Component

A control that allows the user to toggle between checked and not checked.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add switch
```
````

### Manual Installation

```bash
npm install @shadcn/svelte
# or
bun add @shadcn/svelte
# or
yarn add @shadcn/svelte
```

---

## Usage

```svelte
<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
</script>

<div class="flex items-center space-x-2">
	<Switch id="airplane-mode" />
	<Label for="airplane-mode">Airplane Mode</Label>
</div>
```

---

## Examples

### Form Example

**Preview:**
Email Notifications  
Marketing emails  
Receive emails about new products, features, and more.  
Security emails  
Receive emails about your account security.  
Submit

**Code:**

```svelte
<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
</script>

<div class="space-y-4">
	<div class="flex items-center space-x-2">
		<Switch id="marketing-emails" />
		<Label for="marketing-emails">Marketing emails</Label>
	</div>
	<div class="flex items-center space-x-2">
		<Switch id="security-emails" />
		<Label for="security-emails">Security emails</Label>
	</div>
	<button type="submit" class="btn">Submit</button>
</div>
```

---

## Theming

The Switch component respects Tailwind CSS classes for customization. Use utility classes to adjust appearance.

---

## API Reference

| Property           | Type                       | Default | Description                              |
| ------------------ | -------------------------- | ------- | ---------------------------------------- |
| `checked`          | `boolean`                  | `false` | The checked state of the switch.         |
| `onUpdate:checked` | `(value: boolean) => void` | -       | Callback when the checked state changes. |
| `disabled`         | `boolean`                  | `false` | Disables the switch.                     |

---

## Notes

- Ensure you have `@shadcn/svelte` installed and properly configured in your project.
- Combine with `Label` components for accessibility.

```

This documentation format:
- Maintains all original examples (airplane mode, form example)
- Organizes content into logical sections (Installation, Usage, Examples, API)
- Uses proper markdown syntax with code blocks
- Preserves component-specific properties in the API table
- Includes theming notes
- Uses consistent formatting for headers and code snippets
- Removes extraneous navigation elements (previous/next, sponsor info)
- Retains the original component structure and prop names
- Uses Tailwind utility class references where applicable
```
