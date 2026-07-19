import '@verbb/plugin-kit-web/components/toggle-group/pk-toggle-group.js';
import '@verbb/plugin-kit-web/components/toggle/pk-toggle.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Variants',
    title: 'Variants example',
    layout: 'stack',
    html: `
<pk-toggle-group spacing="0">
  <pk-toggle data-value="bold" aria-label="Bold"><pk-icon icon="bold"></pk-icon></pk-toggle>
  <pk-toggle data-value="italic" aria-label="Italic"><pk-icon icon="italic"></pk-icon></pk-toggle>
</pk-toggle-group>
<pk-toggle-group variant="outline" spacing="0">
  <pk-toggle data-value="bold" aria-label="Bold"><pk-icon icon="bold"></pk-icon></pk-toggle>
  <pk-toggle data-value="italic" aria-label="Italic"><pk-icon icon="italic"></pk-icon></pk-toggle>
</pk-toggle-group>
`.trim(),
});
