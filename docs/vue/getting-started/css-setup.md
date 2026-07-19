# CSS setup

Plugin Kit Vue components are web components — each `<pk-*>` element styles itself inside its own shadow root. Your app still needs a small amount of **page-level CSS** so elements behave correctly before and around those shadow roots.

## What to load

Prefer the Vue package CSS entry (same role as React’s `style.css`):

```ts
import '@verbb/plugin-kit-vue/style.css';
```

Or import the web convenience bundle directly:

```ts
import '@verbb/plugin-kit-web/plugin-kit.css';
```

You can import the underlying files directly instead if you prefer:

```ts
import '@verbb/plugin-kit-web/tokens.css';
import '@verbb/plugin-kit-web/styles/utilities/fouce.css';
import '@verbb/plugin-kit-web/styles/overlay-content.css';
```

`style.css` / `plugin-kit.css` include tokens + FOUCE + overlay chrome (dialog/popover light-DOM classes).
## Light DOM vs Shadow DOM

### Normal DOM

Render your app into a normal page element and import `plugin-kit.css` once in your entry file.

Use the normal DOM when:

- you want the easiest possible setup
- your screen is relatively small
- you are still proving out the PHP-to-Vue integration

### Shadow DOM

Use Shadow DOM when Craft's CSS interferes with your UI (or the reverse).

```ts
import pluginKitStyles from '@verbb/plugin-kit-web/plugin-kit.css?inline';
import screenStyles from './screen.css?inline';
import { createApp, h } from 'vue';
import { mountShadowApp, PluginKitProvider } from '@verbb/plugin-kit-vue/app';
import App from './App.vue';

const { mountNode, portalContainer } = mountShadowApp({
  element: '#my-plugin-root',
  styles: [pluginKitStyles, screenStyles],
});

createApp({
  setup() {
    return () => h(PluginKitProvider, {
      translationCategory: 'my-plugin',
      portalContainer,
    }, {
      default: () => h(App),
    });
  },
}).mount(mountNode);
```

Keep document-level FOUCE via a normal `plugin-kit.css` import as well — head CSS hides unupgraded tags before the shadow tree mounts.

## Which option should you choose?

- choose the normal DOM for your first implementation
- choose **Shadow DOM** when you have a clear styling-isolation problem to solve

## Next steps

1. If the screen still is not rendering correctly, read [Testing and debugging](./testing-and-debugging.md).
2. Read [Creating a Vue app](../app/creating-a-vue-app.md) for bootstrap options.
