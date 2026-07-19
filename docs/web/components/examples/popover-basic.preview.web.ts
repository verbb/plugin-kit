import '@verbb/plugin-kit-web/components/popover/pk-popover.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'plain',
    html: `
<pk-popover>
  <pk-button slot="trigger">Open popover</pk-button>
  <div>
    <strong style="font-size:14px;color:#0f172a">Dimensions</strong>
    <p style="margin:4px 0 0;font-size:13px;color:#64748b;line-height:1.5">Set the width and height for the selected element.</p>
  </div>
</pk-popover>
`.trim(),
});
