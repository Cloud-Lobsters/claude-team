# Avatar Component Documentation

The Avatar component is an image element with a fallback for representing users. It includes `Avatar.Root`, `Avatar.Image`, and `Avatar.Fallback` components.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add avatar
```

### Manual Installation

```bash
# Using pnpm
pnpm add @shadcn-svelte/avatar

# Using npm
npm install @shadcn-svelte/avatar

# Using bun
bun add @shadcn-svelte/avatar

# Using yarn
yarn add @shadcn-svelte/avatar
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import * as Avatar from '@shadcn-svelte/avatar';
</script>

<Avatar.Root>
	<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
	<Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>
```

---

## Examples

### Multiple Avatars with Styling

```svelte
<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<div class="flex flex-row flex-wrap items-center gap-12">
	<Avatar.Root>
		<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.Root class="rounded-lg">
		<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
		<Avatar.Fallback>ER</Avatar.Fallback>
	</Avatar.Root>
	<div
		class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
	>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
			<Avatar.Fallback>LR</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
			<Avatar.Fallback>ER</Avatar.Fallback>
		</Avatar.Root>
	</div>
</div>
```

---

## Component Structure

### `Avatar.Root`

The root container for the avatar. Accepts `Avatar.Image` and `Avatar.Fallback` as children.

### `Avatar.Image`

The image element that displays the user's profile picture. Requires a `src` and `alt` prop.

### `Avatar.Fallback`

Fallback content (e.g., initials) displayed when the image fails to load.

---

## Styling

- Use Tailwind CSS classes for styling (e.g., `rounded-lg`, `grayscale`).
- Customize using utility classes like `flex`, `gap-12`, or `ring-2`.

---

## Props & Slots

- **Avatar.Root**: Accepts standard HTML attributes (e.g., `class`).
- **Avatar.Image**: Requires `src` (string) and `alt` (string) props.
- **Avatar.Fallback**: Displays text or icons when the image is unavailable.

---

## Notes

- The fallback text (e.g., "CN") is shown if the image fails to load.
- Combine with Tailwind utilities for layout and styling.

---

This documentation covers installation, basic usage, and advanced styling examples for the Avatar component.
