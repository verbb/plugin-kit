import '@verbb/plugin-kit-web/components/button-group/pk-button-group.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/popover/pk-popover.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Popover',
    title: 'Popover example',
    layout: 'plain',
    html: `
<pk-button-group>
  <pk-button variant="primary">Filter</pk-button>
  <pk-popover>
    <pk-button slot="trigger" variant="primary" group-trigger aria-label="Filter options"></pk-button>
    <div style="min-width:12rem;padding:0.75rem">Filter options</div>
  </pk-popover>
</pk-button-group>
`.trim(),
});
