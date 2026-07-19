import '@verbb/plugin-kit-web/components/input-group/pk-input-group.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Button Addon",
    title: "Button addon example",
    layout: "stack",
    html: `
<pk-input-group>
  <pk-input-group-input placeholder="example.com/contact"></pk-input-group-input>
  <pk-input-group-addon align="inline-start">
    <pk-input-group-text>https://</pk-input-group-text>
  </pk-input-group-addon>
  <pk-input-group-addon align="inline-end">
    <pk-input-group-button>Search</pk-input-group-button>
  </pk-input-group-addon>
</pk-input-group>
`.trim(),
});
