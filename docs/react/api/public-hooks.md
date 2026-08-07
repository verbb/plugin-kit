# Public Hooks

Import from **`@verbb/plugin-kit-react/hooks`**.

## Available hooks

| Hook | Purpose |
| --- | --- |
| `useTranslation` | Translate UI strings using the configured package translator. |

## `useTranslation`

```ts
import { useTranslation } from '@verbb/plugin-kit-react/hooks';

const t = useTranslation();
return <span>{t('Save')}</span>;
```

Delegates to **`translate`** from `@verbb/plugin-kit-forms`, which respects `setTranslationCategory` / `setTranslateFunction` — configured via **`PluginKitProvider`** or **`configurePluginKitReact`**.

Also re-exported from the package root `@verbb/plugin-kit-react`.

## Related

- [Public Utilities](./public-utilities.md)
- [React App APIs](./react-app-apis.md)
