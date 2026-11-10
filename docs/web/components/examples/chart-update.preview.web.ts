import '@verbb/plugin-kit-web/components/button.js';
import { defineChartPreview, toLiteral } from './chart-preview';
import { submissionsBySite } from './chart.fixtures';

const script = `
const chart = document.querySelector('#site-chart');
const sites = ${toLiteral(submissionsBySite)};

// Assign a new object to redraw. The chart animates in only on its first draw.
document.querySelectorAll('[data-site]').forEach((button) => {
  button.addEventListener('click', () => {
    chart.data = sites[button.dataset.site];
  });
});
`;

export default defineChartPreview({
    label: 'Updating Data',
    title: 'Switching sites',
    imports: [
        "import '@verbb/plugin-kit-web/components/button.js';",
        "import '@verbb/plugin-kit-web/components/chart.js';",
    ],
    markup: `
<pk-button data-site="au">Australia</pk-button>
<pk-button data-site="nz">New Zealand</pk-button>

<pk-bar-chart id="site-chart" label="Form submissions by day, last 7 days" style="--pk-chart-height: 200px"></pk-bar-chart>`,
    properties: { '#site-chart': { data: submissionsBySite.au } },
    script,
    frame: (markup) => markup.replace('<pk-bar-chart', '<div style="height:12px"></div><pk-bar-chart'),
    enhance: (root) => {
        const chart = root.querySelector('#site-chart')!;
        const buttons = [...root.querySelectorAll<HTMLElement>('[data-site]')];
        const handlers = buttons.map((button) => {
            const handler = () => Object.assign(chart, { data: submissionsBySite[button.dataset.site as 'au' | 'nz'] });
            button.addEventListener('click', handler);

            return () => button.removeEventListener('click', handler);
        });

        return () => handlers.forEach((dispose) => dispose());
    },
});
