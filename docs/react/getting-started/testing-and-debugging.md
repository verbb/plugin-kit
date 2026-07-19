# Testing and debugging

When a first React integration is not working, the problem is usually in the connection points between PHP, Craft, and the browser build, not in the component library itself.

Start with the simple checks below before digging into deeper package APIs.

## First checks

- Does your Craft page actually register the asset bundle?
- Does the page output the mount element your React entry is looking for?
- Did your Vite build produce the same filenames your asset bundle registers?
- Did you import `@verbb/plugin-kit-react/style.css` (or inject tokens + FOUCE into a shadow root)?
- Are you loading the page inside the Craft control panel, where `window.Craft` exists?

## If the page is blank

If nothing renders at all, check these first:

1. Open the browser console and look for a JavaScript error.
2. Confirm your asset bundle is loading the built `js` file on that page.
3. Confirm your selector matches the mount element exactly.
4. Confirm your React entry guards against a missing element.

This is the minimum safe pattern:

```tsx
import { createRoot } from 'react-dom/client';
import { PluginKitProvider } from '@verbb/plugin-kit-react';

const container = document.getElementById('my-plugin-root');

if (container) {
  createRoot(container).render(
    <PluginKitProvider translationCategory="my-plugin">
      <App />
    </PluginKitProvider>,
  );
}
```

If the selector is wrong, React will never mount.

## If the page renders but looks unstyled

This usually means the CSS did not load where the app is rendering.

Check which setup you are using:

- **Light DOM:** make sure your entry imports `@verbb/plugin-kit-react/style.css`
- **Shadow DOM:** make sure you passed styles into `mountShadowApp({ styles })`, not just the page

If `<pk-*>` elements flash as plain text before upgrading, FOUCE CSS did not load early enough — import `style.css` in your entry so Vite emits it in `<head>`.

## If Craft-specific features fail

Functions like `createCraftHostBridge()` depend on the Craft control panel environment.

If you see errors around `window.Craft` or host requests:

- make sure the page is actually running in the CP
- make sure Craft's CP assets are loaded first
- pass `hostBridge: createCraftHostBridge()` on `PluginKitProvider` or `configurePluginKitReact()`
- avoid calling Craft-specific helpers in isolated visual tests unless you provide your own mock bridge

If you need the deeper details, see [React App APIs](../api/react-app-apis.md).

## If dialogs, menus, or popovers behave oddly

This is usually a shadow-root or scroll-lock problem.

It shows up more often when:

- your app is mounted in Shadow DOM
- overlay scroll lock does not match the host tree

In that case, pass `portalContainer` from `mountShadowApp` into `PluginKitProvider`. For broader Shadow DOM styling issues, see [CSS setup](./css-setup.md).

## If form schema components are missing

The schema form system expects its field and component types to be registered before rendering.

If you see warnings such as `Unknown form field type` or `Unknown form component`, make sure your calls to `registerFormComponents()` and `registerFormFields()` happen before the form engine renders.

## If icons are blank

`<Icon icon="…">` needs an opt-in registry. Call `registerIcons({ … })` or import `@verbb/plugin-kit-icons/all.js`.
