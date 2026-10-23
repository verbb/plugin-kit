// #region example
import { DataTable } from '@verbb/plugin-kit-react/components';
import {
    filterRows,
    filterColumns,
    filterDefinitions,
} from './data-table-filters.fixtures';
export function FilterExample() {
    return (
        <DataTable
            label="Membership filters"
            rows={filterRows}
            columns={filterColumns}
            filters={filterDefinitions}
        />
    );
}
// #endregion example
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
const preview: PreviewSourceDefinition = {
    label: 'Filter Builder',
    title: 'Membership filters',
    language: 'tsx',
    source: true,
    render: () => <FilterExample />,
};
export default preview;
