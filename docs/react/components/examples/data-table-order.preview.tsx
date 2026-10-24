// #region example
import { useState } from 'react';
import {
    DataTable,
    type DataTableRowReorderDetail,
} from '@verbb/plugin-kit-react/components';
import { orderColumns, orderRows } from '../../../web/components/examples/data-table-order.fixtures';

export function OrderExample() {
    const [rows, setRows] = useState(orderRows);
    const [saving, setSaving] = useState(false);
    const [failNext, setFailNext] = useState(false);
    const [message, setMessage] = useState('Drag a handle, or focus it and press Up or Down.');
    async function reorder(event: Event) {
        const detail = (event as CustomEvent<DataTableRowReorderDetail>).detail;
        setRows(detail.rows);
        setSaving(true);
        setMessage('Saving…');
        const fail = failNext;
        setFailNext(false);
        // Replace this simulated save with your application's persistence request.
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (fail) {
            setRows(detail.previousRows);
            setMessage('Save failed. The previous order was restored.');
        } else {
            setMessage(`Saved order: ${detail.orderedKeys.join(', ')}.`);
        }
        setSaving(false);
    }
    return <>
        <label><input type="checkbox" checked={failNext} onChange={(event) => setFailNext(event.target.checked)} /> Fail next save</label>
        <DataTable label="Filesystem order" rowLabel="name" manualOrder
            reorderDisabled={saving} rows={rows} columns={orderColumns}
            onPkRowReorder={reorder} />
        <output aria-live="polite">{message}</output>
    </>;
}
// #endregion example
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
const preview: PreviewSourceDefinition = {
    label: 'Manual Order', title: 'Filesystem order', language: 'tsx', source: true,
    render: () => <OrderExample />,
};
export default preview;
