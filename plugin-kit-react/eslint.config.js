import baseConfig from '@verbb/plugin-kit/eslint/config.base.js';
import reactHooksConfig from '@verbb/plugin-kit/eslint/config.react-hooks.js';
import typescriptConfig from '@verbb/plugin-kit/eslint/config.typescript-only.js';

import { defineConfig } from 'eslint/config';

export default defineConfig([
    ...baseConfig,
    ...typescriptConfig,
    ...reactHooksConfig,
    {
        files: ['src/visual-tests/**/*.{js,jsx,ts,tsx}'],
        rules: {
            // Visual-test render modules often use hooks without component-style names.
            'react-hooks/rules-of-hooks': 'off',
        },
    },
    {
        ignores: [
            'visual-tests/public/**',
            'dist-visual-tests/**',
        ],
    },
]);