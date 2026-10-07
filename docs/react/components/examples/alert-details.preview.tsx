// #region example
import { Alert } from '@verbb/plugin-kit-react/components';

const details = `Module: example:picker
Code: MODULE_UNAVAILABLE
Error: Provider failed to initialise.`;

export function AlertDetailsExample() {
    return (
        <Alert
            variant="error"
            heading="A required feature could not start."
            announce="assertive"
            copyable
        >
            Reload the page. If the problem continues, copy the technical details below.
            <pre slot="details">{details}</pre>
        </Alert>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Details and Copying',
    title: 'Copyable alert details',
    language: 'tsx',
    source: true,
    render: () => <AlertDetailsExample />,
};

export default preview;
