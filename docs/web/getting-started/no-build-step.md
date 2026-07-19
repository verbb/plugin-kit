# No-Build Step

The [Quick Start](./quick-start) assumes Vite (or another bundler) so you can cherry-pick components and emit a small CP bundle. That is still the best default for most Craft plugins.

You can also load Plugin Kit with plain `<link>` and `<script type="module">` tags — no frontend build in your plugin. The package ships a self-contained loader build for that path. Download those files, drop them into your plugin, and let a Craft asset bundle publish them.

## When to use this

Use the loader when:

- you want `<pk-*>` markup in Twig without maintaining a Vite (or similar) toolchain
- a small screen only needs a handful of components and lazy-loading is fine
- you are prototyping outside Craft before wiring a fuller frontend package

Prefer the [bundler Quick Start](./quick-start) when you care about a tight production CP payload, typed imports, or a larger client-side app entry.

## Get the download

Download `@verbb/plugin-kit-web` from npm and self-host it:

```bash
npm pack @verbb/plugin-kit-web
```

That writes a `.tgz` archive of the published package. Extract it — the no-build files live under `package/dist-loader/`:

| File | Role |
|------|------|
| `plugin-kit.css` | Tokens + FOUCE (and related loader styles) in one stylesheet |
| `plugin-kit.loader.js` | Discovers `pk-*` tags on the page and lazy-loads only those modules |

You do not need an `npm install` or a frontend `package.json` for this path.

## Craft control panel

Copy `package/dist-loader` into your plugin, then register it with an asset bundle. Craft publishes the folder and emits the correct CSS/JS URLs — you do not hardcode resource paths in Twig.

### 1. Put `dist-loader` in the plugin

```text
my-plugin/src/web/assets/cp/dist-loader/
```

### 2. Asset bundle

```php
<?php
namespace mynamespace\myplugin\web\assets\cp;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;
use yii\web\View;

class MyPluginCpAsset extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = '@mynamespace/myplugin/web/assets/cp/dist-loader';
        $this->depends = [
            CpAsset::class,
        ];
        $this->css = ['plugin-kit.css'];
        $this->js = ['plugin-kit.loader.js'];
        $this->jsOptions = [
            'type' => 'module',
            'position' => View::POS_END,
        ];

        parent::init();
    }
}
```

The loader **must** load as `type="module"`. Adjust the alias and class name for your plugin.

Craft publishes the whole `dist-loader/` tree (CSS, loader, and component modules). The loader resolves sibling modules from its own script URL, so once the asset bundle is registered you do not need to configure a base path.

### 3. Twig markup

```twig
{% do view.registerAssetBundle('mynamespace\\myplugin\\web\\assets\\cp\\MyPluginCpAsset') %}

<div class="pane">
  <pk-dropdown-menu>
    <pk-button slot="trigger" with-caret>Actions</pk-button>
    <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
    <pk-dropdown-item value="delete">Delete</pk-dropdown-item>
  </pk-dropdown-menu>
</div>
```

Craft loads `plugin-kit.css` and `plugin-kit.loader.js`. The loader finds `pk-*` tags, fetches their modules from the same published directory, and upgrades them in place.

## Preloading components

If you create elements later with JavaScript (for example a dialog that is not in the initial Twig), preload their tags so the modules are ready:

```html
<div data-pk-preload="pk-dialog pk-select" hidden></div>
```

## FOUCE and Craft

`plugin-kit.css` already includes FOUCE styles so `<pk-*>` elements stay hidden until they upgrade. Load the stylesheet in `<head>` (Craft’s normal CSS registration does this) **before** the loader runs.

For more on tokens and shadow DOM, see [Tokens & CSS](./tokens). For why FOUCE is bundled into `plugin-kit.css`, see [Reducing FOUCE](./fouce).

## Outside Craft

If you are not using an asset bundle — a static HTML prototype, for example — host the `dist-loader/` folder yourself and point at the files with normal URLs relative to that folder:

```html
<link rel="stylesheet" href="./dist-loader/plugin-kit.css" />
<script type="module" src="./dist-loader/plugin-kit.loader.js"></script>

<pk-button variant="primary">Save</pk-button>
```

Only override the base path if the loader script and component modules are not served as siblings:

```html
<meta data-plugin-kit="./dist-loader" />
```

```js
import { setBasePath } from './dist-loader/plugin-kit.loader.js';

setBasePath('./dist-loader');
```

## Next steps

1. Stay on this path for small Twig-driven screens, or switch to the [Quick Start](./quick-start) when you want a bundler and cherry-picked imports.
2. Read [Tokens & CSS](./tokens) for styling details.
3. Browse the [component reference](../components/dropdown-menu) for props, events, and slots.
