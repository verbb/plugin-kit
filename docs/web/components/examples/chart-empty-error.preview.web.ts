import '@verbb/plugin-kit-web/components/button.js';
import type { ChartData } from '@verbb/plugin-kit-web/components/chart.js';
import { defineChartPreview, toLiteral } from './chart-preview';
import { topForms } from './chart.fixtures';

type ChartElement = HTMLElement & { data: ChartData | null; state: string };

const script = `
document.querySelector('#retry-forms').addEventListener('click', () => {
  const chart = document.querySelector('#forms-error');
  chart.state = 'loading';

  // Replace this simulated request with your plugin's own endpoint.
  setTimeout(() => {
    chart.data = ${toLiteral(topForms, 2)};
    chart.state = '';
  }, 800);
});
`;

export default defineChartPreview({
    label: 'Empty and Error',
    title: 'Empty and error states',
    imports: [
        "import '@verbb/plugin-kit-web/components/button.js';",
        "import '@verbb/plugin-kit-web/components/chart.js';",
    ],
    markup: `
<pk-line-chart
  id="revenue-empty"
  label="Recovered revenue by day"
  empty-heading="No recovered orders yet"
  style="--pk-chart-height: 180px"
>
  <p slot="empty">
    Recovered orders appear here once a customer completes a cart from a recovery email.
    Check that at least one <strong>recovery sequence</strong> is enabled.
  </p>
</pk-line-chart>

<pk-bar-chart
  id="forms-error"
  label="Top forms by submissions"
  orientation="horizontal"
  state="error"
  error-message="The server took too long to respond. Try again, or choose a shorter date range."
  style="--pk-chart-height: 180px"
>
  <pk-button slot="state-actions" id="retry-forms">Try Again</pk-button>
</pk-bar-chart>`,
    properties: {
        '#revenue-empty': {
            data: {
                cols: [
                    { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
                    { id: 'revenue', label: 'Recovered revenue', type: 'money', currency: 'USD' },
                ],
                rows: [],
            },
        },
    },
    script,
    frame: (markup) => `<div style="display:grid;gap:24px">${markup}</div>`,
    enhance: (root) => {
        const chart = root.querySelector<ChartElement>('#forms-error')!;
        const button = root.querySelector<HTMLElement>('#retry-forms')!;
        let timer = 0;
        const retry = () => {
            chart.state = 'loading';
            timer = window.setTimeout(() => {
                chart.data = topForms;
                chart.state = '';
            }, 800);
        };

        button.addEventListener('click', retry);

        return () => {
            window.clearTimeout(timer);
            button.removeEventListener('click', retry);
        };
    },
});
