import baseConfig from '@verbb/plugin-kit/eslint/config.base.js';
import reactHooksConfig from '@verbb/plugin-kit/eslint/config.react-hooks.js';
import typescriptConfig from '@verbb/plugin-kit/eslint/config.typescript-only.js';

export default [
    ...baseConfig,
    ...typescriptConfig,
    ...reactHooksConfig,
]; 