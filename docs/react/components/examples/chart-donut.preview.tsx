// #region example
import { DonutChart } from '@verbb/plugin-kit-react/components';
import { visitorsByCountry } from '../../../web/components/examples/chart.fixtures';

export function ChartDonutExample() {
    return <DonutChart label="Visitors by country" tableToggle data={visitorsByCountry} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Donut',
    title: 'Visitors by country',
    language: 'tsx',
    source: true,
    render: () => <ChartDonutExample />,
};

export default preview;
