// #region example
import { Alert } from '@verbb/plugin-kit-react/components';

export function AlertDismissibleExample() {
    return (
        <Alert
            variant="info"
            heading="New options are available."
            dismissible
        >
            Review them when convenient, or dismiss this message.
        </Alert>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Dismissible',
    title: 'Dismissible alert',
    language: 'tsx',
    source: true,
    render: () => <AlertDismissibleExample />,
};

export default preview;
