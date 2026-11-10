// #region example
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { BarChart, Button } from '@verbb/plugin-kit-react/components';
import { submissionsBySite } from '../../../web/components/examples/chart.fixtures';

export function ChartUpdateExample() {
    const [site, setSite] = useState<'au' | 'nz'>('au');

    // A new data object redraws the chart; it animates in only on its first draw.
    return (
        <>
            <Button onClick={() => setSite('au')}>Australia</Button>
            <Button onClick={() => setSite('nz')}>New Zealand</Button>
            <div style={{ height: 12 }} />
            <BarChart
                label="Form submissions by day, last 7 days"
                data={submissionsBySite[site]}
                style={{ '--pk-chart-height': '200px' } as CSSProperties}
            />
        </>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Updating Data',
    title: 'Switching sites',
    language: 'tsx',
    source: true,
    render: () => <ChartUpdateExample />,
};

export default preview;
