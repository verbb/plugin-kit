// #region example
import { Meter } from '@verbb/plugin-kit-react/components';

export function MeterBasicExample() {
    return (
        <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
            <Meter label="Contact Us completion rate" value={0.82} format="percent" showValue />
            <Meter label="Monthly email quota used" value={8420} max={10000} showValue />
            <Meter label="Asset volume usage" value={0.37} format="percent" />
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Meter',
    title: 'Meters',
    language: 'tsx',
    source: true,
    render: () => <MeterBasicExample />,
};

export default preview;
