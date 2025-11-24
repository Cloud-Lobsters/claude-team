# Dialog Component

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add dialog
```

### Manual Installation

#### PNPM

```bash
pnpm add @shadcn/svelte
```

#### NPM

```bash
npm install @shadcn/svelte
```

#### BUN

```bash
bun add @shadcn/svelte
```

#### YARN

```bash
yarn add @shadcn/svelte
```

---

## Usage Examples

### Basic Form Dialog

```svelte
<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" value="Pedro Duarte" class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="username" class="text-right">Username</Label>
				<Input id="username" value="@peduarte" class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
```

### Confirmation Dialog

```svelte
<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
</script>

<Dialog.Root>
	<Dialog.Trigger>Open</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
```

---

## Component Structure

The Dialog component includes the following elements:

- **Root**: The root container for the dialog
- **Trigger**: The element that opens the dialog
- **Content**: The main content of the dialog
- **Header**: Contains title and description
- **Title**: Dialog title
- **Description**: Dialog description
- **Footer**: Optional footer section for actions

---

## API Reference

### Dialog.Root

- Props: `open` (controlled state), `onOpenChange` (callback on state change)

### Dialog.Content

- Props: `defaultOpen` (boolean), `onOpen` (callback on open)

### Dialog.Trigger

- Props: Standard HTML attributes (e.g., `disabled`, `aria-label`)

---

## Theming

Use Tailwind CSS classes to customize appearance. Example:

```html
<Dialog.Content class="sm:max-w-[425px] bg-white dark:bg-gray-800"></Dialog.Content>
```

---

## Contributors

Built by [shadcn](https://shadcn.com). Ported to Svelte by [Huntabyte](https://github.com/huntabyte) & [CokaKoala](https://github.com/cokakoala).

---

## Notes

- Ensure proper state management for `Dialog.Root` using `open` and `onOpenChange`
- Always include a `Dialog.Trigger` to open the dialog
- Use semantic HTML structure for accessibility

For more details, refer to the [component source](https://github.com/shadcn/svelte/blob/main/src/lib/components/ui/dialog/index.js).
