import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Name Field',
    title: 'Selector fields example',
    layout: 'plain',
    html: `
<pk-tiptap-input variables='[{"label":"Name Field","value":"{nameField}"}]' placeholder="Insert field token"></pk-tiptap-input>
`.trim(),
});
