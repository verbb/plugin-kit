import '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "All Selected",
    title: "All selected example",
    layout: 'stack',
    html: `
<pk-checkbox-select
  show-all-option
  all-label="All forms"
  options='[{"label":"Contact Form","value":"contact"},{"label":"Newsletter","value":"newsletter"},{"label":"Support","value":"support"}]'
  value="*"
></pk-checkbox-select>
`.trim(),
});
