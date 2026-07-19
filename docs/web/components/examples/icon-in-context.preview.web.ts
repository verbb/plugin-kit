import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "In Context",
    title: "In context example",
    layout: "row",
    html: `
<pk-button variant="dashed">
  <pk-icon slot="start" icon="plus"></pk-icon>
  Add a link
</pk-button>
<pk-button aria-label="Settings">
  <pk-icon slot="start" icon="gear"></pk-icon>
</pk-button>
`.trim(),
});
