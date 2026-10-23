// #region example
import { useState } from 'react';
import {
    DataTable,
    Button,
    ButtonGroup,
    type DataTableReactColumn,
} from '@verbb/plugin-kit-react/components';
const rows = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    name: `Member ${String(index + 1).padStart(2, '0')}`,
    email: `member${index + 1}@example.com`,
    status: index % 3 ? 'active' : 'pending',
}));
const columns: DataTableReactColumn[] = [
    { id: 'name', label: 'Member', sortable: true, width: '240px' },
    {
        id: 'email',
        label: 'Email',
        type: 'link',
        href: (row) => `mailto:${row.email}`,
        width: '320px',
    },
    { id: 'status', label: 'Status', type: 'status', width: '200px' },
];
export function IndexExample() {
    const [size, setSize] = useState<'default' | 'compact'>('default');
    return (
        <div style={{ maxHeight: 420, overflow: 'auto', padding: 2 }}>
            <DataTable
                label="Member directory"
                layout="index"
                size={size}
                selectable
                rowLabel="name"
                rows={rows}
                columns={columns}
            >
                <ButtonGroup slot="toolbar-controls" label="Table density">
                    <Button aria-pressed={size === 'default'} variant={size === 'default' ? 'secondary' : 'default'} onClick={() => setSize('default')}>Comfortable</Button>
                    <Button aria-pressed={size === 'compact'} variant={size === 'compact' ? 'secondary' : 'default'} onClick={() => setSize('compact')}>Compact</Button>
                </ButtonGroup>
            </DataTable>
        </div>
    );
}
// #endregion example
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
const preview: PreviewSourceDefinition = {
    label: 'Index Layout',
    title: 'Selectable member directory',
    language: 'tsx',
    source: true,
    render: () => <IndexExample />,
};
export default preview;
