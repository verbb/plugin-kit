import '@verbb/plugin-kit-web/components/tooltip/pk-tooltip.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'plain',
    html: `
<pk-tooltip content="Tooltip content">
  <pk-button slot="trigger">Hover me</pk-button>
</pk-tooltip>
`.trim(),
});
