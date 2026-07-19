# Quick Start

This guide assumes your plugin is currently PHP-only and you want to add your first React-powered control panel screen.

You do not need an existing React app before you start. What you do need is a small frontend build step inside your plugin, plus a way for Craft to load the built files on the CP page where your React UI will live.

## Requirements

- **Node** `>= 20`
- a Craft plugin where you can add a frontend folder and an asset bundle
- a CP page, settings screen, utility, or template where you can render a mount element

## What you are setting up

At a high level, you are connecting four pieces:

1. a frontend source folder in your plugin
2. a Vite build that turns that source into browser files
3. a Craft `AssetBundle` that loads those built files in the CP
4. a DOM element that React can mount into

## Recommended folder shape

There is no single required folder layout, but a structure like this keeps the PHP side and frontend side easy to understand:

```text
my-plugin/
  src/
    templates/
    web/
      assets/
        cp/
          dist/
          src/
            App.tsx
            my-plugin-cp.tsx
          package.json
          vite.config.ts
```

The important idea is simple:

- `src/` holds your frontend source files
- `dist/` holds the built files that Craft will publish as CP resources

The examples below assume you are starting from your plugin root:

```bash
cd path/to/my-plugin
```

If your plugin uses a different frontend folder, adjust the paths to match.

## 1. Create a frontend package

Create and enter the frontend folder from the example structure:

```bash
mkdir -p src/web/assets/cp/src
cd src/web/assets/cp
```

From `my-plugin/src/web/assets/cp`, create a `package.json` and install the dependencies you need:

```bash
npm init -y
npm install react react-dom @verbb/plugin-kit-react @verbb/plugin-kit-web
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom
```

## 2. Create a simple Vite config

For a first integration, keep the output predictable so your Craft asset bundle can point to fixed filenames.

Create `my-plugin/src/web/assets/cp/vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/my-plugin-cp.tsx',
      output: {
        entryFileNames: 'my-plugin-cp.js',
        assetFileNames: 'my-plugin-cp[extname]',
      },
    },
  },
});
```

This keeps the first setup easy to follow. Once everything is working, you can move to hashed filenames or a manifest-based approach if that fits your plugin better.

You do not need a Craft-specific Vite plugin just to get started. Any Vite setup that outputs browser-ready JS and CSS files will work. If you already have a Craft-focused Vite workflow you like, you can keep using it.

## 3. Create your first React files

Create `my-plugin/src/web/assets/cp/src/App.tsx`:

```tsx
import { Button } from '@verbb/plugin-kit-react/components';

export function App() {
  return (
    <div className="flex flex-col gap-4">
      <h1>My first React screen</h1>
      <p>This UI is being rendered inside the Craft control panel.</p>
      <Button>It works</Button>
    </div>
  );
}
```

Create `my-plugin/src/web/assets/cp/src/my-plugin-cp.tsx`:

```tsx
import '@verbb/plugin-kit-react/style.css';

import { createRoot } from 'react-dom/client';
import { PluginKitProvider } from '@verbb/plugin-kit-react';

import { App } from './App';

createRoot(document.querySelector('#my-plugin-root')!).render(
  <PluginKitProvider translationCategory="my-plugin">
    <App />
  </PluginKitProvider>,
);
```

This entry file does three important things:

1. loads design tokens and FOUCE (hides `<pk-*>` until they upgrade)
2. mounts a normal React tree — importing `<Button>` (etc.) registers its custom element
3. applies shared config via `PluginKitProvider` (translations default to `Craft.t` when present)

Pass `hostBridge: createCraftHostBridge()` only when the screen calls Craft action/selector helpers. Use `mountShadowApp` when the screen needs a shadow root — see [Creating a React app](../app/creating-a-react-app.md).

## 4. Build the frontend files

From `my-plugin/src/web/assets/cp`, run:

```bash
npx vite build
```

After that, your frontend folder should contain built files in `my-plugin/src/web/assets/cp/dist`, such as `my-plugin-cp.js` and `my-plugin-cp.css`.

## 5. Register the built files in Craft

Create an asset bundle class in your plugin, for example `my-plugin/src/web/assets/cp/MyPluginCpAsset.php`:

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

Update the namespace, alias, and class name to match your plugin.

The important part is that `sourcePath` points at the built frontend output, and the `js` and `css` arrays match the filenames your Vite build created.

## 6. Render a mount element in the CP

On the Craft side, register the asset bundle and output the element your React entry file will target. For example, add this to the template for your CP page, such as `my-plugin/src/templates/settings.twig`:

```twig
{% do view.registerAssetBundle('mynamespace\\myplugin\\web\\assets\\cp\\MyPluginCpAsset') %}

<div id="my-plugin-root"></div>
```

That `id` must match the selector used in `my-plugin-cp.tsx`.

At this point, the flow is:

1. Craft renders the page
2. Craft loads your asset bundle
3. your built `my-plugin-cp.js` runs in the browser
4. React finds `#my-plugin-root`
5. your app mounts into that element

## 7. Passing simple data from PHP to React

Once the mount is working, the next common step is passing a little data from PHP into the page.

One simple way to do that is with `data-*` attributes in your CP template:

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

Then read it in your entry file, `my-plugin/src/web/assets/cp/src/my-plugin-cp.tsx`:

```tsx
import { createRoot } from 'react-dom/client';
import { PluginKitProvider } from '@verbb/plugin-kit-react';

const container = document.getElementById('my-plugin-root');

if (container) {
  const settings = JSON.parse(container.dataset.settings ?? '{}');

  createRoot(container).render(
    <PluginKitProvider translationCategory="my-plugin">
      <App settings={settings} />
    </PluginKitProvider>,
  );
}
```

You do not need to solve every server-to-client data pattern on day one. Start small, prove the integration works, then expand from there.

## Next steps

1. Read [CSS setup](./css-setup.md) to decide whether your app should stay in the normal DOM or move into Shadow DOM.
2. Read [Creating a React app](../app/creating-a-react-app.md) for the frontend concepts in more detail.
3. Read [React App APIs](../api/react-app-apis.md) when you start using package-level React app helpers.
