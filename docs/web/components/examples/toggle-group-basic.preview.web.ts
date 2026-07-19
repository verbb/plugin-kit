import '@verbb/plugin-kit-web/components/toggle-group/pk-toggle-group.js';
import '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'row',
    html: `
<pk-toggle-group variant="outline" spacing="0">
  <pk-toggle data-value="left" aria-label="Align left"><pk-icon icon="align-left"></pk-icon></pk-toggle>
  <pk-toggle data-value="center" aria-label="Align center"><pk-icon icon="align-center"></pk-icon></pk-toggle>
  <pk-toggle data-value="right" aria-label="Align right"><pk-icon icon="align-right"></pk-icon></pk-toggle>
</pk-toggle-group>
`.trim(),
});
