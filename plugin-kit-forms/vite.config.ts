import path from 'node:path';
import { defineConfig } from 'vite';
import DtsPlugin from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, 'src/index.ts'),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: (id) => {
                if (id.startsWith('\0') || id.startsWith('.') || path.isAbsolute(id)) {
                    return false;
                }

                // Jexl only ships CommonJS output. Bundle it (and its `@babel/runtime` helper
                // dependency) so no unresolved `require()` reaches the browser and consumers
                // don't need to rely on their dev server's CJS interop for a linked package.
                if (id === 'jexl' || id.startsWith('jexl/') || id.startsWith('@babel/runtime')) {
                    return false;
                }

                // Keep other runtime deps (lodash-es) external so consumers dedupe a single copy.
                return true;
            },
            output: {
                entryFileNames: '[name].js',
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
            rollupTypes: true,
            include: ['src/**/*.ts'],
        }),
    ],
});
