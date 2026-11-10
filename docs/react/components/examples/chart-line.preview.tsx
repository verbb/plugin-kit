// #region example
import { LineChart } from '@verbb/plugin-kit-react/components';
import { formSubmissions } from '../../../web/components/examples/chart.fixtures';

export function ChartLineExample() {
    return <LineChart label="Form submissions by day" data={formSubmissions} />;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Line',
    title: 'Form submissions by day',
    language: 'tsx',
    source: true,
    render: () => <ChartLineExample />,
};

export default preview;
