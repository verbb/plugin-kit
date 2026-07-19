import '@verbb/plugin-kit-web/components/textarea/pk-textarea.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Disabled',
    title: 'Disabled example',
    layout: 'stack',
    html: `
<pk-textarea disabled placeholder="Disabled"></pk-textarea>
`.trim(),
});
