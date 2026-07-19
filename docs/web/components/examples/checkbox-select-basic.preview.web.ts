import '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Basic Usage",
    title: "Basic usage example",
    layout: 'stack',
    html: `
<pk-checkbox-select
  options='[{"label":"Contact Form","value":"contact"},{"label":"Newsletter","value":"newsletter"},{"label":"Support","value":"support"}]'
  value='["contact"]'
></pk-checkbox-select>
`.trim(),
});
