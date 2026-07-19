import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Horizontal Separators',
    title: 'Horizontal separators example',
    layout: 'plain',
    html: `
<div style="display:flex;flex-direction:column;gap:16px">
  <div>Section A</div>
  <pk-separator></pk-separator>
  <div>Section B</div>
  <pk-separator></pk-separator>
  <div>Section C</div>
</div>
`.trim(),
});
