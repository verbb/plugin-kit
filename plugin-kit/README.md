# @verbb/plugin-kit

Shared utility functions for Craft CMS plugin development.

## Install

```bash
npm install @verbb/plugin-kit
```

## Usage

Import from the published package entrypoints only:

```js
import { renderMarkdown } from '@verbb/plugin-kit';
import baseConfig from '@verbb/plugin-kit/eslint/config.base.js';
import typescriptConfig from '@verbb/plugin-kit/eslint/config.typescript-only.js';
```

For ESLint, prefer composing small shared layers in each consumer:

```js
import baseConfig from '@verbb/plugin-kit/eslint/config.base.js';
import typescriptConfig from '@verbb/plugin-kit/eslint/config.typescript-only.js';
import reactHooksConfig from '@verbb/plugin-kit/eslint/config.react-hooks.js';

export default [
    ...baseConfig,
    ...typescriptConfig,
    ...reactHooksConfig,
];
```

Keep app-specific concerns like Storybook overrides, Vite refresh rules, and local ignore patterns in the consuming package config rather than the shared base.

Compatibility wrappers are still available for older consumers:

- `@verbb/plugin-kit/eslint/config.typescript.js`
- `@verbb/plugin-kit/eslint/config.react.js`
- `@verbb/plugin-kit/eslint/config.react-typescript.js`
- `@verbb/plugin-kit/eslint/config.vite-react.js`

## Public Surface

- `@verbb/plugin-kit`
- `@verbb/plugin-kit/eslint/*`

Avoid importing from internal source paths. Anything outside the exported subpaths is private and may change without notice.
