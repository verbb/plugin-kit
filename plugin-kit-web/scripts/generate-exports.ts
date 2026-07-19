import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    BUNDLER_COMPONENT_ENTRIES,
    COMPONENT_FAMILY_ENTRIES,
} from '../src/component-registry.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.resolve(__dirname, '../package.json');

const STATIC_EXPORTS = {
    '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
    },
    './register': {
        types: './dist/register.d.ts',
        import: './dist/register.js',
    },
    './plugin-kit': {
        types: './dist/plugin-kit.d.ts',
        import: './dist/plugin-kit.js',
    },
    './register-components': {
        types: './dist/register-components.d.ts',
        import: './dist/register-components.js',
    },
    './plugin-kit.loader.js': {
        types: './dist-loader/plugin-kit.loader.d.ts',
        default: './dist-loader/plugin-kit.loader.js',
    },
    './plugin-kit.css': {
        style: './dist/plugin-kit.css',
        default: './dist/plugin-kit.css',
    },
    './styles/utilities/fouce.css': {
        style: './dist/utilities/fouce.css',
        default: './dist/utilities/fouce.css',
    },
    './styles/overlay-content.css': {
        style: './dist/styles/overlay-content.css',
        default: './dist/styles/overlay-content.css',
    },
    './tokens.css': {
        style: './dist/tokens.css',
        default: './dist/tokens.css',
    },
    './icons': {
        types: './dist/icons/index.d.ts',
        import: './dist/icons/index.js',
    },
    './package.json': './package.json',
} as const;

function exportTarget(distKey: string) {
    return {
        types: `./dist/${distKey}.d.ts`,
        import: `./dist/${distKey}.js`,
        default: `./dist/${distKey}.js`,
    };
}

function componentExports(): Record<string, ReturnType<typeof exportTarget>> {
    const exports: Record<string, ReturnType<typeof exportTarget>> = {};

    // Deep per-tag paths (typed class imports, fine-grained cherry-pick).
    for (const key of Object.keys(BUNDLER_COMPONENT_ENTRIES).sort()) {
        const target = exportTarget(key);
        exports[`./${key}.js`] = target;
        exports[`./${key}`] = target;
    }

    // Short family paths — preferred Craft CP registration DX.
    for (const family of Object.keys(COMPONENT_FAMILY_ENTRIES).sort()) {
        const distKey = `components/${family}`;
        const target = exportTarget(distKey);
        exports[`./components/${family}.js`] = target;
        exports[`./components/${family}`] = target;
    }

    return exports;
}

export async function generateExports(): Promise<Record<string, unknown>> {
    const pkg = JSON.parse(await fs.readFile(packageJsonPath, 'utf8')) as {
        exports?: Record<string, unknown>;
        [key: string]: unknown;
    };

    pkg.exports = {
        ...STATIC_EXPORTS,
        ...componentExports(),
    };

    await fs.writeFile(packageJsonPath, `${JSON.stringify(pkg, null, 4)}\n`, 'utf8');

    return pkg.exports;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
    const exports = await generateExports();
    const componentCount = Object.keys(BUNDLER_COMPONENT_ENTRIES).length;
    const familyCount = Object.keys(COMPONENT_FAMILY_ENTRIES).length;
    console.log(`Generated package.json exports: ${componentCount} tag entries, ${familyCount} family entries`);
    console.log(`Total export keys: ${Object.keys(exports).length}`);
}
