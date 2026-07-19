import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Plain Input',
    title: 'Plain input example',
    layout: 'plain',
    html: `
<pk-tiptap-input value="Hello world" placeholder="Write something"></pk-tiptap-input>
`.trim(),
});
