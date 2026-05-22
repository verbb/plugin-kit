# Form APIs

Import from **`@verbb/plugin-kit-react/forms`** (`src/forms/index.ts`).

This page is the high-level index for the `forms` export surface. For detailed SchemaForm engine and registry reference, use the dedicated pages linked below.

## Schema engine

| Export | Kind | Notes |
| --- | --- | --- |
| `useSchemaFormEngine` | Hook | Builds `SchemaFormEngineApi`; requires `schemaIndex`. |
| `SchemaFormEngine` | Component | Renders schema; optional `<form>` wrapper. |

Detailed reference: [SchemaForm API](./schema-form-api.md)

## Registry

| Export | Notes |
| --- | --- |
| `registerFormField`, `registerFormFields` | Field type → component. |
| `registerFormComponent`, `registerFormComponents` | `$cmp` → component. |
| `getFormFieldRegistry`, `getFormComponentRegistry` | Introspection / HMR. |

Detailed reference: [SchemaForm Registry](./schema-form-registry.md)

## Field binding helpers

| Export | Notes |
| --- | --- |
| `useEngineField` | Subscribe to value + errors for a path. |
| `useEditableTableFieldBinding` | Table row/cell error aggregation. |

These are most useful when building custom schema fields.

## Field helpers (`Field.tsx`)

`FieldRoot`, `FieldHeader`, `FieldLabel`, `FieldInstructions`, `FieldControl`, `FieldErrors`, `FieldLayout`, `InlineFieldErrorVisibilityContext`, `useFieldContext`.

## Variable categories

`VariableCategoriesProvider`, `useVariableCategoriesContext`.

## Built-in fields and schema components

Individual field/component implementations live under `src/forms/fields/*` and `src/forms/components/*`. They are bundled through **`registry.ts`** defaults; you typically do not import them unless overriding or testing.

## Example

```ts
import {
  useSchemaFormEngine,
  SchemaFormEngine,
  registerFormFields,
  FieldLayout,
} from '@verbb/plugin-kit-react/forms';
```

## Related

- [SchemaForm API](./schema-form-api.md)
- [SchemaForm Registry](./schema-form-registry.md)
- [SchemaForm guide](../forms/overview.md)
