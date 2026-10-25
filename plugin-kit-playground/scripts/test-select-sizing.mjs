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
    optimizeDeps: { entries: ['tests/select-sizing.html'] },
    resolve: {
        alias: [{
            find: /^@verbb\/plugin-kit-web\/components\/(.+)\.js$/,
            replacement: `${repo}/plugin-kit-web/${built ? 'dist' : 'src'}/components/$1.${built ? 'js' : 'ts'}`,
        }],
    },
});

async function geometry(page) {
    return page.locator('pk-select').evaluate((select) => {
        const panel = select.shadowRoot.querySelector('pk-popup').getContentElement();
        const rect = panel.getBoundingClientRect();
        const rows = [...select.querySelectorAll('pk-option')].map((option) => {
            const bounds = option.getBoundingClientRect();
            return { value: option.value, top: bounds.top - rect.top, bottom: bounds.bottom - rect.top };
        });
        return { height: panel.clientHeight, scrollTop: panel.scrollTop, top: rect.top, bottom: rect.bottom, rows };
    });
}

async function settle(page) {
    await page.locator('pk-select .panel[data-open]').waitFor({ state: 'visible' });
    await page.locator('pk-select').evaluate(async (select) => {
        await select.updateComplete;
        const panel = select.shadowRoot.querySelector('pk-popup').getContentElement();
        await Promise.all(panel.getAnimations().map((animation) => animation.finished.catch(() => {})));
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
}

try {
    await server.listen();
    for (const engine of [chromium, firefox, webkit]) {
        const browser = await engine.launch({ headless: true });
        try {
            const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });
            const errors = [];
            page.on('pageerror', (error) => errors.push(error.message));
            await page.goto(`${server.resolvedUrls.local[0]}tests/select-sizing.html`);
            await page.locator('body[data-ready="true"]').waitFor({ state: 'attached' });

            for (const size of ['xxs', 'xs', 'sm', 'default', 'lg', 'xl']) {
                await page.evaluate((size) => window.mountSelect(size), size);
                await page.getByRole('button', { name: 'Test choice', exact: true }).click();
                await settle(page);
                const initial = await geometry(page);
                const visible = initial.rows.filter((row) => row.bottom > 0.5 && row.top < initial.height - 0.5);
                assert.ok(visible.length > 0);
                assert.ok(Math.abs(visible[0].top) < 1, `${size}: first row is whole`);
                assert.ok(Math.abs(visible.at(-1).bottom - initial.height) < 1, `${size}: last row is whole ${JSON.stringify(initial)}`);
                assert.ok(visible.some((row) => row.value === '9'), `${size}: selected option is visible`);

                // Wheel scrolling can leave a partial row even with a whole-row initial height.
                await page.locator('pk-select').evaluate((select) => {
                    select.shadowRoot.querySelector('pk-popup').getContentElement().scrollTop += 9;
                });
                const beforeHover = await geometry(page);
                const partial = beforeHover.rows.find((row) => row.top < 0 && row.bottom > 1);
                assert.ok(partial);
                const panelBox = await page.getByRole('listbox').boundingBox();
                await page.mouse.move(panelBox.x + 20, panelBox.y + 2);
                await settle(page);
                assert.equal((await geometry(page)).scrollTop, beforeHover.scrollTop, `${size}: hover must not scroll`);
                assert.equal(await page.locator(`pk-option[value="${partial.value}"]`).evaluate((option) => option.highlighted), true, `${size}: hovered partial row is highlighted`);

                await page.keyboard.press('End');
                await settle(page);
                const end = await geometry(page);
                assert.ok(end.rows.at(-1).bottom <= end.height + 1, `${size}: keyboard reveals last option`);
                await page.keyboard.press('Home');
                await settle(page);
                assert.ok(Math.abs((await geometry(page)).rows[0].top) < 1, `${size}: keyboard reveals first option`);
                await page.keyboard.press('Escape');
                await page.getByRole('listbox').waitFor({ state: 'hidden' });
                assert.equal(await page.getByRole('button', { name: 'Test choice', exact: true }).evaluate((button) => button.matches(':focus')), true);
                await page.mouse.move(900, 700);
            }

            await page.evaluate(() => window.mountSelect('xs', true));
            await page.getByRole('button', { name: 'Test choice', exact: true }).click();
            await settle(page);
            const mixed = await geometry(page);
            const mixedVisible = mixed.rows.filter((row) => row.bottom > 0.5 && row.top < mixed.height - 0.5);
            assert.ok(mixedVisible.some((row) => row.value === '9'));
            assert.ok(Math.abs(mixedVisible[0].top) < 1, 'mixed rows start at a boundary');
            assert.ok(Math.abs(mixedVisible.at(-1).bottom - mixed.height) < 1, 'mixed rows end at a boundary');
            await page.setViewportSize({ width: 1000, height: 220 });
            await settle(page);
            const constrained = await geometry(page);
            assert.ok(constrained.top >= -1 && constrained.bottom <= 221, 'menu fits a short viewport');
            await page.setViewportSize({ width: 1000, height: 800 });
            await settle(page);
            assert.ok((await geometry(page)).height > constrained.height, 'menu grows when space returns');
            await page.keyboard.press('Escape');
            await page.getByRole('listbox').waitFor({ state: 'hidden' });

            await page.evaluate(async () => {
                const select = await window.mountSelect('xs');
                select.value = '0';
                select.querySelector('pk-option').innerHTML = '<div style="height: 400px">Oversized option</div>';
            });
            await page.getByRole('button', { name: 'Test choice', exact: true }).click();
            await settle(page);
            const oversized = await geometry(page);
            assert.ok(oversized.height > 0 && oversized.height <= 192, 'oversized row remains bounded and scrollable');
            await page.keyboard.press('End');
            await settle(page);
            const oversizedEnd = await geometry(page);
            assert.ok(oversizedEnd.rows.at(-1).bottom <= oversizedEnd.height + 1, 'keyboard can navigate beyond an oversized row');
            await page.keyboard.press('Enter');
            await page.getByRole('listbox').waitFor({ state: 'hidden' });
            assert.equal(await page.locator('pk-select').evaluate((select) => select.value), '15', 'keyboard selection still changes the value');
            assert.deepEqual(errors, [], 'no browser exceptions');
            console.log(`PASS Select sizing and pointer/keyboard behaviour (${engine.name()}, ${built ? 'built package' : 'source'})`);
        } finally {
            await browser.close();
        }
    }
} finally {
    await server.close();
}
