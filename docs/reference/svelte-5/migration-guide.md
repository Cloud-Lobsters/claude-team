Below is a sample documentation generated from the provided Svelte migration guide text. You can adjust or expand any section as needed.

---

# Svelte 5 Migration Guide Documentation

This documentation covers the key changes, new syntax, and migration steps introduced in Svelte 5. It is intended for developers upgrading from Svelte 4 to Svelte 5 and provides detailed examples and explanations of each major update.

---

## Table of Contents

1. [Overview](#overview)
2. [Reactivity Syntax Changes](#reactivity-syntax-changes)
   - [$state for reactive variables](#state-for-reactive-variables)
   - [$derived and $effect for computed values and side effects](#derived-and-effect-for-computed-values-and-side-effects)
3. [Component Properties and Exports](#component-properties-and-exports)
   - [Declaring Props with $props](#declaring-props-with-props)
   - [Handling Bindings](#handling-bindings)
4. [Event Handling Changes](#event-handling-changes)
   - [Event Handlers as Properties](#event-handlers-as-properties)
   - [Component Event Callbacks](#component-event-callbacks)
   - [Event Modifiers and Multiple Handlers](#event-modifiers-and-multiple-handlers)
5. [Content Passing: Snippets Instead of Slots](#content-passing-snippets-instead-of-slots)
6. [Migration Script](#migration-script)
7. [Component Instantiation Changes](#component-instantiation-changes)
8. [HTML and CSS Adjustments](#html-and-css-adjustments)
   - [Whitespace Handling](#whitespace-handling)
   - [Scoped CSS and Selector Changes](#scoped-css-and-selector-changes)
9. [Other Breaking Changes and Legacy Adjustments](#other-breaking-changes-and-legacy-adjustments)
10. [Frequently Asked Questions](#frequently-asked-questions)

---

## Overview

Svelte 5 introduces an overhauled syntax and reactivity system aimed at making the framework simpler and more explicit. Although some changes may seem drastic, Svelte 5 maintains many similarities with previous versions. Developers can mix Svelte 4 and Svelte 5 components during migration, and an automated migration script is available to handle many of the repetitive transformations.

---

## Reactivity Syntax Changes

### $state for Reactive Variables

- **Svelte 4:** Implicit reactivity using `let`.
- **Svelte 5:** Explicit reactivity using the `$state` rune.  
   **Example:**
  ```svelte
  <script>
  	let count = $state(0);
  </script>
  ```

### $derived and $effect for Computations and Side Effects

- **Computed Values:**  
   In Svelte 4, `$:` was used for derivations. In Svelte 5, use `$derived`:
  ```svelte
  <script>
  	let count = $state(0);
  	// Derived value
  	const double = $derived(count * 2);
  </script>
  ```
- **Side Effects:**  
   Svelte 5 uses `$effect` for side effects:
  ```svelte
  <script>
  	let count = $state(0);
  	$: $effect(() => {
  		if (count > 5) {
  			alert('Count is too high!');
  		}
  	});
  </script>
  ```

---

## Component Properties and Exports

### Declaring Props with $props

- **Svelte 4:** Use `export let` for each prop.
- **Svelte 5:** Use the `$props` rune for destructuring all properties.  
   **Example:**
  ```svelte
  <script>
  	// Default values and required props
  	let { optional = 'unset', required } = $props();
  </script>
  ```
- **Advanced Prop Cases:**
  - **Renaming:**
    ```svelte
    let { class: klass } = $props();
    ```
  - **Spreading other properties:**
    ```svelte
    let { foo, bar, ...rest } = $props();
    ```
  - **Forwarding all properties:**
    ```svelte
    let props = $props();
    ```

### Handling Bindings

Bindings to component exports require explicit definition with the `$bindable()` rune. In runes mode, exports cannot be directly bound. Instead, bind the component instance using `bind:this` and access exports as properties.

---

## Event Handling Changes

### Event Handlers as Properties

- **Old Syntax (Svelte 4):**
  ```svelte
  <button on:click={() => count++}>Click me</button>
  ```
- **New Syntax (Svelte 5):**  
   Event handlers become properties:

  ```svelte
  <script>
  	let count = $state(0);
  </script>

  <button onclick={() => count++}>
  	Clicks: {count}
  </button>
  ```

You can also use shorthand by passing a named function:

```svelte
<script>
	let count = $state(0);
	function handleClick() {
		count++;
	}
</script>

<button {handleClick}>
	Clicks: {count}
</button>
```

### Component Event Callbacks

- **Svelte 4:** Used `createEventDispatcher` to emit events.
- **Svelte 5:** Components should now accept callback props.  
   **Example in Parent Component:**

  ```svelte
  <script>
  	import Pump from './Pump.svelte';
  	let size = $state(15);
  	let burst = $state(false);
  	function reset() {
  		size = 15;
  		burst = false;
  	}
  </script>

  <Pump
  	on:inflate={(power) => {
  		size += power.detail;
  		if (size > 75) burst = true;
  	}}
  	on:deflate={(power) => {
  		if (size > 0) size -= power.detail;
  	}}
  />

  {#if burst}
  	<button onclick={reset}>New Balloon</button>
  	<span class="boom">💥</span>
  {:else}
  	<span class="balloon" style="scale: {0.01 * size}"> 🎈 </span>
  {/if}
  ```

### Event Modifiers and Multiple Handlers

- **Event Modifiers:**  
   Since Svelte 5 does not support modifiers in the event attribute (e.g. `onclick|preventDefault`), wrap handlers instead:

  ```svelte
  <script>
  	function preventDefault(fn) {
  		return (event) => {
  			event.preventDefault();
  			fn.call(this, event);
  		};
  	}
  </script>

  <button onclick={preventDefault(handler)}>Click me</button>
  ```

- **Multiple Handlers:**  
   Duplicate event attributes are not allowed. Instead, chain calls within one handler:
  ```svelte
  <button
  	onclick={(e) => {
  		one(e);
  		two(e);
  	}}
  >
  	Click me
  </button>
  ```

---

## Content Passing: Snippets Instead of Slots

- **Svelte 4:** Slots were used to pass content.
- **Svelte 5:** Snippets replace slots to provide enhanced flexibility.

### Using Snippets

- **Child Component Example:**
  ```svelte
  <slot />
  <hr />
  <slot name="foo" message="hello" />
  ```
- **Parent Component Example:**

  ```svelte
  <script>
  	import Child from './Child.svelte';
  </script>

  <Child>
  	Default child content

  	{#snippet foo({ message })}
  		Message from child: {message}
  	{/snippet}
  </Child>
  ```

For multiple content placeholders, use named props and render them with {@render ...}.

---

## Migration Script

A migration script is provided to help automate many of the syntax changes. Running:

```bash
npx sv migrate svelte-5
```

will automatically:

- Update core dependencies.
- Convert `let` declarations to `$state`.
- Update event attributes (e.g. `on:click` to `onclick`).
- Migrate slot creations and usages to snippets.
- Update component instantiation patterns.

For individual component migration, use the VS Code command or the online Playground’s Migrate button.

---

## Component Instantiation Changes

### From Classes to Functions

- **Svelte 4:** Components were classes instantiated via `new Component({ ... })`.
- **Svelte 5:** Components are functions. Use `mount` or `hydrate` for instantiation.  
   **Example:**

  ```js
  import { mount } from 'svelte';
  import App from './App.svelte';

  const app = mount(App, { target: document.getElementById('app') });
  ```

### Replacements for $on, $set, and $destroy

- **Event Binding ($on):**  
   Pass events as callback properties in the instantiation options.
- **Updating Props ($set):**  
   Use reactive properties created via `$state`.
- **Destroying Components ($destroy):**  
   Use `unmount` instead.

A temporary compatibility layer is available via `createClassComponent` from `svelte/legacy` if needed.

---

## HTML and CSS Adjustments

### Whitespace Handling

Svelte 5 uses a simplified algorithm for handling whitespace:

- Collapses whitespace between nodes.
- Trims whitespace at tag boundaries.
- Retains formatting inside `<pre>` tags.

Adjust the compiler’s `preserveWhitespace` option if necessary.

### Scoped CSS and Selector Changes

- **Selector Scoping:**  
   Scoped CSS now uses `:where(...)` for predictable specificity.
- **Hash Position:**  
   The position of the CSS hash is no longer deterministic, so be cautious if you rely on it.
- **Legacy Issues:**  
   Some legacy directives like `@apply` in Tailwind may need adjustments using `:global`.

---

## Other Breaking Changes and Legacy Adjustments

- **Reserved `children` Prop:**  
   The `children` prop is reserved for snippet content.
- **Bindings to Component Exports:**  
   Direct binding is no longer allowed. Use `bind:this` to access exports.
- **ContentEditable Behavior:**  
   Updates to reactive values inside `contenteditable` elements are now controlled solely by the binding.
- **Attribute Syntax:**  
   Complex attribute values must be quoted.
- **HTML Structure:**  
   Svelte 5 enforces stricter HTML structure; invalid HTML that was auto-corrected by browsers will now throw an error.
- **Event Attributes:**  
   Inline event attributes (e.g. `onclick="alert('hello')"`) are no longer supported.
