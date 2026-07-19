import '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import '@verbb/plugin-kit-web/components/field/pk-field.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Field Layout",
    title: "Field layout example",
    layout: 'stack',
    html: `
<pk-field
  label="Forms to monitor"
  instructions="Choose which forms should trigger notifications."
>
  <pk-checkbox-select
    options='[{"label":"Contact Form","value":"contact"},{"label":"Newsletter","value":"newsletter"},{"label":"Support","value":"support"}]'
    value='["contact","newsletter"]'
  ></pk-checkbox-select>
</pk-field>
`.trim(),
});
