import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Apple',
    title: 'Grouped options example',
    layout: 'stack',
    html: `
<pk-combobox placeholder="Select produce…">
<pk-option-group label="Fruits">
  <pk-option value="apple">Apple</pk-option>
  <pk-option value="banana">Banana</pk-option>
</pk-option-group>
<pk-separator></pk-separator>
<pk-option-group label="Vegetables">
  <pk-option value="carrot">Carrot</pk-option>
  <pk-option value="broccoli">Broccoli</pk-option>
</pk-option-group>
</pk-combobox>
`.trim(),
});
