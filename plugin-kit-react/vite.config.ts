import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import DtsPlugin from 'vite-plugin-dts';

const resolveEntries = (dir: string, prefix: string, extensions: string[]) => {
    const absDir = path.resolve(__dirname, dir);
    const entries: Record<string, string> = {};

    if (!fs.existsSync(absDir)) {
        return entries;
    }

    for (const file of fs.readdirSync(absDir)) {
        if (!extensions.some((ext) => file.endsWith(ext))) {
            continue;
        }

        // Barrel / index files are registered separately as lib entries.
        if (file.startsWith('index.')) {
            continue;
        }

        const name = file.replace(/\.(tsx?|jsx?)$/, '');
        entries[`${prefix}/${name}`] = path.join(absDir, file);
    }

    return entries;
};

export default defineConfig({
    build: {
        lib: {
            entry: {
                index: path.resolve(__dirname, 'src/index.ts'),
                'components/index': path.resolve(__dirname, 'src/components/index.ts'),
                ...resolveEntries('src/components', 'components', ['.ts', '.tsx']),
                'forms/index': path.resolve(__dirname, 'src/forms/index.ts'),
                ...resolveEntries('src/forms/fields', 'forms/fields', ['.ts', '.tsx']),
                'app/index': path.resolve(__dirname, 'src/app/index.ts'),
                'utils/index': path.resolve(__dirname, 'src/utils/index.ts'),
                'hooks/index': path.resolve(__dirname, 'src/hooks/index.ts'),
                'fault/index': path.resolve(__dirname, 'src/fault/index.ts'),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: (id) => {
                if (id.startsWith('\0') || id.startsWith('.') || path.isAbsolute(id)) {
                    return false;
                }

                return !id.startsWith('@verbb/plugin-kit-react');
            },
            output: {
                // Keep 1:1 module layout so `import { Button } from '.../components'` can
                // tree-shake TipTap/EditableTable (and deep `./components/Button` works).
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
            // Emit per-source declarations preserving the directory structure so each lib
            // entry (`index`, `components/index`, `forms/index`) resolves its own re-exports.
            // `rollupTypes` only bundles a single entry correctly, which clobbers the others.
            include: ['src/**/*.ts', 'src/**/*.tsx'],
        }),
    ],
});
