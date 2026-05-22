# Compose a Form with Field Primitives

Use this recipe when the form is entirely React-owned and does not need SchemaForm.

This is the canonical guide for a bespoke CP form where:

- the field list is small and stable
- the structure does not come from PHP schema
- you want to compose the UI by hand in JSX
- you still want consistent labels, instructions, validation, and save behavior

If the screen should be defined in PHP or grow into a schema-driven editor, stop here and use [Build a Settings Screen](./build-a-settings-screen.md) instead.

## What you are building

In this recipe, you will:

1. keep the form state in normal React state
2. render the fields with `FieldLayout`
3. validate the values before submit
4. post the payload back to Craft
5. show field-level server errors in the same UI

This is the right pattern for a small custom screen that is easier to hand-build than describe as SchemaForm schema.

## 1. Start with a normal React form component

Create one component that owns the form values and errors.

```tsx
import { useState } from 'react';
import { Button, Input, Lightswitch, Textarea } from '@verbb/plugin-kit-react/components';
import { FieldLayout } from '@verbb/plugin-kit-react/forms';
import { hostRequest, validateFormValues } from '@verbb/plugin-kit-react/utils';

const validationSchema = [
  {
    name: 'title',
    label: 'Title',
    required: true,
    validation: 'required|min:3',
  },
  {
    name: 'notes',
    label: 'Notes',
    validation: 'max:120',
  },
];

export function SettingsPanel() {
  const [values, setValues] = useState({
    title: '',
    enabled: false,
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const updateValue = <K extends keyof typeof values>(key: K, nextValue: (typeof values)[K]) => {
    setValues((current) => ({
      ...current,
      [key]: nextValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clientErrors = validateFormValues(validationSchema, values)?.fields ?? {};

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});

    try {
      await hostRequest('POST', 'my-plugin/settings/save', {
        data: values,
      });
    } catch (error) {
      const responseErrors = (error as {
        response?: { data?: { errors?: Record<string, string[]> } };
      }).response?.data?.errors ?? {};

      setErrors(responseErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <FieldLayout
        name="title"
        label="Title"
        instructions="Shown at the top of the widget."
        required
        errors={errors.title ?? []}
      >
        <Input
          value={values.title}
          onChange={(event) => {
            updateValue('title', event.currentTarget.value);
          }}
          aria-invalid={errors.title?.length ? true : undefined}
        />
      </FieldLayout>

      <FieldLayout
        name="enabled"
        label="Enabled"
        instructions="Turn this on before the widget is shown."
        errors={errors.enabled ?? []}
      >
        <Lightswitch
          checked={values.enabled}
          onCheckedChange={(checked) => {
            updateValue('enabled', Boolean(checked));
          }}
        />
      </FieldLayout>

      <FieldLayout
        name="notes"
        label="Notes"
        instructions="Optional internal notes for the editor."
        errors={errors.notes ?? []}
      >
        <Textarea
          rows={4}
          value={values.notes}
          onChange={(event) => {
            updateValue('notes', event.currentTarget.value);
          }}
          aria-invalid={errors.notes?.length ? true : undefined}
        />
      </FieldLayout>

      <div>
        <Button type="submit" variant="primary">Save</Button>
      </div>
    </form>
  );
}
```

This is the recommended pattern:

- `useState()` owns the values
- `errors` is a `path -> string[]` map
- `FieldLayout` gives each control the standard SchemaForm-style field UI
- `validateFormValues()` runs the same validation language used elsewhere in the package

## 2. Use `FieldLayout` for every field

`FieldLayout` is the standard wrapper when you want hand-built forms to feel like the rest of the package.

It handles:

- the field label
- instructions
- required marker
- inline errors

That means your bespoke form can still look and behave like the package's built-in field screens, even though you are not using SchemaForm.

## 3. Keep validation close to the component

For a bespoke form, define a small validation schema right next to the component and run `validateFormValues()` before submit.

That gives you:

- required validation
- shared rule strings such as `required`, `min`, and `max`
- field-level error messages in the same `errors` shape used by SchemaForm

Do that first, then send the request.

## 4. Return server errors in the same shape

On the Craft side, return validation errors as a simple path map:

```php
return $this->asJson([
    'success' => false,
    'errors' => $settingsModel->getErrors(),
]);
```

Because your React component already stores errors as `Record<string, string[]>`, you can set those server errors directly into state and show them in the matching `FieldLayout`.

## 5. When this recipe is the right choice

Stay with field primitives when:

- the form is short
- the fields are fully React-owned
- the structure is not being built in PHP
- you want exact JSX control over the layout

Move to SchemaForm when:

- PHP should define the field structure
- the screen has conditional sections
- the form grows large enough that hand-built JSX becomes repetitive
- you want custom schema fields or schema components to participate in one system

When that happens, switch to [Build a Settings Screen](./build-a-settings-screen.md).
