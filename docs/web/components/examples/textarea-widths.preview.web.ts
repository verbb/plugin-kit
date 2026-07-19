import '@verbb/plugin-kit-web/components/textarea/pk-textarea.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Widths',
    title: 'Widths example',
    layout: 'plain',
    html: `
<div style="display:flex;flex-direction:column;gap:12px">
  <div style="max-width:24rem">
    <pk-textarea placeholder="Full width by default"></pk-textarea>
  </div>
  <pk-textarea placeholder="Fixed width" style="width:320px"></pk-textarea>
</div>
`.trim(),
});
