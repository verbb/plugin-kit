# Public Utilities

Import from **`@verbb/plugin-kit-react/utils`** (`src/utils/index.ts`).

This page covers the utility surface added by `plugin-kit-react`, plus the fact that the barrel also re-exports `@verbb/plugin-kit`.

## From `@verbb/plugin-kit`

The barrel re-exports **`export * from '@verbb/plugin-kit'`**. Anything documented for base plugin-kit remains available here; this page lists **additions** in plugin-kit-react.

## Classes / styling

| Symbol | Module | Notes |
| --- | --- | --- |
| `cn` | `utils/classes.ts` | `clsx` + `tailwind-merge` helper for components. |

## App configuration

| Symbol | Notes |
| --- | --- |
| `configurePluginKitReact` | Portal + i18n + host bridge setup. |
| `PluginKitReactConfig` | Options type for `configurePluginKitReact`. |
| `createCraftHostBridge` | Craft CP bridge factory. |

## Host bridge

| Symbol | Notes |
| --- | --- |
| `setHostBridge`, `getHostBridge` | Merge / read global bridge. |
| `hostRequest`, `hostOpenElementSelector`, `hostFormatDate`, `hostGetTimepickerOptions`, `hostGetLocale` | Call through configured bridge. |
| `HostRequestMethod`, `HostRequestConfig`, `HostElementSelectorOptions`, `HostSelectedElement`, `PluginKitReactHostBridge` | Types. |

## Portals

| Symbol | Notes |
| --- | --- |
| `setPortalClassName`, `getPortalClassName` | Class for portaled UI. |
| `setPortalContainer`, `getPortalContainer` | Shadow root / element target. |
| `setShadowRootSelectors`, `getShadowRootSelectors` | Host lookup helpers. |
| `getPortalTargetForAppend` | Resolved append target. |

## Translation

| Symbol | Notes |
| --- | --- |
| `setTranslationCategory`, `setTranslateFunction`, `translate` | CP / test overrides. |
| `TranslateParams` | String map type. |

## Schema helpers

| Symbol | Notes |
| --- | --- |
| `evaluateCondition`, `traverseSchema`, `extractFields`, `extractFieldNames`, `normalizeAttrs` | `utils/schema.ts` |
| `getSchemaFieldNames` | `utils/schemaFieldNames.ts` |
| `createSchemaFieldIndex`, `hasSchemaErrors` | `utils/schemaIndex.ts` |
| `getSchemaFieldIndex`, `hasSchemaErrorsCached` | `utils/schemaIndexCache.ts` |
| `normalizeSchemaNode` | `utils/schemaNormalize.ts` |

## Validation

| Symbol | Notes |
| --- | --- |
| `validateFormValues` | Valibot validation from schema + values → `{ fields }` map. |

## Handles

| Symbol | Notes |
| --- | --- |
| `buildUniqueHandleFromSource`, `getDynamicReservedHandles` | `utils/handle.ts` |

## Rich text

| Symbol | Notes |
| --- | --- |
| `getRichTextHtml`, `getRichTextText` | `utils/tiptap.ts` |

## Time

| Symbol | Notes |
| --- | --- |
| `generateTimeOptions`, `clearTimeOptionsCache` | `utils/timeOptions.ts` |

## Store

| Symbol | Notes |
| --- | --- |
| `zustandHmrFix` | HMR helper for Zustand-like stores in Vite. |

## Example

```ts
import {
  cn,
  configurePluginKitReact,
  createCraftHostBridge,
  evaluateCondition,
  validateFormValues,
} from '@verbb/plugin-kit-react/utils';
```

## Related

- [React App APIs](./react-app-apis.md)
- [SchemaForm API](./schema-form-api.md)
- [Styling APIs](./styling-apis.md)
