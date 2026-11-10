// #region example
import { BarChart } from '@verbb/plugin-kit-react/components';
import { ordersByEmail } from '../../../web/components/examples/chart.fixtures';

export function ChartBarGroupedExample() {
    return <BarChart label="Recovered orders by sequence and email" data={ordersByEmail} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Grouped',
    title: 'Recovered orders by sequence email',
    language: 'tsx',
    source: true,
    render: () => <ChartBarGroupedExample />,
};

export default preview;
