# Overview

This reference follows the package **`exports`** map in `package.json`. Use subpath imports; the package root re-exports components plus the app helpers (`PluginKitProvider`, `mountShadowApp`, …).

| Section | Import prefix | Scope |
| --- | --- | --- |
| [Public hooks](./public-hooks.md) | `@verbb/plugin-kit-react/hooks` | `useTranslation` |
| [Public utilities](./public-utilities.md) | `@verbb/plugin-kit-react/utils` | `cn`, app config, host bridge, translation setters |
| [Public types](./public-types.md) | Same as hooks/utils/forms | Key TS types consumers rely on |
| [React app APIs](./react-app-apis.md) | `@verbb/plugin-kit-react/utils`, `/fault` | `PluginKitProvider`, `mountShadowApp`, `createCraftHostBridge`, fault boundary |
| [Styling APIs](./styling-apis.md) | CSS + build | `style.css`, Tailwind bridge files, shadow notes |

SchemaForm APIs (`@verbb/plugin-kit-react/forms`) live under **[Forms → API Reference](/forms/api/form-apis)**:

- [Form APIs](/forms/api/form-apis)
- [SchemaForm API](/forms/api/schema-form-api)
- [SchemaForm Registry](/forms/api/schema-form-registry)

## Stability

The **components** and **forms** surfaces are evolving with Formie and sibling plugins; treat **registry keys** and **schema node shapes** as contracts you share with your PHP layer. **`PluginKitProvider`**, **`configurePluginKitReact`**, and **`createCraftHostBridge`** are relatively stable integration points.

## Versioning

Package version is SemVer on npm; breaking changes may land in **0.x** without lengthy deprecation. Pin versions in plugin `package.json` when shipping CP bundles.
