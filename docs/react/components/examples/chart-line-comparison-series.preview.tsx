// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import { visitorsByDevice } from '../../../web/components/examples/chart.fixtures';

export function ChartLineComparisonSeriesExample() {
    return <LineChart label="Visitors by device, by day" data={visitorsByDevice} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Several Series',
    title: 'Visitors by device against the previous 14 days',
    language: 'tsx',
    source: true,
    render: () => <ChartLineComparisonSeriesExample />,
};

export default preview;
