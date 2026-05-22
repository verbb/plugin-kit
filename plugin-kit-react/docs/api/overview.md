# Overview

This reference follows the package **`exports`** map in `package.json`. Use subpath imports; the package root only re-exports `useTranslation`.

| Section | Import prefix | Scope |
| --- | --- | --- |
| [Public hooks](./public-hooks.md) | `@verbb/plugin-kit-react/hooks` | `useTranslation`, `useKeyboardShortcuts` |
| [Public utilities](./public-utilities.md) | `@verbb/plugin-kit-react/utils` | `cn`, schema helpers, portals, host bridge, validation, + re-exported `@verbb/plugin-kit` |
| [Public types](./public-types.md) | Same as hooks/utils/forms | Key TS types consumers rely on |
| [Form APIs](./form-apis.md) | `@verbb/plugin-kit-react/forms` | Overall `forms` export surface |
| [SchemaForm API](./schema-form-api.md) | `@verbb/plugin-kit-react/forms` | Engine hook, engine component, lifecycle surface |
| [SchemaForm Registry](./schema-form-registry.md) | `@verbb/plugin-kit-react/forms` | Register custom `$field` and `$cmp` types |
| [React app APIs](./react-app-apis.md) | `@verbb/plugin-kit-react/utils` | `configurePluginKitReact`, `createCraftHostBridge`, Craft bootstrap patterns |
| [Styling APIs](./styling-apis.md) | CSS + build | `style.css`, Tailwind/shadow notes |

## Stability

The **components** and **forms** surfaces are evolving with Formie and sibling plugins; treat **registry keys** and **schema node shapes** as contracts you share with your PHP layer. **`configurePluginKitReact`** and **`createCraftHostBridge`** are relatively stable integration points.

## Versioning

Package version is SemVer on npm; breaking changes may land in **0.x** without lengthy deprecation. Pin versions in plugin `package.json` when shipping CP bundles.
