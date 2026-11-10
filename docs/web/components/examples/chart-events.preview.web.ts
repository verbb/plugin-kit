import { defineChartPreview } from './chart-preview';
import { submissionsByStatus } from './chart.fixtures';

const script = `
const chart = document.querySelector('#events-chart');
const output = document.querySelector('#events-output');

chart.addEventListener('pk-point-select', (event) => {
  const { index, row, series, value } = event.detail;
  output.textContent = \`pk-point-select: \${series} on \${row[0]} is \${value} (row \${index})\`;
});

chart.addEventListener('pk-legend-toggle', (event) => {
  const { key, label, hidden } = event.detail;
  output.textContent = \`pk-legend-toggle: \${label} (\${key}) is now \${hidden ? 'hidden' : 'shown'}\`;
});

chart.addEventListener('pk-view-change', (event) => {
  output.textContent = \`pk-view-change: \${event.detail.view}\`;
});
`;

type PointDetail = { index: number; row: readonly unknown[]; series: string; value: unknown };
type LegendDetail = { key: string; label: string; hidden: boolean };

export default defineChartPreview({
    label: 'Events',
    title: 'Chart events',
    markup: `
<pk-line-chart id="events-chart" label="Form submissions by day, by status" table-toggle></pk-line-chart>
<output id="events-output" aria-live="polite">Click a point, toggle a legend item, or switch to the table.</output>`,
    properties: { '#events-chart': { data: submissionsByStatus } },
    script,
    frame: (markup) => markup.replace('<output ', '<output style="display:block;margin-top:12px;font-size:13px" '),
    enhance: (root) => {
        const chart = root.querySelector<HTMLElement>('#events-chart')!;
        const output = root.querySelector<HTMLOutputElement>('#events-output')!;
        const onPoint = (event: Event) => {
            const { index, row, series, value } = (event as CustomEvent<PointDetail>).detail;
            output.textContent = `pk-point-select: ${series} on ${String(row[0])} is ${String(value)} (row ${index})`;
        };
        const onLegend = (event: Event) => {
            const { key, label, hidden } = (event as CustomEvent<LegendDetail>).detail;
            output.textContent = `pk-legend-toggle: ${label} (${key}) is now ${hidden ? 'hidden' : 'shown'}`;
        };
        const onView = (event: Event) => {
            output.textContent = `pk-view-change: ${(event as CustomEvent<{ view: string }>).detail.view}`;
        };

        chart.addEventListener('pk-point-select', onPoint);
        chart.addEventListener('pk-legend-toggle', onLegend);
        chart.addEventListener('pk-view-change', onView);

        return () => {
            chart.removeEventListener('pk-point-select', onPoint);
            chart.removeEventListener('pk-legend-toggle', onLegend);
            chart.removeEventListener('pk-view-change', onView);
        };
    },
});
