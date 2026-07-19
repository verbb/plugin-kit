import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Checked',
    title: 'Checked example',
    layout: 'row',
    html: `
<pk-checkbox checked aria-label="Enable notifications"></pk-checkbox>
`.trim(),
});
