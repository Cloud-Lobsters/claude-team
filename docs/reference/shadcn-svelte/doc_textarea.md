````markdown
# Textarea

Displays a form textarea or a component that looks like a textarea.

---

## Installation

### CLI

```bash
pnpm dlx shadcn-svelte@latest add textarea
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

```svelte
<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
</script>

<Textarea placeholder="Type your message here." />
```

---

## Examples

### Default

A basic textarea with a placeholder.

```svelte
<Textarea placeholder="Type your message here." />
```

### Disabled

A disabled textarea.

```svelte
<Textarea placeholder="Disabled" disabled />
```

### With Label

A textarea paired with a label.

```svelte
<label for="message">Your message</label>
<Textarea id="message" placeholder="Your message here..." />
```

### With Text

A textarea with additional descriptive text.

```svelte
<label for="message">Your message</label>
<Textarea id="message" placeholder="Your message here..." />
<p class="text-sm text-muted-foreground">Your message will be copied to the support team.</p>
```

### With Button

A textarea combined with a button.

```svelte
<div class="flex flex-col gap-2">
	<Textarea placeholder="Type your message here..." />
	<button class="btn">Send message</button>
</div>
```

### Form

A textarea within a form submission context.

```svelte
<form class="space-y-4">
	<div>
		<label for="bio" class="block text-sm font-medium leading-6"> Bio </label>
		<Textarea
			id="bio"
			name="bio"
			placeholder="You can @mention other users and organizations."
			class="mt-1 block w-full rounded-md border-0 text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:ring-2 focus:ring-accent"
		/>
	</div>
	<button type="submit" class="btn">Submit</button>
</form>
```

---

## Component Source

The component source can be found in the project's `src/lib/components/ui/textarea` directory.

---

## Special Sponsor

We're looking for one partner to be featured here. Support the project and reach thousands of developers.

---

## Built by

This component is part of the Shadcn-Svelte library, ported to Svelte by Huntabyte & CokaKoala.

```

This documentation structure maintains all original examples, code snippets, and sections while organizing them into a clean, markdown-based format. The code blocks are properly formatted with syntax highlighting hints, and the flow follows the original content's hierarchy. The footer and sponsor information are preserved at the end.
```
