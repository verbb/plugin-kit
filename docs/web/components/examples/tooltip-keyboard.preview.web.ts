import '@verbb/plugin-kit-web/components/tooltip/pk-tooltip.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Keyboard Trigger',
    title: 'Keyboard-accessible tooltip example',
    layout: 'plain',
    html: `
<pk-tooltip content="Tooltips are available from both pointer and keyboard focus.">
  <pk-button slot="trigger" variant="transparent">Focus or hover</pk-button>
</pk-tooltip>
`.trim(),
});
