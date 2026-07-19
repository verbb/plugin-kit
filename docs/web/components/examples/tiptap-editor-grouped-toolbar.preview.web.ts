import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Grouped Toolbar',
    title: 'Grouped toolbar example',
    layout: 'plain',
    html: `
<pk-tiptap-editor toolbar='[{"preset":"headings","headingLevels":[1,2,3,4]},"|","bold","italic","underline"]' value='[{"type":"paragraph","content":[{"type":"text","text":"Grouped toolbar demo"}]}]'></pk-tiptap-editor>
`.trim(),
});
