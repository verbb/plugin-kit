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
            name: 'PluginKit',
            fileName: (format) => `plugin-kit.${format}.js`,
        },
        rollupOptions: {
            // Externalize dependencies that shouldn't be bundled
            external: ['markdown-it'],
            output: {
                globals: {
                    'markdown-it': 'MarkdownIt',
                },
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
