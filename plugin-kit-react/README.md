# @verbb/plugin-kit-react

React UI and form primitives for Craft CMS plugin development.

## Install

```bash
npm install @verbb/plugin-kit-react @verbb/plugin-kit react react-dom
```

## Usage

Import only from the published package entrypoints:

```tsx
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { Button } from '@verbb/plugin-kit-react/components';
import { cn } from '@verbb/plugin-kit-react/utils';
import '@verbb/plugin-kit-react/style.css';
```

## Public Surface

- `@verbb/plugin-kit-react` (`useTranslation`)
- `@verbb/plugin-kit-react/components`
- `@verbb/plugin-kit-react/forms`
- `@verbb/plugin-kit-react/hooks`
- `@verbb/plugin-kit-react/utils`
- `@verbb/plugin-kit-react/style.css`

Avoid importing from internal source paths. Anything outside the exported subpaths is private and may change without notice.
