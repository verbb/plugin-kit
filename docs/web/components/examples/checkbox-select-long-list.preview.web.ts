import '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Long Lists',
    title: 'Long list example',
    layout: 'stack',
    html: `
<pk-checkbox-select
  options='[{"label":"Entry titles and slugs","value":"titles"},{"label":"Author names","value":"authors"},{"label":"Section and entry type metadata","value":"sections"},{"label":"Submission status labels","value":"statuses"},{"label":"Integration response summaries","value":"integrations"},{"label":"Very long option label that should wrap cleanly without pushing the checkbox out of alignment","value":"long"}]'
  value='["titles","statuses"]'
  style="max-width:24rem"
></pk-checkbox-select>
`.trim(),
});
