````markdown
# Strict Mode

By default, Superforms is forgiving of missing fields in the submitted data, assuming that fields may be added to the form later. However, you can enforce stricter validation by enabling **strict mode**. This ensures that all required fields in the schema must be present in the submitted data.

### Behavior in Strict Mode:

- **Missing required fields** are treated as validation errors.
- **Errors** are displayed using the default error messages (customizeable via the `errors` option).
- **Checkboxes**: Since unchecked checkboxes aren’t submitted, include a hidden input with the same name (value `false`) to avoid validation failures.

#### Example: Enabling Strict Mode

```javascript
// In your action handler
const form = await superValidate(request, zod(schema), { strict: true });
```
````

#### Handling Checkboxes in Strict Mode

```html
<!-- Add a hidden input for checkboxes -->
<input type="hidden" name="agree" value="false" />
<input type="checkbox" name="agree" value="true" />
```

---

# Catch-All Schema (Zod Example)

To allow unknown fields in the submitted data (e.g., dynamic or extra fields), use Zod’s `catchall()` method. This ensures any unexpected fields conform to a specified type.

#### Example: Validating All Unknown Fields as Integers

```javascript
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define the schema with a catch-all rule
const schema = z
	.object({
		name: z.string().min(1)
	})
	.catchall(z.number().int()); // All unknown fields must be integers

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// Access known and unknown fields
		console.log(form.data.name); // Typed as string
		console.log(form.data.first); // Typed as number
		console.log(form.data.second); // Typed as number

		return { form };
	}
};
```

### Explanation:

- **Schema Definition**: The `catchall()` method specifies that any fields not explicitly defined in the schema must match the provided type (e.g., `number().int()`).
- **Typed Access**: Known fields (like `name`) retain their original type, while unknown fields are typed according to the catch-all rule.

```

This documentation maintains all original examples and explanations while reorganizing the content into clear sections with code blocks and notes. The checkbox workaround and Zod catch-all example are preserved and formatted for readability.
```
