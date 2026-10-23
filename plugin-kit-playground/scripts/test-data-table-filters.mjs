import assert from 'node:assert/strict';

export async function testDataTableFilters(page) {
    await page.setViewportSize({ width: 1280, height: 900 });
    const table = page.locator('#filter-demo');
    const dialog = table.locator('.filter-dialog');
    const nativeDialog = table.getByRole('dialog', {
        name: 'Filter results',
        exact: true,
    });
    const trigger = () =>
        table.getByRole('button', { name: /^Filters(?: \(\d+\))?$/ });
    const open = async () => {
        await trigger().click();
        await nativeDialog.waitFor();
        await nativeDialog.evaluate((el) =>
            Promise.all(
                el
                    .getAnimations()
                    .map((animation) => animation.finished.catch(() => {})),
            ),
        );
    };
    const close = async (name) => {
        await dialog.getByRole('button', { name, exact: true }).click();
        await nativeDialog.waitFor({ state: 'hidden' });
    };
    const add = async (name) => {
        await dialog
            .getByRole('button', { name: 'Add a filter', exact: true })
            .click();
        await dialog
            .locator('.add-filter')
            .getByRole('option', { name, exact: true })
            .click();
        await dialog.getByRole('group', { name, exact: true }).waitFor();
        await page.waitForFunction(
            () =>
                !document
                    .querySelector('#filter-demo')
                    .shadowRoot.querySelector('.add-filter').open,
        );
    };
    const choose = async (name, value) => {
        const select = dialog
            .locator('pk-select.filter-value')
            .filter({ has: page.getByRole('button', { name, exact: true }) });
        await select.getByRole('button', { name, exact: true }).click();
        await select.getByRole('option', { name: value, exact: true }).click();
    };
    const chooseControl = async (name, option) => {
        const select = dialog
            .locator('pk-select')
            .filter({ has: page.getByRole('button', { name, exact: true }) });
        await select.getByRole('button', { name, exact: true }).click();
        await select.getByRole('option', { name: option, exact: true }).click();
        await page.waitForFunction(
            () =>
                ![
                    ...document
                        .querySelector('#filter-demo')
                        .shadowRoot.querySelectorAll('pk-select'),
                ].some((select) => select.open),
        );
    };
    const values = () => table.evaluate((el) => el.query.filters);
    await table.scrollIntoViewIfNeeded();
    await open();
    assert.equal((await dialog.getAttribute('data-anchored')) !== null, true);
    const bounds = await nativeDialog.boundingBox();
    const search = await table.locator('.search').boundingBox();
    assert.ok(Math.abs(bounds.width - search.width + 2) <= 2);
    for (const name of [
        'Status',
        'Created',
        'Team',
        'Verified',
        'Requests',
        'Participant',
    ])
        await add(name);
    assert.equal(await dialog.locator('.filter-rule').count(), 6);
    await dialog
        .getByRole('button', { name: 'Clear filters', exact: true })
        .click();
    await add('Status');
    await choose('Status', 'Active');
    assert.deepEqual(await values(), {});
    await close('Cancel');
    assert.deepEqual(await values(), {});
    await open();
    assert.equal(await dialog.locator('.filter-rule').count(), 0);
    await add('Participant');
    await chooseControl('Participant: Operator', 'begins with');
    await dialog
        .getByRole('textbox', { name: 'Participant', exact: true })
        .fill('ja');
    await close('Apply');
    assert.deepEqual(await values(), { name: 'ja' });
    assert.equal(await table.locator('.chips').count(), 0);
    assert.equal(await table.getByRole('button', { name: 'Filters (1)', exact: true }).count(), 1);
    assert.equal(
        await table.evaluate((el) => el.query.filterOperators.name),
        'starts-with',
    );
    assert.equal(await table.locator('tbody tr').count(), 1);
    await open();
    await dialog
        .getByRole('textbox', { name: 'Participant', exact: true })
        .fill('discard');
    await page.keyboard.press('Escape');
    await nativeDialog.waitFor({ state: 'hidden' });
    assert.deepEqual(await values(), { name: 'ja' });
    await open();
    await dialog
        .getByRole('button', { name: 'Clear filters', exact: true })
        .click();
    await add('Requests');
    await dialog
        .getByRole('spinbutton', { name: 'Requests: From', exact: true })
        .fill('40');
    await dialog
        .getByRole('spinbutton', { name: 'Requests: To', exact: true })
        .fill('10');
    await dialog.getByRole('button', { name: 'Apply', exact: true }).click();
    await dialog.getByRole('alert').waitFor();
    assert.deepEqual(await values(), { name: 'ja' });
    await dialog
        .getByRole('spinbutton', { name: 'Requests: From', exact: true })
        .fill('10');
    await dialog
        .getByRole('spinbutton', { name: 'Requests: To', exact: true })
        .fill('30');
    await add('Status');
    await choose('Status', 'Active');
    await close('Apply');
    assert.deepEqual(await values(), {
        requests: ['10', '30'],
        status: 'active',
    });
    assert.equal(await table.locator('tbody tr').count(), 2);
    await open();
    await dialog
        .getByRole('button', { name: 'Remove Status filter', exact: true })
        .click();
    await chooseControl('Requests: Filter type', 'Verified');
    await choose('Verified', 'No');
    await close('Apply');
    assert.deepEqual(await values(), { verified: 'false' });
    assert.equal(await table.locator('tbody tr').count(), 3);
    await open();
    await dialog
        .getByRole('button', { name: 'Clear filters', exact: true })
        .click();
    await add('Team');
    await choose('Team', 'Support');
    // Multi-select remains open and Escape closes only that child overlay.
    await dialog
        .locator('pk-select.filter-value')
        .getByRole('option', { name: 'Sales', exact: true })
        .click();
    await page.keyboard.press('Escape');
    assert.equal(await nativeDialog.isVisible(), true);
    await close('Apply');
    assert.deepEqual(await values(), { team: ['Support', 'Sales'] });
    assert.equal(await table.locator('tbody tr').count(), 4);
    await open();
    await chooseControl('Team: Operator', 'is empty');
    await close('Apply');
    assert.deepEqual(await values(), { team: '' });
    assert.equal(await table.locator('tbody tr').count(), 1);
    await open();
    await dialog.getByRole('button', { name: 'Remove Team filter', exact: true }).click();
    await close('Apply');
    assert.deepEqual(await values(), {});
    assert.deepEqual(
        await table.evaluate((el) => el.query.filterOperators),
        {},
    );
    // Local query semantics are shared with endpoint demonstrations and do not depend on rendered cells.
    const cases = [
        [{ name: 'J' }, { name: 'starts-with' }, [2, 6]],
        [{ name: 'J' }, { name: 'not-contains' }, [1, 3, 4, 5]],
        [{ name: 'JAMIE ELLIS' }, { name: 'equals' }, [2]],
        [{ requests: '0' }, { requests: 'equals' }, [4]],
        [{ requests: '20' }, { requests: 'greater-than' }, [2, 3]],
        [{ requests: '19' }, { requests: 'at-least' }, [2, 3, 6]],
        [{ requests: '12' }, { requests: 'at-most' }, [1, 4, 5]],
        [{ team: ['Support', 'Sales'] }, { team: 'not-in' }, [4, 6]],
        [{ created: ['2026-10-22', '2026-10-22'] }, {}, [5]],
        [{ created: '2026-10-22' }, { created: 'equals' }, [5]],
        [{ created: '2026-10-18' }, { created: 'greater-than' }, [5]],
        [{ created: '2026-10-18' }, { created: 'at-most' }, [1, 2, 3, 4]],
        [{ created: '' }, { created: 'empty' }, [6]],
        [{ created: '' }, { created: 'not-empty' }, [1, 2, 3, 4, 5]],
        [{ requests: ['0', '0'] }, {}, [4]],
    ];
    for (const [filters, operators, expected] of cases) {
        assert.deepEqual(
            await page.evaluate(
                ([filters, operators]) =>
                    window.filterQuery(filters, operators),
                [filters, operators],
            ),
            expected,
        );
    }
    await open();
    await add('Created');
    await dialog
        .getByRole('textbox', { name: 'Created: From', exact: true })
        .fill('2026-10-18');
    await dialog
        .getByRole('textbox', { name: 'Created: To', exact: true })
        .fill('2026-10-22');
    await close('Apply');
    assert.equal(await table.locator('tbody tr').count(), 2);
    await open();
    await dialog.getByRole('button', { name: 'Clear filters', exact: true }).click();
    await close('Apply');
    // One request per Apply; cancellation and draft edits never query the remote endpoint.
    await table.evaluate((el) => {
        window.filterRequests = 0;
        el.mode = 'remote';
        el.dataSource = async (query) => {
            window.filterRequests++;
            window.appliedFilterQuery = structuredClone(query);
            await new Promise((resolve) => setTimeout(resolve, 80));
            return { rows: el.rows, total: el.rows.length };
        };
    });
    await page.waitForFunction(
        () => !document.querySelector('#filter-demo').loading,
    );
    const requests = await page.evaluate(() => window.filterRequests);
    await open();
    await add('Requests');
    await chooseControl('Requests: Operator', 'is at least');
    await dialog
        .getByRole('spinbutton', { name: 'Requests', exact: true })
        .fill('20');
    assert.equal(await page.evaluate(() => window.filterRequests), requests);
    await close('Apply');
    await page.waitForFunction(
        () => !document.querySelector('#filter-demo').loading,
    );
    assert.equal(
        await page.evaluate(() => window.filterRequests),
        requests + 1,
    );
    assert.deepEqual(
        await page.evaluate(() => window.appliedFilterQuery.filterOperators),
        { requests: 'at-least' },
    );
    await open();
    await dialog
        .getByRole('spinbutton', { name: 'Requests', exact: true })
        .fill('30');
    await close('Cancel');
    assert.equal(
        await page.evaluate(() => window.filterRequests),
        requests + 1,
    );
    // Controlled updates win over a draft, including its operator state.
    await open();
    await table.evaluate((el) => {
        el.query = {
            ...el.query,
            filters: { status: 'pending' },
            filterOperators: {},
        };
    });
    await dialog.getByRole('group', { name: 'Status', exact: true }).waitFor();
    assert.equal(
        await dialog
            .getByRole('group', { name: 'Requests', exact: true })
            .count(),
        0,
    );
    await close('Cancel');
    await page.setViewportSize({ width: 390, height: 844 });
    await open();
    assert.equal(await dialog.getAttribute('data-anchored'), null);
    const mobile = await nativeDialog.boundingBox();
    assert.ok(mobile.x >= 0 && mobile.x + mobile.width <= 390);
    assert.ok(
        await nativeDialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
    );
    await close('Cancel');
    await trigger().evaluate(async (el) => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
    });
    assert.equal(
        await trigger().evaluate((el) => el === el.getRootNode().activeElement),
        true,
    );
}
