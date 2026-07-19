import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Form Name',
    title: 'General variables example',
    layout: 'plain',
    html: `
<pk-tiptap-input variables='[{"label":"Form Name","value":"{formName}"}]' placeholder="Subject line"></pk-tiptap-input>
`.trim(),
});
