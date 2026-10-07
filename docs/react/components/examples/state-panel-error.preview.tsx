// #region example
import { Button, StatePanel } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';

export function StatePanelErrorExample() {
    return (
        <StatePanel
            variant="error"
            heading="An error has occurred"
            detailsLabel="Show error details"
            copyLabel="Copy error details"
            copiedLabel="Error details copied."
            copyable
            style={{ '--pk-state-panel-min-height': '22rem' } as CSSProperties}
        >
            The requested form could not be found.

            <pre slot="details">FormNotFound: Unable to load form 42.</pre>

            <Button slot="actions" variant="primary">Try Again</Button>
        </StatePanel>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Error state',
    title: 'Error state with details and an action',
    language: 'tsx',
    source: true,
    render: () => <StatePanelErrorExample />,
};

export default preview;
