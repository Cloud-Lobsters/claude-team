# Radio Group

A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add radio-group
```

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
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<RadioGroup.Root value="comfortable">
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="default" id="r1" />
		<Label for="r1">Default</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="comfortable" id="r2" />
		<Label for="r2">Comfortable</Label>
	</div>
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="compact" id="r3" />
		<Label for="r3">Compact</Label>
	</div>
</RadioGroup.Root>
```

---

## Examples

### Form Example

#### Preview

![Form Example Preview](#)  
_(Example UI showing radio buttons for "Notify me about..." options)_

#### Code

```svelte
<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<form>
	<RadioGroup.Root name="notification" value="all">
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="all" id="all" />
			<Label for="all">All new messages</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="mentions" id="mentions" />
			<Label for="mentions">Direct messages and mentions</Label>
		</div>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="none" id="none" />
			<Label for="none">Nothing</Label>
		</div>
	</RadioGroup.Root>
	<button type="submit">Submit</button>
</form>
```

---

## API Reference

The `RadioGroup` component provides the following props and slots:

- **Root**: The container for all radio items.

  - `value`: The currently selected value (required).
  - `onValueChange`: Event handler for value changes.

- **Item**: Individual radio button.
  - `value`: The value of the radio item (required).
  - `id`: Unique identifier for the radio item.

---

## Component Source

The component source can be found in the project's repository. For customization, refer to the source code or documentation for props and slots.

---

## Footer

Built by [shadcn](https://shadcn.com). Ported to Svelte by Huntabyte & CokaKoala.

---

### Notes

- Ensure Tailwind CSS is configured for styling.
- Use `RadioGroup.Root` to wrap all `RadioGroup.Item` components.
- Each `RadioGroup.Item` must have a unique `id` and `value`.

This documentation structure maintains all examples and sections from the original content while organizing it into a clear, markdown-based format.
