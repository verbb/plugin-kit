/** pk-after-show consumers must be able to focus content after popup positioning. */
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';
import { createServer } from 'vite';

const playground = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.dirname(playground);
const built = process.env.TEST_BUILT === '1';
const server = await createServer({
    configFile: false,
    root: playground,
    logLevel: 'error',
    server: { host: '127.0.0.1', port: 0, fs: { allow: [repo] } },
    optimizeDeps: { entries: ['tests/popover-focus.html'] },
    resolve: {
        alias: [{
            find: /^@verbb\/plugin-kit-web\/components\/(.+)\.js$/,
            replacement: `${repo}/plugin-kit-web/${built ? 'dist' : 'src'}/components/$1.${built ? 'js' : 'ts'}`,
        }],
    },
});

try {
    await server.listen();
    for (const engine of [chromium, firefox, webkit]) {
        const browser = await engine.launch({ headless: true });
        try {
            const page = await browser.newPage();
            const errors = [];
            page.on('pageerror', (error) => errors.push(error.message));
            await page.goto(`${server.resolvedUrls.local[0]}tests/popover-focus.html`);
            await page.locator('body[data-ready="true"]').waitFor({ state: 'attached' });
            await page.getByRole('button', { name: 'Configure variable', exact: true }).click();
            await page.locator('body[data-positioning-held="true"]').waitFor({ state: 'attached' });

            const beforeReveal = await page.evaluate(async () => {
                // Let the legacy attribute-only poll run while reveal is held.
                await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
                const shown = document.body.dataset.afterShow === 'true';
                window.releasePositioning();
                return shown;
            });
            assert.equal(beforeReveal, false, 'after-show must wait until the popup is revealed');
            await page.locator('body[data-after-show="true"]').waitFor({ state: 'attached' });
            assert.equal(await page.locator('body').getAttribute('data-visibility-at-show'), 'visible');
            assert.equal(await page.getByRole('textbox', { name: 'Default if empty', exact: true }).evaluate((input) => input.matches(':focus')), true);
            assert.deepEqual(errors, [], 'no browser exceptions');
            console.log(`PASS popover focus (${engine.name()}, ${built ? 'built package' : 'source'})`);
        } finally {
            await browser.close();
        }
    }
} finally {
    await server.close();
}
