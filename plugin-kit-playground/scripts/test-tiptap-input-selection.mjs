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
    optimizeDeps: { entries: ['tests/tiptap-input-selection.html'] },
    resolve: {
        alias: [{
            find: /^@verbb\/plugin-kit-web\/components\/(.+)\.js$/,
            replacement: `${repo}/plugin-kit-web/${built ? 'dist' : 'src'}/components/$1.${built ? 'js' : 'ts'}`,
        }],
    },
});

async function state(page) {
    return page.locator('pk-tiptap-input').evaluate(async (input) => {
        await input.updateComplete;
        const { anchor, head } = input.editorInstance.state.selection;
        return { value: input.value, anchor, head, changes: window.changes.slice() };
    });
}

async function caret(page, offset) {
    await page.getByRole('textbox').click({ position: { x: 3, y: 10 } });
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+ArrowLeft' : 'Home');
    for (let i = 0; i < offset; i++) await page.keyboard.press('ArrowRight');
    await page.waitForFunction((offset) => document.querySelector('pk-tiptap-input').editorInstance.state.selection.head === offset, offset);
}

try {
    await server.listen();
    for (const engine of [chromium, firefox, webkit]) {
        console.log('Testing', engine.name());
        const browser = await engine.launch({ headless: true });
        try {
            const page = await browser.newPage();
            const errors = [];
            page.on('pageerror', (error) => errors.push(error.message));
            await page.goto(`${server.resolvedUrls.local[0]}tests/tiptap-input-selection.html`);
            await page.locator('body[data-ready="true"]').waitFor({ state: 'attached' });

            await page.evaluate(() => {
                window.componentErrors = [];
                document.addEventListener('pk-error', (event) => window.componentErrors.push(event.detail.message));
            });
            await page.getByRole('textbox').fill('wwwwww{form:name}wwwwww');
            await page.getByRole('button', { name: 'Form Name', exact: true }).waitFor();
            await page.evaluate(() => { window.changes = []; });
            await caret(page, 2);
            await page.keyboard.type('2');
            assert.equal((await state(page)).head, 3, 'typing before a chip keeps the caret');
            await page.keyboard.type('3');
            assert.equal((await state(page)).value, 'ww23wwww{form:name}wwwwww');
            assert.equal((await state(page)).changes.length, 2, 'one change per keystroke');

            await page.evaluate(() => window.mountInput());
            await page.getByRole('textbox').click({ position: { x: 3, y: 10 } });
            await page.keyboard.press(process.platform === 'darwin' ? 'Meta+ArrowRight' : 'End');
            await page.keyboard.press('ArrowLeft');
            await page.keyboard.type('AB');
            assert.equal((await state(page)).value, 'wwwwww{form:name}wwwwwABw', 'typing after a chip keeps its position');

            await page.evaluate(() => window.mountInput());
            await caret(page, 2);
            await page.keyboard.press('Shift+ArrowRight');
            await page.keyboard.press('Shift+ArrowRight');
            await page.waitForFunction(() => document.querySelector('pk-tiptap-input').editorInstance.state.selection.head === 4);
            const selection = await state(page);
            assert.deepEqual([selection.anchor, selection.head], [2, 4]);
            await page.evaluate(() => window.refreshCategories('Renamed form'));
            assert.equal(await page.getByRole('button', { name: 'Renamed form', exact: true }).count(), 1);
            const renamed = await state(page);
            assert.deepEqual([renamed.anchor, renamed.head], [selection.anchor, selection.head], 'label changes preserve a selection');
            assert.deepEqual(renamed.changes, [], 'label updates do not emit value changes');
            await page.keyboard.type('X');
            assert.equal((await state(page)).value, 'wwXww{form:name}wwwwww', 'typing replaces the preserved selection');

            await page.evaluate(() => window.mountInput('wwwwww{form:name}wwwwww', false));
            await caret(page, 2);
            await page.evaluate(() => window.refreshCategories());
            assert.equal((await state(page)).head, 2, 'late category hydration keeps the caret');
            assert.equal(await page.getByRole('button', { name: 'Form Name', exact: true }).count(), 1);
            await page.keyboard.type('Q');
            await page.getByRole('button', { name: 'Reset', exact: true }).click();
            assert.equal((await state(page)).value, 'wwwwww{form:name}wwwwww', 'form reset still restores the default');

            await page.evaluate(() => window.mountInput('plain text'));
            await caret(page, 2);
            await page.keyboard.type('AB');
            assert.equal((await state(page)).value, 'plABain text', 'plain text editing remains unchanged');
            await page.evaluate(() => window.mountInput('wwwwww{form:name}'));
            await caret(page, 2);
            await page.keyboard.type('AB');
            assert.equal((await state(page)).value, 'wwABwwww{form:name}', 'a trailing chip preserves its cursor marker');
            assert.equal((await state(page)).head, 4);

            await page.evaluate(() => window.mountInput(''));
            await page.getByRole('textbox').fill('hello');
            await page.getByRole('button', { name: 'Reset', exact: true }).click();
            assert.equal((await state(page)).value, '', 'empty default reset still clears the editor');
            assert.deepEqual(await page.evaluate(() => window.componentErrors), [], 'no component render failures');
            assert.deepEqual(errors, [], 'no browser exceptions');
            console.log(`PASS TipTap input selection (${engine.name()}, ${built ? 'built package' : 'source'})`);
        } finally {
            await browser.close();
        }
    }
} finally {
    await server.close();
}
