import '@verbb/plugin-kit-web/components/popover/pk-popover.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Form Content',
    title: 'Popover form content example',
    layout: 'plain',
    html: `
<pk-popover>
  <pk-button slot="trigger">Edit dimensions</pk-button>
  <div style="display:flex;flex-direction:column;gap:12px;min-width:16rem">
    <pk-input placeholder="Width"></pk-input>
    <pk-input placeholder="Height"></pk-input>
    <pk-button variant="primary">Apply</pk-button>
  </div>
</pk-popover>
`.trim(),
});
