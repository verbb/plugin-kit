// #region example
import { FunnelChart } from '@verbb/plugin-kit-react/components';
import { applicationCompletion } from '../../../web/components/examples/chart.fixtures';

export function ChartFunnelCenteredExample() {
    return (
        <FunnelChart
            label="Job Application completion by page"
            shape="centered"
            ofPreviousLabel="of the previous page"
            ofFirstLabel="of people who started"
            tableToggle
            data={applicationCompletion}
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Centred',
    title: 'Job Application completion by page',
    language: 'tsx',
    source: true,
    render: () => <ChartFunnelCenteredExample />,
};

export default preview;
