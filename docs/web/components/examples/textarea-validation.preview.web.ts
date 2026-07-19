import '@verbb/plugin-kit-web/components/textarea/pk-textarea.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Validation',
    title: 'Validation example',
    layout: 'stack',
    html: `
<pk-textarea invalid placeholder="Invalid"></pk-textarea>
`.trim(),
});
