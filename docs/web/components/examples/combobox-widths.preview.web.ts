import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Apple',
    title: 'Widths example',
    layout: 'stack',
    html: `
<pk-combobox placeholder="Select a fruit" style="width:100%;max-width:20rem"><pk-option value="apple">Apple</pk-option>
<pk-option value="banana">Banana</pk-option>
<pk-option value="blueberry">Blueberry</pk-option>
<pk-option value="grapes">Grapes</pk-option>
<pk-option value="pineapple">Pineapple</pk-option></pk-combobox>
<pk-combobox placeholder="Select a fruit" style="width:12rem"><pk-option value="apple">Apple</pk-option>
<pk-option value="banana">Banana</pk-option>
<pk-option value="blueberry">Blueberry</pk-option>
<pk-option value="grapes">Grapes</pk-option>
<pk-option value="pineapple">Pineapple</pk-option></pk-combobox>
`.trim(),
});
