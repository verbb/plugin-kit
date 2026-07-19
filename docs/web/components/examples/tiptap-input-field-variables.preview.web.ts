import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Name',
    title: 'Field variables example',
    layout: 'plain',
    html: `
<pk-tiptap-input variables='[{"label":"Name","value":"{name}"}]' placeholder="Notification body"></pk-tiptap-input>
`.trim(),
});
