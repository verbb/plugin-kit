// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import { recoveredRevenue } from '../../../web/components/examples/chart.fixtures';

export function ChartLineComparisonExample() {
    return <LineChart label="Recovered revenue by day" area tableToggle data={recoveredRevenue} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Previous Period',
    title: 'Recovered revenue against the previous 14 days',
    language: 'tsx',
    source: true,
    render: () => <ChartLineComparisonExample />,
};

export default preview;
