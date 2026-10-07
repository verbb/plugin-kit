// #region example
import { Alert } from '@verbb/plugin-kit-react/components';

export function AlertVariantsExample() {
    return (
        <div style={{ display: 'grid', gap: 12, width: '100%' }}>
            <Alert variant="info" heading="New options are available.">
                Review the defaults before saving this screen.
            </Alert>
            <Alert variant="neutral" heading="This setting is managed externally.">
                Make changes in the connected service.
            </Alert>
            <Alert variant="success" heading="Settings saved.">
                Your changes are now active.
            </Alert>
            <Alert variant="warning" heading="Review this configuration.">
                One or more values may need attention.
            </Alert>
            <Alert variant="error" heading="The request could not be completed.">
                Check the values and try again.
            </Alert>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'Alert variants',
    language: 'tsx',
    source: true,
    render: () => <AlertVariantsExample />,
};

export default preview;
