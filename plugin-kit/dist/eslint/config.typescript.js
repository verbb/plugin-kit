import baseConfig from '@verbb/plugin-kit/eslint/config.base.js';
import typescriptConfig from '@verbb/plugin-kit/eslint/config.typescript-only.js';

export default [
    ...baseConfig,
    ...typescriptConfig,
]; 