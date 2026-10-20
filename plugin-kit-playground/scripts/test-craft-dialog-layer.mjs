import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.dirname(root);
const built = process.env.TEST_BUILT === '1';
const server = await createServer({
    configFile: false,
    root,
    logLevel: 'error',
    server: { host: '127.0.0.1', port: 0, fs: { allow: [repo] } },
    optimizeDeps: { entries: ['tests/craft-dialog-layer.html'] },
    resolve: {
        alias: [{
            find: /^@verbb\/plugin-kit-web\/components\/(.+)\.js$/,
            replacement: `${repo}/plugin-kit-web/${built ? 'dist' : 'src'}/components/$1.${built ? 'js' : 'ts'}`,
        }],
    },
});

let browser;

try {
    await server.listen();
    browser = await ({ chromium, firefox, webkit }[process.env.TEST_BROWSER || 'chromium']).launch({ headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${server.resolvedUrls.local[0]}tests/craft-dialog-layer.html`);
    await page.locator('body[data-ready=true]').waitFor();

    for (const preview of [false, true]) {
        // Preview's shade predates Bulk Add and outlives its child picker.
        await page.evaluate(enabled => {
            document.querySelector('.modal-shade')?.remove();
            if (enabled) {
                const shade = document.createElement('div');
                shade.className = 'modal-shade';
                document.body.prepend(shade);
            }
        }, preview);

        for (let cycle = 0; cycle < 2; cycle++) {
            await page.getByRole('button', { name: 'Open Bulk', exact: true }).click();
            await page.waitForFunction(() => document.querySelector('pk-dialog').shadowRoot.querySelector('dialog').matches(':modal'));
            await page.getByRole('button', { name: 'Choose asset', exact: true }).click();
            await page.waitForFunction(() => !document.querySelector('pk-dialog').shadowRoot.querySelector('dialog').matches(':modal'), null, { timeout: 3000 });
            await page.getByRole('button', { name: 'Cancel picker', exact: true }).click();
            await page.waitForFunction(() => document.querySelector('pk-dialog').shadowRoot.querySelector('dialog').matches(':modal'));
            await page.getByRole('button', { name: 'Close Bulk', exact: true }).click();
            await page.waitForFunction(() => !document.querySelector('pk-dialog').open);
        }
    }

    assert.deepEqual(errors, []);
    console.log('PASS: repeated Craft picker open/cancel with and without an existing Preview shade');
} finally {
    await browser?.close();
    await server.close();
}
