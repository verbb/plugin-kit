import '@verbb/plugin-kit-web/components/tooltip/pk-tooltip.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Action Hints',
    title: 'Action hints example',
    layout: 'plain',
    html: `
<pk-tooltip content="Move this item out of the active list.">
  <pk-button slot="trigger" variant="outline">Archive</pk-button>
</pk-tooltip>
`.trim(),
});
