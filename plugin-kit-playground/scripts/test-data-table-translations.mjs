import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createServer } from 'vite';

// Built-in data table strings translate through Craft's shared `plugin-kit` category, fall back to English, and
// yield to the `labels` property. The published JSON must list every built-in string.
const playground = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.dirname(playground);
const built = process.env.TEST_BUILT === '1';
const published = JSON.parse(await readFile(`${repo}/plugin-kit-web/translations/plugin-kit.json`, 'utf8'));
const server = await createServer({
    configFile: false,
    root: playground,
    logLevel: 'error',
    server: { host: '127.0.0.1', port: 0, fs: { allow: [repo] } },
    optimizeDeps: { entries: ['tests/data-table-translations.html'] },
    resolve: {
        alias: [
            {
                find: /^@verbb\/plugin-kit-web\/components\/(.+)\.js$/,
                replacement: `${repo}/plugin-kit-web/${built ? 'dist' : 'src'}/components/$1.${built ? 'js' : 'ts'}`,
            },
        ],
    },
});
try {
    await server.listen();
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage();
        const errors = [];
        page.on('pageerror', (error) => errors.push(error.message));
        await page.goto(`${server.resolvedUrls.local[0]}tests/data-table-translations.html`);
        const translated = page.locator('#translated');
        await translated.getByRole('cell', { name: 'Alex Morgan', exact: true }).waitFor();

        // Registered translations replace the English defaults, and placeholders are still filled afterwards.
        assert.equal(await translated.getByRole('searchbox', { name: 'Suchen', exact: true }).count(), 1);
        assert.equal(await translated.getByRole('navigation', { name: 'Seitennavigation für Contacts', exact: true }).count(), 1);
        // The filter controller has its own text helper, so check one of its strings too.
        assert.equal(await translated.getByRole('button', { name: 'Filter', exact: true }).count(), 1);

        // Unregistered strings stay English, and a plugin's own category is never consulted.
        await translated.getByRole('searchbox').fill('Alex');
        assert.equal(await translated.getByRole('button', { name: 'Clear search', exact: true }).count(), 1);
        assert.deepEqual([...new Set(await page.evaluate(() => window.Craft.calls))], ['plugin-kit']);

        // An explicit label wins over the shared translation.
        const overridden = page.locator('#overridden');
        assert.equal(await overridden.getByRole('searchbox', { name: 'Find contacts', exact: true }).count(), 1);
        assert.equal(await overridden.getByRole('navigation', { name: 'Seitennavigation für Contacts', exact: true }).count(), 1);

        // The published file is current with the component's defaults.
        const defaults = await page.evaluate(() => [...new Set(Object.values(window.dataTableLabels))]);
        assert.equal(published.category, 'plugin-kit');
        assert.deepEqual(published.messages, defaults);

        assert.deepEqual(errors, []);
    } finally {
        await browser.close();
    }
} finally {
    await server.close();
}
console.log('Data table translations passed.');
