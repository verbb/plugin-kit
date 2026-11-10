// #region example
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { BarChart, Button, LineChart } from '@verbb/plugin-kit-react/components';
import type { ChartData } from '@verbb/plugin-kit-react/components';
import { topForms } from '../../../web/components/examples/chart.fixtures';

const noRevenue: ChartData = {
    cols: [
        { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
        { id: 'revenue', label: 'Recovered revenue', type: 'money', currency: 'USD' },
    ],
    rows: [],
};

const height = { '--pk-chart-height': '180px' } as CSSProperties;

export function ChartEmptyErrorExample() {
    const [state, setState] = useState<'error' | 'loading' | ''>('error');
    const [data, setData] = useState<ChartData | null>(null);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    function retry() {
        setState('loading');

        // Replace this simulated request with your plugin's own endpoint.
        timer.current = window.setTimeout(() => {
            setData(topForms);
            setState('');
        }, 800);
    }

    return (
        <div style={{ display: 'grid', gap: 24 }}>
            <LineChart
                label="Recovered revenue by day"
                emptyHeading="No recovered orders yet"
                data={noRevenue}
                style={height}
            >
                <p slot="empty">
                    Recovered orders appear here once a customer completes a cart from a recovery email.
                    Check that at least one <strong>recovery sequence</strong> is enabled.
                </p>
            </LineChart>

            <BarChart
                label="Top forms by submissions"
                orientation="horizontal"
                state={state}
                errorMessage="The server took too long to respond. Try again, or choose a shorter date range."
                data={data}
                style={height}
            >
                <Button slot="state-actions" onClick={retry}>Try Again</Button>
            </BarChart>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Empty and Error',
    title: 'Empty and error states',
    language: 'tsx',
    source: true,
    render: () => <ChartEmptyErrorExample />,
};

export default preview;
