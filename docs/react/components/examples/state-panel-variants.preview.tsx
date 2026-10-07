// #region example
import { StatePanel } from '@verbb/plugin-kit-react/components';

export function StatePanelVariantsExample() {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
                width: '100%',
            }}
        >
            <StatePanel variant="empty" heading="No results found">
                Try changing the current filters.
            </StatePanel>
            <StatePanel variant="info" heading="Preview unavailable">
                Save this item before opening its preview.
            </StatePanel>
            <StatePanel variant="success" heading="Import complete">
                All records were imported successfully.
            </StatePanel>
            <StatePanel variant="warning" heading="Some items were skipped">
                Review the import summary before continuing.
            </StatePanel>
            <StatePanel variant="error" heading="Report unavailable">
                The report could not be loaded.
            </StatePanel>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'State panel variants',
    language: 'tsx',
    source: true,
    render: () => <StatePanelVariantsExample />,
};

export default preview;
