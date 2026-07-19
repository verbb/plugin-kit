# CSS setup

Plugin Kit React components are web components — each `<pk-*>` element styles itself inside its own shadow root. Your app still needs a small amount of **page-level CSS** so elements behave correctly before and around those shadow roots.

## What to load

Import the convenience bundle once in your entry file:

```ts
import '@verbb/plugin-kit-react/style.css';
```

You can import the underlying files directly instead if you prefer:

```ts
import '@verbb/plugin-kit-web/tokens.css';
import '@verbb/plugin-kit-web/styles/utilities/fouce.css';
import '@verbb/plugin-kit-web/styles/overlay-content.css';
```

`style.css` is tokens + FOUCE + overlay chrome (dialog/popover light-DOM classes). Prefer it unless you are assembling the sheets yourself.

## Light DOM vs Shadow DOM

There is no universally correct choice. Both approaches are valid:

- the normal page DOM is simpler and easier to start with
- Shadow DOM gives you stronger style isolation

### Normal DOM

Render your app into a normal page element and import `style.css` once in your entry file.

Your React app lives in the same page styling environment as the rest of the Craft control panel.

Use the normal DOM when:

- you want the easiest possible setup
- your screen is relatively small
- you are still proving out the PHP-to-React integration
- you are happy for your app styles and Craft's styles to share the same page

### Shadow DOM

Shadow DOM creates a styling boundary around your app. It helps keep Craft's CSS from bleeding into your React app and your app's CSS from bleeding back into the CP.

Use Shadow DOM when:

- Craft's existing CSS is interfering with your UI
- your own app CSS is interfering with the rest of the control panel
- you are building a larger, more self-contained React surface
- you want a safer boundary between your frontend stack and Craft's control panel UI

```tsx
import pluginKitStyles from '@verbb/plugin-kit-react/style.css?inline';
import screenStyles from './screen.css?inline';
import { createRoot } from 'react-dom/client';
import { mountShadowApp, PluginKitProvider } from '@verbb/plugin-kit-react/utils';

const { mountNode, portalContainer } = mountShadowApp({
  element: '#my-plugin-root',
  styles: [pluginKitStyles, screenStyles],
});

createRoot(mountNode).render(
  <PluginKitProvider
    translationCategory="my-plugin"
    portalContainer={portalContainer}
  >
    <App />
  </PluginKitProvider>,
);
```

Keep document-level FOUCE via a normal `style.css` import as well — head CSS hides unupgraded tags before the shadow tree mounts.

## Which option should you choose?

If you are unsure:

- choose the normal DOM for your first implementation
- choose **Shadow DOM** when you have a clear styling-isolation problem to solve

## Next steps

1. If the screen still is not rendering correctly, read [Testing and debugging](./testing-and-debugging.md).
2. Read [Creating a React app](../app/creating-a-react-app.md) for bootstrap options.
