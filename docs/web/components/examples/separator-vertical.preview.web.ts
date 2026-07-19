import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Vertical Separators',
    title: 'Vertical separators example',
    layout: 'row',
    html: `
<div style="display:flex;align-items:center;gap:12px;height:2rem">
  <span>Left</span>
  <pk-separator orientation="vertical"></pk-separator>
  <span>Center</span>
  <pk-separator orientation="vertical"></pk-separator>
  <span>Right</span>
</div>
`.trim(),
});
