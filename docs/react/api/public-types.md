# Public Types

Types are exported from compiled **`.d.ts`** files alongside the compiled modules.

Prefer importing values from the relevant subpath and importing types only when you need them explicitly.

```ts
import type { SchemaFormEngineApi } from '@verbb/plugin-kit-react/forms';
```

This page highlights the public types consumers are most likely to rely on.

## Forms / engine (`@verbb/plugin-kit-react/forms`)

- **`FormValues`** — `Record<string, unknown>` store payload.
- **`SchemaFieldApi`** — `{ state, handleChange, handleBlur, errors }` render-prop field handle.
- **`SchemaFieldRenderProps`** — `Field` wrapper props.
- **`SchemaFormFieldComponent`**, **`SchemaFormFieldComponentProps`** — registry field contract.
- **`SchemaFormComponent`**, **`SchemaFormComponentProps`** — registry component contract (`usesSchemaNode?`).
- **`NestedFormApi`** — nested validation bridge.
- **`SchemaFormEngineApi`** — full engine surface from `useSchemaFormEngine`.
- **`SchemaEngineContext`**, **`useSchemaEngineContext`** — context accessor.
- **`DateTimeParts`** — `parseDateTimeParts` / `formatDateTimeParts` shape.
- **`AssertSchemaRegistryOptions`**, **`SchemaRegistryIssue`** — registry assertion helpers.

Node/index shapes (**`SchemaNode`**, **`SchemaRenderable`**, **`FieldEntry`**, **`SchemaIndex`**) originate in **`@verbb/plugin-kit-forms`**.

## Utils (`@verbb/plugin-kit-react/utils`)

- **`PluginKitReactConfig`**, **`PluginKitProviderProps`**, **`TranslateFunction`** — app configuration.
- **`MountShadowAppOptions`**, **`ShadowAppMount`** — `mountShadowApp`.
- **`PluginKitHostBridge`**, **`HostRequestMethod`**, **`HostRequestConfig`**, **`HostElementSelectorOptions`**, **`HostSelectedElement`** — host bridge.
- **`PortalContainer`** — legacy portal container type (see [Public Utilities](./public-utilities.md#portals-legacy-compatibility)).
- **`TranslateParams`** — translation params map.

## Fault (`@verbb/plugin-kit-react/fault`)

- **`AppFaultProviderProps`**, **`FaultFallbackProps`**, **`ResetUiButtonProps`**
- **`AppFaultContext`**, **`AppFaultKind`**, **`AppFaultRecord`**
- **`UiWatchdogOptions`**

## Exhaustive signatures

For the full exported type surface, inspect the built **`dist/*.d.ts`** files after `npm run build`.

## Related

- [Form APIs](/forms/api/form-apis)
- [SchemaForm API](/forms/api/schema-form-api)
- [Public Utilities](./public-utilities.md)
