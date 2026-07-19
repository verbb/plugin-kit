import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Editor',
    title: 'Basic editor example',
    layout: 'plain',
    html: `
<pk-tiptap-editor buttons="bold,italic,underline,strikethrough,code,h2,unordered-list,ordered-list" value='[{"type":"paragraph","content":[{"type":"text","text":"Hello from the editor."}]}]'></pk-tiptap-editor>
`.trim(),
});
