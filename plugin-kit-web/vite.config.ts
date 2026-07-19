import path from 'node:path';
import { defineConfig } from 'vite';
import DtsPlugin from 'vite-plugin-dts';
import { BUNDLER_COMPONENT_ENTRIES, COMPONENT_FAMILY_ENTRIES } from './src/component-registry.ts';
import { emitPluginKitStyles } from './vite.styles-plugin.ts';

const resolveBundlerEntries = () => {
    const entries: Record<string, string> = {
        index: path.resolve(__dirname, 'src/index.ts'),
        'plugin-kit': path.resolve(__dirname, 'src/plugin-kit.ts'),
        'register-components': path.resolve(__dirname, 'src/register-components.ts'),
        register: path.resolve(__dirname, 'src/register.ts'),
        'icons/index': path.resolve(__dirname, 'src/icons/index.ts'),
    };

    for (const [outKey, srcRel] of Object.entries(BUNDLER_COMPONENT_ENTRIES)) {
        entries[outKey] = path.resolve(__dirname, srcRel);
    }

    // Short family paths: dist/components/button.js ← src/components/button/index.ts
    for (const [family, srcRel] of Object.entries(COMPONENT_FAMILY_ENTRIES)) {
        entries[`components/${family}`] = path.resolve(__dirname, srcRel);
    }

    return entries;
};

export default defineConfig({
    build: {
        lib: {
            entry: resolveBundlerEntries(),
            formats: ['es'],
        },
        cssCodeSplit: false,
        rollupOptions: {
            external: (id) => {
                if (id.startsWith('\0') || id.startsWith('.') || path.isAbsolute(id)) {
                    return false;
                }

                // Rolldown decorator output — must ship in dist, not as a consumer dependency.
                if (id.startsWith('@oxc-project/runtime')) {
                    return false;
                }

                return !id.startsWith('@verbb/plugin-kit-web');
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name]-[hash].js',
            },
        },
        sourcemap: true,
        outDir: 'dist',
        emptyOutDir: true,
        minify: false,
    },
    plugins: [
        DtsPlugin({
            insertTypesEntry: true,
            rollupTypes: false,
            exclude: ['src/components/_legacy/**'],
        }),
        emitPluginKitStyles('dist'),
    ],
});
