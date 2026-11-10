// #region example
import { FunnelChart } from '@verbb/plugin-kit-react/components';
import { cartRecovery } from '../../../web/components/examples/chart.fixtures';

export function ChartFunnelExample() {
    return <FunnelChart label="Cart recovery funnel" data={cartRecovery} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Steps',
    title: 'Cart recovery funnel',
    language: 'tsx',
    source: true,
    render: () => <ChartFunnelExample />,
};

export default preview;
