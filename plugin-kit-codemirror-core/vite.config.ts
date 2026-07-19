import fs from 'node:fs';
import path from 'path';
import { defineConfig } from 'vite';
import DtsPlugin from 'vite-plugin-dts';

const sourceEntryPattern = /\.(js|jsx|ts|tsx)$/;
const sourceExcludePatterns = [
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

const isExternalDependency = (id: string) => {
    if (id.startsWith('\0') || id.startsWith('.') || path.isAbsolute(id)) {
        return false;
    }

    return !id.startsWith('@verbb/plugin-kit-codemirror-core');
};

export default defineConfig({
    build: {
        lib: {
            entry: collectSourceEntries(path.resolve(__dirname, 'src')),
            formats: ['es'],
            fileName: (_format, entryName) => `${entryName}.js`,
        },
        rollupOptions: {
            external: isExternalDependency,
            output: {
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
        DtsPlugin({
            insertTypesEntry: true,
            rollupTypes: false,
            exclude: ['**/*.test.ts'],
        }),
    ],
});
