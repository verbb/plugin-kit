import assert from 'node:assert/strict';

export async function testDataTableHandlesActions(page) {
    const table = page.locator('#handle-actions');
    const first = table.locator('tbody tr').nth(0);
    const second = table.locator('tbody tr').nth(1);
    const empty = table.locator('tbody tr').nth(2);
    await table.scrollIntoViewIfNeeded();
    assert.equal(await empty.locator('pk-copy-button, .row-actions').count(), 0);
    assert.equal(await empty.getByRole('cell', { name: '—', exact: true }).count(), 1);
    const appearance = await first.locator('.cell-handle').evaluate((el) => ({
        font: getComputedStyle(el.querySelector('code')).fontFamily,
        border: getComputedStyle(el).borderTopStyle,
        whitespace: getComputedStyle(el).whiteSpace,
    }));
    assert.match(appearance.font, /mono/i);
    assert.equal(appearance.border, 'solid');
    assert.equal(appearance.whitespace, 'nowrap');

    // Control clipboard permissions deterministically across all three engines.
    await page.evaluate(() => {
        window.clipboardWrites = [];
        Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
            writeText: async (value) => {
                if (window.rejectCopy) throw new Error('Clipboard denied');
                window.clipboardWrites.push(value);
            },
        } });
    });
    const copy = first.getByRole('button', { name: 'Copy imageResizerTesting', exact: true });
    await copy.focus();
    await copy.press('Enter');
    await first.getByRole('button', { name: 'Copied imageResizerTesting', exact: true }).waitFor();
    assert.deepEqual(await page.evaluate(() => window.clipboardWrites), ['imageResizerTesting']);
    assert.deepEqual(await page.evaluate(() => window.copiedHandles), [{ value: 'imageResizerTesting' }]);
    assert.deepEqual(await table.evaluate((el) => el.selectedKeys), []);
    await page.evaluate(() => { window.rejectCopy = true; });
    await second.getByRole('button', { name: 'Copy general', exact: true }).click();
    await page.waitForFunction(() => window.copyErrors === 1);
    assert.equal(await second.getByRole('button', { name: 'Copied general', exact: true }).count(), 0);

    await first.getByRole('button', { name: 'Edit: Image Resizer Testing', exact: true }).press('Enter');
    await first.getByRole('button', { name: 'Move to group: Image Resizer Testing', exact: true }).click();
    await first.getByRole('button', { name: 'Delete: Image Resizer Testing', exact: true }).click();
    assert.equal(await second.getByRole('button', { name: 'Delete: General', exact: true }).isDisabled(), true);
    await first.getByRole('button', { name: 'Archive: Image Resizer Testing', exact: true }).click();
    const menu = first.getByRole('button', { name: 'Actions for Image Resizer Testing', exact: true });
    await menu.click();
    await first.getByRole('menuitem', { name: 'Duplicate', exact: true }).click();
    await first.locator('pk-dropdown-menu').evaluate((el) => el.updateComplete);
    assert.equal(await first.locator('pk-dropdown-menu').evaluate((el) => el.open), false);
    await first.getByRole('menuitem', { name: 'Duplicate', exact: true }).waitFor({ state: 'hidden' });
    assert.equal(await menu.evaluate((el) => el === el.getRootNode().activeElement), true);

    await menu.press('ArrowDown');
    await page.waitForFunction((el) => el.active,
        await first.getByRole('menuitem', { name: 'Duplicate', exact: true }).elementHandle());
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await first.locator('pk-dropdown-menu').evaluate((el) => el.updateComplete);
    assert.equal(await first.locator('pk-dropdown-menu').evaluate((el) => el.open), false);
    assert.equal(await menu.evaluate((el) => el === el.getRootNode().activeElement), true);

    // Disabled menu actions cannot activate and are skipped by keyboard navigation.
    const secondMenu = second.getByRole('button', { name: 'Actions for General', exact: true });
    await secondMenu.click();
    await page.waitForFunction((el) => el === el.getRootNode().activeElement,
        await second.getByRole('menu').elementHandle());
    const disabled = second.getByRole('menuitem', { name: 'Duplicate', exact: true });
    assert.equal(await disabled.getByRole('button').isDisabled(), true);
    await disabled.dispatchEvent('click');
    assert.equal(await second.locator('pk-dropdown-menu').evaluate((el) => el.open), true);
    await page.keyboard.press('ArrowDown');
    assert.equal(await second.getByRole('menuitem', { name: 'Rename', exact: true }).evaluate((el) => el.active), true);
    await page.keyboard.press('Escape');
    await second.locator('pk-dropdown-menu').evaluate((el) => el.updateComplete);
    assert.equal(await second.locator('pk-dropdown-menu').evaluate((el) => el.open), false);
    assert.equal(await secondMenu.evaluate((el) => el === el.getRootNode().activeElement), true);
    assert.deepEqual(await page.evaluate(() => window.rowActions.map(({ action, rowKey, row }) => [action, rowKey, row.handle])), [
        ['edit', 1, 'imageResizerTesting'],
        ['move-group', 1, 'imageResizerTesting'],
        ['delete', 1, 'imageResizerTesting'],
        ['archive', 1, 'imageResizerTesting'],
        ['duplicate', 1, 'imageResizerTesting'],
        ['rename', 1, 'imageResizerTesting'],
    ]);
    assert.deepEqual(await table.evaluate((el) => el.selectedKeys), []);
    assert.deepEqual(await table.evaluate((el) => el.query.sort), []);

    await first.getByRole('cell', { name: 'Image Resizer Testing', exact: true }).click();
    assert.deepEqual(await table.evaluate((el) => el.selectedKeys), [1]);
    assert.equal(await first.locator('.cell-handle').evaluate((el) => getComputedStyle(el).color), 'rgb(255, 255, 255)');
    // Buttons animate their foreground when the row becomes selected.
    await page.waitForFunction((el) => getComputedStyle(el).color === 'rgb(255, 255, 255)',
        await first.getByRole('button', { name: 'Edit: Image Resizer Testing', exact: true }).elementHandle());
    assert.equal(await first.getByRole('button', { name: 'Edit: Image Resizer Testing', exact: true }).evaluate((el) => getComputedStyle(el).color), 'rgb(255, 255, 255)');
    await table.evaluate((el) => {
        el.labels = { editAction: 'Modifier', rowAction: '{label} / {id}' };
        el.rowActions = () => [{ id: 'edit', preset: 'edit' }];
    });
    await first.getByRole('button', { name: 'Modifier / Image Resizer Testing', exact: true }).waitFor();
    assert.equal(await table.locator('tbody pk-dropdown-menu').count(), 0);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
}
