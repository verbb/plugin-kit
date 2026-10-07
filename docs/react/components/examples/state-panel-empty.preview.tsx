// #region example
import { StatePanel } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';

export function StatePanelEmptyExample() {
    return (
        <StatePanel
            heading="No usage found"
            style={{ '--pk-state-panel-min-height': '20rem' } as CSSProperties}
        >
            This form is not currently being used by any entries, users, or other elements.
        </StatePanel>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Empty state',
    title: 'Empty state panel',
    language: 'tsx',
    source: true,
    render: () => <StatePanelEmptyExample />,
};

export default preview;
