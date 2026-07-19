import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export function createTypeScriptConfig({ files = ['**/*.{ts,tsx}'] } = {}) {
    return [
        {
            files,
            languageOptions: {
                parser: tsParser,
                parserOptions: {
                    ecmaVersion: 'latest',
                    sourceType: 'module',
                },
            },
            plugins: {
                '@typescript-eslint': tsPlugin,
            },
            rules: {
                ...tsPlugin.configs.recommended.rules,

                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-explicit-any': 'warn',
            },
        },
    ];
}

export default createTypeScriptConfig();
