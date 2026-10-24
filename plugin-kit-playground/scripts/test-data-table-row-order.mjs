import assert from 'node:assert/strict';

export async function testDataTableRowOrder(page) {
    await page.setViewportSize({ width: 1100, height: 850 });
    const table = page.locator('#row-order');
    const handle = (name) => table.getByRole('button', { name: `Reorder ${name}`, exact: true });
    const keys = () => table.evaluate((el) => el.rows.map((row) => row.id));
    const events = () => page.evaluate(() => window.rowOrders.length);
    const settle = () => table.evaluate((el) => el.updateComplete);
    const reset = async () => {
        await table.evaluate(async (el) => {
            el.mode = 'client';
            el.dataSource = undefined;
            el.manualOrder = true;
            el.reorderDisabled = false;
            el.loading = false;
            el.error = '';
            el.rows = [...window.orderRows];
            el.selectedKeys = [];
            el.query = { ...el.query, search: '', filters: {}, criteria: undefined, sort: [], pageIndex: 0, pageSize: 4 };
            window.rowOrders = [];
            await el.updateComplete;
        });
        await table.scrollIntoViewIfNeeded();
    };
    await handle('Charlie').waitFor();
    assert.deepEqual(await table.evaluate((el) => el.query.sort), []);
    assert.equal(await table.locator('th .sort, th[aria-sort]').count(), 0);
    assert.equal(await handle('Charlie').getAttribute('aria-describedby'), 'row-order-help');
    await table.getByRole('button', { name: 'View', exact: true }).click();
    assert.equal(await table.getByRole('group', { name: 'Sort by', exact: true }).count(), 0);
    await table.getByRole('button', { name: 'Use defaults', exact: true }).click();
    assert.deepEqual(await table.evaluate((el) => el.query.sort), []);
    await table.getByRole('button', { name: 'Close', exact: true }).click();
    await reset();

    await table.evaluate((el) => { el.selectedKeys = ['a']; });
    await handle('Charlie').focus();
    await handle('Charlie').press('ArrowDown');
    await settle();
    assert.deepEqual(await keys(), ['a', 3, 1, '1', 5, 6]);
    assert.deepEqual(await table.evaluate((el) => el.selectedKeys), ['a']);
    assert.equal(await handle('Charlie').evaluate((el) => el === el.getRootNode().activeElement), true);
    const first = await page.evaluate(() => window.rowOrders[0]);
    assert.deepEqual(first, {
        rowKey: 3, fromIndex: 0, toIndex: 1,
        orderedKeys: ['a', 3, 1, '1'], previousKeys: [3, 'a', 1, '1'],
        rows: [first.previousRows[1], first.previousRows[0], ...first.previousRows.slice(2)],
        previousRows: first.previousRows,
        query: { search: '', sort: [], filters: {}, criteria: undefined, pageIndex: 0, pageSize: 4 },
    });
    assert.equal(first.previousRows.length, 6);
    assert.match(await table.locator('[role="status"]').allTextContents().then((texts) => texts.join(' ')), /Charlie moved to position 2 of 4/);
    await handle('Charlie').press('End');
    await settle();
    assert.deepEqual(await keys(), ['a', 1, '1', 3, 5, 6]);
    await handle('Charlie').press('ArrowDown');
    assert.equal(await events(), 2, 'Boundary moves do not emit');
    await handle('Charlie').press('Home');
    await settle();
    assert.deepEqual(await keys(), [3, 'a', 1, '1', 5, 6]);
    await handle('Charlie').press('ArrowUp');
    assert.equal(await events(), 3);
    // Consumers can mirror or restore the detached array without mutating a saved snapshot.
    await table.evaluate(async (el) => {
        el.rows = window.rowOrders[0].previousRows;
        window.rowOrders[0].rows.reverse();
        window.rowOrders[0].orderedKeys.reverse();
        window.rowOrders[0].query.pageIndex = 99;
        await el.updateComplete;
    });
    assert.deepEqual(await keys(), [3, 'a', 1, '1', 5, 6]);
    assert.equal(await table.evaluate((el) => el.query.pageIndex), 0);

    await reset();
    await table.evaluate((el) => {
        el.addEventListener('pk-row-reorder', () => { el.reorderDisabled = true; }, { once: true });
    });
    await handle('Charlie').press('ArrowDown');
    await settle();
    assert.equal(await handle('Charlie').isDisabled(), true);
    assert.equal(await handle('Charlie').evaluate((el) => el === el.getRootNode().activeElement), true);
    await page.keyboard.press('ArrowDown');
    assert.equal(await events(), 1, 'A pending save blocks subsequent keyboard moves');
    await table.evaluate((el) => { el.reorderDisabled = false; });
    await settle();
    await page.keyboard.press('ArrowUp');
    assert.deepEqual(await keys(), [3, 'a', 1, '1', 5, 6]);

    await reset();
    await table.getByRole('button', { name: 'Next', exact: true }).click();
    await handle('Foxtrot').press('ArrowUp');
    await settle();
    assert.deepEqual(await keys(), [3, 'a', 1, '1', 6, 5]);
    assert.deepEqual(await page.evaluate(() => window.rowOrders[0].orderedKeys), [6, 5]);
    await table.evaluate((el) => el.setQuery({ sort: [{ id: 'name', direction: 'desc' }] }));
    assert.equal(await table.evaluate((el) => el.query.pageIndex), 1);
    assert.deepEqual(await table.evaluate((el) => el.query.sort), []);

    await reset();
    const drag = async (sourceName, targetName) => {
        const source = await handle(sourceName).boundingBox();
        const target = await handle(targetName).boundingBox();
        assert.ok(source && target);
        await handle(sourceName).evaluate((el) => {
            el.addEventListener('pointerdown', (event) => { window.orderPointerId = event.pointerId; }, { once: true });
        });
        await page.mouse.move(source.x + source.width / 2, source.y + source.height / 2);
        await page.mouse.down();
        await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2 + (target.y > source.y ? 2 : -2), { steps: 8 });
    };
    await drag('Charlie', 'Bravo');
    assert.equal(await table.locator('tr[data-dragging]').count(), 1);
    assert.equal(await events(), 0, 'Preview does not save');
    await page.mouse.up();
    await settle();
    assert.deepEqual(await keys(), ['a', 1, 3, '1', 5, 6]);
    assert.equal(await events(), 1);
    assert.equal(await table.locator('tr[data-dragging]').count(), 0);
    await drag('Charlie', 'Alpha');
    await page.keyboard.press('Escape');
    await page.mouse.up();
    assert.deepEqual(await keys(), ['a', 1, 3, '1', 5, 6]);
    assert.equal(await events(), 1);
    assert.equal(await table.locator('tbody tr[style*="translate"]').count(), 0);
    await drag('Charlie', 'Alpha');
    // Releasing capture exercises the browser cancellation path without completing a drop.
    await handle('Charlie').evaluate((el) => {
        el.releasePointerCapture(window.orderPointerId);
    });
    await page.mouse.up();
    assert.deepEqual(await keys(), ['a', 1, 3, '1', 5, 6]);
    assert.equal(await events(), 1);
    await drag('Charlie', 'Alpha');
    await table.evaluate((el) => { el.rows = [...window.orderRows]; });
    await settle();
    await page.mouse.up();
    assert.deepEqual(await keys(), [3, 'a', 1, '1', 5, 6]);
    assert.equal(await events(), 1, 'An external row update cancels the pending drag');

    await reset();
    await table.locator('tbody tr').first().evaluate((el) => { el.style.height = '140px'; });
    await table.scrollIntoViewIfNeeded();
    await drag('Charlie', 'Delta');
    await page.mouse.up();
    await settle();
    assert.deepEqual(await keys(), ['a', 1, '1', 3, 5, 6], 'A tall row can move past a shorter last row');
    await table.scrollIntoViewIfNeeded();
    await drag('Charlie', 'Alpha');
    await page.mouse.up();
    await settle();
    assert.deepEqual(await keys(), [3, 'a', 1, '1', 5, 6], 'A tall row can move before a shorter first row');
    await table.locator('tbody tr').first().evaluate((el) => { el.style.height = ''; });

    await reset();
    // Keep the row's controls alive while dragging and scroll the nearest bounded container.
    await table.evaluate(async (el) => {
        const frame = el.parentElement;
        frame.style.height = '300px';
        frame.style.overflow = 'auto';
        el.rows = Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Row ${i}`, handle: `row${i}` }));
        el.query = { ...el.query, pageSize: 20 };
        await el.updateComplete;
    });
    await table.locator('.row-handle').first().scrollIntoViewIfNeeded();
    const scrollFrame = page.locator('#row-order-demo');
    const frameBounds = await scrollFrame.boundingBox();
    const firstBounds = await handle('Row 0').boundingBox();
    await page.mouse.move(firstBounds.x + 10, firstBounds.y + 10);
    await page.mouse.down();
    await page.mouse.move(firstBounds.x + 10, frameBounds.y + frameBounds.height - 12, { steps: 8 });
    await page.waitForFunction(() => document.querySelector('#row-order-demo').scrollTop > 50);
    await page.keyboard.press('Escape');
    await page.mouse.up();
    assert.equal(await events(), 0);
    assert.equal(await table.locator('tbody tr[style*="translate"]').count(), 0);
    await scrollFrame.evaluate((el) => { el.style.height = ''; el.style.overflow = ''; });

    await reset();
    await table.evaluate((el) => { el.reorderDisabled = true; });
    await settle();
    assert.equal(await handle('Charlie').isDisabled(), true);
    await table.evaluate((el) => { el.reorderDisabled = false; el.setQuery({ search: 'a' }); });
    await settle();
    assert.equal(await handle('Charlie').isDisabled(), true);
    assert.equal(await table.getByText('Clear search and filters to reorder rows.', { exact: true }).count(), 1);
    await table.evaluate((el) => el.setQuery({ search: '', filters: { unknown: 'active' } }));
    await settle();
    assert.equal(await handle('Charlie').isDisabled(), true);
    await table.evaluate((el) => el.setQuery({ filters: {}, criteria: { group: 1 } }));
    await settle();
    assert.equal(await handle('Charlie').isDisabled(), true);
    await reset();
    await table.evaluate((el) => { el.loading = true; });
    await settle();
    assert.equal(await table.locator('.row-handle').first().isDisabled(), true);
    await table.evaluate((el) => { el.loading = false; el.error = 'Save failed'; });
    await settle();
    assert.equal(await table.locator('.row-handle').first().isDisabled(), true);
    await reset();
    await table.evaluate((el) => { el.manualOrder = false; });
    await settle();
    assert.equal(await table.locator('.row-handle').count(), 0);
    assert.deepEqual(await table.evaluate((el) => el.query.sort), [{ id: 'name', direction: 'desc' }]);

    await reset();
    // Remote rows are one page; a reorder must not fetch or imply replacing the entire dataset.
    await table.evaluate(async (el) => {
        el.mode = 'remote';
        window.orderLoads = [];
        el.dataSource = async (query) => {
            window.orderLoads.push(query);
            return { rows: window.orderRows.slice(0, 4), total: 100 };
        };
        await el.updateComplete;
    });
    await page.waitForFunction(() => !document.querySelector('#row-order').loading);
    const loads = await page.evaluate(() => window.orderLoads.length);
    await handle('Alpha').press('ArrowUp');
    await settle();
    assert.deepEqual(await page.evaluate(() => window.rowOrders.at(-1).orderedKeys), ['a', 3, 1, '1']);
    assert.equal(await page.evaluate(() => window.rowOrders.at(-1).rows.length), 4);
    assert.equal(await page.evaluate(() => window.orderLoads.length), loads);
    assert.deepEqual(await page.evaluate(() => window.orderLoads[0].sort), []);
    await table.evaluate(async (el) => { await el.refresh(); });
    assert.equal(await table.locator('tbody .row-handle').first().getAttribute('aria-label'), 'Reorder Charlie');

    await reset();
    await table.evaluate(async (el) => {
        el.mode = 'remote';
        el.pagination = 'cursor';
        el.query = { ...el.query, pageIndex: 2, cursor: 'page-3' };
        el.total = 100;
        el.rows = window.orderRows.slice(2, 4);
        await el.updateComplete;
    });
    await handle('Delta').press('ArrowUp');
    await settle();
    assert.deepEqual(await keys(), ['1', 1]);
    assert.equal(await page.evaluate(() => window.rowOrders.at(-1).query.cursor), 'page-3');
    assert.equal(await page.evaluate(() => window.rowOrders.at(-1).fromIndex), 1);
    await reset();
    await table.evaluate((el) => { el.pagination = 'offset'; });
    const preferences = await page.evaluate(async () => {
        const el = document.createElement('pk-data-table');
        el.manualOrder = true;
        el.columns = [{ id: 'name', label: 'Name', sortable: true }];
        el.rows = [...window.orderRows];
        const storage = {
            getItem: () => JSON.stringify({ view: { hiddenColumns: [], columnOrder: ['name'] }, sort: [{ id: 'name', direction: 'desc' }] }),
            setItem: () => {}, removeItem: () => {},
        };
        const binding = window.persistDataTableView(el, { key: 'manual-order', userId: 1, storage });
        document.body.append(el);
        await el.updateComplete;
        const sort = el.query.sort;
        binding.disconnect();
        el.remove();
        return sort;
    });
    assert.deepEqual(preferences, [], 'Saved sort preferences cannot override manual order');
    await page.setViewportSize({ width: 390, height: 844 });
}
