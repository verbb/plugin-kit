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
    server: { host: '127.0.0.1', port: Number(process.env.TEST_PORT || 0), fs: { allow: [repo] } },
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
    browser = await ({ chromium, firefox, webkit }[process.env.TEST_BROWSER || 'chromium']).launch({
        headless: true,
        channel: process.env.CHROME_CHANNEL || undefined,
    });
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

    await page.evaluate(async () => {
        const dialog = document.querySelector('pk-dialog');
        await dialog.show();
        const firstClose = dialog.hide();
        await dialog.hide();
        await dialog.show();
        await firstClose;
    });
    assert.equal(await page.locator('pk-dialog').evaluate(dialog => dialog.open && dialog.shadowRoot.querySelector('dialog').matches(':modal')), true,
        'an older close must not hide a reopened dialog');

    for (let cycle = 0; cycle < 5; cycle++) {
        await page.evaluate(async () => {
            const dialog = document.querySelector('pk-dialog');
            dialog.open = false;
            await dialog.updateComplete;
            dialog.open = true;
            await dialog.updateComplete;
        });
        await page.waitForTimeout(550);
        assert.equal(await page.locator('pk-dialog').evaluate(dialog => dialog.open && dialog.shadowRoot.querySelector('dialog').matches(':modal')), true,
            'declarative reopening must supersede the close animation');
    }

    await page.evaluate(async () => {
        const dialog = document.querySelector('pk-dialog');
        await dialog.hide();
        const opening = dialog.show();
        const closing = dialog.hide();
        await Promise.all([opening, closing]);
    });
    assert.equal(await page.locator('pk-dialog').evaluate(dialog => dialog.open || dialog.shadowRoot.querySelector('dialog').open), false,
        'closing during entry must not emit a late open state');

    assert.deepEqual(errors, []);
    console.log('PASS: Craft picker layering, repeated dismissal, and interrupted dialog transitions');
} finally {
    await browser?.close();
    await server.close();
}
