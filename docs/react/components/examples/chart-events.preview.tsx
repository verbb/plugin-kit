// #region example
import { useState } from 'react';
import { LineChart } from '@verbb/plugin-kit-react/components';
import type { PkLegendToggleDetail, PkPointSelectDetail } from '@verbb/plugin-kit-react/components';
import { submissionsByStatus } from '../../../web/components/examples/chart.fixtures';

export function ChartEventsExample() {
    const [message, setMessage] = useState('Click a point, toggle a legend item, or switch to the table.');

    function onPointSelect(event: Event) {
        const { index, row, series, value } = (event as CustomEvent<PkPointSelectDetail>).detail;
        setMessage(`pk-point-select: ${series} on ${String(row?.[0])} is ${String(value)} (row ${index})`);
    }

    function onLegendToggle(event: Event) {
        const { key, label, hidden } = (event as CustomEvent<PkLegendToggleDetail>).detail;
        setMessage(`pk-legend-toggle: ${label} (${key}) is now ${hidden ? 'hidden' : 'shown'}`);
    }

    function onViewChange(event: Event) {
        setMessage(`pk-view-change: ${(event as CustomEvent<{ view: string }>).detail.view}`);
    }

    return (
        <>
            <LineChart
                label="Form submissions by day, by status"
                tableToggle
                data={submissionsByStatus}
                onPkPointSelect={onPointSelect}
                onPkLegendToggle={onLegendToggle}
                onPkViewChange={onViewChange}
            />
            <output aria-live="polite" style={{ display: 'block', marginTop: 12, fontSize: 13 }}>{message}</output>
        </>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Events',
    title: 'Chart events',
    language: 'tsx',
    source: true,
    render: () => <ChartEventsExample />,
};

export default preview;
