import '@verbb/plugin-kit-web/components/textarea/pk-textarea.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Sizes',
    title: 'Sizes example',
    layout: 'stack',
    html: `
<pk-textarea size="default" placeholder="Default"></pk-textarea>
<pk-textarea size="sm" placeholder="Small"></pk-textarea>
`.trim(),
});
