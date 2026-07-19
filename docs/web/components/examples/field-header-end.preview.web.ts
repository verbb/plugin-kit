import '@verbb/plugin-kit-web/components/field/pk-field.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Header End",
    title: "Header end example",
    layout: "stack",
    html: `
<pk-field
  label="Static Options"
  instructions="Add, remove, or reorder option rows manually."
>
  <pk-button slot="header-end" size="sm">
    <pk-icon slot="start" icon="plus"></pk-icon>
    Bulk add options
  </pk-button>
  <div>Option rows would render here.</div>
</pk-field>
`.trim(),
});
