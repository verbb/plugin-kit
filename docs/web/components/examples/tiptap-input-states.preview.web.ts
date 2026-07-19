import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'States',
    title: 'Tiptap input state examples',
    layout: 'plain',
    html: `
<div style="display:flex;flex-direction:column;gap:12px">
  <pk-tiptap-input value="Invalid value" invalid></pk-tiptap-input>
  <pk-tiptap-input value="Disabled value" disabled></pk-tiptap-input>
  <pk-tiptap-input value="Read-only value" readonly></pk-tiptap-input>
</div>
`.trim(),
});
