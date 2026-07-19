import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const srcRoot = resolve(__dirname, 'src');
const pkgRoot = __dirname;

/**
 * Vite `resolve.alias` entries so apps can compile `@verbb/plugin-kit-vue` from `src/`
 * during `vite` dev (HMR). Production builds should use `exports` → `dist/`.
 *
 * Mirrors public `package.json` `exports` subpaths (except `package.json`).
 * Required because in-package source files import via those public subpaths
 * (e.g. `@verbb/plugin-kit-vue/app`), which must not fall through to the bare
 * package alias (`…/src/index.ts/app`).
 */
export function getPluginKitVueViteDevAliases() {
    return [
        {
            find: /^@verbb\/plugin-kit-vue\/style\.css(\?.*)?$/,
            replacement: `${resolve(pkgRoot, 'style.css')}$1`,
        },
        {
            find: /^@verbb\/plugin-kit-vue\/tailwind-theme\.css(\?.*)?$/,
            replacement: `${resolve(pkgRoot, 'tailwind-theme.css')}$1`,
        },
        {
            find: /^@verbb\/plugin-kit-vue\/tailwind-preflight-scope\.css(\?.*)?$/,
            replacement: `${resolve(pkgRoot, 'tailwind-preflight-scope.css')}$1`,
        },
        {
            find: /^@verbb\/plugin-kit-vue\/components$/,
            replacement: resolve(srcRoot, 'components/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-vue\/app$/,
            replacement: resolve(srcRoot, 'app/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-vue\/forms$/,
            replacement: resolve(srcRoot, 'forms/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-vue\/hooks$/,
            replacement: resolve(srcRoot, 'hooks/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-vue\/fault$/,
            replacement: resolve(srcRoot, 'fault/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-vue\/utils$/,
            replacement: resolve(srcRoot, 'utils/index.ts'),
        },
        {
            find: /^@verbb\/plugin-kit-vue$/,
            replacement: resolve(srcRoot, 'index.ts'),
        },
    ];
}
