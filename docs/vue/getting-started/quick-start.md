# Quick Start

This guide assumes your plugin is currently PHP-only and you want to add your first Vue-powered control panel screen.

You do not need an existing Vue app before you start. What you do need is a small frontend build step inside your plugin, plus a way for Craft to load the built files on the CP page where your Vue UI will live.

## Requirements

- **Node** 20.19+ on the 20.x release line, or 22.12+ (required by Vite)
- a Craft plugin where you can add a frontend folder and an asset bundle
- a CP page, settings screen, utility, or template where you can render a mount element

## What You Are Setting Up

At a high level, you are connecting four pieces:

1. a frontend source folder in your plugin
2. a Vite build that turns that source into browser files
3. a Craft `AssetBundle` that loads those built files in the CP
4. a DOM element that Vue can mount into

## Recommended Folder Shape

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

## 1. Create a Frontend Package

Run these commands from your plugin root:

```bash
mkdir -p src/web/assets/cp/src
cd src/web/assets/cp
npm init -y
npm pkg set type=module
npm install vue @verbb/plugin-kit-vue @verbb/plugin-kit-web
npm install -D vite @vitejs/plugin-vue typescript
```

## 2. Create a Simple Vite Config

Create `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '',
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/my-plugin-cp.ts',
      output: {
        format: 'es',
        entryFileNames: 'my-plugin-cp.js',
        assetFileNames: 'my-plugin-cp[extname]',
      },
    },
  },
});
```

`base: ''` keeps generated asset URLs relative, so lazy-loaded JavaScript and CSS resolve correctly after Craft publishes `dist/` into `cpresources`. The build produces ES modules; the asset bundle below loads them with `type="module"`. This is the same ES-module loading approach used by our plugin CP screens.

The fixed entry and CSS filenames keep this first screen easy to register. If you add multiple entries or shared CSS later, use a Vite manifest and register each entry’s imported CSS as well. Our larger plugins use a manifest-aware loader for that step; you do not need one for this example.

## 3. Create Your First Vue Files

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
import '@verbb/plugin-kit-vue/style.css';

import { createApp, h } from 'vue';
import { PluginKitProvider } from '@verbb/plugin-kit-vue';
import App from './App.vue';

const container = document.getElementById('my-plugin-root');

if (container) {
  createApp({
    setup() {
      return () => h(PluginKitProvider, { translationCategory: 'my-plugin' }, {
        default: () => h(App),
      });
    },
  }).mount(container);
}
```

The example uses inline layout styles, so it does not require Tailwind. The entry file:

1. loads design tokens and FOUCE (hides `<pk-*>` until they upgrade)
2. mounts a normal Vue tree — importing `<Button>` (etc.) registers its custom element
3. applies shared config via `PluginKitProvider` (translations default to `Craft.t` when present)

Add `hostBridge: createCraftHostBridge()` to the provider props when using Kit helpers for Craft requests or element selectors. Use `mountShadowApp` when the screen needs a shadow root — see [Creating a Vue app](../app/creating-a-vue-app.md).

## 4. Build the Frontend Files

From `my-plugin/src/web/assets/cp`, run:

```bash
npx vite build
```

The build creates `dist/my-plugin-cp.js` and `dist/my-plugin-cp.css`.

## 5. Register the Built Files in Craft

Create `my-plugin/src/web/assets/cp/MyPluginCpAsset.php`:

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
        $this->jsOptions = ['type' => 'module'];
        $this->css = ['my-plugin-cp.css'];

        parent::init();
    }
}
```

Update the namespace and alias to match your plugin.

`jsOptions` is required for this ES-module build. Without `type="module"`, browser errors can include `Cannot use 'import.meta' outside a module` or `Cannot use import statement outside a module`. Keep the module format and script type together.

## 6. Render a Mount Element in the CP

Add this to the CP template where the app should appear, such as `my-plugin/src/templates/settings.twig`:

```twig
{% do view.registerAssetBundle('mynamespace\\myplugin\\web\\assets\\cp\\MyPluginCpAsset') %}

<div id="my-plugin-root"></div>
```

That `id` must match the selector used in `my-plugin-cp.ts`.

Open the CP page. You should see “My first Vue screen” and a styled “It works” button. If either is missing, check [Testing and Debugging](./testing-and-debugging.md) before continuing.

## 7. Passing Data from PHP to Vue

Replace the mount element in your CP template with this version, keeping the asset bundle registration:

```twig
{% set options = {
  pluginName: "My Plugin",
} %}

<div
  id="my-plugin-root"
  data-settings="{{ options | json_encode | e('html_attr') }}"
></div>
```

Replace `src/my-plugin-cp.ts` with the following entry to read the settings and pass the name to your app:

```ts
import '@verbb/plugin-kit-vue/style.css';

import { createApp, h } from 'vue';
import { PluginKitProvider } from '@verbb/plugin-kit-vue';
import App from './App.vue';

const container = document.getElementById('my-plugin-root');

if (container) {
  const settings = JSON.parse(container.dataset.settings ?? '{}');

  createApp({
    setup() {
      return () => h(PluginKitProvider, { translationCategory: 'my-plugin' }, {
        default: () => h(App, { pluginName: settings.pluginName ?? 'My Plugin' }),
      });
    },
  }).mount(container);
}
```

Then replace `src/App.vue` so it accepts and displays that prop:

```vue
<script setup lang="ts">
import { Button } from '@verbb/plugin-kit-vue/components';

defineProps<{ pluginName: string }>();
</script>

<template>
  <div style="display:flex;flex-direction:column;gap:16px">
    <h1>{{ pluginName }}</h1>
    <p>This name came from the Craft template.</p>
    <Button>It works</Button>
  </div>
</template>
```

Rebuild with `npx vite build` and reload the CP page. You should see “My Plugin” from the template and the styled button. In the browser’s Network panel, check that the JavaScript and CSS load from Craft’s published resources without errors.

For a larger screen, follow [Creating a Vue App](../app/creating-a-vue-app.md) to add Shadow DOM isolation or a Craft host bridge as needed. The same asset bundle and module build still apply.
