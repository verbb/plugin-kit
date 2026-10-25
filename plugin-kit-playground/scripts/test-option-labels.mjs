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
    optimizeDeps: { entries: ['tests/option-labels.html'] },
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
            await page.goto(`${server.resolvedUrls.local[0]}tests/option-labels.html`);
            await page.locator('body[data-ready="true"]').waitFor({ state: 'attached' });

            // Owners can ask for labels before an option has rendered its slots.
            const labels = await page.evaluate(async () => {
                const option = document.createElement('pk-option');
                option.value = '135';
                option.innerHTML = '<!-- template marker --><span slot="start" aria-hidden="true">↘</span>Down right';
                const before = [option.getLabel(), option.getSearchText()];
                document.querySelector('#fixture').append(option);
                await option.updateComplete;
                const after = [option.getLabel(), option.getSearchText()];
                option.matchQuery = 'right';
                await option.updateComplete;
                const highlighted = [option.getLabel(), option.getSearchText()];
                option.innerHTML = '<span slot="start">↘</span><strong>Direction</strong><span>Down right</span>';
                option.label = 'Short direction';
                await option.updateComplete;
                const rich = [option.getLabel(), option.getSearchText()];
                option.remove();
                return { before, after, highlighted, rich };
            });
            for (const phase of ['before', 'after', 'highlighted']) {
                assert.deepEqual(labels[phase], ['Down right', 'Down right'], `${phase}: decoration is not label/search text`);
            }
            assert.deepEqual(labels.rich, ['Short direction', 'Direction Down right'], 'explicit short labels preserve rich search text');

            await page.evaluate(async () => {
                document.querySelector('#fixture').innerHTML = `<pk-select value="135" aria-label="Direction">
                    <pk-option value="0"><span slot="start" aria-hidden="true">↑</span>Up</pk-option>
                    <pk-option value="135"><span slot="start" aria-hidden="true">↘</span>Down right</pk-option>
                </pk-select>`;
                await document.querySelector('pk-select').updateComplete;
            });
            const trigger = page.getByRole('button', { name: 'Direction', exact: true });
            assert.equal((await trigger.innerText()).replace(/\s/g, ''), '↘Downright', 'initial trigger shows the decoration once');
            await trigger.click();
            await page.getByRole('option', { name: 'Up', exact: true }).click();
            await page.getByRole('listbox').waitFor({ state: 'hidden' });
            assert.equal(await page.locator('pk-select').evaluate((select) => select.value), '0');
            assert.equal((await trigger.innerText()).replace(/\s/g, ''), '↑Up');
            await trigger.click();
            await page.getByRole('listbox').waitFor({ state: 'visible' });
            await page.locator('pk-select').evaluate(async (select) => {
                await select.updateComplete;
                const panel = select.shadowRoot.querySelector('pk-popup').getContentElement();
                await Promise.all(panel.getAnimations().map((animation) => animation.finished.catch(() => {})));
                await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            });
            await page.getByRole('option', { name: 'Up', exact: true }).press('End');
            await page.getByRole('option', { name: 'Down right', exact: true }).press('Enter');
            await page.getByRole('listbox').waitFor({ state: 'hidden' });
            assert.equal(await page.locator('pk-select').evaluate((select) => select.value), '135');
            assert.equal((await trigger.innerText()).replace(/\s/g, ''), '↘Downright');
            assert.deepEqual(errors, [], 'no browser exceptions');
            console.log(`PASS Option labels before render, after highlighting and in Select (${engine.name()}, ${built ? 'built package' : 'source'})`);
        } finally {
            await browser.close();
        }
    }
} finally {
    await server.close();
}
