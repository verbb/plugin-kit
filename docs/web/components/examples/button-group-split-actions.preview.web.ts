import '@verbb/plugin-kit-web/components/button-group/pk-button-group.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Split Actions',
    title: 'Split actions example',
    layout: 'row',
    html: `
<pk-button-group>
  <pk-button variant="primary">Publish</pk-button>
  <pk-button variant="primary" group-trigger aria-label="More publish actions"></pk-button>
</pk-button-group>
<pk-button-group>
  <pk-button variant="outline"><pk-icon slot="start" icon="download"></pk-icon> Export</pk-button>
  <pk-button variant="outline" group-trigger aria-label="More export actions"></pk-button>
</pk-button-group>
`.trim(),
});
