# Public Utilities

Import from **`@verbb/plugin-kit-react/utils`** (`src/utils/index.ts`).

This surface is intentionally small: app configuration, the Craft host bridge, class merging, and translation setters. Schema/validation helpers live in the form engine packages, not here.

## Classes / styling

| Symbol | Notes |
| --- | --- |
| `cn` | `clsx` + `tailwind-merge` helper for combining class names. |

## App configuration

| Symbol | Notes |
| --- | --- |
| `PluginKitProvider`, `usePluginKitConfig` | Provider-based config for a React tree (preferred). |
| `configure` / `configurePluginKitReact` | Imperative config — secondary mounts (e.g. Craft chrome slots). |
| `mountShadowApp` | Shadow-root mount helper (re-export of the `@verbb/plugin-kit-web` implementation). |
| `createCraftHostBridge` | Craft CP bridge factory for `hostBridge`. |
| `PluginKitReactConfig`, `PluginKitProviderProps`, `TranslateFunction`, `MountShadowAppOptions`, `ShadowAppMount` | Types. |

See [React App APIs](./react-app-apis.md) for usage.

## Host bridge

Re-exported from `@verbb/plugin-kit-core`:

| Symbol | Notes |
| --- | --- |
| `setHostBridge`, `getHostBridge` | Merge / read the global bridge. |
| `hostRequest`, `hostOpenElementSelector`, `hostFormatDate`, `hostGetTimepickerOptions`, `hostGetLocale` | Call through the configured bridge. |
| `HostRequestMethod`, `HostRequestConfig`, `HostElementSelectorOptions`, `HostSelectedElement`, `PluginKitHostBridge` | Types. |

## Portals (legacy compatibility)

Overlays (dialogs, popovers, selects) render through the native **Popover API top layer** — they are not reparented into a portal node, and `portalClassName` is deprecated and ignored.

Two portal-adjacent settings still matter, and both are handled by `PluginKitProvider` / `configurePluginKitReact`:

- **`portalContainer`** — pass the ShadowRoot from `mountShadowApp` so overlay scroll-lock keeps the document gutter stable in embedded hosts (Craft CP).
- **`shadowRootSelectors`** — selectors used to scope overlay scroll-lock inside shadow roots.

The low-level getters/setters (`setPortalClassName`, `getPortalClassName`, `setPortalContainer`, `getPortalContainer`, `getPortalMountNode`, `getPortalTargetForAppend`, `PortalContainer`) remain exported from `@verbb/plugin-kit-core` for compatibility, but new code should not need them.

## Translation

Re-exported from `@verbb/plugin-kit-forms`:

| Symbol | Notes |
| --- | --- |
| `setTranslationCategory`, `setTranslateFunction`, `translate` | CP / test overrides. |
| `TranslateParams` | String map type. |

Prefer configuring these through `PluginKitProvider` (`translationCategory` / `translate` props).

## Where did the schema helpers go?

Earlier versions re-exported schema/validation helpers (`evaluateCondition`, `traverseSchema`, `createSchemaFieldIndex`, `validateFormValues`, …) from this barrel. They now live inside the framework-agnostic form engine package and are consumed internally by SchemaForm — they are no longer part of the public React surface. Use the SchemaForm engine ([Forms API reference](/forms/api/form-apis)) for validation, or hand-roll checks in bespoke forms.

Rich-text, time-option, handle, and store helpers from v1 are no longer part of the public React surface.

## Example

```ts
import {
  cn,
  configurePluginKitReact,
  createCraftHostBridge,
  hostRequest,
} from '@verbb/plugin-kit-react/utils';
```

## Related

- [React App APIs](./react-app-apis.md)
- [Form APIs](/forms/api/form-apis)
- [Styling APIs](./styling-apis.md)
