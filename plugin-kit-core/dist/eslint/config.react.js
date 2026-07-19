import baseConfig from '@verbb/plugin-kit/eslint/config.base.js';
import { createReactHooksConfig } from '@verbb/plugin-kit/eslint/config.react-hooks.js';

export default [
    ...baseConfig,
    ...createReactHooksConfig({
        jsxFiles: ['**/*.{js,jsx}'],
        hookFiles: ['**/use*.js', '**/*Hook*.js'],
    }),
]; 