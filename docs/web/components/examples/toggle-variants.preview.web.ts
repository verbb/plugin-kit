import '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Variants',
    title: 'Variants example',
    layout: 'row',
    html: `
<pk-toggle><pk-icon icon="bold"></pk-icon> Bold</pk-toggle>
<pk-toggle variant="outline"><pk-icon icon="italic"></pk-icon> Italic</pk-toggle>
`.trim(),
});
