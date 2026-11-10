// #region example
import { BarChart } from '@verbb/plugin-kit-react/components';
import { skippedCarts } from '../../../web/components/examples/chart.fixtures';

export function ChartBarStackedExample() {
    return <BarChart label="Carts not emailed by week, by reason" stacked="normal" data={skippedCarts} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Stacked',
    title: 'Carts not emailed, by reason',
    language: 'tsx',
    source: true,
    render: () => <ChartBarStackedExample />,
};

export default preview;
