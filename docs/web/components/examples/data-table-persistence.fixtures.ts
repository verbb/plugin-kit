import {
    PkDataTable,
    persistDataTableView,
    type DataTablePersistence,
} from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
import { columns, records } from './data-table.fixtures';

export function mountRememberedTable(root: HTMLElement): () => void {
    let preferences: DataTablePersistence | undefined;
    const container = root.querySelector<HTMLElement>('[data-table]')!;
    const recreate = () => {
        preferences?.disconnect();
        const table = new PkDataTable();
        table.label = 'Remembered member view';
        table.columns = columns;
        table.rows = records;
        table.query = { ...table.query, pageSize: 5 };
        preferences = persistDataTableView(table, {
            key: 'docs:remembered-members',
            userId: 'demo-user',
        });
        container.replaceChildren(table);
    };
    root.querySelector('[data-recreate]')!.addEventListener('click', recreate);
    recreate();
    return () => {
        preferences?.disconnect();
        root.querySelector('[data-recreate]')?.removeEventListener(
            'click',
            recreate,
        );
    };
}
