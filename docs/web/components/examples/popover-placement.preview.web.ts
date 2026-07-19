import '@verbb/plugin-kit-web/components/popover/pk-popover.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Placement',
    title: 'Popover placement examples',
    layout: 'plain',
    html: `
<pk-popover placement="top">
  <pk-button slot="trigger">Top</pk-button>
  <div>Popover on top</div>
</pk-popover>
<pk-popover placement="bottom">
  <pk-button slot="trigger">Bottom</pk-button>
  <div>Popover on bottom</div>
</pk-popover>
`.trim(),
});
