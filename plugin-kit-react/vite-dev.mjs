import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcRoot = resolve(__dirname, 'src');
const pkgRoot = __dirname;

/**
 * Vite `resolve.alias` entries so apps can compile `@verbb/plugin-kit-react` from `src/`
 * during `vite` dev (HMR). Production builds should use `exports` → `dist/`.
 *
 * Mirrors public `package.json` `exports` subpaths (except `package.json`).
 * Required because in-package source files import via those public subpaths
 * (e.g. `@verbb/plugin-kit-react/utils`), which must not fall through to the bare
 * package alias (`…/src/index.ts/utils`).
 */
export function getPluginKitReactViteDevAliases() {
    return [
        {
            find: /^@verbb\/plugin-kit-react\/style\.css(\?.*)?$/,
            replacement: `${resolve(pkgRoot, 'style.css')}$1`,
        },
        {
            find: /^@verbb\/plugin-kit-react\/tailwind-theme\.css(\?.*)?$/,
            replacement: `${resolve(pkgRoot, 'tailwind-theme.css')}$1`,
        },
        {
            find: /^@verbb\/plugin-kit-react\/tailwind-preflight-scope\.css(\?.*)?$/,
            replacement: `${resolve(pkgRoot, 'tailwind-preflight-scope.css')}$1`,
        },
        {
            find: /^@verbb\/plugin-kit-react\/components$/,
            replacement: resolve(srcRoot, 'components/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-react\/components\/(.+)$/,
            replacement: `${srcRoot}/components/$1`,
        },
        {
            find: /^@verbb\/plugin-kit-react\/forms$/,
            replacement: resolve(srcRoot, 'forms/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-react\/forms\/(.+)$/,
            replacement: `${srcRoot}/forms/$1`,
        },
        {
            find: /^@verbb\/plugin-kit-react\/hooks$/,
            replacement: resolve(srcRoot, 'hooks/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-react\/hooks\/(.+)$/,
            replacement: `${srcRoot}/hooks/$1`,
        },
        {
            find: /^@verbb\/plugin-kit-react\/fault$/,
            replacement: resolve(srcRoot, 'fault/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-react\/fault\/(.+)$/,
            replacement: `${srcRoot}/fault/$1`,
        },
        {
            find: /^@verbb\/plugin-kit-react\/utils$/,
            replacement: resolve(srcRoot, 'utils/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-react\/utils\/(.+)$/,
            replacement: `${srcRoot}/utils/$1`,
        },
        {
            find: /^@verbb\/plugin-kit-react$/,
            replacement: resolve(srcRoot, 'index.ts'),
        },
    ];
}
