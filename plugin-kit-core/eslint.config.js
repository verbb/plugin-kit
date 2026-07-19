import baseConfig from '@verbb/plugin-kit/eslint/config.base.js';
import typescriptConfig from '@verbb/plugin-kit/eslint/config.typescript-only.js';

import { defineConfig } from 'eslint/config';

export default defineConfig([
    ...baseConfig,
    ...typescriptConfig,
]);