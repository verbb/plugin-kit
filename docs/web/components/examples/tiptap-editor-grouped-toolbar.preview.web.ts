import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Grouped Toolbar',
    title: 'Grouped toolbar example',
    layout: 'plain',
    html: `
<pk-tiptap-editor toolbar='[{"type":"group","group":{"label":"Text style","icon":"bold","items":["paragraph","|","h2","bold","italic","underline","small-caps"]}},"|",{"preset":"lists"},{"preset":"align"},"link","undo","redo"]' value='[{"type":"paragraph","content":[{"type":"text","text":"Mix custom groups, preset groups, and standalone controls."}]}]'></pk-tiptap-editor>
`.trim(),
});
