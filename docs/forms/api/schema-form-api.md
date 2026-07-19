# SchemaForm API

Import from **`@verbb/plugin-kit-react/forms`**.

This is the canonical API reference for the schema engine itself.

Use this page when you need the exact hook, component, or engine-surface reference. For the conceptual setup flow, start in the [`SchemaForm` guide](../overview.md).

## `useSchemaFormEngine(options)`

Returns a **`SchemaFormEngineApi`** instance.

### Options

| Option | Type | Notes |
| --- | --- | --- |
| `schemaIndex` | `SchemaIndex \| null` | Required when the form engine runs. Includes `schema` and `fieldEntries`. |
| `defaultValues` | `Record<string, unknown>` | Initial store values. |
| `errors` | various | Server-side errors normalized to `path -> string[]`. |
| `onChange` | `(values, form) => void` | Fires when store values change. |
| `getConditionContext` | `(values, field?) => Record<string, unknown>` | Extra condition scope for `if`. |
| `parentForm` | `SchemaFormEngineApi \| null` | Registers a nested form when paired with `parentPath`. |
| `parentPath` | `string` | Path under the parent store. |

## `SchemaFormEngineApi`

| Member | Purpose |
| --- | --- |
| `schema` | Normalized renderable tree. |
| `index` | Compiled `SchemaIndex` with `fieldEntries`. |
| `store` | `FormStateStore` for values and errors. |
| `Field` | Render prop helper: `form.Field name="path"`. |
| `getFieldValue` / `setFieldValue` | Path-based accessors. |
| `getErrorMapFields` | Current errors map. |
| `getGroupedErrorsForPath` | Aggregated messages for nested/complex fields. |
| `handleSubmit` | Validate, merge nested errors, and invoke lifecycle handlers. |
| `onSubmit` / `onError` / `onSuccess` / `onChange` | Register lifecycle handlers. |
| `registerNestedForm` / `unregisterNestedForm` | Nested form support. |
| `SchemaRenderer` | Advanced internal renderer access. |

## `SchemaFormEngine`

```tsx
<SchemaFormEngine form={form} className="space-y-4" />
<SchemaFormEngine form={form} withoutForm />
```

- Forwards **`ref`** to the same `SchemaFormEngineApi`.
- `withoutForm` renders a wrapper without creating a native `<form>`.

## Schema node shape

Common schema keys include:

- `$field`
- `$cmp`
- `$el`
- `name`
- `label`
- `validation`
- `required`
- `if`
- `hideOnIf`
- `children`
- `schema`
- `attrs`
- `props`

## Example

```tsx
import { SchemaFormEngine, useSchemaFormEngine } from '@verbb/plugin-kit-react/forms';

const form = useSchemaFormEngine({
  schemaIndex,
  defaultValues: initialData,
  errors: flashErrors,
});

form.onSubmit(async (values) => {
  await window.Craft.sendActionRequest('POST', 'my-plugin/save', {
    body: values,
  });
});

return <SchemaFormEngine form={form} />;
```

## Internal vs public

The schema engine lives under `src/forms/engine/`, but not everything there is public API.

Treat these as implementation details unless you maintain the package itself:

- `FormStateStore`
- `createValidationEngine`
- `normalizeSchema`
- file-local internals such as `SchemaProvider`

## Related

- Read [Form APIs](./form-apis.md) for the broader `forms` export surface.
- Read [SchemaForm Registry](./schema-form-registry.md) for field/component registration.
- Read the [SchemaForm guide](../overview.md) for the user journey.
