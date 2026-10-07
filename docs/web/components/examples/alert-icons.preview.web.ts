import '@verbb/plugin-kit-web/components/alert/pk-alert.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Icons',
    title: 'Alert icon options',
    html: `
<div style="display: grid; gap: 12px; width: 100%">
  <pk-alert variant="neutral" heading="Integration settings updated.">
    <pk-icon slot="icon" icon="gear" aria-hidden="true"></pk-icon>
    The alert can use a product-specific icon.
  </pk-alert>
  <pk-alert variant="info" heading="No icon needed." hide-icon>
    Hide the icon when the message is clear without one.
  </pk-alert>
</div>
`.trim(),
});
