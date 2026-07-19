import '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'row',
    html: `
<pk-toggle aria-label="Bold">
  <pk-icon icon="bold"></pk-icon>
  Bold
</pk-toggle>
`.trim(),
});
