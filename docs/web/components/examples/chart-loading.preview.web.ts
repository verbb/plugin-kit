import '@verbb/plugin-kit-web/components/button.js';
import type { ChartData } from '@verbb/plugin-kit-web/components/chart.js';
import { defineChartPreview, toLiteral } from './chart-preview';
import { revenueByMonth } from './chart.fixtures';

type ChartElement = HTMLElement & { data: ChartData | null; state: string };

// Mirrors `enhance` below so the copyable script behaves like the live preview.
const script = `
const chart = document.querySelector('#loading-chart');
const data = ${toLiteral(revenueByMonth)};

// Simulate the first request, then a refresh that keeps the current chart visible.
setTimeout(() => {
  chart.data = data;
  chart.state = '';
}, 1500);

document.querySelector('#refresh-chart').addEventListener('click', () => {
  chart.state = 'loading';
  setTimeout(() => {
    chart.state = '';
  }, 1200);
});
`;

export default defineChartPreview({
    label: 'Loading',
    title: 'First load and refresh',
    imports: [
        "import '@verbb/plugin-kit-web/components/button.js';",
        "import '@verbb/plugin-kit-web/components/chart.js';",
    ],
    markup: `
<pk-bar-chart id="loading-chart" label="Recovered revenue by month" state="loading"></pk-bar-chart>
<pk-button id="refresh-chart">Refresh</pk-button>`,
    script,
    enhance: (root) => {
        const chart = root.querySelector<ChartElement>('#loading-chart')!;
        const button = root.querySelector<HTMLElement>('#refresh-chart')!;
        const timers: number[] = [];
        const refresh = () => {
            chart.state = 'loading';
            timers.push(window.setTimeout(() => {
                chart.state = '';
            }, 1200));
        };

        timers.push(window.setTimeout(() => {
            chart.data = revenueByMonth;
            chart.state = '';
        }, 1500));
        button.addEventListener('click', refresh);

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
            button.removeEventListener('click', refresh);
        };
    },
});
