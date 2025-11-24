# Tainted Fields

When form data is modified (via `$form` updates), the form is marked as "tainted" (or "dirty"). Superforms prevents users from losing unsaved changes by intercepting navigation attempts.

---

## Usage

### Basic Configuration

Set the `taintedMessage` option to enable navigation warnings:

```typescript
const { form, enhance } = superForm(data.form, {
	taintedMessage: 'Your changes may be lost!', // Custom message
	// or
	taintedMessage: true, // Default message: "You have unsaved changes."
	// or a custom async function
	taintedMessage: async () => {
		const confirmed = await confirm('Are you sure?');
		return !confirmed; // Return false to block navigation
	}
});
```

### Custom Dialog Example

Implement a modal for navigation confirmation:

```typescript
const { form, enhance } = superForm(data.form, {
  taintedMessage: () => {
    return new Promise((resolve) => {
      modalStore.trigger({
        type: "confirm",
        title: "Do you want to leave?",
        body: "Changes you made may not be saved.",
        response: resolve
      });
    });
  });
});
```

**Example Form:**

```html
<form use:enhance="{form}">
	<input name="name" placeholder="Name *" required />
	<input name="email" placeholder="E-mail *" type="email" required />
	<button type="submit">Submit</button>
</form>
```

> **Note**: Modify the form, then click the back button to see the modal trigger.

---

## Untainting the Form

A successful form submission (with `valid: true` in the response) automatically marks the form as untainted.

```typescript
// Example response from a successful submission
{
  valid: true,
  data: { /* ... */ }
}
```

---

## Check Tainted Status

### Method: `isTainted()`

Use the `isTainted` method to check the form's tainted status:

```typescript
<script lang="ts">
  const { form, isTainted, $tainted } = superForm(form.data);

  // Check the entire form
  if (isTainted()) {
    console.log("Form has unsaved changes");
  }

  // Check a specific field
  if (isTainted("name")) {
    console.log("Name field is modified");
  }
</script>
```

### Reactive Usage

Bind to the reactive `$tainted` store for real-time checks:

```html
<button disabled="{!isTainted($tainted)}">Submit</button>
<!-- Check individual fields -->
<button disabled="{!isTainted($tainted.name)}">Save Name</button>
```

---

## Preventing Tainting

### Silent Updates

Use the `taint` option in `form.update()` to avoid marking fields as tainted:

```typescript
form.update(
	($form) => {
		$form.name = 'New Name';
		return $form;
	},
	{ taint: false }
); // No taint applied
```

### Taint Options

The `taint` option accepts:

- `true` (default): mark as tainted)
- `false`: no taint
- `'untaint'`: mark as clean
- `'untaint-form'`: mark the entire form as clean

---

## Notes

- **Password Managers**: Auto-filled credentials may taint login forms. Use `taint: false` during initialization to avoid this:
  ```typescript
  form.update(initialValues, { taint: false });
  ```

---

## Related Topics

- [Submit Behavior](submit-behavior.md)
- [use:enhance](use-enhance.md)

---

### Table of Contents

- [Usage](#usage)
- [Untainting the Form](#untainting-the-form)
- [Check Tainted Status](#check-tainted-status)
- [Preventing Tainting](#preventing-tainting)

> Found an error? [Contribute](contribute.md) to improve this documentation!
