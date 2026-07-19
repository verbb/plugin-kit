import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Expanded Toolbar',
    title: 'Expanded toolbar example',
    layout: 'plain',
    html: `
<pk-tiptap-editor buttons="h1,h2,h3,bold,italic,underline,strikethrough,unordered-list,ordered-list,blockquote,code,code-block,link,table,undo,redo" value='[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Kitchen Sink Demo"}]}]'></pk-tiptap-editor>
`.trim(),
});
