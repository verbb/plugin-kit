// #region example
import { BarChart } from '@verbb/plugin-kit-react/components';
import type { CSSProperties } from 'react';
import { topForms } from '../../../web/components/examples/chart.fixtures';

export function ChartBarHorizontalExample() {
    return (
        <BarChart
            label="Top forms by submissions"
            orientation="horizontal"
            valueLabels
            data={topForms}
            style={{ '--pk-chart-height': '200px' } as CSSProperties}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Horizontal',
    title: 'Top forms by submissions',
    language: 'tsx',
    source: true,
    render: () => <ChartBarHorizontalExample />,
};

export default preview;
