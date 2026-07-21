import fs from 'node:fs/promises';
import { defineConfig } from 'vite';
import path from 'path';

// Vite Plugins
import DtsPlugin from 'vite-plugin-dts';

const copyPluginKitPublishAssets = () => ({
    name: 'copy-plugin-kit-publish-assets',
    async closeBundle() {
        await fs.cp(path.resolve(__dirname, 'eslint'), path.resolve(__dirname, 'dist/eslint'), { recursive: true });
        await fs.cp(path.resolve(__dirname, 'prettier'), path.resolve(__dirname, 'dist/prettier'), { recursive: true });
    },
});

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            // Externalize dependencies that shouldn't be bundled
            external: ['markdown-it'],
            output: {
                // Preserve the src module structure so consumers can cherry-pick
                // subpaths (e.g. `utils/string`) and heavy deps like markdown-it
                // only enter a bundle when the module that uses them is imported.
                preserveModules: true,
                preserveModulesRoot: 'src',
                entryFileNames: '[name].js',
            },
        },
        sourcemap: true,
        outDir: 'dist',
        emptyOutDir: true,
        minify: false,
    },

    plugins: [
        // Generate TypeScript declaration files
        // https://github.com/qmhc/vite-plugin-dts
        DtsPlugin({
            insertTypesEntry: true,
        }),

        copyPluginKitPublishAssets(),
    ],
});
