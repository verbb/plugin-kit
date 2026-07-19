import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Argentina',
    title: 'Popup mode example',
    layout: 'stack',
    html: `
<pk-combobox popup-mode placeholder="Select a country" value="ar">
<pk-option value="ar">Argentina</pk-option>
<pk-option value="au">Australia</pk-option>
<pk-option value="br">Brazil</pk-option>
<pk-option value="ca">Canada</pk-option>
</pk-combobox>
`.trim(),
});
