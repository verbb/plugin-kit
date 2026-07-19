import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-content.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'plain',
    html: `
<pk-tiptap-content value='[{"type":"paragraph","content":[{"type":"text","text":"Preview "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":" without a toolbar."}]}]'></pk-tiptap-content>
`.trim(),
});
