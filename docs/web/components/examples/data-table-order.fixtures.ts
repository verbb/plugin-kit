import {
    type DataTableColumn,
    type DataTableRow,
    type DataTableRowReorderDetail,
    type PkDataTable,
} from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';

export const orderColumns = [
    { id: 'name', label: 'Filesystem', sortable: true },
    { id: 'handle', label: 'Handle', type: 'handle', sortable: true },
] satisfies DataTableColumn[];
export const orderRows: DataTableRow[] = [
    { id: 1, name: 'Images', handle: 'images' },
    { id: 2, name: 'Documents', handle: 'documents' },
    { id: 3, name: 'Archives', handle: 'archives' },
    { id: 4, name: 'Downloads', handle: 'downloads' },
];

export function mountOrderExample(root: HTMLElement): void {
    const table = root.querySelector<PkDataTable>('pk-data-table')!;
    const failure = root.querySelector<HTMLInputElement>('input')!;
    const output = root.querySelector('output')!;
    table.label = 'Filesystem order';
    table.rowLabel = 'name';
    table.manualOrder = true;
    table.columns = orderColumns;
    table.rows = [...orderRows];
    table.addEventListener('pk-row-reorder', async (event) => {
        const detail = (event as CustomEvent<DataTableRowReorderDetail>).detail;
        const fail = failure.checked;
        failure.checked = false;
        table.reorderDisabled = true;
        output.textContent = 'Saving…';
        // Replace this simulated save with your application's persistence request.
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (!table.isConnected) return;
        if (fail) {
            table.rows = detail.previousRows;
            output.textContent = 'Save failed. The previous order was restored.';
        } else {
            output.textContent = `Saved order: ${detail.orderedKeys.join(', ')}.`;
        }
        table.reorderDisabled = false;
    });
}
