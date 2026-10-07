// #region example
import { Alert, Icon } from '@verbb/plugin-kit-react/components';

export function AlertIconsExample() {
    return (
        <div style={{ display: 'grid', gap: 12, width: '100%' }}>
            <Alert variant="neutral" heading="Integration settings updated.">
                <Icon slot="icon" icon="gear" aria-hidden="true" />
                The alert can use a product-specific icon.
            </Alert>
            <Alert variant="info" heading="No icon needed." hideIcon>
                Hide the icon when the message is clear without one.
            </Alert>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Icons',
    title: 'Alert icon options',
    language: 'tsx',
    source: true,
    render: () => <AlertIconsExample />,
};

export default preview;
