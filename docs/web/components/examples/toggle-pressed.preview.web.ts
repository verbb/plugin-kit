import '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Pressed',
    title: 'Pressed example',
    layout: 'row',
    html: `
<pk-toggle pressed><pk-icon icon="italic"></pk-icon> Italic</pk-toggle>
<pk-toggle variant="outline" pressed><pk-icon icon="bold"></pk-icon> Bold</pk-toggle>
`.trim(),
});
