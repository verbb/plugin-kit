import '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Sizes',
    title: 'Sizes example',
    layout: 'row',
    html: `
<pk-toggle size="sm"><pk-icon icon="bold"></pk-icon> Bold</pk-toggle>
<pk-toggle><pk-icon icon="italic"></pk-icon> Italic</pk-toggle>
<pk-toggle size="lg"><pk-icon icon="underline"></pk-icon> Underline</pk-toggle>
`.trim(),
});
