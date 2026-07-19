import '@verbb/plugin-kit-web/components/select/pk-select.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import '@verbb/plugin-kit-web/components/status/pk-status.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Apple',
    title: 'Basic usage example',
    layout: 'row',
    html: `
<pk-select placeholder="Select a fruit"><pk-option value="apple">Apple</pk-option>
<pk-option value="banana">Banana</pk-option>
<pk-option value="blueberry">Blueberry</pk-option>
<pk-option value="grapes">Grapes</pk-option>
<pk-option value="pineapple">Pineapple</pk-option></pk-select>
`.trim(),
});
