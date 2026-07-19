import fs from 'node:fs/promises';
import path from 'node:path';

import { generateFouceCss } from './scripts/generate-fouce-css.ts';

/**
 * Emit published CSS into `dist/`.
 * `plugin-kit.css` is flattened (tokens + FOUCE + overlay chrome) so consumers can
 * import one file without resolving source-relative `@import` paths from `node_modules`.
 */
export const emitPluginKitStyles = (outDir: string) => ({
    name: 'emit-plugin-kit-styles',
    async closeBundle() {
        const dist = path.resolve(outDir);
        const tokensSrc = path.resolve(__dirname, 'src/tokens/tokens.css');
        const overlaySrc = path.resolve(__dirname, 'src/styles/overlay-content.css');
        const tokensCss = await fs.readFile(tokensSrc, 'utf8');
        const overlayCss = await fs.readFile(overlaySrc, 'utf8');
        const fouceCss = generateFouceCss();

        await fs.mkdir(dist, { recursive: true });
        await fs.writeFile(path.join(dist, 'tokens.css'), tokensCss, 'utf8');

        const fouceDest = path.join(dist, 'utilities/fouce.css');
        await fs.mkdir(path.dirname(fouceDest), { recursive: true });
        await fs.writeFile(fouceDest, fouceCss, 'utf8');

        // Light-DOM dialog/popover chrome — loaded beside components, not in each shadow tree.
        const overlayDest = path.join(dist, 'styles/overlay-content.css');
        await fs.mkdir(path.dirname(overlayDest), { recursive: true });
        await fs.writeFile(overlayDest, overlayCss, 'utf8');

        // Aggregate for the default Craft CP / bundler DX — no nested @imports.
        const aggregate = [
            '/* @verbb/plugin-kit-web/plugin-kit.css — tokens + FOUCE + overlay chrome (flattened for bundlers) */',
            tokensCss.trimEnd(),
            '',
            fouceCss.trimEnd(),
            '',
            overlayCss.trimEnd(),
            '',
        ].join('\n');

        await fs.writeFile(path.join(dist, 'plugin-kit.css'), aggregate, 'utf8');
    },
});
