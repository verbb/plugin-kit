// #region example
import { BarChart } from '@verbb/plugin-kit-react/components';
import { revenueByMonth } from '../../../web/components/examples/chart.fixtures';

export function ChartBarExample() {
    return <BarChart label="Recovered revenue by month" data={revenueByMonth} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Bar',
    title: 'Recovered revenue by month',
    language: 'tsx',
    source: true,
    render: () => <ChartBarExample />,
};

export default preview;
