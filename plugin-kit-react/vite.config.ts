import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { defineConfig } from 'vite';
import path from 'path';

// Vite Plugins
import DtsPlugin from 'vite-plugin-dts';

const sourceEntryPattern = /\.(js|jsx|ts|tsx)$/;
const sourceExcludePatterns = [
    /\/stories\//,
    /\/visual-tests\//,
    /\.stories\.[jt]sx?$/,
    /\.test\.[jt]sx?$/,
];

function collectSourceEntries(sourceRoot: string, currentDir = sourceRoot, entries: Record<string, string> = {}) {
    for (const dirent of fs.readdirSync(currentDir, { withFileTypes: true })) {
        const fullPath = path.join(currentDir, dirent.name);

        if (dirent.isDirectory()) {
            collectSourceEntries(sourceRoot, fullPath, entries);
            continue;
        }

        if (!sourceEntryPattern.test(fullPath) || sourceExcludePatterns.some((pattern) => pattern.test(fullPath))) {
            continue;
        }

        const relativePath = path.relative(sourceRoot, fullPath).replace(sourceEntryPattern, '');
        entries[relativePath] = fullPath;
    }

    return entries;
}

const copyPluginKitReactPublishAssets = () => ({
    name: 'copy-plugin-kit-react-publish-assets',
    async closeBundle() {
        await fsp.cp(path.resolve(__dirname, 'src/css'), path.resolve(__dirname, 'dist/css'), { recursive: true });
    },
});

const isExternalDependency = (id: string) => {
    if (id.startsWith('\0') || id.startsWith('.') || path.isAbsolute(id)) {
        return false;
    }

    // Jexl only ships CommonJS output. Bundle it so consumers don't need to
    // rely on their dev server's CJS interop for a linked package dependency.
    // Some React UI dependencies import Babel's CommonJS helper runtime. If we
    // leave those helpers external, browser consumers such as Craft CP can end
    // up with a raw `require("@babel/runtime/...")` in an ESM chunk.
    if (id === 'jexl' || id.startsWith('jexl/') || id === '@babel/runtime' || id.startsWith('@babel/runtime/')) {
        return false;
    }

    return !id.startsWith('@verbb/plugin-kit-react');
};

export default defineConfig({
    resolve: {
        alias: [
            { find: /^@verbb\/plugin-kit-react$/, replacement: path.resolve(__dirname, 'src/index.ts') },
            { find: /^@verbb\/plugin-kit-react\/(.*)$/, replacement: `${path.resolve(__dirname, 'src')}/$1` },
        ],
    },
    build: {
        lib: false,
        rollupOptions: {
            input: collectSourceEntries(path.resolve(__dirname, 'src')),
            external: isExternalDependency,
            preserveEntrySignatures: 'exports-only',
            output: {
                format: 'es',
                preserveModules: true,
                preserveModulesRoot: path.resolve(__dirname, 'src'),
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
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
            exclude: [
                'src/**/*.stories.*',
                'src/**/*.test.*',
                'src/visual-tests/**/*',
            ],
        }),

        copyPluginKitReactPublishAssets(),
    ],
});
