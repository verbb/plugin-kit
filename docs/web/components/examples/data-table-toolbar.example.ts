import { PkDataTable } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
import type { PkSelect } from '@verbb/plugin-kit-web/components/select/pk-select.js';
import type { PkButton } from '@verbb/plugin-kit-web/components/button/pk-button.js';
import { mountDataTableExample } from './data-table.fixtures';

export const toolbarHtml = `
<pk-data-table>
    <pk-select slot="toolbar-start" aria-label="Member status" value="">
        <pk-option value="">All statuses</pk-option>
        <pk-option value="active">Active</pk-option>
        <pk-option value="pending">Pending</pk-option>
        <pk-option value="inactive">Inactive</pk-option>
    </pk-select>
    <pk-button-group slot="toolbar-controls" label="Table density">
        <pk-button data-size="default" aria-pressed="true" variant="secondary">Comfortable</pk-button>
        <pk-button data-size="compact" aria-pressed="false">Compact</pk-button>
    </pk-button-group>
    <pk-button slot="toolbar-end" variant="primary">+ New member</pk-button>
</pk-data-table>
<output aria-live="polite" style="display:block;margin-top:12px"></output>`;

export function mountToolbarExample(root: HTMLElement): void {
    mountDataTableExample(root);
    const table = root.querySelector<PkDataTable>('pk-data-table')!;
    const status = root.querySelector<PkSelect>('pk-select[slot="toolbar-start"]')!;
    status.addEventListener('change', () => {
        const filters = { ...table.query.filters };
        const operators = { ...table.query.filterOperators };
        delete operators.status;
        if (status.value) filters.status = String(status.value);
        else delete filters.status;
        table.setQuery({ filters, filterOperators: operators });
    });
    table.addEventListener('pk-query-change', () => {
        status.value = String(table.query.filters.status ?? '');
    });
    const buttons = root.querySelectorAll<PkButton>('[data-size]');
    buttons.forEach((button) => button.addEventListener('click', () => {
        table.size = button.dataset.size === 'compact' ? 'compact' : 'default';
        buttons.forEach((item) => {
            const active = item.dataset.size === table.size;
            item.setAttribute('aria-pressed', String(active));
            item.variant = active ? 'secondary' : 'default';
        });
    }));
    root.querySelector('[slot="toolbar-end"]')!.addEventListener('click', () => {
        root.querySelector('output')!.textContent = 'The consuming plugin opens its new-member screen here.';
    });
}
