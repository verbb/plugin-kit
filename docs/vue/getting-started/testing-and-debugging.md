# Testing and debugging

When a first Vue integration is not working, the problem is usually in the connection points between PHP, Craft, and the browser build, not in the component library itself.

## First checks

- Does your Craft page actually register the asset bundle?
- Does the page output the mount element your Vue entry is looking for?
- Did your Vite build produce the same filenames your asset bundle registers?
- Did you import `@verbb/plugin-kit-web/plugin-kit.css` (or inject tokens + FOUCE into a shadow root)?
- Are you loading the page inside the Craft control panel, where `window.Craft` exists?

## If the page is blank

1. Open the browser console and look for a JavaScript error.
2. Confirm your asset bundle is loading the built `js` file on that page.
3. Confirm your selector matches the mount element exactly.
4. Confirm your Vue entry guards against a missing element.

```ts
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

## If the page renders but looks unstyled

- **Light DOM:** make sure your entry imports `@verbb/plugin-kit-web/plugin-kit.css`
- **Shadow DOM:** make sure you passed styles into `mountShadowApp({ styles })`, not just the page

If `<pk-*>` elements flash as plain text before upgrading, FOUCE CSS did not load early enough.

## If Craft-specific features fail

- make sure the page is actually running in the CP
- make sure Craft's CP assets are loaded first
- pass `hostBridge: createCraftHostBridge()` on `PluginKitProvider` or `configurePluginKitVue()`
- avoid calling Craft-specific helpers in isolated visual tests unless you provide your own mock bridge

See [App APIs](../api/app-apis.md).

## If dialogs, menus, or popovers behave oddly

Overlays use the native Popover API top layer. Pass `portalContainer` from `mountShadowApp` into `PluginKitProvider` so overlay scroll lock stays stable inside Shadow DOM. See [CSS setup](./css-setup.md).

## If icons are blank

`<Icon icon="…">` needs an opt-in registry. Call `registerIcons({ … })` or import `@verbb/plugin-kit-icons/all.js`.
