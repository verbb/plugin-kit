import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';
import { createServer } from 'vite';
import { testDataTableRowOrder } from './test-data-table-row-order.mjs';
import { testDataTableHandlesActions } from './test-data-table-handles-actions.mjs';
import { testDataTableFilters } from './test-data-table-filters.mjs';
import { testDataTablePersistence } from './test-data-table-persistence.mjs';

const playground = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
);
const repo = path.dirname(playground);
const built = process.env.TEST_BUILT === '1';
const server = await createServer({
    configFile: false,
    root: playground,
    logLevel: 'error',
    server: { host: '127.0.0.1', port: 0, fs: { allow: [repo] } },
    optimizeDeps: { entries: ['tests/data-table.html'] },
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
    for (const engine of [chromium, firefox, webkit]) {
        const browser = await engine.launch({ headless: true });
        try {
            const page = await browser.newPage();
            const errors = [];
            page.on('pageerror', (error) => errors.push(error.message));
            await page.goto(
                `${server.resolvedUrls.local[0]}tests/data-table.html`,
            );
            const table = page.locator('#records');
            await table
                .getByRole('cell', { name: 'Alex Morgan', exact: true })
                .first()
                .waitFor();
            assert.equal(await table.locator('tbody tr').count(), 5);
            const badge = page.locator('#badge');
            const badgeAppearance = () =>
                badge.evaluate(async (el) => {
                    await el.updateComplete;
                    const dot = el.shadowRoot.querySelector('pk-status');
                    await dot.updateComplete;
                    const base = el.shadowRoot.querySelector('[part="base"]');
                    const indicator =
                        dot.shadowRoot.querySelector('[part="base"]');
                    return {
                        tone: base.dataset.tone,
                        background: getComputedStyle(base).backgroundColor,
                        transform: getComputedStyle(base).textTransform,
                        dotBackground:
                            getComputedStyle(indicator).backgroundColor,
                        dotRing: getComputedStyle(indicator).boxShadow,
                    };
                });
            const pendingBadge = await badgeAppearance();
            assert.equal(pendingBadge.tone, 'orange');
            assert.equal(pendingBadge.transform, 'uppercase');
            assert.notEqual(pendingBadge.background, 'rgba(0, 0, 0, 0)');
            assert.equal(await badge.getByRole('status').count(), 0);
            assert.equal(await badge.textContent(), 'Awaiting review');
            await badge.evaluate((el) => {
                el.status = 'inactive';
                el.textContent = 'Inactive';
            });
            const inactiveBadge = await badgeAppearance();
            assert.equal(inactiveBadge.tone, 'gray');
            assert.equal(inactiveBadge.dotBackground, 'rgba(0, 0, 0, 0)');
            assert.notEqual(inactiveBadge.dotRing, 'none');
            await badge.evaluate((el) => {
                el.status = 'future-state';
            });
            assert.equal((await badgeAppearance()).tone, 'gray');
            await table.evaluate((el) => {
                el.selectedKeys = [1];
            });
            await table.locator('tr[data-selected] pk-status-label').waitFor();
            assert.equal(
                await table
                    .locator('tr[data-selected] pk-status-label')
                    .evaluate(
                        (el) =>
                            getComputedStyle(
                                el.shadowRoot.querySelector('[part="base"]'),
                            ).color,
                    ),
                'rgb(255, 255, 255)',
            );
            await table.evaluate((el) => {
                el.selectedKeys = [];
            });

            assert.deepEqual(await table.evaluate((el) => el.query.sort), [
                { id: 'name', direction: 'asc' },
            ]);
            assert.equal(
                await table.locator('th[aria-sort="ascending"]').count(),
                1,
            );
            await table
                .getByRole('button', { name: 'Next', exact: true })
                .click();
            assert.equal(await table.evaluate((el) => el.query.pageIndex), 1);
            await table
                .getByRole('searchbox', { name: 'Search', exact: true })
                .fill('Jamie');
            await page.waitForFunction(
                () =>
                    document.querySelector('#records').query.search === 'Jamie',
            );
            assert.equal(await table.evaluate((el) => el.query.pageIndex), 0);
            assert.equal(
                await table
                    .getByRole('cell', { name: 'Jamie Ellis', exact: true })
                    .count(),
                5,
            );
            await table.getByRole('searchbox').fill('');
            await page.waitForFunction(
                () => document.querySelector('#records').query.search === '',
            );
            await table
                .getByRole('button', { name: 'Sort by Requests', exact: true })
                .click();
            assert.equal(
                await table.locator('thead th[aria-sort="ascending"]').count(),
                1,
            );
            await table
                .getByRole('button', { name: 'Sort by Requests', exact: true })
                .click();
            assert.match(
                await table.locator('tbody tr').first().innerText(),
                /202/,
            );
            // The third click returns to ascending, never an unmarked/source-order state.
            await table
                .getByRole('button', { name: 'Sort by Requests', exact: true })
                .click();
            assert.deepEqual(await table.evaluate((el) => el.query.sort), [
                { id: 'requests', direction: 'asc' },
            ]);
            await table
                .getByRole('button', { name: 'Sort by Created', exact: true })
                .click({ modifiers: ['Shift'] });
            assert.deepEqual(await table.evaluate((el) => el.query.sort), [
                { id: 'created', direction: 'asc' },
            ]);
            assert.equal(await table.locator('th[aria-sort]').count(), 1);
            await table
                .getByRole('button', { name: 'Filters', exact: true })
                .click();
            const filterDialog = table.locator('.filter-dialog');
            await filterDialog
                .getByRole('button', { name: 'Add a filter', exact: true })
                .click();
            await filterDialog
                .locator('.add-filter')
                .getByRole('option', { name: 'Status', exact: true })
                .click();
            await filterDialog
                .getByRole('button', { name: 'Status', exact: true })
                .click();
            await filterDialog
                .getByRole('option', { name: 'Pending', exact: true })
                .click();
            await filterDialog
                .getByRole('button', { name: 'Add a filter', exact: true })
                .click();
            await filterDialog
                .locator('.add-filter')
                .getByRole('option', { name: 'Requests', exact: true })
                .click();
            await filterDialog
                .getByRole('spinbutton', {
                    name: 'Requests: From',
                    exact: true,
                })
                .fill('1');
            assert.deepEqual(
                await table.evaluate((el) => el.query.filters),
                {},
            );
            await filterDialog
                .getByRole('button', { name: 'Apply', exact: true })
                .click();
            await table
                .getByRole('dialog', { name: 'Filter results' })
                .waitFor({ state: 'hidden' });
            assert.equal(
                await table.evaluate((el) => el.query.filters.status),
                'pending',
            );
            await table
                .getByRole('checkbox', {
                    name: 'Select this page',
                    exact: true,
                })
                .focus();
            await page.keyboard.press('Space');
            assert.equal(
                await table.evaluate((el) => el.selectedKeys.length),
                5,
            );
            await table
                .getByRole('button', { name: 'Next', exact: true })
                .click();
            assert.equal(
                await table.evaluate((el) => el.selectedKeys.length),
                5,
            );
            await table.getByRole('button', { name: /^Filters/ }).click();
            await table.locator('.filter-dialog').getByRole('button', { name: 'Clear filters', exact: true }).click();
            await table.locator('.filter-dialog').getByRole('button', { name: 'Apply', exact: true }).click();
            assert.equal(
                await table.evaluate((el) => el.selectedKeys.length),
                0,
            );
            await table
                .getByRole('button', { name: 'View', exact: true })
                .click();
            await table
                .getByRole('checkbox', { name: 'Created', exact: true })
                .focus();
            await page.keyboard.press('Space');
            assert.equal(
                await table
                    .getByRole('button', {
                        name: 'Sort by Created',
                        exact: true,
                    })
                    .count(),
                0,
            );
            await table
                .getByRole('button', {
                    name: 'Reorder Requests',
                    exact: true,
                })
                .focus();
            await page.keyboard.press('ArrowUp');
            assert.equal(
                (await table.evaluate((el) => el.view.columnOrder)).at(-1),
                'created',
            );
            // Pointer reordering can move a column across multiple positions.
            const handle = table.getByRole('button', {
                name: 'Reorder Requests',
                exact: true,
            });
            const target = table.getByRole('button', {
                name: 'Reorder Participant',
                exact: true,
            });
            const from = await handle.boundingBox();
            const to = await target.boundingBox();
            await page.mouse.move(
                from.x + from.width / 2,
                from.y + from.height / 2,
            );
            const orderBeforeDrag = await table.evaluate((el) => [
                ...el.view.columnOrder,
            ]);
            await page.mouse.down();
            await page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, {
                steps: 8,
            });
            // Preview moves the dragged row and its neighbors without applying the view yet.
            await table.locator('.column-option[data-dragging]').waitFor();
            assert.deepEqual(
                await table.evaluate((el) => el.view.columnOrder),
                orderBeforeDrag,
            );
            assert.ok((await handle.boundingBox()).y < from.y - 20);
            await page.waitForFunction(() => {
                const row = document
                    .querySelector('#records')
                    .shadowRoot.querySelector('[data-column="name"]');
                return (
                    new DOMMatrixReadOnly(getComputedStyle(row).transform).m42 >
                    20
                );
            });
            await page.mouse.up();
            assert.equal(
                (await table.evaluate((el) => el.view.columnOrder))[0],
                'requests',
            );
            // Escape restores the list, and a later pointerup must not commit it.
            const committedOrder = await table.evaluate((el) => [
                ...el.view.columnOrder,
            ]);
            const dragStart = await handle.boundingBox();
            const dragEnd = await target.boundingBox();
            await page.mouse.move(
                dragStart.x + dragStart.width / 2,
                dragStart.y + dragStart.height / 2,
            );
            await page.mouse.down();
            await page.mouse.move(
                dragEnd.x + dragEnd.width / 2,
                dragEnd.y + dragEnd.height / 2,
                { steps: 8 },
            );
            await table.locator('.column-option[data-dragging]').waitFor();
            await page.keyboard.press('Escape');
            await page.mouse.up();
            assert.equal(
                await table.locator('.column-option[data-dragging]').count(),
                0,
            );
            assert.deepEqual(
                await table.evaluate((el) => el.view.columnOrder),
                committedOrder,
            );
            assert.ok(
                await table
                    .getByRole('button', { name: 'Close', exact: true })
                    .isVisible(),
            );
            await table
                .getByRole('button', { name: 'Sort by', exact: true })
                .click();
            await table
                .getByRole('option', { name: 'Participant', exact: true })
                .click();
            await table
                .getByRole('button', { name: 'Descending', exact: true })
                .click();
            assert.deepEqual(await table.evaluate((el) => el.query.sort), [
                { id: 'name', direction: 'desc' },
            ]);
            await table
                .getByRole('button', { name: 'Use defaults', exact: true })
                .click();
            assert.deepEqual(await table.evaluate((el) => el.view), {
                hiddenColumns: [],
                columnOrder: [],
            });
            assert.deepEqual(await table.evaluate((el) => el.query.sort), [
                { id: 'name', direction: 'asc' },
            ]);
            await table
                .getByRole('button', { name: 'Close', exact: true })
                .click();
            assert.equal(
                await table
                    .getByRole('combobox', { name: 'Rows per page' })
                    .count(),
                0,
            );
            // Export is one request with a detached snapshot, not an actual download.
            await table.evaluate((el) => {
                el.exportFormats = [
                    { value: 'csv', label: 'CSV' },
                    { value: 'json', label: 'JSON', disabled: true },
                ];
                window.exportEvents = [];
                el.addEventListener('pk-export', (event) =>
                    window.exportEvents.push(event.detail),
                );
            });
            await table
                .getByRole('button', { name: 'Export', exact: true })
                .click();
            await table
                .getByRole('menuitem', { name: 'CSV', exact: true })
                .click();
            assert.equal(
                await page.evaluate(() => window.exportEvents.length),
                1,
            );
            assert.deepEqual(
                await page.evaluate(() => window.exportEvents[0].columnIds),
                ['name', 'status', 'created', 'requests'],
            );
            await table.evaluate((el) => {
                el.query.filters.status = 'pending';
            });
            assert.deepEqual(
                await page.evaluate(() => window.exportEvents[0].query.filters),
                {},
            );
            await table.evaluate((el) => {
                el.query = { ...el.query, filters: {} };
                el.exporting = true;
            });
            assert.equal(
                await table
                    .getByRole('button', { name: 'Exporting…', exact: true })
                    .isDisabled(),
                true,
            );
            await table.evaluate((el) => {
                el.exporting = false;
            });
            // Fixture mutation reproduces deleting the last page's remaining records.
            await table.evaluate((el) => {
                el.query = { ...el.query, pageIndex: 12 };
                el.rows = el.rows.slice(0, 2);
            });
            await page.waitForFunction(
                () => document.querySelector('#records').query.pageIndex === 0,
            );
            assert.equal(await table.locator('tbody tr').count(), 2);

            const plain = page.locator('#products');
            await plain
                .getByRole('cell', { name: 'Canvas tote', exact: true })
                .first()
                .waitFor();
            assert.equal(
                await plain.locator('table').getByRole('checkbox').count(),
                0,
            );
            assert.equal(await plain.locator('thead th').count(), 5);
            assert.equal(
                await plain.locator('thead th[data-sorted]').count(),
                1,
            );
            await plain
                .getByRole('button', { name: 'View', exact: true })
                .click();
            await plain
                .getByRole('button', { name: 'Ascending', exact: true })
                .click();
            await plain
                .getByRole('button', { name: 'Use defaults', exact: true })
                .click();
            assert.deepEqual(await plain.evaluate((el) => el.query.sort), [
                { id: 'subscribers', direction: 'desc' },
            ]);
            await plain
                .getByRole('button', { name: 'Sort by', exact: true })
                .click();
            assert.equal(
                await plain
                    .getByRole('option', { name: 'Default order', exact: true })
                    .count(),
                0,
            );
            await page.keyboard.press('Escape');
            await plain
                .getByRole('button', { name: 'Close', exact: true })
                .click();
            const remote = page.locator('#remote');
            await remote
                .getByRole('cell', { name: 'initial', exact: true })
                .waitFor();
            assert.deepEqual(await page.evaluate(() => window.lastRemoteSort), [
                { id: 'name', direction: 'desc' },
            ]);
            await remote.evaluate((el) => el.setQuery({ sort: [] }));
            await page.waitForFunction(
                () => !document.querySelector('#remote').loading,
            );
            assert.deepEqual(await remote.evaluate((el) => el.query.sort), [
                { id: 'name', direction: 'desc' },
            ]);
            await remote.getByRole('searchbox').fill('old');
            await page.waitForFunction(
                () => document.querySelector('#remote').query.search === 'old',
            );
            await remote.getByRole('searchbox').fill('new');
            await remote
                .getByRole('cell', { name: 'new', exact: true })
                .waitFor();
            await page.waitForFunction(() => window.oldFinished === true);
            assert.equal(
                await remote
                    .getByRole('cell', { name: 'old', exact: true })
                    .count(),
                0,
            );
            await remote.getByRole('searchbox').fill('failure');
            await remote
                .getByRole('button', { name: 'Retry', exact: true })
                .waitFor();
            await page.evaluate(() => {
                window.fail = false;
            });
            await remote
                .getByRole('button', { name: 'Retry', exact: true })
                .click();
            await remote
                .getByRole('cell', { name: 'failure', exact: true })
                .waitFor();

            const cursor = page.locator('#cursor');
            await cursor
                .getByRole('cell', { name: 'Alex Morgan', exact: true })
                .first()
                .waitFor();
            await cursor
                .getByRole('button', { name: 'Next', exact: true })
                .click();
            await page.waitForFunction(
                () =>
                    document.querySelector('#cursor').query.cursor === '1' &&
                    !document.querySelector('#cursor').loading,
            );
            assert.equal(
                await cursor
                    .getByRole('combobox', { name: 'Rows per page' })
                    .count(),
                0,
            );
            await cursor
                .getByRole('button', { name: 'Previous', exact: true })
                .click();
            await page.waitForFunction(
                () =>
                    document.querySelector('#cursor').query.cursor === '0' &&
                    !document.querySelector('#cursor').loading,
            );
            const selection = page.locator('#selection');
            const selectCell = (name) =>
                selection.getByRole('cell', { name, exact: true });
            await selectCell('Record 1').scrollIntoViewIfNeeded();
            const before = await selection.locator('table').boundingBox();
            const beforeFooter = await selection
                .locator('.footer-shell > .footer')
                .boundingBox();
            await selectCell('Record 1').click();
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1],
            );
            assert.equal(
                (await selection.locator('table').boundingBox()).y,
                before.y,
            );
            assert.equal(
                (
                    await selection
                        .locator('.footer-shell > .footer')
                        .boundingBox()
                ).height,
                beforeFooter.height,
            );
            assert.equal(
                await selection
                    .locator('.footer-shell > .footer')
                    .getByText('1 selected', { exact: true })
                    .isVisible(),
                true,
            );
            await selectCell('Record 4').click({ modifiers: ['Shift'] });
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 2, 4],
            );
            await selectCell('Record 2').click({ modifiers: ['Meta'] });
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 4],
            );
            await selectCell('Record 5').click({
                modifiers: [process.platform === 'darwin' ? 'Meta' : 'Control'],
            });
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 4, 5],
            );
            await selectCell('Record 3').click({ modifiers: ['Shift'] });
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 4, 5],
            );
            await selection
                .getByRole('button', { name: 'Cell action', exact: true })
                .click();
            assert.equal(await page.evaluate(() => window.cellActions), 1);
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 4, 5],
            );
            await selection
                .getByRole('link', { name: 'Open record', exact: true })
                .click();
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 4, 5],
            );
            await selectCell('Record 2').click();
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [2],
            );
            const checkbox = (id) =>
                selection.getByRole('checkbox', {
                    name: `Select ${id}`,
                    exact: true,
                });
            await selection
                .locator('pk-checkbox')
                .filter({
                    has: page.getByRole('checkbox', {
                        name: 'Select 1',
                        exact: true,
                    }),
                })
                .locator('[part=control]')
                .click();
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [2, 1],
            );
            await selection
                .locator('pk-checkbox')
                .filter({
                    has: page.getByRole('checkbox', {
                        name: 'Select 5',
                        exact: true,
                    }),
                })
                .locator('[part=control]')
                .click({ modifiers: ['Shift'] });
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 2, 4, 5],
            );
            await checkbox(4).focus();
            await page.keyboard.press('Space');
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 2, 5],
            );
            const selectedColor = await selection
                .locator('tr[data-selected]')
                .first()
                .evaluate((el) => ({
                    background: getComputedStyle(el).backgroundColor,
                    foreground: getComputedStyle(el).color,
                }));
            assert.notEqual(selectedColor.background, 'rgba(0, 0, 0, 0)');
            assert.equal(selectedColor.foreground, 'rgb(255, 255, 255)');
            await selection
                .getByRole('button', { name: 'Next', exact: true })
                .click();
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 2, 5],
            );
            await selectCell('Record 7').click({ modifiers: ['Shift'] });
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [7],
            );
            // Row selectors support keyboard navigation without intercepting cell controls.
            await selection
                .getByRole('button', { name: 'Previous', exact: true })
                .click();
            await selectCell('Record 1').click();
            await checkbox(1).focus();
            await page.keyboard.press('ArrowDown');
            assert.equal(
                await checkbox(2).evaluate(
                    (el) => el === el.getRootNode().activeElement,
                ),
                true,
            );
            await page.keyboard.press('Shift+ArrowDown');
            assert.equal(
                await checkbox(4).evaluate(
                    (el) => el === el.getRootNode().activeElement,
                ),
                true,
            );
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 2, 4],
            );
            await page.keyboard.press('End');
            assert.equal(
                await checkbox(5).evaluate(
                    (el) => el === el.getRootNode().activeElement,
                ),
                true,
            );
            await page.keyboard.press('Home');
            assert.equal(
                await checkbox(1).evaluate(
                    (el) => el === el.getRootNode().activeElement,
                ),
                true,
            );
            await page.keyboard.press('Control+a');
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [1, 2, 4, 5],
            );
            await page.keyboard.press('Escape');
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [],
            );
            await selection
                .getByRole('button', { name: 'Cell action', exact: true })
                .focus();
            await page.keyboard.press('Control+a');
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [],
            );
            await selection.evaluate((el) => {
                el.setQuery({ pageIndex: 1 });
                el.selectedKeys = [7];
            });
            await selection.evaluate((el) => {
                el.selectable = false;
            });
            await selectCell('Record 6').click({ modifiers: ['Meta'] });
            assert.deepEqual(
                await selection.evaluate((el) => el.selectedKeys),
                [7],
            );
            assert.equal(
                await selection.locator('tr[data-selected]').count(),
                0,
            );
            assert.equal(
                await selection.locator('table').getByRole('checkbox').count(),
                0,
            );
            await plain
                .locator('tbody tr')
                .first()
                .getByRole('cell')
                .first()
                .click({ modifiers: ['Shift'] });
            assert.deepEqual(await plain.evaluate((el) => el.selectedKeys), []);
            const index = page.locator('#index');
            await index
                .getByRole('button', { name: 'View', exact: true })
                .click();
            const viewTrigger = index.getByRole('button', {
                name: 'View',
                exact: true,
            });
            assert.equal(
                await viewTrigger.getAttribute('aria-expanded'),
                'true',
            );
            assert.equal(
                await viewTrigger.getAttribute('aria-haspopup'),
                'dialog',
            );
            await index
                .getByRole('dialog', { name: 'View', exact: true })
                .waitFor();
            assert.equal(
                await index
                    .getByRole('button', { name: 'Descending', exact: true })
                    .getAttribute('aria-pressed'),
                'true',
            );
            await index
                .getByRole('button', { name: 'Close', exact: true })
                .click();
            await index
                .getByRole('dialog', { name: 'View', exact: true })
                .waitFor({ state: 'hidden' });
            assert.equal(
                await viewTrigger.getAttribute('aria-expanded'),
                'false',
            );
            await index.evaluate((el) => {
                el.searchDelay = 10000;
                el.labels = { clearSearch: 'Clear directory search' };
            });
            const indexSearch = index.getByRole('searchbox', {
                name: 'Search',
                exact: true,
            });
            await indexSearch.fill('Pending draft');
            await index
                .getByRole('button', {
                    name: 'Clear directory search',
                    exact: true,
                })
                .click();
            assert.equal(await indexSearch.inputValue(), '');
            assert.equal(
                await indexSearch.evaluate(
                    (el) => el === el.getRootNode().activeElement,
                ),
                true,
            );
            assert.equal(await index.evaluate((el) => el.query.search), '');
            assert.equal(
                (await index
                    .getByRole('checkbox', {
                        name: 'Select Jamie Ellis',
                        exact: true,
                    })
                    .count()) > 0,
                true,
            );
            // Loading is announced without inserting a block above existing rows.
            const geometry = () =>
                index.evaluate((el) => {
                    const table = el.shadowRoot
                        .querySelector('table')
                        .getBoundingClientRect();
                    const footer = el.shadowRoot
                        .querySelector('.footer')
                        .getBoundingClientRect();
                    return {
                        tableY: table.y,
                        tableHeight: table.height,
                        footerY: footer.y,
                    };
                });
            const settled = await geometry();
            await index.evaluate(async (el) => {
                el.loading = true;
                await el.updateComplete;
            });
            assert.deepEqual(await geometry(), settled);
            await index.evaluate(async (el) => {
                el.loading = false;
                await el.updateComplete;
            });
            const frame = page.locator('#index-frame');
            await frame.scrollIntoViewIfNeeded();
            const frameBox = await frame.boundingBox();
            const footerBox = await index
                .locator('.footer-shell')
                .boundingBox();
            assert.ok(
                Math.abs(
                    footerBox.y +
                        footerBox.height -
                        frameBox.y -
                        frameBox.height,
                ) <= 2,
            );
            // Only the toolbar stays pinned; column headers scroll with the rows.
            await frame.evaluate((el) => { el.scrollTop = 240; });
            await page.waitForFunction(() => {
                const el = document.querySelector('#index');
                const top = document.querySelector('#index-frame').getBoundingClientRect().top;
                const toolbar = el.shadowRoot.querySelector('.header-shell').getBoundingClientRect();
                const header = el.shadowRoot.querySelector('thead').getBoundingClientRect();
                return Math.abs(toolbar.top - top) < 2 && header.bottom < toolbar.top;
            });
            await index.evaluate(el => { el.hideToolbar = true; });
            await page.waitForFunction(() => {
                const frame = document.querySelector('#index-frame').getBoundingClientRect();
                const header = document.querySelector('#index').shadowRoot.querySelector('thead').getBoundingClientRect();
                return header.bottom < frame.top;
            });
            await index.evaluate(el => { el.hideToolbar = false; });
            await frame.evaluate(el => { el.scrollTop = 0; });
            const originalSort = await index.evaluate(el => structuredClone(el.query.sort));
            await index.getByRole('button', { name: 'Sort by Participant', exact: true }).click();
            assert.notDeepEqual(await index.evaluate(el => el.query.sort), originalSort);
            await index.evaluate((el, sort) => el.setQuery({ sort }), originalSort);
            const proxy = index.getByRole('region', {
                name: 'Scroll Member directory columns',
                exact: true,
            });
            await proxy.waitFor();
            await proxy.evaluate((el) => {
                el.scrollLeft = 180;
            });
            await page.waitForFunction(
                () =>
                    document
                        .querySelector('#index')
                        .shadowRoot.querySelector('.scroll').scrollLeft > 100,
            );
            await index.locator('.scroll').evaluate((el) => {
                el.scrollLeft = 50;
            });
            await page.waitForFunction(
                () =>
                    Math.abs(
                        document
                            .querySelector('#index')
                            .shadowRoot.querySelector('.scrollbar').scrollLeft -
                            50,
                    ) < 1,
            );
            await index.evaluate((el) => {
                el.dir = 'rtl';
            });
            await proxy.evaluate((el) => {
                el.scrollLeft = -120;
            });
            await page.waitForFunction(
                () =>
                    document
                        .querySelector('#index')
                        .shadowRoot.querySelector('.scroll').scrollLeft < -100,
            );
            await index.evaluate((el) => {
                el.dir = 'ltr';
                el.view = {
                    hiddenColumns: ['email', 'status', 'created', 'requests'],
                    columnOrder: [],
                };
            });
            await proxy.waitFor({ state: 'detached' });
            await index.evaluate((el) => {
                el.view = { hiddenColumns: [], columnOrder: [] };
            });
            await proxy.waitFor();
            // At the final page, focus moves to the available previous-page control.
            await index.evaluate((el) => el.setQuery({ pageIndex: 1 }));
            const nextPage = index.getByRole('button', {
                name: 'Next',
                exact: true,
            });
            await nextPage.focus();
            await nextPage.press('Enter');
            const previousPage = index.getByRole('button', {
                name: 'Previous',
                exact: true,
            });
            assert.equal(
                await previousPage.evaluate(
                    (el) => el === el.getRootNode().activeElement,
                ),
                true,
            );
            await index.evaluate((el) => {
                el.mode = 'remote';
                el.dataSource = async (query) => {
                    await new Promise((resolve) => setTimeout(resolve, 150));
                    return {
                        rows: el.rows.slice(
                            query.pageIndex * 25,
                            query.pageIndex * 25 + 25,
                        ),
                        total: el.rows.length,
                    };
                };
                el.setQuery({ pageIndex: 0 });
            });
            await page.waitForFunction(
                () => !document.querySelector('#index').loading,
            );
            await nextPage.focus();
            await nextPage.press('Enter');
            await indexSearch.focus();
            await page.waitForFunction(
                () => !document.querySelector('#index').loading,
            );
            assert.equal(
                await indexSearch.evaluate(
                    (el) => el === el.getRootNode().activeElement,
                ),
                true,
            );
            await nextPage.focus();
            await nextPage.press('Enter');
            await page.waitForFunction(
                () => !document.querySelector('#index').loading,
            );
            assert.equal(
                await previousPage.evaluate(
                    (el) => el === el.getRootNode().activeElement,
                ),
                true,
            );
            await page.setViewportSize({ width: 390, height: 844 });
            assert.equal(
                await page.evaluate(
                    () =>
                        document.documentElement.scrollWidth <=
                        window.innerWidth,
                ),
                true,
            );
            const overflow = page.locator('#overflow');
            await overflow.scrollIntoViewIfNeeded();
            const cellOverflow = await overflow.evaluate((el) => {
                const cells = el.shadowRoot.querySelector('tbody tr').cells;
                const link = cells[0].querySelector('a');
                const scroll = el.shadowRoot.querySelector('.scroll');
                return {
                    linkTruncated: link.scrollWidth > link.clientWidth,
                    linkOverflow: getComputedStyle(link).textOverflow,
                    descriptionWraps:
                        cells[1].clientHeight >
                        parseFloat(getComputedStyle(cells[1]).lineHeight) * 2,
                    referenceContained:
                        cells[2].scrollWidth <= cells[2].clientWidth + 1,
                    nowrap: getComputedStyle(cells[3]).whiteSpace,
                    tableScrolls: scroll.scrollWidth > scroll.clientWidth,
                    pageContained:
                        document.documentElement.scrollWidth <=
                        window.innerWidth,
                };
            });
            assert.deepEqual(cellOverflow, {
                linkTruncated: true,
                linkOverflow: 'ellipsis',
                descriptionWraps: true,
                referenceContained: true,
                nowrap: 'nowrap',
                tableScrolls: true,
                pageContained: true,
            });
            await overflow.evaluate((el) => {
                el.columns = el.columns.map((column) =>
                    column.id === 'title' ? { ...column, wrap: true } : column,
                );
            });
            assert.equal(
                await overflow
                    .locator('tbody tr')
                    .first()
                    .locator('a')
                    .evaluate((el) => getComputedStyle(el).whiteSpace),
                'normal',
            );
            await testDataTableRowOrder(page);
            await testDataTableHandlesActions(page);
            await testDataTableFilters(page);
            await testDataTablePersistence(page);
            assert.deepEqual(errors, []);
            console.log(
                `PASS DataTable (${engine.name()}, ${built ? 'built' : 'source'}): search, sort, filters, View sorting, keyboard/pointer reorder, export snapshot, plain tables, row/checkbox/modifier selection, stable loading/footer, keyboard navigation, clear search, accessible menus, sticky/RTL scrolling, cell controls, paging focus, deletion, stale requests, retry, cursors, mobile`,
            );
        } finally {
            await browser.close();
        }
    }
} finally {
    await server.close();
}
