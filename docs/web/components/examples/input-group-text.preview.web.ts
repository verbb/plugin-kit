import '@verbb/plugin-kit-web/components/input-group/pk-input-group.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Text Addons",
    title: "Text addons example",
    layout: "stack",
    html: `
<pk-input-group>
  <pk-input-group-input placeholder="0.00"></pk-input-group-input>
  <pk-input-group-addon align="inline-start">
    <pk-input-group-text>$</pk-input-group-text>
  </pk-input-group-addon>
  <pk-input-group-addon align="inline-end">
    <pk-input-group-text>USD</pk-input-group-text>
  </pk-input-group-addon>
</pk-input-group>
`.trim(),
});
