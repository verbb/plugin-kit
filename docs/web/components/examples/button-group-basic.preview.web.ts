import '@verbb/plugin-kit-web/components/button-group/pk-button-group.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Example',
    title: 'Basic example',
    layout: 'plain',
    html: `
<pk-button-group>
  <pk-button variant="primary"><pk-icon slot="start" icon="pen-to-square"></pk-icon> Edit</pk-button>
  <pk-button variant="primary"><pk-icon slot="start" icon="eye"></pk-icon> Preview</pk-button>
  <pk-button variant="primary" group-trigger aria-label="More actions"></pk-button>
</pk-button-group>
`.trim(),
});
