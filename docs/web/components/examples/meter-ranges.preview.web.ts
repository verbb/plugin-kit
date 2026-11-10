import '@verbb/plugin-kit-web/components/chart/pk-meter.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { formActivity } from './chart.fixtures';

const rows = formActivity.map(({ form, completion, spam }) => `
    <tr>
      <th scope="row">${form}</th>
      <td>
        <pk-meter label="${form} completion rate" value="${completion}" low="0.4" high="0.6" optimum="1" format="percent" show-value></pk-meter>
      </td>
      <td>
        <pk-meter label="${form} spam rate" value="${spam}" max="0.25" low="0.05" high="0.15" optimum="0" format="percent" show-value></pk-meter>
      </td>
    </tr>`).join('');

const markup = `
<table id="form-health">
  <thead>
    <tr>
      <th scope="col">Form</th>
      <th scope="col">Completion rate</th>
      <th scope="col">Spam rate</th>
    </tr>
  </thead>
  <tbody>${rows}
  </tbody>
</table>
`.trim();

export default defineWebPreview({
    label: 'Ranges',
    title: 'Completion and spam rates',
    layout: 'plain',
    code: `${markup}\n\n<script type="module">\n  import '@verbb/plugin-kit-web/components/chart/pk-meter.js';\n</script>`,
    html: `
<style>
  #form-health { width: 100%; border-collapse: collapse; font-size: 13px; }
  #form-health th, #form-health td { padding: 8px 10px; border-bottom: 1px solid #e4ebf3; text-align: start; }
  #form-health td { width: 35%; }
</style>
${markup}`,
});
