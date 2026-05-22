import path from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin as PostcssPlugin, Rule as PostcssRule } from 'postcss';
import TailwindShadowDOM from 'vite-plugin-tailwind-shadowdom';
import { defineConfig } from 'vite';

function createDataStatePseudoPlugin(): PostcssPlugin {
    return {
        postcssPlugin: 'visual-tests-data-state-pseudo',
        Rule(rule: PostcssRule & { __dataStatePatched?: boolean }) {
            if (rule.__dataStatePatched) {
                return;
            }

            const ruleFile = rule.source?.input?.file;
            if (!ruleFile) {
                return;
            }

            const normalizedFile = ruleFile.replace(/\\/g, '/');
            if (!normalizedFile.includes('/plugin-kit-react/src/css/style.css')) {
                return;
            }

            if (!rule.selector || !rule.selector.includes(':')) {
                return;
            }

            if (rule.parent?.type === 'atrule' && rule.parent.name === 'keyframes') {
                return;
            }

            const replacements: Array<{ regex: RegExp; pseudo: string; attrs: string[] }> = [
                { pseudo: ':focus-visible', attrs: ['[data-state=focus-visible]'], regex: /:focus-visible/g },
                { pseudo: ':focus', attrs: ['[data-state=focus]'], regex: /:focus(?!-visible)/g },
                { pseudo: ':hover', attrs: ['[data-state=hover]'], regex: /:hover/g },
                { pseudo: ':active', attrs: ['[data-state=active]'], regex: /:active/g },
            ];

            const newSelectors = new Set<string>();
            const selectors = rule.selector.split(',').map((selector) => selector.trim());

            selectors.forEach((selector) => {
                if (selector.includes(':not(') || selector.includes('[data-state=')) {
                    return;
                }

                replacements.forEach(({ pseudo, attrs, regex }) => {
                    if (!selector.includes(pseudo)) {
                        return;
                    }

                    attrs.forEach((attr) => {
                        const replaced = selector.replace(regex, attr);
                        if (replaced !== selector) {
                            newSelectors.add(replaced);
                        }
                    });
                });
            });

            if (newSelectors.size > 0) {
                rule.after(rule.clone({ selector: Array.from(newSelectors).join(', ') }));
                rule.__dataStatePatched = true;
            }
        },
    };
}

export default defineConfig({
    publicDir: path.resolve(__dirname, 'visual-tests/public'),
    plugins: [
        react(),
        tailwindcss(),
        TailwindShadowDOM(),
    ],
    resolve: {
        preserveSymlinks: true,
        alias: [
            { find: '@verbb/plugin-kit', replacement: path.resolve(__dirname, '../plugin-kit/src') },
            { find: /^@verbb\/plugin-kit-react$/, replacement: path.resolve(__dirname, 'src/index.ts') },
            { find: /^@verbb\/plugin-kit-react\/(.*)$/, replacement: `${path.resolve(__dirname, 'src')}/$1` },
        ],
    },
    css: {
        postcss: {
            plugins: [
                createDataStatePseudoPlugin(),
            ],
        },
    },
    server: {
        port: 5282,
        strictPort: true,
    },
    preview: {
        port: 4282,
        strictPort: true,
    },
    build: {
        outDir: 'dist-visual-tests',
        emptyOutDir: true,
        minify: false,
        cssMinify: false,
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            input: path.resolve(__dirname, 'visual-tests/index.html'),
        },
    },
});
