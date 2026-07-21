import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
import type { Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitepress';
import { getPluginKitReactViteDevAliases } from '../../plugin-kit-react/vite-dev.mjs';

const monorepoRoot = fileURLToPath(new URL('../..', import.meta.url));
const pluginKitWebSrc = path.join(monorepoRoot, 'plugin-kit-web/src');
const vitepressTheme = fileURLToPath(new URL('../../../../formie-react/verbb-vitepress-theme/src/index.ts', import.meta.url));
const formieNodeModules = fileURLToPath(new URL('../../../../formie-react/formie-plugin-repo/node_modules', import.meta.url));

const monorepoRequire = createRequire(path.join(monorepoRoot, 'package.json'));
const docsRequire = createRequire(path.join(monorepoRoot, 'docs/package.json'));

function preferEsmEntry(resolved: string): string {
    if (resolved.endsWith('.cjs')) {
        const mjsCandidate = resolved.replace(/\.cjs$/, '.mjs');

        return existsSync(mjsCandidate) ? mjsCandidate : resolved;
    }

    // Dual CJS/ESM packages expose `main` as *.js and `module` as a separate ESM file.
    // Node resolution returns the CJS file, which breaks ESM imports (named or default).
    // e.g. punycode.js → punycode.es6.js (markdown-it / pk-field inline markdown).
    if (
        resolved.endsWith('.js')
        && !resolved.endsWith('.esm.js')
        && !resolved.endsWith('.es6.js')
        && !resolved.endsWith('.umd.js')
        && !resolved.endsWith('.min.js')
    ) {
        const esmCandidate = resolved.replace(/\.js$/, '.esm.js');

        if (existsSync(esmCandidate)) {
            return esmCandidate;
        }

        const es6Candidate = resolved.replace(/\.js$/, '.es6.js');

        if (existsSync(es6Candidate)) {
            return es6Candidate;
        }

        const mjsCandidate = resolved.replace(/\.js$/, '.mjs');

        if (existsSync(mjsCandidate)) {
            return mjsCandidate;
        }
    }

    return resolved;
}

function monorepoNodeModules(): Plugin {
    // Leave React (and jsx runtimes) to Vite optimizeDeps — forcing raw
    // `node_modules/react/index.js` breaks `import React from 'react'` in ESM.
    const leaveToVite = (source: string): boolean => {
        return source === 'react'
            || source === 'react-dom'
            || source === 'scheduler'
            || source.startsWith('react/')
            || source.startsWith('react-dom/');
    };

    return {
        name: 'plugin-kit-docs-monorepo-resolve',
        enforce: 'pre',
        async resolveId(source, importer) {
            if (
                !importer
                || source.startsWith('.')
                || source.startsWith('\0')
                || source.startsWith('node:')
                || path.isAbsolute(source)
                || leaveToVite(source)
            ) {
                return null;
            }

            // Respect package "import" conditions so dual CJS/ESM deps (e.g. @vueuse/core)
            // expose named exports to VitePress instead of resolving to index.cjs.
            try {
                const resolved = await import.meta.resolve(source, pathToFileURL(importer).href);

                return preferEsmEntry(fileURLToPath(resolved));
            } catch {
                // Fall back to Node resolution for packages outside import.meta.resolve.
            }

            for (const req of [docsRequire, monorepoRequire]) {
                try {
                    return preferEsmEntry(req.resolve(source));
                } catch {
                    // try next resolver root
                }
            }

            return null;
        },
    };
}

const reactGettingStarted = [
    { text: 'Overview', link: '/react/' },
    { text: 'Quick Start', link: '/react/getting-started/quick-start' },
    { text: 'CSS Setup', link: '/react/getting-started/css-setup' },
    { text: 'Testing and Debugging', link: '/react/getting-started/testing-and-debugging' },
];

const reactAppItems = [
    { text: 'Creating a React App', link: '/react/app/creating-a-react-app' },
];

const reactComponentItems = [
    { text: 'Button', link: '/react/components/button' },
    { text: 'Button Group', link: '/react/components/button-group' },
    { text: 'Calendar', link: '/react/components/calendar' },
    { text: 'Checkbox', link: '/react/components/checkbox' },
    { text: 'Checkbox Input', link: '/react/components/checkbox-input' },
    { text: 'Checkbox Select', link: '/react/components/checkbox-select' },
    { text: 'Code Editor', link: '/react/components/code-editor' },
    { text: 'Color Input', link: '/react/components/color-input' },
    { text: 'Combobox', link: '/react/components/combobox' },
    { text: 'Copy Button', link: '/react/components/copy-button' },
    { text: 'Date Picker', link: '/react/components/date-picker' },
    { text: 'Dialog', link: '/react/components/dialog' },
    { text: 'Dropdown Menu', link: '/react/components/dropdown-menu' },
    { text: 'Editable Table', link: '/react/components/editable-table' },
    { text: 'Field', link: '/react/components/field' },
    { text: 'Icon', link: '/react/components/icon' },
    { text: 'Input', link: '/react/components/input' },
    { text: 'Lightswitch', link: '/react/components/lightswitch' },
    { text: 'Popover', link: '/react/components/popover' },
    { text: 'Radio Group', link: '/react/components/radio-group' },
    { text: 'Scroll Area', link: '/react/components/scroll-area' },
    { text: 'Select', link: '/react/components/select' },
    { text: 'Separator', link: '/react/components/separator' },
    { text: 'Spinner', link: '/react/components/spinner' },
    { text: 'Status', link: '/react/components/status' },
    { text: 'Tabs', link: '/react/components/tabs' },
    { text: 'Textarea', link: '/react/components/textarea' },
    { text: 'Time Picker', link: '/react/components/time-picker' },
    { text: 'Tiptap Editor', link: '/react/components/tiptap-editor' },
    { text: 'Tiptap Content', link: '/react/components/tiptap-content' },
    { text: 'Tiptap Input', link: '/react/components/tiptap-input' },
    { text: 'Toggle', link: '/react/components/toggle' },
    { text: 'Toggle Group', link: '/react/components/toggle-group' },
    { text: 'Tooltip', link: '/react/components/tooltip' },
];

/** Vue mirrors React component docs (minus React-only convenience wrappers). */
const vueComponentItems = reactComponentItems
    .filter((item) => item.link !== '/react/components/checkbox-input')
    .map((item) => ({
        text: item.text,
        link: item.link.replace('/react/components/', '/vue/components/'),
    }));

/** Web nav is canonical — includes Input Group (also exported from React; docs TBD). */
const webComponentItems = [
    { text: 'Button', link: '/web/components/button' },
    { text: 'Button Group', link: '/web/components/button-group' },
    { text: 'Calendar', link: '/web/components/calendar' },
    { text: 'Checkbox', link: '/web/components/checkbox' },
    { text: 'Checkbox Input', link: '/web/components/checkbox-input' },
    { text: 'Checkbox Select', link: '/web/components/checkbox-select' },
    { text: 'Code Editor', link: '/web/components/code-editor' },
    { text: 'Color Input', link: '/web/components/color-input' },
    { text: 'Combobox', link: '/web/components/combobox' },
    { text: 'Copy Button', link: '/web/components/copy-button' },
    { text: 'Date Picker', link: '/web/components/date-picker' },
    { text: 'Dialog', link: '/web/components/dialog' },
    { text: 'Dropdown Menu', link: '/web/components/dropdown-menu' },
    { text: 'Editable Table', link: '/web/components/editable-table' },
    { text: 'Field', link: '/web/components/field' },
    { text: 'Icon', link: '/web/components/icon' },
    { text: 'Input', link: '/web/components/input' },
    { text: 'Input Group', link: '/web/components/input-group' },
    { text: 'Lightswitch', link: '/web/components/lightswitch' },
    { text: 'Popover', link: '/web/components/popover' },
    { text: 'Radio Group', link: '/web/components/radio-group' },
    { text: 'Scroll Area', link: '/web/components/scroll-area' },
    { text: 'Select', link: '/web/components/select' },
    { text: 'Separator', link: '/web/components/separator' },
    { text: 'Spinner', link: '/web/components/spinner' },
    { text: 'Status', link: '/web/components/status' },
    { text: 'Tabs', link: '/web/components/tabs' },
    { text: 'Textarea', link: '/web/components/textarea' },
    { text: 'Time Picker', link: '/web/components/time-picker' },
    { text: 'Tiptap Editor', link: '/web/components/tiptap-editor' },
    { text: 'Tiptap Content', link: '/web/components/tiptap-content' },
    { text: 'Tiptap Input', link: '/web/components/tiptap-input' },
    { text: 'Toggle', link: '/web/components/toggle' },
    { text: 'Toggle Group', link: '/web/components/toggle-group' },
    { text: 'Tooltip', link: '/web/components/tooltip' },
];

const formsItems = [
    { text: 'Overview', link: '/forms/overview' },
    { text: 'Schema Structure', link: '/forms/schema-structure' },
    { text: 'Conditions', link: '/forms/conditions' },
    { text: 'Schema Components', link: '/forms/schema-components' },
    {
        text: 'Built-in Schema Components',
        collapsed: true,
        items: [
            { text: 'Field Wrap', link: '/forms/schema-components/field-wrap' },
            { text: 'Modal Tabs', link: '/forms/schema-components/modal-tabs' },
            { text: 'Modal Tabs List', link: '/forms/schema-components/modal-tabs-list' },
            { text: 'Modal Tabs Trigger', link: '/forms/schema-components/modal-tabs-trigger' },
            { text: 'Modal Tabs Content', link: '/forms/schema-components/modal-tabs-content' },
        ],
    },
    { text: 'Custom Schema Components', link: '/forms/custom-schema-components' },
    { text: 'Schema Fields', link: '/forms/schema-fields' },
    {
        text: 'Built-in Schema Fields',
        collapsed: true,
        items: [
            { text: 'Checkbox Select Field', link: '/forms/schema-fields/checkbox-select-field' },
            { text: 'Code Editor Field', link: '/forms/schema-fields/code-editor-field' },
            { text: 'Color Field', link: '/forms/schema-fields/color-field' },
            { text: 'Combobox Field', link: '/forms/schema-fields/combobox-field' },
            { text: 'Date Time Field', link: '/forms/schema-fields/date-time-field' },
            { text: 'Group Field', link: '/forms/schema-fields/group-field' },
            { text: 'Lightswitch Field', link: '/forms/schema-fields/lightswitch-field' },
            { text: 'Number Field', link: '/forms/schema-fields/number-field' },
            { text: 'Radio Group Field', link: '/forms/schema-fields/radio-group-field' },
            { text: 'Select Field', link: '/forms/schema-fields/select-field' },
            { text: 'Text Field', link: '/forms/schema-fields/text-field' },
            { text: 'Textarea Field', link: '/forms/schema-fields/textarea-field' },
        ],
    },
    { text: 'Custom Schema Fields', link: '/forms/custom-schema-fields' },
];

const formsApiItems = [
    { text: 'Form APIs', link: '/forms/api/form-apis' },
    { text: 'SchemaForm API', link: '/forms/api/schema-form-api' },
    { text: 'SchemaForm Registry', link: '/forms/api/schema-form-registry' },
];

const formsRecipeItems = [
    { text: 'Build a Settings Screen', link: '/forms/recipes/build-a-settings-screen' },
];

const reactApiItems = [
    { text: 'Overview', link: '/react/api/overview' },
    { text: 'Public Hooks', link: '/react/api/public-hooks' },
    { text: 'Public Utilities', link: '/react/api/public-utilities' },
    { text: 'Public Types', link: '/react/api/public-types' },
    { text: 'React App APIs', link: '/react/api/react-app-apis' },
    { text: 'Styling APIs', link: '/react/api/styling-apis' },
];

const reactRecipeItems = [
    { text: 'Compose a Form with Field Primitives', link: '/react/recipes/compose-a-form-with-field-primitives' },
];

export default defineConfig({
    title: 'Plugin Kit',
    description: 'Web components, framework adapters, and Craft CP UI.',
    base: '/plugin-kit/',
    cleanUrls: true,
    appearance: false,
    lastUpdated: true,
    vite: {
        esbuild: {
            // Preview `*.tsx` files use the automatic runtime (no `import React`).
            jsx: 'automatic',
        },
        optimizeDeps: {
            exclude: [
                '@verbb/plugin-kit-react',
                '@verbb/plugin-kit-vue',
                '@verbb/plugin-kit-web',
                '@verbb/plugin-kit-icons',
            ],
            include: [
                'react',
                'react-dom',
                'react-dom/client',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
                '@fortawesome/react-fontawesome',
                'lodash-es',
                'punycode.js',
                '@codemirror/autocomplete',
                '@codemirror/commands',
                '@codemirror/lang-css',
                '@codemirror/lang-html',
                '@codemirror/lang-javascript',
                '@codemirror/lang-json',
                '@codemirror/language',
                '@codemirror/state',
                '@codemirror/view',
            ],
        },
        server: {
            port: 5281,
            strictPort: true,
            fs: {
                allow: [
                    monorepoRoot,
                    path.resolve(monorepoRoot, '..'),
                    path.dirname(vitepressTheme),
                    formieNodeModules,
                ],
            },
        },
        preview: {
            port: 4281,
            strictPort: true,
        },
        ssr: {
            noExternal: ['@babel/runtime', '@babel/runtime/helpers/interopRequireDefault', '@verbb/vitepress-theme'],
        },
        resolve: {
            // VitePress still ships Vite 5 — map TS `*.js` import specifiers to source files.
            extensionAlias: {
                '.js': ['.ts', '.tsx', '.js', '.jsx'],
            },
            alias: [
                {
                    // markdown-it imports `punycode.js`; package "main" is CJS without default export.
                    find: 'punycode.js',
                    replacement: path.join(monorepoRoot, 'node_modules/punycode.js/punycode.es6.js'),
                },
                {
                    find: 'lodash-es',
                    replacement: path.join(monorepoRoot, 'node_modules/lodash-es'),
                },
                {
                    find: 'mark.js/src/vanilla.js',
                    replacement: path.join(monorepoRoot, 'node_modules/mark.js/dist/mark.es6.js'),
                },
                {
                    find: '@verbb/vitepress-theme',
                    replacement: vitepressTheme,
                },
                {
                    find: '@fortawesome/fontawesome-svg-core',
                    replacement: path.join(formieNodeModules, '@fortawesome/fontawesome-svg-core'),
                },
                {
                    find: '@fortawesome/pro-regular-svg-icons',
                    replacement: path.join(formieNodeModules, '@fortawesome/pro-regular-svg-icons'),
                },
                {
                    find: '@fortawesome/pro-solid-svg-icons',
                    replacement: path.join(formieNodeModules, '@fortawesome/pro-solid-svg-icons'),
                },
                {
                    find: '@fortawesome/react-fontawesome',
                    replacement: path.join(formieNodeModules, '@fortawesome/react-fontawesome'),
                },
                {
                    find: '@verbb/plugin-kit',
                    replacement: fileURLToPath(new URL('../../plugin-kit-core/src/index.ts', import.meta.url)),
                },
                {
                    find: '@verbb/plugin-kit-codemirror-core',
                    replacement: fileURLToPath(new URL('../../plugin-kit-codemirror-core/src/index.ts', import.meta.url)),
                },
                {
                    find: '@verbb/plugin-kit-icons/all.js',
                    replacement: fileURLToPath(new URL('../../plugin-kit-icons/src/all.ts', import.meta.url)),
                },
                {
                    find: '@verbb/plugin-kit-icons',
                    replacement: fileURLToPath(new URL('../../plugin-kit-icons/src/index.ts', import.meta.url)),
                },
                {
                    find: '@verbb/plugin-kit-tiptap-core',
                    replacement: fileURLToPath(new URL('../../plugin-kit-tiptap-core/src/index.ts', import.meta.url)),
                },
                {
                    // Preserve Vite query suffixes (`?inline`) when rewriting CSS/subpath imports.
                    find: /^@verbb\/plugin-kit-web\/tokens\.css(\?.*)?$/,
                    replacement: `${fileURLToPath(new URL('../../plugin-kit-web/src/tokens/tokens.css', import.meta.url))}$1`,
                },
                {
                    find: /^@verbb\/plugin-kit-web\/styles\/utilities\/fouce\.css(\?.*)?$/,
                    replacement: `${fileURLToPath(new URL('../../plugin-kit-web/src/styles/utilities/fouce.css', import.meta.url))}$1`,
                },
                {
                    find: /^@verbb\/plugin-kit-web\/styles\/overlay-content\.css(\?.*)?$/,
                    replacement: `${fileURLToPath(new URL('../../plugin-kit-web/src/styles/overlay-content.css', import.meta.url))}$1`,
                },
                {
                    find: /^@verbb\/plugin-kit-web\/plugin-kit\.css(\?.*)?$/,
                    replacement: `${fileURLToPath(new URL('../../plugin-kit-web/src/styles/plugin-kit.css', import.meta.url))}$1`,
                },
                {
                    // TipTap split families (not */index.ts).
                    find: /^@verbb\/plugin-kit-web\/components\/tiptap-(content|editor|input)\.js$/,
                    replacement: `${pluginKitWebSrc}/components/tiptap/pk-tiptap-$1.ts`,
                },
                {
                    // Short family barrels: components/button.js → components/button/index.ts
                    find: /^@verbb\/plugin-kit-web\/components\/([^/]+)\.js$/,
                    replacement: `${pluginKitWebSrc}/components/$1/index.ts`,
                },
                {
                    // Component / deep imports before the package root alias (`$1` = path under src/).
                    find: /^@verbb\/plugin-kit-web\/(.*)$/,
                    replacement: `${pluginKitWebSrc}/$1`,
                },
                {
                    find: '@verbb/plugin-kit-web',
                    replacement: fileURLToPath(new URL('../../plugin-kit-web/src/index.ts', import.meta.url)),
                },
                // Canonical React adapters (not ss/plugin-kit-react).
                ...getPluginKitReactViteDevAliases(),
                {
                    find: '@verbb/plugin-kit-vue/components',
                    replacement: fileURLToPath(new URL('../../plugin-kit-vue/src/components/index.ts', import.meta.url)),
                },
                {
                    find: '@verbb/plugin-kit-vue/app',
                    replacement: fileURLToPath(new URL('../../plugin-kit-vue/src/app/index.ts', import.meta.url)),
                },
                {
                    find: '@verbb/plugin-kit-vue',
                    replacement: fileURLToPath(new URL('../../plugin-kit-vue/src/index.ts', import.meta.url)),
                },
            ],
            dedupe: [
                'react',
                'react-dom',
                'react-dom/client',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
                'vue',
            ],
        },
        plugins: [monorepoNodeModules(), tailwindcss()],
    },
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/plugin-kit/favicon.svg' }],
    ],
    themeConfig: {
        logo: '/plugin-kit-logo.svg',
        siteTitle: 'Plugin Kit',
        docsTheme: {
            homeLink: '/plugin-kit/',
            primary: '#1276de',
        },
        // activeMatch is required when a section’s entry link is deeper than the section root
        // (e.g. React → /react/getting-started/overview). Without it, /react/components/* falls
        // through and the header dropdown incorrectly shows the first nav item ("Overview").
        nav: [
            { text: 'Overview', link: '/overview/', activeMatch: '^/overview' },
            { text: 'Web', link: '/web/', activeMatch: '^/web' },
            { text: 'React', link: '/react/', activeMatch: '^/react' },
            { text: 'Vue', link: '/vue/getting-started/overview', activeMatch: '^/vue' },
            { text: 'Forms', link: '/forms/', activeMatch: '^/forms' },
        ],
        sidebar: {
            '/overview/': [
                {
                    text: 'Plugin Kit',
                    items: [
                        { text: 'Overview', link: '/overview/' },
                    ],
                },
            ],
            '/web/': [
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'Overview', link: '/web/' },
                        { text: 'Quick Start', link: '/web/getting-started/quick-start' },
                        { text: 'No-Build Step', link: '/web/getting-started/no-build-step' },
                        { text: 'Tokens & CSS', link: '/web/getting-started/tokens' },
                        { text: 'Reducing FOUCE', link: '/web/getting-started/fouce' },
                    ],
                },
                {
                    text: 'Components',
                    items: webComponentItems,
                },
            ],
            '/vue/': [
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'Overview', link: '/vue/getting-started/overview' },
                        { text: 'Quick Start', link: '/vue/getting-started/quick-start' },
                        { text: 'CSS Setup', link: '/vue/getting-started/css-setup' },
                        { text: 'Testing and Debugging', link: '/vue/getting-started/testing-and-debugging' },
                    ],
                },
                {
                    text: 'Vue App',
                    items: [
                        { text: 'Creating a Vue App', link: '/vue/app/creating-a-vue-app' },
                    ],
                },
                {
                    text: 'Components',
                    items: vueComponentItems,
                },
                {
                    text: 'API Reference',
                    items: [
                        { text: 'Overview', link: '/vue/api/overview' },
                        { text: 'App APIs', link: '/vue/api/app-apis' },
                        { text: 'Styling APIs', link: '/vue/api/styling-apis' },
                    ],
                },
            ],
            '/forms/': [
                {
                    text: 'SchemaForm',
                    items: formsItems,
                },
                {
                    text: 'API Reference',
                    items: formsApiItems,
                },
                {
                    text: 'Recipes',
                    items: formsRecipeItems,
                },
            ],
            '/react/': [
                { text: 'Getting Started', items: reactGettingStarted },
                { text: 'React App', items: reactAppItems },
                { text: 'Components', items: reactComponentItems },
                { text: 'API Reference', items: reactApiItems },
                { text: 'Recipes', items: reactRecipeItems },
            ],
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/verbb/plugin-kit' }],
        editLink: {
            pattern: 'https://github.com/verbb/plugin-kit/edit/main/docs/:path',
            text: 'Edit this page',
        },
        outline: [2, 3],
        lastUpdatedText: 'Last updated',
        search: {
            provider: 'local',
        },
    },
});
