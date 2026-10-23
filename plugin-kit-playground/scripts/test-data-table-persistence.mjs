import assert from 'node:assert/strict';

export async function testDataTablePersistence(page) {
    await page.waitForFunction(
        () => typeof window.persistDataTableView === 'function',
    );
    const results = await page.evaluate(async () => {
        const tick = () => new Promise((resolve) => queueMicrotask(resolve));
        const columns = [
            { id: 'name', label: 'Name', sortable: true, hideable: false },
            { id: 'status', label: 'Status', sortable: true },
            { id: 'count', label: 'Count', sortable: true },
        ];
        const options = { key: 'test:preferences', userId: 'alice' };
        const create = (extra = {}) => {
            const table = document.createElement('pk-data-table');
            table.columns = columns;
            table.defaultSort = [{ id: 'name', direction: 'asc' }];
            table.query = {
                ...table.query,
                sort: table.defaultSort,
                search: 'private-search',
                filters: { status: 'active' },
                pageIndex: 2,
                pageSize: 5,
            };
            Object.assign(table, extra);
            return table;
        };
        const table = create();
        let binding = window.persistDataTableView(table, options);
        binding.clear();
        const expected = {
            view: {
                hiddenColumns: ['status'],
                columnOrder: ['count', 'name', 'status'],
            },
            sort: [{ id: 'count', direction: 'desc' }],
        };
        table.view = expected.view;
        table.dispatchEvent(
            new CustomEvent('pk-view-change', { detail: { view: table.view } }),
        );
        table.setQuery({ sort: expected.sort });
        await tick();
        const saved = JSON.parse(localStorage.getItem(binding.storageKey));
        binding.disconnect();
        const restored = create();
        const restoredBinding = window.persistDataTableView(restored, options);
        const restoredState = {
            view: restored.view,
            sort: restored.query.sort,
            search: restored.query.search,
            filters: restored.query.filters,
            pageIndex: restored.query.pageIndex,
        };
        const calls = [];
        restored.mode = 'remote';
        restored.dataSource = async (query) => {
            calls.push(structuredClone(query));
            return { rows: [{ id: 1, name: 'Alex' }], total: 100 };
        };
        document.body.append(restored);
        await restored.updateComplete;
        await tick();
        await restored.updateComplete;
        const other = create();
        const otherBinding = window.persistDataTableView(other, {
            ...options,
            userId: 'bob',
        });
        const versioned = create();
        const versionBinding = window.persistDataTableView(versioned, {
            ...options,
            version: 2,
        });
        const otherTable = create();
        const otherTableBinding = window.persistDataTableView(otherTable, {
            ...options,
            key: 'test:other-table',
        });
        const explicit = create();
        const explicitBinding = window.persistDataTableView(explicit, {
            ...options,
            restoreSort: false,
        });
        const explicitState = {
            view: explicit.view,
            sort: explicit.query.sort,
        };
        // Search/page/selection changes must neither leak into storage nor overwrite a remembered sort with a URL override.
        const beforeSearch = localStorage.getItem(binding.storageKey);
        explicit.setQuery({ search: 'another-secret', pageIndex: 3 });
        explicit.selectedKeys = [1];
        await tick();
        const searchDidNotWrite =
            localStorage.getItem(binding.storageKey) === beforeSearch;
        explicit.setQuery({ sort: [{ id: 'status', direction: 'desc' }] });
        await tick();
        const explicitSortSaved = JSON.parse(
            localStorage.getItem(binding.storageKey),
        ).sort;
        for (const b of [
            restoredBinding,
            otherBinding,
            versionBinding,
            otherTableBinding,
            explicitBinding,
        ])
            b.disconnect();
        restored.remove();

        localStorage.setItem(
            binding.storageKey,
            JSON.stringify({
                view: {
                    hiddenColumns: ['name', 'status', 'gone'],
                    columnOrder: ['gone', 'count', 'count'],
                },
                sort: [
                    { id: 'gone', direction: 'desc' },
                    { id: 'name', direction: 'sideways' },
                ],
            }),
        );
        const stale = create({
            columns: [...columns, { id: 'new', label: 'New' }],
        });
        const staleBinding = window.persistDataTableView(stale, options);
        const staleState = { view: stale.view, sort: stale.query.sort };
        staleBinding.disconnect();
        localStorage.setItem(
            binding.storageKey,
            JSON.stringify({
                view: { hiddenColumns: ['a', 'b'], columnOrder: ['b'] },
            }),
        );
        const allHidden = create({
            columns: [
                { id: 'a', label: 'A' },
                { id: 'b', label: 'B' },
            ],
        });
        const allHiddenBinding = window.persistDataTableView(
            allHidden,
            options,
        );
        const someVisible = allHidden.view.hiddenColumns.length === 1;
        allHiddenBinding.disconnect();
        localStorage.setItem(binding.storageKey, '{invalid');
        const malformed = create();
        const malformedBinding = window.persistDataTableView(
            malformed,
            options,
        );
        const malformedState = malformed.view;
        malformedBinding.clear();
        malformedBinding.disconnect();

        let writes = 0;
        const store = new Map();
        const storage = {
            getItem: (key) => store.get(key) ?? null,
            setItem: (key, value) => {
                writes++;
                store.set(key, value);
            },
            removeItem: (key) => store.delete(key),
        };
        const duplicate = create();
        window.persistDataTableView(duplicate, { ...options, storage });
        const replacement = window.persistDataTableView(duplicate, {
            ...options,
            storage,
        });
        duplicate.setQuery({ sort: [{ id: 'count', direction: 'desc' }] });
        await tick();
        const singleWrite = writes === 1;
        replacement.disconnect();
        duplicate.setQuery({ sort: [{ id: 'status', direction: 'desc' }] });
        await tick();
        const disconnected = writes === 1;
        for (const failure of ['get', 'set', 'remove']) {
            const blocked = create();
            const blockedBinding = window.persistDataTableView(blocked, {
                ...options,
                storage: {
                    getItem: () => {
                        if (failure === 'get') throw new Error('Blocked');
                        return null;
                    },
                    setItem: () => {
                        if (failure === 'set') throw new Error('Quota');
                    },
                    removeItem: () => {
                        if (failure === 'remove') throw new Error('Blocked');
                    },
                },
            });
            blocked.setQuery({ sort: [{ id: 'count', direction: 'desc' }] });
            await tick();
            blockedBinding.clear();
            blockedBinding.disconnect();
        }
        // Leave a real table connected for the Use defaults interaction below.
        localStorage.setItem(binding.storageKey, JSON.stringify(expected));
        const reset = create();
        reset.id = 'persistence-reset';
        reset.rows = [{ id: 1, name: 'Alex', status: 'active', count: 1 }];
        binding = window.persistDataTableView(reset, options);
        window.persistenceBinding = binding;
        document.body.append(reset);
        await reset.updateComplete;
        return {
            saved,
            expected,
            restoredState,
            calls,
            isolated: [other, versioned, otherTable].every(
                (t) =>
                    t.view.hiddenColumns.length === 0 &&
                    t.query.sort[0].id === 'name',
            ),
            explicitState,
            searchDidNotWrite,
            explicitSortSaved,
            staleState,
            someVisible,
            malformedState,
            singleWrite,
            disconnected,
        };
    });
    assert.deepEqual(results.saved, results.expected);
    assert.deepEqual(results.restoredState.view, results.expected.view);
    assert.deepEqual(results.restoredState.sort, results.expected.sort);
    assert.equal(results.restoredState.search, 'private-search');
    assert.deepEqual(results.restoredState.filters, { status: 'active' });
    assert.equal(results.restoredState.pageIndex, 2);
    assert.equal(results.calls.length, 1);
    assert.deepEqual(results.calls[0].sort, results.expected.sort);
    assert.equal(results.isolated, true);
    assert.deepEqual(results.explicitState.view, results.expected.view);
    assert.deepEqual(results.explicitState.sort, [
        { id: 'name', direction: 'asc' },
    ]);
    assert.equal(results.searchDidNotWrite, true);
    assert.deepEqual(results.explicitSortSaved, [
        { id: 'status', direction: 'desc' },
    ]);
    assert.deepEqual(results.staleState.view, {
        hiddenColumns: ['status'],
        columnOrder: ['count', 'name', 'status', 'new'],
    });
    assert.deepEqual(results.staleState.sort, [
        { id: 'name', direction: 'asc' },
    ]);
    assert.equal(results.someVisible, true);
    assert.deepEqual(results.malformedState, {
        hiddenColumns: [],
        columnOrder: [],
    });
    assert.equal(results.singleWrite, true);
    assert.equal(results.disconnected, true);
    const table = page.locator('#persistence-reset');
    await table.getByRole('button', { name: 'View', exact: true }).click();
    await table
        .getByRole('button', { name: 'Use defaults', exact: true })
        .click();
    assert.equal(
        await page.evaluate(() =>
            localStorage.getItem(window.persistenceBinding.storageKey),
        ),
        null,
    );
    assert.deepEqual(await table.evaluate((el) => el.query.sort), [
        { id: 'name', direction: 'asc' },
    ]);
    assert.deepEqual(await table.evaluate((el) => el.view.hiddenColumns), []);
    await page.evaluate(() => {
        window.persistenceBinding.disconnect();
        document.querySelector('#persistence-reset').remove();
    });
}
