// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import { recoveredRevenue } from '../../../web/components/examples/chart.fixtures';

export function ChartDescriptionExample() {
    return (
        <LineChart
            label="Recovered revenue by day"
            description="Recovered revenue was 18% higher than the previous 14 days, peaking at $1,104.90 on Wednesday 4 November."
            area
            data={recoveredRevenue}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Description',
    title: 'Chart with a screen-reader description',
    language: 'tsx',
    source: true,
    render: () => <ChartDescriptionExample />,
};

export default preview;
