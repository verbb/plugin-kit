import '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const fruitOptions =
    '[{"label":"Apple","value":"apple"},{"label":"Banana","value":"banana"},{"label":"Blueberry","value":"blueberry"},{"label":"Grapes","value":"grapes"}]';

const markup = `
<div style="font-size:14px;font-weight:700;margin-bottom:0.5rem">Disabled - All selected</div>
<pk-checkbox-select
  disabled
  show-all-option
  options='${fruitOptions}'
  value="*"
></pk-checkbox-select>

<div style="font-size:14px;font-weight:700;margin:1.5rem 0 0.5rem">Disabled - Some selected</div>
<pk-checkbox-select
  disabled
  show-all-option
  options='${fruitOptions}'
  value='["apple","banana"]'
></pk-checkbox-select>
`.trim();

export default defineWebPreview({
    label: 'Disabled States',
    title: 'Disabled states example',
    layout: 'stack',
    html: markup,
    code: markup,
});
