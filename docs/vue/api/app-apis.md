# App APIs

```ts
import {
  PluginKitProvider,
  mountShadowApp,
  configurePluginKitVue,
  createCraftHostBridge,
} from '@verbb/plugin-kit-vue/app';
```

These are also re-exported from `@verbb/plugin-kit-vue`.

## `PluginKitProvider`

Wraps the Vue tree and applies Plugin Kit config (translation, shadow/scroll-lock settings, optional host bridge).

```ts
import { createApp, h } from 'vue';
import { PluginKitProvider } from '@verbb/plugin-kit-vue';
import App from './App.vue';

createApp({
  setup() {
    return () => h(PluginKitProvider, { translationCategory: 'my-plugin' }, {
      default: () => h(App),
    });
  },
}).mount('#app');
```

| Prop | Default | Role |
|------|---------|------|
| `translationCategory` | — | Category for form-engine / Craft translation |
| `translate` | `Craft.t` when present | Custom translator |
| `hostBridge` | — | Opt-in Craft action/selector bridge |
| `portalContainer` | — | ShadowRoot from `mountShadowApp`; enables document scroll-gutter stability for overlay scroll lock |
| `shadowRootSelectors` | `['[data-plugin-kit-shadow-root]']` | Selectors used for overlay scroll-lock scoping inside shadow roots |

Overlays render through the native **Popover API top layer** — no DOM reparenting for positioning. `portalClassName` is deprecated and ignored.

Importing components registers their custom elements — no registration prop.

**`usePluginKitConfig()`** reads the nearest provider config (empty object when absent).

## `mountShadowApp`

```ts
import { mountShadowApp } from '@verbb/plugin-kit-vue/app';

const { mountNode, portalContainer } = mountShadowApp({
  element: '#root',
  styles: [pluginKitStyles, screenStyles],
});
```

Pass `portalContainer` to `PluginKitProvider` so overlay scroll lock stays stable inside the shadow tree.

## `configurePluginKitVue` / `configure`

Same options as the Provider, for chrome slots or reconfigure-without-remount. Prefer the Provider for the main tree.

## `createCraftHostBridge`

```ts
import { createCraftHostBridge } from '@verbb/plugin-kit-vue/app';

hostBridge: createCraftHostBridge()
```

Wires `hostRequest`, `hostOpenElementSelector`, and related helpers to `window.Craft`. Only needed when those helpers are used.
