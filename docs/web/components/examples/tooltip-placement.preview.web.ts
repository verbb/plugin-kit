import '@verbb/plugin-kit-web/components/tooltip/pk-tooltip.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Placement',
    title: 'Tooltip placement examples',
    layout: 'plain',
    html: `
<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
  <pk-tooltip placement="top" content="Tooltip on the top">
    <pk-button slot="trigger" variant="outline">top</pk-button>
  </pk-tooltip>
  <pk-tooltip placement="right" content="Tooltip on the right">
    <pk-button slot="trigger" variant="outline">right</pk-button>
  </pk-tooltip>
  <pk-tooltip placement="bottom" content="Tooltip on the bottom">
    <pk-button slot="trigger" variant="outline">bottom</pk-button>
  </pk-tooltip>
  <pk-tooltip placement="left" content="Tooltip on the left">
    <pk-button slot="trigger" variant="outline">left</pk-button>
  </pk-tooltip>
</div>
`.trim(),
});
