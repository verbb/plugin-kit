import '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Disabled',
    title: 'Disabled example',
    layout: 'row',
    html: `
<pk-toggle disabled><pk-icon icon="bold"></pk-icon> Bold</pk-toggle>
`.trim(),
});
