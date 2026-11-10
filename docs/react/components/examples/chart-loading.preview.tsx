// #region example
import { useEffect, useRef, useState } from 'react';
import { BarChart, Button } from '@verbb/plugin-kit-react/components';
import type { ChartData } from '@verbb/plugin-kit-react/components';
import { revenueByMonth } from '../../../web/components/examples/chart.fixtures';

export function ChartLoadingExample() {
    const [data, setData] = useState<ChartData | null>(null);
    const [loading, setLoading] = useState(true);
    const timer = useRef<number | undefined>(undefined);

    // Simulate the first request, then a refresh that keeps the current chart visible.
    useEffect(() => {
        timer.current = window.setTimeout(() => {
            setData(revenueByMonth);
            setLoading(false);
        }, 1500);

        return () => window.clearTimeout(timer.current);
    }, []);

    function refresh() {
        setLoading(true);
        timer.current = window.setTimeout(() => setLoading(false), 1200);
    }

    return (
        <>
            <BarChart label="Recovered revenue by month" state={loading ? 'loading' : ''} data={data} />
            <Button onClick={refresh}>Refresh</Button>
        </>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Loading',
    title: 'First load and refresh',
    language: 'tsx',
    source: true,
    render: () => <ChartLoadingExample />,
};

export default preview;
