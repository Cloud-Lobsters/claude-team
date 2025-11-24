# Card Component

The Card component provides a structured layout for grouping related content, typically with a header, content, and footer. It is designed to be flexible and integrate seamlessly with Tailwind CSS.

---

## Installation

### CLI

Use the Shadcn-Svelte CLI to add the Card component:

```bash
pnpm dlx shadcn-svelte@latest add card
```

### Manual Installation

Import the component directly:

```svelte
<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
</script>
```

---

## Usage

### Basic Structure

```svelte
<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Card Title</Card.Title>
		<Card.Description>Description text here</Card.Description>
		<Card.Action>
			<Button variant="link">Action Link</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<!-- Content goes here -->
	</Card.Content>
	<Card.Footer class="flex-col gap-2">
		<!-- Footer content (e.g., buttons) -->
	</Card.Footer>
</Card.Root>
```

---

## Examples

### Login Form Example

A login form embedded in a Card with header, content, and footer actions.

#### Code

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title>Login to your account</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
		<Card.Action>
			<Button variant="link">Sign Up</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<form>
			<div class="flex flex-col gap-6">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required />
				</div>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex-col gap-2">
		<Button type="submit" class="w-full">Login</Button>
		<Button variant="outline" class="w-full">Login with Google</Button>
	</Card.Footer>
</Card.Root>
```

#### Preview

The example renders a card with:

- A header containing a title, description, and sign-up link.
- A form in the content section with email/password inputs.
- A footer with login buttons (standard and Google).

---

## Component Structure

- **Root**: The main container for the card.
- **Header**: Contains title, description, and optional actions (e.g., links).
- **Content**: Main body of the card (e.g., forms, text).
- **Footer**: Typically holds actions like buttons.

---

## Props & Slots

- **Card.Root**: Accepts standard HTML attributes (e.g., `class`).
- **Card.Header/Content/Footer**: Use slots to insert content.
- **Card.Action**: Used for secondary actions (e.g., links, buttons).

---

## Styling

- Use Tailwind CSS classes for styling (e.g., `max-w-sm`, `flex-col`).
- Customize spacing, colors, and layout using Tailwind utilities.

---

## Credits

Ported to Svelte by [Huntabyte](https://github.com/huntabyte) and [CokaKoala](https://github.com/CokaKoala).).

For more details, refer to the [Shadcn-Svelte documentation](https://ui.shadcn.com).).com).
