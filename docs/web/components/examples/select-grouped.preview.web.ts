import '@verbb/plugin-kit-web/components/select/pk-select.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import '@verbb/plugin-kit-web/components/status/pk-status.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Apple',
    title: 'Grouped options example',
    layout: 'row',
    html: `
<pk-select placeholder="Select produce">
<pk-option-group label="Fruits"><pk-option value="apple">Apple</pk-option>
<pk-option value="banana">Banana</pk-option>
<pk-option value="blueberry">Blueberry</pk-option>
<pk-option value="grapes">Grapes</pk-option>
<pk-option value="pineapple">Pineapple</pk-option></pk-option-group>
<pk-separator></pk-separator>
<pk-option-group label="Vegetables">
  <pk-option value="carrot">Carrot</pk-option>
  <pk-option value="broccoli">Broccoli</pk-option>
</pk-option-group>
</pk-select>
`.trim(),
});
