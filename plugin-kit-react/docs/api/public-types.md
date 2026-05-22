# Public Types

Types are exported from compiled **`.d.ts`** files alongside the compiled modules.

Prefer importing values from the relevant subpath and importing types only when you need them explicitly.

```ts
import type { SchemaFormEngineApi } from '@verbb/plugin-kit-react/forms';
```

This page highlights the public types consumers are most likely to rely on.

## Forms / engine (`forms/engine/context.ts`)

- **`FormValues`** — `Record<string, unknown>` store payload.
- **`SchemaFieldApi`** — `{ state, handleChange, handleBlur, errors }` render-prop field handle.
- **`SchemaFieldRenderProps`** — `Field` wrapper props.
- **`SchemaFormFieldComponent`**, **`SchemaFormFieldComponentProps`** — registry field contract.
- **`SchemaFormComponent`**, **`SchemaFormComponentProps`** — registry component contract (`usesSchemaNode?`).
- **`NestedFormApi`** — nested validation bridge.
- **`SchemaFormEngineApi`** — full engine surface from `useSchemaFormEngine`.
- **`SchemaEngineContext`**, **`useSchemaEngineContext`** — context accessor (from engine module in source).

## Schema index (`forms/engine/SchemaIndex.ts`)

- **`SchemaNode`**, **`SchemaRenderable`**, **`FieldEntry`**, **`SchemaIndex`**

## Variable picker (`forms/contexts/VariableCategoriesContext.tsx`)

- **`VariableConfig`**, **`VariableCategoriesGetter`**, **`VariableCategoriesContextValue`**

## Hooks

- **`KeyboardShortcutsConfig`** — `useKeyboardShortcuts` options.

## Utils

- **`PluginKitReactConfig`**, **`TranslateParams`**, **`PluginKitReactHostBridge`**, portal-related types from `utils/portal.ts`.

## `@verbb/plugin-kit`

All types re-exported from base plugin-kit remain available through **`@verbb/plugin-kit-react/utils`**.

## Exhaustive signatures

For the full exported type surface, inspect the built **`dist/*.d.ts`** files after `npm run build`.

## Related

- [Form APIs](./form-apis.md)
- [SchemaForm API](./schema-form-api.md)
- [Public Utilities](./public-utilities.md)
