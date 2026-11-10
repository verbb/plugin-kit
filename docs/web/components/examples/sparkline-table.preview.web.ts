import { activityDates, formActivity } from './chart.fixtures';
import { defineChartPreview, toLiteral } from './chart-preview';

const rows = formActivity.map(({ form, submissions }) => `
    <tr>
      <th scope="row">${form}</th>
      <td>${submissions.toLocaleString('en-US')}</td>
      <td><pk-sparkline data-form="${form}" label="${form} submissions, last 14 days"></pk-sparkline></td>
    </tr>`).join('');

const markup = `
<table id="form-activity">
  <thead>
    <tr>
      <th scope="col">Form</th>
      <th scope="col">Submissions</th>
      <th scope="col">Last 14 days</th>
    </tr>
  </thead>
  <tbody>${rows}
  </tbody>
</table>`;

const trends = Object.fromEntries(formActivity.map(({ form, trend }) => [form, trend]));

const script = `
// Every row covers the same days, so the date keys are shared.
const dates = ${toLiteral(activityDates)};
const trends = ${toLiteral(trends)};

document.querySelectorAll('#form-activity pk-sparkline').forEach((sparkline) => {
  sparkline.values = trends[sparkline.dataset.form];
  sparkline.dates = dates;
});
`;

export default defineChartPreview({
    label: 'In a Table',
    title: 'Sparklines in table cells',
    imports: ["import '@verbb/plugin-kit-web/components/chart/pk-sparkline.js';"],
    markup,
    script,
    frame: (content) => `
<style>
  #form-activity { width: 100%; border-collapse: collapse; font-size: 13px; }
  #form-activity th, #form-activity td { padding: 8px 10px; border-bottom: 1px solid #e4ebf3; text-align: start; }
  #form-activity td:nth-child(3) { width: 40%; }
</style>
${content}`,
    enhance: (root) => {
        root.querySelectorAll<HTMLElement>('pk-sparkline').forEach((sparkline) => {
            Object.assign(sparkline, { values: trends[sparkline.dataset.form ?? ''], dates: activityDates });
        });
    },
});
