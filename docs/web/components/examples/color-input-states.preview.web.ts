import '@verbb/plugin-kit-web/components/color-input/pk-color-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'States',
    title: 'Color input state examples',
    layout: 'row',
    html: `
<pk-color-input value="#e64d4c"></pk-color-input>
<pk-color-input value="#ff" invalid></pk-color-input>
<pk-color-input value="#64748b" readonly></pk-color-input>
<pk-color-input value="#64748b" disabled></pk-color-input>
`.trim(),
});
