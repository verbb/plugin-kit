import '@verbb/plugin-kit-web/components/select/pk-select.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Decorations",
    title: "Decorations example",
    layout: "stack",
    html: `
<pk-select value="demo" style="min-width:12rem">
  <pk-icon slot="start" icon="house" aria-hidden="true"></pk-icon>
  <pk-icon slot="end" icon="flag-checkered" aria-hidden="true"></pk-icon>
  <pk-option value="demo">Medium</pk-option>
  <pk-option value="large">Large</pk-option>
</pk-select>
`.trim(),
});
