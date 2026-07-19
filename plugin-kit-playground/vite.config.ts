import path from 'node:path';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { getPluginKitReactViteDevAliases } from '@verbb/plugin-kit-react/vite-dev';

const repoRoot = path.resolve(__dirname, '..');

const codemirrorOptimizeDeps = [
    '@codemirror/autocomplete',
    '@codemirror/commands',
    '@codemirror/lang-css',
    '@codemirror/lang-html',
    '@codemirror/lang-javascript',
    '@codemirror/lang-json',
    '@codemirror/language',
    '@codemirror/state',
    '@codemirror/view',
];

export default defineConfig({
    plugins: [
        react(),
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('pk-'),
                },
            },
        }),
    ],
    server: {
        port: 5175,
        strictPort: true,
        open: '/button',
        fs: {
            allow: [repoRoot, path.resolve(repoRoot, '..')],
        },
    },
    optimizeDeps: {
        include: [
            ...codemirrorOptimizeDeps,
            'lit',
            'lit/decorators.js',
            'lit/directives/class-map.js',
            'lit/directives/unsafe-svg.js',
            'lit/directive-helpers.js',
            'lit/directives/if-defined.js',
            'lit/directives/live.js',
            'lit/directives/ref.js',
            'lit/directives/style-map.js',
            'lit/directives/when.js',
            '@floating-ui/dom',
        ],
    },
    resolve: {
        alias: [
            { find: '@verbb/plugin-kit-playground', replacement: path.resolve(__dirname, 'src/index.ts') },
            { find: '@verbb/plugin-kit-playground/catalog', replacement: path.resolve(__dirname, 'src/catalog/index.ts') },
            { find: '@verbb/plugin-kit-playground/web', replacement: path.resolve(__dirname, 'src/web/index.ts') },
            { find: '@verbb/plugin-kit-icons/all.js', replacement: path.resolve(repoRoot, 'plugin-kit-icons/src/all.ts') },
            { find: '@verbb/plugin-kit-icons', replacement: path.resolve(repoRoot, 'plugin-kit-icons/src/index.ts') },
            { find: '@verbb/plugin-kit-codemirror-core', replacement: path.resolve(repoRoot, 'plugin-kit-codemirror-core/src/index.ts') },
            { find: '@verbb/plugin-kit-tiptap-core', replacement: path.resolve(repoRoot, 'plugin-kit-tiptap-core/src/index.ts') },
            { find: '@verbb/plugin-kit-web/icons', replacement: path.resolve(repoRoot, 'plugin-kit-web/src/icons/index.ts') },
            // Short family barrels: components/button.js → components/button/index.ts
            {
                find: /^@verbb\/plugin-kit-web\/components\/tiptap-(content|editor|input)\.js$/,
                replacement: `${path.resolve(repoRoot, 'plugin-kit-web/src/components/tiptap')}/pk-tiptap-$1.ts`,
            },
            {
                find: /^@verbb\/plugin-kit-web\/components\/([^/]+)\.js$/,
                replacement: `${path.resolve(repoRoot, 'plugin-kit-web/src/components')}/$1/index.ts`,
            },
            // React facades import concrete element classes from subpaths (e.g. pk-spinner.js).
            { find: '@verbb/plugin-kit-web/components', replacement: path.resolve(repoRoot, 'plugin-kit-web/src/components') },
            { find: '@verbb/plugin-kit-web/register-components', replacement: path.resolve(repoRoot, 'plugin-kit-web/src/register-components.ts') },
            { find: '@verbb/plugin-kit-web/plugin-kit', replacement: path.resolve(repoRoot, 'plugin-kit-web/src/plugin-kit.ts') },
            { find: '@verbb/plugin-kit-web/register', replacement: path.resolve(repoRoot, 'plugin-kit-web/src/register.ts') },
            { find: '@verbb/plugin-kit-web/tokens.css', replacement: path.resolve(repoRoot, 'plugin-kit-web/src/tokens/tokens.css') },
            { find: '@verbb/plugin-kit-web', replacement: path.resolve(repoRoot, 'plugin-kit-web/src/index.ts') },
            // Full public subpath map (utils/hooks/fault/…); incomplete aliases break
            // in-package imports like `@verbb/plugin-kit-react/utils` from RowDataCells.
            ...getPluginKitReactViteDevAliases(),
            { find: '@verbb/plugin-kit-vue/components', replacement: path.resolve(repoRoot, 'plugin-kit-vue/src/components/index.ts') },
            { find: '@verbb/plugin-kit-vue', replacement: path.resolve(repoRoot, 'plugin-kit-vue/src/index.ts') },
        ],
    },
});
