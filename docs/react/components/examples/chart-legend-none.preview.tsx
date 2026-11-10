// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import { submissionsByStatus } from '../../../web/components/examples/chart.fixtures';

export function ChartLegendNoneExample() {
    return (
        <>
            <p style={{ margin: '0 0 8px', fontSize: 13 }}>Completed submissions in blue, incomplete in orange and spam in red.</p>
            <LineChart label="Form submissions by day, by status" legend="none" data={submissionsByStatus} />
        </>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'No Legend',
    title: 'Chart without a legend',
    language: 'tsx',
    source: true,
    render: () => <ChartLegendNoneExample />,
};

export default preview;
