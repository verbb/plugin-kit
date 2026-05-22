# Custom Schema Fields

Custom schema fields let you teach SchemaForm a new `$field` type.

## Field anatomy

Most custom schema fields follow the same shape:

1. Read the current value from the form engine.
2. Update the value when the input changes.
3. Render the field UI such as label, instructions, and errors.
4. Register the field under a `$field` name.

The package's `FieldLayout` helper is useful here because it gives your custom field the same label, instruction, and error presentation as the built-in fields.

## React field example

```tsx
import { Input } from '@verbb/plugin-kit-react/components';
import { FieldLayout, useEngineField } from '@verbb/plugin-kit-react/forms';
import type { SchemaFormFieldComponent } from '@verbb/plugin-kit-react/forms/engine/context';

const ApiTokenField: SchemaFormFieldComponent = ({ form, field }) => {
  const { value, setValue, errors } = useEngineField(form, field.name);

  return (
    <FieldLayout
      name={field.name}
      label={field.label}
      instructions={field.instructions}
      errors={errors}
      required={field.required}
    >
      <Input
        value={String(value ?? '')}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
      />
    </FieldLayout>
  );
};
```

This example shows the core pattern:

- `useEngineField()` connects the field to the SchemaForm store
- `FieldLayout` renders the shared field UI
- your input writes back through `setValue()`

## Register it during bootstrap

```ts
import { registerFormFields } from '@verbb/plugin-kit-react/forms';

registerFormFields({
  apiToken: ApiTokenField,
});
```

Like custom schema components, this should happen before your React app renders the SchemaForm screen.

## Reference it from PHP schema

```php
$schema[] = [
    '$field' => 'apiToken',
    'name' => 'apiToken',
    'label' => Craft::t('my-plugin', 'API token'),
    'instructions' => Craft::t('my-plugin', 'Paste the token from your external service.'),
];
```

That is the full loop:

1. PHP outputs `$field => 'apiToken'`
2. React registers `apiToken`
3. SchemaForm renders your custom field when it sees that schema node

## When to use `FieldLayout`

You do not have to use `FieldLayout`, but it is usually the right default when you want your custom field to feel consistent with the rest of SchemaForm.

It handles:

- labels
- instructions
- inline errors
- required state

If your field needs a more unusual structure, you can build your own field layout with the lower-level field helpers, but most consumers should start with `FieldLayout`.

## Related

- Read [Schema Fields](./schema-fields.md) for the broader field model.
- Read [SchemaForm Registry](../api/schema-form-registry.md) for the registration APIs.
- Browse the built-in schema field pages in this section for implementation patterns you can copy.
