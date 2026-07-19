import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Custom Values",
    title: "Allow custom value example",
    layout: "stack",
    html: `
<pk-combobox allow-custom-value placeholder="Type or select a color…" style="min-width:16rem">
  <pk-option value="red">Red</pk-option>
  <pk-option value="green">Green</pk-option>
  <pk-option value="blue">Blue</pk-option>
</pk-combobox>
`.trim(),
});
