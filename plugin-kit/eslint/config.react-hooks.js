import reactHooks from 'eslint-plugin-react-hooks';

export function createReactHooksConfig({
    jsxFiles = ['**/*.{jsx,tsx}'],
    hookFiles = ['**/use*.{js,ts}', '**/*Hook*.{js,ts}'],
} = {}) {
    const configs = [];

    if (jsxFiles.length > 0) {
        configs.push({
            files: jsxFiles,
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true,
                    },
                },
            },
            plugins: {
                'react-hooks': reactHooks,
            },
            rules: {
                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'warn',
            },
        });
    }

    if (hookFiles.length > 0) {
        configs.push({
            files: hookFiles,
            plugins: {
                'react-hooks': reactHooks,
            },
            rules: {
                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'warn',
            },
        });
    }

    return configs;
}

export default createReactHooksConfig();
