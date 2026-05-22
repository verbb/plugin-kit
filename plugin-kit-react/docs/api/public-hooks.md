# Public Hooks

Import from **`@verbb/plugin-kit-react/hooks`**.

These are the package's public React hooks.

## Available hooks

| Hook | Purpose |
| --- | --- |
| `useTranslation` | Translate UI strings using the configured package translator. |
| `useKeyboardShortcuts` | Register common app-level keyboard shortcuts. |

## `useTranslation`

```ts
import { useTranslation } from '@verbb/plugin-kit-react/hooks';

const t = useTranslation();
return <span>{t('Save')}</span>;
```

Delegates to **`translate`** in `utils/translation.ts`, which respects `setTranslationCategory` / `setTranslateFunction` configured via **`configurePluginKitReact`**.

Also re-exported from the package root `@verbb/plugin-kit-react`.

## `useKeyboardShortcuts`

```ts
import { useKeyboardShortcuts } from '@verbb/plugin-kit-react/hooks';

useKeyboardShortcuts({
  onSave: () => { submit(); },
  onEscape: () => { close(); },
  // onCut, onCopy, onPaste, onUndo, onRedo, onSelectAll, onEnter, onDelete
});
```

Registers global `keydown` listeners (with guards so typing in inputs is not hijacked for some shortcuts). Cleaned up on unmount.

## Import note

Prefer `@verbb/plugin-kit-react/hooks` over the root import when you only need keyboard shortcuts.

## Related

- [Public Utilities](./public-utilities.md)
- [React App APIs](./react-app-apis.md)
