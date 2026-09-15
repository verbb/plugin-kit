import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Text styles',
    title: 'TextStyle toolbar controls',
    layout: 'plain',
    html: `
<pk-tiptap-editor
  buttons="font-family,font-size,bold,italic,small-caps,text-color,line-height,clear-format"
  value='[{"type":"paragraph","content":[{"type":"text","text":"Select some text, then try the TextStyle menus."}]}]'
></pk-tiptap-editor>
`.trim(),
});
