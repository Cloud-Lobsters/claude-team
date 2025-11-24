````markdown
# Superforms Events and Callbacks

Superforms provides several events to control the form submission process. These events are triggered during form submission and can be used to customize behavior. Events require JavaScript and the `use:enhance` directive.

---

## Event Flowchart

The event flow is as follows (SPA mode may alter validation flow):

1. onSubmit → 2. Server Response → 3. onResult → 4. onUpdate → 5. onUpdated

---

## Event Usage

### onSubmit

**Triggered when the form is submitted.**  
Cancel submission or modify submission data here.

#### Parameters:

- `action`: Submission URL
- `formData`: Form data (not used if `dataType: 'json'`)
- `formElement`: The HTMLFormElement
- `controller`: AbortController
- `submitter`: The submit button clicked
- `cancel()`: Cancels submission
- **Extras:**
  - `jsonData(data)`: Override submitted JSON data (only for `dataType: 'json'`)
  - `validators(fn)`: Replace client-side validators
  - `customRequest(fn)`: Use a custom request function (e.g., for progress tracking)

#### Example: Posting Only Tainted Fields

```javascript
import { superForm, type FormPath } from 'sveltekit-superforms';

const { form, enhance } = superForm(data.form, {
  dataType: 'json',
  onSubmit({ jsonData }) {
    const taintedData = Object.fromEntries(
      Object.entries($form). filter(([key]) => isTainted(key as FormPath<typeof $form>))
    );
    jsonData(taintedData);
  }
});
```
````

#### Example: Custom Progress Tracking

```javascript
function fileUploadWithProgress(input) {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest();
		xhr.upload.onprogress = (event) => {
			/* ... */
		};
		xhr.onload = () => resolve(xhr);
		xhr.open('POST', input.action);
		xhr.send(input.formData);
	});
}

const { form, enhance } = superForm(data.form, {
	onSubmit({ customRequest }) {
		customRequest(fileUploadWithProgress);
	}
});
```

---

### onResult

**Triggered after server response is received.**  
Modify the result before updating.

#### Parameters:

- `result`: The server's `ActionResult`
- `formElement`: The HTMLFormElement
- `cancel()`: Prevents further processing

#### Common Usage: Handling Redirects

```javascript
const { form, enhance } = superForm(data.form, {
	applyAction: false,
	onResult({ result }) {
		if (result.type === 'redirect') goto(result.location);
	}
});
```

---

### onUpdate

**Triggered before form data is updated.**  
Modify the form state or cancel the update.

#### Parameters:

- `form`: The new form state (modifyable)
- `result`: The server response (narrowed to success/failure)
- `cancel()`: Prevents form update

#### Example: Accessing Server-Sent Data

```javascript
import type { FormResult } from 'sveltekit-superforms';

const { form, enhance } = superForm(data.form, {
  onUpdate({ result }) {
    const actionData = result.data as FormResult<ActionData>;
    if (actionData.extra) doSomething(actionData.extra);
  }
});
```

---

### onUpdated

**Triggered after form is updated.**  
Use for post-processing (e.g., notifications).

#### Parameters:

- `form`: The updated form state (read-only)

#### Example: Success Notification

```javascript
const { form, enhance } = superForm(data.form, {
	onUpdated({ form }) {
		if (form.valid) toast(form.message, { icon: '✅' });
	}
});
```

---

### onError

**Handles server errors.**  
Define how to process errors thrown during submission.

#### Error Types:

| Error Type            | `result.error` Shape  |
| --------------------- | --------------------- |
| Expected error        | `App.Error`           |
| Server exception      | `{ message: string }` |
| JSON response         | Any JSON object       |
| Other (e.g., network) | `Error` instance      |

#### Usage:

```javascript
const { form, enhance, message } = superForm(data.form, {
	onError({ result }) {
		$message = result.error.message || 'Unknown error';
	}
});
```

#### Options:

- `onError: 'apply'` → Use SvelteKit's default error handling (renders +error page)
- `onError: () => {}` → Ignore errors (useful for async handling)

---

## Non-submit Events

### onChange

**Fires on form data changes (not submissions).**  
Distinguish between user input and programmatic changes.

#### Parameters:

- `event`: Event object with:
  - `target`: HTMLInputElement (for user input)
  - `paths`: Modified field paths (for programmatic changes)

#### Example:

```javascript
const { form, enhance } = superForm(data.form, {
	onChange(event) {
		if (event.target) {
			console.log('Input changed:', event.target.name);
		} else {
			console.log('Programmatic change:', event.paths);
		}
	}
});
```

---

## Event Order

1. `onSubmit` → 2. Server Request → 3. `onResult` → 4. `onUpdate` → 5. `onUpdated`

---

## Notes

- Events require `use:enhance` on the form element.
- Use `applyAction: false` to manually handle redirects/errors.
- Always handle errors with `onError` to prevent uncaught exceptions.

```

This documentation maintains all examples and parameters while organizing them into clear sections. The table of error types is formatted as a markdown table, and all code snippets are enclosed in proper code blocks. Event parameters are listed with brief descriptions, and key concepts like `jsonData` and `customRequest` are highlighted in their respective sections.
```
