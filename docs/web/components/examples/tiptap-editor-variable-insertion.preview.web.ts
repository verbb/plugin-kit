import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'User Email',
    title: 'Variable insertion example',
    layout: 'plain',
    html: `
<pk-tiptap-editor buttons="bold,italic,variable" value='[{"type":"paragraph","content":[{"type":"text","text":"Hello "},{"type":"variableTag","attrs":{"label":"User Email","value":"{userEmail}"}}]}]'></pk-tiptap-editor>
`.trim(),
});
