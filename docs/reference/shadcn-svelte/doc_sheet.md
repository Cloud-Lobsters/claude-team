````markdown
# Sheet Component

The Sheet component extends the Dialog component to display content that complements the main screen content. It includes components like `Root`, `Trigger`, `Content`, `Header`, `Footer`, `Title`, `Description`, and `Close`.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add sheet
```
````

### Manual Installation

```bash
# pnpm
pnpm add @shadcn/svelte

# npm
npm install @shadcn/svelte

# bun
bun add @shadcn/svelte

# yarn
yarn add @shadcn/svelte
```

---

## Usage

Import the component and use it as follows:

```svelte
<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>Open</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Edit profile</Sheet.Title>
			<Sheet.Description>
				Make changes to your profile here. Click save when you're done.
			</Sheet.Description>
		</Sheet.Header>
		<div class="grid flex-1 auto-rows-min gap-6 px-4">
			<div class="grid gap-3">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" value="Pedro Duarte" />
			</div>
			<div class="grid gap-3">
				<Label for="username" class="text-right">Username</Label>
				<Input id="username" value="@peduarte" />
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close class={buttonVariants({ variant: 'outline' })}>Save changes</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
```

---

## Examples

### Side

Specify the side where the sheet appears using the `side` prop on `<Sheet.Content>`:

```svelte
<Sheet.Content side="right">
	<!-- Content here -->
</Sheet.Content>
```

Possible values: `top`, `right`, `bottom`, `left`.

---

### Size

Adjust the size using CSS classes on `<Sheet.Content>`:

```svelte
<Sheet.Content class="w-[400px] sm:w-[540px]">
	<Sheet.Header>
		<Sheet.Title>Are you absolutely sure?</Sheet.Title>
		<Sheet.Description>
			This action cannot be undone. This will permanently delete your account.
		</Sheet.Description>
	</Sheet.Header>
</Sheet.Content>
```

---

## API Reference

### Components

- **Sheet.Root**: The root container for the sheet.
- **Sheet.Trigger**: The element that opens the sheet.
- **Sheet.Content**: The modal content container.
- **Sheet.Header**: Header section within the content.
- **Sheet.Footer**: Footer section within the content.
- **Sheet.Title**: Title element in the header.
- **Sheet.Description**: Description element in the header.
- **Sheet.Close**: Button to close the sheet.

### Props

- **side** (string): `top` | `right` | `bottom` | `left`): Determines the side the sheet appears on (default: `right`).

---

## Notes

- The Sheet component leverages Tailwind CSS for styling. Adjust classes like `w-[400px]` to customize dimensions.
- Use `Sheet.Close` for closing actions, typically placed in the `Footer`.

For more details, refer to the [Dialog component documentation](#) since Sheet extends Dialog functionality.

```

This documentation includes:
- Installation instructions
- Basic usage example with form inputs
- Side positioning example
- Size customization example
- Component and prop references
- Notes on styling and inheritance

The sanitized version removes sponsor mentions, extraneous navigation links, and focuses purely on the component's documentation structure and examples provided in the original text.
```
