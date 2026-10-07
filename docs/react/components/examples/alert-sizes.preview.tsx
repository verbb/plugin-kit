// #region example
import { Alert, Button } from '@verbb/plugin-kit-react/components';

export function AlertSizesExample() {
    return (
        <div style={{ display: 'grid', gap: 12, width: '100%' }}>
            <Alert size="sm" heading="Small alert" detailsOpen copyable dismissible>
                Review this configuration before saving.
                <pre slot="details">Environment: production</pre>
                <Button slot="actions" variant="secondary">Review</Button>
            </Alert>

            <Alert heading="Default alert" detailsOpen copyable dismissible>
                Review this configuration before saving.
                <pre slot="details">Environment: production</pre>
                <Button slot="actions" variant="secondary">Review</Button>
            </Alert>

            <Alert size="lg" heading="Large alert" detailsOpen copyable dismissible>
                Review this configuration before saving.
                <pre slot="details">Environment: production</pre>
                <Button slot="actions" variant="secondary">Review</Button>
            </Alert>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Alert sizes',
    language: 'tsx',
    source: true,
    render: () => <AlertSizesExample />,
};

export default preview;
