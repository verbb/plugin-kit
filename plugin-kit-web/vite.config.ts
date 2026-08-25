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
        'connect/register-cp-connect': path.resolve(__dirname, 'src/connect/register-cp-connect.ts'),
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
    // Multiple Craft plugins each ship a Plugin Kit copy. Lit's `@customElement`
    // throws on the second define of the same tag — use our idempotent decorator.
    resolve: {
        alias: {
            '@lit/reactive-element/decorators/custom-element.js': path.resolve(
                __dirname,
                'src/internal/safe-custom-element.ts',
            ),
        },
    },
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

                // Self-package CSS (e.g. connect/register-cp-connect) resolves via package
                // exports at consumer build time. dist/*.css is emitted in closeBundle, so
                // Rolldown must not try to resolve these during our own lib build.
                if (id.startsWith('@verbb/plugin-kit-web/') && id.endsWith('.css')) {
                    return true;
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
        }),
        emitPluginKitStyles('dist'),
    ],
});
