# Styling APIs

Prefer the Vue package CSS entry (mirrors React):

```ts
import '@verbb/plugin-kit-vue/style.css';
```

That sheet pulls in web tokens, FOUCE cloak, and overlay light-DOM chrome. You can still import `@verbb/plugin-kit-web/plugin-kit.css` directly when you want the full web bundle.

## Tailwind

| Import | Role |
| --- | --- |
| `@verbb/plugin-kit-vue/tailwind-theme.css` | Theme tokens for Tailwind v4 |
| `@verbb/plugin-kit-vue/tailwind-preflight-scope.css` | Scoped preflight for CP embeds |

## Vite dev aliases

```ts
import { getPluginKitVueViteDevAliases } from '@verbb/plugin-kit-vue/vite-dev';

export default defineConfig({
    resolve: {
        alias: [
            ...getPluginKitVueViteDevAliases(),
            // …
        ],
    },
});
```

## Shadow DOM

If your app renders inside a shadow root, inject the package CSS into that same shadow root via [`mountShadowApp`](./app-apis.md#mountshadowapp). Keep a document-level `style.css` (or `plugin-kit.css`) import too, so FOUCE cloaking hides unupgraded tags before the shadow tree mounts.

Overlays render through the native Popover API top layer; there is no portal class hook for styling them.

## Related

- [CSS setup](../getting-started/css-setup.md)
- [App APIs](./app-apis.md)
