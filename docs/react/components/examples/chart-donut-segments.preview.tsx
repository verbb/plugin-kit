// #region example
import { DonutChart } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';
import { visitorsByCountry } from '../../../web/components/examples/chart.fixtures';

export function ChartDonutSegmentsExample() {
    return (
        <DonutChart
            label="Visitors by country"
            maxSegments={4}
            otherLabel="Other countries"
            data={visitorsByCountry}
            style={{ '--pk-chart-height': '200px' } as CSSProperties}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Fewer Segments',
    title: 'Four segments with a custom Other label',
    language: 'tsx',
    source: true,
    render: () => <ChartDonutSegmentsExample />,
};

export default preview;
