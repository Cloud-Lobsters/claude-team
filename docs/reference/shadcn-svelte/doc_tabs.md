# Tabs Component

A set of layered sections of content—known as tab panels—that are displayed one at a time.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add tabs
```

### Manual Installation

```bash
# pnpm
pnpm add @shadcn-svelte/tabs

# npm
npm install @shadcn-svelte/tabs

# bun
bun add @shadcn-svelte/tabs

# yarn
yarn add @shadcn-svelte/tabs
```

---

## Usage

### Basic Example

```svelte
<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
</script>

<Tabs.Root value="account" class="w-[400px]">
	<Tabs.List>
		<Tabs.Trigger value="account">Account</Tabs.Trigger>
		<Tabs.Trigger value="password">Password</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
	<Tabs.Content value="password">Change your password here.</Tabs.Content>
</Tabs.Root>
```

---

## Example: Account/Password Form

```svelte
<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<div class="flex w-full max-w-sm flex-col gap-6">
	<Tabs.Root value="account">
		<Tabs.List>
			<Tabs.Trigger value="account">Account</Tabs.Trigger>
			<Tabs.Trigger value="password">Password</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="account">
			<Card.Root>
				<Card.Header>
					<Card.Title>Account</Card.Title>
					<Card.Description>
						Make changes to your account here. Click save when you're done.
					</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-6">
					<div class="grid gap-3">
						<Label for="tabs-demo-name">Name</Label>
						<Input id="tabs-demo-name" value="Pedro Duarte" />
					</div>
					<div class="grid gap-3">
						<Label for="tabs-demo-username">Username</Label>
						<Input id="tabs-demo-username" value="@peduarte" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button>Save changes</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="password">
			<Card.Root>
				<Card.Header>
					<Card.Title>Password</Card.Title>
					<Card.Description>
						Change your password here. After saving, you'll be logged out.
					</Card.Description>
				</Card.Header>
				<Card.Content class="grid gap-6">
					<div class="grid gap-3">
						<Label for="tabs-demo-current">Current password</Label>
						<Input id="tabs-demo-current" type="password" />
					</div>
					<div class="grid gap-3">
						<Label for="tabs-demo-new">New password</Label>
						<Input id="tabs-demo-new" type="password" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button>Save password</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
```

---

## API Reference

### Components

- **Tabs.Root**: The root container for the tabs.
- **Tabs.List**: Container for tab triggers.
- **Tabs.Trigger**: Individual tab buttons.
- **Tabs.Content**: Content panels for each tab.

### Props

| Property        | Type                      | Description                     |
| --------------- | ------------------------- | ------------------------------- |
| `value`         | `string`                  | The currently active tab value. |
| `onValueChange` | `(value: string) => void` | Callback for value changes.     |

---

## Theming

Tabs inherit Tailwind CSS classes and can be styled using standard Tailwind utilities. For advanced customization, override the component's CSS variables or use the `class` prop.

---

## Contributors

- **Original Design**: [shadcn](https://shadcn.com)
- **Svelte Port**: [Huntabyte](https://github.com/Huntabyte) & [CokaKoala](https://github.com/CokaKoala)

---

## Special Sponsor

We're looking for one partner to be featured here. Support the project and reach thousands of developers. [Reach out](https://shadcn.com) for details.

---

### Notes

- Ensure all dependencies like `Card`, `Button`, `Input`, and `Label` are imported correctly if using the form example.
- The `value` prop determines the active tab. Use `onValueChange` to handle tab selection changes programmatically.
