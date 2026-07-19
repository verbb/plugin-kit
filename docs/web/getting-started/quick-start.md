# Quick Start

This guide assumes your plugin is currently PHP-only and you want to add your first Plugin Kit web-component screen in the Craft control panel.

What you need is a small frontend build step inside your plugin, plus a way for Craft to load the built files on the CP page where your `<pk-*>` markup will live.

::: tip
Want to skip Vite entirely? See [No-Build Step](./no-build-step) for the script-tag loader path.
:::

## Requirements

- **Node** `>= 20`
- a Craft plugin where you can add a frontend folder and an asset bundle
- a CP page, settings screen, utility, or template where you can render `<pk-*>` markup

## What you are setting up

At a high level, you are connecting four pieces:

1. a frontend source folder in your plugin
2. a Vite build that turns that source into browser files
3. a Craft `AssetBundle` that loads those built files in the CP
4. Twig (or JS) markup that uses `<pk-*>` elements once they have registered

Unlike a React mount, the components upgrade in place. Your template can contain the markup; the JS entry mainly loads tokens and registers the custom elements.

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
            my-plugin-cp.ts
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
npm install @verbb/plugin-kit-web
npm install -D vite typescript
```

## 2. Create a simple Vite config

For a first integration, keep the output predictable so your Craft asset bundle can point to fixed filenames.

Create `my-plugin/src/web/assets/cp/vite.config.ts`:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
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

This keeps the first setup easy to follow. Once everything is working, you can move to hashed filenames or a manifest-based approach if that fits your plugin better.

You do not need a Craft-specific Vite plugin just to get started. Any Vite setup that outputs browser-ready JS and CSS files will work. If you already have a Craft-focused Vite workflow you like, you can keep using it.

## 3. Create your CP entry file

Create `my-plugin/src/web/assets/cp/src/my-plugin-cp.ts`. Import the stylesheet once, then short family entries for each control you use — each import registers that custom element (and its companions, e.g. dropdown menu + items):

```ts
import '@verbb/plugin-kit-web/plugin-kit.css';

import '@verbb/plugin-kit-web/components/button.js';
import '@verbb/plugin-kit-web/components/dropdown-menu.js';
import '@verbb/plugin-kit-web/components/icon.js';

// Only the glyphs your Twig `<pk-icon icon="…">` tags need
import { registerIcons, plus, gear } from '@verbb/plugin-kit-icons';

registerIcons({ plus, gear });
```

This entry file does three important things:

1. loads design tokens and FOUCE in one stylesheet (`plugin-kit.css`)
2. registers just the custom element families your page needs so Twig markup can upgrade in place
3. keeps TipTap, CodeMirror, and other heavy surfaces out of the bundle until you import those families

If you use `<pk-icon>`, register each glyph (or import `@verbb/plugin-kit-icons/all.js` when you want the full curated set). HTML uses kebab-case names (`icon="arrow-up"`); JS named exports are camelCase (`arrowUp`) and normalize on register.

Need a typed class? Import the deep path instead:

```ts
import { PkButton } from '@verbb/plugin-kit-web/components/button/pk-button.js';
```

Avoid importing from the package root (`@verbb/plugin-kit-web`) or `@verbb/plugin-kit-web/register` in production CP bundles unless you intentionally want the full library.

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

## 6. Render markup in the CP

On the Craft side, register the asset bundle and output the `<pk-*>` markup your entry file will upgrade. For example, add this to the template for your CP page, such as `my-plugin/src/templates/settings.twig`:

```twig
{% do view.registerAssetBundle('mynamespace\\myplugin\\web\\assets\\cp\\MyPluginCpAsset') %}

<div class="pane">
  <h2>My first Plugin Kit screen</h2>

  <pk-dropdown-menu>
    <pk-button slot="trigger" with-caret>Actions</pk-button>
    <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
    <pk-dropdown-item value="delete">Delete</pk-dropdown-item>
  </pk-dropdown-menu>
</div>
```

At this point, the flow is:

1. Craft renders the page (including your `<pk-*>` tags)
2. Craft loads your asset bundle CSS and JS
3. tokens and FOUCE apply before/as components upgrade
4. your entry imports register the `<pk-*>` elements you use
5. the markup becomes interactive Plugin Kit components

## 7. Passing data from PHP

Once registration is working, wire PHP values into `<pk-*>` attributes the same way you would any other HTML — escape attribute values in Twig:

```twig
{% set deleteLabel = settings.deleteLabel ?? 'Delete' %}

<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret {% if not settings.canEdit %}disabled{% endif %}>
    Actions
  </pk-button>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-item
    value="delete"
    {% if not settings.canDelete %}disabled{% endif %}
  >{{ deleteLabel|e }}</pk-dropdown-item>
</pk-dropdown-menu>
```

### Using Craft’s `tag` helpers

Craft’s [`tag()`](https://craftcms.com/docs/5.x/reference/twig/functions.html#tag) function and [`{% tag %}`](https://craftcms.com/docs/5.x/reference/twig/tags.html#tag) tag are optional ergonomics for the same markup. Attributes are HTML-encoded for you — no manual `|e` / `|e('html_attr')` on each value.

Nested menus are a good fit for `{% tag %}`:

```twig
{% tag 'pk-dropdown-menu' %}
  {{ tag('pk-button', {
    slot: 'trigger',
    withCaret: true,
    text: 'Actions',
    disabled: not settings.canEdit,
  }) }}
  {{ tag('pk-dropdown-item', {
    value: 'duplicate',
    text: 'Duplicate',
  }) }}
  {{ tag('pk-dropdown-item', {
    value: 'delete',
    text: settings.deleteLabel ?? 'Delete',
    disabled: not settings.canDelete,
  }) }}
{% endtag %}
```

## Waiting for components from JavaScript

If your entry script reads properties, focuses elements, or attaches listeners on first load, wait until the tags are defined:

```ts
import { allDefined } from '@verbb/plugin-kit-web/plugin-kit';

await allDefined();
```

## Framework adapters

Prefer web components directly when your CP UI is otherwise vanilla JS. If you are already on React or Vue, use the adapter packages instead — they wrap these same elements:

- [React quick start](/react/getting-started/quick-start)
- [Vue quick start](/vue/getting-started/quick-start)

## Next steps

1. Prefer no Vite at all? See [No-Build Step](./no-build-step) for the script-tag / loader path.
2. Read [Tokens & CSS](./tokens) for shadow DOM, tokens, and styling details.
3. Read [Reducing FOUCE](./fouce) to understand why FOUCE CSS loads before your components.
4. Browse the [component reference](../components/dropdown-menu) for props, events, and slots.
5. When a screen grows into a fuller client app, revisit the React or Vue guides if a framework starts to make more sense than vanilla DOM code.
