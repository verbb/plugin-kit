import path from 'node:path';
import { defineConfig } from 'vite';
import DtsPlugin from 'vite-plugin-dts';
import { LOADER_COMPONENT_ENTRIES } from './src/component-registry.ts';
import { emitPluginKitStyles } from './vite.styles-plugin.ts';

const resolveLoaderEntries = () => {
    const entries: Record<string, string> = {
        'plugin-kit.loader': path.resolve(__dirname, 'src/plugin-kit.loader.ts'),
    };

    for (const [outKey, srcRel] of Object.entries(LOADER_COMPONENT_ENTRIES)) {
        entries[outKey] = path.resolve(__dirname, srcRel);
    }

    return entries;
};

export default defineConfig({
    build: {
        lib: {
            entry: resolveLoaderEntries(),
            formats: ['es'],
        },
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                entryFileNames: (chunk) => {
                    if (chunk.name === 'plugin-kit.loader') {
                        return 'plugin-kit.loader.js';
                    }

                    return `${chunk.name}.js`;
                },
                chunkFileNames: 'chunks/[name]-[hash].js',
                manualChunks(id) {
                    if (id.includes('node_modules/lit')) {
                        return 'lit';
                    }

                    if (id.includes('node_modules/@lit')) {
                        return 'lit';
                    }

                    if (id.includes('node_modules/@floating-ui')) {
                        return 'floating-ui';
                    }

                    if (id.includes('node_modules/@tiptap')) {
                        return 'tiptap';
                    }

                    if (id.includes('node_modules/@codemirror') || id.includes('node_modules/codemirror')) {
                        return 'codemirror';
                    }

                    if (id.includes('plugin-kit-web/src/base')) {
                        return 'pk-base';
                    }

                    if (id.includes('plugin-kit-web/src/a11y')) {
                        return 'pk-a11y';
                    }
                },
            },
        },
        // No-build CDN consumers don't need maps; they roughly double published package weight.
        sourcemap: false,
        outDir: 'dist-loader',
        emptyOutDir: true,
        minify: false,
    },
    plugins: [
        DtsPlugin({
            entryRoot: 'src',
            outDir: 'dist-loader',
            insertTypesEntry: false,
            rollupTypes: false,
            include: ['src/utilities/**/*.ts', 'src/plugin-kit.ts', 'src/plugin-kit.loader.ts'],
        }),
        emitPluginKitStyles('dist-loader'),
    ],
});
