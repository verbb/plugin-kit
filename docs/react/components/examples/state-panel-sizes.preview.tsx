// #region example
import { Button, StatePanel } from '@verbb/plugin-kit-react/components';

export function StatePanelSizesExample() {
    return (
        <div style={{ display: 'grid', gap: 12, width: '100%' }}>
            <StatePanel size="sm" variant="error" heading="Small error state" detailsOpen copyable>
                The requested item could not be loaded.
                <pre slot="details">Request failed.</pre>
                <Button slot="actions" variant="primary">Try Again</Button>
            </StatePanel>

            <StatePanel variant="error" heading="Default error state" detailsOpen copyable>
                The requested item could not be loaded.
                <pre slot="details">Request failed.</pre>
                <Button slot="actions" variant="primary">Try Again</Button>
            </StatePanel>

            <StatePanel size="lg" variant="error" heading="Large error state" detailsOpen copyable>
                The requested item could not be loaded.
                <pre slot="details">Request failed.</pre>
                <Button slot="actions" variant="primary">Try Again</Button>
            </StatePanel>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'State panel sizes',
    language: 'tsx',
    source: true,
    render: () => <StatePanelSizesExample />,
};

export default preview;
