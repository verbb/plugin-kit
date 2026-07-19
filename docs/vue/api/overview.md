# Overview

This reference follows the package **`exports`** map in `package.json`. Use subpath imports; the package root re-exports components plus the app helpers (`PluginKitProvider`, `mountShadowApp`, …).

| Section | Import prefix | Scope |
| --- | --- | --- |
| [App APIs](./app-apis.md) | `@verbb/plugin-kit-vue`, `/app` | `PluginKitProvider`, `mountShadowApp`, `configurePluginKitVue`, `createCraftHostBridge` |
| [Styling APIs](./styling-apis.md) | CSS + build | `style.css`, Tailwind bridge files, `vite-dev` |

Also exported (same roles as React; dedicated Vue API pages may follow):

| Import prefix | Scope |
| --- | --- |
| `@verbb/plugin-kit-vue/hooks` | `useTranslation` |
| `@verbb/plugin-kit-vue/utils` | `cn`, app config re-exports, host bridge, translation setters |
| `@verbb/plugin-kit-vue/fault` | `AppFaultProvider`, boundary, fallback, watchdog, support bundle |

SchemaForm APIs (`@verbb/plugin-kit-vue/forms`) live under **[Forms → API Reference](/forms/api/form-apis)** (import the Vue package path in Vue apps):

- [Form APIs](/forms/api/form-apis)
- [SchemaForm API](/forms/api/schema-form-api)
- [SchemaForm Registry](/forms/api/schema-form-registry)

Components import from `@verbb/plugin-kit-vue/components` — see the [component docs](/vue/components/button).

## Stability

The **components** and **forms** surfaces track the web-component and SchemaForm contracts. **`PluginKitProvider`**, **`configurePluginKitVue`**, and **`createCraftHostBridge`** are the stable integration points.

## Versioning

Package version is SemVer on npm; breaking changes may land in **0.x** without lengthy deprecation. Pin versions in plugin `package.json` when shipping CP bundles.
