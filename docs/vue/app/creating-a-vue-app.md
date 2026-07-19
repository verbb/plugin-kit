# Creating a Vue app

Canonical Vue bootstrap is `createApp` plus `PluginKitProvider`. Importing a component from
`@verbb/plugin-kit-vue/components` registers its underlying custom element — there is
no `registerAll` / `createVueApp` step.

```ts
import '@verbb/plugin-kit-web/plugin-kit.css';

import { createApp, h } from 'vue';
import { PluginKitProvider } from '@verbb/plugin-kit-vue';
import App from './App.vue';

createApp({
  setup() {
    return () => h(PluginKitProvider, { translationCategory: 'my-plugin' }, {
      default: () => h(App),
    });
  },
}).mount('#my-plugin-root');
```

`PluginKitProvider` applies shared config (translation category, optional shadow-root
scroll-lock settings, optional Craft host bridge) before children render.

## Shadow DOM

For Craft CP screens that need style isolation from Craft chrome, use `mountShadowApp`:

```ts
import pluginKitStyles from '@verbb/plugin-kit-web/plugin-kit.css?inline';
import screenStyles from './screen.css?inline';
import { createApp, h } from 'vue';
import { mountShadowApp, PluginKitProvider } from '@verbb/plugin-kit-vue/app';
import App from './App.vue';

const { mountNode, portalContainer } = mountShadowApp({
  element: '#my-plugin-root',
  styles: [pluginKitStyles, screenStyles],
});

createApp({
  setup() {
    return () => h(
      PluginKitProvider,
      { translationCategory: 'my-plugin', portalContainer },
      { default: () => h(App) },
    );
  },
}).mount(mountNode);
```

Keep a document-level `@verbb/plugin-kit-web/plugin-kit.css` import for FOUCE before first
paint; inject tokens into the shadow root as above.

## Host bridge

A host bridge gives package utilities a stable way to call Craft (`hostRequest`, element
selector, locale helpers). It is **opt-in**:

```ts
import { createCraftHostBridge, PluginKitProvider } from '@verbb/plugin-kit-vue/app';

h(PluginKitProvider, {
  translationCategory: 'my-plugin',
  hostBridge: createCraftHostBridge(),
}, { default: () => h(App) })
```

Skip it when the screen only uses UI primitives.

## `configurePluginKitVue()`

Same config as the Provider, for secondary mounts that need a different `portalContainer`
without wrapping another tree. Prefer the Provider for the main app.
