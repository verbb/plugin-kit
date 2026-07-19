import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Email Field',
    title: 'Email variables example',
    layout: 'plain',
    html: `
<pk-tiptap-input variables='[{"label":"Email","value":"{email}"}]' placeholder="Email subject"></pk-tiptap-input>
`.trim(),
});
