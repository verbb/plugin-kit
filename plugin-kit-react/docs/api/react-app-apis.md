# React App APIs

Primary symbols for bootstrapping React apps in Craft CP live in **`@verbb/plugin-kit-react/utils`**.

## Typical bootstrap

```ts
import { configurePluginKitReact, createCraftHostBridge } from '@verbb/plugin-kit-react/utils';

configurePluginKitReact({
  portalClassName: 'my-plugin-ui',
  portalContainer: shadowRoot,
  shadowRootSelectors: ['[data-my-plugin-shadow-root]'],
  translationCategory: 'my-plugin',
  hostBridge: createCraftHostBridge(),
});
```

## `configurePluginKitReact`

`configurePluginKitReact()` applies app-level defaults for package behavior such as floating UI, translations, and the host bridge.

Use it when your app needs more than just `createRoot(...)`, for example when package features need to know:

- where dialogs and popovers should render
- which translation category to use
- how package utilities should call back into Craft

### Signature

```ts
import { configurePluginKitReact, type PluginKitReactConfig } from '@verbb/plugin-kit-react/utils';

configurePluginKitReact({
  portalClassName?: string;
  portalContainer?: HTMLElement | ShadowRoot | null;
  shadowRootSelectors?: string[];
  translationCategory?: string;
  translate?: (category: string, message: string, params?: Record<string, string>) => string;
  hostBridge?: Partial<PluginKitReactHostBridge>;
});
```

Only provided keys take effect.

### Options

| Option | Effect |
| --- | --- |
| `portalClassName` | Class applied to portal roots such as dialogs and popovers. |
| `portalContainer` | Where portalled content is appended; use the shadow root when mounting inside Shadow DOM. |
| `shadowRootSelectors` | Selectors used when resolving portal targets across shadow hosts. |
| `translationCategory` | Default category used by translation helpers. |
| `translate` | Override translator for tests or non-Craft hosts. |
| `hostBridge` | Partial merge into the global bridge used by host-aware utilities. |

### Idempotency

Calling `configurePluginKitReact()` again overwrites the corresponding settings. If multiple React apps share one page, they should agree on shared config such as portal behavior.

## `createCraftHostBridge`

`createCraftHostBridge()` returns a **`Partial<PluginKitReactHostBridge>`** wired to `window.Craft`.

Use it when your app needs package utilities to work through the Craft control panel environment instead of behaving like a plain browser app.

### What it maps to

Defined in `src/utils/craftHostBridge.ts`:

- **`request`** -> `Craft.sendActionRequest(method, action, requestConfig)`
- **`openElementSelector`** -> `Craft.createElementSelectorModal(elementType, options)`
- **`formatDate`** -> `Craft.formatDate(date)`
- **`getTimepickerOptions`** -> `Craft.timepickerOptions || {}`
- **`getLocale`** -> `Craft.locale || 'en-US'`

### Usage

```ts
import { configurePluginKitReact, createCraftHostBridge } from '@verbb/plugin-kit-react/utils';

configurePluginKitReact({
  hostBridge: createCraftHostBridge(),
});
```

### Important note

`createCraftHostBridge()` expects `window.Craft` to exist. If your app is running outside the Craft CP, provide a custom `hostBridge` instead.

Lower-level utilities such as `hostRequest` and `hostFormatDate` read from the merged global bridge configured here.

## Related

- [Creating a React App](../react-app/creating-a-react-app.md)
