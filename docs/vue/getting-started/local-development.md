# Local Development

After completing the [Quick Start](./quick-start.md), use Vite’s development server to see frontend changes without rebuilding each time. You still open your normal Craft control panel URL; Vite serves the JavaScript and CSS and updates the page as you edit.

This setup has its own local environment setting and does not require Craft’s `devMode`.

## 1. Configure the Dev Server

In `src/web/assets/cp/vite.config.ts`, add this `server` option inside `defineConfig({ ... })`. Keep the existing `base`, `plugins`, and `build` options:

```ts
server: {
  host: 'localhost',
  port: 5173,
  strictPort: true,
  origin: 'http://localhost:5173',
  cors: {
    origin: 'http://my-site.test',
  },
},
```

Replace `http://my-site.test` with your Craft page’s origin: its scheme, hostname, and port if present, without a path. `strictPort` keeps Vite on the port the asset bundle expects.

If your Craft site uses HTTPS, serve Vite over HTTPS with a trusted local certificate or an HTTPS proxy too. Use that HTTPS URL in `server.origin` and the environment setting below. See Vite’s [HTTPS](https://vite.dev/config/server-options#server-https) and [HMR connection options](https://vite.dev/config/server-options#server-hmr) for your local setup.

## 2. Switch the Asset Bundle

Replace the quick start’s `MyPluginCpAsset.php` with this version, using your plugin’s namespace and alias:

```php
<?php
namespace mynamespace\myplugin\web\assets\cp;

use craft\helpers\App;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class MyPluginCpAsset extends AssetBundle
{
    public function init(): void
    {
        $this->depends = [CpAsset::class];
        $this->jsOptions = ['type' => 'module'];

        $devServer = App::env('MY_PLUGIN_VITE_URL');

        if ($devServer) {
            $devServer = rtrim($devServer, '/');
            $this->js = [
                $devServer . '/@vite/client',
                $devServer . '/src/my-plugin-cp.ts',
            ];
        } else {
            $this->sourcePath = '@mynamespace/myplugin/web/assets/cp/dist';
            $this->js = ['my-plugin-cp.js'];
            $this->css = ['my-plugin-cp.css'];
        }

        parent::init();
    }
}
```

In development, Vite handles the CSS imports in your entry, so the bundle only registers the dev-server scripts. Leave your Twig asset registration and mount element unchanged.

## 3. Start Vite

Add this to your **Craft project’s local `.env`**:

```dotenv
MY_PLUGIN_VITE_URL=http://localhost:5173
```

From your plugin’s `src/web/assets/cp` folder, run:

```bash
npx vite
```

Leave the command running and reload your Craft CP page once. Edit some text in `src/App.vue` and save: it should update in the browser without manually rebuilding or refreshing.

If the page is blank, check that the browser can reach the Vite URL and that `cors.origin` matches the Craft page. If you change the Vite URL or port, update both the config and `.env`.

## What Updates Automatically?

Component and normally imported CSS changes update through hot module replacement (HMR). Some changes trigger a full-page reload instead, so do not rely on every edit preserving app state.

Refresh manually after PHP or Twig changes. Also refresh if changes to styles injected into a shadow root with `?inline` do not appear. This guide does not add a PHP/Twig file watcher.

## Return to Built Assets

Remove `MY_PLUGIN_VITE_URL` from `.env` (or leave it empty), stop Vite, and run:

```bash
npx vite build
```

Reload the CP page to use the built assets again. Leave `MY_PLUGIN_VITE_URL` unset in production. While it is set, the bundle requires the dev server to be running.

## Rebuild and Refresh Instead

If you prefer to keep the asset bundle loading `dist/`, leave `MY_PLUGIN_VITE_URL` unset and run:

```bash
npx vite build --watch
```

Vite rebuilds when source files change; refresh the Craft page after each build finishes. This option does not provide HMR or automatic page reloads.
