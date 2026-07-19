# Quick Start

This guide assumes your plugin is currently PHP-only and you want to add your first Vue-powered control panel screen.

You do not need an existing Vue app before you start. What you do need is a small frontend build step inside your plugin, plus a way for Craft to load the built files on the CP page where your Vue UI will live.

## Requirements

- **Node** `>= 20`
- a Craft plugin where you can add a frontend folder and an asset bundle
- a CP page, settings screen, utility, or template where you can render a mount element

## What you are setting up

At a high level, you are connecting four pieces:

1. a frontend source folder in your plugin
2. a Vite build that turns that source into browser files
3. a Craft `AssetBundle` that loads those built files in the CP
4. a DOM element that Vue can mount into

## Recommended folder shape

```text
my-plugin/
  src/
    templates/
    web/
      assets/
        cp/
          dist/
          src/
            App.vue
            my-plugin-cp.ts
          package.json
          vite.config.ts
```

- `src/` holds your frontend source files
- `dist/` holds the built files that Craft will publish as CP resources

## 1. Create a frontend package

```bash
mkdir -p src/web/assets/cp/src
cd src/web/assets/cp
npm init -y
npm install vue @verbb/plugin-kit-vue @verbb/plugin-kit-web
npm install -D vite @vitejs/plugin-vue typescript
```

## 2. Create a simple Vite config

Create `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/my-plugin-cp.ts',
      output: {
        entryFileNames: 'my-plugin-cp.js',
        assetFileNames: 'my-plugin-cp[extname]',
      },
    },
  },
});
```

## 3. Create your first Vue files

Create `src/App.vue`:

```vue
<script setup lang="ts">
import { Button } from '@verbb/plugin-kit-vue/components';
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:16px">
    <h1>My first Vue screen</h1>
    <p>This UI is being rendered inside the Craft control panel.</p>
    <Button>It works</Button>
  </div>
</template>
```

Create `src/my-plugin-cp.ts`:

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

This entry file does three important things:

1. loads design tokens and FOUCE (hides `<pk-*>` until they upgrade)
2. mounts a normal Vue tree — importing `<Button>` (etc.) registers its custom element
3. applies shared config via `PluginKitProvider` (translations default to `Craft.t` when present)

Pass `hostBridge: createCraftHostBridge()` only when the screen calls Craft action/selector helpers. Use `mountShadowApp` when the screen needs a shadow root — see [Creating a Vue app](../app/creating-a-vue-app.md).

## 4. Build the frontend files

```bash
npx vite build
```

## 5. Register the built files in Craft

```php
<?php
namespace mynamespace\myplugin\web\assets\cp;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class MyPluginCpAsset extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = '@mynamespace/myplugin/web/assets/cp/dist';
        $this->depends = [
            CpAsset::class,
        ];
        $this->js = ['my-plugin-cp.js'];
        $this->css = ['my-plugin-cp.css'];

        parent::init();
    }
}
```

## 6. Render a mount element in the CP

```twig
{% do view.registerAssetBundle('mynamespace\\myplugin\\web\\assets\\cp\\MyPluginCpAsset') %}

<div id="my-plugin-root"></div>
```

That `id` must match the selector used in `my-plugin-cp.ts`.

## 7. Passing simple data from PHP to Vue

```twig
{% set options = {
  pluginName: "My Plugin",
  canSave: true,
} %}

<div
  id="my-plugin-root"
  data-settings="{{ options | json_encode | e('html_attr') }}"
></div>
```

```ts
import { createApp, h } from 'vue';
import { PluginKitProvider } from '@verbb/plugin-kit-vue';
import App from './App.vue';

const container = document.getElementById('my-plugin-root');

if (container) {
  const settings = JSON.parse(container.dataset.settings ?? '{}');

  createApp({
    setup() {
      return () => h(PluginKitProvider, { translationCategory: 'my-plugin' }, {
        default: () => h(App, { settings }),
      });
    },
  }).mount(container);
}
```

## Next steps

1. Read [CSS setup](./css-setup.md) to decide whether your app should stay in the normal DOM or move into Shadow DOM.
2. Read [Creating a Vue app](../app/creating-a-vue-app.md) for the frontend concepts in more detail.
3. Read [App APIs](../api/app-apis.md) when you start using package-level Vue app helpers.
