# Quick Start

This guide assumes your plugin is currently PHP-only and you want to add your first React-powered control panel screen.

You do not need an existing React app before you start. What you do need is a small frontend build step inside your plugin, plus a way for Craft to load the built files on the CP page where your React UI will live.

## Requirements

- **Node** 20.19+ on the 20.x release line, or 22.12+ (required by Vite)
- a Craft plugin where you can add a frontend folder and an asset bundle
- a CP page, settings screen, utility, or template where you can render a mount element

## What You Are Setting Up

At a high level, you are connecting four pieces:

1. a frontend source folder in your plugin
2. a Vite build that turns that source into browser files
3. a Craft `AssetBundle` that loads those built files in the CP
4. a DOM element that React can mount into

## Recommended Folder Shape

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

## 1. Create a Frontend Package

Create and enter the frontend folder from the example structure:

```bash
mkdir -p src/web/assets/cp/src
cd src/web/assets/cp
```

From `my-plugin/src/web/assets/cp`, create a `package.json` and install the dependencies you need:

```bash
npm init -y
npm pkg set type=module
npm install react react-dom @verbb/plugin-kit-react @verbb/plugin-kit-web
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom
```

## 2. Create a Simple Vite Config

For a first integration, keep the output predictable so your Craft asset bundle can point to fixed filenames.

Create `my-plugin/src/web/assets/cp/vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'src/my-plugin-cp.tsx',
      output: {
        format: 'es',
        entryFileNames: 'my-plugin-cp.js',
        assetFileNames: 'my-plugin-cp[extname]',
      },
    },
  },
});
```

`base: ''` keeps generated asset URLs relative, so lazy-loaded JavaScript and CSS resolve correctly after Craft publishes `dist/` into `cpresources`. The build produces ES modules; the asset bundle below loads them with `type="module"`.

The fixed entry and CSS filenames keep this first screen easy to register. If you add multiple entries or shared CSS later, use a Vite manifest and register each entry’s imported CSS as well. You do not need a manifest loader for this example.

You do not need a Craft-specific Vite plugin just to get started. Any Vite setup that outputs browser-ready JS and CSS files will work. If you already have a Craft-focused Vite workflow you like, you can keep using it.

## 3. Create Your First React Files

Create `my-plugin/src/web/assets/cp/src/App.tsx`:

```tsx
import { Button } from '@verbb/plugin-kit-react/components';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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

const container = document.getElementById('my-plugin-root');

if (container) {
  createRoot(container).render(
    <PluginKitProvider translationCategory="my-plugin">
      <App />
    </PluginKitProvider>,
  );
}
```

The example uses inline layout styles, so it does not require Tailwind. The entry file:

1. loads design tokens and FOUCE (hides `<pk-*>` until they upgrade)
2. mounts a normal React tree — importing `<Button>` (etc.) registers its custom element
3. applies shared config via `PluginKitProvider` (translations default to `Craft.t` when present)

Add `hostBridge={createCraftHostBridge()}` to the provider when using Kit helpers for Craft requests or element selectors. Use `mountShadowApp` when the screen needs a shadow root — see [Creating a React app](../app/creating-a-react-app.md).

## 4. Build the Frontend Files

From `my-plugin/src/web/assets/cp`, run:

```bash
npx vite build
```

After that, your frontend folder should contain built files in `my-plugin/src/web/assets/cp/dist`, such as `my-plugin-cp.js` and `my-plugin-cp.css`.

## 5. Register the Built Files in Craft

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
        $this->jsOptions = ['type' => 'module'];
        $this->css = ['my-plugin-cp.css'];

        parent::init();
    }
}
```

Update the namespace, alias, and class name to match your plugin.

The important part is that `sourcePath` points at the built frontend output, and the `js` and `css` arrays match the filenames your Vite build created.

`jsOptions` is required for this ES-module build. Without `type="module"`, browser errors can include `Cannot use 'import.meta' outside a module` or `Cannot use import statement outside a module`. Keep the module format and script type together.

## 6. Render a Mount Element in the CP

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

Open the CP page. You should see “My first React screen” and a styled “It works” button. If either is missing, check [Testing and Debugging](./testing-and-debugging.md) before continuing.

## 7. Passing Data from PHP to React

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

Replace `src/my-plugin-cp.tsx` with the following entry to read the settings and pass the name to your app:

```tsx
import '@verbb/plugin-kit-react/style.css';

import { createRoot } from 'react-dom/client';
import { PluginKitProvider } from '@verbb/plugin-kit-react';
import { App } from './App';

const container = document.getElementById('my-plugin-root');

if (container) {
  const settings = JSON.parse(container.dataset.settings ?? '{}');

  createRoot(container).render(
    <PluginKitProvider translationCategory="my-plugin">
      <App pluginName={settings.pluginName ?? 'My Plugin'} />
    </PluginKitProvider>,
  );
}
```

Then replace `src/App.tsx` so it accepts and displays that prop:

```tsx
import { Button } from '@verbb/plugin-kit-react/components';

type AppProps = {
  pluginName: string;
};

export function App({ pluginName }: AppProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1>{pluginName}</h1>
      <p>This name came from the Craft template.</p>
      <Button>It works</Button>
    </div>
  );
}
```

Rebuild with `npx vite build` and reload the CP page. You should see “My Plugin” from the template and the styled button. In the browser’s Network panel, check that the JavaScript and CSS load from Craft’s published resources without errors.

To update your app while editing, follow [Local Development](./local-development.md) to connect Craft to Vite’s dev server.

For a larger screen, follow [Creating a React App](../app/creating-a-react-app.md) to add Shadow DOM isolation or a Craft host bridge as needed. The same asset bundle and module build still apply.
