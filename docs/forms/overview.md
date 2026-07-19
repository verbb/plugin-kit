# SchemaForm overview

SchemaForm lets a Craft plugin define a form as structured data, pass that data to React, and let the engine render fields, track values, run validation, and handle conditional sections.

Use it when a settings screen, modal, or plugin UI is easier to describe as a schema than as hand-written React fields.

## The full flow

A typical SchemaForm integration has four parts:

1. Build a schema, usually in PHP.
2. Send the schema and starting values to your React app.
3. Create a form engine with `useSchemaFormEngine()`.
4. Render `SchemaFormEngine` and save the submitted values.

The schema can include fields, layout components, and simple HTML-style content. The [Schema Structure](./schema-structure.md) page covers the full shape, but the examples below show the normal start-to-finish path.

## Define the schema in PHP

Most plugin screens build the schema on the PHP side, where labels can be translated and default values can come from Craft models or settings.

```php
$schema = [
    [
        '$el' => 'h2',
        'attrs' => [
            'class' => 'text-lg font-semibold',
        ],
        'children' => Craft::t('my-plugin', 'Display settings'),
    ],
    [
        '$field' => 'text',
        'name' => 'title',
        'label' => Craft::t('my-plugin', 'Title'),
        'instructions' => Craft::t('my-plugin', 'Shown at the top of the widget.'),
        'required' => true,
        'validation' => 'required|min:3',
    ],
    [
        '$field' => 'lightswitch',
        'name' => 'showHelpText',
        'label' => Craft::t('my-plugin', 'Show help text'),
    ],
    [
        '$field' => 'text',
        'name' => 'helpText',
        'label' => Craft::t('my-plugin', 'Help text'),
        'if' => 'showHelpText == true',
    ],
];

$formConfig = [
    'schema' => $schema,
    'values' => [
        'title' => $settings->title ?? '',
        'showHelpText' => (bool)($settings->showHelpText ?? false),
        'helpText' => $settings->helpText ?? '',
    ],
];
```

Encode that data into the control panel page however your React app already receives bootstrapped data.

## Render the schema in React

Once React has the compiled `schemaIndex` and starting values, the component code stays small.

```tsx
import { SchemaFormEngine, useSchemaFormEngine } from '@verbb/plugin-kit-react/forms';

const form = useSchemaFormEngine({
    schemaIndex,
    defaultValues: initialValues,
    errors: serverErrors,
});

form.onSubmit(async (values) => {
    await save(values);
});

return <SchemaFormEngine form={form} />;
```

That is the normal consumer flow: pass the compiled schema, pass starting values, optionally pass server errors, register a submit handler, and render the engine.

## Minimal working example

If you want to control the surrounding layout yourself, render SchemaForm with `withoutForm`, wrap it in your own native `<form>`, and place the submit button wherever the screen needs it.

The example below shows a small working SchemaForm with a submit button, live form values, and the last submitted payload.

<ComponentPreview src="./examples/schema-form-working-example.preview.tsx" />

## Save submitted values

`SchemaFormEngine` renders a native `<form>` by default, so submitting it runs through the engine's validation and submit flow.

Attach save logic with `form.onSubmit()`:

```tsx
form.onSubmit(async (values) => {
    await window.Craft.sendActionRequest('POST', 'my-plugin/settings/save', {
        data: values,
    });
});
```

If the server responds with validation errors, pass them back into the `errors` option so SchemaForm can show each error against the correct field.

## React to value changes

Use `onChange` when surrounding UI needs to react to form values, or when you want to mirror the payload for debugging.

```tsx
const form = useSchemaFormEngine({
    schemaIndex,
    defaultValues: initialValues,
    onChange: (values) => {
        console.log(values);
    },
});
```

Most screens only need `schemaIndex`, `defaultValues`, and a submit handler. Add `errors` and `onChange` when the screen needs them.

## Render inside an existing form

If the page already has its own outer `<form>`, tell SchemaForm not to render another one:

```tsx
<SchemaFormEngine form={form} withoutForm />
```

Use this when SchemaForm is only one section of a larger custom React screen.

## Related pages

- [Schema Structure](./schema-structure.md) explains `$field`, `$cmp`, `$el`, and the common schema keys.
- [Conditions](./conditions.md) covers `if`, validation, and conditional schema behavior.
- [Schema Components](./schema-components.md) and [Schema Fields](./schema-fields.md) explain the main extension surfaces.
- [SchemaForm API](./api/schema-form-api.md) lists the full engine options and methods.
