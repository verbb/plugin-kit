import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = await createServer({
    root, configFile: path.join(root, 'vite.config.ts'), logLevel: 'error',
    server: { host: '127.0.0.1', port: 0, strictPort: false, open: false },
});
try {
    await server.listen();
    for (const engine of [chromium, firefox, webkit]) {
        const browser = await engine.launch();
        try {
            const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.goto(`${server.resolvedUrls.local[0]}tools/data-table-remote`);
            const table = page.locator('pk-data-table');
            const region = table.getByRole('region', { name: 'Remote membership requests' });
            const busy = async (sorting = false) => {
                // Capture the transient state together so a completed request cannot split assertions.
                const handle = await page.waitForFunction(() => {
                    const table = document.querySelector('pk-data-table');
                    const root = table?.shadowRoot;
                    if (!table?.loading || root?.querySelector('.scroll')?.getAttribute('aria-busy') !== 'true') return false;
                    const area = root.querySelector('.scroll').getBoundingClientRect();
                    const heading = root.querySelector('thead').getBoundingClientRect();
                    const indicator = root.querySelector('.loading-indicator');
                    const spinner = indicator?.querySelector('pk-spinner')?.getBoundingClientRect();
                    const body = root.querySelector('tbody');
                    return {
                        indicator: Boolean(indicator),
                        spinnerHeight: spinner?.height ?? 0,
                        centreOffset: spinner ? Math.abs(spinner.y + spinner.height / 2 - (area.y + heading.height + (area.height - heading.height) / 2)) : null,
                        bodyHeight: area.height - heading.height,
                        label: indicator?.textContent.trim() ?? '',
                        rowsVisible: getComputedStyle(body).visibility === 'visible',
                        opacity: getComputedStyle(body).opacity,
                        nextDisabled: root.querySelectorAll('.pager pk-button')[1].disabled,
                        selectionDisabled: root.querySelector('thead pk-checkbox').disabled,
                    };
                });
                const state = await handle.jsonValue();
                await handle.dispose();
                if (sorting) {
                    assert.equal(state.indicator, false);
                    assert.equal(state.rowsVisible, true);
                    assert.equal(state.opacity, '1');
                } else {
                    assert.equal(state.indicator, true);
                    assert.ok(state.spinnerHeight > 0);
                    assert.ok(state.bodyHeight >= 100);
                    assert.ok(state.centreOffset < 2);
                    assert.equal(state.label, '');
                }
                assert.equal(state.nextDisabled, true);
                assert.equal(state.selectionDisabled, true);
            };
            const idle = async () => {
                await page.waitForFunction(() => {
                    const table = document.querySelector('pk-data-table');
                    return table && !table.loading;
                });
                assert.equal(await region.getAttribute('aria-busy'), 'false');
                assert.equal(await table.locator('.loading-indicator').count(), 0);
            };
            await busy();
            await idle();
            assert.equal(await table.locator('tbody tr').count(), 8);
            // Leave enough time to inspect loading geometry on slower browser engines.
            await page.getByLabel('Response delay', { exact: true }).selectOption('1500');
            const firstRows = await table.locator('tbody').textContent();
            const height = (await table.boundingBox()).height;
            await table.getByRole('button', { name: 'Next', exact: true }).click();
            await busy();
            assert.equal((await table.locator('tbody').textContent()).trim(), firstRows.trim());
            assert.equal((await table.boundingBox()).height, height);
            await idle();
            assert.notEqual((await table.locator('tbody').textContent()).trim(), firstRows.trim());
            const sortButton = table.getByRole('button', { name: 'Sort by Requests', exact: true });
            const headingBefore = await sortButton.boundingBox();
            const rowsBeforeSort = await table.locator('tbody').innerText();
            const heightBeforeSort = (await table.boundingBox()).height;
            await sortButton.click();
            await busy(true);
            assert.equal(await table.locator('tbody').innerText(), rowsBeforeSort);
            assert.equal((await table.boundingBox()).height, heightBeforeSort);
            assert.equal(await sortButton.locator('pk-spinner').isVisible(), true);
            assert.equal(await sortButton.locator('.icon').count(), 0);
            assert.equal(await table.locator('thead pk-spinner').count(), 1);
            assert.deepEqual(await sortButton.boundingBox(), headingBefore);
            await idle();
            assert.equal(await sortButton.locator('pk-spinner').count(), 0);
            assert.equal(await sortButton.locator('.icon').isVisible(), true);
            assert.equal(await table.evaluate(el => el.query.pageIndex), 0);
            const search = table.getByRole('searchbox', { name: 'Search', exact: true });
            await search.fill('Alex');
            await busy();
            assert.equal(await table.locator('thead pk-spinner').count(), 0);
            await idle();
            assert.equal(await table.locator('tbody tr').count(), 8);
            assert.ok((await table.locator('tbody').innerText()).includes('Alex Morgan'));
            await table.getByRole('button', { name: 'Clear search', exact: true }).click();
            assert.equal(await search.inputValue(), '');
            await busy(); await idle();

            await table.getByRole('button', { name: 'Filters', exact: true }).click();
            const dialog = table.locator('.filter-dialog');
            await dialog.getByRole('button', { name: 'Add a filter', exact: true }).click();
            await dialog.locator('.add-filter').getByRole('option', { name: 'Status', exact: true }).click();
            await dialog.getByRole('button', { name: 'Status', exact: true }).click();
            await dialog.getByRole('option', { name: 'Pending', exact: true }).click();
            await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
            await busy(); await idle();
            assert.equal(await table.evaluate(el => el.query.filters.status), 'pending');
            assert.equal(await table.locator('tbody pk-status-label').count(), 8);
            assert.ok((await table.locator('tbody').innerText()).toLowerCase().includes('pending'));
            await table.getByRole('button', { name: /^Filters/ }).click();
            await dialog.getByRole('button', { name: 'Clear filters', exact: true }).click();
            await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
            await busy(); await idle();

            await page.getByLabel('Next response', { exact: true }).selectOption('error');
            await page.getByRole('button', { name: 'Reload current query', exact: true }).click();
            await busy(); await idle();
            await table.getByRole('button', { name: 'Retry', exact: true }).click();
            await busy(); await idle();
            assert.equal(await table.evaluate(el => el.error), '');
            await page.getByLabel('Next response', { exact: true }).selectOption('empty');
            await page.getByRole('button', { name: 'Reload current query', exact: true }).click();
            await busy(); await idle();
            assert.equal(await table.locator('tbody tr').count(), 0);
            await page.getByRole('button', { name: 'Reload current query', exact: true }).click();
            await busy(); await idle();

            await page.getByLabel('Response delay', { exact: true }).selectOption('1500');
            await search.fill('Alex'); await busy();
            await search.fill('Jamie');
            await page.getByRole('listitem').filter({ hasText: /^Cancelled.*"search":"Alex"/ }).waitFor();
            await idle();
            assert.ok((await table.locator('tbody').innerText()).includes('Jamie Ellis'));
            await page.getByLabel('Finish older requests late').check();
            await search.fill('Alex'); await busy();
            await search.fill('Jamie');
            await page.getByRole('listitem').filter({ hasText: /^Completed.*500ms.*"search":"Jamie"/ }).waitFor();
            await idle();
            const latest = await table.locator('tbody').innerText();
            await page.getByRole('listitem').filter({ hasText: /^Stale response.*"search":"Alex"/ }).waitFor();
            assert.equal(await table.locator('tbody').innerText(), latest);
            assert.equal(await table.evaluate(el => el.loading), false);
            await page.getByLabel('Finish older requests late').uncheck();

            await table.getByRole('button', { name: 'Export', exact: true }).click();
            await table.getByRole('menuitem', { name: 'CSV', exact: true }).click();
            await page.waitForFunction(() => document.querySelector('pk-data-table').exporting);
            const exportButton = table.locator('pk-button[slot="trigger"][loading]');
            await exportButton.waitFor();
            assert.equal(await exportButton.locator('pk-spinner').isVisible(), true);
            await page.waitForFunction(() => !document.querySelector('pk-data-table').exporting);
            assert.equal(await table.getByRole('button', { name: 'Export', exact: true }).isEnabled(), true);

            await page.getByRole('button', { name: 'Restart initial load', exact: true }).click();
            await busy();
            assert.equal(await table.locator('tbody tr').count(), 0);
            await page.getByRole('link', { name: 'Button', exact: true }).click();
            await page.getByRole('link', { name: 'Remote data table', exact: true }).click();
            await busy(); await idle();
            assert.equal(await table.locator('tbody tr').count(), 8);
            assert.deepEqual(errors, []);
            console.log(`${engine.name()}: remote loading, filters, pagination, retries, cancellation, stale responses, export and remount passed`);
        } finally {
            await browser.close();
        }
    }
} finally {
    await server.close();
}
