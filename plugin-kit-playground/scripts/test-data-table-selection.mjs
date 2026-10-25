import assert from 'node:assert/strict';

export async function testDataTableSelection(page) {
    const selection = page.locator('#selection');
    const selectCell = (name) =>
        selection.getByRole('cell', { name, exact: true });
    await selectCell('Record 1').scrollIntoViewIfNeeded();
    const before = await selection.locator('table').boundingBox();
    const beforeFooter = await selection
        .locator('.footer-shell > .footer')
        .boundingBox();
    await selection.evaluate((el) => {
        window.rowToggleEvents = [];
        el.addEventListener('pk-selection-change', (event) => {
            window.rowToggleEvents.push([...event.detail.selectedKeys]);
        });
    });
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
    // Plain row clicks share checkbox toggling, including deselection and additive selection.
    await selectCell('Record 1').click();
    assert.deepEqual(await selection.evaluate((el) => el.selectedKeys), []);
    assert.equal(await selection.getByRole('checkbox', { name: 'Select 1', exact: true }).isChecked(), false);
    assert.equal(await selection.locator('tbody tr[data-selected]').count(), 0);
    await selectCell('Record 1').click();
    await selectCell('Record 2').click();
    assert.deepEqual(await selection.evaluate((el) => el.selectedKeys), [1, 2]);
    await selectCell('Record 1').click();
    assert.deepEqual(await selection.evaluate((el) => el.selectedKeys), [2]);
    assert.equal(await selection.getByRole('checkbox', { name: 'Select 2', exact: true }).isChecked(), true);
    await selectCell('Record 2').click();
    await selectCell('Record 1').click();
    assert.deepEqual(await page.evaluate(() => window.rowToggleEvents), [
        [1], [], [1], [1, 2], [2], [], [1],
    ]);
    const state = async (expected) => {
        assert.deepEqual(await selection.evaluate((el) => el.selectedKeys), expected);
        for (const id of [1, 2, 4, 5]) {
            const input = checkbox(id);
            if (await input.count()) assert.equal(await input.isChecked(), expected.includes(id));
        }
    };
    const checkbox = (id) => selection.getByRole('checkbox', { name: `Select ${id}`, exact: true });
    const control = (id) => selection.locator('pk-checkbox').filter({ has: page.getByRole('checkbox', { name: `Select ${id}`, exact: true }) }).locator('[part=control]');
    const command = await page.evaluate(() => /Mac/.test(navigator.platform) ? 'Meta' : 'Control');
    const click = (id, modifiers = []) => selectCell(`Record ${id}`).click({ modifiers });
    const focused = async (id) => assert.equal(await checkbox(id).evaluate((el) => el === el.getRootNode().activeElement), true);

    await click(4, ['Shift']);
    await state([1, 2, 4]);
    await click(2, [command]); // A selected row becomes the sole selection.
    await state([2]);
    await click(2, [command]);
    await state([2]);
    await click(5, [command]); // An unselected row also replaces the selection.
    await state([5]);
    await click(1);
    await click(2, [command, 'Shift']); // Shift takes precedence, and does not union the old range.
    await state([1, 2]);
    await click(4, ['Shift']);
    await state([1, 2, 4]);
    await click(2); // Deselecting a non-anchor keeps the anchor at Record 1.
    await click(5, ['Shift']);
    await state([1, 2, 4, 5]);
    await click(1); // Deselecting the anchor removes it.
    await click(2, ['Shift']);
    await state([4, 5]);
    await click(1, [command, 'Shift']); // With no anchor, the command gesture is exclusive.
    await state([1]);
    await click(3, ['Shift']);
    await state([1]);
    await selection.getByRole('button', { name: 'Cell action', exact: true }).click();
    assert.equal(await page.evaluate(() => window.cellActions), 1);
    await selection.getByRole('link', { name: 'Open record', exact: true }).click();
    await state([1]);

    await control(2).click();
    await state([1, 2]);
    await control(1).click({ modifiers: [command] });
    await state([1]);
    await control(1).click({ modifiers: [command] });
    await state([1]);
    await checkbox(1).dispatchEvent('click', { button: 0, [command === 'Meta' ? 'metaKey' : 'ctrlKey']: true });
    await state([1]);
    await control(5).click({ modifiers: ['Shift'] });
    await focused(5);
    await state([1, 2, 4, 5]);
    await control(2).click({ modifiers: [command, 'Shift'] });
    await state([1, 2]);
    await checkbox(4).focus();
    await page.keyboard.press('Space');
    await state([1, 2, 4]);
    await page.keyboard.press('Enter');
    await state([1, 2]);
    for (const key of ['Shift+Space', 'Shift+Enter', `${command}+Space`, `${command}+Enter`]) {
        await page.keyboard.press(key);
        await state([1, 2]);
    }
    await selection.locator('thead pk-checkbox').locator('[part=control]').click();
    await selection.locator('thead pk-checkbox').locator('[part=control]').click();
    await state([]);
    await click(4, ['Shift']);
    await state([1, 2, 4]);
    await click(1, [command]);
    await click(2);
    const selectedColor = await selection.locator('tr[data-selected]').first().evaluate((el) => ({
        background: getComputedStyle(el).backgroundColor,
        foreground: getComputedStyle(el).color,
    }));
    assert.notEqual(selectedColor.background, 'rgba(0, 0, 0, 0)');
    assert.equal(selectedColor.foreground, 'rgb(255, 255, 255)');

    await selection.getByRole('button', { name: 'Next', exact: true }).click();
    await state([1, 2]);
    await click(7, ['Shift']); // Paging clears the anchor, while selected IDs persist.
    await state([1, 2, 7]);
    await selection.getByRole('button', { name: 'Previous', exact: true }).click();
    await click(1); // Anchorless deselection leaves other-page selection intact.
    await checkbox(1).focus();
    await page.keyboard.press('ArrowDown');
    await focused(2);
    await page.keyboard.press('Shift+ArrowDown');
    await focused(4);
    await state([2, 7]);
    await page.keyboard.press('End');
    await focused(5);
    await page.keyboard.press('Home');
    await focused(1);
    await page.keyboard.press(`${command}+ArrowDown`);
    await focused(5);
    await page.keyboard.press(`${command}+ArrowUp`);
    await focused(1);
    await state([2, 7]);
    await page.keyboard.press(`${command}+a`);
    await state([2, 7, 1, 4, 5]);
    await click(2, [command, 'Shift']); // Select-all anchored at the first eligible row.
    await state([7, 1, 2]);
    await page.keyboard.press('Escape');
    await state([7, 1, 2]);
    await selection.getByRole('button', { name: 'Cell action', exact: true }).focus();
    await page.keyboard.press(`${command}+a`);
    await state([7, 1, 2]);
    await selection.locator('thead pk-checkbox').locator('[part=control]').click();
    await state([7, 1, 2, 4, 5]);
    await selection.locator('thead pk-checkbox').locator('[part=control]').click();
    await state([7]);
    await click(4, [command]); // Exclusive selection also clears IDs from other pages.
    await state([4]);

    // Verify platform-specific command semantics on both Mac and Windows, independent of the test host.
    for (const [platform, modifier, ignored] of [['MacIntel', 'metaKey', 'ctrlKey'], ['Win32', 'ctrlKey', 'metaKey']]) {
        await page.evaluate((value) => Object.defineProperty(navigator, 'platform', { configurable: true, value }), platform);
        await selection.evaluate((el) => { el.selectedKeys = [1, 2]; });
        await selectCell('Record 5').dispatchEvent('click', { [modifier]: true, button: 0 });
        await state([5]);
        await selectCell('Record 2').dispatchEvent('click', { [ignored]: true, button: 0 });
        await state([5]);
        await checkbox(1).focus();
        await checkbox(1).dispatchEvent('keydown', { key: 'a', [modifier]: true });
        await state([5, 1, 2, 4]);
    }
    await page.evaluate(() => { delete navigator.platform; });
    await selection.evaluate((el) => {
        el.setQuery({ pageIndex: 1 });
        el.selectedKeys = [7];
        el.selectable = false;
    });
    await click(6, [command]);
    await state([7]);
    assert.equal(await selection.locator('tr[data-selected]').count(), 0);
    assert.equal(await selection.locator('table').getByRole('checkbox').count(), 0);
    await page.locator('#products').locator('tbody tr').first().getByRole('cell').first().click({ modifiers: ['Shift'] });
    assert.deepEqual(await page.locator('#products').evaluate((el) => el.selectedKeys), []);
}
